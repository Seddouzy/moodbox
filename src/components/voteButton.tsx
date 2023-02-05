import { ComponentType } from "react";
interface VoteButtonProps {
  name: string;
  sentiment: number;
  vote: (sentiment: number) => void;
}
export const VoteButton: ComponentType<VoteButtonProps> = ({
  name,
  sentiment,
  vote,
}) => (
  <button
    className="px-4 py-2 rounded-md bg-emerald-300 text-emerald-700 shadow-xl animate-bounce"
    onClick={() => vote(sentiment)}
  >
    {name}
  </button>
);
