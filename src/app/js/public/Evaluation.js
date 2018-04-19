myApp.directive('myEvaluation',function(){
  return {
    restrict: 'EA',
    templateUrl: 'public/Evaluation.html',
    replace: true,
    controller: function ($scope,$http,$timeout,$state) {

      $scope.items = [
        {num:0},
        {num:0},
        {num:0},
        {num:0},
        {num:0}
      ];

      $scope.startNum = 0;
      $scope.start1Click = false;
      $scope.start2Click = false;
      $scope.start3Click = false;
      $scope.start4Click = false;
      $scope.start5Click = false;

      $scope.start1Text = "请为客服态度打分";
      $scope.start2Text = "请为技术能力打分";
      $scope.start3Text = "请为准时交货打分";
      $scope.start4Text = "请为产品质量打分";
      $scope.start5Text = "请为送货安装打分";


      for(var i=0;i<5;i++){
        //鼠标移入移除
        //start1
        $(".start1 label").eq(i).mouseover(function(i){
          var item = $(".start1 .span");
          $scope.mouseOverChangeText(this,item)
        });
        $(".start1 label").eq(i).mouseleave(function(i){
          if($scope.start1Click === true){
            $(".start1 .span").html($scope.start1Text);
            return false
          }else if($scope.start1Click === false){
            var item = $(".start1 .span");
            var text = "客服态度";
            $scope.mouseLeaveChangeText(item,text)
          }
        });
        //  start1鼠标点击
        $(".start1 label").eq(i).click(function(i){
          if($scope.start1Click === false){
            $("#errorStartNum").slideUp();
          }
          $scope.start1Click = true;
          if(this.title === '20'){
            $scope.start1Text = "很好"
          }else if(this.title === '15'){
            $scope.start1Text = "好"
          }else if(this.title === '10'){
            $scope.start1Text = "一般"
          }else if(this.title === '5'){
            $scope.start1Text = "差"
          }else if(this.title === '0'){
            $scope.start1Text = "很差"
          }
          $scope.items[0].num = this.title;
          console.log($scope.items)
        });

        //start2
        $(".start2 label").eq(i).mouseover(function(i){
          var item = $(".start2 .span");
          $scope.mouseOverChangeText(this,item)
        });
        $(".start2 label").eq(i).mouseleave(function(i){
          if($scope.start2Click === true){
            $(".start2 .span").html($scope.start2Text);
            return false
          }else if($scope.start2Click === false){
            var item = $(".start2 .span");
            var text = "技术能力";
            $scope.mouseLeaveChangeText(item,text)
          }
        });
        //  start2鼠标点击
        $(".start2 label").eq(i).click(function(i){
          if($scope.start2Click === false){
            $("#errorStartNum").slideUp();
          }
          $scope.start2Click = true;
          if(this.title === '20'){
            $scope.start2Text = "很好"
          }else if(this.title === '15'){
            $scope.start2Text = "好"
          }else if(this.title === '10'){
            $scope.start2Text = "一般"
          }else if(this.title === '5'){
            $scope.start2Text = "差"
          }else if(this.title === '0'){
            $scope.start2Text = "很差"
          }
          $scope.items[1].num = this.title;
        });

        //start3
        $(".start3 label").eq(i).mouseover(function(i){
          var item = $(".start3 .span");
          $scope.mouseOverChangeText(this,item)
        });
        $(".start3 label").eq(i).mouseleave(function(i){
          if($scope.start3Click === true){
            $(".start3 .span").html($scope.start3Text);
            return false
          }else if($scope.start3Click === false){
            var item = $(".start3 .span");
            var text = "准时交货";
            $scope.mouseLeaveChangeText(item,text)
          }
        });
        //  start3鼠标点击
        $(".start3 label").eq(i).click(function(i){
          if($scope.start3Click === false){
            $("#errorStartNum").slideUp();
          }
          $scope.start3Click = true;
          if(this.title === '20'){
            $scope.start3Text = "很好"
          }else if(this.title === '15'){
            $scope.start3Text = "好"
          }else if(this.title === '10'){
            $scope.start3Text = "一般"
          }else if(this.title === '5'){
            $scope.start3Text = "差"
          }else if(this.title === '0'){
            $scope.start3Text = "很差"
          }
          $scope.items[2].num = this.title;
        });

        //start4
        $(".start4 label").eq(i).mouseover(function(i){
          var item = $(".start4 .span");
          $scope.mouseOverChangeText(this,item)
        });
        $(".start4 label").eq(i).mouseleave(function(i){
          if($scope.start4Click === true){
            $(".start4 .span").html($scope.start4Text);
            return false
          }else if($scope.start4Click === false){
            var item = $(".start4 .span");
            var text = "产品质量";
            $scope.mouseLeaveChangeText(item,text)
          }
        });
        //  start4鼠标点击
        $(".start4 label").eq(i).click(function(i){
          if($scope.start4Click === false){
            $("#errorStartNum").slideUp();
          }
          $scope.start4Click = true;
          if(this.title === '20'){
            $scope.start4Text = "很好"
          }else if(this.title === '15'){
            $scope.start4Text = "好"
          }else if(this.title === '10'){
            $scope.start4Text = "一般"
          }else if(this.title === '5'){
            $scope.start4Text = "差"
          }else if(this.title === '0'){
            $scope.start4Text = "很差"
          }
          $scope.items[3].num = this.title;
        });

        //start5
        $(".start5 label").eq(i).mouseover(function(i){
          var item = $(".start5 .span");
          $scope.mouseOverChangeText(this,item)
        });
        $(".start5 label").eq(i).mouseleave(function(i){
          if($scope.start5Click === true){
            $(".start5 .span").html($scope.start5Text);
            return false
          }else if($scope.start5Click === false){
            var item = $(".start5 .span");
            var text = "送货安装";
            $scope.mouseLeaveChangeText(item,text)
          }
        });
        //  start5鼠标点击
        $(".start5 label").eq(i).click(function(i){
          if($scope.start5Click === false){
            $("#errorStartNum").slideUp();
          }
          $scope.start5Click = true;
          if(this.title === '20'){
            this.title = 20;
            $scope.start5Text = "很好"
          }else if(this.title === '15'){
            this.title = 15;
            $scope.start5Text = "好"
          }else if(this.title === '10'){
            this.title = 10;
            $scope.start5Text = "一般"
          }else if(this.title === '5'){
            this.title = 5;
            $scope.start5Text = "差"
          }else if(this.title === '0'){
            this.title = 0;
            $scope.start5Text = "很差"
          }
          $scope.items[4].num = this.title;
        });
      }

      $scope.mouseOverChangeText = function(t,item){
        if(t.title === '20'){
          item.html('很好')
        }else if(t.title === '15'){
          item.html('好')
        }else if(t.title === '10'){
          item.html('一般')
        }else if(t.title === '5'){
          item.html('差')
        }else if(t.title === '0'){
          item.html('很差')
        }
        $scope.startNum = t.title
      };

      //鼠标开
      $scope.mouseLeaveChangeText = function(item,text){
        item.html('请为'+ text +'打分')
      };

    //  发送评价
      $scope.setStartNum = function(item){
        if(item.start1Click === false || item.start2Click === false || item.start3Click === false || item.start4Click === false || item.start5Click === false){
          $("#errorStartNum").slideDown();
        }else{
          console.log($scope);
          $("#errorStartNum").slideUp();
          var text = "正在提交评价...";
          $scope.loaddingShow(text);
          var data = {
            "customerService" :  $scope.items[0].num,      //客服态度
            "technicalAblity" : $scope.items[1].num ,     //技术能力
            "punctualDelivery" : $scope.items[2].num,    //准时交货
            "productQuality" : $scope.items[3].num ,  //产品质量
            "deliveryInstallation" : $scope.items[4].num,    //送货安装
            "prjtId" : $scope.PrjtList.prjtid ,    //项目ID
            "evaluateMemo" : $(".textarea").val(),  //评价内容
            "evaluateCount" : $(".allStart span").html()    //评价总分
          };
          $timeout(function(){
            $scope.addDesignerEvaluate(data)
          },1000)
        }
      };

      $scope.addDesignerEvaluate = function(item){
        $http({
          url: managerY +  'wishome-web/rest/addDesignerEvaluate',
          method:'get',
          params:item
        }). success(function(data){
          var text;
          if(data.data === 200){
            text = "评价提交成功！";
            $scope.loaddingShow(text);
            $timeout(function(){
              var id =  id = {
                'prjtid': item.prjtId
              };
              $scope.QuerySigCount(id);
              $scope.loaddingHide();
            },1500)
          }else if(data.data === 500){
            text = "评价提交失败！";
            $scope.loaddingShow(text);
          }
        })
      }

    }
  }
});

myApp.filter('startNumFilter',function(){
  return function(input){
    if(!input)return [];
    var sum = 0,
      i = input.length - 1;

    for(; i >= 0; i--) {
      sum += parseInt(input[i].num);
    }
    return sum;
  };
});
