/**
 * Created by ASUS on 2017/10/13.
 */
myApp.directive('showTime',function(){
  return{
    restrict:'EA',
    controller:function($scope){
//  关于时间
      var now1 = new Date();
      $scope.day = now1.getDay();
      $scope.showDay =  "星期" + "日一二三四五六".charAt($scope.day);
      var h = now1.getHours();
      var m = now1.getMinutes();
      var s = now1.getSeconds();
      if(h<10){
        $scope.newH = '0' + h;
      }else if(h>=10){
        $scope.newH = h;
      }
      if(m<10){
        $scope.newM = '0' + m;
      }else if(m>=10){
        $scope.newM = m;
      }
      if(s<10){
        $scope.newH = '0' + s;
      }else if(s>=10){
        $scope.newS = s;
      }
      $scope.Now=$scope.newH+':'+$scope.newM+':'+$scope.newS;
      $scope.date = now1.toLocaleDateString();
      //写一个方法获取当前时间
      $scope.SetTimer=function(){
        $scope.$apply(function(){
          var now=new Date();
          var h1 = now.getHours();
          var m1 = now.getMinutes();
          var s1 = now.getSeconds();
          if(h1<10){
            $scope.newH = '0' + h1;
          }else if(h1>=10){
            $scope.newH = h1;
          }
          if(m1<10){
            $scope.newM = '0' + m1;
          }else if(m1>=10){
            $scope.newM = m1;
          }
          if(s1<10){
            $scope.newS = '0' + s1;
          }else if(s1>=10){
            $scope.newS = s1;
          }
          $scope.Now=$scope.newH+':'+ $scope.newM +':'+ $scope.newS;
        });
      };
      //每隔1秒刷新一次时间
      $scope.SetTimerInterval=setInterval($scope.SetTimer,1000);
    }
  }
});
