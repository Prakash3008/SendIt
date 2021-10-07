import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import {useStateValue} from "./StateProvider";
import Room from "./Room";


function App() {
const [{user}, dispatch] = useStateValue();
  console.log("inside app.js")
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
        <Route path="/vroom/:vroomID">
          <Room />
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
