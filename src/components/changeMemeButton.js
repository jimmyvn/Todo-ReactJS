import React from "react"

export default function ChangeMemeBackgroup(props) {
  return (
    <button
      className="btn btn-secondary"
      onClick={props.handleClick}
    >
      Get new meme image
    </button>
  )
}