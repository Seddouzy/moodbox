import { useFirestoreDocData, useFirestore } from "reactfire";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import CreateTeamInvitationLink from "../../../components/team/createTeamInvitationLink";

const TeamDetails: NextPage = () => {
  const router = useRouter();
  const { teamId } = router.query;
  const firestore = useFirestore();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  const updateTeam = async (data: Record<string, any>) => {
    if (teamId) {
      const docRef = doc(firestore, "Teams", teamId.toString());
      updateDoc(docRef, data);
    }
  };

  useEffect(() => {
    if (teamId) {
      const docRef = doc(firestore, "Teams", teamId.toString());
      onSnapshot(
        docRef,
        (doc) => {
          setData(doc.data());
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    }
  }, [teamId, firestore]);

  return (
    <div className="container p-4 text-black dark:text-white">
      {error && <div>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}
      {data && !loading && !error && (
        <>
          <h1 className="text-xl">{data.name}</h1>
          {teamId && (
            <CreateTeamInvitationLink
              teamId={teamId.toString()}
              teamData={data}
              updateTeam={updateTeam}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TeamDetails;
