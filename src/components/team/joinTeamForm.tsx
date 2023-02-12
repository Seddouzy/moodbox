import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";

const JoinTeamForm = () => {
  const firestore = useFirestore();

  return (
    <div className="p-8 flex flex-row item-center gap-4 justify-center">
      <form action="/send-data-here" method="post">
        <label form="invitationCode">Enter Team invitation Code! 😍</label>
        <input type="text" id="invitationCode" name="invitationCode" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JoinTeamForm;
