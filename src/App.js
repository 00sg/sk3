import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "./components/QHeader.css"
import Login from "./components/auth/Login";
import Quora from "./components/Quora";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Profile from "./components/Profile"
import{BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Feed from "./components/Feed";
function App() {
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photo: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
      console.log(authUser);
    });
  }, [dispatch]);
 
  return(
    <Router>
    <Switch>
    <Route path="/" exact component ={Feed}>
    <div className="App">{user ? <Quora /> : <Login />}</div>
    </Route>
    <Route path="/Profile" component={Profile}/>
    </Switch>

</Router> 
     
)

}

export default App;
