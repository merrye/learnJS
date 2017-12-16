const oItem = document.getElementsByClassName("item"),
    oMain = document.getElementsByClassName("main")[0],
    oSubItem = document.getElementsByClassName("sub-item"),
    oSlider = document.getElementsByClassName("slider")[0],
    oMeunItem = document.getElementsByClassName("meun-item"),
    oConfirm = document.getElementsByClassName("oConfirm");

[...oItem].forEach((ele , index) => {
    ele.addEventListener("click" , function(){
        const name = "clicked",
            subItem = oSubItem[index];
        toggleClassName(ele , name);
        css(subItem , {display: hasClassName(ele , name) ? "block" : "none"});
    } , false);
    ele.addEventListener("mouseenter" , function(){
        const top = ele.offsetTop;
        css(oSlider , {
            height: "50px",
            top,
            opacity: 1
        });
    } , false);
    ele.addEventListener("mouseleave" , function(){
        css(oSlider , {
            height: "0px",
            opacity: 0
        });
    } , false);
});

[...oMeunItem].forEach((ele , index) => {
    ele.onclick = ev => {
        ev.cancalBubble = true;
        ev.stopPropagation();
        const time = new Date(),
            year = time.getFullYear(),
            month = time.getMonth() + 1;
        oMain.innerHTML = `<div class="loading"></div>`;
        switch (index){
            case 0:
                oMain.innerHTML = `
                    <ul class="users-list">
                        <li>
                            <span>1</span>
                            <span>merry</span>
                        </li>
                        <li>
                            <span>2</span>
                            <span>adsa</span>
                        </li>
                        <li>
                            <span>3</span>
                            <span>asd</span>
                        </li>
                    </ul>
                `;
                break;
            case 1:
                oMain.innerHTML = `
                    <div class="product-nav">
                        <span class="dec">商品</span>
                        <span>单价</span>
                        <span>库存</span>
                    </div>
                    <ul class="product-list">
                        <li>
                            <span class="dec">
                                <img src="../image/products/1.jpg" alt="">
                                <i>也闹不sad</i>
                            </span>
                            <span>117</span>
                            <span>234</span>
                        </li>
                        <li>
                            <span class="dec">
                                <img src="../image/products/2.jpg" alt="">
                                <i>撒大大</i>
                            </span>
                            <span>111</span>
                            <span>333</span>
                        </li>
                        <li>
                            <span class="dec">
                                <img src="../image/products/3.jpg" alt="">
                                <i>撒阿萨撒阿萨德撒打发电话是多少个的撒阿萨德撒打发电话是多少个的撒阿萨德撒打发电话是多少个的撒阿萨德撒打发电话是多少个的撒阿萨德撒打发电话是多少个的德撒打发电话是多少个的</i>
                            </span>
                            <span>488</span>
                            <span>1</span>
                        </li>
                    </ul>
                `;
               break;
            case 2:
                oMain.innerHTML = `
                    <div class="product">
                        <span>商品描述</span>
                        <input type="text" name="name" />
                    </div>
                    <div class="product">
                        <span>商品单价</span>
                        <input type="text" name="price" />
                    </div>
                    <div class="product">
                        <span>商品库存</span>
                        <input type="text" name="stock" />
                    </div>
                    <div class="product">
                        <span>商品图片</span>
                        <input type="file" name="file" />
                    </div>
                    <div class="product">
                        <span class="confirm">确定</span>
                    </div>
                `;
                oConfirm[0] && oConfirm[0].addEventListener("click", createProduct, false);
                break;
        };
    };
});

function createProduct(){
    $.ajax({
        type: "post",
        url: "/api/product",
        data: {
            name: "adsa",
            price: 11,
            stock: 111,
            image: "",
        },
        success(data) {

        }
    });
};

function getAllUsers() {
    $.ajax({
        type: "get",
        url: "/api/users",
        success(data) {

        }
    });
};

function getAllProducts() {
    $.ajax({
        type: "get",
        url: "/api/users",
        success(data) {

        }
    });
};