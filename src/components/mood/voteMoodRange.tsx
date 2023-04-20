import { httpsCallable } from "firebase/functions";
import { ComponentType, useState, MouseEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { useFirestore, useFunctions } from "reactfire";
import { pickFromGradient } from "../../shared/services/colorService";
import HandThumbUpIcon from "@heroicons/react/24/outline/HandThumbUpIcon";

interface VoteMoodRangeProps {
  teamId: string;
}

const VoteMoodRange: ComponentType<VoteMoodRangeProps> = ({ teamId }) => {
  const firestore = useFirestore();
  const functions = useFunctions();
  const vote = httpsCallable(functions, "vote");
  const canVoteFunction = httpsCallable<
    { teamId: string },
    { message: string; state: boolean; lastVote?: Date }
  >(functions, "canVote");

  const [value, setValue] = useState<number>(0.5);
  const [color, setColor] = useState<string | null>(null);
  const [canVote, setCanVote] = useState<{
    message: string;
    state: boolean;
    lastVote?: Date;
  }>({
    message: "Initiating...",
    state: false,
  });

  useEffect(() => {
    canVoteFunction({ teamId })
      .then((res) => {
        setCanVote(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const newValue = x / width;
    setValue(newValue);
    setColor(pickFromGradient(newValue));
  };

  const handleMouseLeave = () => {
    setValue(0.5);
    setColor(null);
  };

  const voteSentiment = async () => {
    try {
      await vote({ teamId, sentiment: value });
      toast.success("Vote sent 👌");
    } catch (error: any) {
      if (
        error.message ===
        "User is not allowed to vote! Already voted in last 24 hours."
      ) {
        toast.error("You have already voted in the last 24 hours 🕛");
      } else {
        console.error(error);
        toast.error("An error occurred while submitting your vote 🤯");
      }
    }
  };

  if (!canVote.state) {
    return (
      <>
        <button
          className="p-2 rounded-xl shadow-lg w-full flex flex-row bg-slate-200 dark:bg-slate-600"
          style={{
            background: color as string,
          }}
          onMouseMove={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={voteSentiment}
          disabled={true}
        >
          <div
            className="p-4 rounded-lg bg-slate-700 -translate-x-1/2 hover:outline outline-4 outline-offset-8 outline-slate-700"
            style={{
              marginLeft: `max(2rem, min(${
                (value ?? 0) * 100
              }%, calc(100% - 2rem)`,
            }}
          >
            <HandThumbUpIcon
              className="w-8 h-8 text-slate-200 dark:text-slate-600"
              style={{
                rotate: `${value * 180 + 180}deg`,
                color: color as string,
              }}
            />
          </div>
        </button>
        <div className="outline outline-2 outline-offset-4 outline-red-400 mt-4">
          <div>{canVote.message}</div>
          {canVote.lastVote && (
            <small>
              Last Vote:{" "}
              <span>{new Date(canVote.lastVote)?.toLocaleString()}</span>
            </small>
          )}
        </div>
      </>
    );
  }

  return (
    <button
      className="p-2 rounded-xl shadow-lg w-full flex flex-row bg-slate-200 dark:bg-slate-600"
      style={{
        background: color as string,
      }}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={voteSentiment}
      disabled={!canVote.state}
    >
      <div
        className="p-4 rounded-lg bg-slate-700 -translate-x-1/2 hover:outline outline-4 outline-offset-8 outline-slate-700"
        style={{
          marginLeft: `max(2rem, min(${(value ?? 0) * 100}%, calc(100% - 2rem)`,
        }}
      >
        <HandThumbUpIcon
          className="w-8 h-8 text-slate-200 dark:text-slate-600"
          style={{
            rotate: `${value * 180 + 180}deg`,
            color: color as string,
          }}
        />
      </div>
    </button>
  );
};

export default VoteMoodRange;
