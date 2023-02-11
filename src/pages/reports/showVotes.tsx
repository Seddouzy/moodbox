import { ComponentType } from "react";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";

export const ShowVotes = ({}) => (
  <div className="text-white">
    <div>
      <h3>Good: </h3>
      <ul></ul>
    </div>
    <div>
      <h3>Bad: </h3>
      <ul></ul>
    </div>
  </div>
);
