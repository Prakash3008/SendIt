import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";

function App() {
const [user, setUser] = useState(null);

  return (
    <div className="App">
      
      {/* <h1>Lets develop the slack........Come on the Prakash</h1> */}
    <Router>
      {!user ?(
        <Login />
      ):(<>
      <Header />
      <div className="app__body">
        <Sidebar />
      <Switch>
        <Route path="/room/:roomId">
          <Chat />
          
        </Route>
        <Route>
          <h1>Welcome</h1>
        </Route>
      </Switch>
      </div> 
      </>
      )}
    </Router>  
    </div>
  );
}

export default App;
