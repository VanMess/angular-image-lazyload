// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Gulp

var toString = Object.prototype.toString;

angular.module('vgSrc', []);
