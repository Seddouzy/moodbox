import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { firebase } from "firebase/app";
import "firebase/auth";

const JoinTeam = () => {
  const router = useRouter();
  const { teamId, tokenId } = router.query;
  const userId = firebase.auth().currentUser.uid;
  const [joinStatus, setJoinStatus] = useState("loading");

  // TODO: Implement join functionality
  const handleJoinClick = () => {
    // Get a reference to the team document
    const teamRef = this.db.collection("Teams").doc(teamId);

    // Update the team's members field to add the current user
    teamRef
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(userId),
      })
      .then(() => {
        // Call the memberJoin function on your Firebase Cloud Functions instance
        const memberJoinFunction = firebase
          .functions()
          .httpsCallable("joinTeam");
        return this.memberJoinFunction({ userId, teamId, tokenId });
      })
      .then(() => {
        // TODO: Add code to navigate to team page
        console.log(`Successfully joined team with ID ${teamId}`);
      })
      .catch((error) => {
        console.error(`Error joining team with ID ${teamId}:`, error);
      });
  };
  return (
    <div>
      <h1>Join Team {teamId}</h1>
      <p>Token ID: {tokenId}</p>
      <button onClick={() => handleJoinClick(teamId, tokenId)}>
        Join Team
      </button>
    </div>
  );
};

export default JoinTeam;
