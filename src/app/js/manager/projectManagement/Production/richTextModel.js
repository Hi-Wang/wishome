myApp.directive('richTextModel',function(){
  return{
    restrict:'EA',
    templateUrl:'manager/projectManagement/Production/richTextModel.html',
    replace:true,
    controller: function($scope){
      console.log('富文本编辑器框框');
      $scope.editImgCancel = function(){
        $scope.richText = false
      };
      $scope.editImgModelHide = function(){
        $scope.richText = false
      };

      $scope.richTextCanvas = function(url){
        $scope.liIconStyle1 = true;
        $scope.liIconStyle2 = true;
        var myCanvas = document.getElementById('myCanvas');
        var context = myCanvas.getContext('2d');
        var img = new Image();

        img.src = url;
        img.onload = function(){
          var div_width = $("#myCanvas").width();
          var old_width = img.width;
          var old_height = img.height;
          var scale_x=div_width*old_width/old_height;
          var scale_y=div_width*old_height/old_width;
          if(old_height>old_width){
            context.drawImage(img, 0, 0, old_width,old_height,0,-(scale_y-div_width)/2,div_width,scale_y);
          }else {
            context.drawImage(img, 0, 0, old_width,old_height,-(scale_x-div_width)/2,0,scale_x,div_width);
          }
        }
      };

    //  绘制箭头
      $scope.arrow = function(){
        var beginPoint = {},
          stopPoint = {},
          polygonVertex = [],
          CONST = {
            edgeLen: 50,
            angle: 25
          };
        //封装的作图对象
        var Plot = {
          angle: "",
          //在CONST中定义的edgeLen以及angle参数
          //短距离画箭头的时候会出现箭头头部过大，修改：
          dynArrowSize: function() {
            var x = stopPoint.x - beginPoint.x,
              y = stopPoint.y - beginPoint.y,
              length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            if (length < 250) {
              CONST.edgeLen = CONST.edgeLen/2;
              CONST.angle = CONST.angle/2;
            }
            else if(length<500){
              CONST.edgeLen=CONST.edgeLen*length/500;
              CONST.angle=CONST.angle*length/500;
            }
            // console.log(length);
          },
          //getRadian 返回以起点与X轴之间的夹角角度值
          getRadian: function(beginPoint, stopPoint) {
            Plot.angle = Math.atan2(stopPoint.y - beginPoint.y, stopPoint.x - beginPoint.x) / Math.PI * 180;
            console.log(Plot.angle);
            paraDef(50,25);
            Plot.dynArrowSize();
          },

          ///获得箭头底边两个点
          arrowCoord: function(beginPoint, stopPoint) {
            polygonVertex[0] = beginPoint.x;
            polygonVertex[1] = beginPoint.y;
            polygonVertex[6] = stopPoint.x;
            polygonVertex[7] = stopPoint.y;
            Plot.getRadian(beginPoint, stopPoint);
            polygonVertex[8] = stopPoint.x - CONST.edgeLen * Math.cos(Math.PI / 180 * (Plot.angle + CONST.angle));
            polygonVertex[9] = stopPoint.y - CONST.edgeLen * Math.sin(Math.PI / 180 * (Plot.angle + CONST.angle));
            polygonVertex[4] = stopPoint.x - CONST.edgeLen * Math.cos(Math.PI / 180 * (Plot.angle - CONST.angle));
            polygonVertex[5] = stopPoint.y - CONST.edgeLen * Math.sin(Math.PI / 180 * (Plot.angle - CONST.angle));
          },

          //获取另两个底边侧面点
          sideCoord: function() {
            var midpoint = {};
            // midpoint.x = polygonVertex[6] - (CONST.edgeLen * Math.cos(Plot.angle * Math.PI / 180));
            // midpoint.y = polygonVertex[7] - (CONST.edgeLen * Math.sin(Plot.angle * Math.PI / 180));
            midpoint.x=(polygonVertex[4]+polygonVertex[8])/2;
            midpoint.y=(polygonVertex[5]+polygonVertex[9])/2;
            polygonVertex[2] = (polygonVertex[4] + midpoint.x) / 2;
            polygonVertex[3] = (polygonVertex[5] + midpoint.y) / 2;
            polygonVertex[10] = (polygonVertex[8] + midpoint.x) / 2;
            polygonVertex[11] = (polygonVertex[9] + midpoint.y) / 2;
          },

          //画箭头
          drawArrow: function() {
            var ctx;
            var myCanvas = document.getElementById('myCanvas');
            ctx = myCanvas.getContext('2d');
            // ctx = $(".drawArrow")[0].getContext('2d');
            // ctx = img;
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.moveTo(polygonVertex[0], polygonVertex[1]);
            ctx.lineTo(polygonVertex[2], polygonVertex[3]);
            ctx.lineTo(polygonVertex[4], polygonVertex[5]);
            ctx.lineTo(polygonVertex[6], polygonVertex[7]);
            ctx.lineTo(polygonVertex[8], polygonVertex[9]);
            ctx.lineTo(polygonVertex[10], polygonVertex[11]);
            // ctx.lineTo(polygonVertex[0], polygonVertex[1]);
            ctx.closePath();
            ctx.fill();
          }
        };

        //记录起点beginPoint
        var Point;
        $(".drawArrow").mousedown(function(e) {
          Point = true;
          beginPoint.x = e.pageX;
          beginPoint.y = e.pageY;

          console.log(beginPoint.x);
          console.log(beginPoint.y)
          // $(".drawArrow").mousemove = function(e){
          //   if(Point){
          //     stopPoint.x = e.pageX;
          //     stopPoint.y = e.pageY;
          //     console.log(stopPoint.x);
          //     Plot.arrowCoord(beginPoint, stopPoint);
          //     Plot.sideCoord();
          //     Plot.drawArrow();
          //   }
          // };
          // alert(beginPoint.x+"+"+beginPoint.y);
        });


        //记录终点stopPoint，绘图
        $(".drawArrow").mouseup(function(e) {
          Point = false;
          stopPoint.x = e.pageX;
          stopPoint.y = e.pageY;
          // alert(stopPoint.x+"+"+stopPoint.y);
          Plot.arrowCoord(beginPoint, stopPoint);
          Plot.sideCoord();
          Plot.drawArrow();
        });

        // 自定义参数
        function paraDef(edgeLen, angle) {
          CONST.edgeLen = edgeLen;
          CONST.angle = angle;
        }
      };

      //点击绘制箭头
      $scope.drawArrows = function(item){
        console.log(item);
        $scope.arrow();
        $scope.liIconStyle1 = false
      };

      //点击取消绘制箭头
      $scope.noDrawArrows = function(item){
        console.log(item);
        $scope.liIconStyle1 = true
      };

    //  点击添加文字
      $scope.drawText = function(item){
        $scope.liIconStyle2 = false
      };

      //  点击取消添加文字
      $scope.noDrawText = function(item){
        $scope.liIconStyle2 = true
      }

    }
  }
});
