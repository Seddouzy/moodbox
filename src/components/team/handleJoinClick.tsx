import {} from "firebase/firestore";

function handleJoinClick() {
  const userId = firebase.auth().currentUser.uid;
  const memberJoinFunction = firebase.functions().httpsCallable("memberJoin");
  memberJoinFunction({ userId, teamId, tokenId })
    .then(() => {
      // TODO: Add code to navigate to team page
    })
    .catch((error) => {
      console.error(error);
    });
}

export default handleJoinClick;
