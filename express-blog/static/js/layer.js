;((window) => {
    "use strict";
    const INIT_WEEK_NUMBER = 7,
        INIT_MONTH_NUMBER = 12,
        INIT_YEAR_NUMBER = 15,
        MONTH_NUMBER_ARR = [31,28,31,30,31,30,31,31,30,31,30,31],
        monthArr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        layer = new Proxy({} , {
			get(target , property){
				return (attrs = {} , ...children) => {
					if(property === "open"){
                        const styleSheets = document.styleSheets;
                        if([...styleSheets].findIndex(ele => ele.href.includes("layer")) === -1){
                            const oHead = document.getElementsByTagName("head")[0],
                                oLink = document.createElement("link");
                            oLink.setAttribute("rel" , "stylesheet");
                            oLink.setAttribute("href" , "/css/layer.css");
                            oHead.appendChild(oLink);
                        };
						const {type , offset = ["c"]} = attrs,
							[top , left] = getOffset(offset);
						switch (type) {
							case "calendar":
								const oCalendar = document.getElementsByClassName("layer-calendar");
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
		});
    function generateCalendar(proxy) {
        const time = proxy.value ? new Date(proxy.value) : new Date();
        let [nowYearCount , nowMonthCount , nowDateCount] = time.toLocaleDateString().split("/").map(ele => Number(ele));
        const oCalendar = dom.div({class: "layer-calendar"} , 
                dom.div({class: "layer-header"} ,
                    dom.span({class: "layer-prev layer-changeYear layer-prevYear"} , 
                        dom.i({class: "layer-i"}) , dom.i({class: "layer-i"})
                    ),
                    dom.span({class: "layer-prev layer-changeMonth layer-prevMonth"} , 
                        dom.i({class: "layer-i"})
                    ),
                    dom.div({class: "layer-show-date"} ,
                        dom.span({class: "layer-year"} , `${nowYearCount}年`) , dom.span({class: "layer-month"} , `${nowMonthCount}月`)
                    ),
                    dom.span({class: "layer-next layer-changeMonth layer-nextMonth"} , 
                        dom.i({class: "layer-i"})
                    ),
                    dom.span({class: "layer-next layer-changeYear layer-nextYear"} , 
                        dom.i({class: "layer-i"}),dom.i({class: "layer-i"})
                    )
                ),
                dom.div({class: "layer-main"} ,
                    dom.div({class: "layer-content"} , 
                        dom.div({class: "layer-week"} , 
                            dom.span({class: "layer-week-item"} , "日"), dom.span({class: "layer-week-item"} , "一"), dom.span({class: "layer-week-item"} , "二"), dom.span({class: "layer-week-item"} , "三"), 
                            dom.span({class: "layer-week-item"} , "四"), dom.span({class: "layer-week-item"} , "五"), dom.span({class: "layer-week-item"} , "六"),
                        ),
                        dom.div({class: "layer-date"} , 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}),
                        ),
                        dom.div({class: "layer-date"} , 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}),
                        ),
                        dom.div({class: "layer-date"} , 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}),
                        ),
                        dom.div({class: "layer-date"} , 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}),
                        ),
                        dom.div({class: "layer-date"} , 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}),
                        ),
                        dom.div({class: "layer-date"} , 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), 
                            dom.span({class: "layer-time"}), dom.span({class: "layer-time"}), dom.span({class: "layer-time"}),
                        )
                    )
                ),
                dom.div({class: "layer-footer"},
                    dom.span({class: "layer-clear"} , "清除"),
                    dom.span({class: "layer-nowTime"} , "现在"),
                    dom.span({class: "layer-confirm"} , "确定")
                )
            ),
            calendar = {oCalendar};
        
        document.getElementsByClassName("content")[0].appendChild(oCalendar);
        const oTime = document.getElementsByClassName("layer-time"),
            oMain = document.getElementsByClassName("layer-main")[0],
            oYear = document.getElementsByClassName("layer-year")[0],
            oMonth = document.getElementsByClassName("layer-month")[0],
            oClear = document.getElementsByClassName("layer-clear")[0],
            oNowTime = document.getElementsByClassName("layer-nowTime")[0],
            oConfirm = document.getElementsByClassName("layer-confirm")[0],
            oYearItem = document.getElementsByClassName("layer-year-item"),
            oMonthItem = document.getElementsByClassName("layer-month-item"),
            oChangeYear = document.getElementsByClassName("layer-changeYear"),
            oChangeMonth = document.getElementsByClassName("layer-changeMonth");

        calendar.init = function() {
            setCalendar(time);

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

            oMonth.addEventListener("click" , () => {
                document.getElementsByClassName("layer-month-ul").length === 0 && changeDate({
                    loopCount: INIT_MONTH_NUMBER,
                    loopHTMLElements: oMonthItem,
                    getHtml: i => monthArr[i],
                    setDate: (ele , index) => nowMonthCount = index + 1,
                    getClassName: i => i === nowMonthCount - 1 ? "layer-month-item layer-now" : "layer-month-item",
                });
            } , false);

            oYear.addEventListener("click" , () => {
                if(document.getElementsByClassName("layer-year-ul").length === 0) {
                    oYear.innerHTML = `${nowYearCount - INIT_MONTH_NUMBER}年-${nowYearCount + INIT_MONTH_NUMBER}年`;
                    changeDate({
                        loopCount: INIT_YEAR_NUMBER,
                        loopHTMLElements: oYearItem,
                        getHtml: i => `${nowYearCount - INIT_MONTH_NUMBER + i}年`,
                        getClassName: i => i === Math.floor(INIT_YEAR_NUMBER / 2) ? "layer-year-item layer-now" : "layer-year-item",
                        setDate: (ele , index) => nowYearCount = Number.parseInt(ele.innerHTML),
                    });
                    [...oChangeYear].forEach((ele , index) => {
                        ele.removeEventListener("click" , index ? yearAdd : yearLess , false);
                        ele.addEventListener("click", index ? setYear(INIT_YEAR_NUMBER) : setYear(-INIT_YEAR_NUMBER) ,false);
                    });
                };
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
                    if(className.includes("layer-prevMonth")) {
                        MonthSubtract();
                    }else if(className.includes("layer-nextMonth")) {
                        MonthAdd();
                    };
                    proxy.value = dateBeautify([nowYearCount , nowMonthCount , Number.parseInt(ele.innerHTML)]);
                    calendar.destroy();
                } , false);
            });
        };

        calendar.run = function() {
            this.init();
            document.body.addEventListener("click" , destroyCalendar , false);
        };

        calendar.destroy = function() {
            [...document.getElementsByClassName("layer-calendar")].forEach(ele => ele.remove());
            document.body.removeEventListener("click" , destroyCalendar , false);
        };

        function setCalendar(time){
            const [year , month , date] = time.toLocaleDateString().split("/").map(ele => Number(ele)),
                day_of_week = new Date(`${year}/${month}/1`).getDay(),    // 获取本月1号为周几
                prevMonthAllDays = MONTH_NUMBER_ARR[month - 2 !== -1 ? month - 2 : INIT_MONTH_NUMBER - 1],
                isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0,   // 判断是否为闰年
                nowMonthDays = (isLeapYear && month === 2) ? 29 : MONTH_NUMBER_ARR[month - 1];
            let rowCount = 0,
                columnCount = -1,
                className = "layer-time",
                count = prevMonthAllDays - day_of_week;
            for(let i = 0;i < 42;i ++){
                count ++;
                columnCount ++;
                if((count === prevMonthAllDays + 1 && rowCount === 0) || (count === nowMonthDays + 1 && rowCount !== 0)){
                    count = 1;
                };
                const sum = rowCount * INIT_MONTH_NUMBER + columnCount;
                if(sum < day_of_week){
                    className = "layer-time layer-prevMonth";
                }else if(sum >= nowMonthDays + day_of_week){
                    className = "layer-time layer-nextMonth";
                }else if(sum === day_of_week + date - 1){
                    className = "layer-time layer-nowTime"; 
                }else{
                    className = "layer-time"; 
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
                oUl.className = loopCount === INIT_YEAR_NUMBER ? "layer-year-ul" : "layer-month-ul";
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

        function destroyCalendar(ev) {
            ev = ev || window.event;
            !(ev.target === proxy.target || ev.target.className.includes("layer")) && calendar.destroy();
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
    window.layer = layer;
})(window);