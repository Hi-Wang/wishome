/**
 * Created by ASUS on 2017/11/3.
 */
//imageView.html
myApp.controller('imageViewCtrl',function($scope,$http,$stateParams,$state,$rootScope,$timeout,locals){
  var prjtId = locals.get("designerPrjtId");
  var Prjthstp = locals.get("designerPrjthstp");
  var designerDetailsid = locals.get('designerDetailsid');
  var roomName = locals.get('roomName');
  var name = locals.get('designerDownName');
  console.log(name);
  if(name === "项目经理新建"){
    $(".UrlA").eq(5).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(5)).css("background","none");
  }else{
    $(".UrlA").eq(0).css('background','#00c2de');
    $(".UrlA").not($(".UrlA").eq(0)).css("background","none");
  }

  $scope.select = {
    "t1":"请选择框架材质",
    "t2":"请选择框架颜色",
    "t3":"请选择板材材质",
    "t4":"请选择板材颜色"
  };
  var detailsid = {
    'detailsid': designerDetailsid
  };
  var getRegion = {
    "hastCateName": Prjthstp,
    "prjtid": prjtId
  };
  //拿到房间 getRoomList
  $scope.getRoomList = function(item){
    $http({
      url:designerZ + 'wishome-web/rest/queryRegoin',
      method:'POST',
      params:item
    }).success(function(data){
      $scope.PrjtList = data.PrjtList;
      $scope.regoinName = data.list;
      var len = data.list2.length;
      if(len === 0){
        $scope.liShow = true
      }else{
        $scope.liShow = false;
      }
      $scope.list2 = data.list2;
    })
  };
  $scope.getRoomList(getRegion);

  //点击房间
  $scope.setRoom = function(item,index){
    var setRoomName = {
      "prjtid": prjtId,
      "local":item.region.regoinName
    };
    $http({
      url:designerZ + 'wishome-web/rest/queryRegionPrjt',
      method:'GET',
      params:setRoomName
    }).success(function(data){
      var len = data.list2.length;
      if(len === 0){
        $scope.liShow = true
      }else{
        $scope.liShow = false;
      }
      $scope.list2 = data.list2;
    });
  };
  var regionname = locals.get("designerSeeRegionName");

  $scope.getDetailsid = function(item){
    $http({
      url: designerY + 'wishome-web/rest/QueryUpdPrjtDetails',
      method:'GET',
      params:item
    }).success(function(data){
      if(data.base === undefined){

      }else{
        var len = data.base.length;
        $scope.imgList = [];
        if(len === undefined){
          $scope.imgList = [];
          return false;
        }else{
          for(var i=0;i<len;i++){
            var base = {
              'base':data.base[i]
            };
            $scope.imgList.push(base)
          }
        }
      }
      $scope.framematerial = data.details.detailsframematerial;
      $scope.platematerial = data.details.detailsplatematerial;
      // $scope.selectList($scope.framematerial);
      // $scope.selectList4($scope.platematerial);
      $scope.base = data.base;
      $scope.imgInfo = data.details;
      $scope.detailsurl = data.details.detailsurl;
      //更新or新增
      if($scope.imgInfo.detailscode === null){
        $scope.color1 = false;
        $scope.color2 = false;
        $scope.btnName = "新增";
      }else{
        $scope.color1 = true;
        $scope.color2 = true;
        $scope.btnName = "更新";
      }
    });
  };

  //调用函数
  if(designerDetailsid === undefined ){
    $("#noImg").show();
    $("#imgBox").hide();
    $scope.getBigImg = false;
    $scope.btnName = "新增";
    // return false;
  }else{
    $("#noImg").hide();
    $("#imgBox").show();
    $scope.getDetailsid(detailsid);
  }
  //获取图片详情页下拉框
  $scope.getMore = function(){
    $http({
      url:designerY + 'wishome-web/rest/DetailsList',
      method:'GET'
    }).success(function(data){
      $scope.detailscode = data.detailscode;
      $scope.list = data.list;
      $scope.list4 = data.list4;
    }).error(function(){
    });
  };
  $scope.getMore();


//  修改后清空
  $scope.removeImg = function(){
    $scope.imgInfo.detailsurl="";
    $scope.imgInfo.detailsname="";
    $scope.detailscode="";
    $scope.imgInfo.detailsspecifications="";
    $scope.imgInfo.detailsnumber="";
    // $scope.imgInfo.detailsframematerial="";
    // $scope.imgInfo.detailsframecolor="";
    // $scope.imgInfo.detailsplatematerial="";
    // $scope.imgInfo.detailsplatecolor="";
    $scope.imgInfo.detailsmemo="";
  };

  //  图片链接更新
  $scope.imgClick = function(img,index){
    $scope.detailsurl = img.base;
    $scope.showUrlIndex = index;
  };

//  新增产品 或 更新产品 开始
  $scope.saveImg = function(data){
    if($("#input1").val() === "" || $("#input3").val() === ""){
      if($scope.input4 === undefined){
        $scope.input4 = 1
      }
    // if($("#input1").val() === "" || $("#input3").val() === "" || $("#input4").val() === "" || $("#list option:selected").html() === "" || $("#list2 option:selected").html() === "" || $("#list4 option:selected").html() === ""){
      $scope.footer = false;
      $scope.header = true;
      $scope.prjtP = true;
      $scope.alertTextP = false;
      $scope.prjtText = "请完成标注【*】的内容。";
      $scope.errorAlert = true;
      $timeout(function(){
        $scope.errorAlert = false;
      },2000)
    }else{
      //转换
      //get newFile setFile
      var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
      var objExp = new RegExp(Expression);
      var form = document.forms[0];
      var fd = new FormData(form);
      var file;
      // $scope.changeImg = function(){

      // };

      //修改产品更新数据
      $scope.returnPreSaleChange = function(only,more){
        if($scope.input4 === undefined){
          $scope.input4 = 1
        }
        var imgMoreList = {
          "prjtid": prjtId,
          "detailsid": designerDetailsid,
          "regionname": roomName,
          "detailsurl": only,
          "identificationURL": more,
          "detailsname": $("#input1").val(),
          "detailscode": $("#input2").val(),
          "detailsspecifications": $("#input3").val(),
          "detailsnumber":  $scope.input4,
          "detailsmemo": $("#input5").val()
        };

        var loadingShowText = "上传产品数据中...";
        $scope.loaddingShow(loadingShowText);
        // $timeout(function(){
          $http({
            method:'POST',
            url:designerY + 'wishome-web/rest/UpdPrjtDetails',
            params: imgMoreList
          }).success(function(){
            var loadingShowText = "产品信息修改成功！";
            $scope.loaddingShow(loadingShowText);

            $timeout(function(){
              $scope.loaddingHide();
              $state.go("typesetting.preSale");
              $scope.removeImg();
            })
          })
        // },1000);
      };

      //新增产品更新数据
      $scope.returnPreSaleAdd = function(only,more){
        if($scope.input4 === undefined){
          $scope.input4 = 1
        }
        var imgMoreList = {
          "prjtid": prjtId,
          "regionname": roomName,
          "detailsurl": only,
          "identificationURL": more,
          "detailsname": $("#input1").val(),
          "detailscode": $("#input2").val(),
          "detailsspecifications": $("#input3").val(),
          "detailsnumber":  $scope.input4,
          "detailsmemo": $("#input5").val()
        };
        var loadingShowText = "上传产品数据中...";
        $scope.loaddingShow(loadingShowText);

          $http({
            method:'POST',
            url:designerY + 'wishome-web/rest/AddPrjtDetails',
            params: imgMoreList
          }).success(function(){
            var loadingShowText = "新增产品成功！";
            $scope.loaddingShow(loadingShowText);

            $timeout(function(){
              $scope.loaddingHide();
              $state.go("typesetting.preSale");
              $scope.removeImg();
            },1000)
          })
      };

      // 修改产品更新图片
      $scope.changeImg = function(){
        function convertBase64UrlToBlob($dataURI){
          if(objExp.test($dataURI)){
          }else{
            var bytes = window.atob($dataURI.split(',')[1]);        //去掉url的头，并转换为byte
            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i);
            }
            return new Blob( [ab] , {type : 'image/png'});
          }
        }
        if($scope.imgList.length === 0){
          $scope.onlyURL = '../images/projectList/wishome.png';
          $scope.moreURL = $scope.imgList;
        }else{
          var loadingShowText = "正在上传图片中...";
          $scope.loaddingShow(loadingShowText);
          var len = $scope.imgList.length;
          $scope.moreURL = [];
          for(var i=0;i<len;i++){
            if(objExp.test($scope.imgList[i].base)){
              $scope.moreURL.push($scope.imgList[i].base)
            }else{
              fd.append("file",convertBase64UrlToBlob($scope.imgList[i].base));
            }
          }
          if(!objExp.test($scope.detailsurl)){
            fd.append("File",convertBase64UrlToBlob($scope.detailsurl));
          }else{
            $scope.onlyURL = $scope.detailsurl
          }
        }

        $http({
          method:'POST',
          url: designerY + 'wishome-web/rest/filePhoto',
          data: fd,
          headers:{'Content-Type':undefined},
          transformRequest:angular.identity
        }).success(function(items){
          // console.log(items);
          // return false
          var loadingShowText;
          if(items.url.length === 0 && items.url2.length === 0){
            loadingShowText = "加载中...";
            $scope.loaddingShow(loadingShowText);
          }else{
            loadingShowText = "图片上传成功！";
          $scope.loaddingShow(loadingShowText);
          for(var u=0;u<items.url.length;u++){
            $scope.moreURL.push(items.url[u]);
          }
          if(items.url2.length !== 0){
            $scope.onlyURL = items.url2[0];
          }
        }
        $timeout(function(){
          $scope.returnPreSaleChange($scope.onlyURL,$scope.moreURL);
        },1000);
        })
      };

      //  新增产品更新图片
      $scope.addImg = function(){
        function convertBase64UrlToBlob($dataURI){
            var bytes = window.atob($dataURI.split(',')[1]);        //去掉url的头，并转换为byte
            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i);
            }
            return new Blob( [ab] , {type : 'image/png'});
        }

        if($scope.imgList === undefined){
          $scope.onlyURL = '../images/projectList/wishome.png';
          $scope.moreURL = $scope.imgList;
        }else{
          var loadingShowText = "正在上传图片中...";
          $scope.loaddingShow(loadingShowText);
          var len = $scope.imgList.length;
          $scope.moreURL = [];
          for(var i=0;i<len;i++){
            if(objExp.test($scope.imgList[i].base)){
              $scope.moreURL.push($scope.imgList[i].base)
            }else{
              fd.append("file",convertBase64UrlToBlob($scope.imgList[i].base));
            }
          }
          if(!objExp.test($scope.detailsurl)){
            fd.append("File",convertBase64UrlToBlob($scope.detailsurl));
          }else{
            $scope.onlyURL = $scope.detailsurl
          }
        }
          $http({
            url: designerY + 'wishome-web/rest/filePhoto',
            method:'POST',
            data:fd,
            headers:{'Content-Type':undefined},
            transformRequest:angular.identity
          }).success(function(items){
            var loadingShowText;
            if(items.url.length === 0 && items.url2.length === 0){
              loadingShowText = "加载中...";
              $scope.loaddingShow(loadingShowText);
            }else{
              loadingShowText = "图片上传成功！";
              $scope.loaddingShow(loadingShowText);
              for(var u=0;u<items.url.length;u++){
                $scope.moreURL.push(items.url[u]);
              }
              if(items.url2.length !== 0){
                $scope.onlyURL = items.url2[0];
              }
            }
            $timeout(function(){
              $scope.returnPreSaleAdd($scope.onlyURL,$scope.moreURL);
            },1000)
          })
      };
      if($scope.btnName === "新增"){
        $scope.addImg();
      }else if($scope.btnName === "更新"){
        $scope.changeImg();
      }
    }
  } ;  //  新增 或 更新 结束

