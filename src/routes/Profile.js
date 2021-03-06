import Tweet from "components/Tweet";
import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({ userObj }) => {
	const [tweets, setTweets] = useState([]);

	//sign out
	const onSignoutClick = () => {
		authService.signOut();
	};

	//get my tweets
	useEffect(() => {
		dbService
			.collection("tweets")
			.where("author", "==", userObj.uid)
			.onSnapshot((snapshot) => {
				const tweetArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setTweets(
					tweetArray.sort((a, b) =>
						a.createdAt < b.createdAt ? 1 : -1
					)
				);
			});
	}, [userObj.uid]);

	return (
		<>
			<div>Profile</div>
			<h3>{userObj.displayName}</h3>
			<button onClick={onSignoutClick}>Sign Out</button>

			<Link to={`/editprofile`}>Edit Profile</Link>

			<div>My Tweets</div>
			<div>
				{tweets.map((tweet) => (
					<Tweet
						key={tweet.id}
						tweet={tweet}
						isOwner={tweet.author === userObj.uid}
					/>
				))}
			</div>
		</>
	);
};

export default Profile;
