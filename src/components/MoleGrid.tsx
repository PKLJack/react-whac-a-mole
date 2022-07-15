import React from "react"
import { Mole } from "../models"
import Tile from "./Tile"

type Props = {
  nTiles: number
  moles: Mole[]
  handleMoleClick: (e: React.SyntheticEvent, moleId: string) => void
}

const MoleGrid: React.FC<Props> = (props) => {
  const arr1: null[] | string[] = new Array(props.nTiles).fill(null)

  props.moles.forEach((mole) => {
    if (mole.position !== null) {
      arr1[mole.position] = mole.id
    }
  })

  // console.log(arr1)

  const elems2 = arr1.map((obj, index) => (
    <Tile
      key={index}
      hasMole={obj !== null}
      handleClick={
        obj !== null ? (e) => props.handleMoleClick(e, obj) : () => {}
      }
    />
  ))

  return <div className="molegrid">{elems2}</div>
}

export default MoleGrid
