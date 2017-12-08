((window) => {
    "use strict";
    const jsPath = getJSPath(),
        INIT_WEEK_NUMBER = 7,
        INIT_MONTH_NUMBER = 12,
        INIT_YEAR_NUMBER = 15,
        MONTH_NUMBER_ARR = [31,28,31,30,31,30,31,31,30,31,30,31],
        monthArr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        layer = new Proxy({} , {
        get(target , property){
            const oHead = document.getElementsByTagName("head")[0],
                oLink = document.createElement("link");
            oLink.setAttribute("rel" , "stylesheet");
            oLink.setAttribute("href" , `${jsPath.substr(0 , jsPath.lastIndexOf("/") + 1)}css/layer.css`);
            oHead.appendChild(oLink);
            return (attrs = {} , ...children) => {
                if(property === "open"){
                    const {type , offset = ["c"]} = attrs,
                        [top , left] = getOffset(offset);
                    switch (type) {
                        case "calendar":
                            const oCalendar = document.getElementsByClassName("calendar");
                            if(oCalendar.length === 0){
                                const calendar = generateCalendar(attrs.proxy);
                                calendar.run();
                                css(calendar.oCalendar , {top , left});
                            };
                            break;
                    };
                };
            };
        }
    }),
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
    });
    function generateCalendar(proxy) {
        const time = proxy.value ? new Date(proxy.value) : new Date();
        let [nowYearCount , nowMonthCount , nowDateCount] = time.toLocaleDateString().split("/").map(ele => Number(ele));
        const oCalendar = dom.div({class: "calendar"} , 
                dom.div({class: "header"} ,
                    dom.span({class: "prev changeYear prevYear"} , 
                        dom.i({}) , dom.i({})
                    ),
                    dom.span({class: "prev changeMonth prevMonth"} , 
                        dom.i({}) , dom.i({})
                    ),
                    dom.div({} ,
                        dom.span({class: "year"} , `${nowYearCount}年`) , dom.span({class: "month"} , `${nowMonthCount}月`)
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
            ),
            calendar = {oCalendar};
        
        document.body.appendChild(oCalendar);
        const oTime = document.getElementsByClassName("time"),
            oMain = document.getElementsByClassName("main")[0],
            oYear = document.getElementsByClassName("year")[0],
            oMonth = document.getElementsByClassName("month")[0],
            oClear = document.getElementsByClassName("clear")[0],
            oNowTime = document.getElementsByClassName("nowTime")[0],
            oConfirm = document.getElementsByClassName("confirm")[0],
            oYearItem = document.getElementsByClassName("year-item"),
            oMonthItem = document.getElementsByClassName("month-item"),
            oChangeYear = document.getElementsByClassName("changeYear"),
            oChangeMonth = document.getElementsByClassName("changeMonth");

        calendar.init = function() {
            setCalendar(time);

            oMonth.addEventListener("click" , () => {
                changeDate({
                    loopCount: INIT_MONTH_NUMBER,
                    loopHTMLElements: oMonthItem,
                    getHtml: i => monthArr[i],
                    setDate: (ele , index) => nowMonthCount = index + 1,
                    getClassName: i => i === nowMonthCount - 1 ? "month-item now" : "month-item",
                });
            } , false);

            oClear.addEventListener("click" , () => {
                proxy.value = "";
                calendar.destroy();
            } , false);
    
            oNowTime.addEventListener("click" , () => {
                proxy.value = dateBeautify(new Date());
                calendar.destroy();
            } , false);

            oConfirm.addEventListener("click" , () => {
                const oLiLength = oYearItem.length;
                oLiLength && (nowYearCount = Number.parseInt(oYearItem[Math.floor(oLiLength / 2)].innerHTML));
                proxy.value = dateBeautify([nowYearCount,nowMonthCount,nowDateCount]);
                calendar.destroy();
            } , false);

            oYear.addEventListener("click" , () => {
                oYear.innerHTML = `${nowYearCount - INIT_MONTH_NUMBER}年-${nowYearCount + INIT_MONTH_NUMBER}年`;
                changeDate({
                    loopCount: INIT_YEAR_NUMBER,
                    loopHTMLElements: oYearItem,
                    getHtml: i => `${nowYearCount - INIT_MONTH_NUMBER + i}年`,
                    getClassName: i => i === Math.floor(INIT_YEAR_NUMBER / 2) ? "year-item now" : "year-item",
                    setDate: (ele , index) => nowYearCount = Number.parseInt(ele.innerHTML),
                });
                [...oChangeYear].forEach((ele , index) => {
                    ele.removeEventListener("click" , index ? yearAdd : yearLess , false);
                    ele.addEventListener("click", index ? setYear(INIT_YEAR_NUMBER) : setYear(-INIT_YEAR_NUMBER) ,false);
                });
            } , false);

            [...oChangeMonth].forEach((ele , index) => {
                ele.addEventListener("click" , index ? monthAdd : monthLess , false);
            });
    
            [...oChangeYear].forEach((ele , index) => {
                ele.addEventListener("click" , index ? yearAdd : yearLess , false);
            });
            
            [...oTime].forEach(ele => {
                ele.addEventListener("click" , () => {
                    proxy.value = dateBeautify([nowYearCount , nowMonthCount , Number.parseInt(ele.innerHTML)]);
                    calendar.destroy();
                } , false);
            });
        };

        calendar.run = function() {
            this.init();
            document.body.addEventListener("click" , function(ev) {
                (ev || window.event).target === this && calendar.destroy();
            } , false);
        };

        calendar.destroy = function() {
            [...document.getElementsByClassName("calendar")].forEach(ele => ele.remove());
            document
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

        function setInitState(){
            oMonth.style.display = "inline-block";
            [...oChangeMonth].forEach(ele => ele.style.opacity = 1);
            [...oChangeYear].forEach((ele , index) => {
                ele.addEventListener("click" , index ? yearAdd : yearLess , false);
                ele.removeEventListener("click", index ? setYear(INIT_YEAR_NUMBER) : setYear(-INIT_YEAR_NUMBER) ,false)
            });
        };

        function dateBeautify(date) {
            return Array.isArray(date)
                ? date.map(addZero).join("-")
                : date.toLocaleDateString().split("/").map(addZero).join("-");
        };
        
        function addZero(ele){
            return Number(ele) < 10 ? "0" + ele : ele;
        };

        return calendar;
    };
    function getOffset(offset) {
        const W = window.innerWidth,
            H = window.innerHeight;
        let top , left = 0;
        if(offset === "c"){
            top = W / 2;
            left = H / 2;
        }else if(Array.isArray(offset)){
            [top , left] = offset;
        };
        return [top , left];
    };
    function getJSPath() {
        const jsPath = document.getElementsByTagName("script")[0].src;
        return jsPath.substr(0 , jsPath.lastIndexOf("/"));
    };
    window.layer = layer;
})(window);