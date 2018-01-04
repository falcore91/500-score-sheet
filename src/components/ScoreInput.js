import React, {Component} from 'react';
import './ScoreInput.css';

const _ = require( 'lodash' );

const suits = [
    { code: "S", name: "Spades" },
    { code: "C", name: "Clubs" },
    { code: "D", name: "Diamonds" },
    { code: "H", name: "Hearts" },
    { code: "N", name: "No Trump" }
    ];



class BidInput extends Component {
    constructor( props )
        {
            super(props);
        this.state = {
            teamBidding: "a",
            tricksBid: 6,
            suitBid: "S",
            tricksTaken: 0
        };
        }

    bidValue( trickCount, suit )
        {
        //copy pasted until i have a better grasp of import/export
        const baseScores = {
            "S": 40,
            "C": 60,
            "D": 80,
            "H": 100,
            "N": 120
        };

        return baseScores[ suit ] + (trickCount - 6) * 100;
        }

    makeTricksSelectRow( trickCount ){
    return( <option value={trickCount}>{trickCount}</option>)
    }
    makeSuitsSelectRow( suitObject ){
        return( <option value={suitObject.code}>{suitObject.name}</option>)
    }
    handleTeamChange( event ){
        this.setState( { teamBidding: event.target.value } );
    }
    handleTricksBid( event ){
        this.setState( { tricksBid: event.target.value } );
    }
    handleSuitBid( event ){
        this.setState( { suitBid: event.target.value } );
    }
    handleTricksTaken( event ){
        this.setState( { tricksTaken: event.target.value } );
    }
    handleSubmitClick( event ){
        const newScore = {};
        const teamBidding = this.state.teamBidding;
        const tricksBid = parseInt( this.state.tricksBid ) || 0;
        console.log( "tricksBid " + tricksBid );
        const tricksTaken = parseInt( this.state.tricksTaken ) || 0;
        console.log( "tricksTaken " + tricksTaken );
        const bidValue = this.bidValue( tricksBid, this.state.suitBid );
        const madeBid = tricksTaken >= tricksBid;
        const biddersScore = (madeBid ? bidValue : 0 - bidValue) || 0;
        const defendersScore = ((10 - tricksTaken) * 10) || 0;
        if ( teamBidding === "a" )
            {
            newScore.a = biddersScore;
            newScore.b = defendersScore;
            }
        else{
            newScore.a = defendersScore;
            newScore.b = biddersScore;
        }

        this.props.changeScores( newScore );


        this.setState( {
            teamBidding: "a",
            tricksBid: 6,
            suitBid: "S",
            tricksTaken: 0
        });
        console.log( "reset State" );
    }
    render(){
        return(
            <div>
                <p>Bid Input</p>
                <p>Team <select onChange={this.handleTeamChange.bind(this)} value={this.state.teamBidding}>
                    <option value={"a"}>A</option>
                    <option value={"b"}>B</option>
                </select></p>
                <p>Tricks Bid <select onChange={this.handleTricksBid.bind(this)} value={this.state.tricksBid}>
                    {[6,7,8,9,10].map( trickCount =>this.makeTricksSelectRow(trickCount))}
                </select></p>
                <p>Suits <select onChange={this.handleSuitBid.bind(this)} value={this.state.suitBid}>
                    {suits.map( suitObject => this.makeSuitsSelectRow( suitObject ) )}
                </select></p>
                <p>Tricks Taken <select onChange={this.handleTricksTaken.bind(this)} value={this.state.tricksTaken}>{[0,1,2,3,4,5,6,7,8,9,10].map( trickCount => this.makeTricksSelectRow(trickCount) ) }</select></p>
                <p><button onClick={this.handleSubmitClick.bind(this)}>Submit Results</button></p>
                

            </div>
        )
    }

}

class ScoreInput extends Component {
    constructor( props )
        {
        super( props );

        this.state = {
            scores: [],
            totals: [],
            scoreInputA: "",
            scoreInputB: ""
        };

        }

    componentDidMount()
        {
        //lesson learned today: this is an example where async nature of state changes could bite a dev. The change must have been scheduled, but not completed, before the next
        //but apparently setState can also take a function to handle situations like this, which is what I will refactor to
        this.changeScores( { a: 200, b: 0 } );
        this.changeScores( { a: 10, b: 200 } );
        this.changeScores( { a: -200, b: 30 } );
        }

    changeScores( changeObject )
        {
        console.log( "Changing scores " + JSON.stringify( changeObject ) );
        this.setState( ( state ) => {
            const previousTotals = state.totals.slice();
            const latestTotals   = _.last( previousTotals ) || { a: 0, b: 0 };
            return ({
                scores: state.scores.slice().concat( { a: changeObject.a, b: changeObject.b } ),
                totals: state.totals.slice().concat( {
                    a: latestTotals.a + changeObject.a,
                    b: latestTotals.b + changeObject.b
                } )
            })
        } );
        }

    handleInputA( event )
        {
        this.setState( { scoreInputA: event.target.value } );
        }

    handleInputB( event )
        {
        this.setState( { scoreInputB: event.target.value } );
        }

    handleSubmitScore( event )
        {
        if( !this.state.scoreInputA || !this.state.scoreInputB )
        {
            return;
        }
        this.changeScores( { a: parseInt(this.state.scoreInputA), b: parseInt(this.state.scoreInputB) } );
        this.setState( { scoreInputA: "", scoreInputB: "" } );
        // this.setState( { scores: this.state.scores.slice().concat( {a: this.state.scoreInputA, b: this.state.scoreInputB } ), scoreInputA: "", scoreInputB: "" } )
        }

    render()
        {
        return (
            <div>
                <p>Scores Input</p>
                <BidInput changeScores={this.changeScores.bind(this)}/>
                <table>
                    <tr>
                        <th>Team A</th>
                        <th>Team B</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="number" step="10" value={this.state.scoreInputA}
                                   onChange={this.handleInputA.bind( this )}>
                            </input>
                        </td>
                        <td>
                            <input type="number" step="10" value={this.state.scoreInputB}
                                   onChange={this.handleInputB.bind( this )}>
                            </input>
                        </td>
                        <td>
                            <button onClick={this.handleSubmitScore.bind( this )}>
                                Submit Score
                            </button>
                        </td>
                    </tr>

                </table>


                <p/>
                Scores
                <table>
                    <tr>
                        <th>Change</th>
                        <th>Team A</th>
                        <th>Team B</th>
                        <th>Change</th>
                    </tr>
                    {
                        this.state.scores.map( (score, index) => {
                            return (<tr>
                                <td>{score.a}</td>
                                <td>{this.state.totals[index].a}</td>
                                <td>{this.state.totals[index].b}</td>
                                <td>{score.b}</td>
                            </tr>)
                        }, this )}
                </table>
            </div>
        )
        }

}





export default ScoreInput