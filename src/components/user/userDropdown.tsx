import { ComponentType, Fragment, ReactNode } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import getConfig from "next/config";

interface UserDropdownProps {
  children: ReactNode;
}

const UserDropdown: ComponentType<UserDropdownProps> = ({ children }) => {
  const { publicRuntimeConfig } = getConfig();

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
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  <a
                    key={"bla"}
                    href={"bla"}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                      <ArrowDownCircleIcon />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">hey</p>
                      <p className="text-sm text-gray-500">no</p>
                    </div>
                  </a>
                </div>
                <div className="bg-gray-50 p-4">
                  <a
                    href={publicRuntimeConfig.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flow-root rounded-md px-4 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <span className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        Source Code
                      </span>
                    </span>
                    <span className="block text-sm text-gray-500">
                      Pls contribute!
                    </span>
                  </a>
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
