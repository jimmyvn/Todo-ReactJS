import React from "react"

export default function Meme(props) {
  return (
    <div className="backgroud-image-content">
      <img src={props.image} alt="Meme Image" />
    </div>
  )
}