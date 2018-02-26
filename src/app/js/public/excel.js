//askPriceModel--excelModel 导出Excel弹框
myApp.directive('excelModel',function(){
  return{
    restrict:'EA',
    templateUrl:'public/getExcel.html',
    replace:true,
    controller:function($scope,locals,$rootScope){
      //点击遮罩层fullDiv
      $scope.removeExcelModel = function(){
        $scope.hide();
      };
      $scope.hide = function(item){
        console.log(item);
        // $scope.excelModelShow = false;
        $("#excelModelShow").slideUp();
      };
      $scope.showExcelModel = function(){
        // $scope.excelModelShow = true;
        $("#excelModelShow").slideDown();
      };
      $scope.getExcel = function(item){
        var id = item.PrjtList.prjtid;
        $scope.ajaxGetExcel(id);
      };
      $scope.ajaxGetExcel = function(id){
        var name = $('#content1 input[name="excel"]:checked ').val();
        if($rootScope.Identity === "未认证设计师"){
          if(name === 'a'){
            $scope.excelSrc = zheng + 'wishome-web/rest/ProfessionPrintDesigner?prjtid='+ id;
            $scope.hide();
            return false
          }else  if(name === 'b'){
            $scope.excelSrc = zheng + 'wishome-web/rest/simplePrintTableDesigner?prjtid='+ id;
            $scope.hide();
            return false
          }
          return false
        }else{
          if(name === 'a'){
            $scope.excelSrc = zheng + 'wishome-web/rest/ProfessionPrint?prjtid='+ id;
            $scope.hide();
            return false
          }else  if(name === 'b'){
            $scope.excelSrc = zheng + 'wishome-web/rest/simplePrintTable?prjtid='+ id;
            $scope.hide();
            return false
          }
        }
      };
    }
  }
});
