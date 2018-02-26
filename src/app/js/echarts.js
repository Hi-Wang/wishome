/**
 * Created by ASUS on 2017/9/27.
 */
//甘特图指令
myApp.directive('managerEcharts',function(){
  return{
    restrict:'EA',
    replace:true,
    templateUrl:'manager/managerEcharts.html',
    controller:function($scope){
      $scope.cancelModel = function(){
        $scope.managerEcharts = false;
      }
    }
  }
});
myApp.directive('echartModel',function(){
  return{
    controller:function($scope,$http){
      var myChart = echarts.init(document.getElementsByTagName('canvas')[0]);
      myChart.clear();
      myChart.setOption({
        color: ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
          '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
          '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
          '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
        title:{
          // text:'Echarts示例',
          // subtext:'副标题',
          top:'top',
          x: 'center',
          y: 'top',
          textAlign: null,
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',
          borderWidth: 0,
          padding: 5,
          itemGap: 10
        },
        tooltip:{
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          show:true,
          showContent:true,
          confine:true,
          trigger:'axis',
          showDelay: 20,
          hideDelay: 100,
          transitionDuration : 0.4,
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderColor: '#333',
          borderRadius: 4,
          borderWidth: 0,
          // padding: [10,10,10,29],
          axisPointer : {
            show:true,
            type : 'cross',
            lineStyle : {
              color: '#48b',
              width: 2,
              type: 'solid'
            },
            shadowStyle : {
              width: 'auto',
              color: 'rgba(150,150,150,0.9)'
            },
            link: [
              {
                // 表示所有 xAxisIndex 为 0、3、4 和 yAxisName 为 'someName' 的坐标轴联动。
                xAxisIndex: [0, 3, 4],
                yAxisName: 'someName'
              },
              {
                // 表示左右 xAxisId 为 'aa'、'cc' 以及所有的 angleAxis 联动。
                xAxisId: ['aa', 'cc'],
                angleAxis: 'all'
              }
            ]
          },
          textStyle: {
            color: '#568609'
          }
        },
        toolbox: {
          show:true,
          orient:'vertical',
          itemSize:14,
          feature: {
            mark:true,
            dataView: { readOnly:false },
            magicType: ['line','bar'],
            restore:true,
            saveAsImage:true
          }
        },
        brush: {
          brushType:'rect',
          brushLink: [0, 1],
          outOfBrush: {
            color: '#abc'
          },
          brushStyle: {
            borderWidth: 2,
            color: 'rgba(0,0,0,0.2)',
            borderColor: 'rgba(0,0,0,0.5)'
          },
          seriesIndex: [0, 1],
          throttleType: 'debounce',
          throttleDelay: 300,
          geoIndex: 0
        },
        calculable:true,
        legend:{
          tooltip: {
            show: true
          },
          orient:'horizontal',
          animation:true,
          top:20,
          left:'center',
          data: [
            {name:'已开始'},
            {name:'已结束'},
            {name:'预计完成'}
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis:{
          name:'时间',
          nameTextStyle:{
            padding:[0,0,0,-10]
          },
          splitLine:{
            show:false
          },
          type:'time',
          inverse:false,
          // silent:false,
          // triggerEvent:true,
          // minInterval:1,
          // realtime:true,
          axisLine:{      //轴线设置
            show:true,
            onZero:false,
            lineStyle:{
              color: '#333'
            }
          },
          axisTick:{
            inside:true
          },
          // axisLabel:{
          //   show:true
          // },
          // splitArea:{
          //   show:true
          // },
          axisPointer:{
            show:true,
            type:'line'
          }
          // interval:60
          // min:  new Date('2017/10/10'),
          // max:  new Date('2017/11/10'),
          // maxInterval:60
          // data: []
        },
        yAxis:{
          axisTick:{
            alignWithLabel:true,
            inside:true,
            length:2,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
          },
          splitArea: { show:true },
          data:[]
          // data: ['11','222','333']
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'empty'
          },
          {
            id: 'dataZoomY',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter'
          }
        ],
        series:[
          {
          name:'已开始',
          type:'bar',
            bar:{
              barMaxWidth:'500'
            },
          smooth:true,
          legendHoverLink:false,
          seriesIndex:'all',
          data:[]
        },{
          name:'已结束',
          type:'bar',
            bar:{
              barMaxWidth:'500'
            },
          legendHoverLink:true,
          seriesIndex:'all',
          smooth:true,
          data:[]
        },{
            name:'预计完成',
            type:'line',
            smooth: true
          }]
      });
      myChart.showLoading();
      $scope.getNode = function(N){
        $http({
          url: managerZ + 'wishome-web/rest/nodeStartAndFinsh',
          method:'POST',
          async : true,
          dataType : "json",
          params:N
        }).success(function(item){
          console.log(item);
          $scope.node = item.nodes;
          $scope.prjtName = '【' + item.pr.prjtname + '】' + '项目完成进度';
          $scope.prd = item.prd;
          var exDate = item.exDate;

          //获取开始时间
          function getPreMonth(date) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = parseInt(arr[1]); //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;
            var month2 = month - 3;
            if (month2 === 0) {
              year2 = parseInt(year2) - 1;
              month2 = 12;
            }else if(month2 < 0){
              year2 = parseInt(year2) - 1;
              month2 = 12 + month2;
            }else if(month2 > 0){
              year2 = parseInt(year2);
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
              day2 = days2;
            }
            if (month2 < 10) {
              month2 = '0' + month2;
              $scope.t1 = year2+ '-' + month2 + '-' + day2;
              console.log($scope.t1);
              return $scope.t1;
            }else if (month2 >= 10){
              $scope.t1 = year2+ '-' + month2 + '-' + day2;
              console.log($scope.t1);
              return $scope.t1;
            }
          }
          //获取最长结束时间
          function getNextMonth(date) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中的月的天数
            var year2 = year;
            var month2 = parseInt(month) + 2;
            if (month2 === 13) {
              year2 = parseInt(year2) + 1;
              month2 = 1;
            }else if(month2 > 13){
              year2 = parseInt(year2) + 1;
              month2 = -parseInt(12 - month2);
            }else if(month2 < 13){
              year2 = parseInt(year2);
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
              day2 = days2;
            }
            if (month2 < 10) {
              month2 = '0' + month2;
            }
            $scope.t2 = year + '-' + month2 + '-' + day2;
            return  $scope.t2;
          }

          getPreMonth( new Date(exDate).toISOString());
          getNextMonth( new Date(exDate).toISOString());
          var S = [];
          var F = [];
          var name = [];
          var time = [];
          if(item){
            //开始时间
            for(var s=0,sLen=item.nodes.length;s<sLen;s++){
              S.push(new Date(item.nodes[s].start).toISOString());
            }
            //结束时间
            for(var y=0,fLen=item.nodes.length;y<fLen;y++){
              F.push(new Date(item.nodes[y].finsh).toISOString());
            }
            //预计完成时间
            for(var t=0,tLen=item.nodes.length;t<tLen;t++){
              time.push(new Date(item.nodes[t].time).toISOString());
            }
            //纵坐标的name
            for(var n=0,nLen=item.nodes.length;n<nLen;n++){
              name.push(item.nodes[n].name)
            }
            myChart.hideLoading();
            myChart.setOption({        //加载数据图表
              xAxis: [{
                name: '时间',
                // data:X,
                min:new Date($scope.t1),
                max:new Date($scope.t2)
              }],
              yAxis:{
                name: '节点名称',
                data: name
              },
              series: [{
                // 根据名字对应到相应的系列
                type:'bar',
                bar:{
                  barMaxWidth:'500'
                },
                smooth:true,
                name: '已开始',
                data: S
              },{
                // 根据名字对应到相应的系列
                type:'bar',
                smooth:true,
                name: '已结束',
                data: F
              },{
                smooth:true,
                name:'预计完成',
                type:'line',
                data:time,
                markArea: {
                  data: [ [{
                    name: '已结束',
                    xAxis: '1504627200000'
                  }, {
                    xAxis: '10:00'
                  }], [{
                    name: '已结束',
                    xAxis: '17:30'
                  }, {
                    xAxis: '21:15'
                  }] ]
                }
              }]
            });
          }
        })
      };
    }
  }
});
