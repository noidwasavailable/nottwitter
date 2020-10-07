import TwitRouter from "components/Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	//wait for Authorization status to change and set user object accordingly whether the user is logged in or not.
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setUserObj(user);
			} else {
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
				<TwitRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
			) : (
				<span>Loading...</span>
			)}
			<footer>NotTwitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
