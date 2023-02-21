import React, { useState } from 'react';
import "./board.css";
import Landscape from './landscape';

// CONSTANTS

/* Example coordinate grid
[1,1] [2,1] [3,1] [4,1]
[1,2] [2,2] [3,2] [4,2]
[1,3] [2,3] [3,3] [4,3]
[1,4] [2,4] [3,4] [4,4]
*/

// Board dimensions
const sizeX = 5
const sizeY = 5

// +1 is needed, because the coordinates start at 1, not 0
const userStartX = ~~(sizeX / 2) + 1
const userStartY = ~~(sizeY / 2) + 1

// Enables the user to move around the border
const isCyclicalX = true;
const isCyclicalY = true;

////////////////////////////// COMPONENT FUNCTION
export default function Board(props) {

    const landscapesVisitedMap = new Map();
    for (let x = 1; x < sizeX + 1; x++) {
        for (let y = 1; y < sizeY + 1; y++) {
            landscapesVisitedMap.set(`${x},${y}`, false)
        }
    }

    // State
    const [userX, setUserX] = useState(userStartX);
    const [userY, setUserY] = useState(userStartY);
    const [currentDirections, setCurrentDirections] = useState("");
    const [landscapesVisited, setLandscapesVisited] = useState(landscapesVisitedMap)

    let score = 0
    for (let x = 1; x < sizeX + 1; x++) {
        for (let y = 1; y < sizeY + 1; y++) {
            if (landscapesVisited.get(`${x},${y}`)) score++
        }
    }

    props.setScore(score)

    // Move player, if possible
    const moveIfDirectionLegal = direction => {
        // is the player standing on a landscape that allows movement in the desired direction?
        const isDirectionLegal = currentDirections.includes(direction)

        if (isDirectionLegal) {
            switch (direction) {
                case 'N':
                    if ((userY > 1 && userY < sizeY + 1)) setUserY(userY - 1)
                    else if (isCyclicalY && userY === 1) setUserY(sizeY)
                    break;
                case 'E':
                    if ((userX > 0 && userX < sizeX)) setUserX(userX + 1)
                    else if (isCyclicalX && userX === sizeX) setUserX(1)
                    break;
                case 'S':
                    if ((userY > 0 && userY < sizeY)) setUserY(userY + 1)
                    else if (isCyclicalY && userY === sizeY) setUserY(1)
                    break;
                case 'W':
                    if ((userX > 1 && userX < sizeX + 1)) setUserX(userX - 1)
                    else if (isCyclicalX && userX === 1) setUserX(sizeX)
                    break;

                default:
                    break;
            }
        }
    }

    // window.addEventListener("keyDown", moveUser, false);
    window.onkeydown = function handleKeypress(evt) {
        // First check for boundary conditions, then for allowed directions
        switch (evt.keyCode) {
            case 38: moveIfDirectionLegal('N')
                // console.log("Pfeil nach oben");
                break;
            case 87: moveIfDirectionLegal('N')
                // console.log("W");
                break;
            case 39: moveIfDirectionLegal('E')
                // console.log("Pfeil nach rechts");
                break;
            case 68: moveIfDirectionLegal('E')
                // console.log("D");
                break;
            case 40: moveIfDirectionLegal('S')
                // console.log("Pfeil nach unten");
                break;
            case 83: moveIfDirectionLegal('S')
                // console.log("S");
                break;
            case 37: moveIfDirectionLegal('W')
                // console.log("Pfeil nach links");
                break;
            case 65: moveIfDirectionLegal('W')
                // console.log("D");
                break;
            default:
                break;
        }
    }

    // Row for landscapes
    function makeRow(y) {
        // const Array = [[1,y],[2,y],[3,y],[4,y],[5,y]]
        const coordinates = [];
        for (let x = 1; x < sizeX + 1; x++) {
            coordinates.push([x, y]);
        }
        return (
            <div className='row' key={y}>
                {coordinates.map(coordinate => <Landscape
                    coordinate={coordinate}
                    userX={userX}
                    userY={userY}
                    userStartX={userStartX}
                    userStartY={userStartY}
                    setCurrentDirections={setCurrentDirections}
                    incrementScore={props.incrementScore}
                    landscapesVisited={landscapesVisited}
                    setLandscapesVisited={setLandscapesVisited}
                    key={`${coordinate[0]},${y}`} />)}
            </div>
        )
    }

    // The board is a column of landscape rows
    function makeBoard() {
        const rows = []
        for (let y = 1; y < sizeY + 1; y++) {
            rows.push(makeRow(y))
        }
        return (
            <div className='board'>
                {rows}
            </div>
        )
    }

    // Return the whole board!
    return makeBoard();
}
