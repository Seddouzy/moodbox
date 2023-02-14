const functions = require("firebase-functions");
const admin = require("firebase-admin");

export const memberJoin = functions.https.onCall(async (data, context) => {
  const { userId, teamid, tokenid } = data;

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
    .doc(teamid)
    .collection("members");
  await membersRef.doc(userId).set({ joinedAt: new Date() });

  // TODO: Implement token verification and deletion

  // Return a success message
  return { message: `User ${userId} joined team ${teamid}.` };
});
