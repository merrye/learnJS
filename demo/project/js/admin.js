const oItem = document.getElementsByClassName("item"),
    oMain = document.getElementsByClassName("main")[0],
    oSubItem = document.getElementsByClassName("sub-item"),
    oSlider = document.getElementsByClassName("slider")[0],
    oMeunItem = document.getElementsByClassName("meun-item");

$(".username").html(window.localStorage.getItem("username"));

$(".logout").on("click", function() {
    window.localStorage.clear();
    window.location.href = window.location.href.split("pages")[0] + "index.html";
});

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
                getAllUsers();
                /*oMain.innerHTML = `
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
                `;*/
                break;
            case 1:
                getAllProducts();
                /*oMain.innerHTML = `
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
                `;*/
               break;
            case 2:
                getProductHtmlContent();
                // const oConfirm = document.getElementsByClassName("confirm");
                // oConfirm[0] && oConfirm[0].addEventListener("click", createProduct, false);
                break;
        };
    };
});

function createProduct(){
    $.ajax({
        type: "post",
        url: "http://10.30.90.13:8080/product",
        data: {
            dec: $(".product_dec").val(),
            price: $(".product_price").val(),
            stock: $(".product_stock").val(),
            imagehref: "",
        },
        success(data) {
            if(data) {
                alert("添加成功");
            };
        }
    });
};

function getAllUsers() {
    $.ajax({
        type: "get",
        url: "http://10.30.90.13:8080/users",
        success(data) {
            const oDiv = $(`
                <div class="user-nav">
                    <span class="user-id">用户ID</span>
                    <span class="user-name">用户姓名</span>
                </div>`),
                oUl = $("<ul class='users-list'></ul>");
            for(let user of data) {
                const li = $(`<li data-id=${user.userid}><span>${user.userid}</span><span>${user.username}</span></li>`)
                oUl.append(li);
            };
            $(".main").html("").append(oDiv).append(oUl);
        }
    });
};

function getAllProducts() {
    $.ajax({
        type: "get",
        url: "http://10.30.90.13:8080/product",
        success(data) {
            const oDiv = $('<div class="product-nav"><span class="dec">商品</span><span>单价</span><span>库存</span><span>操作</span></div>'),
                oUl = $('<ul class="product-list"></ul>');
            for(let product of data) {
                const oLi = $(`
                    <li>
                        <a href="product.html?id=${product.product_id}" class="dec">
                            <img src="../${product.image_href}" alt="">
                            <i>${product.dec}</i>
                        </a>
                        <span>${product.price}</span>
                        <span>${product.stock}</span>
                        <span class="operate"><i class="update" data-id=${product.product_id}>编辑</i><i class="del" data-id=${product.product_id}>删除</i></span>
                    </li>`);
                oUl.append(oLi);
            };
            $(".main").html("").append(oDiv).append(oUl);
            [...document.getElementsByClassName("del")].forEach(ele => {
                ele.addEventListener("click", function() {
                    $.ajax({
                        type: "post",
                        url: "http://10.30.90.13:8080/deleteProduct",
                        data: {
                            product_id: ele.dataset.id
                        },
                        success(data) {
                            console.log(data)
                            ele.parentElement.parentElement.remove();
                        }
                    });
                }, false);
            });
            [...document.getElementsByClassName("update")].forEach(ele => {
                ele.addEventListener("click", function() {
                    getProductHtmlContent(true, ele.dataset.id);
                }, false);
            });
        }
    });
};

function getProductHtmlContent(isUpdate, product_id) {
    if(isUpdate) {
        $.ajax({
            type: "get",
            url: `http://10.30.90.13:8080/getProduct?id=${product_id}`,
            success(data) {
                oMain.innerHTML = `
                    <form action="http://10.30.90.13:8080/updateProduct" method="post" enctype="multipart/form-data">
                        <div class="product">
                            <span>商品描述</span>
                            <input type="text" name="name" class="product_dec" value=${data.dec} />
                        </div>
                        <div class="product">
                            <span>商品单价</span>
                            <input type="text" name="price" class="product_price" value=${data.price} />
                        </div>
                        <div class="product">
                            <span>商品库存</span>
                            <input type="text" name="stock" class="product_stock" value=${data.stock} />
                        </div>
                        <div class="product image">
                            <span>商品图片</span>
                            <img src="../${data.image_href}" />
                            <input type="file" name="imageHref" class="product_image" />
                        </div>
                        <div class="product">
                            <input type="submit" />
                        </div>
                    <form>
                `;
                // const oConfirm = document.getElementsByClassName("confir  eProduct(data), false);
            }
        });
    }
    else{
        oMain.innerHTML = `
            <form action="http://10.30.90.13:8080/product" method="post" enctype="multipart/form-data">
                <div class="product">
                    <span>商品描述</span>
                    <input type="text" name="name" class="product_dec" />
                </div>
                <div class="product">
                    <span>商品单价</span>
                    <input type="text" name="price" class="product_price" />
                </div>
                <div class="product">
                    <span>商品库存</span>
                    <input type="text" name="stock" class="product_stock" />
                </div>
                <div class="product">
                    <span>商品图片</span>
                    <input type="file" name="file" />
                </div>
                <div class="product">
                    <input type="submit" />
                </div>
            </form>
        `
    };
};

function updateProduct(product) {
    return () => {
        $.ajax({
            type: "post",
            url: "http://10.30.90.13:8080/updateProduct",
            data: {
                dec: $(".product_dec").val(),
                product_id: product.product_id,
                price: $(".product_price").val(),
                stock: $(".product_stock").val(),
                image_href: product.image_href
            },
            success(data) {
                getAllProducts();
            }
        });
    };
};