import { ComponentType, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TimeSeriesScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import { amber } from "tailwindcss/colors";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

ChartJS.register(
  TimeSeriesScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PersonSentimentByDayProps {
  teamId: string;
  userId: string;
}

const PersonSentimentByDay: ComponentType<PersonSentimentByDayProps> = ({
  teamId,
  userId,
}) => {
  const [sentiments, setSentiments] = useState([]);

  useEffect(() => {
    const fetchSentiments = async () => {
      const firestore = getFirestore();
      const votesRef = collection(firestore, `teams/${teamId}/votes`);
      const userVotesQuery = query(votesRef, where("userId", "==", userId));
      const votesSnapshot = await getDocs(userVotesQuery);
      const sentimentData = votesSnapshot.docs.map((doc) => doc.data());
      setSentiments(sentimentData);
    };

    if (teamId && userId) {
      fetchSentiments();
    }
  }, [teamId, userId]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: "timeseries",
        time: {
          unit: "week",
        },
      },
      y: {
        type: "linear",
        suggestedMin: 0,
        suggestedMax: 1,
        ticks: {
          stepSize: 0.25,
        },
      },
    },
  };

  const labels = sentiments.map((sentiment) => sentiment.date);
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Sentiment",
        backgroundColor: amber["400"],
        borderColor: amber["500"],
        data: sentiments.map((sentiment) => sentiment.sentimentAvg),
        borderWidth: 1.5,
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default PersonSentimentByDay;
