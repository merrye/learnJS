const E = window.wangEditor,
    oItem = document.getElementsByClassName("item"),
    oMain = document.getElementsByClassName("main")[0],
    oSubItem = document.getElementsByClassName("sub-item"),
    oSlider = document.getElementsByClassName("slider")[0],
    oMeunItem = document.getElementsByClassName("meun-item");

let editor;

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
                generateWriteArticleContent();
                break;
            case 1:
                ajax({
                    url:`/article/${year}/${month}`,
                    success(data){
                        generatePageContent(JSON.parse(data) , time , false);
                    }
                });
                break;
            case 2:
                ajax({
                    url: `/article/${year}`,
                    success(data) {
                        generatePageContent(JSON.parse(data) , time , true);
                    }
                });
                break;
        };
    };
});

function generatePageContent(data , time , isByYear){
    oMain.innerHTML = "";
    const oDate = createElementByTag("div"),
        oDateSpan = createElementByTag("span"),
        oDateInput = createElementByTag("input"),
        oArticles = createElementByTag("div");
    oDate.className = "date";
    oDateSpan.innerHTML = "时间";
    oDateInput.id = "date-input";
    oDateInput.isByYear = isByYear;
    oDateInput.setAttribute("placeholder" , "yyyy-MM-dd");
    oDateInput.value = new Date().toLocaleDateString().split("/").map(ele => Number(ele) < 10 ? "0" + ele : ele).join("-");
    oArticles.className = "articles";
    oDate.appendChild(oDateSpan);
    oDate.appendChild(oDateInput);
    oMain.appendChild(oDate);
    generateArticles(oArticles , data);
    oMain.appendChild(oArticles);
    oDateInput.addEventListener("click" , renderDate , false);
};

function generateWriteArticleContent() {
    const pageContent = dom.div({class: "wrap"}, 
            dom.h3({}, "撰写文章"),
            dom.div({class: "title"}, 
                dom.span({}, "标题："),
                dom.input({type: "text", class: "cn_article_title article_title", placeholder: "无标题博客……", name: "title"})
            ),
            dom.div({class: "title"}, 
                dom.span({}, "英文标题："),
                dom.input({type: "text", class: "eng_article_title article_title", placeholder: "请输入英文标题……", name: "english_title"})
            ),
            dom.div({class: "summary"},
                dom.textarea({name: "description", id: "description", cols: "30", rows: "10", placeholder: "无摘要……"})
            ),
            dom.div({class: "menu"},
                dom.div({class: "menu-item classification"}, 
                    dom.div({class: "row-left"}, "分类："),
                    dom.div({class: "row-right"}, 
                        dom.input({class: "classifications", type: "text", name: "classification", placeholder: "请输入关键词，使用分号隔开"})
                    )
                ),
                dom.div({class: "menu-item tag"}, 
                    dom.div({class: "row-left"}, "标签："),
                    dom.div({class: "row-right"}, 
                        dom.input({class: "tags", type: "text", name: "tags", placeholder: "请输入关键词，使用分号隔开"})
                    )
                )
            ),
            dom.div({class: "aritcle-content"},
                dom.div({id: "editor"})
            ),
            dom.div({class: "footer"},
                dom.span({class: "submit"}, "发布")
            )
        );
    oMain.innerHTML = "";
    oMain.appendChild(pageContent);

    const oDescription = document.getElementById("description");

    editor = new E("#editor");

    oDescription.addEventListener("focus", function() {
        this.style.height = "150px";
    }, false);

    oDescription.addEventListener("blur", function() {
        this.style.height = "2em";
    }, false);

    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();

    document.getElementsByClassName("submit")[0].addEventListener("click", createArticle, false);
};

function createArticle() {
    const content = editor.txt.html(),
        tags = document.getElementsByClassName("tags")[0].value,
        description = document.getElementById("description").value,
        title = document.getElementsByClassName("cn_article_title")[0].value,
        eng_title = document.getElementsByClassName("eng_article_title")[0].value,
        classifications = document.getElementsByClassName("classifications")[0].value;

    ajax({
        type: "post",
        url: "/article",
        data: {
            tags, title, content, eng_title, description, classifications
        },
        success(data) {
            console.log(data);
        }
    });
};

function generateArticles(oArticles , articles){
    oArticles.innerHTML = "";
    for(let article of articles){
        const oArticle = createElementByTag("div");
        oArticle.className = "article";
        oArticle.innerHTML = article.createdAt.split("/").filter((ele , index) => index !== 0).join("-");
        const oA = createElementByTag("a");
        oA.href = article.href;
        oA.innerHTML = article.title;
        oArticle.appendChild(oA);
        oArticles.appendChild(oArticle);
    };
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
                value !== "" && target[key] !== value && (target.isByYear ? switchArticlesByYear(value) : switchArticlesByMonth(value));
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

function switchArticlesByMonth(value) {
    ajax({
        url: `/article/${value.substr(0 , value.lastIndexOf("-")).replace(/-/g , "/")}`,
        success(data) {
            generateArticles(document.getElementsByClassName("articles")[0] , JSON.parse(data));
        }
    });
};

function switchArticlesByYear(value) {
    ajax({
        url: `/article/${value.substr(0 , value.indexOf("-"))}`,
        success(data) {
            generateArticles(document.getElementsByClassName("articles")[0] , JSON.parse(data));
        }
    });
};