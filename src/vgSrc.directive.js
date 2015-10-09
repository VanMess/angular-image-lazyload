/*
 *  An angular directive for image loading status present.
 */
var directive = function($parse, defaults) {
    var
    // angular's directive define object.
        defineObj = {
        priority: 99,
        restrict: 'A',
        name: 'vgSrc',
        compile: function(element, attrs) {
            var statusCls = ['loadingCls', 'emptyCls', 'errorCls', 'loadedCls'];
            return function _link($scope, element, attrs) {
                var attrName = attrs.$normalize(defineObj.name),
                    opt = ng.copy(defaults);
                ng.forEach(Object.keys(defaults), function(att) {
                    if (ng.isString(attrs[att])) {
                        // parse element's setting attribute use ng's '$parse'
                        // so that users can define the configuration by ng's 'expression'.
                        opt[att] = $parse(attrs[att])($scope);
                    }
                });

                var srcParser = $parse(attrs[attrName]);

                // watching vgSrc attribute
                // so that we could dynamicly fresh element's image when each time user change the value
                $scope.$watch(function() {
                    return srcParser($scope);
                }, function _bindImg(newVal, oldVal) {

                    if (ng.isString(newVal) && newVal.length > 0) {
                        attrs.$set('src', opt.loading);
                        _refreshCls(opt['loadingCls']);
                        _lazyLoad(newVal, function() {
                            attrs.$set('src', newVal);
                            _refreshCls(opt['loadedCls']);
                        }, function() {
                            attrs.$set('src', opt.error);
                            _refreshCls(opt['errorCls']);
                        })
                    } else {
                        attrs.$set('src', opt.empty);
                        _refreshCls(opt['emptyCls']);
                    }
                });

                // clear element's status class
                // and add the new class
                function _refreshCls(cls) {
                    for (var i = 0; i < statusCls.length; i++) {
                        element.removeClass(opt[statusCls[i]]);
                    }
                    element.addClass(cls);
                }
            };

        }
    };

    return defineObj;
};

angular.module('vgSrc').directive('vgSrc', ['$parse', 'vgSrcConfig', directive]);

/*
 *  load function to excute a shadow load
 */
function _lazyLoad(src, loadCallback, errorCallback) {
    var $imgDom = ng.element(new Image());
    loadCallback = ng.isFunction(loadCallback) ? loadCallback : ng.noop;
    errorCallback = ng.isFunction(errorCallback) ? errorCallback : ng.noop;

    $imgDom.bind('error', errorCallback.bind(this)).bind('load', loadCallback.bind(this)).attr('src', src);
}
