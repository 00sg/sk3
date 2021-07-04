import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {Link} from 'react-router-dom'

import "./qheaderprofile.css";
import { Avatar, Button, IconButton, Input } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import { ExpandMore, PinDropSharp} from "@material-ui/icons";
import firebase from "firebase";
import Feed from './Feed'
import {Route,Switch,BrowserRouter} from 'react-router-dom'


function QHeader() {

  const user = useSelector(selectUser);

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const questionName = input;

  const handleQuestion = (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (questionName) {
      db.collection("questions").add({
        user: user,
        question: input,
        imageUrl: inputUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
    setInputUrl("");
  };

  return (
    
    <div className="qHeader">
      <div className="qHeader__logo">
      <h2>Student's kernel </h2>
        <img
         /* src='Logo.png' 
          alt=""*/
          
        />
        
      </div>
  
      <div className="qHeader__icons">
        <div className="active qHeader__icon">
          <HomeIcon />
        </div>
        <div className="qHeader__icon">
          <FeaturedPlayListOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <div className="qHeader_profile__icon">
         <Link style={{ textDecoration: 'none', color: 'grey'}}  to ="./Profile" >
         <PeopleAltOutlinedIcon className="qHeader_profile__icon_icon"/></Link>
        </div>
    <div className="qHeader__icon">
          <NotificationsOutlinedIcon />
        </div>
      </div>
     
     {/*} <div className="qHeader__input">
        <SearchIcon />
        <input id="searchinput" type="text" placeholder="Search..." />
  </div>*/}
      <div className="qHeader__Rem">
        <div className="qHeader__avatar">
          <div className="Avatar">
          <ExitToAppIcon onClick={() => auth.signOut()} />      
          </div>
        </div>
</div>
</div>
  );
}
export default QHeader;
