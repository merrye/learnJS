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
                            oMain.innerHTML = "";
                            const oDate = document.createElement("div"),
                                oDateSpan = document.createElement("span"),
                                oDateInput = document.createElement("input"),
                                articles = document.createElement("div");
                            oDate.className = "date";
                            oDateSpan.innerHTML = "时间";
                            oDateInput.className = "date-input";
                            oDateInput.setAttribute("placeholder" , time.toLocaleDateString().replace(/\//g , "-"));
                            oDate.appendChild(oDateSpan);
                            oDate.appendChild(oDateInput);
                            oMain.appendChild(oDate);
                            oDateInput.addEventListener("click" , switchDate.bind(this)() , false);
                        }else{
                            
                        };
                    }
                });
                break;
        };
    };
});

function switchDate(input){
    console.log(input);
    return () => {

    };
};

function generatePageContent(){

};