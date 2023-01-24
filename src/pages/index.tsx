import { VoteButton } from "@/components/voteButton";

export default function Home() {
  const voteSentiment = (sentiment: number) => {
    console.log(sentiment);
  };

  return (
    <div className="p-8 flex flex-row item-center gap-4">
      <VoteButton name="thumbUp" sentiment={1} vote={voteSentiment} />
      <VoteButton name="thumbDown" sentiment={2} vote={voteSentiment} />
    </div>
  );
}
