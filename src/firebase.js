import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBWGpRDdmIDhdvgokhy-wsFOGzLsIsdQfw",
	authDomain: "nottwitternomad.firebaseapp.com",
	databaseURL: "https://nottwitternomad.firebaseio.com",
	projectId: "nottwitternomad",
	storageBucket: "nottwitternomad.appspot.com",
	messagingSenderId: "532949917568",
	appId: "1:532949917568:web:b71f618aa56334a0c7eb65",
};

export default firebase.initializeApp(firebaseConfig);
