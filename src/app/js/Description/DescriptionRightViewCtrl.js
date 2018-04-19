myApp.controller('DescriptionRightViewCtrl',function($scope,$state){
  console.log($scope);

  //查看问题
  $scope.seeOneNews = function(item,index){
    console.log(item);
    var str = item.$parent.$parent.newsName[index].problemName;
    var problemName = str.substr(0,str.length-1);
    var name = item.$parent.$parent.headerNews + '/' + problemName;
    $state.go('typesetting.Description.onlyOneDescriptionCtrl',{name: name});
  };
});
