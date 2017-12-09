const oItem = document.getElementsByClassName("item"),
    oMain = document.getElementsByClassName("main")[0],
    oSubItem = document.getElementsByClassName("sub-item"),
    oSlider = document.getElementsByClassName("slider")[0],
    oMeunItem = document.getElementsByClassName("meun-item");

[...oItem].forEach((ele , index) => {
    ele.addEventListener("click" , function(){
        const name = "clicked",
            subItem = oSubItem[index];
        toggleClassName(ele , name);
        css(subItem , {
            display: hasClassName(ele , name) ? "block" : "none"
        });
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
        oMain.innerHTML = `<div class="loading"></div>`;
        switch (index){
            case 0:

                break;
            case 1:
                const time = new Date(),
                    year = time.getFullYear(),
                    month = time.getMonth() + 1;
                $.ajax({
                    url: `/article/${year}/${month}`,
                    type: "get",
                    success(data){
                        if(data.length){
                            generatePageContent(data , time);
                        }else{
                            
                        };
                    }
                });
                break;
        };
    };
});

function generatePageContent(data , time){
    oMain.innerHTML = "";
    const oDate = createElementByTag("div"),
        oDateSpan = createElementByTag("span"),
        oDateInput = createElementByTag("input");
    oDate.className = "date";
    oDateSpan.innerHTML = "时间";
    oDateInput.id = "date-input";
    oDateInput.setAttribute("placeholder" , "yyyy-MM-dd");
    oDateInput.value = new Date().toLocaleDateString().split("/").map(ele => Number(ele) < 10 ? "0" + ele : ele).join("-");
    oDate.appendChild(oDateSpan);
    oDate.appendChild(oDateInput);
    oMain.appendChild(oDate);
    const articles = generateArticles(data);
    oMain.appendChild(articles);
    oDateInput.addEventListener("click" , renderDate , false);
};

function generateArticles(articles){
    const oArticles = createElementByTag("div");
    oArticles.className = "articles";
    for(let article of articles){
        const oArticle = createElementByTag("div");
        oArticle.className = "article";
        oArticle.innerHTML = article.createdAt.split("/").filter((ele , index) => index !== 0).map(ele => Number(ele) < 10 ? "0" + ele : ele).join("-");
        const oA = createElementByTag("a");
        oA.href = article.href;
        oA.innerHTML = article.title;
        oArticle.appendChild(oA);
        oArticles.appendChild(oArticle);
    };
    return oArticles;
};

function createElementByTag(tag){
    return document.createElement(tag);
};

function renderDate(ev) {
    const oResult = ev.target,
        elem = `#${oResult.id}`,
        proxy = new Proxy(oResult , {
            get(target , key) {
                return key === "target" ? target : target[key]
            },
            set(target , key , value) {
                target[key] !== "" && target[key] !== value && switchArticles();
                target[key] = value;
                return true;
            }
        });

    layer.open({
        proxy,
        elem,
        type: "calendar",
        offset: [oResult.offsetTop + oResult.offsetHeight + 10, oResult.offsetLeft]
    });
};
ajax({
    url: "/article/2017/12",
    success(data) {
        console.log(data);
    }
});
function switchArticles() {
    
};