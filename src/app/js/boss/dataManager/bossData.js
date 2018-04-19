//列表模板
myApp.directive('bossDataListView',function(){
  return{
    restrict:'EA',
    replace:false,
    templateUrl:'boss/dataManager/bossData.html',
    controller:function($scope,$http,$state,$stateParams){
      //返回构成类别
      $scope.goBack = function(item){
        if(item.tdName === "户型" || $scope.tdName === "区域名称"){
          $state.go('typesetting.dataItemCategory');
          return false
        }else if(item.tdName === "工艺" || item.tdName === "工序"){
          $state.go('typesetting.dataConstituteCategory');
          return false
        }else if(item.tdName === "下拉数据"){
          $state.go('typesetting.dataConstitute_Process');
          return false
        }
      };

      $scope.keyUp = function(e,item){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode === 13){
          $scope.bossDelHome(item);
          return false;
        }else if(keycode === 8){
          $scope.errorData = false;
          // $scope.errorText = "";
          // $scope.errorEditModel = false;
          // $scope.errorEditModelText = "";
        }
      };

      //调用刚进来的时候
      $scope.start = function(text){
        if(text === "主材"){
          $scope.queryPrincipal();
          return false
        }else if(text === "板材"){
          $scope.queryBoard();
          return false
        }else if(text === "国产品牌"){
          $scope.queryDomesticBrand();
          return false
        }else if(text === "进口品牌"){
          $scope.queryImportBrand();
          return false
        }else if(text === "涂装品牌"){
          $scope.queryCoatingMaterialBrandTable();
          return false
        }else if(text === "胶水品牌"){
          $scope.queryGlueBrand();
          return false
        }else if(text === "户型"){
          $scope.queryHstpCate();
          return false
        }else if(text === "区域名称"){
          $scope.queryRegoinTable();
          return false
        }else if(text === "工序"){
          $scope.queryAllTimeNodes();
          return false
        }else if(text === "工艺"){
          $scope.queryProcessTable();
          return false
        }else if(text === "下拉数据"){
          $scope.queryContentByPtName();
          return false
        }
      };

      //删除Data
      $scope.delData = function(item,index){
        var text = item.$parent.tdName;
        // 弹框没写
        var data,url;
        if(text === "主材"){
          data = {
            'principalId': item.data.id
          };
          url = "delPrincipal";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "板材"){
          data = {
            'boardId': item.data.id
          };
          url = "delBoard";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "国产品牌"){
          data = {
            'domesticId': item.data.id
          };
          url = "delDomesticBrand";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "进口品牌"){
          data = {
            'importId': item.data.id
          };
          url = "delImportBrand";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "涂装品牌"){
          data = {
            'coatingId': item.data.id
          };
          url = "delCoatingMaterialBrandTable";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "胶水品牌"){
          data = {
            'glueId': item.data.id
          };
          url = "delGlueBrand";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "户型"){
          data = {
            'id': item.data.id
          };
          url = "deleteHstp";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "区域名称"){
          data = {
            'id': item.data.id
          };
          url = "deleteRegoinTable";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "工序"){
          data = {
            'id': item.data.id
          };
          url = "deleteNode";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "工艺"){
          data = {
            'id': item.data.id,
            'sign' : item.data.signId
          };
          url = "deleteProcess";
          $scope.ajaxDelData(data,text,url);
          return false
        }else if(text === "下拉数据"){
          $scope.dataList.splice(index, 1);
          var addNewData = [];
          for(var s=0;s<$scope.dataList.length;s++){
            addNewData.push($scope.dataList[s].name)
          }
          var setData = angular.toJson(addNewData);
          data = {
            'cons': setData,
            'proName' : $stateParams.name
          };
          url = "upContentByPtName";
          $scope.ajaxDelData(data,text,url);
          return false
        }
      };
      //删除请求
      $scope.ajaxDelData = function(item,text,url){
        $http({
          // url: 'http://192.168.2.109:8080/wishome-web/rest/' + url,
          url: designerY + 'wishome-web/rest/' + url,
          method:'GET',
          params: item
        }).success(function(){
          $scope.start(text);
        });
      };

      //新增弹框
      $scope.showDataModel = function(item){
        item.addDataModel = true;
        $scope.addInput = true;
        $scope.homeModelName = "新增" + item.tdName + "名称:";
        $scope.placeholder = "请填写新增" + item.tdName +"名称";
      };

      //  修改名称
      $scope.changeDataName = function(item){
        console.log(item);
        if($scope.tdName === '工序'){
          $scope.addDataModel = true;
          $scope.addInput = true;
          $scope.homeModelName = "修改" + $scope.tdName + ":";
          $("#newInputName").val(item.data.name);
          $("#start").val(item.data.st);
          $("#end").val(item.data.end);
          $scope.hideId = item.data.id
        }else{
          item.changName = true;
        }
      };

      //  保存修改名称
      $scope.saveDataName = function(item,index){
        var text = item.$parent.tdName;
        var data,url;
        var changeName = $(".changeDataName").eq(index).val();
        if(changeName === ''){
          alert("名称不能为空。");
          return false
        }else if(changeName !== ''){
          if(text === "主材"){
            data = {
              'principalname' : changeName,
              'principalId' : item.data.id
            };
            url = "updPrincipal";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "板材"){
            data = {
              'boardname' : changeName,
              'boardId' : item.data.id
            };
            url = "updBoard";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "国产品牌"){
            data = {
              'domesticname' : changeName,
              'domesticId' : item.data.id
            };
            url = "updDomesticBrand";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "进口品牌"){
            data = {
              'importname' : changeName,
              'importId' : item.data.id
            };
            url = "updImportBrand";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "涂装品牌"){
            data = {
              'coatingname' : changeName,
              'coatingId' : item.data.id
            };
            url = "updCoatingMaterialBrandTable";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "胶水品牌"){
            data = {
              'gluename' : changeName,
              'glueId' : item.data.id
            };
            url = "updGlueBrand";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "户型"){
            data = {
              'hstpCateName' : changeName,
              'id' : item.data.id
            };
            url = "upHstpCate";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "区域名称"){
            data = {
              'regoinName' : changeName,
              'id' : item.data.id
            };
            url = "upRegoinTable";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "工序"){
            data = {
              'nodeName' : changeName,
              'id' : item.data.id
            };
            url = "upTimeNode";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "工艺"){
            data = {
              'proName' : changeName,
              'id' : item.data.id
            };
            url = "upProcessTable";
            $scope.ajaxChangeName(data,text,url);
            return false
          }else if(text === "下拉数据"){
            $scope.dataList[index].name = changeName;
            var addNewData = [];
            for(var s=0;s<$scope.dataList.length;s++){
              addNewData.push($scope.dataList[s].name)
            }
            var setData = angular.toJson(addNewData);
            data = {
              'proName' : $stateParams.name,
              'cons' : setData
            };
            url = "upContentByPtName";
            $scope.ajaxChangeName(data,text,url);
            return false
          }
        }
      };
      $scope.ajaxChangeName = function(data,text,url){
        $http({
          url: designerY + 'wishome-web/rest/' + url,
          method:'GET',
          params: data
        }).success(function(){
          $scope.start(text);
        })
      };

      //  取消修改名称
      $scope.cancelDataName = function(item){
        item.changName = false;
      };

    //  查看工艺数据
      $scope.goGongYiData = function(item){
        var name = item.name;
        $state.go('typesetting.dataConstitute_ProcessData',{name:name});
      }
    }
  }
});

