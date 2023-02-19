import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";

const CreateTeam = () => {
  const firestore = useFirestore();

  return (
    <div className="p-8 flex flex-row item-center gap-4 justify-center">
      <form action="/send-data-here" method="post">
        <label form="createTeamForm">Enter Team Name!</label>
        <input type="text" id="createTeamName" name="createTeamName" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTeam;
