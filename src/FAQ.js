import React, { Component } from 'react';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import './App.css';



class FAQ extends Component {

  render() {
    return (
      <div className="container splash">
        <Navbar />
        <div className="splash-div">
          <div className="title-div">
            <h1>FairShare</h1>
          </div>
          <Logo />
        </div>
        <div className="spacer"></div>
        <div className="faq-div">
          <p >Can I use FairShare without signing up?</p>
          <p className="answer"> Yes, you can go straight to the home page and use FairShare like a calculator. However,
          no information will be saved and you won't have the ability to sync data with another user. </p>
          <p >How do I save information?</p>
          <p className="answer">Once you sign up, create the event you wish to save by entering a name and date into the save event box.
          Once the event is created, there is no need to save again. FairShare utilizes a realtime database to save data as you go.</p>
          <p >What does <i>weighted</i> mean?</p>
          <p className="answer">Weights give you the ability to adjust the magnitude of the person or persons included in the event. For example:
          let's say you share an account with another person. The two of you would be entered into the event with a weight of two, and your
          values would be lumped together. If each person owed 10 dollars, your weight would combine the amounts owed for you and your
          partner and equal 20 dollars. Or, let's say you make it on a camping trip for 4 out of 5 days. You were there for only 80% of
           the trip, so you would give yourself a weight of .80.</p>
          <p >What type of things can I use FairShare for?</p>
          <p className="answer">FairShare is ideal for roommates, camping trips, parties, or any other event where people come together
          with shared resources. It's an easy and efficient way to figure expenses without leaving some people feeling like they got stiffed.</p>
          <p >How do I share an event?</p>
          <p className="answer">Once an event is created, a new dialogue box will appear to invite others to work on the event. Simply
          enter the email address of whomever you wish to share with (make sure they are signed up first,) and the event will
          be listed under the my events tab in the navigation bar at the top. Any number of users can work on the event at the same time
        and see live updates as the enter or delete information.</p>
        </div>
      </div>
  );
  }
}

export default FAQ;
