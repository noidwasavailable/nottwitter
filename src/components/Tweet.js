import { dbService } from "fbase";
import React, { useState } from "react";

const Tweet = ({ tweet, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newTweet, setNewTweet] = useState(tweet.tweet);

	const onDeleteClick = async () => {
		const ok = window.confirm(
			"Are you sure you want to delete this tweet?"
		);
		if (ok) {
			//delete tweet
			await dbService.doc(`tweets/${tweet.id}`).delete();
		}
	};

	const toggleEditing = () => setEditing((prev) => !prev);

	const onSubmit = async (event) => {
		event.preventDefault();

		await dbService.doc(`tweets/${tweet.id}`).update({ tweet: newTweet });

		toggleEditing();
	};

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
