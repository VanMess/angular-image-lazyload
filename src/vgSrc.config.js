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
