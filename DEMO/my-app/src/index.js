import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square (props) {
    return (
        <button className={props.className} onClick={props.onClick} >
            {props.value}
        </button>
    );
};

function calculateWinner (squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i ++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winLine: lines[i],
                winner: squares[a]
            };
        };
    };
    return {
        winner: null,
        winLine: Array(3)
    }
}; 

class Board extends React.Component {
    renderSquare (i) {
        const className = 'square' + (this.props.winLine.findIndex(ele => ele === i) !== -1 ? " win" : "");
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                className={className}
            />
        );
    }
    render () {
        const list = Array(3).fill(null).map((ele, index) => {
            return (
                <div key={index} className='board-row' >
                    {Array(3).fill(null).map((subEle, subIndex) => {
                        return (<React.Fragment key={subIndex}>
                            {this.renderSquare(index * 3 + subIndex)}
                        </React.Fragment>)
                    })}
                </div>
            );
        });
        return (
            <div>
                {list}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor (props) {
        super();
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            selectedIndex: -1,
            isAscending: false,
            history: [{squares: Array(9).fill(null)}]
        };
        this.listSort = this.listSort.bind(this);
    }
    jumpTo (step) {
        this.setState({stepNumber: step, selectedIndex: step, xIsNext: (step % 2) === 0});
    }
    listSort () {
        this.setState(prevState => ({isAscending: !prevState.isAscending}));
    }
    handleClick (i) {
        const {xIsNext, stepNumber} = this.state,
            history = this.state.history.slice(0, stepNumber + 1),
            len = history.length,
            current = history[len - 1],
            squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        };
        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            stepNumber: len,
            xIsNext: !xIsNext,
            history: history.concat([{squares}])
        });
    }
    render () {
        let sort = '', status = "",
            {xIsNext, history, stepNumber, isAscending, selectedIndex} = this.state,
            current = history[stepNumber],
            {winner, winLine} = calculateWinner(current.squares),
            moves = history.map((step, move) => {
                const desc = move ? 'Go to move #' + move : 'Go to game start';
                return (
                    <li key={move} className={selectedIndex === move ? "select" : ""}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            });
        moves.sort((a, b) => isAscending);
        sort = isAscending ? '降序' : '升序';
        status = winner
            ? 'Winner: ' + winner
            : stepNumber === 9 ? "平局" : 'Next player: ' + (xIsNext ? 'X' : 'O');
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        winLine={winLine}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>
                        {status}
                        &nbsp;<button onClick={this.listSort}>{sort}</button>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));