import { ComponentType } from "react";
import { useAuth, useUser } from "reactfire";
import { GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import UserDropdown from "./userDropdown";

interface UserAvatarProps {}

const UserAvatar: ComponentType<UserAvatarProps> = () => {
  const auth = useAuth();
  const user = useUser();

  const signIn = async () => {
    const provider = new GithubAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const doStuff = () => {
    console.log("stuff");
  };

  return user.data ? (
    <UserDropdown>
      <div className="relative rounded-full bg-yellow-500 h-12 w-12 flex flex-row justify-center items-center overflow-hidden">
        {user.data.photoURL ? (
          <Image
            alt={user.data.displayName ?? ""}
            fill
            src={user.data.photoURL ?? ""}
          />
        ) : (
          <UserIcon className="w-8 h-8 m-2" />
        )}
      </div>
    </UserDropdown>
  ) : (
    <button
      className="rounded-full p-2 bg-emerald-300 w-12 h-12 flex flex-row justify-center items-center"
      onClick={() => signIn()}
    >
      <Image alt="Github" width={26} height={26} src="/logos/github-mark.svg" />
    </button>
  );
};

export default UserAvatar;
