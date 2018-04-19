/**
 * Created by ASUS on 2017/11/3.
 */
//自定义图片编辑
myApp.directive('drawImage',function(){
  return{
    restrict:'EA',
    templateUrl:'designer/D_projectManagement/getProject/editImgModel.html',
    replace:true,
    controller:function($scope,$http,$timeout){
      //  推按编辑
      $scope.size='medium';
      $scope.type='square';
      $scope.imageDataURI='';
      $scope.resImageDataURI='';
      $scope.resImgFormat='image/png';
      $scope.resImgQuality = 2;
      $scope.selMinSize=100;
      $scope.resImgSize=300;
      $scope.onChange=function($dataURI) {

      };
      $scope.onLoadBegin=function() {
      };
      $scope.onLoadDone=function() {
      };
      $scope.onLoadError=function() {
      };
      $scope.getBlobBydataURL = function(dataURI,type){
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type:type });
      };

      $scope.onSaveChangeImg = function($dataURI,item){
        var loadingShowText = "正在编辑图片中...";
        $scope.loaddingShow(loadingShowText);
        // var Blob = $scope.getBlobBydataURL($dataURI,"image/png");
        // $scope.editFile = Blob;
        function convertBase64UrlToBlob($dataURI){
          var bytes=window.atob($dataURI.split(',')[1]);        //去掉url的头，并转换为byte
          //处理异常,将ascii码小于0的转换为大于0
          var ab = new ArrayBuffer(bytes.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
          }
          return new Blob( [ab] , {type : 'image/png'});
        }
        var form=document.forms[0];
        var formData = new FormData(form);

        formData.append("file",convertBase64UrlToBlob($dataURI));
        $http({
          method:'POST',
          url: designerY + 'wishome-web/rest/filePhoto',
          data: formData,
          headers:{'Content-Type':undefined},
          transformRequest:angular.identity
        }).success(function(data){
          var loadingShowText = "图片编辑成功！";
          $scope.loaddingShow(loadingShowText);

          $timeout(function(){
            $scope.loaddingHide();
            $scope.editImgTrue = 1;
            $scope.imgList[$scope.imgIndex].base = data.url[0];
            $scope.detailsurl =  $scope.imgList[$scope.imgIndex].base;
            $scope.editImgModelHide();
          },1000)
        });
      };
      $scope.$watch('resImageDataURI',function(){
      });
              $scope.editImgModelHide = function(){
                $scope.editImgModel = false;
              };
              $scope.editImgCancel = function(data){
                data.editImgModel = false;
              };
    }//link END
  }//return END
});

