/**
 * Created by ASUS on 2017/8/18.
 */
var myApp = angular.module('myApp',['treeApp','oc.lazyLoad','ui.router','ui.bootstrap','ui.sortable','selectAddress','oc.lazyLoad','ngAnimate']);

var urlName = "http://scmc.villion.cn:4433/";
var zheng = "http://scmc.villion.cn:4433/";
var yang = "http://scmc.villion.cn:4433/";
var phone = "http://scmc.villion.cn:4433/";
var boss = "http://scmc.villion.cn:4433/";      //龚政;  // boss
var managerZ = "http://scmc.villion.cn:4433/";  //龚政;  //manager
var designerZ = "http://scmc.villion.cn:4433/";  //龚政;  //designer
var factoryZ = "http://scmc.villion.cn:4433/";  //龚政;  //factory
var bossY = "http://scmc.villion.cn:4433/";      //升阳;;  // boss
var managerY = "http://scmc.villion.cn:4433/";  //升阳;  //manager
var designerY = "http://scmc.villion.cn:4433/";  //升阳;  //designer
var factoryY = "http://scmc.villion.cn:4433/";  //升阳;  //factroy

// var urlName = "http://192.168.2.103:8080/";
// var zheng = "http://192.168.2.103:8080/";
// var yang = "http://192.168.2.103:8080/";
// var phone = "http://192.168.2.103:8080/";
// var boss = "http://192.168.2.103:8080/";      //龚政;  // boss
// var managerZ = "http://192.168.2.103:8080/";  //龚政;  //manager
// var designerZ = "http://192.168.2.103:8080/";  //龚政;  //designer
// var factoryZ = "http://192.168.2.103:8080/";  //龚政;  //factory
// var bossY = "http://192.168.2.103:8080/";      //升阳;;  // boss
// var managerY = "http://192.168.2.103:8080/";  //升阳;  //manager
// var designerY = "http://192.168.2.103:8080/";  //升阳;  //designer
// var factoryY = "http://192.168.2.103:8080/";  //升阳;  //factroy

// var str = window.location.search;
// var id = str.split('&')[0].split('=')[1];
// var role = str.split('&')[1].split('=')[1];
// var Identity = decodeURIComponent(role);
var storage = window.localStorage;
var id = storage.getItem('loginId');
var Identity = storage.getItem('role');

