import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


class SuitHeader extends Component {
    render() {
        return (<th className="score-reference">
            {this.props.suit}
        </th>)
    }
}

class TrickCountCell extends Component {
    render() {
        return (<td className="score-reference">
            {this.props.value}
        </td>)
    }
}

class PointsCell extends Component {
    render() {
        return (<td className="score-reference">
            {this.props.value}
        </td>)
    }
}

class ScoreReference extends Component {
    renderHeaderRow(suits) {
        //suits should be array
        return <tr>
            <th className={"score-reference"}/>
            {suits.map(function (suitName) {
                return (<SuitHeader suit={suitName}/>)
            })}
        </tr>
    }
    renderScoreRow( trickCount ){
        const baseScores = [ 40, 60, 80, 100, 120 ]
        return <tr>
            <TrickCountCell value={trickCount}/>
            {baseScores.map( function( baseScore ) {
                return (<PointsCell value={
                    ((trickCount - 6) * 100) + baseScore}/>)
            })}
        </tr>

    }


    render() {
        const trickCounts = [6, 7, 8, 9, 10 ]
        return (
            <table className="score-reference">
                {this.renderHeaderRow(["Spades", "Clubs", "Diamonds", "Hearts", "No Trump"])}
                {trickCounts.map( function( trickCount ){
                    return this.renderScoreRow( trickCount )
                }, this)}
            </table>
        )
    }
}

class ScoreCard extends Component {
    render() {
        return (
            <table className="score-card">
                <tr>
                    <th>
                        hi
                    </th>
                </tr>
            </table>

        )
    }
}


class Sheet extends Component {

    render() {
        return (
            <div className="sheet">
                <ScoreCard/>
                <ScoreReference/>

            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Sheet/>
            </div>
        );
    }
}

export default App;
