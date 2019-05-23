import { Mongo } from 'meteor/mongo';

export const Subs = new Mongo.Collection('tbl_annonsorer');


if (Meteor.isServer) {
    Meteor.publish('tbl_annonsorer', function subsPublication() {
        return Subs.find();
    });
    
    Router.route('/subs', {where: 'server'})
    .get(function(){
        var data = this.params.query.prenNr;
        var res = Subs.find({sub_prenNr: data}).fetch()
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify(res));
    })
    Router.route('/update', {where: 'server'})
    .get(function(){
        
        var prenNumber = this.params.query.prenNr;
        var res = Subs.find({sub_prenNr: prenNumber})
        var firstName = this.params.query.subFirstName;
        var lastName = this.params.query.subLastName;
        var personNumber = this.params.query.subPersonNumber;
        var address = this.params.query.subAddress;
        var postalCode = this.params.query.subPostalCode;
        Subs.update({sub_prenNr : prenNumber},{$set:{ sub_fornamn : firstName,
               sub_personNr: personNumber,
                sub_fornamn: firstName,
                sub_efternamn: lastName,
                sub_utAddr: address, 
                sub_postNr: postalCode,}})
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify("success"));
    })

}