myApp.config(function($ocLazyLoadProvider,$stateProvider,$urlRouterProvider,$controllerProvider,$compileProvider,$filterProvider,$provide){

  $urlRouterProvider.otherwise('/typesetting');
  $ocLazyLoadProvider.config({
    debug: false, //知否启用调试模式
    events:true  //事件绑定是否启用
  });
  //定义全局
  myApp.controller = $controllerProvider.register;
  myApp.directive = $compileProvider.directive;
  myApp.filter = $filterProvider.register;
  myApp.factory = $provide.factory;
  myApp.service = $provide.service;
  $stateProvider

  //  设计师大大开始
    //  设计师刚进来
    .state('typesetting.designerAll',{
      url:'/designerall',
      templateUrl:'designer/designerAll.html',
      controller:'designerAllCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/designerAllCtrl.js','../js/public/homeTabs.js','../js/public/time.js'])
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
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/getProject/contentCtrl.js','../js/designerProject/D_projectManagement/getProject/addFrojectModelCtrl.js'])
        }]
      }
    })
    .state('typesetting.preSale',{
      url:'/presale',
      templateUrl:'designer/D_projectManagement/getProject/preSale.html',
      controller:'preSaleCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/getProject/preSaleCtrl.js','../js/public/animation.js','../js/designerProject/D_projectManagement/getProject/preSaleModel.js'])
        }]
      }
    })
    .state('typesetting.imageView',{
      url:'/imageview',
      templateUrl:'designer/D_projectManagement/getProject/imageView.html',
      controller:'imageViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/getProject/imageViewCtrl.js','../js/designerProject/designerDirective.js','../js/public/bigImg.js','../js/public/editImg.js'])
        }]
      }
    })
    .state('typesetting.outPutList',{
      url:'/outputlist',
      templateUrl:'designer/D_projectManagement/getProject/outPutList.html',
      controller:'outPutListCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/getProject/outPutListCtrl.js','../js/designerProject/designerDirective.js','../js/public/bigImg.js','../js/public/excel.js'])
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
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/askPrice/signedListCtrl.js','../js/public/bigImg.js','../js/public/excel.js'])
        }]
      }
    })
    .state('typesetting.askPriceEnd',{
      url:'/askpriceend/:id',
      templateUrl:'designer/D_projectManagement/askPrice/D_askPriceEnd.html',
      controller:'askPriceEndCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/askPrice/askPriceEndCtrl.js','../js/public/bigImg.js','../js/designerProject/designerDirective.js','../js/public/excel.js'])
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
      url:'/signedview/:id/:name',
      templateUrl:'designer/D_projectManagement/Signed/D_signedView.html',
      controller:'signedViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/Signed/signedViewCtrl.js','../js/public/bigImg.js','../js/public/excel.js','../js/public/Evaluation.js'])
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
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/schedule/D_schedule.js'])
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
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/schedule/scheduleViewCtrl.js','../js/echarts.js','../js/public/bigImg.js','../js/public/excel.js'])
        }]
      }
    })
    //  交付
    .state('typesetting.deliver',{
      url:'/deliver',
      templateUrl:'designer/D_projectManagement/deliver/D_deliver.html',
      controller:'deliverCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/D_projectManagement/deliver/D_deliver.js','../js/public/bigImg.js'])
        }]
      }
    })
    //  历史项目
    .state('typesetting.historicalProject',{
      url:'/historicalproject',
      templateUrl:'designer/dataRoom/D_historicalProject.html',
      controller:'historicalProjectCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerProject/dataRoom/historicalProjectCtrl.js','../js/public/bigImg.js'])
        }]
      }
    })
  //  设计师大大结束

    //  项目经理大大
    //  项目经理 刚进来
    .state('typesetting.managerAll',{
      url:'/managerall',
      templateUrl:'manager/home/home.html',
      controller:'managerHomeCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/manager/home/managerHomeCtrl.js','../js/public/time.js',"../js/public/homeTabs.js"])
        }]
      }
    })
    .state('typesetting.homeDesignerHome',{
      url:'/homedesignerhome/:id',
      templateUrl:'manager/home/home_designerHome.html',
      controller:'homeDesignerHomeCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/manager/home/homeDesignerHomeCtrl.js'])
        }]
      }
    })
    //上部导航
    //项目总览
    .state('typesetting.projectInto',{
      url:'/projectinto',
      templateUrl:'manager/project_into.html',
      controller:'projectIntoCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/manager/projectIntoCtrl.js')
        }]
      }
    })
    //报价
    .state('typesetting.managerQuotes',{
      url:'/managerquotes',
      templateUrl:'manager/projectManagement/quotes/managerQuotes.html',
      controller:'managerQuotesCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/manager/projectManagement/quotes/managerQuotes.js')
        }]
      }
    })
    .state('typesetting.mQuotesView',{
      url:'/mQuotesView/:id',
      templateUrl:'manager/projectManagement/quotes/m_quotesView.html',
      controller:'mQuotesView',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/manager/projectManagement/quotes/mQuotesView.js','../js/public/bigImg.js','../js/manager/managerDirective.js','../js/public/animation.js'])
        }]
      }
    })
    .state('typesetting.mQuotesViewSave',{
      url:'/mquotesviewsave/:id',
      templateUrl:'manager/projectManagement/quotes/m_quotesViewSave.html',
      controller:'mQuotesViewSaveCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/manager/projectManagement/quotes/mQuotesViewSaveCtrl.js','../js/public/bigImg.js','../js/public/excel.js'])
        }]
      }
    })
    //下单
    .state('typesetting.managerProduction',{
      url:'/managerproduction',
      templateUrl:'manager/projectManagement/Production/managerProduction.html',
      controller:'managerProductionCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/manager/projectManagement/Production/managerProduction.js')
        }]
      }
    })
    .state('typesetting.mProductionView',{
      url:'/mproductionview/:id',
      templateUrl:'manager/projectManagement/Production/m_ProductionView.html',
      controller:'mProductionViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/manager/projectManagement/Production/m_ProductionViewCtrl.js','../js/manager/managerAlert.js','../js/public/bigImg.js'])
        }]
      }
    })
    .state('typesetting.mProductNotices',{
      url:'/mproductnotices/:id',
      templateUrl:'manager/projectManagement/Production/m_ProductNotices.html',
      controller:'mProductNoticesCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/manager/projectManagement/Production/m_ProductNotices.js','../js/manager/managerAlert.js','../js/public/bigImg.js','../js/manager/projectManagement/Production/richTextModel.js'])
        }]
      }
    })
    //进度
    .state('typesetting.managerSchedule',{
      url:'/managerschedule',
      templateUrl:'manager/projectManagement/schedule/managerSchedule.html',
      controller:'managerScheduleCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/manager/projectManagement/schedule/managerSchedule.js')
        }]
      }
    })
    .state('typesetting.managerScheduleView',{
      url:'/managerscheduleview/:id',
      templateUrl:'manager/projectManagement/schedule/managerScheduleView.html',
      controller:'managerScheduleViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/manager/projectManagement/schedule/managerScheduleViewCtrl.js','../js/echarts.js','../js/public/bigImg.js','../js/public/excel.js','../js/manager/managerAlert.js'])
        }]
      }
    })
    //交货
    .state('typesetting.managerDelivery',{
      url:'/managerdelivery',
      templateUrl:'manager/projectManagement/delivery/managerDelivery.html',
      controller:'managerDeliveryCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/manager/projectManagement/delivery/managerDelivery.js'])
        }]
      }
    })
    //项目档案
    .state('typesetting.managerProjectFile',{
      url:'/managerprojectfile',
      templateUrl:'manager/projectManagement/projectFile/managerProjectFile.html'
      // controller:'managerProjectFileCtrl'
    })
    //设计师服务
    .state('typesetting.designerServices',{
      url:'/designerservices',
      templateUrl:'manager/designerServices/designerServices.html'
      // controller:'designerServicesCtrl'
    })
    //工厂服务
    .state('typesetting.factoryService',{
      url:'/factoryservice',
      templateUrl:'manager/factoryService/factoryService.html'
      // controller:'factoryServiceCtrl'
    })
    //知识库
    .state('typesetting.knowledgeBase',{
      url:'/knowledgebase',
      templateUrl:'manager/knowledgeBase/knowledgeBase.html'
      // controller:'knowledgeBaseCtrl'
    })
    //运营中心
    .state('typesetting.operationsCenter',{
      url:'/operationscenter',
      templateUrl:'manager/operationsCenter/operationsCenter.html'
      // controller:'operationsCenterCtrl'
    })
    //  项目经理大大结束

  //总经理大大开始
    //  BOSS 刚进来
    .state('typesetting.bossAll',{
      url:'/bossall',
      templateUrl:'boss/bossAll.html',
      controller:'bossAllCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/bossAllCtrl.js',"../js/public/time.js", "../js/public/homeTabs.js"])
        }]
      }
    })
  //  人员管理
  //  项目经理
    .state('typesetting.bProjectManager',{
      url:'/bprojectmanager',
      templateUrl:'boss/Person/projectManager/b_projectManager.html',
      controller:'bProjectManagerCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/Person/projectManager/b_projectManagerCtrl.js','../js/boss/alert.js'])
        }]
      }
    })
    .state('typesetting.bSeeManagerProject',{
      url:'/bseemanagerproject/:id',
      templateUrl:'boss/Person/projectManager/b_seeManagerProject.html',
      controller:'bSeeManagerProjectCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/Person/projectManager/b_seeManagerProject.js','../js/boss/alert.js'])
        }]
      }
    })
    //  设计师之家
    .state('typesetting.bDesignerHome',{
      url:'/bdesignerhome',
      templateUrl:'boss/Person/designerHome/b_designerHome.html',
      controller:'bDesignerHomeCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/Person/designerHome/b_bDesignerHomeCtrl.js','../js/boss/alert.js'])
        }]
      }
    })
    .state('typesetting.bSeeDesigner',{
      url:'/bseedesigner/:id',
      templateUrl:'boss/Person/designerHome/b_seeDesigner.html',
      controller:'bSeeDesignerCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/Person/designerHome/b_bSeeDesignerCtrl.js','../js/boss/alert.js'])
        }]
      }
    })
    .state('typesetting.bSeeDesignerPrjtList',{
      url:'/bseedesignerprjtlist/:id',
      templateUrl:'boss/Person/designerHome/b_seeDesignerPrjtList.html',
      controller:'bSeeDesignerPrjtListCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/Person/designerHome/b_bSeeDesignerPrjtListCtrl.js','../js/boss/alert.js'])
        }]
      }
    })
    // 工厂
    .state('typesetting.bFactory',{
      url:'/bfactory',
      templateUrl:'boss/Person/factory/b_factory.html',
      controller:'bFactoryCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/Person/factory/b_factory.js','../js/boss/alert.js'])
        }]
      }
    })
    .state('typesetting.bFactoryPrjtList',{
      url:'/bfactoryprjtlist/:id',
      templateUrl:'boss/Person/factory/b_FactoryPrjtList.html',
      controller:'bFactoryPrjtListCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/Person/factory/b_FactoryPrjtListCtrl.js','../js/boss/alert.js'])
        }]
      }
    })

     // 数据管理
    //项目类别
    .state('typesetting.dataItemCategory',{
      url:'/dataitemcategory',
      templateUrl:'boss/dataManager/dataItemCategory.html',
      controller:'dataItemCategoryCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/dataManager/dataItemCategory.js'])
        }]
      }
    })
              //项目类别——户型
              .state('typesetting.dataHuXing',{
                url:'/datahuxing',
                templateUrl:'boss/dataManager/dataHuXingCtrl.html',
                controller:'dataHuXingCtrl',
                resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(['../js/boss/dataManager/dataHuXingCtrl.js','../js/boss/dataManager/bossData.js'])
                  }]
                }
              })
              //项目类别——区域名称
              .state('typesetting.dataRoomName',{
                url:'/dataroomname',
                templateUrl:'boss/dataManager/dataRoomName.html',
                controller:'dataRoomNameCtrl',
                resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(['../js/boss/dataManager/dataRoomNameCtrl.js','../js/boss/dataManager/bossData.js'])
                  }]
                }
              })
    //构成类别
    .state('typesetting.dataConstituteCategory',{
      url:'/dataconstitutecategory',
      templateUrl:'boss/dataManager/dataConstituteCategory.html',
      controller:'dataConstituteCategoryCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/dataManager/dataConstituteCategory.js'])
        }]
      }
    })
              // 构成类别——工艺
                .state('typesetting.dataConstitute_Process',{
                  url:'/dataconstitute_process',
                  templateUrl:'boss/dataManager/dataConstitute_Process.html',
                  controller:'dataConstitute_ProcessCtrl',
                  resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                      return $ocLazyLoad.load(['../js/boss/dataManager/dataConstitute_ProcessCtrl.js','../js/boss/dataManager/bossData.js'])
                    }]
                  }
                })
                           // 构成类别——工艺类别数据
                           .state('typesetting.dataConstitute_ProcessData',{
                             url:'/dataconstitute_processdata/:name',
                             templateUrl:'boss/dataManager/dataConstitute_ProcessData.html',
                             controller:'dataConstitute_ProcessDataCtrl',
                             resolve: {
                               loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                                 return $ocLazyLoad.load(['../js/boss/dataManager/dataConstitute_ProcessDataCtrl.js','../js/boss/dataManager/bossData.js'])
                               }]
                             }
                           })
                // 构成类别——工序
                .state('typesetting.dataConstitute_GongXu',{
                  url:'/dataconstitute_gongxu',
                  templateUrl:'boss/dataManager/dataConstitute_GongXu.html',
                  controller:'dataConstitute_GongXuCtrl',
                  resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                      return $ocLazyLoad.load(['../js/boss/dataManager/dataConstitute_GongXuCtrl.js','../js/boss/dataManager/bossData.js'])
                    }]
                  }
                })
    //主材
    .state('typesetting.dataMainMaterial',{
      url:'/datamainmaterial',
      templateUrl:'boss/dataManager/dataMainMaterial.html',
      controller:'dataMainMaterialCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/dataManager/dataMainMaterial.js','../js/boss/dataManager/bossData.js'])
        }]
      }
    })
    //板材
    .state('typesetting.dataPlate',{
      url:'/dataplate',
      templateUrl:'boss/dataManager/dataPlate.html',
      controller:'dataPlateCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/dataManager/dataPlate.js','../js/boss/dataManager/bossData.js'])
        }]
      }
    })
    //国产品牌
    .state('typesetting.dataDomesticBrand',{
      url:'/datadomesticbrand',
      templateUrl:'boss/dataManager/dataDomesticBrand.html',
      controller:'dataDomesticBrandCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/dataManager/dataDomesticBrand.js','../js/boss/dataManager/bossData.js'])
        }]
      }
    })
    //进口品牌
    .state('typesetting.dataImportedBrand',{
      url:'/dataimportedbrand',
      templateUrl:'boss/dataManager/dataImportedBrand.html',
      controller:'dataImportedBrandCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/dataManager/dataImportedBrand.js','../js/boss/dataManager/bossData.js'])
        }]
      }
    })
    //涂装品牌
    .state('typesetting.dataPaintingBrand',{
      url:'/datapaintingbrand',
      templateUrl:'boss/dataManager/dataPaintingBrand.html',
      controller:'dataPaintingBrandCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/dataManager/dataPaintingBrand.js','../js/boss/dataManager/bossData.js'])
        }]
      }
    })
    //胶水品牌
    .state('typesetting.dataGlueBrand',{
      url:'/datagluebrand',
      templateUrl:'boss/dataManager/dataGlueBrand.html',
      controller:'dataGlueBrandCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/boss/dataManager/dataGlueBrand.js','../js/boss/dataManager/bossData.js'])
        }]
      }
    })


  //总经理大大结束

