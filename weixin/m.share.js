$(document).ready(function () {// 分享
    var isQQorUC = /(mqqbrowser|ucbrowser)/i.test(navigator.appVersion);
    if (isQQorUC && !navigator.userAgent.match(/MicroMessenger/ig)) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.charset = "utf-8";
        if (s.readyState) {
            s.onreadystatechange = function () {
                if (s.readyState == "loaded" || s.readyState == "complete") {
                    s.onreadystatechange = null;
                    var share_obj = new nativeShare('shareul', share_config);
                }
            };
        }
        else {
            s.onload = function () {
                var share_obj = new nativeShare('shareul', share_config);
            };
        }
        s.src = '../nativeShare.js';
        document.getElementsByTagName("head")[0].appendChild(s);
    }
    else {
        if (!isQQorUC && /(ip(ad|hone|od))/i.test(navigator.userAgent) && /safari\//i.test(navigator.userAgent)) {
            $("#shareul div").before($('<li><a href="javascript:;" class="icon-weixin" id="weixinBtn">微信好友</a></li>'));
            $("#weixinBtn").bind("click", function () {
                $("#weixinShare").show();
            });
            $("#weixinShare").bind("touchstart", function () {
                $(this).hide();
            });
        }
        //新浪分享
        $('.icon-sina').click(function (ev) {
            ev.preventDefault();
            const share = {
                title: share_config.title,
                image_url: share_config.img,
                share_url: share_config.url
            };
            document.location = ('https:' == document.location.protocol ? "https:" : "http:") + '//service.weibo.com/share/share.php?url=' + encodeURIComponent(share.share_url) + '&title=' + share.title + '&pic=' + share.image_url + '&searchPic=true';


        });

        //QQ空间分享
        $('.icon-qq').click(function (ev) {
            ev.preventDefault();
            const share = {
                title: share_config.title,
                desc: share_config.desc,
                image_url: [share_config.img],
                share_url: share_config.url
            };
            let image_urls = share.image_url.map(function (image) {
                return encodeURIComponent(image);
            });
            document.location = ('https:' == document.location.protocol ? "https:" : "http:") + '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(share.share_url) + '&title=' + share.title + '&pics=' + image_urls.join('|') + '&summary=' + share.desc;
        });

    }

    if ($('[data-action=popup-share]').rightSwipe) {
        $('[data-action=popup-share]').rightSwipe({
            clickEnd: function (b) {
                var $leftPopup = this;
                if (b) {
                    var $back = $('.' + $leftPopup.attr('data-back'))
                    $back.touches({
                        touchstart: function (ev) {
                            ev.preventDefault();
                        }, touchmove: function (ev) {
                            ev.preventDefault();
                        }
                    });
                    $leftPopup.find('.close,#shareul li a').on('click', function (ev) {
                        ev.preventDefault();
                        $back.trigger('close');
                    })
                }
            }
        });
    }
});

//微信分享依赖commonOpenApp.js