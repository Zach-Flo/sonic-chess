'use client'
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "Chess.js";
import { OpenAI } from "openai";

require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log(apiKey);
const openai = new OpenAI({
  apiKey: apiKey // This is also the default, can be omitted
});


interface GameProps {
  chess: Chess;
  board: string;
}

async function MakeAMove({ chess, board }: GameProps){
  if (!chess.isGameOver()){
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
    setTimeout(() => { console.log("move made");}, 500);
  }

  const completion = await openai.completions.create({
    model: "text-davinci-002",
    prompt: "say hello",
    max_tokens: 5,
  });
  console.log(completion.choices[0].text);

  return chess.fen()

}

function Game({ chess, board }: GameProps){
  
  console.log(chess.pgn());
  return(
    <>
      <Chessboard position={board}></Chessboard>
    </>
  );
}


export default function App() {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.fen());

  async function handleClick(){
    setBoard(await MakeAMove({chess, board}))
  }
  return(
    <>
      <div className=" max-w-xl">
        <Game chess={chess} board={board}></Game>
        <button onClick={handleClick}>Move</button>
        <input id="moveInput" className=" ml-4 text-black" type="text"></input>
      </div>
    </>
  ) 

}


