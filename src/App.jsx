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
      let dataSample = data.slice(0, 5); // save the first 5 elements from "data".
      console.log(getRandomIndices(data)); // once we receive the data -> log it to console
      
      setEmojisData(dataSample);
      setIsGameOn(true); 

    } catch (error) {
      console.error(error.message);
    }
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