import { useState } from "react"

type SquareProps = {
    value: string
    onSquareClick: () => void
}

function Square({ value, onSquareClick }: SquareProps) {
    const handleClick = () => onSquareClick()

    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    )
}
type BoardProps = {
    isXNext: boolean
    squares: string[]
    onPlay: (nextSquares: string[]) => void
}

function Board({ isXNext, squares, onPlay }: BoardProps) {
    const handleClick = (i: number) => {
        if (squares[i] !== "" || calculateWinner(squares) !== "") return

        const nextVal = isXNext ? "X" : "O"
        const nextSquares = squares.map((value, index) =>
            i !== index ? value : nextVal
        )
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares)
    const status =
        winner !== ""
            ? `Winner: ${winner}`
            : `Next player: ${isXNext ? "X" : "O"}`

    const board = [...Array(3)].map((_, i) => {
        const boardRow = [...Array(3)].map((_, j) => {
            return (
                <Square
                    value={squares[3 * i + j]}
                    onSquareClick={() => handleClick(3 * i + j)}
                    key={j}
                />
            )
        })

        return (
            <div className="board-row" key={i}>
                {boardRow}
            </div>
        )
    })

    return (
        <>
            <div className="status">{status}</div>
            {board}
        </>
    )
}

export default function Game() {
    const [history, setHistory] = useState<string[][]>([Array(9).fill("")])
    const [currentMove, setCurrentMove] = useState(0)

    const isXNext = currentMove % 2 === 0
    const currentSquares = history[currentMove]

    const handlePlay = (nextSquares: string[]) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    const jumpTo = (move: number) => {
        setCurrentMove(move)
    }

    const moves = history.map((_, move) => {
        const description = move > 0 ? `Go to move ${move}` : `Go to game start`
        if (move == currentMove) {
            return <li key={move}>You are at move #{move + 1}</li>
        } else {
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
            )
        }
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    isXNext={isXNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }
    return ""
}
