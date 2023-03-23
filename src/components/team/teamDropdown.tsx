import { useRouter } from "next/router";

interface TeamDropdownProps {}

const TeamDropdown = ({ teams }) => {
  const router = useRouter();

  const handleTeamSelect = (teamId) => {
    router.push(`/teams/${teamId}`);
  };

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => handleTeamSelect(team.id)}
            className="btn"
            role="menuitem"
          >
            {team.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamDropdown;
