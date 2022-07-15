import React, { SyntheticEvent, useEffect, useState } from "react"
import "./App.css"
import Buttons from "./components/Buttons"
import DifficultySelector from "./components/DifficultySelector"
import Footer from "./components/Footer"
import MoleGrid from "./components/MoleGrid"
import Stats from "./components/Stats"
import Title from "./components/Title"
import { chanceObj, fetchData, GAME_PHASE, DIFFICULTY } from "./data"
import { Mole } from "./models"

const N_TILES = 9
const ALL_POSITIONS = Array.from({ length: N_TILES }, (undef, i) => i)

const GAME_TIME = 10 // 10 seconds game time

function App() {
  const [score, setScore] = useState<number>(0)
  const [totalMoles, setTotalMoles] = useState(0)
  const [time, setTime] = useState<number>(GAME_TIME)
  const [timeTimerId, setTimeTimerId] = useState<number | null>(null)
  const [moles, setMoles] = useState<Mole[]>(fetchData)
  const [gamePhase, setGamePhase] = useState(GAME_PHASE.INIT)
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY)

  const startTimer = () => {
    const timerId = window.setInterval(() => {
      setTime((prevTime) => prevTime - 1)
    }, 1000)
    setTimeTimerId(timerId)
  }

  const stopTimer = () => {
    if (timeTimerId !== null) {
      window.clearInterval(timeTimerId)
      setTimeTimerId(null)
    }
  }

  const stopMoles = (resetPosition = false) => {
    // console.log("Stop Moles")
    moles.forEach((mole) => {
      if (mole.timerId !== null) window.clearInterval(mole.timerId)
    })
    setMoles((prevMoles) =>
      prevMoles.map((mole) => ({
        ...mole,
        timerId: null,
        position: resetPosition ? null : mole.position,
      }))
    )
  }

  const startMoles = () => {
    // console.log("Start Moles")

    // Immediate occupy
    moles.forEach((mole) => occupyTile(mole.id))

    // Set interval occupy
    setMoles((prevMoles) =>
      prevMoles.map((mole) => ({
        ...mole,
        timerId: window.setInterval(() => {
          // console.log("mole tic")
          occupyTile(mole.id)
        }, mole.interval),
      }))
    )
  }

  const startGame = () => {
    startTimer()
    startMoles()
    setGamePhase(GAME_PHASE.RUNNING)
  }

  const resetGame = () => {
    setScore(0)
    setTotalMoles(0)
    setTime(GAME_TIME)
    stopTimer()
    stopMoles(true)
    setGamePhase(GAME_PHASE.INIT)
  }

  const occupyTile = (moleId: string) => {
    setMoles((prevMoles) => {
      const occupiedPositions = prevMoles.map((mole) => mole.position)
      const availablePositions = ALL_POSITIONS.filter(
        (i) => !occupiedPositions.includes(i)
      )

      const pickedPosition = chanceObj.pickone(availablePositions)

      // console.log(availablePositions, pickedPosition)

      setTotalMoles((prevNum) => prevNum + 1)

      return prevMoles.map((mole) =>
        mole.id !== moleId
          ? mole
          : {
              ...mole,
              position: pickedPosition,
            }
      )
    })
  }

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value)
  }

  useEffect(() => {
    if (time <= 0) {
      stopTimer()
      stopMoles(true)
      setGamePhase(GAME_PHASE.ENDED)
    }
    // eslint-disable-next-line
  }, [time])

  useEffect(() => {
    resetGame()
    // console.log("setting difficulty to", difficulty)
    setMoles(fetchData(difficulty))
    // eslint-disable-next-line
  }, [difficulty])

  const handleMoleClick = (e: SyntheticEvent, moleId: string) => {
    // console.log(`mole ${moleId} clicked`)
    setScore((prevScore) => prevScore + 1)
    setMoles((prevMoles) =>
      prevMoles.map((mole) =>
        mole.id === moleId
          ? {
              ...mole,
              position: null,
            }
          : mole
      )
    )
  }

  return (
    <div className="App">
      <Title />

      <DifficultySelector
        value={difficulty}
        handleChange={handleDifficultyChange}
      />

      <main>
        <div>
          Time Remain: <span className="stats__time">{time}</span>
        </div>
        <MoleGrid
          nTiles={N_TILES}
          moles={moles}
          handleMoleClick={handleMoleClick}
        />
        <Stats score={score} totalMoles={totalMoles} gameStage={gamePhase} />
      </main>

      <Buttons
        gameStage={gamePhase}
        startGame={startGame}
        resetGame={resetGame}
      />

      <Footer />
    </div>
  )
}

export default App
