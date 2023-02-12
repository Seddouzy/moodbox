import { useRouter } from "next/router";

export default function Join() {
  const router = useRouter();
  const { teamid, tokenid } = router.query;

  // TODO: Implement join functionality
  return (
    <div>
      <h1>Join Team {teamid}</h1>
      <p>Token ID: {tokenid}</p>
      <button onClick={handleJoinClick}>Join Team</button>
    </div>
  );
}
