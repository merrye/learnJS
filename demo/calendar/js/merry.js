;((window) => {
    "use strict";
    const merry = new Proxy({} , {
        get(target , property){
            return (attrs = {} , ...children) => {
                switch (attrs.type) {
                    case "calendar":
                        
                        break;
                };
            };
        }
    });
    window.merry = merry;
})(window);

/*
    const INIT_WEEK_NUMBER = 7,
        INIT_MONTH_NUMBER = 12,
        INIT_YEAR_NUMBER = 15,
        MONTH_NUMBER_ARR = [31,28,31,30,31,30,31,31,30,31,30,31],
        monthArr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        oResult = document.getElementsByClassName("result")[0],
        dom = new Proxy({} , {
            get(target , property) {
                return function(attrs = {}, ...children) {
                    const el = document.createElement(property);
                    for (let prop of Object.keys(attrs)) {
                        el.setAttribute(prop , attrs[prop]);
                    };
                    for (let child of children) {
                        if (typeof child === "string" ) {
                            child = document.createTextNode(child);
                        };
                    el.appendChild(child);
                    };
                    return el;
                };
            }
        }),
        oCalendar = generateCalendar();

    window.onload = () => {
        oResult.setAttribute("placeholder" , "yyyy-MM-dd");
    };
    oResult.addEventListener("click" , () => {
        const nowTime = new Date(),
            obj = document.getElementsByClassName("calendar")[0];
        let [nowYearCount , nowMonthCount , nowDateCount] = nowTime.toLocaleDateString().split("/").map(ele => Number(ele));
        obj ? obj.remove() : document.body.appendChild(oCalendar);
        const oTime = document.getElementsByClassName("time"),
            oMain = document.getElementsByClassName("main")[0],
            oYear = document.getElementsByClassName("year")[0],
            oMonth = document.getElementsByClassName("month")[0],
            oClear = document.getElementsByClassName("clear")[0],
            oNowTime = document.getElementsByClassName("nowTime")[0],
            oConfirm = document.getElementsByClassName("confirm")[0],
            oChangeYear = document.getElementsByClassName("changeYear"),
            oChangeMonth = document.getElementsByClassName("changeMonth"),
            oYearItem = document.getElementsByClassName("year-item"),
            oMonthItem = document.getElementsByClassName("month-item");
        init();
        
        function init(){
            setCalendar(nowTime);
            oMonth.addEventListener("click" , () => {
                changeDate({
                    loopCount: INIT_MONTH_NUMBER,
                    loopHTMLElements: oMonthItem,
                    getHtml: i => monthArr[i],
                    setDate: (ele , index) => nowMonthCount = index + 1,
                    getClassName: i => i === nowMonthCount - 1 ? "month-item now" : "month-item",
                });
            } , false);
        
            oYear.addEventListener("click" , () => {
                oYear.innerHTML = `${nowYearCount - INIT_MONTH_NUMBER}年-${nowYearCount + INIT_MONTH_NUMBER}年`;
                changeDate({
                    loopCount: INIT_YEAR_NUMBER,
                    loopHTMLElements: oYearItem,
                    getHtml: i => `${nowYearCount - INIT_MONTH_NUMBER + i}年`,
                    getClassName: i => i === INIT_MONTH_NUMBER ? "year-item now" : "year-item",
                    setDate: (ele , index) => nowYearCount = Number.parseInt(ele.innerHTML),
                });
                [...oChangeYear].forEach((ele , index) => {
                    ele.removeEventListener("click" , index ? yearAdd : yearLess , false);
                    ele.addEventListener("click", index ? setYear(INIT_YEAR_NUMBER) : setYear(-INIT_YEAR_NUMBER) ,false);
                });
            } , false);
        
            oClear.addEventListener("click" , () => {
                oResult.innerHTML = "yyyy-MM-dd";
            } , false);
        
            oNowTime.addEventListener("click" , () => {
                [nowYearCount , nowMonthCount , nowDateCount] = nowTime.toLocaleDateString().split("/").map(ele => Number(ele));
                oResult.innerHTML = `${nowYearCount}-${nowMonthCount}-${nowDateCount}`;
                setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
                setInitState();
                [...oMain.children].forEach((ele , index) => index !== 0 && ele.remove());
            } , false);
        
            oConfirm.addEventListener("click" , () => {
                const oLiLength = oYearItem.length;
                oLiLength && (nowYearCount = Number.parseInt(oYearItem[Math.floor(oLiLength / 2)].innerHTML));
                setInitState();
                [...oMain.children].forEach((ele , index) => index !== 0 && ele.remove());
                oYear.innerHTML = `${nowYearCount}年`;
                oResult.innerHTML = `${nowYearCount}-${nowMonthCount}-${nowDateCount}`;
            } , false);
        
            [...oChangeMonth].forEach((ele , index) => {
                ele.addEventListener("click" , index ? monthAdd : monthLess , false);
            });
        
            [...oChangeYear].forEach((ele , index) => {
                ele.addEventListener("click" , index ? yearAdd : yearLess , false);
            });
            
            [...oTime].forEach(ele => {
                ele.addEventListener("click" , () => {
                    const className = ele.className;
                    if(className.includes("prevMonth")){
                        MonthSubtract();
                    }else if(className.includes("nextMonth")){
                        MonthAdd();
                    };
                    setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${Number(ele.innerHTML)}`));
                } , false);
            });
        };
        
        function setCalendar(time){
            const [year , month , date] = time.toLocaleDateString().split("/").map(ele => Number(ele)),
                day_of_week = new Date(`${year}/${month}/1`).getDay(),    // 获取本月1号为周几
                prevMonthAllDays = MONTH_NUMBER_ARR[month - 2 !== -1 ? month - 2 : INIT_MONTH_NUMBER - 1],
                isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0,   // 判断是否为闰年
                nowMonthDays = (isLeapYear && month === 2) ? 29 : MONTH_NUMBER_ARR[month - 1];
            let rowCount = 0,
                columnCount = -1,
                className = "time",
                count = prevMonthAllDays - day_of_week;
            for(let i = 0;i < 42;i ++){
                count ++;
                columnCount ++;
                if((count === prevMonthAllDays + 1 && rowCount === 0) || (count === nowMonthDays + 1 && rowCount !== 0)){
                    count = 1;
                };
                const sum = rowCount * INIT_MONTH_NUMBER + columnCount;
                if(sum < day_of_week){
                    className = "time prevMonth";
                }else if(sum >= nowMonthDays + day_of_week){
                    className = "time nextMonth";
                }else if(sum === day_of_week + date - 1){
                    className = "time nowTime"; 
                }else{
                    className = "time"; 
                };
                if(columnCount === INIT_MONTH_NUMBER){
                    rowCount ++;
                    columnCount = 0;
                };
                oTime[rowCount * INIT_MONTH_NUMBER + columnCount].innerHTML = count;
                oTime[rowCount * INIT_MONTH_NUMBER + columnCount].className = className;
            };
            oYear.innerHTML = `${year}年`;
            oMonth.innerHTML = `${month}月`;
            oResult.innerHTML = `${year}-${month}-${date}`;
        };
        
        function yearLess(){
            setCalendar(new Date(`${-- nowYearCount}/${nowMonthCount}/${nowDateCount}`));
        };
        
        function yearAdd(){
            setCalendar(new Date(`${++ nowYearCount}/${nowMonthCount}/${nowDateCount}`));
        };
        
        function monthLess(){
            MonthSubtract();
            setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
        };
        
        function monthAdd(){
            MonthAdd();
            setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
        };
        
        function MonthAdd(){
            nowMonthCount ++;
            if(nowMonthCount === INIT_MONTH_NUMBER +1){
                nowYearCount ++;
                nowMonthCount = 1;
            };
        };
        
        function MonthSubtract(){
            nowMonthCount --;
            if(nowMonthCount === 0){
                nowYearCount --;
                nowMonthCount = INIT_MONTH_NUMBER;
            };
        };
        
        function setInitState(){
            oMonth.style.display = "inline-block";
            [...oChangeMonth].forEach(ele => ele.style.opacity = 1);
            [...oChangeYear].forEach((ele , index) => {
                ele.addEventListener("click" , index ? yearAdd : yearLess , false);
                ele.removeEventListener("click", index ? setYear(INIT_YEAR_NUMBER) : setYear(-INIT_YEAR_NUMBER) ,false)
            });
        };
        
        function setYear(YEAR_COUNT){
            return () => {
                oYear.innerHTML = oYear.innerHTML.split("-").map(ele => `${Number.parseInt(ele) + YEAR_COUNT}年`).join("-");
                [...oYearItem].forEach(ele => ele.innerHTML = `${Number.parseInt(ele.innerHTML) + YEAR_COUNT}年`);
            };
        };
        
        function changeDate({loopCount , loopHTMLElements , getHtml , getClassName , setDate}){
            oMonth.style.display = "none";
            [...oChangeMonth].forEach(ele => ele.style.opacity = 0);
            const oUl = document.createElement("ul");
            for(let i = 0;i < loopCount;i ++){
                const oLi = document.createElement("li");
                oLi.innerHTML = getHtml(i);
                oLi.className = getClassName(i);
                oUl.appendChild(oLi);
            };
            oMain.appendChild(oUl);
            [...loopHTMLElements].forEach((ele , index) => {
                ele.addEventListener("click" , function(){
                    setDate(ele , index);
                    setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
                    oUl.remove();
                    setInitState()
                } , false);
            });
        };
    });

    function generateCalendar(){
        return dom.div({class: "calendar"} , 
            dom.div({class: "header"} ,
                dom.span({class: "prev changeYear prevYear"} , 
                    dom.i({}) , dom.i({})
                ),
                dom.span({class: "prev changeMonth prevMonth"} , 
                    dom.i({}) , dom.i({})
                ),
                dom.div({} ,
                    dom.span({class: "year"}) , dom.span({class: "month"})
                ),
                dom.span({class: "next changeMonth nextMonth"} , 
                    dom.i({}),dom.i({})
                ),
                dom.span({class: "next changeYear nextYear"} , 
                    dom.i({}),dom.i({})
                )
            ),
            dom.div({class: "main"} ,
                dom.div({class: "content"} , 
                    dom.div({class: "week"} , 
                        dom.span({} , "日"), dom.span({} , "一"), dom.span({} , "二"), dom.span({} , "三"), 
                        dom.span({} , "四"), dom.span({} , "五"), dom.span({} , "六"),
                    ),
                    dom.div({} , 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}),
                    ),
                    dom.div({} , 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}),
                    ),
                    dom.div({} , 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}),
                    ),
                    dom.div({} , 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}),
                    ),
                    dom.div({} , 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}),
                    ),
                    dom.div({} , 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}), 
                        dom.span({class: "time"}), dom.span({class: "time"}), dom.span({class: "time"}),
                    )
                )
            ),
            dom.div({class: "footer"},
                dom.span({class: "clear"} , "清除"),
                dom.span({class: "nowTime"} , "现在"),
                dom.span({class: "confirm"} , "确定")
            )
        );
    };
*/
/*
    const nowTime = new Date(),
        INIT_WEEK_NUMBER = 7,
        INIT_MONTH_NUMBER = 12,
        INIT_YEAR_NUMBER = 15,
        oTime = document.getElementsByClassName("time"),
        oMain = document.getElementsByClassName("main")[0],
        oYear = document.getElementsByClassName("year")[0],
        oMonth = document.getElementsByClassName("month")[0],
        oClear = document.getElementsByClassName("clear")[0],
        oNowTime = document.getElementsByClassName("nowTime")[0],
        oConfirm = document.getElementsByClassName("confirm")[0],
        oChangeYear = document.getElementsByClassName("changeYear"),
        oChangeMonth = document.getElementsByClassName("changeMonth"),
        oYearItem = document.getElementsByClassName("year-item"),
        oMonthItem = document.getElementsByClassName("month-item"),
        MONTH_NUMBER_ARR = [31,28,31,30,31,30,31,31,30,31,30,31],
        monthArr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

    let [nowYearCount , nowMonthCount , nowDateCount] = nowTime.toLocaleDateString().split("/").map(ele => Number(ele));

    init();

    function init(){
        setCalendar(nowTime);
        oMonth.addEventListener("click" , () => {
            changeDate({
                loopCount: INIT_MONTH_NUMBER,
                loopHTMLElements: oMonthItem,
                getHtml: i => monthArr[i],
                setDate: (ele , index) => nowMonthCount = index + 1,
                getClassName: i => i === nowMonthCount - 1 ? "month-item now" : "month-item",
            });
        } , false);

        oYear.addEventListener("click" , () => {
            oYear.innerHTML = `${nowYearCount - INIT_MONTH_NUMBER}年-${nowYearCount + INIT_MONTH_NUMBER}年`;
            changeDate({
                loopCount: INIT_YEAR_NUMBER,
                loopHTMLElements: oYearItem,
                getHtml: i => `${nowYearCount - INIT_MONTH_NUMBER + i}年`,
                getClassName: i => i === INIT_MONTH_NUMBER ? "year-item now" : "year-item",
                setDate: (ele , index) => nowYearCount = Number.parseInt(ele.innerHTML),
            });
            [...oChangeYear].forEach((ele , index) => {
                ele.removeEventListener("click" , index ? yearAdd : yearLess , false);
                ele.addEventListener("click", index ? setYear(INIT_YEAR_NUMBER) : setYear(-INIT_YEAR_NUMBER) ,false);
            });
        } , false);

        oClear.addEventListener("click" , () => {
            oResult.innerHTML = "yyyy-MM-dd";
        } , false);

        oNowTime.addEventListener("click" , () => {
            [nowYearCount , nowMonthCount , nowDateCount] = nowTime.toLocaleDateString().split("/").map(ele => Number(ele));
            oResult.innerHTML = `${nowYearCount}-${nowMonthCount}-${nowDateCount}`;
            setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
            setInitState();
            [...oMain.children].forEach((ele , index) => index !== 0 && ele.remove());
        } , false);

        oConfirm.addEventListener("click" , () => {
            const oLiLength = oYearItem.length;
            oLiLength && (nowYearCount = Number.parseInt(oYearItem[Math.floor(oLiLength / 2)].innerHTML));
            setInitState();
            [...oMain.children].forEach((ele , index) => index !== 0 && ele.remove());
            oYear.innerHTML = `${nowYearCount}年`;
            oResult.innerHTML = `${nowYearCount}-${nowMonthCount}-${nowDateCount}`;
        } , false);

        [...oChangeMonth].forEach((ele , index) => {
            ele.addEventListener("click" , index ? monthAdd : monthLess , false);
        });

        [...oChangeYear].forEach((ele , index) => {
            ele.addEventListener("click" , index ? yearAdd : yearLess , false);
        });
        
        [...oTime].forEach(ele => {
            ele.addEventListener("click" , () => {
                const className = ele.className;
                if(className.includes("prevMonth")){
                    MonthSubtract();
                }else if(className.includes("nextMonth")){
                    MonthAdd();
                };
                setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${Number(ele.innerHTML)}`));
            } , false);
        });
    };

    function setCalendar(time){
        const [year , month , date] = time.toLocaleDateString().split("/").map(ele => Number(ele)),
            day_of_week = new Date(`${year}/${month}/1`).getDay(),    // 获取本月1号为周几
            prevMonthAllDays = MONTH_NUMBER_ARR[month - 2 !== -1 ? month - 2 : INIT_MONTH_NUMBER - 1],
            isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0,   // 判断是否为闰年
            nowMonthDays = (isLeapYear && month === 2) ? 29 : MONTH_NUMBER_ARR[month - 1];
        let rowCount = 0,
            columnCount = -1,
            className = "time",
            count = prevMonthAllDays - day_of_week;
        for(let i = 0;i < 42;i ++){
            count ++;
            columnCount ++;
            if((count === prevMonthAllDays + 1 && rowCount === 0) || (count === nowMonthDays + 1 && rowCount !== 0)){
                count = 1;
            };
            const sum = rowCount * INIT_MONTH_NUMBER + columnCount;
            if(sum < day_of_week){
                className = "time prevMonth";
            }else if(sum >= nowMonthDays + day_of_week){
                className = "time nextMonth";
            }else if(sum === day_of_week + date - 1){
                className = "time nowTime"; 
            }else{
                className = "time"; 
            };
            if(columnCount === INIT_MONTH_NUMBER){
                rowCount ++;
                columnCount = 0;
            };
            oTime[rowCount * INIT_MONTH_NUMBER + columnCount].innerHTML = count;
            oTime[rowCount * INIT_MONTH_NUMBER + columnCount].className = className;
        };
        oYear.innerHTML = `${year}年`;
        oMonth.innerHTML = `${month}月`;
        oResult.innerHTML = `${year}-${month}-${date}`;
    };

    function yearLess(){
        setCalendar(new Date(`${-- nowYearCount}/${nowMonthCount}/${nowDateCount}`));
    };

    function yearAdd(){
        setCalendar(new Date(`${++ nowYearCount}/${nowMonthCount}/${nowDateCount}`));
    };

    function monthLess(){
        MonthSubtract();
        setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
    };

    function monthAdd(){
        MonthAdd();
        setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
    };

    function MonthAdd(){
        nowMonthCount ++;
        if(nowMonthCount === INIT_MONTH_NUMBER +1){
            nowYearCount ++;
            nowMonthCount = 1;
        };
    };

    function MonthSubtract(){
        nowMonthCount --;
        if(nowMonthCount === 0){
            nowYearCount --;
            nowMonthCount = INIT_MONTH_NUMBER;
        };
    };

    function setInitState(){
        oMonth.style.display = "inline-block";
        [...oChangeMonth].forEach(ele => ele.style.opacity = 1);
        [...oChangeYear].forEach((ele , index) => {
            ele.addEventListener("click" , index ? yearAdd : yearLess , false);
            ele.removeEventListener("click", index ? setYear(INIT_YEAR_NUMBER) : setYear(-INIT_YEAR_NUMBER) ,false)
        });
    };

    function setYear(YEAR_COUNT){
        return () => {
            oYear.innerHTML = oYear.innerHTML.split("-").map(ele => `${Number.parseInt(ele) + YEAR_COUNT}年`).join("-");
            [...oYearItem].forEach(ele => ele.innerHTML = `${Number.parseInt(ele.innerHTML) + YEAR_COUNT}年`);
        };
    };

    function changeDate({loopCount , loopHTMLElements , getHtml , getClassName , setDate}){
        oMonth.style.display = "none";
        [...oChangeMonth].forEach(ele => ele.style.opacity = 0);
        const oUl = document.createElement("ul");
        for(let i = 0;i < loopCount;i ++){
            const oLi = document.createElement("li");
            oLi.innerHTML = getHtml(i);
            oLi.className = getClassName(i);
            oUl.appendChild(oLi);
        };
        oMain.appendChild(oUl);
        [...loopHTMLElements].forEach((ele , index) => {
            ele.addEventListener("click" , function(){
                setDate(ele , index);
                setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
                oUl.remove();
                setInitState()
            } , false);
        });
    };
*/