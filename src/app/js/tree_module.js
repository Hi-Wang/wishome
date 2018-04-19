var myApp = angular.module('treeApp',['treeApp','oc.lazyLoad','ui.router','ui.bootstrap','ui.sortable','selectAddress','oc.lazyLoad']);
myApp.directive('menuTree',function(){
	return {
		restrict:'E',
		replace:true,
		templateUrl:'navTop/treeMenu.html',
		scope:{
      data:'='
    },
		controller:function($scope,$rootScope,$state,locals){
		  $scope.liStyle = true;
		  $scope.items = [];
      console.log(locals.getObject('navData'));
      var navData = locals.getObject('navData');
		  var len = navData.length;
		  for(var l=0;l<len;l++){
		    $scope.items.push({'name': navData[l].name,'chindren':navData[l].chindren})
      }
      for(var i=0;i<$scope.items.length;i++){
		    if($scope.items[i].chindren === undefined){

        }
      }
      $scope.isShowLi = function(item,index){
        var thisIndex = $(".hideUL").eq(index);
        var trueIcon = $(".trueIcon").eq(index);
        var falseIcon = $(".falseIcon").eq(index);
        if(thisIndex.css('display') === 'none'){
          thisIndex.slideDown();
          trueIcon.hide();
          falseIcon.show();
          $(".hideUL").not(thisIndex).slideUp();
          $(".trueIcon").not(trueIcon).show();
          $(".falseIcon").not(falseIcon).hide();
          return false
        }else if(thisIndex.css('display')){
          thisIndex.slideUp();
          trueIcon.show();
          falseIcon.hide();
        }
      };

      $scope.changeStyle = function(data,index,item,items){
        var u = 0;
        var name = item.name;
        for(var i=0;i<items.length;i++){
          if(items[i].name === name){
            u = i;
            // return u
          }
        }
        var thisIndex;
        for(var s=0;s<u;s++){
          var f = items[s].chindren.length;
          thisIndex = $(".UrlA").eq(f + index);
          thisIndex.css('background','#00c2de');
          $(".UrlA").not(thisIndex).css("background","none");
          return false;
        }
        if(u === 0){
          thisIndex = $(".UrlA").eq(index);
          thisIndex.css('background','#00c2de');
          $(".UrlA").not(thisIndex).css("background","none");
          return false
        }else{
          thisIndex = $(".UrlA").eq(f + index);
          thisIndex.css('background','#00c2de');
          $(".UrlA").not(thisIndex).css("background","none");
        }
        return false
     }

     $scope.Description = function(){
        console.log($rootScope);
       if($rootScope.Identity === "设计师"){
         $state.go('typesetting.Description.DescriptionRightView')
       }else if($rootScope.Identity === "未认证设计师"){
         $state.go('typesetting.Description.DescriptionRightView')
       }else if($rootScope.Identity === "项目经理"){
         $state.go('typesetting.Description.DescriptionRightView')
       }else if($rootScope.Identity === "工厂管理员"){
         $state.go('typesetting.Description.DescriptionRightView')
       }else if($rootScope.Identity === "设计师之家管理员"){
         $state.go('typesetting.Description.DescriptionRightView')
       }else if($rootScope.Identity === "管理员"){
         $state.go('typesetting.Description.DescriptionRightView')
       }
     }
		}
	};
});

