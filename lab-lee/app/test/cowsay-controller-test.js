'use strict';

require('./lib/test-setup.js');

const cowsay = require('cowsay-browser');
const angular = require('angular');

describe('testing cowsayCtrl', function() {

  beforeEach( () => {
    angular.mock.module('cowsayApp');
    angular.mock.inject( $controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('testing initial properties', () => {

    it('title should equal "I am a Cow! I say stuff!"', () => {
      expect(this.cowsayCtrl.title).toBe('I am a Cow! I say stuff!');
    });

    it('savedTitle should equal "I am a cow who repeats when the button is clicked!"', () => {
      expect(this.cowsayCtrl.savedTitle).toBe('I am a cow who repeats when the button is clicked!');
    });

    it('array should be an array', () => {
      expect(Array.isArray(this.cowsayCtrl.array)).toBe(true);
    });

    it('cowfiles should be the same as cowsay.list', () => {
      cowsay.list((err, list) => {
        expect(list).toEqual(this.cowsayCtrl.cowfiles);
        expect(this.cowsayCtrl.currentCow).toEqual(list[0]);
      });
    });

    it('cowcolors should be an array with length of 5', () => {
      expect(Array.isArray(this.cowsayCtrl.cowcolors)).toBe(true);
      expect(this.cowsayCtrl.cowcolors.length).toEqual(5);

      let expectedColors = ['black', 'red', 'blue', 'green', 'yellow'];
      let expectedClasses = ['app-cow-black', 'app-cow-red', 'app-cow-blue', 'app-cow-green', 'app-cow-yellow'];

      for (var i = 0; i < this.cowsayCtrl.cowcolors.length; i++) {
        expect(this.cowsayCtrl.cowcolors[i].name).toBe(expectedColors[i]);
        expect(this.cowsayCtrl.cowcolors[i].class).toBe(expectedClasses[i]);
      }
    });
  });

  describe('testing #updateCow()', () => {

    it('should return a beavis.zen hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      let result = this.cowsayCtrl.updateCow('hello');
      expect(result).toEqual(expectedResult);
    });

    it('with no input passed in; default', () => {
      let expectedResult = '\n' + cowsay.say({text: 'Give me something to say, human!', f: this.cowsayCtrl.currentCow});
      let result = this.cowsayCtrl.updateCow();
      expect(result).toBe(expectedResult);
    });

  });

  describe('testing #talk()', () => {

    it('should return a beavis.zen hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.talk('hello');
      expect(this.cowsayCtrl.speak).toEqual(expectedResult);
      expect(this.cowsayCtrl.array.length).toEqual(1);
    });
  });

  describe('testing #undo()', () => {

    it('should return a beavis.zen hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.talk('stuff');
      this.cowsayCtrl.talk('hello');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.speak).toEqual(expectedResult);
      expect(this.cowsayCtrl.array.length).toEqual(1);
    });

    it('with no input passed in; default', () => {
      let expectedResult = '\n' + cowsay.say({text: 'Give me something to say, human!', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.talk('stuff');
      this.cowsayCtrl.undo();
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.speak).toEqual('');
      expect(this.cowsayCtrl.updateCow()).toBe(expectedResult);
    });
  });
});
