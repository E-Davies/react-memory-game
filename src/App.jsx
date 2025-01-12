import { useState } from 'react'
import Form from '../components/Form'
import MemoryCard from '../components/MemoryCard'
// import { decodeEntity } from 'html-entities'

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);

  console.log(emojisData);

  async function startGame(e) {
    e.preventDefault()
    const url = "https://emojihub.yurace.pro/api/all/category/animals-and-nature";

    try {
      const response = await fetch(url);
      
      if (!response.ok) { // error handling
        throw new Error("Could not fetch data from API");
      }

      const data = await response.json();
      const dataSlice = getDataSlice(data); // save 5 random elements from "data".
      const emojisArray = getEmojisArray(dataSlice)
      
      setEmojisData(emojisArray);
      setIsGameOn(true); 

    } catch (error) {
      console.error(error.message);
    }
  }

  function getDataSlice(data){
    const randomIndices = getRandomIndices(data);

    const dataSlice = randomIndices.map(index => data[index])

    return dataSlice;
  }

  
  function getRandomIndices(data) {
    
    const randomIndicesArray = [];

    for (let i = 0; i < 5; i++) {
      let randomNum = Math.floor(Math.random() * data.length); // get a random number that is not larger that the API data array
      if (!randomIndicesArray.includes(randomNum)){//ensure only unique numbers are added to the array
        randomIndicesArray.push(randomNum);
      }else{
        i--
      }
    }
    // console.log(`${randomIndicesArray}`);
    return randomIndicesArray;
  }

  function getEmojisArray(data) {
    //make an arr with double the emojis in so that we have pairs to use in the game
    const pairedEmojisArray = [...data, ...data];

    // Use the Fisher-Yates algorithm to shuffle array
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = pairedEmojisArray[i]
      pairedEmojisArray[i] = pairedEmojisArray[j]
      pairedEmojisArray[j] = temp
    }

    return pairedEmojisArray;

  }


  function turnCard() {
    console.log("Memory card clicked")
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
    </main>
  )
}