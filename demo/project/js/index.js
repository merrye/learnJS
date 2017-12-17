var _index = 0,
   $product_list = $("#product_list");

init();

$(".but span").click(function(){
    $(this).addClass("active").siblings("span").removeClass("active");
    _index=$(this).index();
    $(".begin").animate({left:_index*-1348},500)
});
    
setInterval(function(){
    _index++;
    if(_index>4){_index=0;}
    $(".but span").eq(_index).addClass("active").siblings("span").removeClass("active");
    $(".begin").animate({left:_index*-1348},500)
},1500);

$(function(){
    for(var i=0; i<6;i++)
    {
        $(".con6 .con8 ul li").eq(i).css("border-top","1px solid #999");
    }
    for(var i=5; i<=23;i+=6)
    {
        $(".con6 .con8 ul li").eq(i).css("border-right","1px solid #999");
    }
});

function init() {
    $.ajax({
        type: "get",
        url: "http://10.30.90.13:8080/product",
        success(data) {
            for(let product of data) {
                console.log(product);
                const $product = $("<div></div"),
                    $a = $(`<a href="pages/product.html?id=${product.productid}"></a>`),
                    $img = $(`<img src="${product.imagehref}"/>`);
                $a.append($img);
                $product.append($a);
                $product_list.append($product);
            };
        }
    });
};