/**
 * Created by ASUS on 2017/8/18.
 */
// var myApp = angular.module('myApp',['oc.lazyLoad','ui.router','treeApp','ui.bootstrap','ui.sortable','selectAddress']);

myApp.config(function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){
  $urlRouterProvider.otherwise('/typesetting');
  $stateProvider
  //  设计师大大开始
  //  设计师刚进来
.state('typesetting.designerAll',{
    url:'/designerall',
    templateUrl:'designer/designerAll.html',
    controller:'designerAllCtrl',
    resolve: {
      deps: ['$ocLazyLoad', function($ocLazyLoad){
        $ocLazyLoad.load(['../js/designerProject/designerAllCtrl.js','../js/public/homeTabs.js','../js/public/time.js'])
      }]
    }
  })
  //上部导航
  //项目总览
    .state('typesetting.projectOverView',{
      url:'/projectoverview',
      templateUrl:'designer/projectOverView.html',
      controller:'projectOverViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/getProject/D_projectOverViewCtrl.js'])
        }]
      }
    })
    //D_projectManagement 项目管理---立项
    .state('typesetting.projectList',{
      url:'/projectlist',
      templateUrl:'designer/D_projectManagement/getProject/content.html',
      controller:'contentCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/getProject/contentCtrl.js'])
        }]
      }
    })
    .state('typesetting.preSale',{
      url:'/presale',
      templateUrl:'designer/D_projectManagement/getProject/preSale.html',
      controller:'preSaleCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/getProject/preSaleCtrl.js')
        }]
      }
    })
    .state('typesetting.imageView',{
      url:'/imageview',
      templateUrl:'designer/D_projectManagement/getProject/imageView.html',
      controller:'imageViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/getProject/imageViewCtrl.js')
        }]
      }
    })
    .state('typesetting.outPutList',{
      url:'/outputlist',
      templateUrl:'designer/D_projectManagement/getProject/outPutList.html',
      controller:'outPutListCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/getProject/outPutListCtrl.js')
        }]
      }
    })
    //  询价
    .state('typesetting.dAskPrice',{
      url:'/daskprice',
      templateUrl:'designer/D_projectManagement/askPrice/D_askPrice.html',
      controller:'askPriceCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/askPrice/D_askPrice.js')
        }]
      }
    })
    .state('typesetting.signedList',{
      url:'/signedlist/:id',
      templateUrl:'designer/D_projectManagement/askPrice/D_signedList.html',
      controller:'signedListCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/askPrice/D_askPrice.js')
        }]
      }
    })
    .state('typesetting.askPriceEnd',{
      url:'/askpriceend/:id',
      templateUrl:'designer/D_projectManagement/askPrice/D_askPriceEnd.html',
      controller:'askPriceEndCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/askPrice/D_askPrice.js')
        }]
      }
    })
    //  签约
    .state('typesetting.Signed',{
      url:'/signed',
      templateUrl:'designer/D_projectManagement/Signed/D_signed.html',
      controller:'signedCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/Signed/D_signed.js')
        }]
      }
    })
    .state('typesetting.signedView',{
      url:'/signedview/:id',
      templateUrl:'designer/D_projectManagement/Signed/D_signedView.html',
      controller:'signedViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/Signed/signedViewCtrl.js')
        }]
      }
    })
    //  进度
    .state('typesetting.schedule',{
      url:'/schedule',
      templateUrl:'designer/D_projectManagement/schedule/D_schedule.html',
      controller:'scheduleCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/schedule/D_schedule.js')
        }]
      }
    })
    //  查勘进度
    .state('typesetting.scheduleView',{
      url:'/scheduleview/:id',
      templateUrl:'designer/D_projectManagement/schedule/D_scheduleView.html',
      controller:'scheduleViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerProject/D_projectManagement/schedule/scheduleViewCtrl.js')
        }]
      }
    })
    //  交付
    .state('typesetting.deliver',{
      url:'/deliver',
      templateUrl:'designer/D_projectManagement/deliver/D_deliver.html'
      // controller:'deliverCtrl'
    })
});


