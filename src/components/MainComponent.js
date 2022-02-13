import React from 'react'
import ChangeMemeBackgroup from './changeMemeButton.js'
// import { memeImages } from './data/DataImage.js'
import MemeImage from './MemeImage'

const MainComponent = () => {
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    image: '',
  })

  const [memes, setMemes] = React.useState([])

  React.useEffect(() => {
    const getMemes = async () => {
      const response = await fetch('https://api.imgflip.com/get_memes')
      const data = await response.json()

      setMemes(data.data.memes)
    }

    getMemes()
  }, [])


  const getNewMemeImage = () => {
    const idxRandom = Math.floor(Math.random() * memes.length)
    const imgUrl = memes[idxRandom].url
    setMeme(prevMeme => ({
      ...prevMeme,
      image: imgUrl
    }))
  }

  return (
    <div className="main">
      <div className="meme-area">
        <MemeImage image={meme.image} />
        <ChangeMemeBackgroup handleClick={getNewMemeImage} />
      </div>
    </div>
  )
}

export default MainComponent