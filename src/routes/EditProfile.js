import React, { useEffect, useState } from "react";

const EditProfile = ({ userObj }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setNewDisplayName(value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (newDisplayName !== userObj.displayName) {
		}
	};
	return (
		<>
			<span>Edit Profile</span>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Display Name"
					onChange={onChange}
				/>
				<input type="submit" value="Update" />
			</form>
			<div>{userObj.uid}</div>
		</>
	);
};

export default EditProfile;