//  工厂大大开始
    //  工厂刚进来
    .state('typesetting.factoryAll',{
      url:'/factoryall',
      templateUrl:'factory/factoryAll.html',
      controller:'factoryAllCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/factory/factoryAllCtrl.js',"../js/public/time.js", "../js/public/homeTabs.js"])
        }]
      }
    })
   //    查看所有项目
    .state('typesetting.fProjectOverView',{
      url:'/fprojectoverview',
      templateUrl:'factory/f_projectOverView.html',
      controller:'fProjectOverViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/factory/f_ProjectOverView.js'])
        }]
      }
    })
   //  项目管理
      //    进度
    .state('typesetting.fSchedule',{
      url:'/fschedule',
      templateUrl:'factory/projectManagement/f_schedule/f_schedule.html',
      controller:'fScheduleCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/factory/f_schedule/f_Schedule.js'])
        }]
      }
    })
    .state('typesetting.fScheduleView',{
      url:'/fscheduleview/:id',
      templateUrl:'factory/projectManagement/f_schedule/f_scheduleView.html',
      controller:'fScheduleViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/factory/f_schedule/f_ScheduleView.js','../js/public/bigImg.js'])
        }]
      }
    })
    .state('typesetting.fNotices',{
      url:'/fnotices/:id',
      templateUrl:'factory/projectManagement/f_schedule/f_Notices.html',
      controller:'fNoticesViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/factory/f_schedule/f_NoticesCtrl.js','../js/public/bigImg.js'])
        }]
      }
    })
    //    交付
    .state('typesetting.fDeliver',{
      url:'/fdeliver',
      templateUrl:'factory/projectManagement/f_deliver/f_deliver.html',
      controller:'fDeliverViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/factory/f_deliver/f_Deliver.js')
        }]
      }
    })
