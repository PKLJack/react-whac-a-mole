import React from "react"
import { GAME_PHASE } from "../data"

type Props = {
  score: number
  totalMoles: number
  gameStage: string
}

const getTier = (n: number, total: number) => {
  const percentage = n / total

  if (n + 2 >= total) {
    return <span className="tier tier--SS">SS</span>
  } else if (0.9 <= percentage && percentage < 1) {
    return <span className="tier tier--S">S</span>
  } else if (0.8 <= percentage && percentage < 0.9) {
    return <span className="tier tier--A">A</span>
  } else if (0.7 <= percentage && percentage < 0.8) {
    return <span className="tier tier--B">B</span>
  } else if (0.5 <= percentage && percentage < 0.7) {
    return <span className="tier tier--C">C</span>
  } else if (0.3 <= percentage && percentage < 0.5) {
    return <span className="tier tier--D">D</span>
  } else if (0.1 <= percentage && percentage < 0.3) {
    return <span className="tier tier--E">E</span>
  } else {
    return <span className="tier tier--DNF">DNF</span>
  }
}

const Stats: React.FC<Props> = (props) => {
  return (
    <div className="stats">
      <div>
        Score: <span className="stats__score">{props.score}</span>
      </div>
      {props.gameStage === GAME_PHASE.ENDED && (
        <div>{getTier(props.score, props.totalMoles)} Tier</div>
      )}
    </div>
  )
}

export default Stats
