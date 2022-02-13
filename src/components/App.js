import React from "react"
import Box from "./Box"
import { boxes } from "./data/DataBox"

export default function App() {
  const [squares, setSquares] = React.useState(boxes)

  const handleClick = (boxId) => {
    setSquares(prevSquares => {
      return prevSquares.map((square) => {
        return square.id === boxId ? {...square, on: !square.on} : square  
      })
    })
  }

  const squareElements = squares.map(square => {
    return (
      <Box
        key={square.id}
        on={square.on}
        toggle={() => handleClick(square.id)}
      />
    )
  })
  return (
    <div className="boxes">
      {squareElements}
    </div>
  )
};