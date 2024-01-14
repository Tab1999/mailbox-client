


import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./component/Auth"; 
import Header from "./component/Header"; 
import Home from "./component/Home"; 
import { useSelector } from "react-redux";
import MailForm from "./component/MailForm";
import Inbox from "./component/Inbox";
import Message from "./component/Message";
import Sentbox from "./component/Sentbox";


function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/compose">
             {isAuth && <MailForm/>}
         </Route>
         <Route path="/sentbox">
             {isAuth && <Sentbox />}
        </Route>
        <Route path="/inbox">
             {isAuth && <Inbox />}
        </Route>
        <Route path="/message/:messageId">
             {isAuth && <Message/>}
        </Route>
        <Route path="/">
             {isAuth && <Home />}
        </Route>
      </Switch>
      {!isAuth && <Auth/>}
    </Router>
  );
}

export default App;
