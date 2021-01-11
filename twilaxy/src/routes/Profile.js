import { authService } from 'fbase';
import React, { useState }  from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  // Redirect to home after logout
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/")
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  // // getting userObj detail from Router.js
  // const getMyTweets = async() => {
  //   // to filtering quary
  //   const tweets = await dbService.collection("tweets").where("creatorId", "==", userObj.uid).orderBy("createdAt", "desc").get();
  //   console.log(tweets.docs.map((doc) => doc.data()));
  // };

  // useEffect(() => {
  //   getMyTweets();
  // })

return (
<>
<form onSubmit={onSubmit}>
  <input onChange={onChange} type="text" palceholder="Display name" value={newDisplayName} />
  <input type="submit" value="Update Profile" />
</form>
<button onClick={onLogOutClick}>Log Out</button>
</>
);
};
