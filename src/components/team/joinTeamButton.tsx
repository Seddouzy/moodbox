import { firebase } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { ComponentType } from "react";

interface Props {
  teamId: string;
  tokenId: string;
}

class JoinTeamButton extends ComponentType<Props> {
  private db: firebase.firestore.Firestore;
  private memberJoinFunction: firebase.functions.HttpsCallable;

  constructor(props: Props) {
    super(props);

    firebase.initializeApp({
      // Initialize your Firebase app config here
    });

    this.db = firebase.firestore();
    this.memberJoinFunction = firebase.functions().httpsCallable("memberJoin");
  }

  private handleJoinClick = () => {
    const userId = firebase.auth().currentUser.uid;
    const { teamId, tokenId } = this.props;

    // Get a reference to the team document
    const teamRef = this.db.collection("teams").doc(teamId);

    // Update the team's members field to add the current user
    teamRef
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(userId),
      })
      .then(() => {
        // Call the memberJoin function on your Firebase Cloud Functions instance
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

  public render() {
    return <button onClick={this.handleJoinClick}>Join Team</button>;
  }
}

export default JoinTeamButton;
