import { IconButton,Avatar,Button} from "@material-ui/core";
import "./profile.css";
import Sidebar from './Sidebar'
import Qheaderprofile from "./Qheaderprofile";
import db from "../firebase";
import firebase from "firebase";
import {useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import React,{useEffect, useState} from "react";
import { selectQuestionId, setQuestionInfo } from "../features/questionSlice";
import { isUserWhitespacable } from "@babel/types";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function Profile() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
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
               <img className="profileUserImg"
              src={
                user.photo
                ?user.photo
                :<AccountCircleIcon/>
                
              }alt=""
            />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">
                {user.displayName ? user.displayName : user.email}
                </h4>
            </div>
        </div>
        </div>

        <div className="posts">
        <p>
          {}
        </p>
        </div>

    </>
  );
}