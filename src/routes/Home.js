import { authService, dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
	const [tweet, setTweet] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.collection("tweets").add({
			tweet: tweet,
			createdAt: Date.now(),
			author: authService.currentUser.uid,
		});

		setTweet("");
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setTweet(value);
	};

	return (
		<div>
			<div>Home</div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					value={tweet}
					onChange={onChange}
					placeholder="What's on your mind?"
					maxLength={140}
				/>
				<input type="submit" value="NotTweet"></input>
			</form>
		</div>
	);
};
export default Home;
