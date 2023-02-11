import { ComponentType, Fragment, ReactNode } from "react";
import { Popover, Transition } from "@headlessui/react";
import useDarkMode from "./useDarkMode";

import {
  ArrowDownCircleIcon,
  CodeBracketIcon,
  HeartIcon,
  MoonIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import getConfig from "next/config";

interface UserDropdownProps {
  children: ReactNode;
}

//TODO: dark mode mit function, team session connection, create team option

const UserDropdown: ComponentType<UserDropdownProps> = ({ children }) => {
  const { publicRuntimeConfig } = getConfig();
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>{children}</Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-80 max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
              {/* <-- Team creation and join --> */}
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-gray-50 p-4">
                  <a
                    key={"bla"}
                    href={"reports"}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 sm:h-7 sm:w-7">
                      <HeartIcon />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Join or Create Team
                      </p>
                      <p className="text-sm text-gray-500">Go Team!</p>
                    </div>
                  </a>
                </div>
                {/* <-- Team statistics --> */}
                <div className="bg-gray-50 p-4">
                  <a
                    key={"bla"}
                    href={"reports"}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 sm:h-7 sm:w-7">
                      <UserGroupIcon />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Team</p>
                      <p className="text-sm text-gray-500">Statistics</p>
                    </div>
                  </a>
                </div>
                {/* <-- Source Code--> */}
                <div className="bg-gray-50 p-4">
                  <a
                    href={publicRuntimeConfig.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 sm:h-7 sm:w-7">
                      <CodeBracketIcon />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Source Code
                      </p>
                      <p className="text-sm text-gray-500">Pls contribute!</p>
                    </div>
                  </a>
                </div>
                {/* <-- Dark Mode --> */}
                <div className="bg-gray-300 p-4 justify-center">
                  {colorTheme === "dark" ? (
                    <div className="-m-3 flex rounded-lg p-2 justify-center transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <button
                        onClick={() => setTheme("dark")}
                        className="flex h-10 w-10 shrink-0  text-gray-600 sm:h-7 sm:w-7"
                      >
                        <MoonIcon />
                      </button>
                    </div>
                  ) : (
                    <div className="-m-3 flex rounded-lg p-2 justify-center transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <button
                        onClick={() => setTheme("light")}
                        className="flex h-10 w-10 shrink-0 justify-center text-gray-600 sm:h-7 sm:w-7"
                      >
                        <SunIcon />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default UserDropdown;
