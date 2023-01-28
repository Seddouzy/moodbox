import { ComponentType, ReactNode } from "react";
interface VoteButtonProps {
  name?: string;
  icon?: ReactNode;
  sentiment: number;
  customClasses?: string[];
  vote: (sentiment: number) => void;
}
export const VoteButton: ComponentType<VoteButtonProps> = ({
  name,
  customClasses = ["bg-emerald-300", "text-emerald-700"],
  icon,
  sentiment,
  vote,
}) => (
  <button
    className={`px-4 py-2 rounded-md shadow-xl flex flex-row gap-2 items-center ${customClasses?.join(
      " "
    )}`}
    onClick={() => vote(sentiment)}
  >
    {name}
    {icon}
  </button>
);
