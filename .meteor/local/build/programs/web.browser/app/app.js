var require = meteorInstall({"imports":{"api":{"subs.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// imports/api/subs.js                                                                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.export({
  Subs: () => Subs
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Subs = new Mongo.Collection('tbl_annonsorer');

if (Meteor.isServer) {
  Meteor.publish('tbl_annonsorer', function subsPublication() {
    return Subs.find();
  });
  Router.route('/subs', {
    where: 'server'
  }).get(function () {
    var data = this.params.query.prenNr;
    var res = Subs.find({
      sub_prenNr: data
    }).fetch();
    this.response.statusCode = 200;
    this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    this.response.setHeader("Access-Control-Allow-Credentials", "true");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(res));
  });
  Router.route('/update', {
    where: 'server'
  }).get(function () {
    var prenNumber = this.params.query.prenNr;
    var res = Subs.find({
      sub_prenNr: prenNumber
    });
    var firstName = this.params.query.subFirstName;
    var lastName = this.params.query.subLastName;
    var personNumber = this.params.query.subPersonNumber;
    var address = this.params.query.subAddress;
    var postalCode = this.params.query.subPostalCode;
    Subs.update({
      sub_prenNr: prenNumber
    }, {
      $set: {
        sub_fornamn: firstName,
        sub_personNr: personNumber,
        sub_fornamn: firstName,
        sub_efternamn: lastName,
        sub_utAddr: address,
        sub_postNr: postalCode
      }
    });
    this.response.statusCode = 200;
    this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    this.response.setHeader("Access-Control-Allow-Credentials", "true");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify("success"));
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ui":{"App.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// imports/ui/App.js                                                                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
let React, Component;
module.link("react", {
  default(v) {
    React = v;
  },

  Component(v) {
    Component = v;
  }

}, 0);
let withTracker;
module.link("meteor/react-meteor-data", {
  withTracker(v) {
    withTracker = v;
  }

}, 1);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 2);
let Sub;
module.link("./Sub.js", {
  default(v) {
    Sub = v;
  }

}, 3);
let Subs;
module.link("../api/subs.js", {
  Subs(v) {
    Subs = v;
  }

}, 4);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 5);

class App extends Component {
  constructor() {
    super(...arguments);

    this.renderSubs = () => {
      return this.props.subs.map(sub => React.createElement(Sub, {
        key: sub._id,
        sub: sub
      }));
    };
  }

  render() {
    return React.createElement("div", {
      className: "container"
    }, React.createElement("h1", null, "Annonseringssystem"), React.createElement("ul", null, this.renderSubs()));
  }

}

module.exportDefault(withTracker(() => {
  var hej = '40593';
  Meteor.subscribe('tbl_annonsorer');
  return {
    subs: Subs.find({
      sub_telNr: hej
    }).fetch()
  };
})(App));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Sub.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// imports/ui/Sub.js                                                                                               //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
let React, Component;
module.link("react", {
  default(v) {
    React = v;
  },

  Component(v) {
    Component = v;
  }

}, 0);

// export default class Ad extends Component {
//     render() {
//         return (
//             <li>{this.props.sub.sub_fornamn}</li>
//         )
//     }
// }
const Sub = props => {
  return React.createElement(React.Fragment, null, React.createElement("li", null, props.sub.sub_namn));
};

module.exportDefault(Sub);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/main.js                                                                                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let render;
module.link("react-dom", {
  render(v) {
    render = v;
  }

}, 2);
let App;
module.link("../imports/ui/App.js", {
  default(v) {
    App = v;
  }

}, 3);
Meteor.startup(() => {
  render(React.createElement(App, null), document.getElementById('render-app'));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});

var exports = require("/client/main.js");