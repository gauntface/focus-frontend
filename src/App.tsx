import { useState } from "react";
import "./App.css";
import { MarketingNav } from "./components/MarketingNav/MarketingNav";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<MarketingNav />
		</>
	);
}

export default App;
