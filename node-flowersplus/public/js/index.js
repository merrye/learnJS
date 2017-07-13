(function (){
	const $wrapDiv = $('#wrap > div'),
		$header = $('#header'),
		$meunLi = $('#header .menu .menuList li'),
		$productUl = $('#producitonBanner .product .img ul'),
		$productBtn = $('#producitonBanner .product .product-btn a'),
		$flowerImgLi = $('#flowerStory > div > ul > li'),
		$bannerLi = $('#banner .bg ul li'),
		$drop = $("#wrap #banner .drop"),
		offsetTopArr = [],
		init_marginLeft = 250;

	let $productLi = $('#producitonBanner .product .img ul a'),
		proIndex = maskImgIndex = 0,
		proLength = $productLi.length,
		nowClickTime = new Date(),
		bannerIndex = 0;

	init();
	function init(){
		offsetTopArr.push($wrapDiv.eq(0).offset().top);
		offsetTopArr.push($wrapDiv.eq(3).offset().top);
		offsetTopArr.push($wrapDiv.eq(4).offset().top);
		offsetTopArr.push($wrapDiv.eq(5).offset().top);
		offsetTopArr.push($wrapDiv.eq(6).offset().top);
		offsetTopArr.push($wrapDiv.eq(7).offset().top);
		offsetTopArr.push($wrapDiv.eq(8).offset().top);
	};

	$drop.click(function(){
		$('body,html').animate({
			scrollTop : offsetTopArr[1] + 'px'
		},500,function(){
			console.log();
		});
	});

	$(".login").click(function(){
		layer.open({
			type: 1,
			title: "FlowerPlus",
			area: ["400px", "390px"],
			content: `
			<div id="main" style="padding: 20px;width: 340px;height: 300px;border-radius: 5px;user-select: none;-webkit-user-select: none;">
				<p style="width: 170px;padding-left: 35%;height: 30px;text-align: center;line-height: 30px;position: relative;">
					<span style="display: block;font-size: 22px;float: left;color: #000;text-align:center;cursor: pointer;padding-right: 10px;border-right: 1px solid #ccc;width: 44px;height: 30px;">登录</span>
					<span style="display: block;font-size: 22px;float: left;color: #999;text-align:center;cursor: pointer;padding-left: 10px;width: 44px;height: 30px;">注册</span>
				</p>
				<form style="padding-top: 20px;">
					<label style="width: 100%;height: 45px;display: block;padding-bottom: 15px;">
						<span style="color: #666;font-size: 18px;line-height: 45px;float: left;" class="nameSpan">账号:</span>
						<input style="width: 250px;height: 35px;float: right;border-radius: 3px;text-indent: 12px;font-size: 15px;margin-top: 5px;outline: none;border: 1px solid #ccc;" type="text" name="name" id="nameInput"  placeholder="请输入您的账户名称">
					</label>
					<label style="width: 100%;height: 45px;display: block;padding-bottom: 15px;">
						<span style="color: #666;font-size: 18px;line-height: 45px;float: left;" class="pwdSpan">密码:</span>
						<input style="width: 250px;height: 35px;float: right;border-radius: 3px;text-indent: 12px;font-size: 15px;margin-top: 5px;outline: none;border: 1px solid #ccc;" type="password" name="password" id="pwdInput" placeholder="请输入您的密码">
					</label>
					<label style="display: none;width: 100%;height: 45px;padding-bottom: 15px;" class="confirmLebel">
						<span style="color: #666;font-size: 18px;line-height: 45px;float: left;" class="pwdSpan">确认密码:</span>
						<input style="width: 250px;height: 35px;float: right;border-radius: 3px;text-indent: 12px;font-size: 15px;margin-top: 5px;outline: none;border: 1px solid #ccc;" type="password" name="confrimPassword" id="confrimPwdInput" placeholder="请再次确认您的密码">
					</label>
					<label style="width: 100%;height: 45px;display: block;padding-bottom: 15px;" class="submitLabel">
						<input value="登录" type="button" class="submit" style="color: #fff;font-size: 18px;line-height: 40px;width: 200px;height: 40px;text-align: center;float: none;text-indent: 0;border: none;background-color: #199fdc;transform: translateX(-50%);margin-left: 50%;border-radius: 10px;overflow: hidden;cursor: pointer;" />
					</label>
				</form>
			</div>
			<script>
				const $span = $("#main > p > span"),
					$label = $("#main > form > label"),
					$submit = $("#main > form > label > .submit"),
					$nameInput = $("#nameInput"),
					$pwdInput = $("#pwdInput"),
					$confrimPwdInput = $("#confrimPwdInput"),
					$imgA = $("#producitonBanner .product .img ul > a");

				$span.click(function(){
					let index = $(this).index();
					$(this).css('color',"#000").siblings().css('color',"#999");
					$label.eq(2).css('display' , index ? "block" : "none");
					$submit.val(index ? "注册" : "登录");
				});

				$submit.click(function(){
					let val = $(this).val();
					if(val === "登录"){
						$.ajax({
							url: "/login",
							type: "post",
							dataType: "json",
							data: {
								name: $nameInput.val(),
								password: $pwdInput.val(),
							},
							success: (data) => {
								let $reg = $(".menu .reg"),
									url = "/userCenter/name=" + data.name + ".html",
									url2 = "&name=" + data.name + ".html",
									url3 = "/admin/products/" + data.name + ".html",
									$a1 = $('<a class="img"></a>'),
									$a2 = $('<a href="/logout" class="exit">退出</a>'),
									$a3 = $('<a class="admin">产品管理</a>'),
									$img = $(' <img src="img/index/0.jpg" width="22" height="22" alt="">');
	
								$reg.empty();
								$a1.attr("href" , url).append($img);
								$reg.append($a1)
								$a3.attr('href' , url3);
								if(data.admin){
									$reg.append($a3);
								};
								$reg.append($a2);
								$imgA.each(function(){
									let oldUrl = $(this).attr('value'),
										path = oldUrl + url2;
									$(this).attr('href' , path);
								});
								layer.closeAll();
							},
							error: (err) => {
								layer.msg(err.responseText);
							}
						});
					}else if(val === "注册"){
						let val = $pwdInput.val(),
							value = $confrimPwdInput.val();
						if(val === "" || value === ""){
							$nameInput.val("");
							$pwdInput.val("");
							$confrimPwdInput.val("");
							layer.msg('密码不能为空');
							return;
						}
						if(val === value){
							console.log(1);
							$.ajax({
								type: "post",
								url: "/reg",
								data: {
									name: $nameInput.val(),
									password: $pwdInput.val(),
								},
								success: function(data){
									let $reg = $(".menu .reg"),
										url = "/userCenter/name=" + data.name + ".html",
										url3 = "/admin/products/" + data.name + ".html",
										$a1 = $('<a href="/userCenter" class="img"></a>'),
										$a2 = $('<a href="/logout" class="exit">退出</a>'),
										$a3 = $('<a class="admin">产品管理</a>'),
										url2 = "&name=" +  data.name + ".html",
										$img = $(' <img src="img/index/0.jpg" width="22" height="22" alt="">');
						
									$reg.empty();
									$a1.attr("href", url).append($img);
									$reg.append($a1)
									$a3.attr('href' , url3);
									if(data.admin){
										$reg.append($a3);
									};
									$reg.append($a2);
									$imgA.each(function(){
										let oldUrl = $(this).attr('value'),
											path = oldUrl + url2;
										$(this).attr('href' , path);
									});
									layer.closeAll();
								},
								err:(err)=>{
									layer.msg(err.responseText);
								}
							});
						}else{
							$nameInput.val("");
							$pwdInput.val("");
							$confrimPwdInput.val("");
							layer.msg('两次输入密码不一致。');
						};
					}
				});
			</script>`
		});
	});

	let timer = setInterval(function(){
		$bannerLi.eq(bannerIndex).hide();
		bannerIndex ++;
		bannerIndex %= $bannerLi.length;
		$bannerLi.eq(bannerIndex).show();
	},4000);

	// 鼠标滚动距离超过52px 改变其样式
	$(window).scroll(function (){
		let top = $(document).scrollTop(),
			nowIndex = 0;
		console.log(top);
		if(top >= 52){
			$header.css({
				position: 'fixed',
				backgroundColor: '#fff'
			});
			$meunLi.find('a').css({
				'color': '#000',
				'borderColor': '#000'
			});
			$('#header .logo img').attr('src','img/index/pc_newlogo.png');
			$('#header .reg a').css('color','#000');
		}else{
			$header.css({
				position: 'absolute',
				backgroundColor: 'rgba(255,255,255,0)'
			});
			$meunLi.find('a').css({
				'color': '#fff',
				'borderColor': '#fff'
			});
			$('#header .logo img').attr('src','img/index/pc_newlogo1.png');
			$('#header .reg a').css('color','#fff');
		};
		for(let i=0;i<offsetTopArr.length;i++){
			if( top < offsetTopArr[i] ){
				nowIndex = i - 1;
				if ( nowIndex < 0 ){
					nowIndex = 0;
				};
				$meunLi.find('a').removeClass('on');
				$meunLi.find('a').eq(nowIndex).addClass('on');
				break;
			};
		};
	});

	// menuLi点击页面滚动到相应的距离
	$meunLi.click(function(){
		let liIndex = $(this).index();
		if(liIndex < 6){
			$('body,html').animate({
				scrollTop : `${offsetTopArr[liIndex]}px`
			},500);
			$meunLi.find('a').removeClass('on');
			$(this).find('a').addClass('on');
		};
	});

	// 鼠标悬停显示
	productLiHover($productLi);

	// 点击左右切换
	$productBtn.click(function (){
		let aIndex = $(this).index();
		if(new Date() - nowClickTime > 320){
			nowClickTime = new Date();
			if(aIndex){
				$productUl.animate({
					'marginLeft': -init_marginLeft + 'px'
				},300,function(){
					$productLi = $('#producitonBanner .product .img ul a');
					$productUl.append($productLi.eq(0).clone());
					$productLi.eq(0).remove();
					for(let i = proLength;i<$productLi.length;i++){
						$productLi.eq(i).remove();
					};
					$productUl.css('marginLeft',0);
					productLiHover($productLi);
				});
			}else{
				$productLi = $('#producitonBanner .product .img ul a');
				$productUl.css('marginLeft',-init_marginLeft);
				$productUl.prepend($productLi.eq(proLength-1).clone());
				$productUl.animate({
					'marginLeft': 0
				},300,function(){
					$productLi = $('#producitonBanner .product .img ul a');
					for(let i = proLength;i<$productLi.length;i++){
						$productLi.eq(i).remove();
					};
					$productUl.css('marginLeft',0);
					productLiHover($productLi);
				});
			};
		};
	});

	function productLiHover($obj){
		$obj.hover(function() {
			$(this).find('div').show();
			$(this).find('span').hide();
		}, function() {
			$(this).find('div').hide();
			$(this).find('span').show();
		});
	};

	// flower 点击
	Array.from($flowerImgLi).forEach(function(ele,index){
		$(ele).click(function(){
			maskImgIndex = index;
			let $maskDiv = $('<div id="maskDiv"></div>'),
				$closeDiv = $('<div id="closeDiv"></div>'),
				$leftDiv =$('<div id="leftDiv"></div>'),
				$rightDiv =$('<div id="rightDiv"></div>'),
				$imgDiv = $('<div id="imgDiv"></div>'),
				$closeP = $('<p>x</p>'),
				$img = $('<img src="img/index/index-pc-story'+ (maskImgIndex + 1) + '.jpg" alt="" />'),
				winWidth = window.innerWidth,
				winHeight = window.innerHeight,
				imgWidth,imgHeight;

			$maskDiv.css({
				'width': winWidth,
				'height': winHeight,
				'backgroundColor': 'rgba(0,0,0,.5)',
				"zIndex": 99,
				"position": "fixed",
				"top": 0,
				"left": 0,
				'min-width': '280px',
				'user-select': 'none',
				'-webkit-user-select': 'none'
			});

			$closeDiv.css({
				'width': '36px',
				'height': '36px',
				'borderRadius': '100%',
				'overflow': 'hidden',
				'position': 'absolute',
				'top': '20px',
				'right': '20px',
				'zIndex': 100,
				'border': '2px solid rgba(255, 255, 255, 0.7)',
				'cursor': 'pointer',
				'textAlign': 'center',
				'lineHeight': '45px'
			});

			$imgDiv.css({
				'position': 'absolute',
				'top': '10%',
				'right': '10%',
				'bottom': '10%',
				'left': '10%',
				'overflow': 'hidden',
				'lineHeight': winHeight * .8 + 'px',
				'textAlign': 'center'
			});

			$leftDiv.css({
				'width': '32px',
				'height': '55px',
				'position': 'absolute',
				'top': '50%',
				'left': "25px",
				'marginTop':'-22.5px',
				'backgroundImage': 'url(img/index/prev.png)',
				'backgroundSize': '32px 55px',
				'cursor': 'pointer',
				'opacity': .5
			});

			$rightDiv.css({
				'width': '32px',
				'height': '55px',
				'position': 'absolute',
				'top': '50%',
				'right': "25px",
				'marginTop':'-22.5px',
				'backgroundImage': 'url(img/index/next.png)',
				'backgroundSize': '32px 55px',
				'cursor': 'pointer',
				'opacity': .5
			});

			$closeP.css({
				'fontSize': '28px',
				'color': 'rgba(255, 255, 255, 0.7)',
				'display': 'block',
				'width': '24px',
				'height': '24px',
				'line-height': '18px',
				'margin': '6px 0 0 6px'
			});

			$img.css({
				"display": "inline-block",
			    "max-width": "100%",
			    "max-height": "100%",
			    "margin": "0 auto",
			    "vertical-align": "middle",
			    "overflow-x": "hidden"
			});

			$closeDiv.append($closeP);
			$imgDiv.append($img);
			$maskDiv.append($closeDiv).append($leftDiv).append($imgDiv).append($rightDiv);
			$('body').append($maskDiv);
			imgWidth = parseInt($img.css('width'));
			imgHeight = parseInt($img.css('height'));
			adjust();

			$closeDiv.hover(function(){
				$(this).css('borderColor','rgba(255,255,255,.9)');
				$closeP.css('color','rgba(255,255,255,.9)');
			},function(){
				$(this).css('borderColor','rgba(255,255,255,.7)');
				$closeP.css('color','rgba(255,255,255,.7)');
			});
			$closeDiv.click(function(){
				$maskDiv.hide().remove();
			});
			$leftDiv.click(function() {
				switchImg(true);
			});
			$rightDiv.click(function() {
				switchImg(false);
			});

			hoverFn($leftDiv);
			hoverFn($rightDiv);

			$(window).resize(function(){
				winWidth = window.innerWidth;
				winHeight = window.innerHeight;
				$maskDiv.css({
					'width': winWidth,
					'height': winHeight,
				});
				$imgDiv.css('lineHeight', winHeight * .8 + 'px');
				adjust();
			});

			function adjust(){
				let propW = $imgDiv.width() / imgWidth,
					propH = $imgDiv.height() / imgHeight,
					prop = propW > propH ? propH : propW,
					endWidth = prop * imgWidth,
					endHeight = prop * imgHeight;
				$img.css({
					'width': endWidth + 'px',
					'height': endHeight + 'px'
				});
			};

			function hoverFn($obj){
				$obj.hover(function(){
					$(this).css('opacity',.8);
				},function(){
					$(this).css('opacity',.5);
				});
			};

			function switchImg(bTrue){
				maskImgIndex = bTrue ? (maskImgIndex <= 0 ?  $flowerImgLi.length - 1 : maskImgIndex - 1) : (maskImgIndex >= $flowerImgLi.length - 1 ? 0 : maskImgIndex + 1);
				$img.hide().attr('src','img/index/index-pc-story'+ (maskImgIndex + 1) + '.jpg');
				imgWidth = parseInt($img.css('width'));
				imgHeight = parseInt($img.css('height'));
				adjust();
				$img.show();
			};
		});
	});
})();