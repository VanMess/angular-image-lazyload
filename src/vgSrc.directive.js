/*
 *  An angular directive for image loading status present.
 */
var directive = function($parse, defaults) {
    var status = ['loading', 'empty', 'error'],
        statusCls = ['loadingCls', 'emptyCls', 'errorCls', 'loadedCls'],
        events = ['onBegin', 'onError', 'onLoad'],
        // angular's directive define object.
        defineObj = {
            priority: 99,
            restrict: 'A',
            name: 'vgSrc',
            compile: function(element, attrs) {
                var attrName = attrs.$normalize(defineObj.name),
                    srcParser = $parse(attrs[attrName]);

                return function _link($scope, element, attrs) {
                    var opt = ng.copy(defaults),
                        $log = opt.debug ? console.log.bind(console) : ng.noop;
                    // parse everything in status lists.
                    ng.forEach(status, function(att) {
                        if (ng.isString(attrs[att])) {
                            // parse element's setting attribute use ng's '$parse'
                            // so that users can define the configuration by ng's 'expression'.
                            opt[att] = $parse(attrs[att])($scope);
                        }
                    });

                    // simply copy everything in statusCls lists.
                    ng.forEach(statusCls, function(att) {
                        if (ng.isString(attrs[att])) {
                            opt[att] = attrs[att];
                        }
                    });

                    // parse event handlers
                    // so that we can occu
                    ng.forEach(events, function(att) {
                        if (ng.isString(attrs[att])) {
                            opt[att] = $parse(attrs[att]);
                        }
                    });

                    // watching vgSrc attribute
                    // so that we could dynamicly fresh element's image when each time user change the value
                    $scope.$watch(function() {
                        return srcParser($scope);
                    }, function _bindImg(newVal, oldVal) {
                        var $e = {
                            src: newVal
                        };
                        if (ng.isString(newVal) && newVal.length > 0) {
                            attrs.$set('src', opt.loading);
                            _refreshCls(opt['loadingCls']);
                            opt['onBegin'].call($scope, $scope, $e);
                            $log('start loading resource:' + $e.src);

                            _lazyLoad(newVal, function() {
                                attrs.$set('src', newVal);
                                _refreshCls(opt['loadedCls']);
                                opt['onLoad'].call($scope, $scope, $e);
                                $log('success load resource:' + $e.src);
                            }, function() {
                                attrs.$set('src', opt.error);
                                _refreshCls(opt['errorCls']);
                                opt['onError'].call($scope, $scope, $e);
                                $log('failure load resource:' + $e.src);
                            })
                        } else {
                            attrs.$set('src', opt.empty);
                            _refreshCls(opt['emptyCls']);
                            opt['onError'].call($scope, $scope, $e);
                            $log('current img is empty');
                        }
                    });

                    // clear element's status class
                    // and add the new class
                    function _refreshCls(cls) {
                        ng.forEach(statusCls, function(cls) {
                            element.removeClass(opt[cls]);
                        });
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
