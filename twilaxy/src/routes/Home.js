import { dbService } from 'fbase';
import React, {useState, useEffect } from "react";


const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async() => {
    const dbTweets = await dbService.collection("tweets").get();
    dbTweets.forEach((document) => {
      const tweetObject = {
        ...document.data(),
        id: document.id
      };
      // pass function instead of value
      // imflicit return(array) current + ..prev documents
      setTweets((prev) => [tweetObject, ...prev]);
    });
  };
  
  useEffect(() => {
  getTweets();
  }, [])


  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet(" ");
  }
  const onChange = (event) => {
    const {target:{value}} = event;
    setTweet(value);
  }
return (
<div>
  <form onSubmit={onSubmit}>
    <input value={tweet} onChange={onChange} type="text" placeholder="What`s on your mind?" maxLength={120} />
    <input type="submit" value="Twilaxy" />
    </form>
    <div>
      {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
    </div>
      ))}
    </div>
    </div>
    )
}
export default Home;