//  工厂大大结束

    //  设计师之家路由开始
    //设计师刚进来
    .state('typesetting.designHomeBoss',{
      url:'/designhomeboss',
      templateUrl:'designerHome/Home/designHomeBoss.html',
      controller:'designHomeBossCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load(['../js/designerHome/designHomeBossCtrl.js','../js/public/time.js',"../js/public/homeTabs.js"])
        }]
      }
    })
    //人员管理-查看设计师
    .state('typesetting.D_Home_designer',{
      url:'/dHomeDesigner',
      templateUrl:'designerHome/designer/D_Home_designer.html',
      controller:'D_Home_designerCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerHome/designer/D_Home_designerCtrl.js')
        }]
      }
    })
    //  查看设计师项目
    .state('typesetting.DH_designerProject',{
      url:'/dHomeDesigner/:id',
      templateUrl:'designerHome/designer/DH_designerProject.html',
      controller:'DH_designerProjectCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/designerHome/designer/DH_designerProjectCtrl.js')
        }]
      }
    })


    //  设计师之家路由结束
    //基本路由
    .state('typesetting',{
      url:'/typesetting',
      views:{
        '':{
          templateUrl:"navTop/typesetting.html",
          controller:'typesettingCtrl',
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load('../js/typesettingCtrl.js')
            }]
          }
        },
        'top@typesetting':{
          templateUrl:'navTop/top.html',
          controller:'topCtrl',
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load('../js/topCtrl.js')
            }]
          }
        },
        'new@typesetting':{
          templateUrl:'navTop/news.html',
          controller:'newsCtrl',
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load('../js/public/newsCtrl.js')
            }]
          }
        },
        // 'newsList@typesetting.newsListView':{
        //   templateUrl:'public/newsRightListView.html',
        //   controller:'newsRightListViewCtrl',
        //   resolve: {
        //     loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
        //       return $ocLazyLoad.load(['../js/public/newsListViewCtrl.js','../js/public/newsRightListViewCtrl.js'])
        //     }]
        //   }
        // },
        'nav@typesetting':{
          templateUrl:'navTop/nav.html'
        }
      }
    })
    //修改个人信息
    .state('typesetting.changeInfo',{
      url:'/changeinfo',
      templateUrl:'public/changeInfo.html',
      controller:'changeInfoCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/public/changeInfo.js')
        }]
      }
    })
    //对手机号进行操作
    .state('typesetting.infoChangePhone',{
      url:'/infochangephone',
      templateUrl:'public/infoChangePhone.html',
      controller:'infoChangePhoneCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/public/infoChangePhoneCtrl.js')
        }]
      }
    })
    //对密码进行操作
    .state('typesetting.infoChangePsd',{
      url:'/infochangepsd',
      templateUrl:'public/infoChangePsd.html',
      controller:'infoChangePsdCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/public/infoChangePsdCtrl.js')
        }]
      }
    })

  //消息列表
    .state('typesetting.newsListView',{
    url:'/newslistview/:num/:id',
    templateUrl:'public/newsListView.html',
    controller:'newsListViewCtrl',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
        return $ocLazyLoad.load('../js/public/newsListViewCtrl.js')
      }]
    }
  })
    .state('typesetting.newsListView.newsRightView',{
        url:'/newsrightview',
        templateUrl:'public/newsRightListView.html',
        controller:'newsRightListViewCtrl',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
            return $ocLazyLoad.load('../js/public/newsRightListViewCtrl.js')
          }]
        }
      })
    .state('typesetting.newsListView.onlyOneNews',{
      url:'/onlyonenews/:data',
      templateUrl:'public/onlyOneNews.html',
      controller:'onlyOneNewsCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/public/onlyOneNewsCtrl.js')
        }]
      }
    })
    //项目介绍
    .state('typesetting.Description',{
      url:'/description/',
      templateUrl:'Description/Description.html',
      controller:'DescriptionCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/Description/DescriptionCtrl.js')
        }]
      }
    })
    //项目介绍右边页面
    .state('typesetting.Description.DescriptionRightView',{
      url:'/descriptionrightview/',
      templateUrl:'Description/DescriptionRightView.html',
      controller:'DescriptionRightViewCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/Description/DescriptionRightViewCtrl.js')
        }]
      }
    })
    //查看单个问题
    .state('typesetting.Description.onlyOneDescriptionCtrl',{
      url:'/onlyonedescriptionctrl/:name',
      templateUrl:'Description/onlyOneDescription.html',
      controller:'onlyOneDescriptionCtrl',
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('../js/Description/onlyOneDescriptionCtrl.js')
        }]
      }
    });

});

