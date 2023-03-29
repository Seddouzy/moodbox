import { ComponentType } from "react";
import { useAuth, useUser } from "reactfire";
import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import UserDropdown from "./userDropdown";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";
import LoadingSpinner from "../general/loadingSpinner";

interface UserAvatarProps {}

const UserAvatar: ComponentType<UserAvatarProps> = () => {
  const auth = useAuth();
  const user = useUser();
  const firestore = useFirestore();
  const userCollection = collection(firestore, "Users"); //TODO: right user into user collection list

  const signIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // do something with the signed-in user
    } catch (error) {
      console.log(error);
    }
  };

  if (user.status === "loading") {
    return <LoadingSpinner />;
  }

  return user.data ? (
    <UserDropdown>
      <div className="relative rounded-full bg-yellow-500 h-12 w-12 flex flex-row justify-center items-center overflow-hidden">
        {user.data.photoURL ? (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover"
            style={{ backgroundImage: `url("${user.data.photoURL}")` }}
          />
        ) : (
          <UserIcon className="w-8 h-8 m-2" />
        )}
      </div>
    </UserDropdown>
  ) : (
    <button
      className="rounded-full p-2 bg-yellow-500 w-12 h-12 flex flex-row justify-center items-center"
      onClick={() => signIn()}
    >
      <Image alt="Github" width={26} height={26} src="/logos/github-mark.svg" />
    </button>
  );
};

export default UserAvatar;
