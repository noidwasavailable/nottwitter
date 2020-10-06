import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [newTweet, setNewTweet] = useState("");
	const [tweets, setTweets] = useState([]);

	const getTweets = async () => {
		(await dbService.collection("tweets").get()).forEach((document) => {
			const tweetObj = {
				...document.data(),
				id: document.id,
			};
			setTweets((prev) => [tweetObj, ...prev]);
		});
	};

	useEffect(() => {
		getTweets();
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.collection("tweets").add({
			tweet: newTweet,
			createdAt: Date.now(),
			author: authService.currentUser.uid,
		});

		setNewTweet("");
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setNewTweet(value);
	};

	return (
		<div>
			<div>Home</div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					value={newTweet}
					onChange={onChange}
					placeholder="What's on your mind?"
					maxLength={140}
				/>
				<input type="submit" value="NotTweet"></input>
			</form>
			<div>
				{tweets.map((tweet) => (
					<div key={tweet.id}>
						<h3>{tweet.tweet}</h3>
						<div>{tweet.author}</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default Home;
