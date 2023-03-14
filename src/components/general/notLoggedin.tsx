import { ComponentType } from "react";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";

interface NotLoggedinProps {
  text?: string;
}

const NotLoggedin: ComponentType<NotLoggedinProps> = ({ text }) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-center text-red-600 bg-red-300 p-4 rounded-lg text-lg">
      <ExclamationCircleIcon className="w-10 h-10" />
      <strong className="text-2xl">Please log in</strong>
      {text && <strong>: {text}</strong>}
    </div>
  );
};

export default NotLoggedin;
