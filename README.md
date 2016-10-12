
Welcome to FairShare!

To see this project in action, go here: https://fairshare-cca1f.firebaseapp.com/

This project was created as a capstone to a six month full stack web immersion course at Galvanize in Denver. Given ten
days to learn and deploy a new technology, I taught myself ReactJs and firebase in order to build a shared bill
application that allows multiple users to input expenses for an event and see real-time updates as they go.

Note: in order to npm install this project, you must obtain a firebase account and create a database with proper permissions.
Documentation here: https://firebase.google.com/docs/web/setup

The hidden Firebase.js file has this structure:
```
const firebase = require('firebase');

const config = {
  apiKey: YOUR_KEY,
  authDomain: YOUR_AUTH_DOMAIM,
  databaseURL: YOUR_DATABASE_URL
  storageBucket: YOUR_STORAGE_BUCKET,
  messagingSenderId: YOUR_MESSAGING_SENDER_ID
};

const firebaseApp = firebase.initializeApp(config);

module.exports = firebaseApp;
```
How to use the app FAQ:

Can I use FairShare without signing up?

  Yes, you can go straight to the home page and use FairShare like a calculator. However, no information will be saved and you won't have the ability to sync data with another user.

How do I save information?

  Once you sign up, create the event you wish to save by entering a name and date into the save event box. Once the event is created, there is no need to save again. FairShare utilizes a realtime database to save data as you go.

What does weighted mean?

  Weights give you the ability to adjust the magnitude of the person or persons included in the event. For example: let's say you share an account with another person. The two of you would be entered into the event with a weight of two, and your values would be lumped together. If each person owed 10 dollars, your weight would combine the amounts owed for you and your partner and equal 20 dollars. Or, let's say you make it on a camping trip for 4 out of 5 days. You were there for only 80% of the trip, so you would give yourself a weight of .80.

What type of things can I use FairShare for?

  FairShare is ideal for roommates, camping trips, parties, or any other event where people come together with shared resources. It's an easy and efficient way to figure expenses without leaving some people feeling like they got stiffed.

How do I share an event?

  Once an event is created, a new dialogue box will appear to invite others to work on the event. Simply enter the email address of whomever you wish to share with (make sure they are signed up first,) and the event will be listed under the my events tab in the navigation bar at the top. Any number of users can work on the event at the same time and see live updates as the enter or delete information.
