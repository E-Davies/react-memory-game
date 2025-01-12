import { useState } from 'react'
import Form from '../components/Form'
import MemoryCard from '../components/MemoryCard'

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false)

  async function startGame(e) {
    e.preventDefault()
    const url = "https://emojihub.yurace.pro/api/all/category/animals-and-nature";

    try {
      const response = await fetch(url);

      if (!response.ok) { // error handling
        throw new Error("Could not fetch data from API");
      }

      const data = await response.json();
      console.log(data); // once we receive the data -> log it to console
      setIsGameOn(true); 

    } catch (error) {
      console.error(error.message);
    }
  }

  function turnCard() {
    console.log("Memory card clicked")
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} />}
    </main>
  )
}