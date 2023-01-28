import { ComponentType } from "react";
import UserAvatar from "./user/userAvatar";
interface HeaderBarProps {
  title: string;
}
export const HeaderBar: ComponentType<HeaderBarProps> = ({ title }) => (
  <div className="p-8 w-full flex flex-row justify-between gap-4 bg-slate-700 text-white">
    <h1>MoodBox</h1>
    <UserAvatar />
  </div>
);
