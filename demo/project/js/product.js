(() => {
    window.addEventListener("load", () => {
        const oNum = document.getElementsByClassName("num")[0],
            oStock = document.getElementsByClassName("stock")[0].getElementsByTagName("span")[0],
            oControl = document.getElementsByClassName("control")[0].getElementsByTagName("i"),
            oAdd = document.getElementsByClassName("add")[0].getElementsByTagName("span")[0],
            oPrice = document.getElementsByClassName("price")[0].getElementsByTagName("span")[0],
            maxNumber = Number.parseInt(oStock.innerHTML);

        let number = Number.parseInt(oNum.value);

        init();

        [...oControl].forEach((ele, index) => {
            ele.addEventListener("click", function() {
                number = index ? -- number : ++ number;
                number = Math.min(number, maxNumber);
                number = Math.max(number, 1);
                oNum.value = number;
            }, false);
        });

        oNum.addEventListener("change", function() {
            const value = this.value;
            if(!/^\d+$/.test(value)){
                this.value = 1;
            }else if(Number.parseInt(value) > maxNumber){
                this.value = maxNumber;
            };
        }, false);

        oAdd.addEventListener("click", function() {
            const product_id = window.location.search.split("=")[1];
            $.ajax({
                type: "post",
                url: "/api/order",
                data: {
                    product_id,
                    all_price: number * Number.parseInt(oPrice.innerHTML),
                    amount: number,
                }
            });
        }, false);

        function init() {
            $.ajax({
                type: "get",
                url: `http://10.30.90.13:8080/getProduct${window.location.search}`,
                success(data) {
                    $(".product").find("img").attr("src", `../${data.imagehref}`);
                    $(".title").html(data.dec);
                    oPrice.innerHTML = data.price;
                    oStock.innerHTML = data.stock;
                }
            });
        };
    }, false);
})();