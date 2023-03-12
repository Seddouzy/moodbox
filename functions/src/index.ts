import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { user } from "firebase-functions/v1/auth";

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

export const memberJoin = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { userId, teamId, tokenId } = data;
    userIsAuthenticatedCheck(context);

    functions.logger.log(
      `user ${userId} requesting to join team ${teamId} with token ${tokenId}`
    );

    // Add the user to the team in the "members" collection
    const teamRef = admin.firestore().collection("teams").doc(teamId);
    const membersRef = teamRef.collection("members");
    const team = await teamRef.get();
    if (team.data()?.tokenId === tokenId) {
      await membersRef.doc(userId).set({ joinedAt: new Date() });
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

export const isMember = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { userId, teamId } = data;
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
    if (userInTeam.data()) {
      return {
        message: `User ${userId} is member of team ${teamId}`,
        state: true,
      };
    } else {
      return {
        message: `User ${userId} is not a member of team ${teamId} yet`,
        state: false,
      };
    }
  }
);

export const teamList = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { userId, teamId } = data;
    userIsAuthenticatedCheck(context);

    functions.logger.log(
      `user ${userId} requesting the teammember list for ${teamId}`
    );

    const teamList = admin
      .firestore()
      .collection("teams")
      .doc(teamId)
      .collection("members")
      .doc(userId);
    const teamMemberListRef = await teamList.get();
    if (teamMemberListRef.data()) {
      return {
        message: `User ${userId} is owner of team ${teamId}`,
        state: true,
      };
    } else {
      return {
        message: `User ${userId} is not a owner of team ${teamId} yet`,
        state: false,
      };
    }
  }
);
