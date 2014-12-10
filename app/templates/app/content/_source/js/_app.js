var <%= appName %> = {
    resizeTime: new Date(1, 1, 2000, 12, 0, 0),
    resizeTimeout: false,
    resizeDelta: 200,
    pageWidth: 0,
    pageHeight: 0,
    isMobile: true,
    init: function () {
        var _this = this;
        _this.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        _this.resized();
        $(window).resize(function () {
            _this.resizeTime = new Date();
            if (_this.resizeTimeout === false) {
                _this.resizeTimeout = true;
                setTimeout(_this.resizeEnd, _this.resizeDelta);
            }
        });
    },
    resizeEnd: function () {
    	var _this = this;
        if (new Date() - _this.resizeTime < _this.resizeDelta) {
            setTimeout(_this.resizeEnd, _this.resizeDelta);
        } else {
            _this.resizeTimeout = false;
            _this.resized();
        }
    },
    resized: function () {
        var _this = this;
        _this.findSize();
    },
    findSize: function () {
    	var _this = this;
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            //IE 6+ in 'standards compliant mode'
            _this.pageWidth = document.documentElement.clientWidth;
            _this.pageHeight = document.documentElement.clientHeight;
            return true;
        }
        if (typeof window.innerWidth === 'number') {
            //Non-IE
            _this.pageWidth = window.innerWidth;
            _this.pageHeight = window.innerHeight;
            return true;
        }
        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE 4 compatible
            _this.pageWidth = document.body.clientWidth;
            _this.pageHeight = document.body.clientHeight;
            return true;
        }
    }
}
$(function () { <%= appName %>.init(); });
<% if (angularjs && !bootstrap) { %> 
var ng<%= appName %> = angular.module('ng<%= appName %>');
<% } else if(bootstrap && angularjs) { %>
var ng<%= appName %> = angular.module( "ng<%= appName %>", ['ui.bootstrap'] );
ng<%= appName %>.controller( "HelloCtrl", [ '$scope', function($scope) {
  $scope.name = "calvin hobbes";
}]);
<% } %>