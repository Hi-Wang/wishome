myApp.controller('onlyOneDescriptionCtrl',function($scope,$state,$stateParams, $rootScope){
  var name = [];
  name = $stateParams.name.split("/");
  $scope.onlyOneName = $stateParams.name;
  $scope.h3Name = name[1].h3Name;
  console.log(name[1]);
  //项目经理
  if(name[1] === '如何申请报价'){
    $scope.DescriptionList = [
      {'liName' : '1、点击导航栏【报价】,进入报价项目列表。', 'img' : '../images/Description/M/quote/M_quote_Description_01.png'},
      {'liName' : '2、点击【编辑】，进入项目详情页面报价。', 'img' : '../images/Description/M/quote/M_quote_Description_02.png'},
      {'liName' : '3、按照示例图指示填写单个产品的报价信息，金额，备注等。', 'img' : '../images/Description/M/quote/M_quote_Description_03.png'},
      {'liName' : '4、按照示例图指示对整个项目的通用报价信息填写。', 'img' : '../images/Description/M/quote/M_quote_Description_04.png'},
      {'liName' : '5、点击【报价完成】，完成该项目的报价，注意：总项目价格为空时，无法完成报价。', 'img' : '../images/Description/M/quote/M_quote_Description_05.png'},
      {'liName' : '6、报价完成之后，自动跳转报价项目列表，除设计师再次询价外，不可再次报价，可点击【查看】，进入项目详情。', 'img' : '../images/Description/M/quote/M_quote_Description_06.png'}
    ]
  }else if(name[1] === '如何下单至工厂'){
    $scope.DescriptionList = [
      {'liName' : '1、点击导航栏【下单】,进入下单项目列表。', 'img' : '../images/Description/M/Order/M_order_Description_01.png'},
      {'liName' : '2、点击【编辑】，进入需要下单项目的详情页面。', 'img' : '../images/Description/M/Order/M_order_Description_02.png'},
      {'liName' : '3、点击【编辑】，对单个产品的工艺和工序进行编辑。', 'img' : '../images/Description/M/Order/M_order_Description_03.png'},
      {'liName' : '4、如图，对单个产品选择构成类别以及上传产品图片。', 'img' : '../images/Description/M/Order/M_order_Description_04.png'},
      {'liName' : '5、预计产品时间节点结束时间，按图所示删除节点，新增节点。', 'img' : '../images/Description/M/Order/M_order_Description_05.png'},
      {'liName' : '6、选择需要下单的产品，点击【下单】', 'img' : '../images/Description/M/Order/M_order_Description_06.png'},
      {'liName' : '7、选择生产工厂，并选择预计完成时间，若不选择，默认为2个月。', 'img' : '../images/Description/M/Order/M_order_Description_07.png'}
    ]
  }else if(name[1] === '如何查看项目进度'){
    $scope.DescriptionList = [
      {'liName' : '1、点击导航栏【进度】,进入进度项目列表。', 'img' : '../images/Description/M/schedule/M_schedule_Description_01.png'},
      {'liName' : '2、点击【查看】，进入项目详情页面。', 'img' : '../images/Description/M/schedule/M_schedule_Description_02.png'},
      {'liName' : '3、点击【查看】，可以查看单个产品的时间节点进度和项目经理预计完成时间进度图。', 'img' : '../images/Description/M/schedule/M_schedule_Description_03.png'},
      {'liName' : '4、单个产品的时间节点进度和项目经理预计完成时间进度图。', 'img' : '../images/Description/M/schedule/M_schedule_Description_04.png'}
    ]
  }

  //设计师 或者 未认证设计师
  else if(name[1] === '如何认证设计师'){
    $scope.DescriptionList = [
      {'liName' : '1、进入首页，先选择想要加入的设计师之家，点击【立即加入】。（注意：认证设计师之前，需要先通过真实姓名和手机号认证）。', 'img' : '../images/Description/noD/Certification/M_Certification_Description_01.png'},
      {'liName' : '2、如图所示，点击【查看更多】 或者【去认证】。进入个人页面认证。', 'img' : '../images/Description/noD/Certification/M_Certification_Description_02.png'},
      {'liName' : '3、如图所示，设置手机号和真实姓名', 'img' : '../images/Description/noD/Certification/M_Certification_Description_03.png'},
      {'liName' : '4、手机号和真实姓名设置成功后，操作步骤（1），点击【立即认证】。', 'img' : '../images/Description/noD/Certification/M_Certification_Description_04.png'},
      {'liName' : '5、出现弹框，点击【确定】，即已经向该设计师之家发送认证请求。', 'img' : '../images/Description/noD/Certification/M_Certification_Description_05.png'},
      {'liName' : '6、成功发送请求，请耐心等待设计师之家的回复。', 'img' : '../images/Description/noD/Certification/M_Certification_Description_06.png'}
    ]
  }
  else if(name[1] === '如何新建项目'){
    console.log($rootScope);
    if($rootScope.Identity === "未认证设计师"){
      $scope.DescriptionList = [
        {'liName' : '1、点击导航栏【立项】,进入立项项目列表。', 'img' : '../images/Description/noD/Project/M_Project_Description_01.png'},
        {'liName' : '2、点击【新建项目】按钮，弹出新建项目弹框。', 'img' : '../images/Description/noD/Project/M_Project_Description_02.png'},
        {'liName' : '3、按照图示填写新建项目信息，点击【完成】，即新建项目完成。', 'img' : '../images/Description/noD/Project/M_Project_Description_03.png'},
        {'liName' : '4、新建项目完成，点击【编辑】，对项目进行更多操作。', 'img' : '../images/Description/noD/Project/M_Project_Description_04.png'}
      ]
    }else if($rootScope.Identity === '设计师'){
      $scope.DescriptionList = [
        {'liName' : '1、点击导航栏【立项】,进入立项项目列表。', 'img' : '../images/Description/D/Project/M_Project_Description_01.png'},
        {'liName' : '2、点击【新建项目】按钮，弹出新建项目弹框。', 'img' : '../images/Description/D/Project/M_Project_Description_02.png'},
        {'liName' : '3、按照图示填写新建项目信息，点击【完成】，即新建项目完成。', 'img' : '../images/Description/D/Project/M_Project_Description_03.png'}
      ]
    }
  }
  else if(name[1] === '如何修改项目基本信息'){
    if($rootScope.Identity === "未认证设计师"){
      $scope.DescriptionList = [
        {'liName' : '1、进入系统 --->  点击【立项】，进入立项项目列表 ----> 点击【编辑】,进入项目详情页面 ----> 点击【项目修改按钮】按钮，弹出项目信息弹框。', 'img' : '../images/Description/noD/changeProject/M_changeProject_Description_01.png'},
        {'liName' : '2、按照图示点击【完成】，即完成修改。', 'img' : '../images/Description/noD/changeProject/M_changeProject_Description_02.png'}
      ]
    }else if($rootScope.Identity === "设计师"){
      $scope.DescriptionList = [
        {'liName' : '1、进入系统 --->  点击【立项】，进入立项项目列表，点击【编辑】。', 'img' : '../images/Description/D/addRoom/M_addRoom_Description_01.png'},
        {'liName' : '2、点击【项目修改按钮】按钮，弹出项目信息弹框。', 'img' : '../images/Description/D/changeProject/M_changeProject_Description_01.png'},
        {'liName' : '3、按照图示点击【完成】，即完成修改。', 'img' : '../images/Description/D/changeProject/M_changeProject_Description_02.png'}
      ]
    }

  }
  else if(name[1] === '如何编辑项目区域'){
    if($rootScope.Identity === "未认证设计师"){
      $scope.DescriptionList = [
        {'liName' : '1、进入系统 --->  点击【立项】，进入立项项目列表，点击【编辑】，进入项目详情页面 ----> 点击【新增区域】按钮，弹出弹框。', 'img' : '../images/Description/noD/addRoom/M_addRoom_Description_02.png'},
        {'liName' : '2、按照图示填写新建区域名称，并保存。', 'img' : '../images/Description/noD/addRoom/M_addRoom_Description_03.png'},
        {'liName' : '3、点击确定后，展示刚刚新增的区域名称，点击图示按钮，出现弹框，对项目区域进行编辑。', 'img' : '../images/Description/noD/addRoom/M_addRoom_Description_04.png'},
        {'liName' : '4、根据图片提示，对区域进行增加、删除、修改、拖拽排序的操作。', 'img' : '../images/Description/noD/addRoom/M_addRoom_Description_05.png'}
      ]
    }else if($rootScope.Identity === "设计师"){
      $scope.DescriptionList = [
        {'liName' : '1、进入系统 --->  点击【立项】，进入立项项目列表，点击【编辑】。', 'img' : '../images/Description/D/addRoom/M_addRoom_Description_01.png'},
        {'liName' : '2、点击【新增区域】按钮，弹出弹框。', 'img' : '../images/Description/D/addRoom/M_addRoom_Description_02.png'},
        {'liName' : '3、按照图示填写新建区域名称，并保存。', 'img' : '../images/Description/D/addRoom/M_addRoom_Description_03.png'},
        {'liName' : '4、点击确定后，展示刚刚新增的区域名称，点击图示按钮，出现弹框，对项目区域进行编辑。', 'img' : '../images/Description/D/addRoom/M_addRoom_Description_04.png'},
        {'liName' : '5、根据图片提示，对区域进行增加、删除、修改、拖拽排序的操作。', 'img' : '../images/Description/D/addRoom/M_addRoom_Description_05.png'}
      ]
    }
  }
  else if(name[1] === '如何编辑项目产品'){
    if($rootScope.Identity === "未认证设计师"){
      $scope.DescriptionList = [
        {'liName' : '1、进入系统 ---->  点击【立项】，进入立项项目列表 ---->  点击【编辑】，进入项目详情页面 ----> 点击【新增产品】。', 'img' : '../images/Description/noD/addProduct/M_addProduct_Description_01.png'},
        {'liName' : '2、进入新增产品页面，按照图示填写新增产品信息(注意选填和必填项)，若不上传产品图片，之间点击【新增】按钮即可。', 'img' : '../images/Description/noD/addProduct/M_addProduct_Description_02.png'},
        {'liName' : '3、若需要上传图片，即点击上传图片（如图已经上传了一张图片），鼠标指向图片展示功能，功能如图所示，若不需要对图片进行编辑，点击【新增】按钮，即可新增产品。', 'img' : '../images/Description/noD/addProduct/M_addProduct_Description_03.png'},
        {'liName' : '4、若需要对图片进行编辑，则点击上图图片编辑字样，出现图片编辑弹框，按下图进行操作，点击保存即可。', 'img' : '../images/Description/noD/addProduct/M_addProduct_Description_04.png'},
        {'liName' : '5、保存后，页面跳入项目详情页面，可以看见新增的产品，鼠标指向产品，可对产品进行如图操作。', 'img' : '../images/Description/noD/addProduct/M_addProduct_Description_05.png'},
        {'liName' : '6、点击灰色部分，弹出产品基本信息及产品大图，可进行编辑和删除操作。', 'img' : '../images/Description/noD/addProduct/M_addProduct_Description_06.png'},
        {'liName' : '7、点击【编辑】按钮，进入产品编辑页面，可进行如图修改，修改完成后，点击【更新】，进行保存。', 'img' : '../images/Description/noD/addProduct/M_addProduct_Description_07.png'}
      ]
    }else if($rootScope.Identity === "设计师"){
        $scope.DescriptionList = [
          {'liName' : '1、进入系统 ---->  点击【立项】，进入立项项目列表 ---->  点击【编辑】，进入项目详情页面 ----> 点击【新增产品】。', 'img' : '../images/Description/D/addProduct/M_addProduct_Description_01.png'},
          {'liName' : '2、进入新增产品页面，按照图示填写新增产品信息(注意选填和必填项)，若不上传产品图片，之间点击【新增】按钮即可。', 'img' : '../images/Description/D/addProduct/M_addProduct_Description_02.png'},
          {'liName' : '3、若需要上传图片，即点击上传图片（如图已经上传了一张图片），鼠标指向图片展示功能，功能如图所示，若不需要对图片进行编辑，点击【新增】按钮，即可新增产品。', 'img' : '../images/Description/D/addProduct/M_addProduct_Description_03.png'},
          {'liName' : '4、若需要对图片进行编辑，则点击上图图片编辑字样，出现图片编辑弹框，按下图进行操作，点击保存即可。', 'img' : '../images/Description/D/addProduct/M_addProduct_Description_04.png'},
          {'liName' : '5、保存后，页面跳入项目详情页面，可以看见新增的产品，鼠标指向产品，可对产品进行如图操作。', 'img' : '../images/Description/D/addProduct/M_addProduct_Description_05.png'},
          {'liName' : '6、点击灰色部分，弹出产品基本信息及产品大图，可进行编辑和删除操作。', 'img' : '../images/Description/D/addProduct/M_addProduct_Description_06.png'},
          {'liName' : '7、点击【编辑】按钮，进入产品编辑页面，可进行如图修改，修改完成后，点击【更新】，进行保存。', 'img' : '../images/Description/D/addProduct/M_addProduct_Description_07.png'}
        ]
    }
  }
  else if(name[1] === '如何申请询价'){
    if($rootScope.Identity === "未认证设计师"){
      $scope.DescriptionList = [
        {'liName' : '1、进入系统 ---->  点击【立项】，进入立项项目列表 ---->  点击【编辑】，进入项目详情页面 ----> 点击【立即询价】。', 'img' : '../images/Description/noD/askPrice/M_askPrice_Description_01.png'},
        {'liName' : '2、按照图示操作，可以进行导出Excel操作，点击【询价】，进入询价弹框。', 'img' : '../images/Description/noD/askPrice/M_askPrice_Description_02.png'},
        {'liName' : '3、按照图示操作，点击【立即询价】即完成申请项目询价。', 'img' : '../images/Description/noD/askPrice/M_askPrice_Description_03.png'}
      ]
    }else if($rootScope.Identity === "设计师"){
      $scope.DescriptionList = [
        {'liName' : '1、进入系统 ---->  点击【立项】，进入立项项目列表 ---->  点击【编辑】，进入项目详情页面 ----> 点击【立即询价】。', 'img' : '../images/Description/D/askPrice/M_askPrice_Description_01.png'},
        {'liName' : '2、按照图示操作，可以进行导出Excel操作，点击【询价】，进入询价弹框。', 'img' : '../images/Description/D/askPrice/M_askPrice_Description_02.png'},
        {'liName' : '3、按照图示操作，点击【立即询价】即完成申请项目询价。', 'img' : '../images/Description/D/askPrice/M_askPrice_Description_03.png'},
        {'liName' : '4、询价成功后，跳转询价项目列表，点击【查看】，可查看询价项目详情。', 'img' : '../images/Description/D/askPrice/M_askPrice_Description_04.png'}
      ]
    }

  }
  else if(name[1] === '如何签约项目'){
    $scope.DescriptionList = [
      {'liName' : '1、首先签约项目需要在项目经理报价结束之后，进入系统 ---->  点击【询价】，进入询价项目列表 ---->  点击【查看】（注意：项目状态为【询价结束】时才可以签约项目）。', 'img' : '../images/Description/D/Signing/M_Signing_Description_01.png'},
      {'liName' : '2、进入项目详情页面，点击【立即签约】，更多功能请看图示介绍', 'img' : '../images/Description/D/Signing/M_Signing_Description_02.png'},
      {'liName' : '3、进入项目详情页面，点击【立即签约】，更多功能请看图示介绍', 'img' : '../images/Description/D/Signing/M_Signing_Description_03.png'},
      {'liName' : '4、签约完成，页面跳转至签约项目列表，此时项目状态改变为【签约】，点击【查看】，可以查看签约项目详情。', 'img' : '../images/Description/D/Signing/M_Signing_Description_04.png'}
    ]
  }
  else if(name[1] === '历史项目是什么'){
    $scope.DescriptionList = [
      // {'liName' : '1、首先签约项目需要在项目经理报价结束之后，进入系统 ---->  点击【询价】，进入询价项目列表 ---->  点击【查看】（注意：项目状态为【询价结束】时才可以签约项目）。', 'img' : '../images/Description/D/Signing/M_Signing_Description_01.png'},
      // {'liName' : '2、进入项目详情页面，点击【立即签约】，更多功能请看图示介绍', 'img' : '../images/Description/D/Signing/M_Signing_Description_02.png'},
      // {'liName' : '3、进入项目详情页面，点击【立即签约】，更多功能请看图示介绍', 'img' : '../images/Description/D/Signing/M_Signing_Description_03.png'},
      // {'liName' : '4、签约完成，页面跳转至签约项目列表，此时项目状态改变为【签约】，点击【查看】，可以查看签约项目详情。', 'img' : '../images/Description/D/Signing/M_Signing_Description_04.png'}
    ]
  }
  // console.log(name)
});
