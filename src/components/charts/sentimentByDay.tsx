import { ComponentType } from "react";
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

interface SentimentByDayProps {
  sentiments: { sentimentAvg: number; date: Date }[];
}

const SentimentByDay: ComponentType<SentimentByDayProps> = ({ sentiments }) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: "time",
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

export default SentimentByDay;
