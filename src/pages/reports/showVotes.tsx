import SentimentByDay from "@/components/charts/sentimentByDay";
import { ComponentType } from "react";

const ShowVotes: ComponentType = () => (
  <div className="text-white">
    <div>
      <h3>Good: </h3>
      <ul></ul>
    </div>
    <div>
      <h3>Bad: </h3>
      <ul></ul>
    </div>
    <SentimentByDay sentiments={[]}/>
  </div>
);

export default ShowVotes;
