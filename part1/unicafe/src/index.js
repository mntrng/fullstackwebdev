import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({ text, value, symbol }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text} {value} {symbol}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const avg = (props.good*1 - props.bad) / total
  const positive = props.good * 100 / total

  return (
    <div>
      <h1>Statistics</h1>
      <Statistic text='Good' value={props.good} />
      <Statistic text='Neutral' value={props.neutral} />
      <Statistic text='Bad' value={props.bad} />
      <Statistic text='All' value={total} />
      <Statistic text='Average' value={avg} />
      <Statistic text='Positive' value={positive} symbol='%' /> 
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  if (good + bad + neutral === 0) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Button 
          handleClick={increaseGood}
          text='good'
        />
        <Button 
          handleClick={increaseNeutral}
          text='neutral'
        />
        <Button 
          handleClick={increaseBad}
          text='bad'
        />
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
    <div>
      <h1>Give Feedback</h1>
      <Button 
        handleClick={increaseGood}
        text='good'
      />
      <Button 
        handleClick={increaseNeutral}
        text='neutral'
      />
      <Button 
        handleClick={increaseBad}
        text='bad'
      />

      <Statistics good = {good} bad = {bad} neutral = {neutral} />    
    </div>  
    )  
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)