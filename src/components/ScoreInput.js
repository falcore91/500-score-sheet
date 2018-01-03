import React, {Component} from 'react';
import './ScoreInput.css';

const _ = require( 'lodash' );

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
                Scores Input
                <p/>

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