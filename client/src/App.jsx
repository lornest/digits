import NumberBubble from "./components/NumberBubble.jsx";
import "./App.css";
import Target from "./components/Target.jsx";

function App() {
	return (
		<>
			<Target />
			<div className="container mx-auto p-4">
				<div className="grid grid-cols-3 grid-rows-2 gap-4 min-w-max">
					<NumberBubble />
					<NumberBubble />
					<NumberBubble />
					<NumberBubble />
					<NumberBubble />
					<NumberBubble />
				</div>
			</div>
		</>
	);
}

export default App;
