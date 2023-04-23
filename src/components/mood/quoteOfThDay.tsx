import { ComponentType } from "react";

interface QuoteOfTheDayProps {}

const QuoteOfTheDay: ComponentType<QuoteOfTheDayProps> = ({}) => {
  return (
    <div className="flex flex-col items-center ">
      <p>"Stay hungray, Stay foolish" [Steve Jobs, 12th June 2005]</p>
    </div>
  );
};

export default QuoteOfTheDay;
