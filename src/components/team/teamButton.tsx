import { useMyTeams } from "@/hooks/useMyTeams";
import { ComponentType, useState } from "react";
import TeamDropdown from "./teamDropdown";

interface UserAvatarProps {}

const TeamButton: ComponentType<UserAvatarProps> = () => {
  const myTeams = useMyTeams();

  return <TeamDropdown teams={myTeams} />;
};

export default TeamButton;

/*
  1. get my teams (where I'm member of)
  2. show my teams in dropdown
  3. select current team (via route) and show as selected in dropdown
*/
