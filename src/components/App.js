import TwitRouter from "components/Router";
import React, { useState } from "react";
import { authService, suthService } from "fbase";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	return (
		<>
			<TwitRouter isLoggedIn={isLoggedIn} />
			<footer>NotTwitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
