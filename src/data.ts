import { Mole } from "./models"
import Chance from "chance"

const DEBUG = process.env.NODE_ENV === "development"

const GAME_PHASE = {
  INIT: "INIT",
  RUNNING: "RUNNING",
  ENDED: "ENDED",
}

const DIFFICULTY = {
  DEBUG: "DEBUG",
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
}

const chanceObj = new Chance(42)

const debugMoles: Mole[] = [
  {
    id: "debug-1",
    position: null,
    interval: 12000,
    timerId: null,
  },
  {
    id: "debug-2",
    position: null,
    interval: 12000,
    timerId: null,
  },
  {
    id: "debug-3",
    position: null,
    interval: 12000,
    timerId: null,
  },
  {
    id: "debug-4",
    position: null,
    interval: 12000,
    timerId: null,
  },
]

const easyMoles: Mole[] = [
  {
    id: "easy-1",
    position: null,
    interval: 1000,
    timerId: null,
  },
]
const mediumMoles: Mole[] = [
  {
    id: "medium-1",
    position: null,
    interval: 1200,
    timerId: null,
  },
  {
    id: "medium-2",
    position: null,
    interval: 900,
    timerId: null,
  },
]

const hardMoles: Mole[] = [
  {
    id: "hard-1",
    position: null,
    interval: 1000,
    timerId: null,
  },
  {
    id: "hard-2",
    position: null,
    interval: 700,
    timerId: null,
  },
]

const fetchData = (difficulty = DIFFICULTY.EASY) => {
  console.log("fetch Data")

  if (DEBUG && difficulty === DIFFICULTY.DEBUG) {
    console.log("running in debug mode")
    return debugMoles
  } else if (difficulty === DIFFICULTY.HARD) {
    return hardMoles
  } else if (difficulty === DIFFICULTY.MEDIUM) {
    return mediumMoles
  } else {
    return easyMoles
  }
}

export { fetchData, DIFFICULTY, GAME_PHASE, chanceObj, DEBUG }
