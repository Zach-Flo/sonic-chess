'use client'
import 'regenerator-runtime/runtime'
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "Chess.js";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useEffect } from 'react';
import axios from 'axios';
import '../src/app/globals.css'

const baseUrl = 'https://s4gqn8disb.execute-api.us-east-2.amazonaws.com/beta';


interface GameProps {
  chess: Chess;
  board: string;
  move: string;
}

interface DictaphoneProps {
  onSpeechResult: (result: string) => void;
}


const Dictaphone: React.FC<DictaphoneProps> = ({ onSpeechResult }) => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

   // useEffect with a dependency on 'listening'
   useEffect(() => {
    // Check if listening switched from true to false
    if (!listening) {
      // Run your function here
      translate(transcript);
    }
  }, [listening]);

  const [translatedMove, setTranslatedMove] = useState("")
  function translate(move: string){
    if (move != ""){
      setTranslatedMove(move); 
      onSpeechResult(move); //translated move being sent back to APP to send to BOARD
    }

  }

  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState<null | boolean>(null);

  useEffect(() => {
    // sets to true or false after component has been mounted
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
}, [browserSupportsSpeechRecognition])

  if (speechRecognitionSupported === null) return null // return null on first render, can be a loading indicator

  if (!speechRecognitionSupported) {
    return <span>Browser does not support speech recognition.</span>
  }

  return (
    <>
      <div className=' inline-block'>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={() => SpeechRecognition.startListening()}>Start</button>
        <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
        <button onClick={() => resetTranscript()}>Reset</button>
        <p>{transcript} {translatedMove}</p>
        </div>
    </>
  );
};

async function MakeAMove({ chess, board, move }: GameProps){
  if(chess.turn() == 'w' && !chess.isGameOver()){
    let moves = chess.moves();
    let movesList = moves.join(',');
    let userMove = (document.getElementById("moveInput") as HTMLInputElement).value
    
  }

  if (!chess.isGameOver()){
    const moves = chess.moves();

    chess.move(moves[0]);
    setTimeout(() => { console.log("move made");}, 500);
  }


  return chess.fen()

}

function Game({ chess, board }: GameProps){
  
  console.log(chess.pgn());
  return(
    <div className=' w-96 h-96'>
      <Chessboard position={board}></Chessboard>
    </div>
  );
}


const Play: React.FC = () => {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.fen());
  

  const handleSpeechResult = async (move: string) => {
    console.log(move)
    const moves = chess.moves().join(",")
    console.log(moves)
    const urlWithParams = `${baseUrl}?move=${encodeURIComponent(move)}&moves=${encodeURIComponent(moves)}`;

    axios.get(urlWithParams)
    .then(response => {
    // Process the response data
      console.log(response.data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
    setBoard(await MakeAMove({chess, board, move: move}))
  }

  async function handleClick(){
    setBoard(await MakeAMove({chess, board, move: ""}))
  }
  return(
    <>
      <div className=" ">
        <Game chess={chess} board={board} move={""}></Game>
        <button onClick={handleClick}>Move</button>
        <input id="moveInput" className=" ml-4 text-black pl-32" type="text"></input>
      </div>
      <Dictaphone onSpeechResult={handleSpeechResult}></Dictaphone>
    </>
  ) 
}
export default Play

