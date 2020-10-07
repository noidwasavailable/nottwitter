import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";

const Tweet = ({ tweet, authorObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newTweet, setNewTweet] = useState(tweet.tweet);
	// const [authorObj, setAuthorObj] = useState(null);

	// const getUserFromUID = async (givenUID) => {
	// 	let userFromUID;

	// 	await dbService
	// 		.collection("users")
	// 		.where("uid", "==", givenUID)
	// 		.onSnapshot((snapshot) => {
	// 			userFromUID = snapshot.docs[0].data();
	// 			setAuthorObj(userFromUID);
	// 		});
	// };

	// useEffect(() => {
	// 	getUserFromUID(tweet.author);
	// 	console.log(authorObj);
	// 	return;
	// }, [tweet]);

	// Deleting Tweet
	const onDeleteClick = async () => {
		const ok = window.confirm(
			"Are you sure you want to delete this tweet?"
		);
		if (ok) {
			//delete tweet
			if (tweet.attachmentURL)
				await storageService.refFromURL(tweet.attachmentURL).delete();
			await dbService.doc(`tweets/${tweet.id}`).delete();
		}
	};

	//Toggle the mode whether to edit existing tweet or not
	const toggleEditing = () => setEditing((prev) => !prev);

	//Submit an update to an existing tweet
	const onSubmit = async (event) => {
		event.preventDefault();

		await dbService.doc(`tweets/${tweet.id}`).update({ tweet: newTweet });

		toggleEditing();
	};

	//keep updating the textbox value
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewTweet(value);
	};

	return (
		<div>
			<div>
				{editing ? (
					<>
						{isOwner && (
							<>
								<form onSubmit={onSubmit}>
									<input
										type="text"
										value={newTweet}
										onChange={onChange}
										required
									/>
									<input type="submit" value="Update" />
								</form>
								<button onClick={toggleEditing}>Cancel</button>
							</>
						)}
					</>
				) : (
					<h3>{tweet.tweet}</h3>
				)}
			</div>
			{tweet.attachmentURL && (
				<img
					src={tweet.attachmentURL}
					width="100px"
					height="100px"
					alt="Uploaded Attachment"
				/>
			)}
			<div>{tweet.author}</div>
			{isOwner && (
				<>
					<button onClick={onDeleteClick}>Delete</button>
					<button onClick={toggleEditing}>Edit</button>
				</>
			)}
		</div>
	);
};

export default Tweet;
