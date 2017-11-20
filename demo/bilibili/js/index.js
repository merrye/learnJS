/* top search  */
	(() => {
		let $li = $(".h-t-m-left>ul>li"),
			$liveLi = $('.hide-live-list > li'),
			$rListLi = $('.r-list > li'),
			$show = $('.showImg'),
			$showImg = $('.showImg img'),
			$contribute = $('.h-contribute');

		$li.hover(function(){
			$(this).find('.hide').show();
		},function(){
			$(this).find('.hide').hide();
		});

		$liveLi.hover(function(){
			$(this).addClass('hover')
		},function(){
			$(this).removeClass('hover')
		});

		$rListLi.hover(function(){
			$show.show();
			$showImg.attr('src',$(this).attr('dataImg'));
		},function(){
			$show.hide();
		});

		$contribute.hover(function(){
			$(this).css('background','url('+$(this).attr('datahover')+')');
			$(this).find('.h-c-hide').show();
		},function(){
			$(this).css('background','url('+$(this).attr('data')+')');
			$(this).find('.h-c-hide').hide();
		});
	})();

/* nav */
	(() => {
		let $navLi = $('#h-nav .navLi');

		init();
		run();
		function init(){
			let iData = data.navData;
			for(let i=0;i<iData.length;i ++){
				if(iData[i].length !== 0){
					let $hide = $('<div class="navHide"></div>'),
						$ul = $('<ul class="hideList"></ul>');
					for(let j= 0;j<iData[i].length;j++){
						$ul.append(`<li class="hideLi">
										<a href="" class="nav-a2">
											<span class="leftArrow"></span>
											<span class="midTxt">${iData[i][j]}</span>
											<span class="rightArrow">
												<span></span>
											</span>
										</a>
									</li>`);
					};
					$hide.append($ul);
					$navLi.eq(i).append($hide);
				};
			};
		};

		function run(){
			let $hideLi = $('#h-nav .navHide .hideList .hideLi');

			$hideLi.hover(function(){
				$(this).find('.nav-a2').stop().animate({
					'paddingLeft': '15px',
					'paddingRight': '10px'
				},200);
				$(this).find('.rightArrow span').stop().animate({
					left: '5px',
					opacity: 1
				},200);
			},function(){
				$(this).find('.nav-a2').stop().animate({
					'paddingLeft': '10px',
					'paddingRight': '15px'
				},150);
				$(this).find('.rightArrow span').stop().animate({
					left: '30px',
					opacity: 0
				},150);
			});

			$navLi.hover(function(){
				$(this).find('.navHide').show();
			},function(){
				$(this).find('.navHide').hide();
			});
		};
	})();

/* b-main */
	(() => {
		let $bMain = $('#b-main'),
			$tabLi = $('#b-main .tab .tabList'),
			$picUl = $('#b-main .pic .p-ul'),
			$more = $('#b-main .more'),
			index = 0,
			timer = null;

		$tabLi.hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		}).click(function(){
			index = $(this).index();
			move();
		});

		$bMain.hover(() => {
			clearInterval(timer);
			$more.stop().fadeIn(200);
		},() => {
			auto();
			$more.stop().fadeOut(200);
		});

		auto();
		function auto(){
			timer = setInterval(() => {
				index ++;
				index %= $tabLi.length;
				move();
			},5000);
		};

		function move(){
			$tabLi.eq(index).addClass('on').siblings().removeClass('on');
			$picUl.stop().animate({
				marginLeft: -440 * index + 'px'
			},200);
		};
	})();

/* b-show */
	(() => {
		init()
		const $showUl = $(".showUl");

		$showUl.each(function(){
			$(this).find('.showList').each(function(i){
				if(i === 2 || i === 5){
					$(this).css("margin-right" , 0);
				};
			});
		});

		function init(){
			const $tab = $(".b-s-tab"),
				bShowData = data.bShowData;
			for(let i= 0 ;i < 3 ;i ++){
				let $ul = $('<ul class="showUl showUl'+ (i+1) +'"></ul>');
				for(j = 0;j<bShowData[i].length;j++){
					let $li = $('<li class="showList"></li>'),
						title = '',up = '',plays = "";
					if(bShowData[i][j].title){
						title = "【" + bShowData[i][j].title + "】";
					};
					title += bShowData[i][j].text;
					up = "up主：" + bShowData[i][j].up;
					plays = "播放：" +bShowData[i][j].plays;
					$li.html("<a href=''>" +
								"<img src='img/banner/right/"+(i+1)+"/"+(j+1)+".jpg' alt=''>" +
								"<div class='showHide'>" +
									"<p class='title'>"+title+"</p>" +
									"<p class='up'>"+up+"</p>" +
									"<p class='plays'>"+plays+"</p>" +
								"</div>"+
							"</a>");
					$ul.append($li);
				};
				$tab.append($ul);
			};
		};
	})();

