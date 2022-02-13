import React from "react"

export default function ChangeMemeBackgroup(props) {
  return (
    <button
      className="btn-change-backgroud-image"
      onClick={props.handleClick}
    >
      Get new meme image
    </button>
  )
}