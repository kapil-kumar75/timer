import React, { useState, useEffect } from 'react'
import './style.css'

const App = () => {
  const [hour, setHour] = useState('00')
  const [second, setSecond] = useState('00')
  const [minute, setMinute] = useState('00')
  const [isActive, setIsActive] = useState(false)
  const [counter, setCounter] = useState(0)
  const [count, setCount] = useState(1)

  const stopTimer = () => {
    setIsActive(false)
    setCounter(0)
    setHour('00')
    setSecond('00')
    setMinute('00')
    setCount(1)
  }

  const increment = () => {
    if (count < 10) {
      setCount(count + 1)
    }
    if (count > 1) {
      setSecond(parseInt(second) + count)
    }
    if (second <= 59) {
      setSecond(parseInt(second))
    }
  }

  const decrement = () => {
    if (count > -10) {
      setCount(count - 1)
    }
    if (count < 0) {
      setCounter((counter) => counter + 1 - count)
    }
  }

  useEffect(() => {
    let intervalId
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60
        const minuteCounter = Math.floor(counter / 60)
        const hoursCounter = Math.floor((counter / (1000 * 60 * 60)) % 24)

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter
        const computedHour =
          String(hoursCounter).length === 1 ? `0${hoursCounter}` : hoursCounter

        if (computedSecond <= 0) {
          setSecond('00')
          setMinute('00')
          setHour('00')
        } else {
          setSecond(computedSecond)
          setMinute(computedMinute)
          setHour(computedHour)
        }

        setCounter((counter) => counter + count)
      }, 500)
    }
    return () => clearInterval(intervalId)
  }, [isActive, counter])

  return (
    <div className="container">
      <div className="time">
        <span className="minute">{hour}</span>
        <span>:</span>
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setIsActive(!isActive)} className="start">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={stopTimer} className="reset">
          Reset
        </button>
        <div className="counter">
          <button onClick={increment}>+</button>
          <p className="">{count}</p>
          <button onClick={decrement}>-</button>
        </div>
      </div>
    </div>
  )
}

export default App
