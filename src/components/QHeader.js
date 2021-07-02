import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Modal from "react-modal";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Profile from './Profile'

import "./QHeader.css";
import { Avatar, Button, IconButton, Input } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import { ExpandMore, PinDropSharp} from "@material-ui/icons";
import firebase from "firebase";
import Feed from './Feed'
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import Link from '@material-ui/icons/Link'

Modal.setAppElement("#root");

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
        <div className="qHeader__icon">
         <IconButton >
         <PeopleAltOutlinedIcon/></IconButton>
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
        <Button onClick={() => setIsModalOpen(true)}>Add Post</Button>
        <Modal
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
            },
          }}
        >
          <div className="modal__title">
            <h5>Add Post</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal__info">
            <Avatar
              className="avatar"
              src={
                user.photo
                ?user.photo
                :<AccountCircleIcon/>
                
              }alt=""
            />
            <p>{user.disPlayName ? user.disPlayName : user.email} asked</p>
            <div className="modal__scope">
            </div>
          </div>
          <div className="modal__Field">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="enter your post "
            />
            
            <div className="modal__fieldLink">
            < Link/>
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: inclue a link that gives context"
              ></input>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="sumbit" onClick={handleQuestion} className="add">
              Add Post
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );

}

const searchinput=document.getElementById("#searchinput");
if(searchinput){
  
}
export default QHeader;
