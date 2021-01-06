import React, {useState, useEffect} from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';

function App() {
  
  // check if user is logged in trough firebase auth service and login session initialize
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
  <>
  {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing.."}
  <footer>&copy; Twilaxy {new Date().getFullYear()}</footer>
  </>
  );
  }

export default App;