//nav遍历和topNav数据
myApp.controller('myCtrl',function($state,$scope,$http,$rootScope,$ocLazyLoad,locals){
  $scope.topUser = id;
  var user = {
    'user':locals.get('loginId')
  };
  $http({
    url: managerZ +'wishome-web/rest/menu',
    method:'GET',
    params:user,
    dataType:"json",
    contentType:"application/json"
  }).success(function(data){
    function transData(a, idStr, pidStr, chindrenStr){
      var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
      for(; i < len; i++){
        hash[a[i][id]] = a[i];
      }
      for(; j < len; j++){
        var aVal = a[j], hashVP = hash[aVal[pid]];
        if(hashVP){
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
        }else{
          r.push(aVal);
        }
      }
      return r;
    }
    console.log(data);
    var jsonData = eval(data.jsonData);
    tree =	transData(jsonData, 'id', 'parentid', 'chindren');
    $scope.items = tree;
    $scope.topList = data.OnMenu;
    if(data.image === null){
      data.image = "../images/projectList/wishome.png";
    }
    $scope.data = data;
    $rootScope.id = data.id;
    $scope.rootId = data.id;
    locals.set("id",data.id);
    locals.set("deptId",data.deptId);
    locals.set("trueUserName",data.user);
    locals.setObject("navData",$scope.items);
    $rootScope.deptId = data.deptId;
  });
  $rootScope.Identity = Identity;
  $scope.newsNum = null;
  $scope.$on('dataChanged', function(event, data){
    $scope.newsNum = data;
    // 2. 父 Ctrl 监听到 dataChanged 时间后，触发 changeData 事件
    $scope.$broadcast('changeData', data);
  })
});

