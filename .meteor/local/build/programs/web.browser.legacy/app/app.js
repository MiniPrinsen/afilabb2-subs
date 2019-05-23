var require = meteorInstall({"imports":{"api":{"subs.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/subs.js                                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Subs: function () {
    return Subs;
  }
});
var Mongo;
module.link("meteor/mongo", {
  Mongo: function (v) {
    Mongo = v;
  }
}, 0);
var Subs = new Mongo.Collection('tbl_annonsorer');

if (Meteor.isServer) {
  Meteor.publish('tbl_annonsorer', function () {
    function subsPublication() {
      return Subs.find();
    }

    return subsPublication;
  }());
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ui":{"App.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/App.js                                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React, Component;
module.link("react", {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);
var withTracker;
module.link("meteor/react-meteor-data", {
  withTracker: function (v) {
    withTracker = v;
  }
}, 1);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 2);
var Sub;
module.link("./Sub.js", {
  "default": function (v) {
    Sub = v;
  }
}, 3);
var Subs;
module.link("../api/subs.js", {
  Subs: function (v) {
    Subs = v;
  }
}, 4);
var check;
module.link("meteor/check", {
  check: function (v) {
    check = v;
  }
}, 5);

var App =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(App, _Component);

  function App() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.renderSubs = function () {
      return _this.props.subs.map(function (sub) {
        return React.createElement(Sub, {
          key: sub._id,
          sub: sub
        });
      });
    };

    return _this;
  }

  var _proto = App.prototype;

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "container"
      }, React.createElement("h1", null, "Annonseringssystem"), React.createElement("ul", null, this.renderSubs()));
    }

    return render;
  }();

  return App;
}(Component);

module.exportDefault(withTracker(function () {
  var hej = '40593';
  Meteor.subscribe('tbl_annonsorer');
  return {
    subs: Subs.find({
      sub_telNr: hej
    }).fetch()
  };
})(App));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Sub.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/ui/Sub.js                                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React, Component;
module.link("react", {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
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
var Sub = function (props) {
  return React.createElement(React.Fragment, null, React.createElement("li", null, props.sub.sub_namn));
};

module.exportDefault(Sub);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/main.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 1);
var render;
module.link("react-dom", {
  render: function (v) {
    render = v;
  }
}, 2);
var App;
module.link("../imports/ui/App.js", {
  "default": function (v) {
    App = v;
  }
}, 3);
Meteor.startup(function () {
  render(React.createElement(App, null), document.getElementById('render-app'));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});

var exports = require("/client/main.js");