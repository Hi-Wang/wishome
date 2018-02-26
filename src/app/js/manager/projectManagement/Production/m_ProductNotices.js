/**
 * Created by ASUS on 2017/9/19.
 */
myApp.controller('mProductNoticesCtrl',function($scope,$http,$state,$stateParams,$timeout){
  $(".UrlA").eq(1).css('background','#00c2de');
  $(".UrlA").not($(".UrlA").eq(1)).css("background","none");
  var time = new Date();
  var Y = time.getFullYear();
  var M = time.getMonth() + 1;
  var D = time.getDate();

  $scope.minDate = Y + "-" + M + "-" + D;
  //  select选择后
  $scope.setSelectValue = function(item){
    $http({
      url: managerZ +'wishome-web/rest/queryProAndTN',
      method:'GET',
      params:item
    }).success(function(data){
      $scope.gongYi = [];
      for(var g=0;g<data.list1.length;g++){
        data.list1[g].name = '';
        if(data.list1[g].signId === 0){
          data.list1[g].ifText = true
        }else if(data.list1[g].signId === 1){
          data.list1[g].ifText = false
        }
      }
      $scope.gongYi = data.list1;
      $scope.prd.productionrequirements = '';
      $scope.prd.proName = data.proCateName;
      $scope.nodeTime = data.list;
      $scope.nodeAdd = true;
      console.log($scope.nodeTime)
    })
  };

  var id = {
    'detailsId': $stateParams.id
  };
  $http({
    url: managerZ +'wishome-web/rest/editOrder',
    method:'GET',
    params:id
  }).success(function(data){
    $scope.prd = data.prd;
    $scope.pr = data.pr;
    $scope.ot = data.ot;
    $scope.it = data.it;
    $scope.consName = $scope.prd.consName;
    $scope.list = data.list;
    for(var s=0;s<data.list.length;s++){
      if(data.prd.consName === data.list[s].name){
        $scope.consName = data.list[s];
      }
    }
    if(data.node === null){
      // return false
    }else if(data.node !== null){
      for(var n = 0,len = data.node.length;n < len;n++){
        data.node[n].animateClass = '';
        if(data.node[n].time === null){

          // return false
        }else  if(data.node[n].time !== null){
          data.node[n].time = new Date(data.node[n].time)
        }
      }
    }
    $scope.nodeTime = data.node;
    $scope.gongYi = [];
    if(data.pros === null){

    }else if(data.pros !== null){
      for(var p=0;p<data.pros.length;p++){
        var gY = {
          'processName': data.pros[p].name,
          'name' : data.pros[p].name,
          'ifText' :  null,
          'pro' : data.pros[p].cons,
          'value' : null
        };
        if(data.pros[p].sign === 0){
          gY.value = data.pros[p].value;
          gY.ifText = true
        }else if(data.pros[p].sign === 1){
          if(data.pros[p].cons === null){

          }else{
            for(var v=0;v<data.pros[p].cons.length;v++){
              if(data.pros[p].value === data.pros[p].cons[v]){
                gY.value = data.pros[p].cons[v];
              }
            }
            gY.ifText = false
          }
        }
        $scope.gongYi.push(gY)
     }
    }

    if($scope.consName !== null){
      $scope.nodeAdd = true;
    }else{
      // $scope.nodeAdd = false;
      $scope.consName = data.list[0];
      var value = {
        'id':data.list[0].id
      };
      $scope.setSelectValue(value);
    }
    $scope.imgList = [];
    var list = angular.fromJson(data.prd.threeViewsUrl);
    if(list === null){

    }else{
      for(var l=0;l<list.length;l++){
        $scope.imgList.push({'base':list[l]})
      }
    }
  });

  $http({
    url:managerZ +'wishome-web/rest/queryOtherNodes',
    method:'GET',
    params:name
  }).success(function(data){
    console.log(data);
    $scope.addNodeList = data.list;
    // $scope.add(data.list);
  });

//查看大图
  $scope.seeBigImgBig = function(url){
    $scope.seeImg(url);
  };
  $scope.seeBigImg = function(url){
    $scope.seeImg(url);
  };

//  删除图片
  $scope.delImgList = function(imgList,index){
    $scope.imgList = imgList;
    $scope.imgList.splice(index,1);
  };

//  添加节点---修改后
  $scope.addToList = function(item){
    console.log(item);
    var nodeLen = $scope.nodeTime.length;
    for(var n=0;n<nodeLen;n++){
      if(item.name === $scope.nodeTime[n].name){
        $scope.nodeTime[n].animateClass = "color2 shake animated";
        $scope.iconClass = "icon ion-information-circled error";
        $scope.iconText = "节点已存在！";
        $scope.iconTextClass = "error";
        $('#iconSpan').slideDown();
        function animate(n){
          $scope.nodeTime[n].animateClass = "";
        }
        $timeout(function(){
          animate(n);
          $('#iconSpan').slideUp();
        },1600);
        return false
      }
    }
    $scope.nodeTime.push(item);
    $scope.iconClass = "icon ion-checkmark-circled success";
    $scope.iconText = "添加成功！";
    $scope.iconTextClass = "success";
    $('#iconSpan').slideDown();
    $timeout(function(){
      $('#iconSpan').slideUp();
    },1600);
  };


//返回
  $scope.back = function(item){
    var id = item.pr.prjtid;
    $state.go('typesetting.mProductionView',{id:id})
  };
//  保存并返回
  $scope.nodeSave = function(data){
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    var form = document.forms[0];
    var fd = new FormData(form);
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
    $scope.proName = [];
    for(var d=0;d<data.gongYi.length;d++){
      var u = {
        'name' : data.gongYi[d].processName,
        'value' : data.gongYi[d].value
      };
      $scope.proName.push(u)
    }
    if($scope.consName === undefined){
      $scope.consName = data.list[0].name
    }else if($scope.consName !== undefined){

    }
    $scope.all = {
      'detailsid': $scope.prd.detailsid,
      'productionRements':$scope.prd.productionrequirements,
      'threeViewsUrl':$scope.threeViewsUrl,
      'proName': angular.toJson($scope.proName),
      'consName': $('#selectListName option:selected').html(),
      'node':$scope.nodeTime
    };
    // get newFile setFile
    var loadingShowText
    if($scope.imgList === undefined){
      $scope.threeViewsUrl = '';
    }else{
      if($scope.imgList.length === 0){
        loadingShowText = '加载中...';
        $scope.loaddingShow(loadingShowText);
      }else{
        loadingShowText = '正在进行图片上传...';
        $scope.loaddingShow(loadingShowText);
      }
      var len = $scope.imgList.length;
      $scope.threeViewsUrl = [];
      for(var i=0;i<len;i++){
        if(objExp.test($scope.imgList[i].base)){
          $scope.threeViewsUrl.push($scope.imgList[i].base)
        }else{
          fd.append("file",convertBase64UrlToBlob($scope.imgList[i].base));
        }
      }
    }
    $http({
      method:'POST',
      url: designerY + 'wishome-web/rest/filePhoto',
      // url: 'http://scmc.villion.cn:4433/wishome-web/rest/filePhoto',
      data: fd,
      headers:{'Content-Type':undefined},
      transformRequest:angular.identity
    }).success(function(items){

      if(items.url.length === 0){

      }else if(items.url.length !== 0){
        loadingShowText = '图片上传成功！';
        $scope.loaddingShow(loadingShowText);

        for(var u=0;u<items.url.length;u++){
          $scope.threeViewsUrl.push(items.url[u]);
        }
        $scope.all.threeViewsUrl = angular.toJson($scope.threeViewsUrl);
      }
      $timeout(function(){
        $scope.ajaxSetSave($scope.all);
      },1000);

    });
  };

//   x信息上传
  $scope.ajaxSetSave = function(item){
    var loadingShowText = '正在上传产品下单信息...';
    $scope.loaddingShow(loadingShowText);
    $http({
      url: managerZ +'wishome-web/rest/updateOrder',
      method:'GET',
      params:item
    }).success(function(data){
      $timeout(function(){
        var loadingShowText = '上传成功！';
        $scope.loaddingShow(loadingShowText);
      },1000);
      $timeout(function(){
        var id = data.id;
        $scope.loaddingHide();
        $state.go('typesetting.mProductionView',{id:id})
      },2000)
    })
  };
//删除节点
  $scope.delNode = function(data){
    var index = data.$index;
    var nodeName = data.span.name;
    $scope.managerModel = true;
    $scope.del(nodeName,index);
  };
//  添加节点
  $scope.addNode = function(data){
    if($("#selectListName option:selected").html() === ""){
      $("#selectListName option:selected").html($scope.prd.proName)
    }
    var name = {
      'name': $("#selectListName option:selected").html()
    };
    $http({
      url:managerZ +'wishome-web/rest/queryOtherNodes',
      method:'GET',
      params:name
    }).success(function(data){
      $scope.managerModel = true;
      $scope.add(data.list);
    });
  };

//  富文本编辑框
  $scope.richTextShow = function(item){
    console.log(item);
    var url = item.prd.detailsurl;
    $scope.richTextCanvas(url);
    $scope.richText = true;
  }
});

myApp.directive('selectChange',function(){
  return{
    controller:function($scope){
      $("#selectListName").change(function(){
        $scope.consName = $('#selectListName').prop('selectedIndex');
        var value = {
          'id':$scope.list[$scope.consName].id
        };
        $scope.setSelectValue(value);
      })
    }
  }
});

//自定义图片上传指令
myApp.directive('loadFile',function(readFiles){
  return {
    restrict:'A',
    controller:function($scope){
    },
    link:function(scope,ele,attr){
      scope.imgData = [];
      ele.bind('change',function(){
        var promise = readFiles.getData(this.files);
        promise.then(function(value){
          if(scope.imgList === undefined){
            scope.imgList = value;
          }else{
            for(var i=0;i<value.length;i++){
              scope.imgList.push({'base':value[i].base});
            }
          }
          scope.flies = promise.value;
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
