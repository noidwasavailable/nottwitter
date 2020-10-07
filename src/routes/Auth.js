import {
	authService,
	dbService,
	firebaseInstance,
	storageService,
} from "fbase";
import React, { useState } from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	//on updating the email or password by typing in
	const onChange = (event) => {
		const {
			target: { name, value },
		} = event;

		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	//sign in or create a new account depending on the current mode
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			let data;
			if (newAccount) {
				//create account
				data = await authService.createUserWithEmailAndPassword(
					email,
					password
				);

				const user = {
					displayName: "",
					uid: data.user.uid,
					email,
					profilePicture: "",
					bio: "",
				};

				createNewUser(user);
			} else {
				//sign in with an existing account
				data = await authService.signInWithEmailAndPassword(
					email,
					password
				);
			}
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	//checks if the user has a profile pic. If not, choose the default profile pic and create user in the DB.
	const createNewUser = async (user) => {
		if (!user.profilePicture) {
			const photoRef = storageService
				.ref()
				.child(`public/default_profile_pic.png`);
			user.profilePicture = await photoRef.getDownloadURL();
		}

		await dbService.collection("users").add(user);

		console.log("Hey! A new user!");
	};

	///////////////////////////////HELPER FUNCTIONS////////////////////////////////////

	//toggle between create new account or sign into existing account
	const toggleForm = () => setNewAccount((prev) => !prev);

	//log in using socials (google and github)
	const onSocialClick = async (event) => {
		const {
			target: { name },
		} = event;
		let provider;
		if (name === "googleButton") {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		} else if (name === "githubButton") {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}

		const socialResponse = await authService.signInWithPopup(provider);

		if (socialResponse.additionalUserInfo.isNewUser) {
			const user = {
				displayName: socialResponse.user.displayName,
				uid: socialResponse.user.uid,
				email: socialResponse.user.email,
				profilePicture: socialResponse.user.photoURL,
				bio: "",
			};

			createNewUser(user);
		}
	};

	/////////////////////////////////////////STYLES///////////////////////////////////

	const disabledFormStyling = { opacity: 0.5 };
	const enabledFormStyling = { opacity: 1.0 };
	const errorMsgStyling = { color: "red" };

	/////////////////////////////////////HTML////////////////////////////////////////

	return (
		<div>
			<div onClick={toggleForm}>
				<span
					style={
						newAccount ? disabledFormStyling : enabledFormStyling
					}
				>
					Sign in
				</span>{" "}
				<span>|</span>{" "}
				<span
					style={
						newAccount ? enabledFormStyling : disabledFormStyling
					}
				>
					Create Account
				</span>
			</div>
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="E-mail"
					required
					value={email}
					onChange={onChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={onChange}
				/>
				<input
					type="submit"
					value={newAccount ? "Create Account" : "Sign In"}
				/>
			</form>
			<div style={errorMsgStyling}>{errorMessage}</div>
			<div>
				<button onClick={onSocialClick} name="googleButton">
					Continue with Google
				</button>
				<button onClick={onSocialClick} name="githubButton">
					Continue with GitHub
				</button>
			</div>
		</div>
	);
};
export default Auth;
