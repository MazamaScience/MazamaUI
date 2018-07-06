/* ==============================================================================
 * app.js -- Main application file.
 * 
 * This chunk performs the following actions:
 *  * initialize the angular module
 *  * define routing behavior with ui.router
 * 
 * The 'gulp' utility will concatenate and minify this and other javascript code
 * and place in the app/dist/ directory as per directions in gulpfile.js.
 * 
 * Code style mostly follows: https://github.com/johnpapa/angular-styleguide
 */

(function() {
  'use strict';

  // Define our application, 'App', and list module dependencies (all found in dependencies.js)
  angular
    .module('App', ['ui.router', 'ui.bootstrap', 'rzModule'])
    .config(configure)
    .filter('unsafe', function($sce) {
      // This allows for injecting unescaped html (which can be dangerous!) using the 'unsafe' filter
      return function(val) {
        return $sce.trustAsHtml(val);
      };
    });

  // dependency injections
  // $stateProvider lets us define states and routes for ui.router
  // $urlRouterProvider lets us change the route
  configure.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configure($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("index", {
        url: "/",
        templateUrl: "main.html"
      })
      .state("help", {
        url: "/help",
        templateUrl: "help.html"
      });

    $urlRouterProvider.otherwise("/");

  }

})();
