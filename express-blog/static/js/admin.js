const E = window.wangEditor,
    oItem = document.getElementsByClassName("item"),
    oMain = document.getElementsByClassName("main")[0],
    oSubItem = document.getElementsByClassName("sub-item"),
    oSlider = document.getElementsByClassName("slider")[0],
    oMeunItem = document.getElementsByClassName("meun-item");

let editor;

[...oItem].forEach((ele, index) => {
    ele.addEventListener("mouseenter", itemMouseenterHandler, false);
    ele.addEventListener("mouseleave", itemMouseleaveHandler, false);
    ele.addEventListener("click", itemClickHandler(ele, index), false);
});

[...oMeunItem].forEach((ele, index) => ele.addEventListener("click", menuItemClickHandler(ele, index), false));

function itemClickHandler(ele, index) {
    return function() {
        const name = "clicked",
            subItem = oSubItem[index];
        toggleClassName(ele, name);
        css(subItem, {display: hasClassName(ele, name) ? "block" : "none"});
    };
};

function itemMouseenterHandler() {
    css(oSlider, {
        opacity: 1,
        height: "50px",
        top: this.offsetTop
    });
};

function itemMouseleaveHandler() {
    css(oSlider, {
        height: 0,
        opacity: 0
    });
};

function menuItemClickHandler(ele, index) {
    return function(ev) {
        ev.stopPropagation();
        removeClass(oMeunItem, "clicked");
        addClassName(ele, "clicked");
        const time = new Date(),
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            Month = (Number(month) ? "0" : "") + month;
        oMain.innerHTML = `<div class="loading"></div>`;
        switch (index) {
            case 0:
                generateWriteArticleContent();
                break;
            case 1:
                ajax({
                    url:`/article/${year}/${Month}`,
                    success(data) {
                        generatePageContent(JSON.parse(data), `${year}-${Month}`, "month");
                    }
                });
                break;
            case 2:
                ajax({
                    url: `/article/${year}`,
                    success(data) {
                        generatePageContent(JSON.parse(data), year, "year");
                    }
                });
                break;
        };
    };
};

function generatePageContent(data, time, type) {
    oMain.innerHTML = "";
    const oDate = createElementByTag("div"),
        oDateSpan = createElementByTag("span"),
        oDateInput = createElementByTag("input"),
        oArticles = createElementByTag("div");
    oDate.className = "date";
    oDateSpan.innerHTML = "时间";
    oDateInput.id = "date-input";
    oDateInput.setAttribute("placeholder", "yyyy" + (type === "month" ? "-MM" : ""));
    oDateInput.value = time;
    oArticles.className = "articles";
    oDate.appendChild(oDateSpan);
    oDate.appendChild(oDateInput);
    oMain.appendChild(oDate);
    generateArticles(oArticles, data);
    oMain.appendChild(oArticles);
    layer.render({
        elem: "#date-input",
        type,
        yes(date) {
            switchArticles(date);
        }
    });
};

function generateWriteArticleContent() {
    const pageContent = getArticlePageContent({title: "文章编辑"});
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

    editor.customConfig.uploadImgServer = "/upload-image";
    editor.create();

    document.getElementsByClassName("submit")[0].addEventListener("click", createArticle, false);
};

function createArticle() {
    editArticle("文章已成功发布。", `/article`);
};

function generateArticles(oArticles, articles) {
    oArticles.innerHTML = "";
    for(let article of articles) {
        const oArticle = createElementByTag("div");
        oArticle.className = "article";
        oArticle.innerHTML = article.createdAt.split("/").filter((ele , index) => index !== 0).join("-");
        const oA = createElementByTag("a"),
            oUpdateBtn = createElementByTag("span");
        oA.href = article.href;
        oA.innerHTML = article.title;
        oUpdateBtn.className = "update-article";
        oUpdateBtn.innerHTML = "编辑";
        oArticle.appendChild(oA);
        oArticle.appendChild(oUpdateBtn);
        oArticles.appendChild(oArticle);
        oUpdateBtn.addEventListener("click", updateArticlePage(article.id), false);
    };
};

function updateArticlePage(articleID) {
    return () => {
        const pageContent = getArticlePageContent({title: "文章编辑"});
        oMain.innerHTML = "";
        oMain.appendChild(pageContent);

        const oTag = document.getElementsByClassName("tags")[0],
            oDescription = document.getElementById("description"),
            oTitle = document.getElementsByClassName("cn_article_title")[0],
            oEng_title = document.getElementsByClassName("eng_article_title")[0],
            oClassifications = document.getElementsByClassName("classifications")[0];

        editor = new E("#editor");

        oDescription.addEventListener("focus", function() {
            this.style.height = "150px";
        }, false);

        oDescription.addEventListener("blur", function() {
            this.style.height = "2em";
        }, false);

        editor.customConfig.uploadImgServer = "/upload-image";
        editor.create();
        ajax({
            url: `/article/update/id/${articleID}`,
            success(data) {
                const {tags, article, classifications} = JSON.parse(data);
                oTitle.value = article.title;
                oDescription.value = article.description;
                oEng_title.value = article.eng_title;
                editor.txt.html(article.content.replace(/-\$-/g, "&"));
                tags.forEach(ele => oTag.value += `${ele.content};`);
                classifications.forEach(ele => oClassifications.value += `${ele.content};`);
            }
        });
        document.getElementsByClassName("submit")[0].addEventListener("click", updateArticle(articleID), false);
    };
};

function updateArticle(articleID) {
    return () => editArticle("文章修改成功。", `/article/${articleID}`);
};

function editArticle(msg, url) {
    const content = editor.txt.html().replace(/\&/g, "-$-"),
        oTag = document.getElementsByClassName("tags")[0],
        oDescription = document.getElementById("description"),
        oTitle = document.getElementsByClassName("cn_article_title")[0],
        oEng_title = document.getElementsByClassName("eng_article_title")[0],
        oClassifications = document.getElementsByClassName("classifications")[0],
        tags = oTag.value,
        description = oDescription.value,
        title = oTitle.value,
        eng_title = oEng_title.value,
        classifications = oClassifications.value;

    if(title === "") {
        alert("标题不能为空。");
    }else if(content === "") {
        alert("内容不能为空。");
    }else{
        ajax({
            type: "post",
            url,
            data: {
                title, eng_title, description, classifications, tags, content
            },
            success(data) {
                data = JSON.parse(data);
                if(data.result === "ok") {
                    alert(msg);
                    oTag.value = "";
                    oTitle.value = "";
                    oEng_title.value = "";
                    oDescription.value = "";
                    oClassifications.value = "";
                    editor.txt.html("");
                };
            }
        });
    };
};

function createElementByTag(tag) {
    return document.createElement(tag);
};

function switchArticles(date) {
    ajax({
        url: `/article/${String(date).replace(/-/g, "/")}`,
        success(data) {
            generateArticles(document.getElementsByClassName("articles")[0], JSON.parse(data));
        }
    });
};

function getArticlePageContent(config) {
    const pageContent = dom.div({class: "wrap"}, 
        dom.h3({}, config.title),
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
    return pageContent;
};