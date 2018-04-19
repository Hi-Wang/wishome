myApp.service('treeS',function(){
  this.enhance = function(item,price){
    angular.forEach(item,function(v){
      enhanceItem(v,price);
    });
  };
  var enhanceItem = function(n,u){
    n.details = [{name:'皮艺饰面',unit:'(尺)',num:n.leatherFinish,cost:u.inquiryaverageleather,editable:false,readonly:true,otherName:'其他金额',otherNum:n.otherAmount,input:true,row:0,rowShow:true,rowSpan1:true,rowSpan2:false},
      {name:'布艺饰面',unit:'(米)',num:n.fabricFinish,cost:u.inquiryaveragecloth,editable:false,readonly:true,input:false,row:2,rowShow:true,rowSpan1:false,rowSpan2:true,otherNum:0,amountMemo:n.amountMemo},
      {name:'框架金额',num:n.frameAmount,cost:1,editable:false,readonly:false,input:false,row:0,rowShow:false,otherNum:0}];
  };
});

myApp.directive('changeName',function(){
  return{
    restrict:'EA',
    require:'ngModel',
    link:function(scope,ele,attr,ngModel){
      ele.bind('blur',function(){
        scope.$apply(function(){
          var html = ele.html();
          ngModel.$setViewValue(html);
        });
      })
    }
  }
});

myApp.filter('prjtFilter',function(){
  return function(input){
    return input.details.reduce(function(prev,next){
      return prev + next.num*next.cost + next.otherNum;
    },0);
  };
});

myApp.filter('sumFilter',function(){
  return function(input){
    if(!input)return [];
    return input.details.reduce(function(prev,next){
      return prev + next.num*next.cost + next.otherNum;
    },0)*input.detailsnumber;
  };
});

myApp.filter('totalFilter',function(){
  return function(input){
    if(!input)return [];
    return input.reduce(function(p,n){
      return p+n.details.reduce(function(prev,next){
        return prev + next.num*next.cost + next.otherNum ;
      },0)*n.detailsnumber;
    },0);
  };
});

myApp.directive('quotesAlert',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'designer/model.html',
    controller:function($scope,$timeout){
      $scope.showAlert = function(item){
        $scope.header = true;
        $scope.alertText = item;
        $scope.footer = false;
        $scope.M_alertModel = true;
        $timeout(function(){
          $scope.M_alertModel = false;
        },1500)
      };
      $scope.divHide = function(){
        $scope.M_alertModel = false;
      }
    }
  }
});
