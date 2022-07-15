import React from "react"
import { GAME_PHASE } from "../data"

type Props = {
  gameStage: string
  startGame: () => void
  resetGame: () => void
}

const Buttons: React.FC<Props> = (props) => {
  const elem =
    props.gameStage === GAME_PHASE.INIT ? (
      <button className="btn btn--start" onClick={props.startGame}>
        Start
      </button>
    ) : props.gameStage === GAME_PHASE.ENDED ? (
      <button className="btn" onClick={props.resetGame}>
        Again
      </button>
    ) : (
      <div className="btn hidden">X</div>
    )

  return <>{elem}</>
}

export default Buttons
