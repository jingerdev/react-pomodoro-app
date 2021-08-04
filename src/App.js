import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './App.css'

import timerSound from './assets/timer-sound.mp3'
import sleep from './assets/sleep.svg'
import coffee from './assets/coffee.svg'
import notes from './assets/notes.svg'

const content = {
  'work': 'Work, work, work!',
  'shortBreak': 'Coffee break!',
  'longBreak': 'You’ve worked hard. Power nap time!',
}

function App() {
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [key, setKey] = React.useState(0)

  const toggleTimer = () => {
    setIsPlaying(!isPlaying)
  }
  
  const renderTime = ({ remainingTime }) => {
    let displayTime = '01:00'
    if (remainingTime > 0) {
      let minutes = Math.floor(remainingTime / 60)
      let seconds = remainingTime % 60
      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds
      displayTime = `${minutes}:${seconds}`
    } else {
      // const audio = new Audio(timerSound)
      // audio.play()
      // audio.pause
      // audio.currentTime = 0 // restart audio
      console.log('===> ZERO')
    }
    if (remainingTime === 0) {
      console.log('===> ZERO')
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
        ['#D68282', 0.33]
      ]}
      key={key}
      // onComplete={() => [true, 1000]}
      strokeWidth={10}
      size={220}
    >
      {renderTime}
    </CountdownCircleTimer>
  )


  return (
    <div className="App">
      <div>
        <h1>Pomodoro App</h1>
        <div className="description">
          <img src={notes} width={35}/>
          <p className="context">{content.work}</p>
        </div>
        <div className="timer-options">
          <button className="item active">
            25:00
          </button>
          <button className="item">
            5:00
          </button>
          <button className="item">
            15:00
          </button>
        </div>
        {/* Circle Countdown Timer */}
        <div className="timer-container">
          {timer({
            isPlaying: isPlaying,
            key: key,
            duration: 60
          })}
        </div>

        <button className='start-button' onClick={() => toggleTimer()}>
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        <button className='restart-button' onClick={() => setKey(prev => prev + 1)}>
          Restart
        </button>
      </div>
    </div>
  )
}

export default App;
