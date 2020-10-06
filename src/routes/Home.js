import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
	const [newTweet, setNewTweet] = useState("");
	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		dbService.collection("tweets").onSnapshot((snapshot) => {
			const tweetArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTweets(
				tweetArray.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
			);
		});
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.collection("tweets").add({
			tweet: newTweet,
			createdAt: Date.now(),
			author: userObj.uid,
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
