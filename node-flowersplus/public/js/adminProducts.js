(() => {
    const $addproduct = $('.addproduct'),
        $update = $('.update'),
        $delete = $('.delete'),
        $ul = $('.list'),
        $productsCon = $('.productsCon');

    let url;

    $('.list .product').each(function(liIndex){
        $(this).find('span').click(function(){
            let id = $(this).parent().val(),
                index = $(this).index()
                _this = $(this);
            switch(index){
                case 7:
                    $productsCon.toggle();
                    url = '/admin/update/'+ id +'.html';
                    const child = _this.parent().children();
                    produceDiv({
                        id,
                        title: "更新产品信息",
                        pNo: child.eq(1).html(),
                        name: child.eq(2).html(),
                        type: child.eq(3).html(),
                        price: child.eq(4).html(),
                        num: child.eq(5).html(),
                        dec: child.eq(6).val(),
                        liIndex: liIndex,
                        url
                    });
                    break;
                case 8:
                    url = '/admin/delete/' + id + '.html';
                    $.ajax({
                        url,
                        type: "post",
                        data: {
                            id: $(this).val()
                        },
                        success: function(data){
                            _this.parent().remove();
                        }
                    });
                    break;
            };
        });
    });

    $addproduct.click(function(){
        let uName = $productsCon.attr('name');
        url = '/admin/'+ uName +'.html';
        produceDiv({
            title: "添加新产品",
            url,
            isAdd: true,
            uName
        });
        $productsCon.toggle();
    });

    function produceDiv({
        title,
        id,
        pNo,
        name,
        type,
        price,
        num,
        dec,
        url,
        liIndex,
        isAdd = false,
        uName
    } = {}){
        const $addDiv = $('<div class="addDiv"></div>'),
            $h3 = $('<h3>' + title + '</h3>'),
            $closeDiv = $('<div class="closeDiv"></div>'),
            $pNo = $('<div class="same">物品ID</div>'),
            $name = $('<div class="same">品名</div>'),
            $type = $('<div class="same">所属分类</div>'),
            $price = $('<div class="same">价格</div>'),
            $num = $('<div class="same">库存</div>'),
            $dec = $('<div class="same">描述</div>'),
            $iinput = $("<input type='text' placeholder='请输入物品ID'>"),
            $ninput = $("<input type='text' placeholder='请输入品名'>"),
            $tinput = $("<input type='text' placeholder='请输入所属分类'>"),
            $pinput = $("<input type='text' placeholder='请输入价格'>"),
            $numinput = $("<input type='text' placeholder='请输入库存'>"),
            $dinput = $("<input type='text' placeholder='请输入描述'>"),
            $ok = $("<div class='ok'>确认</div>");

        pNo && $iinput.val(pNo);
        name && $ninput.val(name);
        type && $tinput.val(type);
        price && $pinput.val(price);
        num && $numinput.val(num);
        dec && $dinput.val(dec);

        $pNo.append($iinput);
        $name.append($ninput);
        $type.append($tinput);
        $price.append($pinput);
        $num.append($numinput);
        $dec.append($dinput);

        $addDiv.append($h3).append($closeDiv).append($pNo).append($name).append($type).append($price).append($num).append($dec).append($ok);
        $('body').append($addDiv);

        $closeDiv.click(function(){
            $addDiv.remove();
            $productsCon.toggle();
        });

        $ok.click(function(){
            pNo = $iinput.val();
            name = $ninput.val();
            type = $tinput.val();
            price = $pinput.val();
            num = $numinput.val();
            dec = $dinput.val();
            if(isAdd){
                $.ajax({
                    url,
                    type: 'post',
                    data: {
                        pNo,name,type,price,num,dec,uName
                    },
                    success:(data)=>{
                        window.location.reload();
                    }
                });
            }else{
                $.ajax({
                    url,
                    type: 'post',
                    data: {
                        id,pNo,name,type,price,num,dec
                    },
                    success:(data)=>{
                        window.location.reload();
                    }
                });
            };
        });
    };
})();