//自定义图片上传指令
myApp.directive('loadFile',function(readFiles){
  return {
    restrict:'A',
    controller:function($scope){
      $scope.imgDD = [];
      $("#fileChange").change(function(){
        var promise = readFiles.getData(this.files);
        $scope.imgDD = new FormData();
        for(var a=0;a<this.files.length;a++){
          $scope.imgDD.append('file',this.files[a]);
        }
        promise.then(function(value){
          $("#noImg").hide();
          $("#imgBox").show();
          if($scope.imgList === undefined){
            $scope.imgList = value;

            $scope.detailsurl =  $scope.imgList[0].base;
          }else{
            for(var i=0;i<value.length;i++){
              $scope.imgList.push(value[i]);
            }
            // $scope.flies = promise.value;
            $scope.detailsurl =  $scope.imgList[0].base;
          }
          // $scope.flies = promise.value;
        });
      });

      $scope.getImg = function(value){
        $scope.imgList = [];
        for(var i=0;i<value.length;i++){
          $scope.imgList.push(value[i]);
        }
        $("#noImg").hide();
        $("#imgBox").show();
        $scope.detailsurl =  $scope.imgList[0].base;
      };
    },
    link:function(scope,ele,attr){
      scope.imgData = [];
      ele.bind('change',function(){
        // var promise = readFiles.getData(this.files);
        // promise.then(function(value){
        //   $("#noImg").hide();
        //   $("#imgBox").show();
        //   if(scope.imgList === undefined){
        //     scope.imgList = value;
        //     scope.detailsurl =  scope.imgList[0].base;
        //   }else{
        //     for(var i=0;i<value.length;i++){
        //       scope.imgList.push(value[i]);
        //     }
        //     scope.detailsurl =  scope.imgList[0].base;
        //   }
        //   scope.flies = promise.value;
        // },function(value){
        //   alert(value);
        // });
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

myApp.directive("dAlert",function(){
  return {
    restrict: 'EA',
    templateUrl: 'designer/model.html',
    replace: true,
    controller:function($scope){
      $scope.divHide = function(){
        $scope.errorAlert = false;
      };
      $scope.cancelAsk = function(){
        $scope.divHide();
      };
      $scope.delImg = function(){
        $scope.errorAlert = true;
        $scope.header = true;
        $scope.footer = true;
        $scope.prjtP = true;
        $scope.prjtText = "您确定要删除这张图片吗？";
      };
      $scope.againAsk = function(item){
        var index = item.imgIndex,detailsid = item.imgInfo.detailsid;

      }
    }
  }
});

//弹框
myApp.directive('askEnd',function(){
  return {
    restrict:'EA',
    replace:true,
    templateUrl:'designer/model.html',
    controller:function($scope,$http,$state,locals){
      $scope.divHide = function(){
        $scope.alertModel = false;
        $scope.delImgBox = false;
      };
      $scope.cancelAsk = function(){
        $scope.alertModel = false;
        $scope.delImgBox = false;
      };
      $scope.againAsk = function(data){
        var id = {
          'prjtid':data.PrjtList.prjtid
        };
        var prjtid = {
          'prjtId':data.PrjtList.prjtid
        };
        // 签约
        if(data.text === "立即签约"){
          $http({
            url:yang + 'wishome-web/rest/updSigState',
            method:"GET",
            params:id
          }).success(function(){
            $(".UrlA").eq(2).css('background','#00c2de');
            $(".UrlA").not($(".UrlA").eq(2)).css("background","none");
            $state.go('typesetting.Signed')
          });
          return false;
        }
        //再次询价
        else if($scope.text === "再次询价"){
          $http({
            url:yang + 'wishome-web/rest/State',
            method:"GET",
            params:id
          }).success(function(){
            $state.go('typesetting.dAskPrice')
          });
          return false;
        }else if(data.text === "修改项目产品"){
          $http({
            url: designerZ + 'wishome-web/rest/upOverQuate',
            method:"GET",
            params: prjtid
          }).success(function(item){
            locals.set('designerDownName',"立项");
            locals.set('designerPrjtId',item.prjtId);
            $state.go("typesetting.preSale")
          })
        }
      };
    }
  };
});

//askPriceModel--directive询价弹框
myApp.directive('askPrice',function(){
  return{
    restrict:'EA',
    templateUrl:'designer/D_projectManagement/getProject/askPriceModel.html',
    replace:true,
    controller:function($scope){
      $scope.showAskModel = function(){
        $("#askShow").slideDown(300);
      };
      $scope.removeAskModel = function(){
        // scope.askShow = false;
        $("#askShow").slideUp(300);
      };
    },
    link:function(scope,ele,attr){
      //点击遮罩层fullDiv
      // scope.alert();
      scope.p = '上海';
      scope.c = '浦东新区';
      scope.a = '';
      return scope.d = '';
    }
  }
});

//询价提示弹框
myApp.directive('designerModel',function(){
  return{
    restrict:'EA',
    templateUrl:'designer/model.html',
    replace:true,
    controller:function($scope){
      $scope.show = function(){
        $scope.footer = false;
        $scope.ask = true;
        $scope.text = "询价成功";
        $scope.alertText = "已将该项目交给项目经理不报价，请耐心等待。即将跳转询价项目列表。";
        $(".UrlA").eq(1).css('background','#00c2de');
        $(".UrlA").not($(".UrlA").eq(1)).css("background","none");
        $("#successModel").slideDown(1000);
      };
      $scope.divHide = function(){
        $("#successModel").slideUp();
      };
      $scope.cancelAsk = function(){
        $scope.divHide();
      }
    }
  }
});

//未认证设计师
myApp.directive('falseUserModel',function(){
  return{
    restrict:'EA',
    templateUrl:'designer/model.html',
    replace:true,
    controller:function($scope,$state){
      $scope.showFalseUserModel = function(loginId){
        $scope.header = true;
        $scope.prjtP = true;
        $scope.prjtText = loginId + ",你好";
        $scope.alertText = "请完成认证设计师，体验更多的功能与服务。";
        $('#falseUser').show();
      };
      $scope.againAsk = function(){
        $state.go('typesetting.designerAll')
      };
      $scope.cancelAsk = function(){
        $('#falseUser').hide();
      };
      $scope.divHide = function(){
        $('#falseUser').hide();
      };
    }
  }
});


