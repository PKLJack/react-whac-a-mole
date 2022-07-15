import React from "react"

type Props = {
  hasMole: boolean
  handleClick: (e: React.SyntheticEvent) => void
}

const Tile: React.FC<Props> = (props) => {
  return (
    <div
      className={`tile ${props.hasMole ? "tile--mole" : ""}`}
      onClick={props.handleClick}
    ></div>
  )
}

export default Tile
