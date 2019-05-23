import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Sub from './Sub.js';
import { Subs } from '../api/subs.js';
import { check } from 'meteor/check';

class App extends Component {

    renderSubs = () => {
        return this.props.subs.map((sub) => (
            <Sub key={sub._id} sub={sub}/>
        ));
    }

    render() {
        return(
            <div className="container">
                <h1>Annonseringssystem</h1>
                <ul>
                    {this.renderSubs()}
                </ul>
            </div>
        );
    }
}
export default withTracker(() => {
    var hej = '40593';
    Meteor.subscribe('tbl_annonsorer');
    return {
        subs: Subs.find({sub_telNr: hej}).fetch(),
    };
})(App);