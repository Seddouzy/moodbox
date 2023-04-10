import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { useUser } from "reactfire";

admin.initializeApp();

const userIsAuthenticatedCheck = (context: functions.https.CallableContext) => {
  // Check that the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to join a team."
    );
  }
};

const hasVoteInLast24Hours = async (
  teamId: string,
  context: functions.https.CallableContext
): Promise<{ state: boolean; date: Date | null }> => {
  // retrieve all votes in team from last 24 hours
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours from the current time
  const teamVotesRef = admin.firestore().collection(`teams/${teamId}/votes`);
  const querySnapshot = await teamVotesRef
    .where("createdAt", ">", yesterday)
    .where("userId", "==", context.auth?.uid)
    .get()
    .catch((err: Error) => {
      console.error("Error getting votes in team:", err);
      throw err;
    });
  if (querySnapshot.empty) {
    return { state: false, date: null };
  }
  const firstDoc = querySnapshot.docs[0];
  return { state: true, date: firstDoc.get("createdAt") };
};

export const canVote = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { teamId } = data;
    userIsAuthenticatedCheck(context);

    functions.logger.log(
      `user ${context.auth?.uid} requesting to vote on team ${teamId}`
    );

    const hasVote = await hasVoteInLast24Hours(teamId, context);
    if (!hasVote.state) {
      return {
        message: `User ${context.auth?.uid} is allowed to vote in team ${teamId}`,
        state: true,
      };
    }
    return {
      message: `User ${context.auth?.uid} is not allowed to vote in team ${teamId}. Already voted in last 24 hours.`,
      state: false,
      lastVote: hasVote.date,
    };
  }
);

export const vote = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { teamId, sentiment } = data;
    userIsAuthenticatedCheck(context);
    const isAllowedToVote = !(await hasVoteInLast24Hours(teamId, context));
    if (!isAllowedToVote) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User is not allowed to vote! Already voted in last 24 hours."
      );
    }
    // Vote will be set
    const teamVotesRef = admin.firestore().collection(`teams/${teamId}/votes`);
    await teamVotesRef.add({
      createdAt: new Date(),
      sentiment,
      userId: context.auth?.uid,
    });
  }
);

export const memberJoin = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    // TODO: Check if we even need to send the userId -> can be retrieved via context
    const { role, userId, teamId, tokenId, userName, userEmail, userPhoto } =
      data;
    userIsAuthenticatedCheck(context);

    functions.logger.log(
      `user ${userId} requesting to join team ${teamId} with token ${tokenId}`
    );
    const user = useUser();
    functions.logger.warn(`User Photo: ${context.auth?.token.picture}`);
    functions.logger.warn(`User Photo: ${context.auth?.token.email}`);
    functions.logger.warn(`User Photo: ${context.auth?.uid}`);
    functions.logger.warn(`USER USER stuff: ${user.data?.displayName}`);
    functions.logger.warn(`USER USER stuff: ${user.data?.photoURL}`);

    // Add the user to the team in the "members" collection
    const teamMembersCurrentRef = admin
      .firestore()
      .collection(`teams/${teamId}/members/${userId}`);
    const teamRef = admin.firestore().collection(`teams`).doc(teamId);
    //const membersRef = teamRef.collection(`members`);
    //const myUserMembersRef = membersRef.doc(userId);
    const team = await teamRef.get();
    if (team.data()?.tokenId === tokenId) {
      await teamMembersCurrentRef.add({
        role,
        userName,
        userEmail,
        userPhoto,
        userId,
        joinedAt: new Date(),
      });
    } else {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Token is not matching!"
      );
    }

    // TODO: Implement token verification and deletion

    // Return a success message
    return { message: `User ${userId} joined team ${teamId}.` };
  }
);

export const hasRole = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    // TODO: Check if we even need to send the userId -> can be retrieved via context
    const { userId, teamId, role } = data;
    userIsAuthenticatedCheck(context);

    functions.logger.log(
      `user ${userId} requesting to know member status of team ${teamId}`
    );

    const teamMembersRef = admin
      .firestore()
      .collection("teams")
      .doc(teamId)
      .collection("members")
      .doc(userId);
    const userInTeam = await teamMembersRef.get();
    const userData = userInTeam.data();
    if (userData) {
      if (userData.role === role || role === "member") {
        return {
          message: `User ${userId} has role ${role} in team ${teamId}`,
          state: true,
        };
      }
      return {
        message: `User ${userId} is a member of team ${teamId} but does not have the role ${role}`,
        state: false,
      };
    } else {
      return {
        message: `User ${userId} is not a member of team ${teamId} yet`,
        state: false,
      };
    }
  }
);
