'use client'
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "Chess.js";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'




interface GameProps {
  chess: Chess;
  board: string;
}

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <button onClick={() => resetTranscript()}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

async function MakeAMove({ chess, board }: GameProps){
  if(chess.turn() == 'w' && !chess.isGameOver()){
    let moves = chess.moves();
    let movesList = moves.join(',');
    let userMove = (document.getElementById("moveInput") as HTMLInputElement).value
  }

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
      <Dictaphone></Dictaphone>

    </>
  ) 

}


