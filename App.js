import React from "react";
import "./styles.css";
import Footer from "./Footer";
import Signup from "./Onboarding/Signup";
import Login from "./Onboarding/Login";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Log from "./Onboarding/Log";
//import Logout from "./Logout";
import CreateAlgo from "./Onboarding/CreateAlgo";
import Welcome from "./Onboarding/Welcome";
import LoginControl from "./Onboarding/LoginControl";
import BioInfo from "./Onboarding/BioInfo";
import Chats from "./Chats";
import Header from "./Header";
import Chatscreen from "./Chatscreen";
import TwoTruths from "./twoTOneL";
import Profile from "./Profile";
import Questions from "./Questions";
import TwoTruthsOneLie from "./TwoTruthsOneLie";
import Home2 from "./Home2";
import Chats2 from "./Chats2";
import Bio from "./Onboarding/Bio";
import Bio2 from "./Onboarding/Bio2";
import Bio3 from "./Onboarding/Bio3";
import DealBreaker from "./Onboarding/DealBreakers";
import Reveal from "./Reveal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/createalgo">
              <CreateAlgo />
            </Route>

            <Route path="/bioinfo">
              <BioInfo />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/logincontrol">
              <LoginControl />
            </Route>

            <Route path="/welcome">
              <Welcome />
            </Route>

            <Route path="/chat/:person">
              <Header backButton="chat2" title="Chat"/>
              <Chatscreen />
            </Route>

            <Route path="/chat">
              <h1 className="title"> CHAT </h1>
              <Footer chat="chat" home="home" />
              <Chats />
            </Route>

            <Route path="/profile">
              <h1 className="title"> PROFILE </h1>
              <Footer chat="chat" home="home" />
              <Profile />
            </Route>
            <Route path="/reveal">
              <Reveal />
            </Route>

            <Route path="/2T1L">
              <Header backButton="home" title="Two Truths"/>
              <h1 className="title"> 2 truths 1 lie </h1>
              <TwoTruths />
            </Route>

            {/* Footer shows here */}
            <Route path="/questions">
              <Questions />
            </Route>

            <Route path="/ttol">
              <TwoTruthsOneLie />
            </Route>

            <Route path="/chat2">
              <Chats2 />
              <Footer home="home2" />
            </Route>

            <Route path="/home2">
              <Home2 />
              <Footer chat="chat2" />
            </Route>

            <PrivateRoute path="/home">
              <Home />
              <Footer chat="chat" home="home" />
            </PrivateRoute>

            <PrivateRoute path="/bioadd">
              <Bio />
            </PrivateRoute>
            <PrivateRoute path="/bioadd2">
              <Bio2 />
            </PrivateRoute>
            <PrivateRoute path="/bioadd3">
              <Bio3 />
            </PrivateRoute>
            <PrivateRoute path="/dealb">
              <DealBreaker />
            </PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}
