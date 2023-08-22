import NumberBubble from "./NumberBubble.jsx";
import "../App.css";

function GuessableNumbers({ numbers }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 grid-rows-2 gap-2 min-w-max">
        {numbers.map((number, index) => (
          <NumberBubble key={index} number={number} />
        ))}
      </div>
    </div>
  );
}

export default GuessableNumbers
