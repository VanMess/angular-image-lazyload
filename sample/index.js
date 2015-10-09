!(function(ng, $root) {
    ng.module('vgSrc.sample', ['vgSrc']).config([
        'vgSrcConfigProvider',
        function(vgSrcConfigProvider) {
            vgSrcConfigProvider.$set({
                debug: false,
                error: 'http://ico.ooopic.com/iconset01/status-icons/gif/99589.gif',
                onBegin: function($e) {
                    // console.log('start load:' + $e.src);
                },
                onError: function($e) {
                    // console.log('failure load:' + $e.src);
                },
                onLoad: function($e) {
                    //  console.log('complete load:' + $e.src);
                }
            });
        }
    ]).controller('IndexController', [
        '$scope',
        function($scope) {
            this.errorImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99589.gif';
            this.emptyImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99474.gif';
            this.loadingImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99494.gif';

            this.currentImg = 'http://attach.bbs.miui.com/forum/201402/21/115847dwxfcspf4c54esin.jpg.thumb.jpg';

            this.imgList = [
                'http://attach.bbs.miui.com/forum/201402/21/115847dwxfcspf4c54esin.jpg.thumb.jpg',
                'http://attach.bbs.miui.com/forum/201402/21/115847dwxfcspf4c54esin.jpg.thumb.jpeg',
                'http://pic2.52pk.com/files/150929/1283568_103401945.jpg'
            ];
            this.switchImg = function() {};
            this.log = function(content) {
                console.log(content);
            };
            this.debug = function(content) {
                debugger;
                console.log(content);
            };
        }
    ]);

    ng.bootstrap($root, ['vgSrc.sample']);
})(window.angular, window.document);
