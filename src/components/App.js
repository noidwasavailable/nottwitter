import TwitRouter from "components/Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);
	return (
		<>
			{init ? (
				<TwitRouter isLoggedIn={isLoggedIn} />
			) : (
				<span>Loading...</span>
			)}
			<footer>NotTwitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
