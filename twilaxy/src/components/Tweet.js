import { dbService, storageService } from 'fbase';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => { 
  // boolean : if its editing mode or not
  const [editing, setEditing] = useState(false);
  // edit : for modify input value
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  // delete
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if(ok) {
    // to delete tweet, get doc ID value from Obj
    await dbService.doc(`tweets/${tweetObj.id}`).delete();
    // to delete img, get URL from Obj
    await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    // update tweet - set same doc ID value as before & set new value
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text:newTweet
    })
    setEditing(false);
  }
  const onChange = (event) => {
    const {target:{value}} = event;
    setNewTweet(value);
  }
  
  return (

  <div className="tweet">
    {editing ? (
      <>
      {/* form for editing mode */}
    <form onSubmit={onSubmit} className="container tweetEdit">
      <input onChange={onChange} type="text" placeholder="Edit your Tweet" value={newTweet} required autoFocus className="formInput" />
      <input type="submit" value="Update Tweet" className="formBtn"/>
      </form>
      <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
      </>
      
    ) : (
      <>
      <h4>{tweetObj.text}</h4>
      {/* run only when attachmentUrl exist */}
      {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
    {/* check isOwner by creator ID from Obj */}
    {isOwner && (
      
      <div className="tweet_actions">
      <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
      <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
      </div>
      
    )}
    </>
    )}
  </div>
  
);
}
export default Tweet;