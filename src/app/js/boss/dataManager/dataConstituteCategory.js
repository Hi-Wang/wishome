myApp.controller('dataConstituteCategoryCtrl',function($scope,$http,$state,$timeout){
  $scope.tdName = '构成类别';
  $scope.name1 = '构成类别';
  $scope.name2 = '工序';
  $scope.name3 = '工艺';
  $scope.startStyle = function(){
    $scope.input = {
      'input': '修改名称',
      'inputStyle' : true,
      'input1' : '请输入构成类别名称',
      'inputStyle1' : true,
      'input2' : '请选择工序名称',
      'inputStyle2' : true ,
      'input3' : '请选择工艺名称',
      'inputStyle3' : true
    };
  };
  $scope.startStyle();

//  刚进来
  $scope.queryAllConstitute = function(){
    $http({
      url:  designerY + 'wishome-web/rest/queryAllConstitute',
      method:'GET'
    }).success(function(data){
      $scope.list1 = data.list;
      $scope.list2 = data.list1;
      $scope.list3 = data.list2;
    });
  };
  $scope.queryAllConstitute();


  //  修改构成类别名称
  $scope.changeNameClick = function(item,index){
    item.changeSpan = true;
    item.leftIconShow = false;
  };
  //保存项目类别名称修改
  $scope.saveChangeName = function(item,index){
    var txt;
    var text = $('.changeNameInput').eq(index).val();
    if(text === ""){
      txt = '名称不能为空！';
      $scope.showErrorText(txt);
      return false
    }else{
      for(var n = 0;n<=item.list1.length;n++){
        if(text === item.list1[n].name){
          txt = '该名称已存在！';
          $scope.showErrorText(txt);
          return false
        }else{
          var items = {
            'consName' : text,
            'id' : item.data.id
          };
          $http({
            url:  designerY + 'wishome-web/rest/upConstitute',
            // url:  'http://192.168.2.109:8080/wishome-web/rest/upConstitute',
            method:'GET',
            params:items
          }).success(function(){
            $scope.hideChangeName(item);
            var txt = '修改成功！';
            $scope.showSuccessText(txt);
            $scope.queryAllConstitute();
          });
          return false
        }
      }
    }
  };

  //  取消修改名称
  $scope.hideChangeName = function(item){
    item.leftIconShow = true;
    item.changeSpan = false;
  };

  //  getContentView 获取工序和工艺
  $scope.getContentView = function(item,index){
    var thisStyle = $('.left li').eq(index);
    thisStyle.css('background','#fff');
    $('.left li').not(thisStyle).css('background','none');
    $scope.consId = $scope.list1[index].id;
    var items = {
      'id' : item.id
    };
    $scope.ajaxGetContentView(items)
  };
  $scope.ajaxGetContentView = function(items){
    $http({
      url: designerY + 'wishome-web/rest/queryNodeAndProcess',
      method:'GET',
      params:items
    }).success(function(data){
      $scope.list2 = data.list;
      $scope.list3 = data.list1;
      // $scope.hstpId = $scope.list2[0].id;
    })
  };

  //获取工艺工序的下拉框
  $scope.getGongYiAndGongXu = function(name){
    var url;
    if(name === "工序"){
      $scope.contentBtn = false;
      url = 'queryAllTimeNodes'
      // return false
    }else if(name === "工艺"){
      $scope.rightBtn = false;
      url = 'queryProcessTable'
      // return false
    }
    $http({
      url: designerY + 'wishome-web/rest/' + url,
      method:'GET'
    }).success(function(data){
      var i;
      var List = [];
      if(name === '工序'){
        for(i=0;i<data.list.length;i++){
          List.push({'id': data.list[i].id,'name':data.list[i].name})
        }
        $scope.select1 = data.list;
        return false
      }else if(name === '工艺'){
        for(i=0;i<data.list.length;i++){
          List.push({'id': data.list[i].id,'name':data.list[i].processName})
        }
        $scope.select2 = List;
        return false
      }
    });
  };
  //  取消新增名称
  $scope.hide = function(name){
    if(name === "构成类别"){
      $('.input1').val('');
      $scope.startStyle();
      $scope.leftBtn = true;
      return false
    }else if(name === '工序'){
      $('.input2').val('');
      $scope.startStyle();
      $scope.contentBtn = true;
      return false
    }else if(name === "工艺"){
      $('.input3').val('');
      $scope.startStyle();
      $scope.rightBtn = true;
    }
  };
  //  新增项目类型、户型、区域名称
  $scope.addFunction = function(item,name){
    var items,url,val,index;
    if(name === '构成类别'){
      val = $('.input1').val();
    }else if(name === '工序'){
      if($('.input2 option:selected').html() === '请选择工序名称'){
        val = ''
      }else{
        val = $('.input2 option:selected').html()
      }
    }else if(name === '工艺'){
      if($('.input3 option:selected').html() === '请选择工艺名称'){
        val = ''
      }else{
        val = $('.input3 option:selected').html()
      }
    }
    if(val === ''){
      if(name === '构成类别'){
        $scope.input.input1 = '名称不能为空';
        $scope.input.inputStyle1 = false;
        return false
      }else if(name === '工序'){
        $scope.input.input2 = '请选择工序名称';
        $scope.input.inputStyle2 = false;
        return false
      }else if(name === '工艺'){
        $scope.input.input3 = '请选择工艺名称';
        $scope.input.inputStyle3 = false;
        return false
      }
    }else{
      if(name === '构成类别'){
        items = {
          'consName' : val
        };
        url = "addConstitute";
        $scope.ajaxAddFunction(items,url,name);
        return false
      }else if(name === '工序'){
        index = $('#input2').prop('selectedIndex')-1;
        if($scope.consId === undefined){
          $scope.consId = $scope.list1[0].id
        }
        items = {
          'consId' : $scope.consId , //构成类别id
          'nodeId' : $scope.select1[index].id  //选中户型id
        };
        url = "addConsAndNode";
        $scope.ajaxAddFunction(items,url,name);
        return false
      }else if(name === '工艺'){
        index = $('#input3').prop('selectedIndex')-1;
        if($scope.consId === undefined){
          $scope.consId = $scope.list1[0].id
        }
        items = {
          'proId' : item.select2[index].id ,
          'consId' : $scope.consId
        };
        url = "addConsAndPro";
        $scope.ajaxAddFunction(items,url,name);
      }
    }
  };
  $scope.ajaxAddFunction = function(items,url,name){
    $http({
      url: designerY + 'wishome-web/rest/' + url,
      // url: 'http://192.168.2.109:8080/wishome-web/rest/' + url,
      method:'GET',
      params:items
    }).success(function(data){
      var id,txt;
      txt = '新增成功！';
      if(name === "构成类别"){
        $scope.queryAllConstitute();
        $scope.showSuccessText(txt);
        $scope.hide(name);
        return false
      }else if(name === '工序'){
        id = {
          'id' : items.consId
        };
        $scope.ajaxGetContentView(id);
        $scope.showSuccessText(txt);
        $scope.hide(name);
        return false
      }else if(name === '工艺'){
        id = {
          'id' : items.consId
        };
        $scope.ajaxGetContentView(id);
        $scope.showSuccessText(txt);
        $scope.hide(name);
      }
    })
  };

  //点击删除
  $scope.delDataName = function(item,name){
    var items,url;
    if(name === '构成类别'){
      items = {
        'id' : item.id
      };
      url = 'deleteConstituteById';
      $scope.ajaxDelDataName(items,url,name);
      return false
    }else if(name === '工序'){
      if($scope.consId === undefined){
        $scope.consId = $scope.list1[0].id
      }
      items = {
        'consId' : $scope.consId ,
        'nodeId' : item.id
      };
      url = 'deleteConsAndNode';
      $scope.ajaxDelDataName(items,url,name);
      return false
    }else if(name === '工艺'){
      items = {
        'consId' : $scope.consId ,
        'proId' : item.id
      };
      url = 'deleteConsAndPro';
      $scope.ajaxDelDataName(items,url,name);
      return false
    }
  };
  $scope.ajaxDelDataName = function(item,url,name){
    $http({
      url: designerY + 'wishome-web/rest/' + url,
      method:'GET',
      params:item
    }).success(function(){
      var id,txt;
      txt = '删除成功！';
      if(name === '构成类别'){
        $scope.queryAllConstitute();
        $scope.showSuccessText(txt);
        return false
      }else if(name === '工序'){
        id = {
          'id' : item.consId
        };
        $scope.ajaxGetContentView(id);
        $scope.showSuccessText(txt);
        return false
      }else if(name === '工艺'){
        id = {
          'id' : item.consId
        };
        $scope.ajaxGetContentView(id);
        $scope.showSuccessText(txt);
        return false
      }
    })
  };
//  键盘保存
  $scope.changeKeyUp = function(e,item,index){
    var keycode = window.event?e.keyCode:e.which;
    if(keycode === 13){
      $scope.saveChangeName(item,index);
      return false;
    }
  };
  //监听鼠标
  $scope.inputKeyUp = function(e,item,name){
    var keycode = window.event?e.keyCode:e.which;
    if(keycode === 13){
      $scope.addFunction(this,name);
      return false;
    }
  };
  //修改成功提示
  $scope.showSuccessText = function(txt){
    $scope.successText = txt;
    $('#success').slideDown(800);
    $('#error').hide();
    $timeout(function(){
      $('#success').slideUp(800);
    },400);
  };
  //失败提示
  $scope.showErrorText = function (txt) {
    $scope.errorText = txt;
    $('#error').slideDown(800);
    $('#success').hide();
    $timeout(function(){
      $('#error').slideUp(800);
    },400);
  };

//   拖拽
  $scope.goList= function(){
    $scope.list = {
      'ui-floating':false,
      update:function(e,ui){
        $timeout(function(){
          var resArrNav = [];
          for(var i=0;i<$scope.list2.length;i++){
            $scope.list2[i].regoinAsc = i;
            resArrNav.push($scope.list2[i]);
          }
          $scope.resArrNav = resArrNav;
          var newResArrNav = $scope.resArrNav;
          if($scope.consId === undefined){
            $scope.consId = $scope.list1[0].id
          }
          var setNode = [];
          for(var a=0;a<newResArrNav.length;a++){
            var index = {
              'consId' : $scope.consId,
              'nodeId' : newResArrNav[a].id,
              'timeAsc' : a
            };
            setNode.push(index)
          }
          var setNodes = {
            "nodes" : angular.toJson(setNode)
          };
          $http({
            url:zheng + 'wishome-web/rest/updateNodeasc',
            contentType : 'application/json;charset=utf-8',
            dataType: "json",
            method:'POST',
            params:setNodes
          }).success(function(data){
            $scope.showSuccessText('修改成功！')
          })
        });
      }
    };
  };
  $scope.goList();
//  进入工艺
  $scope.goGongYi = function(){
    $state.go('typesetting.dataConstitute_Process')
  };
  //  进入工序
  $scope.goGongXu = function(){
    $state.go('typesetting.dataConstitute_GongXu')
  }
});
myApp.directive('ngPlaceholder', function() {
  return {
    restrict: 'A',
    scope: {
      placeholder: '=ngPlaceholder'
    },
    link: function(scope, elem, attr) {
      scope.$watch('placeholder',function() {
        elem[0].placeholder = scope.placeholder;
      });
    }
  }
});
