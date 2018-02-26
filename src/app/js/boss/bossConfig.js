/**
 * Created by ASUS on 2017/8/18.
 */
var myApp = angular.module('myApp',['oc.lazyLoad','ui.router','treeApp','ui.bootstrap','ui.sortable','selectAddress']);
myApp.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/typesetting');
});

