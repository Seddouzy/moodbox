import { ComponentType } from "react";
interface HeaderBarProps {
  title: string;
}
export const HeaderBar: ComponentType<HeaderBarProps> = ({ title }) => (
  <div className="p-8 w-full flex flex-row justify-between gap-4 bg-slate-700 text-white">
    <h1>MoodBox</h1>
    <div>UserAvatar</div>
  </div>
);
