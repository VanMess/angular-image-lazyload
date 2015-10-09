'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('vgSrc');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('vgSrc.config')).to.be.ok;
  });

  

  
  it('should load directives module', function() {
    expect(hasModule('vgSrc.directives')).to.be.ok;
  });
  

  

});