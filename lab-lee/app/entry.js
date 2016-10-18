'use strict';

// require webpack assets
require('./scss/main.scss');

// npm modules
const cowsay = require('cowsay-browser');
const angular = require('angular');

// app modules

//angular modules
const cowsayApp = angular.module('cowsayApp', []);

// angular constructs
cowsayApp.controller('CowsayController', [ '$log', '$scope', CowsayController]);

function CowsayController($log) {

  $log.debug('init CowsayController');
  this.title = 'I am a Cow! I say stuff!';
  this.savedTitle = 'I am a cow who repeats when the button is clicked!';

  this.array = [];

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.currentCow = this.cowfiles[0];
    console.log(cowfiles);
  });

  this.updateCow = function(input) {
    $log.debug('this.updateCow()');
    return '\n' + cowsay.say({text: input || 'Give me something to say, human!'});
  };

  this.updateThinkCow = function(input) {
    $log.debug('this.updateCow()');
    return '\n' + cowsay.think({text: input || 'Give me something to say, human!', f: this.currentCow});
  };

  this.talk = function(input) {
    $log.debug('this.updateCow()');
    this.speak = this.updateCow(input);
    this.array.push(this.talk);
  };

  this.undo = function() {
    this.talk = this.history.pop() || '';
  };
}

cowsayApp.controller('NavController', ['$log', NavController]);

function NavController($log) {
  $log.debug('init NavController');
  // property on the NavController called this.routes hat has 3 routes on it.
  this.routes = [
    {
      name: 'Home',
      url: '/home',
    },
    {
      name: 'About',
      url: '/about',
    },
  ];
}
