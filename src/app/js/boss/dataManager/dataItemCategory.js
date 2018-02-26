myApp.controller('dataItemCategoryCtrl',function($scope,$http,$state,$timeout){
  $scope.tdName = '项目类别';
  $scope.name1 = '项目类别';
  $scope.name2 = '户型';
  $scope.name3 = '区域名称';
  $scope.startStyle = function(){
    $scope.input = {
      'input': '修改名称',
      'inputStyle' : true,
      'input1' : '请输入项目类别名称',
      'inputStyle1' : true,
      'input2' : '请选择户型名称',
      'inputStyle2' : true ,
      'input3' : '请选择区域名称',
      'inputStyle3' : true
    };
  };
  $scope.startStyle();
  $scope.queryPrjtCate = function(){
    $http({
      url: designerY + 'wishome-web/rest/queryPrjtCate',
      // url: 'http://192.168.2.110:8080/wishome-web/rest/queryPrjtCate',
      method:'GET'
    }).success(function(data){
      $scope.list1 = data.list;
      $scope.list2 = data.list1;
      $scope.list3 = data.list2;
      $(".left ul:first-child").css('background','#fff');
      $scope.cateId = $scope.list1[0].prjtcateid;
      $scope.hstpId = $scope.list2[0].id;
    });
  };
  $scope.queryPrjtCate();

//  getContentView 获取户型
  $scope.getContentView = function(item,index){
    var thisStyle = $('.left li').eq(index);
    thisStyle.css('background','#fff');
    $('.left li').not(thisStyle).css('background','none');
    $scope.cateId = $scope.list1[index].prjtcateid;
    var items = {
      'id' : item.prjtcateid
    };
    $scope.ajaxGetContentView(items)
  };
  $scope.ajaxGetContentView = function(items){
    $http({
      url: designerY + 'wishome-web/rest/queryHstpById',
      // url: 'http://192.168.2.110:8080/wishome-web/rest/queryHstpById',
      method:'GET',
      params:items
    }).success(function(data){
      $scope.list2 = data.list;
      $scope.list3 = data.list2;
      $scope.hstpId = $scope.list2[0].id;
    })
  };

//  getRightView 获取区域名称
  $scope.getRightView = function(item,index){
    var thisStyle = $('.content li').eq(index);
    thisStyle.css('background','#fff');
    $('.content li').not(thisStyle).css('background','none');
    $scope.hstpId = $scope.list2[index].id;
    var items = {
      'id' : item.id
    };
    $scope.ajaxGetRightView(items);
  };
  $scope.ajaxGetRightView = function(items){
    $http({
      url: designerY + 'wishome-web/rest/queryRegoinById',
      method:'GET',
      params:items
    }).success(function(data){
      $scope.list3 = data.list;
    })
  };

//  新增项目类型、户型、区域名称
  $scope.addFunction = function(item,name){
    var items,url,val,index;
    if(name === '项目类别'){
      val = $('.input1').val();
    }else if(name === '户型'){
      if($('.input2 option:selected').html() === '请选择户型名称'){
        val = ''
      }else{
        val = $('.input2 option:selected').html()
      }
    }else if(name === '区域名称'){
      if($('.input3 option:selected').html() === '请选择区域名称'){
        val = ''
      }else{
        val = $('.input3 option:selected').html()
      }
    }
    if(val === ''){
      if(name === '项目类别'){
        $scope.input.input1 = '名称不能为空';
        $scope.input.inputStyle1 = false;
        return false
      }else if(name === '户型'){
        $scope.input.input2 = '请选择户型名称';
        $scope.input.inputStyle2 = false;
        return false
      }else if(name === '区域名称'){
        $scope.input.input3 = '请选择区域名称';
        $scope.input.inputStyle3 = false;
        return false
      }
    }else{
      if(name === '项目类别'){
        items = {
          'cateName' : val
        };
        url = "addPrjtCate";
        $scope.ajaxAddFunction(items,url,name);
        return false
      }else if(name === '户型'){
        index = $('#input2').prop('selectedIndex')-1;
        items = {
          'cateId' : $scope.cateId , //项目类型id
          'hstpId' : $scope.select1[index].id  //选中户型id
        };
        url = "addCateHstp";
        $scope.ajaxAddFunction(items,url,name);
        return false
      }else if(name === '区域名称'){
        index = $('#input3').prop('selectedIndex')-1;
        items = {
          'regoinId' : item.select2[index].id ,
          'hstpId' : $scope.hstpId
        };
        url = "addHR";
        $scope.ajaxAddFunction(items,url,name);
      }
    }
  };
  $scope.ajaxAddFunction = function(items,url,name){
    $http({
      url: designerY + 'wishome-web/rest/' + url,
      method:'GET',
      params:items
    }).success(function(data){
      var id,txt;
      txt = '新增成功！';
      if(name === "项目类别"){
        $scope.queryPrjtCate();
        $scope.showSuccessText(txt);
        $scope.hide(name);
        return false
      }else if(name === '户型'){
        id = {
          'id' : items.cateId
        };
        $scope.ajaxGetContentView(id);
        $scope.showSuccessText(txt);
        $scope.hide(name);
        return false
      }else if(name === '区域名称'){
        id = {
          'id' : items.hstpId
        };
        $scope.ajaxGetRightView(id);
        $scope.showSuccessText(txt);
        $scope.hide(name);
      }
    })
  };

//  获取户型区域名称下拉框
  $scope.getHuXingAndRoomName = function(name){
    var url;
    if(name === "户型"){
      $scope.contentBtn = false;
      url = 'queryHstpCate'
    }else if(name === "区域名称"){
      $scope.rightBtn = false;
      url = 'queryRegoinTable'
    }
    $http({
      url: designerY + 'wishome-web/rest/' + url,
      method:'GET'
    }).success(function(data){
      if(name === '户型'){
        $scope.select1 = data.list;
        return false
      }else if(name === '区域名称'){
        $scope.select2 = data.list;
        return false
      }
    })
  };
//  取消新增名称
  $scope.hide = function(name){
    if(name === "项目类别"){
      $('.input1').val('');
      $scope.startStyle();
      $scope.leftBtn = true;
      return false
    }else if(name === '户型'){
      $('.input2').val('');
      $scope.startStyle();
      $scope.contentBtn = true;
      return false
    }else if(name === "区域名称"){
      $('.input3').val('');
      $scope.startStyle();
      $scope.rightBtn = true;
    }
  };

//  修改项目类别名称
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
        if(text === item.list1[n].prjtcatename){
          txt = '该名称已存在！';
          $scope.showErrorText(txt);
          return false
        }else{
          var items = {
            'cateName' : text,
            'id' : item.data.prjtcateid
          };
          $http({
            url:  designerY + 'wishome-web/rest/upPrjtCate',
            method:'GET',
            params:items
          }).success(function(){
            $scope.hideChangeName(item);
            var txt = '修改成功！';
            $scope.showSuccessText(txt);
            $scope.queryPrjtCate();
          });
          return false
        }
      }
    }
  };
