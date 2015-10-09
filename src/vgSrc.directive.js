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
            return function _link($scope, element, attrs) {
                var attrName = attrs.$normalize(defineObj.name),
                    opt = ng.copy(defaults);
                ng.forEach(Object.keys(defaults), function(att) {
                    if (ng.isString(attrs[att])) {
                        // parse element's setting attribute use ng's '$parse'
                        // so that users can define the configuration by ng's 'expression'.
                        opt[att] = $parse(attrs[att]);
                    }
                });

                // watching vgSrc attribute
                // so that we could dynamicly fresh element's image when each time user change the value
                attrs.$observe(attrName, _bindImg);
            };

            function _bindImg(v) {
                if (ng.isString(v)) {
                    attrs.$set('src', opt.loading);
                    _lazyLoad(v, function() {
                        attrs.$set('src', v);
                    }, function() {
                        attrs.$set('src', opt.error);
                    })
                } else {
                    attrs.$set('src', opt.empty);
                }
            }
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
