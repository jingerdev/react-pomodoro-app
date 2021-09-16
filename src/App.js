import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './App.css'

import timerSound from './assets/timer-sound.mp3'
import sleep from './assets/sleep.svg'
import coffee from './assets/coffee.svg'
import notes from './assets/notes.svg'
import github from './assets/github.svg'
import logo from './assets/logo.svg'

const content = {
  '25': {
    text: 'Work, work, work!',
    icon: notes
  },
  '5': {
    text: 'Coffee break!',
    icon: coffee
  },
  '15': {
    text: 'Power nap time!',
    icon: sleep
  },
}

function App() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [key, setKey] = React.useState(0)
  // Set default minutes duration
  const [duration, setDuration] = React.useState(25*60)
  const [modal, showModal] = React.useState(false)
  // We need to track if timer is paused to not allow user
  //  to switch timers
  const [isPaused, setIsPaused] = React.useState(false)
  const [tempTimer, setTempTimer] = React.useState(null)

  const toggleTimer = () => {
    setIsPaused(true)
    setIsPlaying(!isPlaying)
  }
  
  const renderTime = ({ remainingTime }) => {
    let displayTime = '00:00'
    if (remainingTime > 0) {
      let minutes = Math.floor(remainingTime / 60)
      let seconds = remainingTime % 60
      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds
      displayTime = `${minutes}:${seconds}`
    }
    return (
      <div>
        <h1> {displayTime}</h1>
      </div>
    )
  }

  const timer = ({ duration, isPlaying, key }) => (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      colors={[
        ['#fdb196', 0.33]
      ]}
      key={key}
      onComplete={() => onTimerComplete()}
      strokeWidth={10}
      size={220}
    >
      {renderTime}
    </CountdownCircleTimer>
  )

  const onTimerComplete = () => {
    // Play notification sound
    const audio = new Audio(timerSound)
    audio.play()
    // Set isPaused to false meaning timer has completely stopped
    setIsPaused(false)
    setIsPlaying(false)
    restartTimer()
    return [false, 1000]
  }

  const changeTimer = (e) => {
    const { id } = e.target
    const timer = Number(id)
    // Set temporary timer
    setTempTimer(timer)
    // Check first if duration is still playing
    if (isPlaying || isPaused) {
      showModal(true)
    } else {
      setDuration(60*timer)
      restartTimer()
    }
  }

  const continueChangeTimer = () => {
    // If modal was shown because user is switching timer,
    //  we have to set a new duration.
    //  If user clicked restart, the duration stays the same
    if (tempTimer) {
      setDuration(60*tempTimer)
    }
    restartTimer()
    showModal(false)
  }

  const onRestartTimer = () => {
    if (isPlaying || isPaused) {
      showModal(true)
    } else {
      restartTimer()
    }
  }

  const restartTimer = () => {
    setIsPaused(false)
    setKey(prev => prev + 1)
    setIsPlaying(false)
  }

  const closeModal = () => {
    showModal(false)
    setTempTimer(null)
  }

  const modalContent = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Timer is still running/paused! If you continue, the timer will restart.</p>
          <button
            className="start-button"
            onClick={() => closeModal()}>
              Close
          </button>
          <button
            className="restart-button"
            onClick={() => continueChangeTimer()}>
              Continue
          </button>
        </div>
      </div>
    )
  }
  const currentTimer = duration/60

  return (
    <div className="App">
      {modal && modalContent()}
      <nav>
        <div className="logo">
          <img alt="logo" src={logo} width="25"/>
            <p className="title">simporo - stay focused!</p>
          </div>
          <a href="https://github.com/jingerdev/react-pomodoro-app" target="_blank" rel="noreferrer"> 
            <img alt="repo_link" src={github} title="repo link"/>
          </a>
      </nav>
      <main>
        <div className="description">
          <img src={content[currentTimer].icon} width={35} alt="icon"/>
          <p className="context">{content[currentTimer].text}</p>
        </div>
        <div className="timer-options">
          <button
            id={25}
            className={`item ${currentTimer === 25 ? 'active' : '' }`}
            onClick={changeTimer.bind(this)}>
            25:00
          </button>
          <button 
            id={5}
            className={`item ${currentTimer === 5 ? 'active' : ''}`}
            onClick={changeTimer.bind(this)}>
            5:00
          </button>
          <button 
            id={15}
            className={`item ${currentTimer === 15 ? 'active' : ''}`}
            onClick={changeTimer.bind(this)}>
            15:00
          </button>
        </div>
        {/* Circle Countdown Timer */}
        <div className="timer-container">
          {timer({
            isPlaying: isPlaying,
            key: key,
            duration: duration
          })}
        </div>

        <button className='start-button' onClick={() => toggleTimer()}>
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        <button className='restart-button' onClick={() => onRestartTimer()}>
          Restart
        </button>

        <div className="credits">
          <div>
           <h3>Tools:</h3>
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">&nbsp;
            React
            </a> -
            <a href="https://github.com/vydimitrov/react-countdown-circle-timer" target="_blank" rel="noreferrer">&nbsp;
            react-countdown-circle-timer 
            </a> -
            <a href="https://www.figma.com/community/plugin/735098390272716381/Iconify" target="_blank" rel="noreferrer">&nbsp;
            Figma Iconfiy
            </a>
          <hr></hr>
           <p>Built by <a href="https://jenniferricardo.com" target="_blank" rel="noreferrer">Jennifer Ricardo</a> - 
            <a href="https://jenniferricardo.com/projects/simporo-stay-focused-react-pomodoro-app" target="_blank" rel="noreferrer"> Project details
            </a>
           </p>
          </div></div>
      </main>
    </div>
  )
}

export default App;