//designer模糊查询
myApp.directive('searchClick',function(){
  return{
    restrict:'EA',
    controller:function($scope,$http){
      $scope.searchClick = function(data){
        var user = {
          'userid':$scope.rootId,
          "prjtname":$scope.keyWords
        };
        $http({
          url: managerY + 'wishome-web/rest/' + data,
          method:'GET',
          params:user
        }).success(function(data){
          $scope.tdList = data.list || data.pm;
          $scope.list = [];
          for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
        });
      };
      $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode===13){
          $scope.askSearch();
        }
      }
    }
  }
});

//boss模糊查询
myApp.directive('bossSearchClick',function(){
  return{
    restrict:'EA',
    controller:function($scope,$http){
      $scope.searchClick = function(data){
        var user = {
          'userid':$scope.rootId,
          "deptName":$scope.keyWords
        };
        $http({
          url:managerY + 'wishome-web/rest/' + data,
          method:'GET',
          params:user
        }).success(function(data){
          $scope.factoryList = data.list;
        });
      };
      $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode===13){
          $scope.askSearch();
        }
      }
    }
  }
});

//factory模糊查询
myApp.directive('factorySearchClick',function(){
  return{
    restrict:'EA',
    controller:function($scope,$http,$rootScope){
      $scope.searchClick = function(data){
        if($("#projectStatus option:selected").html() === '所有项目状态'){
          $("#projectStatus option:selected").html("")
        }
        var user = {
          'deptId': $rootScope.deptId,
          "prjtname":$scope.keyWords,
          'prjtstate': $("#projectStatus option:selected").html()
        };
        $http({
          url:managerY + 'wishome-web/rest/' + data,
          method:'GET',
          params:user
        }).success(function(item){
          $scope.prompt = item.list;
          $scope.tdList = item.newList;
          var len = $scope.tdList.length;
          var lens = $scope.prompt.length;
          $scope.list = [];
          if(len === 0){
            for(var p = 0;p<lens;p++){
              if($scope.prompt[p].prjtstate === "询价"){
                $scope.prompt[p].prjtsum = "--"
              }else if($scope.prompt[p].prjtstate === "询价结束"){
              }
            }
            for(var i=1;i<=Math.ceil($scope.prompt.length/$scope.pageCount);$scope.list.push(i++));
            return false;
          }else if(lens === 0){
            for(var e = 0;e<len;e++){
              if($scope.tdList[e].prjtstate === "询价"){
                $scope.tdList[e].prjtsum = "--"
              }else if($scope.tdList[e].prjtstate === "询价结束"){
              }
            }
            for(var i=1;i<=Math.ceil($scope.tdList.length/$scope.pageCount);$scope.list.push(i++));
          }

        });
      };
      $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode===13){
          $scope.askSearch();
        }
      }
    }
  }
});

