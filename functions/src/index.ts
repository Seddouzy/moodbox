import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.memberJoin = functions.https.onCall(async (data, context) => {
  const teamId = data.teamId;
  const token = data.token;

  // Perform backend check on the token and teamId
  const isValid = await performBackendCheck(teamId, token);

  if (!isValid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Invalid token or team ID"
    );
  }

  // Add the user to the team
  await addMemberToTeam(context.auth.uid, teamId);

  return { success: true, message: "You have successfully joined the team!" };
});

async function performBackendCheck(teamId, token) {
  // Perform check on the backend and return whether the token is valid
}

async function addMemberToTeam(userId, teamId) {
  // Add the user to the team in the database
}
