const oList = $(".list");

init();
function init() {
    $.ajax({
        type: "get",
        url: "http://10.30.90.13:8080/orders",
        data: {
            userid: window.localStorage.getItem("userid")
        },
        success(data) {
            if(!data.length) {
                oList.html("<p class='no_order'>暂无订单。</p>");
            };
            for(let order of data) {
                $.ajax({
                    type: "get",
                    url: "http://10.30.90.13:8080/getProduct",
                    data: {
                        id: order.productid
                    },
                    success(product_data) {
                        console.log(product_data);
                        const $li = $(`
                            <li>
                                <span class="dec">
                                    <img src="../${product_data.image_href}" alt="">
                                    <i>${product_data.dec}</i>
                                </span>
                                <span>${product_data.price}</span>
                                <span>${order.amount}</span>
                                <span>${order.price}</span>
                            </li>`
                            );
                        oList.append($li);
                    }
                });
            };
        }
    });
};