//模板指令
myApp.directive('bossDataModel',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'boss/model.html',
    controller:function($scope,$http,$stateParams){
      $scope.cancel = function(){
        $("#newInputName").val('');
        $("#start").val('');
        $('#end').val('');
        $scope.errorData = false;
        $scope.addDataModel = false;
      };
      //添加元素
      $scope.bossDelHome = function(item){
        var url,add,setData,addNewData;
        var text = item.tdName;
        var newName = $("#newInputName").val();
        if(newName === ''){
          $scope.errorData = true;
          $scope.errorDataText = "名称不能为空。";
          return false
        }else if(newName !== ''){
          if(item.homeModelName === "修改工序:"){
            var start = $("#start").val();
            var end = $('#end').val();
            if(start === '' || end === ''){
              $scope.errorData = true;
              $scope.errorDataText = "请填写【提前开始时间】和【提前结束时间】。";
              return false
            }else if( parseInt(start) < parseInt(end) ){
              $scope.errorData = true;
              $scope.errorDataText = "【提前开始时间】必须大于【提前结束时间】。";
              return false
            }else if( parseInt(start) > parseInt(end) ){
              var data = {
                'st': start,
                'end' : end,
                'nodeName' : newName,
                'id' : $scope.hideId
              };
              console.log(data);
              $http({
                url: designerY + 'wishome-web/rest/upTimeNode',
                method:'GET',
                params: data
              }).success(function(){
                $scope.cancel();
                $scope.start(text);
              })
            }
            return false
          }
          var len = item.dataList.length;
          if(len === 0 && text === "下拉数据"){
              item.dataList.push({'name':newName});
              addNewData = [];
              for(var n=0;n<item.dataList.length;n++){
                addNewData.push(item.dataList[n].name)
              }
              setData = angular.toJson(addNewData);
              add = {
                'cons': setData ,
                'proName' : $stateParams.name
              };
              url = "upContentByPtName";
              $scope.ajaxAddDataSave(add,text,url);
            return false
          }else{
            // for(var i=0;i<len;i++){
              // if(newName === item.dataList[i].name){
              //   $scope.errorData = true;
              //   $scope.errorDataText = "该名称已存在。";
              //   return false
              // }else if(newName !== item.dataList[i].name){
                $scope.errorData = false;
                if(text === "主材"){
                  add = {
                    'principalname': newName
                  };
                  url = "addPrincipal";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "板材"){
                  add = {
                    'boardname': newName
                  };
                  url = "addBoard";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "国产品牌"){
                  add = {
                    'domesticname': newName
                  };
                  url = "addDomesticBrand";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "进口品牌"){
                  add = {
                    'importname': newName
                  };
                  url = "addImportBrand";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "涂装品牌"){
                  add = {
                    'coatingname': newName
                  };
                  url = "addCoatingMaterialBrandTable";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "胶水品牌"){
                  add = {
                    'gluename': newName
                  };
                  url = "addGlueBrand";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "户型"){
                  add = {
                    'hstpCateName': newName
                  };
                  url = "addHstpCate";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "区域名称"){
                  add = {
                    'regoinName': newName
                  };
                  url = "addRegoinTable";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "工序"){
                   start = $("#start").val();
                   end = $('#end').val();
                   console.log(start);
                   console.log(end);
                  if(start === '' || end === ''){
                    $scope.errorData = true;
                    $scope.errorDataText = "请填写【提前开始时间】和【提前结束时间】。";
                    return false
                  }else if( parseInt(start)<parseInt(end) ){
                    $scope.errorData = true;
                    $scope.errorDataText = "【提前开始时间】必须大于【提前结束时间】。";
                    return false
                  }else if( parseInt(start) > parseInt(end) ){
                    add = {
                      'st': start,
                      'end' : end,
                      'nodeName': newName
                    };
                    console.log(add);
                    url = "addTimeNode";
                    $scope.ajaxAddDataSave(add,text,url);
                  }
                  return false
                }else if(text === "工艺"){
                  var sign ;
                  if(item.textRadio === true){
                    sign = 0
                  }else if(item.textRadio === false){
                    sign = 1
                  }
                  add = {
                    'proName': newName,
                    'sign' : sign
                  };
                  url = "addProcessTable";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }else if(text === "下拉数据"){
                  item.dataList.push({'name':newName});
                  addNewData = [];
                  for(var s=0;s<item.dataList.length;s++){
                    addNewData.push(item.dataList[s].name)
                  }
                  setData = angular.toJson(addNewData);
                  add = {
                    'cons': setData ,
                    'proName' : $stateParams.name
                  };
                  url = "upContentByPtName";
                  $scope.ajaxAddDataSave(add,text,url);
                  return false
                }
              // }
            // }
          }
        }
      };
      //点击保存新增信息请求
      $scope.ajaxAddDataSave = function(item,text,url){
        $http({
          url: designerY + 'wishome-web/rest/' + url,
          // url: 'http://192.168.2.109:8080/wishome-web/rest/' + url,
          method:'GET',
          params: item
        }).success(function(){
          $scope.cancel();
          $scope.start(text);
          // $scope.addDataModel = false;
        });
      }

    }
  }
});

myApp.directive('setFocus', function(){
  return function(scope, element){
    element[0].focus();
  };
});
