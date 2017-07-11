(() => {
	const $nav = $('.nav'),
		$slideWrap = $('.slide .slideWrap'),
		$sort = $('.slide .slideList li.sort'),
		$cover = $('.slide .slideWrap .cover'),
		$allCover = $('.slide .allCover'),
		$copy = $('.slide .slideList li.copy')
		$to_top = $('.to-top');

	let index,
		timer = null,
		isSort = false,
		isScroll = true,
		isCover = false,
		length = $nav.length,
		$slideLi = $('.slide .slideList li.item'),
		maxHeight = length * $slideLi.height();

	init();
	function init(){
		isMove();
		isNowLi();
		$allCover.css({
			width: $(window).width(),
			height: $(window).height()
		});

		$(window).resize(function(){
			$allCover.css({
				width: $(window).width(),
				height: $(window).height()
			});
		});
	};

	$slideLi.on('click' , clickLiFoo);

	$sort.hover(function(){
		$(this).addClass('hover');
	} , function(){
		$(this).removeClass('hover');
	});

	$sort.click(function(){
		$slideLi = $('.slide .slideList li.item');
		isCover = !isCover;
		if(isCover){
			isSort = true;
			$allCover.show();
			$slideLi.off('click');
			$cover.addClass('open');
			$slideLi.addClass('move');
			$slideLi.eq(index).removeClass('click');

			$('.slide .slideList li.item').on('mousedown', function(e){
				let startY = e.clientY,
					endY = minusY = 0,
					nowIndex = $(this).index(),
					lastIndex,
					html = $slideLi.eq(nowIndex).html(),
					top = $slideLi.eq(nowIndex).position().top;

				$slideLi.off('mouseenter');
				$slideLi.off('mouseleave');
				$slideLi.eq(nowIndex).css('opacity' , 0);
				$copy.html(html).show().addClass('show').css({
					top: top + 'px'
				});

				$(document).on('mousemove' , function(event){
					endY = event.clientY;
					minusY = endY - startY;
					endTop = top + minusY;
					if(endTop < $slideLi.eq(nowIndex).position().top){
						lastIndex = nowIndex - 1;
						let nowLi = $slideLi.eq(nowIndex).clone(),
							lastLi = $slideLi.eq(lastIndex).clone();
						$slideLi.eq(lastIndex).remove();
						$slideLi.eq(nowIndex).remove();
						$slideLi.eq(lastIndex-1).after(lastLi).after(nowLi);
						nowIndex --;
					}else if(nowIndex  !== length - 1 && endTop + $slideLi.height() > $slideLi.eq(nowIndex + 1).position().top){
						lastIndex = nowIndex + 1;
						let nowLi = $slideLi.eq(nowIndex).clone(),
							lastLi = $slideLi.eq(lastIndex).clone();
						$slideLi.eq(lastIndex).remove();
						$slideLi.eq(nowIndex).remove();
						$slideLi.eq(nowIndex - 1).after(nowLi).after(lastLi);
						nowIndex ++;
					};
					$slideLi = $('.slide .slideList li.item');
					$copy.css({
						top: endTop + 'px'
					});
				});

				$(document).on('mouseup' , function(){
					$slideLi = $('.slide .slideList li.item');
					let lastTop = $slideLi.eq(length - 1).position().top
					$copy.hide();
					if(nowIndex === length - 1){
						$slideLi.eq(nowIndex).css('opacity' , 1).removeClass('hover');
					};
					$slideLi.eq(lastIndex).css('opacity' , 1).removeClass('hover');
					$(this).off('mousedown');
					$(this).off('mousemove');
					$slideLi.on('mouseenter' , function(){
						$(this).addClass('hover');
					});
					$slideLi.on('mouseleave' , function(){
						$(this).removeClass('hover');
					});
				});
			});

			$allCover.click(function(){
				isSort = isCover = false;
				$allCover.hide();
				$cover.removeClass('open');
				$slideLi.removeClass('move');
				$slideLi.on('click' , clickLiFoo);
				$slideLi.eq(index).addClass('click');
				$slideLi.off('mousedown');
			});
		}else{
			isSort = false;
			$allCover.hide();
			$cover.removeClass('open');
			$slideLi.removeClass('move');
			$slideLi.on('click' , clickLiFoo);
			$slideLi.eq(index).addClass('click');
			$slideLi.off('mousedown');
			isNowLi();
		};
		return false;
	});

	// $slideLi.hover(function(){
	// 	$(this).addClass('hover');
	// } , function(){
	// 	$(this).removeClass('hover');
	// });

	$slideLi.on('mouseenter' , function(){
		$(this).addClass('hover');
	});

	$slideLi.on('mouseleave' , function(){
		$(this).removeClass('hover');
	});

	$to_top.hover(function(){
		$(this).addClass('hover');
	} , function(){
		$(this).removeClass('hover');
	});

	$to_top.click(function(){
		timer = setInterval(function(){
			let scrollTop = $(document).scrollTop(),
				iSpeed = -scrollTop / 10;

			$('body , html').scrollTop(scrollTop + iSpeed);
			isScroll = true;
			if(scrollTop === 0){
				clearInterval(timer);
			};
		}, 30);
	});

	$(window).scroll(function(){
		if(!isScroll){
			clearInterval(timer);
		};
		isScroll = false;
		isMove();
		isNowLi();
	});

	function isMove(){
		$(document).scrollTop() >= 245 ? $slideWrap.addClass('move') : $slideWrap.removeClass('move');
	};

	function isNowLi(){
		if(isSort){
			return;
		};
		let x = index;
		for(let i = 0;i < length;i ++){
			let top = $nav.eq(i).position().top - $(document).scrollTop(),
				win_height = $(window).height();
			if(top >= win_height / 4){
				index = i - 1;
				break;
			}else{
				index = length - 1;
			};
		};
		if(index === -1){
			$slideLi.removeClass('click')
		}else{
			if(x !== index){
				$slideLi.eq(index).addClass('click').siblings().removeClass('click');
			}
		};
	};

	function clickLiFoo(){
		index = $(this).index();
		$(this).addClass('click').siblings().removeClass('click');
		$('body , html').stop().animate({
			scrollTop: $nav.eq(index).position().top
		} , 300);
		return false;
	};

	function toggleFn(){
		$allCover.toggle();
		$slideLi.toggleClass('move');
	};
})();