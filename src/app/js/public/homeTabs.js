/**
 * Created by ASUS on 2017/10/13.
 */

myApp.directive('homeTabs',function(){
  return{
    restrict:'E',
    replace:true,
    templateUrl:'public/homeTabs.html',
    scope : {
      grId : '@',
      grData : '=' //拿所有grData属性的变量名
    },
    controller:function($scope){
    },
    link:function(scope,ele,attr){
      ele.delegate('a','click',function(){
        $(this).addClass('first').siblings('a').removeClass('first');
        $(this).siblings('div').eq($(this).index()).css('display','block').siblings('div').css('display','none')
      })
    }
  }
});
