import { useFirestore, useAuth, useUser, useFunctions } from "reactfire";
import { useEffect, ComponentType, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import LoadingSpinner from "../general/loadingSpinner";
import NotLoggedin from "../general/notLoggedin";
import { current } from "tailwindcss/colors";

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
  const currentUser = useUser();
  const memberJoin = httpsCallable(functions, "memberJoin");
  const userEmail = currentUser.data?.email;
  const userName = currentUser.data?.displayName;
  const userPhoto = currentUser.data?.photoURL;

  const [canJoin, setCanJoin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userIsTeamMember && teamId) {
      router.push(`/team/${teamId}`);
    } else {
      setCanJoin(true);
    }
  }, [userIsTeamMember, teamId]);

  //private memberJoinFunction: firebase.functions.HttpsCallable;
  // TODO: call function via axios http request

  const handleJoinClick = async () => {
    setLoading(true);
    await toast
      .promise(
        memberJoin({
          role: "member",
          userId: user?.uid,
          teamId,
          tokenId,
          userName: userName,
          userPhoto: userPhoto,
          userEmail: userEmail,
        }),
        {
          pending: `Trying to join Team ${teamId}`,
          success: `Joined Team ${teamId}`,
          error: {
            render({ data }) {
              const err = data as any;
              return `${err.code}: ${err.message} 🤯`;
            },
          },
        }
      )
      .then(() => router.push(`/team/${teamId}`))
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
      {loading && <LoadingSpinner />}
    </button>
  ) : (
    <div>
      Login now! <NotLoggedin />
    </div>
  );
};

export default JoinTeamButton;
