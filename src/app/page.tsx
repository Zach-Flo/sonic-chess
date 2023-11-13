'use client'
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "Chess.js";

interface GameProps {
  chess: Chess;
  board: any;
}

function MakeAMove({ chess, board }: GameProps){
  if (!chess.isGameOver()){
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
    setTimeout(() => { console.log("move made");}, 500);
  }
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

  function handleClick(){
    setBoard(MakeAMove({chess, board}))
  }
  return(
    <>
      <div className=" max-w-xl">
        <Game chess={chess} board={board}></Game>
        <button onClick={handleClick}>Move</button>
      </div>
    </>
  ) 

}


