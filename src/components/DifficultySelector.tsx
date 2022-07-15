import React from "react"
import { DEBUG, DIFFICULTY } from "../data"

type Props = {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const DifficultySelector: React.FC<Props> = (props) => {
  return (
    <select
      className="select"
      value={props.value}
      onChange={props.handleChange}
    >
      {DEBUG && (
        <option className="select__option" value={DIFFICULTY.DEBUG}>
          DEBUG
        </option>
      )}
      <option className="select__option" value={DIFFICULTY.EASY}>
        Easy
      </option>
      <option className="select__option" value={DIFFICULTY.MEDIUM}>
        Medium
      </option>
      <option className="select__option" value={DIFFICULTY.HARD}>
        Hard
      </option>
    </select>
  )
}

export default DifficultySelector
