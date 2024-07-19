import React, { useState, useEffect } from 'react';
import '../Pomotimer.css';
import Pomotimer from './Pomotimer';
import {BsFillPlayFill, BsPauseFill, BsStopFill} from "react-icons/bs";
import timerDone from "./../assets/timerDone.wav";
import user from "./../assets/images/user.jpg"
import Todo from './ToDo';
import { Spotify } from "react-spotify-embed";

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [spotifyLink, setSpotifyLink] = useState("https://open.spotify.com/album/0fUy6IdLHDpGNwavIlhEsl?si=mTiITmlHQpaGkoivGTv8Jw");
  const [value, setValue] = useState("")

  console.log(spotifyLink)
  const [showEndScreen, setShowEndScreen] = useState({
    show:false,
    message: "You're ready for your break!",
  });

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1)
          setSeconds(59);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    if (minutes === 0 && seconds === 0 && isActive){
      setShowEndScreen({...showEndScreen, show:true});
      play();
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, showEndScreen.show]);

  function play() {
    new Audio(timerDone).play();
  }

  function startTimer() {
    if (minutes !== 0 || seconds !== 0) {
      setIsActive(true);
      setShowEndScreen({...showEndScreen, show:false});
    } else {
      window.alert("Add time.");
    }
  }
  
  function pauseTimer() {
    setIsActive(false);
    setShowEndScreen({...showEndScreen, show:false});
  }

  function stopTimer() {
    setShowEndScreen({...showEndScreen, show:false});
    resetTimer();
  }

  function resetTimer() {
    setIsActive(false);
    setSeconds(0);
    setMinutes(0); // Reset to 0 minutes
  }

  const changeSeconds = (e) => {
    setSeconds(e.target.value)
  }

  const changeMinutes = (e) => {
    setMinutes(e.target.value)
  }

  // Function to set specific time durations
  const setTime = (minutes) => {
    setMinutes(minutes);
    setSeconds(0);
  }
  const [showTimer, setShowTimer] = useState(true);

  function Navbar() {
    return (
      <header>
        <div class="nine">
          <h1>PomStudy<span>Your favorite study buddy</span></h1>
        </div>
        <nav>
          <ul>
            <button class='nav-item' onClick={() => setShowTimer(true)}> My Pomotimer</button>
            <button class='nav-item' onClick={() => setShowTimer(false)}> My PomoProfile </button>
          </ul>
        </nav>
      </header>
    );
  }

  const onLinkChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
      </style>
      <Navbar />
      {showTimer ? ( 
        <div>
          {showEndScreen.show && <h1 className="title">{showEndScreen.message}</h1>}
          <Pomotimer 
            minutes={minutes} 
            seconds={seconds}
            changeMinutes={changeMinutes}
            changeSeconds={changeSeconds} 
          />
          <br />
          <div className='setTimeButtons'>
            <button className="s-btn" onClick={() => setTime(20)}>20 minutes</button>
            <button className="s-btn" onClick={() => setTime(25)}>25 minutes</button>
            <button className="s-btn" onClick={() => setTime(30)}>30 minutes</button>
            <button className="s-btn" onClick={() => setTime(5)}>Break</button>
          </div>
          <div className='timerButtons'>
            
            {!isActive && (
              <button className="btn" onClick={startTimer}>
                <BsFillPlayFill />
              </button>)}
            {isActive && (
              <button className="btn" onClick={pauseTimer}>
                <BsPauseFill />
              </button>)}
            <button className="btn" onClick={stopTimer}>
              <BsStopFill />
            </button>
          </div>
          <div class="music">
            <div>
              <input
                placeholder='Give me a playlist...' 
                onChange={onLinkChange}
                value={value}
              />
            <button
                    className='t-btn'
                    id='add-link'
                    onClick={() => setSpotifyLink(value)}>
                    Add Link
              </button>
            </div>
          <Spotify wide class='spot' link={spotifyLink} />
          </div>  
          <Todo />
        </div>
      ): (
        <div> 
          <div class="profile-container">
            <div class="profile-header">
              <img src={user} alt="Profile Picture" />
              <h1>Yuneydy Paredes</h1>
              <p>Best Software Engineer EVER</p>
            </div>
            <div class="profile-details">
              <h2>About Me</h2>
              <p>Sophomore at Well</p>
              <h2>Account Information</h2>
              <ul>
                <li>Tasks Finished: 10</li>
                <li>Total completed tasks of all time: 345</li>
                <li>Total Time completed: 2789 minutes</li>
                <li id='goals'>Goals</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
