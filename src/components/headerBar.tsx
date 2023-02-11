import { ComponentType } from "react";
import UserAvatar from "./user/userAvatar";
interface HeaderBarProps {
  title: string;
}
export const HeaderBar: ComponentType<HeaderBarProps> = ({ title }) => (
  <div className="p-8 w-full flex flex-row justify-between dark:bg-slate-700 bg-white">
    <h1 className="text-4xl text-yellow-500 [text-shadow:0_0_1px_rgba(255,255,255,1)]">
      MoodBox
    </h1>
    <UserAvatar />
  </div>
);
