import TwitRouter from "components/Router";
import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";

function App() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	const getUserFromUID = async (givenUID) => {
		let userFromUID;

		await dbService
			.collection("users")
			.where("uid", "==", givenUID)
			.onSnapshot((snapshot) => {
				userFromUID = snapshot.docs[0].data();
				setUserObj(userFromUID);
			});
	};

	//wait for Authorization status to change and set user object accordingly whether the user is logged in or not.
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				getUserFromUID(user.uid);
			} else {
				setUserObj(null);
			}
			setInit(true);
			return;
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
