import React, { Component } from 'react';
import logo from './logo.svg';
import suitsIcon from './4suits-2400px.png'
import './App.css';
import ScoreInput from './components/ScoreInput.js'


/*
suits icon from https://openclipart.org/detail/171000/four-suits
 */

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
        return (
            <tr>
            <th className={"score-reference"}/>
            {suits.map(function (suitName) {
                return (<SuitHeader suit={suitName}/>)
            })}
        </tr>
        )
    }
    renderScoreRow( trickCount ){
        const suits = ["S", "C", "D", "H", "N"];
        const baseScores = [ 40, 60, 80, 100, 120 ];
        return <tr>
            <TrickCountCell value={trickCount}/>
            {suits.map( function( suit ) {
                return (<PointsCell value={
                    bidValue( trickCount, suit)}/>)
            })}
        </tr>

    }


    render() {
        const trickCounts = [6, 7, 8, 9, 10 ]
        return (
            <div>
            <table className="score-reference">
                <tr><th colspan="10">Possible Bids</th></tr>
                {this.renderHeaderRow(["Spades", "Clubs", "Diamonds", "Hearts", "No Trump"])}
                {trickCounts.map( function( trickCount ){
                    return this.renderScoreRow( trickCount )
                }, this)}
            </table>
            </div>
        )
    }
}


class Sheet extends Component {
    render() {
        return (
            <div className="sheet">
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
                    <img src={suitsIcon} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-body" style={{"margin-left":"50px"}}>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <ScoreInput/>
                <p/>
                <Sheet/>
                </div>
            </div>
        );
    }
}

function bidValue( trickCount, suit )
    {
    const baseScores = {
        "S": 40,
        "C": 60,
        "D": 80,
        "H": 100,
        "N": 120
    };

    return baseScores[ suit ] + (trickCount - 6) * 100;
    }
            /*
            "S"pades
            "C"lubs
            "D"iamonds
            "H"earts
            "N"o Trump
             */

export default App;
