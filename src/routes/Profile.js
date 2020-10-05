import { authService } from "fbase";
import React from "react";

const Profile = () => {
	const onSignoutClick = (event) => {
		authService.signOut();
	};
	return (
		<>
			<div>Profile</div>
			<button onClick={onSignoutClick}>Sign Out</button>
		</>
	);
};

export default Profile;
