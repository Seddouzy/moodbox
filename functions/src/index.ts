import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const memberJoin = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { userId, teamId, tokenId } = data;

    // Check that the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to join a team."
      );
    }

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
