import React from 'react'
import User from './user.js'

const Landscape = ({
    coordinate,
    userX,
    userY,
    userStartX,
    userStartY,
    setCurrentDirections,
    landscapesVisited,
    setLandscapesVisited,
}) => {

    // Returns a string with the allowed directions of a landscape
    function direction(x, y) {
        let directions = ['N', 'E', 'S', 'W'];

        // the start landscale should have all directions
        if (x === userStartX && y === userStartY) return directions

        // random Direction
        function randomDirection(possibleDirections) {
            const randomIndex = ~~(Math.random() * possibleDirections.length);
            return directions[randomIndex]
        }

        // Start with a single random direction
        let allowedDirections = randomDirection(directions)

        // Filter out first direction, so that it can't be picked again
        directions = directions.filter(direction => direction !== allowedDirections)

        // Add more random directions based on a coin flip
        while (directions.length > 0) {
            const coin = ~~(Math.random() * 2)

            if (coin === 1) {
                const newRandomDirection = randomDirection(directions)
                allowedDirections += newRandomDirection
                // Filter out new random direction, so that it can't be picked again
                directions = directions.filter(direction => direction !== newRandomDirection)
            } else {
                return allowedDirections
            }
        }
        return allowedDirections
    }
    
    const x = coordinate[0]
    const y = coordinate[1]

    // allowed directions, e.g. "NSW"
    const [directions, setDirections] = React.useState(direction(x,y))
    let [hasBeenVisited, setHasBeenVisited] = React.useState(false)

    if (userX === x && userY === y) {
        setCurrentDirections(directions)

        if (!hasBeenVisited) {
            setHasBeenVisited(true)

            if (!landscapesVisited.get(`${x},${y}`)) {
                const landscapesVisitedCopy = new Map(landscapesVisited)
                landscapesVisitedCopy.set(`${x},${y}`, true)
                setLandscapesVisited(landscapesVisitedCopy)
            }
        }
    }

    return <div
        className={hasBeenVisited ? "landscape" : "landscape hidden"}
        datax={x}
        datay={y}
    >
        {directions.includes("W") ? <i className="fa-solid fa-arrow-left"></i> : ''}
        {directions.includes("N") ? <i className="fa-solid fa-arrow-up"></i> : ''}
        {directions.includes("E") ? <i className="fa-solid fa-arrow-right"></i> : ''}
        {directions.includes("S") ? <i className="fa-solid fa-arrow-down"></i> : ''}
        {((userX === x) && (userY === y)) ? <User /> : ''}
    </div>
}

export default Landscape;