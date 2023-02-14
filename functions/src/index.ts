import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const memberJoin = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { userId, teamId } = data;

    // Check that the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to join a team."
      );
    }

    // Add the user to the team in the "members" collection
    const membersRef = admin
      .firestore()
      .collection("teams")
      .doc(teamId)
      .collection("members");
    await membersRef.doc(userId).set({ joinedAt: new Date() });

    // TODO: Implement token verification and deletion

    // Return a success message
    return { message: `User ${userId} joined team ${teamId}.` };
  }
);
