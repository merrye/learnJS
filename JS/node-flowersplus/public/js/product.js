(() => {
    const $wrap = $('#wrap'),
        $proUl = $('#wrap .pro > ul'),
		$tabLi = $('#wrap .pro .tab > ul > li'),
        $span = $("#wrap .price .numberContent span"),
        maxNum = $("#wrap .price .numberContent").attr("maxNum"),
        $input = $("#wrap .price .numberContent input"),
        $allNum = $("#wrap .price .allNum span"),
        $allMoney = $("#wrap .price .allMoney span")
        $buy = $(".footer .buy"),
        url = $buy.attr("href");

    let	inedx = 0;
    let path = url + "0.html";
    $buy.attr("href" , path);

    $tabLi.click(function(){
        inedx = $(this).index();
        $proUl.animate({
            marginLeft: - inedx * $wrap.width()
        });
        $tabLi.eq(inedx).addClass('on').siblings().removeClass('on');
    });

    $span.click(function(){
        let index = $(this).index(),
            val = Number($input.val());
        if(index){
            val ++;
            val = Math.min(val , maxNum);
        }else{
            val --;
            val = Math.max(val , 0);
        };
        $input.val(val);
        $allNum.html(maxNum - val);
        $allMoney.html(val * Number($allMoney.attr("price")));
        $buy.attr("href" , url + val + ".html");
    });

    $input.change(function(){
        const reg = /^[0-9]*$/g;
        let val = $input.val();
        if(reg.test(val)){
            val = parseInt(val);
        }else{
            val = 0;
        };
        val = Math.min(val , maxNum);
        val = Math.max(val , 0);
        $(this).val(val);
        $allNum.html(maxNum - val);
        $allMoney.html(val * Number($allMoney.attr("price")));
        $buy.attr("href" , url + val + ".html");
    });

    $buy.click(function(){
        
    });
})();