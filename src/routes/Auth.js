import { authService, firebaseInstance } from "fbase";
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
			} else {
				//sign in with an existing account
				data = await authService.signInWithEmailAndPassword(
					email,
					password
				);
			}
			console.log(data);
		} catch (error) {
			setErrorMessage(error.message);
		}
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

		await authService.signInWithPopup(provider);
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
