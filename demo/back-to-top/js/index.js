window.onload = () => {
	const oBtn = document.getElementById('btn');

	let timer = null, 
		isTop = true;

	window.onscroll = function(){
		if(!isTop){
			clearInterval(timer);
		};
		isTop = false;
	};

	oBtn.onclick = function(){
		timer = setInterval(function(){
			let osTop = document.documentElement.scrollTop || document.body.scrollTop,
				iSpeed = Math.floor(-osTop / 6);
			document.documentElement.scrollTop = document.body.scrollTop = osTop + iSpeed;
			isTop = true;
			if(osTop === 0){
				clearInterval(timer);
			};
		} , 30);
	};
};