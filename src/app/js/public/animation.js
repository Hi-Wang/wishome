myApp.animation(".moreStyle",["$animateCss", function ($animateCss) {
  return {
    enter : function (element) {
      return $animateCss(element,{
        from : { top : 0  },
        to : { top : 100 },
        duration : 2
      })
    },
    leave : function (element) {
      return $animateCss(element,{
        from : { top : 100},
        to : { top : 0 },
        duration : 0
      });
    }
  }
}]);