//  删除列表图片
  $scope.delImgList = function(img,index,item){
    // $scope.delImg();
    $scope.imgIndex = index;
    $scope.imgList.splice(index,1);
    if($scope.imgList.length === 0){
      $scope.detailsurl = "../images/projectList/wishome.png";
    }else{
      $scope.detailsurl = $scope.imgList[0].base;
    }
  };
//  获取房间图片
  $scope.getRoomImg = function(item){
    var prjtId = locals.get("prjtId");
    var room = {
      "prjtid": prjtId,
      "local":item.data.regoinName
    };
    $http({
      url:zheng + 'wishome-web/rest/queryRegionPrjt',
      method:'GET',
      params:room
    }).success(function(data){
      $scope.list2 = data.list2;
    }).error(function(){});
  };

  //编辑图片出现弹框
  $scope.editImgModelShow = function(url,index,item){
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if(objExp.test(url.base) === true){
      var imgUrl = {
        'imgUrl': url.base
      };
      $http({
        url: designerZ + 'wishome-web/rest/readImage',
        method:'GET',
        params:imgUrl
      }).success(function(data){
        $scope.imageDataURI = data.base;
        $scope.imgIndex = index;
        $scope.editImgModel = true;
        return false;
      });
    }else{
      $scope.imageDataURI = url.base;
      $scope.imgIndex = index;
      $scope.editImgModel = true;
      // return false;
    }
  };

  // //  查看大图
  $scope.seeBigImgBig = function(url){
    $scope.seeImg(url);
  };

// //  查看大图
  $scope.seeBigImg = function(url){
    $scope.seeImg(url.base);
  };
//返回上一页
  $scope.comeBack = function(){
    $state.go("typesetting.preSale");
  };


//  假数据
});//imageViewCtrl END

//右侧导航栏
myApp.directive('hideBar',function(){
  return{
    restrict:'EA',
    link:function(scope,ele,attr){
      var right = $("#right").css('right');
      //点body消失
      $("#left").click(function(){
        if(right === "-250px"){
          $("#showIcon").show();
          $("#hideIcon").hide();
          $("#right").animate({right:'-250px'});
        }else{
          return false;
        }
      });
      //出现
      $("#right").click(function(){
        if(right === "-250px"){
          $("#showIcon").hide();
          $("#hideIcon").show();
          $("#right").animate({right:'0'});
        }else{
          return false;
        }
      });
      //消失
      $("#hideIcon").click(function(){
        $("#showIcon").show();
        $("#hideIcon").hide();
        $("#right").animate({right:'-250px'});
        return false;
      });
    }
  }
});

