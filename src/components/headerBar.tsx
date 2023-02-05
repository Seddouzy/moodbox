import { ComponentType } from "react";
import UserAvatar from "./user/userAvatar";
interface HeaderBarProps {
  title: string;
}
export const HeaderBar: ComponentType<HeaderBarProps> = ({ title }) => (
  <div className="p-8 w-full flex flex-row justify-between bg-slate-700">
    <h1 className="text-4xl text-yellow-500 ">MoodBox</h1>
    <UserAvatar />
  </div>
);
