import { dbService, storageService } from 'fbase';
import React, { useState } from "react";

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

  <div>
    {editing ? (
      <>
      {/* form for editing mode */}
    <form onSubmit={onSubmit}>
      <input onChange={onChange} type="text" placeholder="Edit your Tweet" value={newTweet} required />
      <input type="submit" value="Update Tweet" />
      </form>
      <button onClick={toggleEditing}>Cancle</button>
      </>
    ) : (
      <>
      <h4>{tweetObj.text}</h4>
      {/* run only when attachmentUrl exist */}
      {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" height="50px" />}
    {/* check isOwner by creator ID from Obj */}
    {isOwner && (
      <>
      <button onClick={onDeleteClick}>Delete Tweet</button>
      <button onClick={toggleEditing}>Edit Tweet</button>
      </>
    )}
    </>
    )}
  </div>
  
);
}
export default Tweet;