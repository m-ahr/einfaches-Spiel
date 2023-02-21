import React, {useState} from "react";
import Header from "./header";
import Board from "./board";

const Game = () => {
    const [score, setScore] = useState(0)

    return <div className="gameContainer">
        <Header score={score} />
        <Board setScore={setScore}/>
    </div>
}

export default Game