/* promote */
	(() => {
		const $li = $('.conLi'), 
			$img = $(".con-a1");
		let timer;

		$li.hover(function(){
			const liData = data.promoteData[$(this).index()],
				$p_c_conLihide = $('<div class="p-c-conLihide"></div>'),
				$p_c_c_title = $('<p class="p-c-c-title">'+ liData.title + '</p>'),
				$p_c_c_dec = $('<p class="p-c-c-dec"></p>'),
				$up = $('<span class="up">'+ liData.up + '</span>'),
				$time = $('<span class="time">'+ liData.time + '</span>'),
				$p_c_c_detail = $('<div class="p-c-c-detail"></div>'),
				$p_c_c_d_left = $('<div class="p-c-c-d-left"></div>'),
				$img = $('<img src="img/promote/' + ($(this).index() +1) + '.jpg" />'),
				$p_c_c_d_right = $('<div class="p-c-c-d-right">'+ liData.detail +'</div>'),
				$p_c_c_data = $('<p class="p-c-c-data"></p>'),
				$plays = $('<span class="plays">'+ liData.plays + '</span>'),
				$comment = $('<span class="comment">'+ liData.comment + '</span>'),
				$collection = $('<span class="collection">'+ liData.collection + '</span>'),
				$coin = $('<span class="coin">'+ liData.coin + '</span>');

			$p_c_c_dec.append($up).append($time);
			$p_c_c_d_left.append($img);
			$p_c_c_detail.append($p_c_c_d_left).append($p_c_c_d_right);
			$p_c_c_data.append($plays).append($comment).append($collection).append($coin);
			$p_c_conLihide.append($p_c_c_title).append($p_c_c_dec).append($p_c_c_detail).append($p_c_c_data);
			$(this).append($p_c_conLihide);
		} , function(){
			$(this).find('.p-c-conLihide').remove();
		});

		$img.hover(function(){
			let time = $(this).find(".con-img1").attr("data-time");
			if(time){
				let $div = $('<div class="dTime">'+ time +'</div>');
				$(this).find(".con-img1").append($div);
			};
			$(this).find('.BarrageDiv').show();
			barrage($(this));
		},function(){
			clearInterval(timer);
			$(this).find('.BarrageDiv').hide();
			$(this).find('.BarrageDiv .barrage').css('left','160px');
			$(this).find(".con-img1").find(".dTime").remove();
		});

		function barrage(obj){
			let $bar = obj.find('.BarrageDiv .barrage'),
				index = -1;
			timer = setInterval(function(){
				let a = index - 1;
				index ++;
				if(a > -1){
					let pos = $bar.eq(a).position().left + $bar.eq(a).width(),
						pos2 = $bar.eq(a + 1).position().left + $bar.eq(a + 1).width();
					if(pos < 170){
						$bar.eq(index).css('top' , $bar.eq(a).css('top'));
						fn();
					}else if(pos2 < 170){
						$bar.eq(index).css('top' , $bar.eq(a).css('top'));
						fn();
					}else{
						index --;
					};
				}else if(a === -2){
					$bar.eq(index).css('top' , 0);
					fn();
				}else if(a === -1){
					$bar.eq(index).css('top' , '14px');
					fn();
				};
				if(index > $bar.length){
					clearInterval(timer);
				};
				function fn(){
					let time = 10000;
					if($bar.eq(index).width() > 150){
						time = 7000;
					};
					$bar.eq(index).stop().animate({
						left: '-500px'
					} , time);
				};
			} , 1000 , 'linear');
		};
	})();

/* live */
	(() => {
		const liveData = data.liveData,
			$rightContent = $("#live .l-r-content"),
			$liveUl = $("#live .l-left .l-l-content .liveUl"),
			$rightTopLi = $("#live .l-right .l-r-top ul li");
		let $li;

		init();

		$li = $("#live .l-left .l-l-content .liveUl .liveLi");

		$rightTopLi.click(function(){
			let index = $(this).index();
			$rightContent.stop().animate({
				marginLeft: -260 * index + 'px'
			},200);
			$(this).addClass('on').siblings().removeClass('on');
		});

		$li.hover(function(){
			$(this).find('.cover').stop().animate({
				opacity: 1
			} , 300);
		} , function(){
			$(this).find('.cover').stop().animate({
				opacity: 0
			} , 300);
		});

		function init(){
			for(let i = 0;i < liveData.title.length; i ++){
				let plays = liveData.num[i],
					a = plays / 10000;
				if(a >= 1){
					plays = a.toFixed(1) + '万';
				};
				$liveUl.append(`<li class="liveLi">
									<div class="img">
										<img src="img/live/${i+1}.jpg" alt="">
									</div>
									<div class="title">${liveData.title[i]}</div>
									<div class="info">
										<p class="up"><i></i>${liveData.up[i]}</p>
										<p class="num"><i></i>${plays}</p>
									</div>
									<div class="avatar">
										<img src=${liveData.src[i]} alt="" />
									</div>
									<div class="cover">
										<i></i><span>LIVE</span>
									</div>
								</li>`);
			};
		};
	})();