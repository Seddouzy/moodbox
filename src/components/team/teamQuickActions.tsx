import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentType } from "react";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import { ChartBarIcon } from "@heroicons/react/24/outline";
interface TeamQuickActionsProps {
  teamName: string;
}

const TeamQuickActions: ComponentType<TeamQuickActionsProps> = ({
  teamName,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 justify-between items-center pb-4 border-slate-100 dark:border-slate-800">
      <h2 className="text-3xl">{teamName}</h2>
      <div className="flex flex-row gap-2 items-center">
        <Link href={`${router.asPath}/reports`}>
          <button className="btn">
            <ChartBarIcon className="w-6 h-6" />
          </button>
        </Link>
        <Link href={`${router.asPath}/settings`}>
          <button className="btn">
            <Cog6ToothIcon className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TeamQuickActions;
