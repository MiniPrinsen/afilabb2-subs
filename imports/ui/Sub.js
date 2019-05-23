import React, { Component } from 'react';

// export default class Ad extends Component {
//     render() {
//         return (
//             <li>{this.props.sub.sub_fornamn}</li>
//         )
//     }
// }

const Sub = (props) => {
    return (
        <React.Fragment>
           <li>{props.sub.sub_namn}</li>
        </React.Fragment>
    )
}
export default Sub