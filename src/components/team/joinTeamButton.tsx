import { useFirestore, useAuth, useUser, useFunctions } from "reactfire";
import { useEffect, ComponentType, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

interface Props {
  teamId: string;
  tokenId: string;
  userIsTeamMember?: boolean;
}

const JoinTeamButton: ComponentType<Props> = ({
  teamId,
  tokenId,
  userIsTeamMember = false,
}) => {
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const functions = useFunctions();
  const { status, data: user } = useUser();
  const memberJoin = httpsCallable(functions, "memberJoin");

  const [canJoin, setCanJoin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userIsTeamMember && teamId) {
      router.push(`/team/${teamId}`);
    }
  }, [userIsTeamMember, teamId]);

  //private memberJoinFunction: firebase.functions.HttpsCallable;
  // TODO: call function vai axios http request

  const handleJoinClick = async () => {
    setLoading(true);
    await toast
      .promise(memberJoin({ userId: user?.uid, teamId, tokenId }), {
        pending: `Trying to join Team ${teamId}`,
        success: `Joined Team ${teamId}`,
        error: {
          render({ data }) {
            const err = data as any;
            return `${err.code}: ${err.message} 🤯`;
          },
        },
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  return status === "success" && user ? (
    <button
      onClick={handleJoinClick}
      className="btn"
      disabled={!canJoin || loading}
    >
      Join Team
      {loading && <ArrowPathIcon className="animate-spin w-6 h-6" />}
    </button>
  ) : (
    <div>Login now!</div>
  );
};

export default JoinTeamButton;
