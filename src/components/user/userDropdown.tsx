import { ComponentType, Fragment, ReactNode } from "react";
import { Popover, Transition } from "@headlessui/react";
import { signOut } from "firebase/auth";
import { useAuth, useUser } from "reactfire";
import useDarkMode from "./useDarkMode";

import {
  ChartBarIcon,
  CodeBracketIcon,
  HeartIcon,
  MoonIcon,
  SunIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import getConfig from "next/config";
import { useRouter } from "next/router";

interface UserDropdownProps {
  children: ReactNode;
}

//TODO: dark mode mit function, team session connection, create team option

const UserDropdown: ComponentType<UserDropdownProps> = ({ children }) => {
  const { publicRuntimeConfig } = getConfig();
  const [colorTheme, setTheme] = useDarkMode();
  const auth = useAuth();

  const router = useRouter();

  return (
    <Popover className="relative" as="div">
      {({ open }) => (
        <>
          <Popover.Button className="align-middle btnround">
            {children}
          </Popover.Button>
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
                <div className="bg-gray-50 dark:bg-slate-700 p-4">
                  <a
                    href={"/team"}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 dark:text-white sm:h-7 sm:w-7">
                      <UserGroupIcon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Create Team
                      </p>
                      <p className="text-sm text-gray-500 dark:text-white">
                        Go Team!
                      </p>
                    </div>
                  </a>
                </div>
                {/* <-- Source Code--> */}
                <div className="bg-gray-50 dark:bg-slate-700 p-4">
                  <a
                    href={publicRuntimeConfig.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 dark:text-white sm:h-7 sm:w-7">
                      <CodeBracketIcon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Source Code
                      </p>
                      <p className="text-sm text-gray-500 dark:text-white">
                        Pls contribute!
                      </p>
                    </div>
                  </a>
                </div>
                {/* <-- Logout --> */}
                <div className="bg-gray-50 dark:bg-slate-700 p-4">
                  <a
                    onClick={() => signOut(auth)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 dark:text-white sm:h-7 sm:w-7">
                      <UserIcon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm fon-medium dark:text-white">
                        Logout
                      </p>
                      <p className="text-sm text-gray-500 dark:text-white">
                        Bye!
                      </p>
                    </div>
                  </a>
                </div>
                {/* <-- Dark Mode --> */}
                <div className="bg-gray-300 dark:bg-slate-700 dark:text-white p-4 justify-center">
                  {colorTheme === "dark" ? (
                    <div className="-m-3 flex rounded-lg p-2 justify-center transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <button
                        onClick={() => setTheme("dark")}
                        className="flex h-10 w-10 shrink-0  text-gray-600 sm:h-7 sm:w-7"
                      >
                        <MoonIcon className="w-6 h-6" />
                      </button>
                    </div>
                  ) : (
                    <div className="-m-3 flex rounded-lg p-2 justify-center transition duration-150 ease-in-out hover:bg-slate-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <button
                        onClick={() => setTheme("light")}
                        className="flex h-10 w-10 shrink-0 justify-center text-white sm:h-7 sm:w-7"
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
