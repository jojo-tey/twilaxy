import React, {useState, useEffect} from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";

function App() {
  
  // check if user is logged in trough firebase auth service and login session initialize
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
    useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // logged in if user Obj exist
      if(user){
        setUserObj({
          // filtering data for rerendering (original data is too big)
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
        }
      setInit(true);
    });
  }, []);

  // set new displayname when profile changed
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }

  return (
  <>
  {init ? <AppRouter refreshUser={refreshUser}  isLoggedIn={Boolean(userObj)} userObj={userObj} /> : ("Initializing..")}
  <footer className="footer">&copy; Twilaxy  {new Date().getFullYear()} - made with  <FontAwesomeIcon icon={faHeart} color="crimson" /></footer>
  </>
  );
  }

export default App;
