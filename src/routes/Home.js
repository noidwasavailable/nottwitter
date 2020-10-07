import Tweet from "components/Tweet";
import { v4 as uuidv4 } from "uuid";

import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
	const [newTweet, setNewTweet] = useState("");
	const [tweets, setTweets] = useState([]);
	const [attachment, setAttachment] = useState("");

	//whenever the tweets are updated at Firebase, update the webpage
	useEffect(() => {
		dbService
			.collection("tweets")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				setTweets(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				);
			});
	}, []);

	// Submit a new tweet
	const onSubmit = async (event) => {
		event.preventDefault();

		let attachmentURL = "";

		if (attachment) {
			const attachmentRef = storageService
				.ref()
				.child(`${userObj.uid}/${uuidv4()}`);

			const result = await attachmentRef.putString(
				attachment,
				"data_url"
			);
			attachmentURL = await result.ref.getDownloadURL();
		}
		const tweet = {
			tweet: newTweet,
			createdAt: Date.now(),
			author: userObj.uid,
			attachmentURL,
		};

		await dbService.collection("tweets").add(tweet);
		setNewTweet("");
		setAttachment("");
	};

	//keep changing the textbox value as you type on
	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setNewTweet(value);
	};

	//read the attached file using FileReader
	const onFileChange = (event) => {
		const {
			target: { files },
		} = event;

		const file = files[0];
		const reader = new FileReader();

		//event listener for reading the file
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setAttachment(result);
		};

		//read the file
		reader.readAsDataURL(file);
	};

	const onClearAttachment = () => {
		setAttachment(null);
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
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" value="NotTweet"></input>
				{attachment && (
					<div>
						<img
							src={attachment}
							width="100px"
							height="100px"
							alt="Attachment Selected"
						/>
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
			</form>
			<div>
				{tweets.map((tweet) => (
					<Tweet
						key={tweet.id}
						tweet={tweet}
						isOwner={tweet.author === userObj.uid}
					/>
				))}
			</div>
		</div>
	);
};
export default Home;
