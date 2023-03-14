import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { ComponentType } from "react";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: ComponentType<LoadingSpinnerProps> = ({ text }) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-center">
      <ArrowPathIcon className="animate-spin w-6 h-6" />
      {text && <strong>{text}</strong>}
    </div>
  );
};

export default LoadingSpinner;
