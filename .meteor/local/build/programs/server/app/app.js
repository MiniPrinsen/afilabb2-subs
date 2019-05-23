var require = meteorInstall({"imports":{"api":{"subs.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// imports/api/subs.js                                                                                         //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// server/main.js                                                                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
module.link("../imports/api/subs.js");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvc3Vicy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0IiwiU3VicyIsIk1vbmdvIiwibGluayIsInYiLCJDb2xsZWN0aW9uIiwiTWV0ZW9yIiwiaXNTZXJ2ZXIiLCJwdWJsaXNoIiwic3Vic1B1YmxpY2F0aW9uIiwiZmluZCIsIlJvdXRlciIsInJvdXRlIiwid2hlcmUiLCJnZXQiLCJkYXRhIiwicGFyYW1zIiwicXVlcnkiLCJwcmVuTnIiLCJyZXMiLCJzdWJfcHJlbk5yIiwiZmV0Y2giLCJyZXNwb25zZSIsInN0YXR1c0NvZGUiLCJzZXRIZWFkZXIiLCJlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwicHJlbk51bWJlciIsImZpcnN0TmFtZSIsInN1YkZpcnN0TmFtZSIsImxhc3ROYW1lIiwic3ViTGFzdE5hbWUiLCJwZXJzb25OdW1iZXIiLCJzdWJQZXJzb25OdW1iZXIiLCJhZGRyZXNzIiwic3ViQWRkcmVzcyIsInBvc3RhbENvZGUiLCJzdWJQb3N0YWxDb2RlIiwidXBkYXRlIiwiJHNldCIsInN1Yl9mb3JuYW1uIiwic3ViX3BlcnNvbk5yIiwic3ViX2VmdGVybmFtbiIsInN1Yl91dEFkZHIiLCJzdWJfcG9zdE5yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFDQyxNQUFJLEVBQUMsTUFBSUE7QUFBVixDQUFkO0FBQStCLElBQUlDLEtBQUo7QUFBVUgsTUFBTSxDQUFDSSxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDRCxPQUFLLENBQUNFLENBQUQsRUFBRztBQUFDRixTQUFLLEdBQUNFLENBQU47QUFBUTs7QUFBbEIsQ0FBM0IsRUFBK0MsQ0FBL0M7QUFFbEMsTUFBTUgsSUFBSSxHQUFHLElBQUlDLEtBQUssQ0FBQ0csVUFBVixDQUFxQixnQkFBckIsQ0FBYjs7QUFHUCxJQUFJQyxNQUFNLENBQUNDLFFBQVgsRUFBcUI7QUFDakJELFFBQU0sQ0FBQ0UsT0FBUCxDQUFlLGdCQUFmLEVBQWlDLFNBQVNDLGVBQVQsR0FBMkI7QUFDeEQsV0FBT1IsSUFBSSxDQUFDUyxJQUFMLEVBQVA7QUFDSCxHQUZEO0FBSUFDLFFBQU0sQ0FBQ0MsS0FBUCxDQUFhLE9BQWIsRUFBc0I7QUFBQ0MsU0FBSyxFQUFFO0FBQVIsR0FBdEIsRUFDQ0MsR0FERCxDQUNLLFlBQVU7QUFDWCxRQUFJQyxJQUFJLEdBQUcsS0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCQyxNQUE3QjtBQUNBLFFBQUlDLEdBQUcsR0FBR2xCLElBQUksQ0FBQ1MsSUFBTCxDQUFVO0FBQUNVLGdCQUFVLEVBQUVMO0FBQWIsS0FBVixFQUE4Qk0sS0FBOUIsRUFBVjtBQUNBLFNBQUtDLFFBQUwsQ0FBY0MsVUFBZCxHQUEyQixHQUEzQjtBQUNBLFNBQUtELFFBQUwsQ0FBY0UsU0FBZCxDQUF3Qiw2QkFBeEIsRUFBdUQsdUJBQXZEO0FBQ0EsU0FBS0YsUUFBTCxDQUFjRSxTQUFkLENBQXdCLGtDQUF4QixFQUE0RCxNQUE1RDtBQUNBLFNBQUtGLFFBQUwsQ0FBY0UsU0FBZCxDQUF3Qiw4QkFBeEIsRUFBd0QsZ0RBQXhEO0FBQ0EsU0FBS0YsUUFBTCxDQUFjRyxHQUFkLENBQWtCQyxJQUFJLENBQUNDLFNBQUwsQ0FBZVIsR0FBZixDQUFsQjtBQUNILEdBVEQ7QUFVQVIsUUFBTSxDQUFDQyxLQUFQLENBQWEsU0FBYixFQUF3QjtBQUFDQyxTQUFLLEVBQUU7QUFBUixHQUF4QixFQUNDQyxHQURELENBQ0ssWUFBVTtBQUVYLFFBQUljLFVBQVUsR0FBRyxLQUFLWixNQUFMLENBQVlDLEtBQVosQ0FBa0JDLE1BQW5DO0FBQ0EsUUFBSUMsR0FBRyxHQUFHbEIsSUFBSSxDQUFDUyxJQUFMLENBQVU7QUFBQ1UsZ0JBQVUsRUFBRVE7QUFBYixLQUFWLENBQVY7QUFDQSxRQUFJQyxTQUFTLEdBQUcsS0FBS2IsTUFBTCxDQUFZQyxLQUFaLENBQWtCYSxZQUFsQztBQUNBLFFBQUlDLFFBQVEsR0FBRyxLQUFLZixNQUFMLENBQVlDLEtBQVosQ0FBa0JlLFdBQWpDO0FBQ0EsUUFBSUMsWUFBWSxHQUFHLEtBQUtqQixNQUFMLENBQVlDLEtBQVosQ0FBa0JpQixlQUFyQztBQUNBLFFBQUlDLE9BQU8sR0FBRyxLQUFLbkIsTUFBTCxDQUFZQyxLQUFaLENBQWtCbUIsVUFBaEM7QUFDQSxRQUFJQyxVQUFVLEdBQUcsS0FBS3JCLE1BQUwsQ0FBWUMsS0FBWixDQUFrQnFCLGFBQW5DO0FBQ0FyQyxRQUFJLENBQUNzQyxNQUFMLENBQVk7QUFBQ25CLGdCQUFVLEVBQUdRO0FBQWQsS0FBWixFQUFzQztBQUFDWSxVQUFJLEVBQUM7QUFBRUMsbUJBQVcsRUFBR1osU0FBaEI7QUFDckNhLG9CQUFZLEVBQUVULFlBRHVCO0FBRXBDUSxtQkFBVyxFQUFFWixTQUZ1QjtBQUdwQ2MscUJBQWEsRUFBRVosUUFIcUI7QUFJcENhLGtCQUFVLEVBQUVULE9BSndCO0FBS3BDVSxrQkFBVSxFQUFFUjtBQUx3QjtBQUFOLEtBQXRDO0FBTUEsU0FBS2YsUUFBTCxDQUFjQyxVQUFkLEdBQTJCLEdBQTNCO0FBQ0EsU0FBS0QsUUFBTCxDQUFjRSxTQUFkLENBQXdCLDZCQUF4QixFQUF1RCx1QkFBdkQ7QUFDQSxTQUFLRixRQUFMLENBQWNFLFNBQWQsQ0FBd0Isa0NBQXhCLEVBQTRELE1BQTVEO0FBQ0EsU0FBS0YsUUFBTCxDQUFjRSxTQUFkLENBQXdCLDhCQUF4QixFQUF3RCxnREFBeEQ7QUFDQSxTQUFLRixRQUFMLENBQWNHLEdBQWQsQ0FBa0JDLElBQUksQ0FBQ0MsU0FBTCxDQUFlLFNBQWYsQ0FBbEI7QUFDSCxHQXJCRDtBQXVCSCxDOzs7Ozs7Ozs7OztBQzNDRDVCLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLHdCQUFaLEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcblxuZXhwb3J0IGNvbnN0IFN1YnMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigndGJsX2Fubm9uc29yZXInKTtcblxuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgTWV0ZW9yLnB1Ymxpc2goJ3RibF9hbm5vbnNvcmVyJywgZnVuY3Rpb24gc3Vic1B1YmxpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gU3Vicy5maW5kKCk7XG4gICAgfSk7XG4gICAgXG4gICAgUm91dGVyLnJvdXRlKCcvc3VicycsIHt3aGVyZTogJ3NlcnZlcid9KVxuICAgIC5nZXQoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnBhcmFtcy5xdWVyeS5wcmVuTnI7XG4gICAgICAgIHZhciByZXMgPSBTdWJzLmZpbmQoe3N1Yl9wcmVuTnI6IGRhdGF9KS5mZXRjaCgpXG4gICAgICAgIHRoaXMucmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgdGhpcy5yZXNwb25zZS5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIik7XG4gICAgICAgIHRoaXMucmVzcG9uc2Uuc2V0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIiwgXCJ0cnVlXCIpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlLnNldEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0XCIpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlLmVuZChKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgICB9KVxuICAgIFJvdXRlci5yb3V0ZSgnL3VwZGF0ZScsIHt3aGVyZTogJ3NlcnZlcid9KVxuICAgIC5nZXQoZnVuY3Rpb24oKXtcbiAgICAgICAgXG4gICAgICAgIHZhciBwcmVuTnVtYmVyID0gdGhpcy5wYXJhbXMucXVlcnkucHJlbk5yO1xuICAgICAgICB2YXIgcmVzID0gU3Vicy5maW5kKHtzdWJfcHJlbk5yOiBwcmVuTnVtYmVyfSlcbiAgICAgICAgdmFyIGZpcnN0TmFtZSA9IHRoaXMucGFyYW1zLnF1ZXJ5LnN1YkZpcnN0TmFtZTtcbiAgICAgICAgdmFyIGxhc3ROYW1lID0gdGhpcy5wYXJhbXMucXVlcnkuc3ViTGFzdE5hbWU7XG4gICAgICAgIHZhciBwZXJzb25OdW1iZXIgPSB0aGlzLnBhcmFtcy5xdWVyeS5zdWJQZXJzb25OdW1iZXI7XG4gICAgICAgIHZhciBhZGRyZXNzID0gdGhpcy5wYXJhbXMucXVlcnkuc3ViQWRkcmVzcztcbiAgICAgICAgdmFyIHBvc3RhbENvZGUgPSB0aGlzLnBhcmFtcy5xdWVyeS5zdWJQb3N0YWxDb2RlO1xuICAgICAgICBTdWJzLnVwZGF0ZSh7c3ViX3ByZW5OciA6IHByZW5OdW1iZXJ9LHskc2V0Onsgc3ViX2Zvcm5hbW4gOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICBzdWJfcGVyc29uTnI6IHBlcnNvbk51bWJlcixcbiAgICAgICAgICAgICAgICBzdWJfZm9ybmFtbjogZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgIHN1Yl9lZnRlcm5hbW46IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgIHN1Yl91dEFkZHI6IGFkZHJlc3MsIFxuICAgICAgICAgICAgICAgIHN1Yl9wb3N0TnI6IHBvc3RhbENvZGUsfX0pXG4gICAgICAgIHRoaXMucmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgdGhpcy5yZXNwb25zZS5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIik7XG4gICAgICAgIHRoaXMucmVzcG9uc2Uuc2V0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIiwgXCJ0cnVlXCIpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlLnNldEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0XCIpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlLmVuZChKU09OLnN0cmluZ2lmeShcInN1Y2Nlc3NcIikpO1xuICAgIH0pXG5cbn0iLCJpbXBvcnQgJy4uL2ltcG9ydHMvYXBpL3N1YnMuanMnOyJdfQ==
