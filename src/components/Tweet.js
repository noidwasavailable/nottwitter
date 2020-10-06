import React from "react";

const Tweet = ({ tweet }) => (
	<div key={tweet.id}>
		<h3>{tweet.tweet}</h3>
		<div>{tweet.author}</div>
	</div>
);

export default Tweet;
