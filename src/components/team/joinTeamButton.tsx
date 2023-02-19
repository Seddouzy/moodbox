import { useFirestore, useAuth, useUser, useFunctions } from "reactfire";
import { useEffect, ComponentType } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { httpsCallable } from "firebase/functions";

interface Props {
  teamId: string;
  tokenId: string;
}

const JoinTeamButton: ComponentType<Props> = ({ teamId, tokenId }) => {
  const db = useFirestore();
  const auth = useAuth();
  const functions = useFunctions();
  const { status, data: user } = useUser();
  const memberJoin = httpsCallable(functions, "memberJoin");

  useEffect(() => {
    console.log(auth, user);
  }, [auth, user]);

  //private memberJoinFunction: firebase.functions.HttpsCallable;
  // TODO: call function vai axios http request

  const handleJoinClick = async () => {
    console.log("yo I'm in joinclick");
    console.log(teamId, tokenId);
    await toast.promise(memberJoin({ userId: user?.uid, teamId, tokenId }), {
      pending: `Trying to join Team ${teamId}`,
      success: `Joined Team ${teamId}`,
      error: {
        render({ data }) {
          return `${data} 🤯`;
        },
      },
    });
  };

  return status === "success" && user ? (
    <button
      onClick={() => handleJoinClick()}
      className="bg-yellow-300 text-yellow-700 px-4 py-2 rounded-lg uppercase "
    >
      Join Team
    </button>
  ) : (
    <div>Login now!</div>
  );
};

export default JoinTeamButton;
