import { authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

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

	const toggleForm = () => setNewAccount((prev) => !prev);

	const disabledFormStyling = { opacity: 0.5 };
	const enabledFormStyling = { opacity: 1.0 };
	const errorMsgStyling = { color: "red" };

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
				<button>Continue with Google</button>
				<button>Continue with GitHub</button>
			</div>
		</div>
	);
};
export default Auth;
