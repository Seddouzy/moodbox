import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentType } from "react";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import {
  ChartBarIcon,
  HandThumbUpIcon,
  HeartIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useFirestore } from "reactfire";
interface TeamQuickActionsProps {
  teamName: string;
}

const TeamQuickActions: ComponentType<TeamQuickActionsProps> = ({
  teamName,
}) => {
  const router = useRouter();
  const { teamId } = router.query;
  const firestore = useFirestore();

  const goToReports = () => {
    if (router.pathname !== "/reports") {
      router.push(`/team/${teamId}/reports`);
    }
  };

  const goToSettings = () => {
    if (router.pathname !== "/settings") {
      router.push(`/team/${teamId}/settings`);
    }
  };

  const goToTeam = () => {
    if (teamId) {
      router.push(`/team/${teamId}`);
    }
  };

  const goToMyReports = () => {
    if (teamId) {
      router.push(`/team/${teamId}/myReports`);
    }
  };

  return (
    <div className="flex flex-row gap-2 justify-between items-center pb-4 border-slate-100 dark:border-slate-800">
      <h2 className="text-3xl">{teamName}</h2>
      <div className="flex flex-row gap-2 items-center">
        <button className="btn" onClick={goToTeam}>
          <HandThumbUpIcon className="w-6 h-6" />
        </button>
        <button className="btn" onClick={goToReports}>
          <ChartBarIcon className="w-6 h-6" />
        </button>
        <button className="btn" onClick={goToMyReports}>
          <RocketLaunchIcon className="w-6 h-6" />
        </button>
        <button className="btn" onClick={goToSettings}>
          <Cog6ToothIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TeamQuickActions;
