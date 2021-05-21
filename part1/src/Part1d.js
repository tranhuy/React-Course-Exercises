import React, { useState } from 'react'

const Part1d = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const updateGood = () => {
      setGood(good + 1);
  }  

  const updateNeutral = () => {
      setNeutral(neutral + 1);  
  } 

  const updateBad = () => {
      setBad(bad + 1);
  } 

  // Exercises 1.12-1.14
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const showAnecdote = () => {
      setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const castVote = (index) => {
      const newVotes = [...votes];
      newVotes[index] += 1;
      setVotes(newVotes);
  }

  const getBestAnecdoteIndex = (vote) => {
      return vote == Math.max(...votes);
  }

  return (
    <div>
        <Feedback handlerGood={updateGood} handlerNeutral={updateNeutral} handlerBad={updateBad} />
        <Statistics countGood={good} countNeutral={neutral} countBad={bad} /><br/>
        
        <Button clickHandler={showAnecdote} text="Next Anecdote"></Button>
        <Anecdote index={selected} handlerVote={castVote} text={anecdotes[selected]} voteCount={votes[selected]}></Anecdote>
        <BestAnecdote text={anecdotes[votes.findIndex(getBestAnecdoteIndex)]}></BestAnecdote>
    </div>
  )     
}

const Anecdote = ({index, handlerVote, text, voteCount}) => {
    return (
        <>
            <p>{text} <span style={{fontWeight:"bold"}}>Vote Count: {voteCount}</span></p>           
            <Button clickHandler={() => handlerVote(index)} text="Vote"></Button>
        </>
    )
}

const BestAnecdote = ({text}) => {
    return (
        <>
            <h2>Anecdote with the most votes</h2>
            <p>{text}</p>
        </>
    )
}

const Feedback = ({handlerGood, handlerNeutral, handlerBad}) => {
    return (
        <>
            <h2>Give Feedback</h2>
            <Button clickHandler={handlerGood} text="Good"></Button>
            <Button clickHandler={handlerNeutral} text="Neutral"></Button>
            <Button clickHandler={handlerBad} text="Bad"></Button>
        </>
    )
}

const Statistics = ({countGood, countNeutral, countBad}) => {
    const POINTS_GOOD = 1;
    const POINTS_NEUTRAL = 0;
    const POINTS_BAD = -1;

    const getTotal = () => {
        return countBad + countGood + countNeutral;
    }

    const getAverage = () => {
        let total = getTotal();

        return total > 0 ? (POINTS_BAD * countBad + POINTS_GOOD * countGood + POINTS_NEUTRAL* countNeutral) / total : 0;
    }

    const getPositive = () => {
        let total = getTotal();

        return total > 0 ? (countGood / total) * 100 : 0;
    }

    if (getTotal() === 0) {
        return (
            <>
                <h2>Statistics</h2>
                <p>No Feedback Given</p>
            </>
        )
    }

    return (
        <>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <Statistic text="Good" value={countGood}></Statistic>
                    <Statistic text="Neutral" value={countNeutral}></Statistic>
                    <Statistic text="Bad" value={countBad}></Statistic>
                    <Statistic text="Total" value={getTotal()}></Statistic>
                    <Statistic text="Average" value={getAverage()}></Statistic>
                    <Statistic text="Positive" value={`${getPositive()}%`}></Statistic>
                </tbody>               
            </table>            
        </>
    )
}

const Statistic = ({text, value}) => {
    return (
        <>
            <tr><td>{text}</td><td>{value}</td></tr>
        </>
    )
}

const Button = ({ clickHandler, text }) => {
    return (
        <button style={{marginRight: "5px"}} onClick={clickHandler}>
            {text}
        </button>
    )
}

export default Part1d;
