import GuessableNumbers from "./components/GuessableNumbers.jsx";
import "./App.css";
import Target from "./components/Target.jsx";
import Operators from "./components/Operators.jsx";
import SubmitButton from "./components/SubmitButton.jsx";

const mockData = {
  target: 52,
  numbers: [1, 2, 3, 4, 5, 6],
}

function App() {
  return (
    <>
      <Target target={mockData.target}/>
      <GuessableNumbers numbers={mockData.numbers} />
      <Operators />
      <SubmitButton />
    </>
  );
}

export default App;
