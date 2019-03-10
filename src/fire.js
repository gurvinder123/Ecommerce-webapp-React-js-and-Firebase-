import fire from 'firebase';

// initialize Firebase
var config = {
    apiKey: "AIzaSyBzOr8owVnykteFdbndpawtBLruHuY_etg",
    authDomain: "shoplift-supermarket.firebaseapp.com",
    databaseURL: "https://shoplift-supermarket.firebaseio.com",
    projectId: "shoplift-supermarket",
    storageBucket: "shoplift-supermarket.appspot.com",
    messagingSenderId: "913390417522"
  };
fire.initializeApp(config);

export default fire;
