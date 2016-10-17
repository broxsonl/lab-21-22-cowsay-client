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

function CowsayController($log, $scope) {

  $log.debug('init CowsayController');
  let cowsayCtrl = $scope.cowsayCtrl = {};
  cowsayCtrl.title = 'I am a Cow! I say stuff!';
  cowsayCtrl.savedTitle = 'I am a cow who repeats when the button is clicked!';

  cowsayCtrl.array = [];

  cowsayCtrl.updateCow = function(input) {
    $log.debug('cowsayCtrl.updateCow()');
    return '\n' + cowsay.say({text: input || 'Give me something to say, human!'});
  };
  
  cowsayCtrl.updateThinkCow = function(input) {
    $log.debug('cowsayCtrl.updateCow()');
    return '\n' + cowsay.think({text: input || 'Give me something to say, human!'});
  };

  cowsayCtrl.helloClick = function(input) {
    $log.debug('cowsayCtrl.helloClick()');
    $log.debug(input);
    cowsayCtrl.array.push(input);
    cowsayCtrl.speak = cowsayCtrl.updateThinkCow(cowsayCtrl.updateCow(input));
  };

  cowsayCtrl.backClick = function() {
    $log.debug('cowsayCtrl.backClick()');
    cowsayCtrl.speak = cowsayCtrl.updateCow(cowsayCtrl.updateThinkCow(cowsayCtrl.array.pop()));
  };
}
