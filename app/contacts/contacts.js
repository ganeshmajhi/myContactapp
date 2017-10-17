'use strict';

var config = {
    apiKey: "AIzaSyBjCdLDb0Xsj1c1zfjtBp63EwZhiRbTXlo",
    authDomain: "awscontact.firebaseapp.com",
    databaseURL: "https://awscontact.firebaseio.com",
    projectId: "awscontact",
    storageBucket: "awscontact.appspot.com",
    messagingSenderId: "23807458029"
  };
  firebase.initializeApp(config);

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

//contacts controller

.controller('ContactsCtrl', ['$scope','$firebaseArray', function($scope, $firebaseArray){
	
 // var ref = new Firebase('https://awscontact.firebaseio.com');

 //init firebase
  var ref = firebase.database().ref();

  $scope.contacts = $firebaseArray(ref);

  //show add form

  $scope.showAddForm = function(){
  	$scope.addFormShow = true;
  }

  //show edit form

  $scope.showEditForm = function(contact){
  	$scope.editFormShow = true;

    $scope.id = contact.$id;
  	$scope.name = contact.name;
  	$scope.email = contact.email;
  	$scope.company = contact.company;
  	$scope.work_phone = contact.phones[0].work;
  	$scope.home_phone = contact.phones[0].home;
  	$scope.mobile_phone = contact.phones[0].mobile_phone;
  	$scope.street_address = contact.address[0].street_address;
  	$scope.city = contact.address[0].city;
  	$scope.state = contact.address[0].state;
  	$scope.zip = contact.address[0].zip;
  }

  //hide form
  $scope.hide = function(){
  	$scope.addFormShow =false;
  	$scope.contactShow = false;
  }

  //submit contact
  $scope.addFormSubmit = function(){
  	console.log('Adding Contact');

   //assign values
   if($scope.name){ var name = $scope.name } else { var name = null;}
   if($scope.email){ var email = $scope.email } else { var email = null;}
   if($scope.company){ var company = $scope.company } else { var company = null;}
   if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone } else { var mobile_phone = null;}
   if($scope.home_phone){ var home_phone = $scope.home_phone } else { var home_phone = null;}
   if($scope.work_phone){ var work_phone = $scope.work_phone } else { var work_phone = null;}
   if($scope.street_address){ var street_address = $scope.street_address } else { var street_address = null;}
   if($scope.city){ var city = $scope.city } else { var city = null;}
   if($scope.state){ var state = $scope.state } else { var state = null;}
   if($scope.zip){ var zip = $scope.zip } else { var zip = null;}



   //Built Objects

   $scope.contacts.$add({
   	name:name,
   	email:email,
   	company:company,
   	phones:[
   	{
   		mobile:mobile_phone,
   		home:home_phone,
   		work:work_phone

   	}
   	],
   	address:[
   	{
   		street_address:street_address,
   		city:city,
   		state:state,
   		zip:zip

   	}
   	]
   }).then(function(ref){
   	var id = ref.apiKey();
   	console.log('Adding contact with id' + id);

   	   });
   //clear form
   	clearFields();

   	//hide form
   	$scope.addFormShow = false;

   	//send message
   	$scope.msg = "contact added";



  }

  $scope.editFormSubmit = function(){
  	console.log('updating contact..');
    //get id
  	var id =$scope.id;
  	//get record
  	var record = $scope.contacts.$getRecord(id);

  	//assign values
  	record.name = $scope.name;
  	record.email = $scope.email;
  	record.company = $scope.company;
  	record.phones[0].work = $scope.work_phone;
  	record.phones[0].home = $scope.home_phone;
  	record.phones[0].mobile = $scope.mobile_phone;
  	record.address[0].street_address = $scope.street_address;
  	record.address[0].city = $scope.city;
  	record.address[0].state = $scope.state;
  	record.address[0].zip = $scope.zip;

  	//save contact
  	$scope.contacts.$save(record).then(function(){
  		console.log(ref.key);
  	});

  	clearFields();

  	//hide form 

  	$scope.editFormShow = false;
  	$scope.msg = "contact updated";


  }


  $scope.showContact = function(contact){
  	console.log("getting contact");

  	$scope.name = contact.name;
  	$scope.email = contact.email;
  	$scope.company = contact.company;
  	$scope.work_phone = contact.phones[0].work;
  	$scope.home_phone = contact.phones[0].home;
  	$scope.mobile_phone = contact.phones[0].mobile_phone;
  	$scope.street_address = contact.address[0].street_address;
  	$scope.city = contact.address[0].city;
  	$scope.state = contact.address[0].state;
  	$scope.zip = contact.address[0].zip;

  	$scope.contactShow = true;


  }



  $scope.removeContact = function(contact){
  	console.log('removing contact');

  	$scope.contacts.$remove(contact);
  	$scope.msg ="Contact removed";
  }

  // clear $ scope field
  function clearFields(){
  	console.log('clearing all fields');
  	$scope.name = '';
  	$scope.email = '';
  	$scope.company = '';
  	$scope.mobile_phone = '';
  	$scope.home_phone = '';
  	$scope.work_phone = '';
  	$scope.street_address = '';
  	$scope.city = '';
  	$scope.state = '';
  	$scope.zip = '';
  }

}]);