//分页
myApp.directive('page',function(){
  return {
    restrict:'E',
    replace:true,
    templateUrl:'navTop/pagination.html',
    controller:function($scope,$filter){
      $scope.pageIndex = 1;
      $scope.pageCount = 5;
      $scope.listCount = 4;
      $scope.pageTo = function(n){
        if(n === "previous"){
          $scope.pageIndex!==1 && $scope.pageIndex--;
        }else if(n === "next"){
          $scope.pageIndex !== $scope.list.length&&$scope.pageIndex++;
        }else{
          $scope.pageIndex = n;
        }
      };
      $scope.updateList = function(count){
        var output = $filter('filter')($scope.tdList,$scope.keyWords);
        var n = Math.ceil(output.length/count);
        $scope.list = [];
        for(var i=1;i<=n;$scope.list.push(i++));
        $scope.pageIndex = 1;
      };
      $scope.pageShow = function(item){
        if(item <= 5){
          $scope.page = false;
        }else{
          $scope.page = true;
          $scope.list = [];
          for(var i=1;i<=Math.ceil(item/$scope.pageCount);$scope.list.push(i++));
        }
      }
    }
  };
});

myApp.filter('listFilter',function(){
  return function(input,count,index){
    var n = Math.floor((index-1)/count);
    if(!input)return [];
    return input.slice(count*n,count*(n+1));
  };
});

myApp.filter('pageFilter',function(){
  return function(input,count,index){
    if(!input)return [];
    return input.slice(count*(index-1),count*index);
  };
});

//弹框
myApp.directive('alertShowModel',function(){
  return {
    restrict:'EA',
    replace:true,
    templateUrl:'designer/model.html',
    controller:function($scope){
      $scope.divHide = function(){
        $scope.alertModel = false;
        $scope.delImgBox = false;
      };
      $scope.cancelAsk = function(){
        $scope.alertModel = false;
        $scope.delImgBox = false;
      };
    }
  };
});

//本地存储
myApp.factory('locals',function($window){
  return{
    set:function(key,value){
      $window.localStorage[key] = value;
    },
    get:function(key,defaultValue){
      return  $window.localStorage[key] || defaultValue;
    },
    setObject:function(key,value){
      $window.localStorage[key]=JSON.stringify(value);
    },
    getObject:function(key){
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
});

// myApp.factory('instance', function(){
//   return true;
// });
