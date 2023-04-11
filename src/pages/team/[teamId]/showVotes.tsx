import SentimentByDay from "@/components/charts/sentimentByDay";
import TotalVotesPerTeam from "@/components/charts/totalVotesPerTeam";
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
    <TotalVotesPerTeam />
    <SentimentByDay sentiments={[]} />
  </div>
);

export default ShowVotes;
