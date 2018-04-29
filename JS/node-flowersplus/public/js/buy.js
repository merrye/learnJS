(() => {
    const $wrap = $('#wrap'),
        $header = $('#wrap .header'),
        length = $header.attr("address"),
        name = $header.attr('name');


    $header.click(function(){
        let url = '/buy/name=' + name + '.html';
        $wrap.toggle();
            $.ajax({
                type: "post",
                url: url,
                data: {
                    name: name
                },
                success: function(data){
                    newDiv(data.data);
                }
            });
    });

    function newDiv(data){
        const $box = $('<div class="box"></div>'),
            $h3 = $('<h3>收货地址</h3>'),
            $closeDiv = $('<div class="closeDiv"></div>'),
            $selectDiv = $('<div class="select">请选择收货地址</div>')
            $addressUl = $("<ul></ul>"),
            $btn = $('<div class="btn">确认</div>'),
            $add = $('<div class="add">添加新地址</div>'),
            $none = $('<div class="none">还没有添加哦!</div>');

        let index = 0;

            $box.css({
                "width": '640px',
                "background": 'rgb(238,238,238)',
                "margin": '0 auto',
                "position": "relative"
            });
            $h3.css({
                "text-align" : "center",
                "font-size" : "20px",
                "background": "#fff",
                "display": "block",
                "width": "100%",
                "height": "50px",
                "font-weight": "normal",
                "line-height": "50px",
                "margin-bottom": "2px"
            });
            $closeDiv.css({
                "background" : "url(../img/buy/iconfont-close-tiny.png) center center /cover no-repeat",
                "width" : "30px",
                "height" : "30px",
                "position": "absolute",
                "top": "10px",
                "right": "20px",
                "cursor": "pointer"
            });
            $selectDiv.css({
                "padding": "20px",
                "background": "#fff",
                "margin-bottom": "1px"
            });
            $add.css({
                "padding": "20px",
                "background": "#fff url(../img/buy/order_add.png) no-repeat 10px center",
                "margin-bottom": "1px",
                "background-size": "25px",
                "text-indent": "35px",
                "cursor": "pointer"
            });

            $box.append($h3).append($closeDiv);

            if(data.length !== 0){
                for(let i=0;i<data.length;i++){
                    let $li = $('<li></li>'),
                        $span1 = $('<span style="padding-right: 30px;"></span>'),
                        $span2 = $('<span style="padding-right: 30px;"></span>'),
                        $span3 = $('<span style="float: right;padding-right: 20px;"></span>');
                    $span1.html(data[i].name);
                    $span2.html(data[i].location);
                    $span3.html(data[i].phoneNumber);

                    $li.append($span1).append($span2).append($span3);
                    $li.css({
                        "list-style": "none",
                        "height": "45px",
                        "line-height": "45px",
                        "background": "#fff",
                        "margin-bottom": "1px",
                        "text-indent": "20px",
                        "cursor": "pointer"
                    });
                    $addressUl.append($li);
                };
                $box.append($selectDiv).append($addressUl).append($add);
            }else{
                $none.css({
                    "padding": "20px",
                    "background": "#fff url(../img/buy/place.png) no-repeat 10px center",
                    "margin-bottom": "1px",
                    "background-size": "25px",
                    "text-indent": "35px"
                });
                $box.append($none).append($selectDiv).append($add);
            };

            $btn.css({
                "height": "50px",
                "line-height": "50px",
                "background": "rgb(0,199,57)",
                "color": "#fff",
                "text-align": "center",
                "margin-top": "10px",
                "cursor" : 'pointer'
            });

            $box.append($btn);

        $('body').append($box);
        
        $addressUl.find('li').eq(index).css('background','#ccc');

        $addressUl.find('li').each(function(){
            $(this).click(function(){
                index = $(this).index();
                $(this).css('background','#ccc').siblings().css('background','#FFF');
            });
        });

        $btn.click(function(){
            $box.remove();
            $wrap.toggle();
            $header.find("p").eq(0).find('span').eq(0).html(data[index].name);
            $header.find("p").eq(0).find('span').eq(1).html(data[index].phoneNumber);
            $header.find("p").eq(1).find('span').html(data[index].location);
        });

        $add.click(function(){
            $box.remove();
            addDiv();
        });

        $closeDiv.click(function(){
            $box.remove();
            $wrap.toggle();
        });
    };

    function addDiv(){
        const $addDiv = $('<div class="addDiv"></div>'),
            $h3 = $('<h3>添加新地址</h3>'),
            $closeDiv = $('<div class="closeDiv"></div>'),
            $name = $('<div class="same">收货人</div>'),
            $phone = $('<div class="same">手机</div>'),
            $location = $('<div class="same">所在地区</div>')
            $ninput = $("<input type='text' placeholder='姓名' />"),
            $pinput = $("<input type='text' placeholder='收货人手机' />"),
            $linput = $("<input type='text' placeholder='收货地址' />"),
            $ok = $("<div>确认</div>"),
            divCss = {
                "padding": "10px",
                "margin-bottom": "1px",
                "text-indent": "10px",
                "cursor": "pointer",
                "background": "#fff",
                "margin-bottom": "2px",
                "font-size": "14px",
                "height": "30px",
            },inputCss = {
                "float": "right",
                "width":" 85%",
                "height": "30px",
                "border": "none",
                "outline": "none",
            };

        $addDiv.css({
            "width": '640px',
            "background": 'rgb(238,238,238)',
            "margin": '0 auto',
            "position": "relative"
        });
        $h3.css({
            "text-align" : "center",
            "font-size" : "20px",
            "background": "#fff",
            "display": "block",
            "width": "100%",
            "height": "50px",
            "font-weight": "normal",
            "line-height": "50px",
            "margin-bottom": "2px"
        });
        $closeDiv.css({
            "background" : "url(../img/buy/iconfont-close-tiny.png) center center /cover no-repeat",
            "width" : "30px",
            "height" : "30px",
            "position": "absolute",
            "top": "10px",
            "right": "20px",
            "cursor": "pointer"
        });
        $name.css(divCss);
        $location.css(divCss);
        $phone.css(divCss);
        $ninput.css(inputCss);
        $pinput.css(inputCss);
        $linput.css(inputCss);
        $name.append($ninput);
        $phone.append($pinput);
        $location.append($linput);
        $ok.css({
            "width": "100%",
            "height": "40px",
            "text-align": "center",
            "line-height": "40px",
            "background": "rgb(0,199,57)",
            "color": "#fff",
            "cursor": "pointer"
        });

        $addDiv.append($h3).append($closeDiv).append($name).append($phone).append($location).append($ok);
        $('body').append($addDiv);

        $closeDiv.click(function(){
            $addDiv.remove();
            newDiv();
        });

        let url = "/userCenter/address/name=" + name + ".html";
        $ok.click(function(){
            $.ajax({
                url: url,
                type: "post",
                data: {
                    userName: $ninput.val(),
                    phoneNumber: $pinput.val(),
                    location: $linput.val()
                },
                success: function(data){
                    $addDiv.remove();
                    newDiv(data.data);
                }
            });
        });
    };
})();