import TwitRouter from "components/Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObj(user);
			} else {
				setIsLoggedIn(false);
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
				<TwitRouter isLoggedIn={isLoggedIn} userObj={userObj} />
			) : (
				<span>Loading...</span>
			)}
			<footer>NotTwitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
