import { ComponentType } from "react";

interface SentimentByDayProps {
  sentiments: { sentimentAvg: number; date: Date }[];
}

const SentimentByDay: ComponentType<SentimentByDayProps> = ({ sentiments }) => {
  return <></>;
};

export default SentimentByDay;
