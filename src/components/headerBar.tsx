import { ComponentType } from "react";
import router from "next/router";
import TeamButton from "./team/teamButton";
import UserAvatar from "./user/userAvatar";
interface HeaderBarProps {
  title: string;
}
export const HeaderBar: ComponentType<HeaderBarProps> = () => {
  const handleLogoSelect = () => {
    router.push(`/`);
  };

  return (
    <div className="w-full dark:bg-slate-700 bg-white border-slate-100 dark:border-slate-800">
      <div className="mx-auto container px-4 py-8 flex flex-row justify-between items-center gap-4 ">
        <div onClick={() => handleLogoSelect()}>
          <h1 className="text-4xl text-yellow-500 [text-shadow:0_0_1px_rgba(255,255,255,1)]">
            MoodBox
          </h1>
        </div>
        <div className="flex-1 flex flex-row items-center justify-end">
          <TeamButton />
        </div>
        <div className="flex items-center ">
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};
