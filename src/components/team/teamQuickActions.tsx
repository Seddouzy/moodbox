import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentType } from "react";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
interface TeamQuickActionsProps {
  teamName: string;
}

const TeamQuickActions: ComponentType<TeamQuickActionsProps> = ({
  teamName,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 justify-end items-center h-10 bg-blue">
      <Link href={`${router.asPath}/settings`}>
        <button className="btn">
          Settings
          <Cog6ToothIcon className="w-5 h-5" />
        </button>
      </Link>
    </div>
  );
};

export default TeamQuickActions;
