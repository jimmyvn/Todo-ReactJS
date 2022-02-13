import React from 'react'
import ChangeMemeBackgroup from './changeMemeButton.js'
import { memeImages } from './data/DataImage.js'
import MemeImage from './MemeImage'

const MainComponent = () => {
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    image: 'https://i.imgflip.com/30b1gx.jpg',
  })

  const getNewMemeImage = () => {
    const idxRandom = Math.floor(Math.random() * memeImages.length)
    const imgUrl = memeImages[idxRandom].imageUrl
    setMeme(prevMeme => ({
      ...prevMeme,
      image: imgUrl
    }))
  }

  return (
    <div className="main">
      <h1>I'm learning React</h1>
      <div className="meme-area">
        <MemeImage image={meme.image} />
        <ChangeMemeBackgroup handleClick={getNewMemeImage} />
      </div>
    </div>
  )
}

export default MainComponent