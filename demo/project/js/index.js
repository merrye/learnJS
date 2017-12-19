var _index = 0,
   $product_list = $("#product_list"),
   {setItem, getItem} = window.localStorage;

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
    var username = window.localStorage.getItem("username");
    if(username){
        $(".login").remove();
        $(".reg").remove();
        const nameSpan = $(`<a href="pages/order.html" class="username">${username}</a>`),
            logoutA = $(`<a class="logout">退出登录</a>`);
        if(username === "admin") {
            const admin = $(`<a class="admin" href="pages/admin.html">管理中心</a>`);
            $(".headline").append(logoutA).append(admin).append(nameSpan);
        }else{
            $(".headline").append(logoutA).append(nameSpan);
        };
    };
    $.ajax({
        type: "get",
        url: "http://10.30.90.13:8080/product",
        success(data) {
            for(let product of data) {
                const $product = $("<div></div"),
                    $a = $(`<a href="pages/product.html?id=${product.product_id}"></a>`),
                    $img = $(`<img src="${product.image_href}"/>`);
                $a.append($img);
                $product.append($a);
                $product_list.append($product);
            };
        }
    });
    const oLogout = document.getElementsByClassName("logout")[0];
    if(oLogout) {
        oLogout.addEventListener("click", function() {
            window.localStorage.clear();
            window.location.reload();
        }, false);
    };
};