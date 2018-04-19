/**
 * Created by ASUS on 2017/9/22.
 */
/**
 * Created by ASUS on 2017/8/18.
 */
var myApp = angular.module('myApp',['oc.lazyLoad','ui.router','treeApp','ui.bootstrap','ui.sortable','selectAddress']);
myApp.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/typesetting');
});

//上传图片
//自定义图片上传指令
myApp.directive('loadFile',function(readFiles){
  return {
    restrict:'A',
    controller:function($scope){
      $scope.getImg = function(value){
        $scope.$watch(function(){
          return value
        },function(newValue,oldValue){
          if(newValue!==oldValue)value = newValue;
        });
        var imgList = [];
        if(value.length >4){
          return false
        }else{
          for(var i=0;i<value.length;i++){
            imgList.push(value[i]);
          }
        }
        $scope.imgList = imgList;
        $scope.detailsurl = imgList[0].base
      };
    },
    link:function(scope,ele,attr){
      scope.imgData = [];
      ele.bind('change',function(){
        var promise = readFiles.getData(this.files);
        promise.then(function(value){
          if(value.length > 4){
            alert("请最多选择四张图片");
            return false;
          }else{
            for(var i=0;i<value.length;i++){
              if(value.length === 4){
                scope.addImgBox = false;
              }else if(value.length < 4){
                scope.addImgBox = true;
              }
              scope.imgData.push(value[i]);
              scope.getImg(value);
            }
          }

        },function(value){
          alert(value);
        });
      });
    }
  };
});
myApp.service('readFiles',function($q){
  this.getData = function(arr){
    var res = [];
    for(var i=0;i<arr.length;i++){
      res.push(readFile(arr[i]));
    }
    return $q.all(res);
    function readFile(value){
      var deferred = $q.defer();
      var promise = deferred.promise;
      var reader = new FileReader;
      reader.readAsDataURL(value);
      reader.onload = function(){
        var obj = {};
        obj.base = this.result;
        obj.name = value.name;
        obj.lastModified = value.lastModified;
        obj.size = value.size;
        deferred.resolve(obj);
      };
      reader.onerror = function(){
        deferred.reject(value.name+'读取失败，请重试！');
      };
      return promise;
    }
  };
});
