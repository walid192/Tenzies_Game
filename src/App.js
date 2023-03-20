import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";
import "./App.css";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies,setTenzies]=React.useState(false)

  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
  },[dice])


  function generateDie() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return {
      number: randomNumber,
      isHeld: false,
      id: nanoid(),
    };
  }
  function holdDice(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function allNewDice() {
    let n = [];
    for (let index = 0; index < 10; index++) {
      n.push(generateDie());
    }
    return n;
  }
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) => {
        return oldDice.map((die) => (die.isHeld ? die : generateDie()));
      })
    }
    else{
      setTenzies(false)
      setDice( allNewDice())
    }
  }

  const diceElements = dice.map((item) => {
    return (
      <Die
        key={item.id}
        value={item.number}
        isHeld={item.isHeld}
        holdDice={() => holdDice(item.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{diceElements}</div>
      <button className="button" onClick={rollDice}>
      {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

// export default function App() {
//     const [dice, setDice] = React.useState(allNewDice())
//     const [tenzies, setTenzies] = React.useState(false)

//     React.useEffect(() => {
//         const firstValue = dice[0].value
//         const allHeld = dice.every(die => die.held)
//         const allSameNumber = dice.every(die => die.value === firstValue)
//         if(allHeld && allSameNumber) {
//             setTenzies(true)
//         }
//     }, [dice])

//     function randomDieValue() {
//         return Math.ceil(Math.random() * 6)
//     }

//     function allNewDice() {
//         const newArray = []
//         for(let i = 0; i < 10; i++) {
//             const newDie = {
//                 value: randomDieValue(),
//                 held: false,
//                 id: i + 1
//             }
//             newArray.push(newDie)
//         }
//         return newArray
//     }

//     function rollUnheldDice() {
//         if (!tenzies) {
//             setDice((oldDice) => oldDice.map((die, i) =>
//                 die.held ?
//                     die :
//                     { value: randomDieValue(), held: false, id: i + 1 }
//             ))
//         } else {
//             setDice(allNewDice())
//             setTenzies(false)
//         }
//     }

//     function holdDice(id) {
//         setDice(prevDice => prevDice.map(die => {
//             return die.id === id ?
//                 {...die, held: !die.held} :
//                 die
//         }))
//     }

//     const diceElements = dice.map((die) => (
//         <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
//     ))

//     return (
//         <main>
//             {tenzies && <Confetti />}
//             <h1>Tenzies</h1>
//             <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
//             <div className="die-container">{diceElements}</div>
//             <button className="roll-dice" onClick={rollUnheldDice}>
//                 {tenzies ? "Reset Game" : "Roll"}
//             </button>
//         </main>
//     )
// }
