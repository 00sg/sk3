import { IconButton,Avatar,Button} from "@material-ui/core";
import "./profile.css";
import Sidebar from './Sidebar'
import Widgetprofile from "./widgetprofile";
import Qheaderprofile from "./Qheaderprofile";
import db from "../firebase";
import firebase from "firebase";
import {useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import React,{useEffect, useState} from "react";
import questionSlice, { selectQuestionId, selectQuestionName, setQuestionInfo } from "../features/questionSlice";
import { isUserWhitespacable } from "@babel/types";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Height } from "@material-ui/icons";


export default function Profile() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [question,setquestions]=useState([]);
  const questionId = useSelector(selectQuestionId);
  const [inputUrl, setInputUrl] = useState("");
  const questionName = input;

  const handleQuestion = (e) => {
    e.preventDefault();
    if (questionName) {
      db.collection("questions").doc({
        user: user,
        questionId:questionId,
        imageUrl: inputUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };


  return (
  
    <>
    <Qheaderprofile/>
    
      <div className="profile">
        <div className="profileRight">
            <div className="profileCover">
             <div  className="profileCoverImg">
               
             </div>
             <div className="profileUserImg">
               <Avatar style={{ height: '150px', width: '150px'}} 
              src={
                user.photo 
                ?user.photo
                :<AccountCircleIcon/>
              }alt=""
            />
            </div>
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">
                {user.displayName ? user.displayName : user.email}
                </h4>
            </div>
        </div>
        </div>
        
        <Widgetprofile/>
        <div className="posts">
        <h1>
          {question}
        </h1>
        </div>

    </>
  );
}