//  键盘保存
  $scope.changeKeyUp = function(e,item,index){
    var keycode = window.event?e.keyCode:e.which;
    if(keycode === 13){
      $scope.saveChangeName(item,index);
      return false;
    }
  };
//  取消修改名称
  $scope.hideChangeName = function(item){
    item.leftIconShow = true;
    item.changeSpan = false;
  };

  //点击删除
  $scope.delDataName = function(item,name){
    var items,url;
    if(name === '项目类别'){
      items = {
        'id' : item.prjtcateid
      };
      url = 'deletePrjtCate';
      $scope.ajaxDelDataName(items,url,name);
      return false
    }else if(name === '户型'){

      items = {
        'cateId' : $scope.cateId ,
        'hstpId' : item.id
      };
      url = 'deleteCateHstp';
      $scope.ajaxDelDataName(items,url,name);
      return false
    }else if(name === '区域名称'){
      items = {
        'hstpId' : $scope.hstpId ,
        'regoinId' : item.id
      };
      url = 'deleteHR';
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
      if(name === '项目类别'){
        $scope.queryPrjtCate();
        $scope.showSuccessText(txt);
        return false
      }else if(name === '户型'){
        id = {
          'id' : item.cateId
        };
        $scope.ajaxGetContentView(id);
        $scope.showSuccessText(txt);
        return false
      }else if(name === '区域名称'){
        id = {
          'id' : item.hstpId
        };
        $scope.ajaxGetRightView(id);
        $scope.showSuccessText(txt);
        return false
      }
    })
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

  //  查看所有户型
  $scope.goHuXing = function(){
    $state.go('typesetting.dataHuXing')
  };

//  查看所有区域名称
  $scope.goRoomName = function(){
    $state.go('typesetting.dataRoomName')
  };

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
