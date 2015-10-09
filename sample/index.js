!(function(ng, $root) {
    ng.module('vgSrc.sample', ['vgSrc']).config([
        'vgSrcConfigProvider',
        function(vgSrcConfigProvider) {
            vgSrcConfigProvider.$set({
                error: 'http://ico.ooopic.com/iconset01/status-icons/gif/99589.gif'
            });
        }
    ]).controller('IndexController', [
        '$scope',
        function($scope) {
            this.errorImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99589.gif';
            this.emptyImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99474.gif';
            this.loadingImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99494.gif';

            this.currentImg = 'http://attach.bbs.miui.com/forum/201402/21/115847dwxfcspf4c54esin.jpg.thumb.jpg';

            this.switchImg = function() {};
        }
    ]);

    ng.bootstrap($root, ['vgSrc.sample']);
})(window.angular, window.document);
