import { httpsCallable } from "firebase/functions";
import { ComponentType, useState, MouseEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { useFirestore, useFunctions } from "reactfire";
import HandThumbUpIcon from "@heroicons/react/24/outline/HandThumbUpIcon";
import colors from "tailwindcss/colors";

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

  const hexToRgb = (hex: string): number[] => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const [, r, g, b] = result;
      return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
    } else {
      throw new Error(`Invalid hex color value: ${hex}`);
    }
  };
  const colorArr = [
    colors.red[400],
    colors.amber[400],
    colors.yellow[400],
    colors.lime[400],
    colors.green[500],
  ].map((hex) => hexToRgb(hex));

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

  const pickFromGradient = (value: number): string => {
    if (value <= 0) {
      return `rgb(${colorArr[0].join(", ")})`;
    } else if (value >= 1) {
      return `rgb(${colorArr[2].join(", ")})`;
    } else {
      const index = Math.floor(value * (colorArr.length - 1));
      const [r1, g1, b1] = colorArr[index];
      const [r2, g2, b2] = colorArr[index + 1];
      const ratio = value * (colorArr.length - 1) - index;
      const r = Math.round(r1 + ratio * (r2 - r1));
      const g = Math.round(g1 + ratio * (g2 - g1));
      const b = Math.round(b1 + ratio * (b2 - b1));
      return `rgb(${r}, ${g}, ${b})`;
    }
  };
  if (!canVote.state) {
    return (
      <>
        <div>{canVote.message}</div>
        {canVote.lastVote && (
          <small>
            Last Vote:{" "}
            <span>{new Date(canVote.lastVote)?.toLocaleString()}</span>
          </small>
        )}
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
