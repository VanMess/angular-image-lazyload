(function(factory) {
    factory(window.angular);
})(function(ng) {
    'use strict';

    // Create all modules and define dependencies to make sure they exist
    // and are loaded in the correct order to satisfy dependency injection
    // before all nested files are concatenated by Gulp

    var toString = Object.prototype.toString;

    angular.module('vgSrc', []);

    /*
     *  The provider of this module, just for setting default config.
     */
    var

    //  default setting
        defaults = {
            //  place image content when element's "src" attribute is empty(null,undefine,or just empty string).
            empty: '/res/logo-avatar.jpg',
            //  place image content when it begin to load real image resource.
            loading: '/res/logo-avatar.jpg',
            //  place image content when image resource fail to load.
            error: '/res/logo-avatar.jpg'
        },

        provider = function() {
            var moduleConfig = ng.copy(defaults),
                result = {
                    $set: _setConfig,
                    $get: function() {
                        return moduleConfig;
                    }
                };

            return result;

            function _setConfig(cfg) {
                if (!ng.isDefined(cfg)) return;
                for (var i in moduleConfig) {
                    if (cfg.hasOwnProperty(i) && i !== 'debug') {
                        moduleConfig[i] = toString.call(cfg[i]);
                    }
                }
                if (cfg.hasOwnProperty('debug')) {
                    moduleConfig.debug = !!cfg[i].debug;
                }
            }
        };

    angular.module('vgSrc').provider('vgSrcConfig', [provider]);

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

});
