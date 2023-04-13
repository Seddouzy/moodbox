import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const getUser = async (uid?: string) => {
  return uid ? admin.auth().getUser(uid) : null;
};

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
  functions.logger.log(`now: ${now}`);
  functions.logger.log(`teamID: ${teamId}`);
  functions.logger.log(`Context UID: ${context.auth?.uid}`);
  const querySnapshot = await teamVotesRef
    .where("createdAt", ">", yesterday)
    .where("userId", "==", context.auth?.uid)
    .get()
    .catch((err: Error) => {
      console.error("Error getting votes in team:", err);
      throw err;
    });
  functions.logger.log(querySnapshot.docs);
  if (!querySnapshot.docs.length) {
    return { state: false, date: null };
  }
  const firstDoc = querySnapshot.docs[0];
  return { state: true, date: firstDoc.get("createdAt")?.toDate() };
};

export const canVote = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { teamId } = data;
    userIsAuthenticatedCheck(context);
    const user = await getUser(context.auth?.uid);

    functions.logger.log(
      `user ${user?.displayName} requesting to vote on team ${teamId}`
    );

    const hasVote = await hasVoteInLast24Hours(teamId, context);
    if (!hasVote.state) {
      return {
        message: `User ${user?.displayName} is allowed to vote in team ${teamId}`,
        state: true,
      };
    }
    return {
      message: `User ${user?.displayName} is not allowed to vote in team ${teamId}. Already voted in last 24 hours.`,
      state: false,
      lastVote: hasVote.date?.toString(),
    };
  }
);

export const vote = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { teamId, sentiment } = data;
    userIsAuthenticatedCheck(context);
    const voteInLast24Hours = await hasVoteInLast24Hours(teamId, context);
    if (voteInLast24Hours.state) {
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
    const { userId, teamId, tokenId } = data;
    userIsAuthenticatedCheck(context);

    functions.logger.log(
      `user ${userId} requesting to join team ${teamId} with token ${tokenId}`
    );

    functions.logger.warn(`User Photo: ${context.auth?.token.picture}`);
    functions.logger.warn(`User Photo: ${context.auth?.token.email}`);
    functions.logger.warn(`User Photo: ${context.auth?.uid}`);

    // Add the user to the team in the "members" collection
    /*const teamMembersCurrentRef = admin
      .firestore()
      .collection(`teams/${teamId}/members/${userId}`);*/
    const teamRef = admin.firestore().collection("teams").doc(teamId);
    const membersRef = teamRef.collection("members");
    const team = await teamRef.get();
    if (team.data()?.tokenId === tokenId) {
      await membersRef.doc(userId).set({
        role: "member",
        userPhoto: context.auth?.token.picture,
        userEmail: context.auth?.token.email,
        userId: context.auth?.uid,
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
