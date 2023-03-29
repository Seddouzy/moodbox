import { useRouter } from "next/router";
import { ComponentType, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import ChevronUpDownIcon from "@heroicons/react/24/outline/ChevronUpDownIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface TeamDropdownProps {
  selectedTeamId?: string;
  teams: { name: string; id: string }[];
}

const TeamDropdown: ComponentType<TeamDropdownProps> = ({
  teams,
  selectedTeamId,
}) => {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState(
    teams.find((team) => team.id === selectedTeamId) ?? teams[0]
  );
  const [query, setQuery] = useState("");

  const filteredTeams =
    query === ""
      ? teams
      : teams.filter((team) =>
          team.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleTeamSelect = (teamId: string) => {
    if (router.asPath !== `/team/${teamId}`) {
      router.push(`/team/${teamId}`);
    }
  };

  return teams?.length ? (
    <Combobox value={selectedTeam} onChange={setSelectedTeam}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden btn  px-2">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-transparent focus:outline-none"
            displayValue={(team) => selectedTeam.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md from-gold-300 to-gold-500 bg-gradient-to-br py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredTeams.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredTeams.map((team) => (
                <Combobox.Option
                  key={team.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gold-400 text-gold-800" : "text-gray-900"
                    }`
                  }
                  value={team}
                  onClick={() => handleTeamSelect(team.id)}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {team.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-gold-600" : "text-gold-700"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  ) : null;
};

export default TeamDropdown;
