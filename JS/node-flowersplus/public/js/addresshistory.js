(() => {
    const $main = $("#main"),
        $add = $("#main .add"),
        $ul = $("#main .list"),
        url = "/userCenter/address/name=" + $main.attr("value") + ".html",
        deleteUrl = "/userCenter/address/delete/id=";

    let $li = $("#main .list li")

    $add.click(function(){
        addDiv();
        $main.toggle();
    });

    $("#main .list li span").click(function(){
        if($(this).index() !== 4){
            return;
        };
        let id = $(this).parent().attr("value"),   
            path = deleteUrl + id + ".html",
            _this = $(this);
        $.ajax({
            url: path,
            type: "post",
            data: {
                id
            },
            success: function(data){
                _this.parent().remove();
            }
        });
    });

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
            $ok = $("<div class='ok'>确认</div>");

        $name.append($ninput);
        $phone.append($pinput);
        $location.append($linput);

        $addDiv.append($h3).append($closeDiv).append($name).append($phone).append($location).append($ok);
        $('#wrap').append($addDiv);

        $closeDiv.click(function(){
            $addDiv.remove();
            $main.toggle();
        });

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
                    $main.toggle();
                    $li.each(function(){
                        if($(this).index()){
                            $(this).remove();
                        };
                    });
                    appendSpan(data.data);
                    $li = $("#main .list li");
                }
            });
        });
    };

    function appendSpan(data){
        let length = data.length;
        for(let i=0;i<length;i++){
            let $li = $('<li></li>'),
                $span1 = $('<span></span'),
                $span2 = $('<span></span'),
                $span3 = $('<span></span'),
                $span4 = $('<span></span'),
                $span5 = $('<span></span');
            $span1.html(i+1);
            $span2.html(data[i].name);
            $span3.html(data[i].location);
            $span4.html(data[i].phoneNumber);
            $span5.append($('<img src="../../../img/buy/iconfont-close-tiny.png"/>'));
            $li.attr("value" , data[i].id);
            $li.append($span1).append($span2).append($span3).append($span4).append($span5);
            $ul.append($li);
        };
        $ul.css({
            "height": (length + 1) * $li.height() + 'px'
        });
    };
})();