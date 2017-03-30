var myScroll;
var position;
var update = false;

function loaded () {
	position = document.getElementById('position');

	myScroll = new IScroll('#wrapper', { probeType: 2, interactiveScrollbars: true, startY:-40 });

	myScroll.on('scroll', function () {
		if((this.y>>0) > 10 && update == false){
			update = true;
			$('.pull-to-refresh .pull-text').html('松开刷新')
			$('.pull-to-refresh .pull-indicator').addClass('arrow-rotate-180');
		}
	});
	myScroll.on('scrollEnd', function () {
		if(this.y > -40){
			if(update == false && this.y <= 0){
				myScroll.scrollTo(0, -40, 1000);
				setTimeout(function () {
			        myScroll.scrollTo(0, -40);
			    }, 500);
			}else{
				$('.pull-to-refresh .pull-indicator').css('display', 'none')
				$('.pull-to-refresh .pull-text').css('display', 'none')
				$('.pull-to-refresh .pull-spinner').css('display', 'block')
				setTimeout(function () {
					update = false;
			        myScroll.scrollTo(0, -40, 1000);
			        $('.pull-to-refresh .pull-text').html('下拉刷新')
			        $('.pull-to-refresh .pull-indicator').removeClass('arrow-rotate-180');
			        $('.pull-to-refresh .pull-spinner').css('display', 'none')
			        $('.pull-to-refresh .pull-indicator').css('display', 'inline-block')
					$('.pull-to-refresh .pull-text').css('display', 'inline-block');
					for(var i=0;i<5;i++){
						$("#scroller ul li:eq(0)").before("<li>动态生成节点:"+Math.random()+"</li>");
					}
			    }, 2000);
			}
		}
	});
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);