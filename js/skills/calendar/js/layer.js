;((window) => {
    "use strict";
    const INIT_WEEK_NUMBER = 7,
        INIT_ALL_NUMBER = 42,
        INIT_YEAR_NUMBER = 15,
        INIT_MONTH_NUMBER = 12,
        MONTH_NUMBER = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        MONTH_NAME = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        layer = new Proxy({} , {
            get(target, property) {
                return (attrs, ...children) => {
                    const oElem = document.getElementById(attrs.elem.slice(1)),
                        proxy = getProxy(oElem),
                        oElemOffset = getOffset(oElem);
                    attrs = Object.assign({}, {type: "day", offset: [10 + oElemOffset.top + oElem.offsetHeight, oElemOffset.left], animate: "t"}, attrs);
                    proxy.target.addEventListener("click", proxyClickHandler, false);
                    function proxyClickHandler() {
                        if(property === "render") {
                            const styleSheets = document.styleSheets;
                            if([...styleSheets].findIndex(ele => ele.href && ele.href.includes("layer")) === -1) {
                                const oHead = document.getElementsByTagName("head")[0],
                                    oLink = document.createElement("link");
                                oLink.setAttribute("rel", "stylesheet");
                                oLink.setAttribute("href", "css/layer.css");
                                oHead.appendChild(oLink);
                            };
                            const {type, offset} = attrs,
                                [top, left] = getLayerOffset(offset),
                                oCalendar = document.getElementsByClassName("layer-date-calendar"),
                                [INIT_TOP, INIT_LEFT] = getInitOffset(top, left, attrs.animate);
                            if(oCalendar.length === 0) {
                                const calendar = generateCalendar(proxy, type);
                                calendar.run();
                                css(calendar.main, {transform: `translate(${INIT_LEFT}px, ${INIT_TOP}px)`, opacity: 0, transition: ".2s"});
                                setTimeout(() => css(calendar.main, {transform: `translate(${left}px, ${top}px)`, opacity: 1}), 20);
                            };
                        };
                    };
                }
            }
        });
    function generateCalendar(proxy, type) {
        type = type.toLowerCase();
        const calendar = {},
            minusYear = Math.floor(INIT_YEAR_NUMBER / 2),
            time = proxy.value ? new Date(proxy.value) : new Date(),
            oCalendar = dom.div({class: "layer-date-calendar"}, 
                dom.div({class: "layer-date-header"},
                    dom.span({class: "prev changeYear layer-date-prevYear"}, dom.i({class: "layer-date-i"}), dom.i({class: "layer-date-i"})),
                    dom.span({class: "prev changeMonth layer-date-prevMonth"}, dom.i({class: "layer-date-i"})),
                    dom.div({} ,dom.span({class: "layer-date-year"}), dom.span({class: "layer-date-month"})),
                    dom.span({class: "next changeMonth layer-date-nextMonth"}, dom.i({class: "layer-date-i"})),
                    dom.span({class: "next changeYear layer-date-nextYear"}, dom.i({class: "layer-date-i"}), dom.i({class: "layer-date-i"}))
                ),
                dom.div({class: "layer-date-main"}, dom.div({class: "layer-date-content"})),
                dom.div({class: "layer-date-footer"},
                    dom.span({class: "layer-date-clear"} , "清除"),
                    dom.span({class: "layer-date-nowTime"} , "现在"),
                    dom.span({class: "layer-date-confirm"} , "确定")
                )
            );
        let oChild = null, oContent = null, oMonth = null, oYear = null, oClear = null, oConfirm = null, oNowTime = null,
            oItem = null, oDayItem = null, oMonthItem = null, oYearItem = null, oChangeYear = null, oChangeMonth = null, children = null,
            [nowYearCount, nowMonthCount, nowDateCount] = time.toLocaleDateString().split("/").map(ele => Number(ele));
            
        children = getAllChildren(oCalendar);

        switch (type) {
            case "day":
                oChild = setDatePage({});
                setDayChildren();
                break;
            case "month":
                oChild = setDatePage({loopCount: INIT_MONTH_NUMBER});
                setMonthOrYearChild();
                break;
            case "year":
                oChild = setDatePage({loopCount: INIT_YEAR_NUMBER});
                setMonthOrYearChild();
                break;
        };

        calendar.main = oCalendar;
        document.body.appendChild(oCalendar);

        oItem = document.getElementsByClassName("item");
        oYear = document.getElementsByClassName("layer-date-year")[0];
        oMonth = document.getElementsByClassName("layer-date-month")[0];
        oClear = document.getElementsByClassName("layer-date-clear")[0];
        oDayItem = document.getElementsByClassName("day-item");
        oContent = document.getElementsByClassName("layer-date-content")[0];
        oNowTime = document.getElementsByClassName("layer-date-nowTime")[0];
        oConfirm = document.getElementsByClassName("layer-date-confirm")[0];
        oYearItem = document.getElementsByClassName("year-item");
        oMonthItem = document.getElementsByClassName("month-item");
        oChangeYear = document.getElementsByClassName("changeYear");
        oChangeMonth = document.getElementsByClassName("changeMonth");

        calendar.init = function() {
            switch (type) {
                case "day":
                    setDayCalendarPageContent();
                    oYear.addEventListener("click", setYearCalendar, false);
                    oMonth.addEventListener("click", setMonthCalendar, false);
                    [...oDayItem].forEach(ele => ele.addEventListener("click", chooseDay, false));
                    [...oChangeYear].forEach(ele => ele.addEventListener("click", yearChange, false));
                    [...oChangeMonth].forEach(ele => ele.addEventListener("click", monthChange, false));
                    break;
                case "month":
                    setMonthCalendarPageContent();
                    [...oMonthItem].forEach(ele => ele.addEventListener("click", chooseMonth, false));
                    [...oChangeYear].forEach(ele => ele.addEventListener("click", yearChange, false));
                    break;
                case "year":
                    setYearCalendarPageContent(nowYearCount);
                    [...oYearItem].forEach(ele => ele.addEventListener("click", chooseYear, false));
                    [...oChangeYear].forEach((ele, index) => ele.addEventListener("click", index ? setYear(INIT_YEAR_NUMBER) : setYear(-INIT_YEAR_NUMBER), false));
                    break;
            };

            oClear.addEventListener("click", () => {
                proxy.value = "";
                calendar.destroy();
            }, false);
    
            oNowTime.addEventListener("click", () => {
                proxy.value = dateBeautify(new Date());
                calendar.destroy();
            }, false);

            oConfirm.addEventListener("click", () => {
                if(type === "year") {
                    const nowItem = [...oItem].find(elem => elem.className.includes("now")),
                        val = Number.parseInt(nowItem.innerHTML);
                    proxy.value = val;
                }else if(type === "day") {
                    proxy.value = dateBeautify([nowYearCount, nowMonthCount, nowDateCount]);
                }else if(type === "month") {
                    proxy.value = dateBeautify([nowYearCount, nowMonthCount]);
                };
                calendar.destroy();
            }, false);
        };

        calendar.run = function() {
            this.init();
            document.body.addEventListener("click", destroyCalendar, false);
        };

        calendar.destroy = function() {
            document.body.removeEventListener("click", destroyCalendar, false);
            [...document.getElementsByClassName("layer-date-calendar")].forEach(ele => ele.remove());
        };
        function chooseDay() {
            const className = this.className;
            if(className.includes("prevMonth")) {
                nowMonthCount --;
            }else if(className.includes("nextMonth")) {
                nowMonthCount ++;
            };
            if(nowMonthCount === INIT_MONTH_NUMBER + 1) {
                nowYearCount ++;
                nowMonthCount = 1;
            }else if(nowMonthCount === 0) {
                nowYearCount --;
                nowMonthCount = INIT_MONTH_NUMBER;
            };
            nowDateCount = Number.parseInt(this.innerHTML);
            proxy.value = dateBeautify([nowYearCount, nowMonthCount, nowDateCount]);
            calendar.destroy();
        };
        function chooseMonth() {
            const nowMonthCount = MONTH_NAME.findIndex(ele => ele === this.innerHTML) + 1;
            proxy.value = dateBeautify([nowYearCount, nowMonthCount]);
            calendar.destroy();
        };
        function chooseYear() {
            const nowYearCount = Number.parseInt(this.innerHTML);
            proxy.value = dateBeautify(nowYearCount);
            calendar.destroy();
        };
        function monthChange() {
            nowMonthCount += this.className.includes("nextMonth") ? 1: - 1; 
            if(nowMonthCount === INIT_MONTH_NUMBER + 1) {
                nowYearCount ++;
                nowMonthCount = 1;
            }else if(nowMonthCount === 0) {
                nowYearCount --;
                nowMonthCount = INIT_MONTH_NUMBER;
            };
            oYear.innerHTML = `${nowYearCount}年`;
            oMonth.innerHTML = `${nowMonthCount}月`;
            setDayCalendarPageContent();
        };
        function yearChange() {
            nowYearCount += this.className.includes("nextYear") ? 1 : -1;
            type === "day" && setDayCalendarPageContent();
            oYear.innerHTML = `${nowYearCount}年`;
        };
        function setYear(YEAR_COUNT) {
            return () => {
                oYear.innerHTML = oYear.innerHTML.split("-").map(ele => `${Number.parseInt(ele) + YEAR_COUNT}年`).join(" - ");
                setYearCalendarPageContent(nowYearCount += YEAR_COUNT);
            };
        };
        function setDatePage({
            ulClassName = "",
            typeOption = false,
            loopCount = INIT_ALL_NUMBER,
        }) {
            const oUl = dom.ul({class: ulClassName}),
                dateType = typeOption ? typeOption : type;
            let className = "layer-date-item";
            if(dateType === "day") {
                className += " day-item";
            } else if(dateType === "month") {
                className += " month-item";
            } else if(dateType === "year") {
                className += " year-item";
            };
            for(let i = 0; i < loopCount; i ++) {
                const oLi = dom.li({class: className});
                oUl.appendChild(oLi);
            };
            return oUl;
        };
        function setDayCalendarPageContent() {
            const day_of_week = new Date(`${nowYearCount}/${nowMonthCount}/1`).getDay(),
                prevMonthAllDays = MONTH_NUMBER[nowMonthCount - 2 !== -1 ? nowMonthCount - 2 : INIT_MONTH_NUMBER - 1],
                isLeapYear = nowYearCount % 4 === 0 && nowYearCount % 100 !== 0 || nowYearCount % 400 === 0,   // 判断是否为闰年
                nowMonthDays = (isLeapYear && nowMonthCount === 2) ? 29 : MONTH_NUMBER[nowMonthCount - 1];
            let rowCount = 0,
                columnCount = -1,
                count = prevMonthAllDays - day_of_week;

            for(let i = 0; i < INIT_ALL_NUMBER; i ++) {
                let className = "layer-date-item day-item";
                count ++;
                columnCount ++;
                if((count === prevMonthAllDays + 1 && rowCount === 0) || (count === nowMonthDays + 1 && rowCount !== 0)) {
                    count = 1;
                };
                const sum = rowCount * INIT_MONTH_NUMBER + columnCount;
                if(sum < day_of_week) {
                    className += " prevMonth";
                }else if(sum >= nowMonthDays + day_of_week) {
                    className += " nextMonth";
                }else if(sum === day_of_week + nowDateCount - 1) {
                    className += " now"; 
                };
                if(columnCount === INIT_MONTH_NUMBER) {
                    rowCount ++;
                    columnCount = 0;
                };
                oDayItem[i].innerHTML = count;
                oDayItem[i].className = className;
            };
        };
        function setMonthCalendar() {
            oMonth.style.display = "none";
            [...oChangeMonth].forEach(ele => ele.style.opacity = 0);
            const oUl = setDatePage({loopCount: INIT_MONTH_NUMBER, typeOption: "month", ulClassName: "layer-date-month-ul"});
            oContent.appendChild(oUl);
            setMonthCalendarPageContent();
            [...oMonthItem].forEach((ele, index) => {
                ele.addEventListener("click", function() {
                    nowMonthCount = index + 1;
                    this.parentElement.remove();
                    setDayCalendarPageContent();
                    oMonth.style.display = "inline-block";
                    oMonth.innerHTML = `${nowMonthCount}月`;
                    [...oChangeMonth].forEach(ele => ele.style.opacity = 1);
                }, false);
            });
        };
        function setYearCalendar() {
            oYear.removeEventListener("click", setYearCalendar, false);
            oMonth.style.display = "none";
            [...oChangeMonth].forEach(ele => ele.style.opacity = 0);
            const oUl = setDatePage({loopCount: INIT_YEAR_NUMBER, typeOption: "year", ulClassName: "layer-date-year-ul"});
            oContent.appendChild(oUl);
            oYear.innerHTML = `${nowYearCount - minusYear}年 - ${nowYearCount + minusYear}年`;
            setYearCalendarPageContent(nowYearCount);
            [...oChangeYear].forEach(ele => {
                ele.removeEventListener("click", yearChange, false);
                ele.addEventListener("click", yearMoreChange, false);
            });
            [...oYearItem].forEach(ele => {
                ele.addEventListener("click", function() {
                    nowYearCount = Number.parseInt(ele.innerHTML);
                    this.parentElement.remove();
                    setDayCalendarPageContent();
                    oMonth.style.display = "inline-block";
                    oYear.innerHTML = `${nowYearCount}年`;
                    oMonth.innerHTML = `${nowMonthCount}月`;
                    [...oChangeMonth].forEach(ele => ele.style.opacity = 1);
                    [...oChangeYear].forEach(ele => {
                        ele.addEventListener("click", yearChange, false);
                        ele.removeEventListener("click", yearMoreChange, false);
                    });
                    oYear.addEventListener("click", setYearCalendar, false);
                }, false);
            });
        };
        function yearMoreChange() {
            nowYearCount += (INIT_YEAR_NUMBER - 1) * (this.className.includes("nextYear") ? 1 : -1);
            setYearCalendarPageContent(nowYearCount);
            oYear.innerHTML = `${nowYearCount - minusYear}年 - ${nowYearCount + minusYear}年`;
        };
        function setMonthCalendarPageContent() {
            for(let i = 0; i < INIT_MONTH_NUMBER; i ++) {
                let className = i === nowMonthCount - 1 ? " now" : "";
                oMonthItem[i].className += className;
                oMonthItem[i].innerHTML = MONTH_NAME[i];
            };
        };
        function setYearCalendarPageContent(nowYearNumber) {
            for(let i = 0; i < INIT_YEAR_NUMBER; i ++) {
                const count = minusYear - i;
                let className = count === 0 ? " now" : "";
                oYearItem[i].className += className;
                oYearItem[i].innerHTML = `${nowYearNumber - count}年`;
            };
        };
        function setDayChildren() {
            const oWeek = dom.div({class: "layer-date-week"}, 
                dom.span({}, "日"), dom.span({}, "一"), dom.span({}, "二"), dom.span({}, "三"), 
                dom.span({}, "四"), dom.span({}, "五"), dom.span({}, "六")
            );
            [...children].forEach(ele => {
                const cName = ele.className;
                if(cName === "layer-date-content") {
                    ele.appendChild(oWeek);
                    ele.appendChild(oChild);
                }else if(cName === "layer-date-year") {
                    ele.innerHTML = `${nowYearCount}年`;
                }else if(cName === "layer-date-month") {
                    ele.innerHTML = `${nowMonthCount}月`;
                };
            });
        };
        function setMonthOrYearChild() {
            [...children].forEach(ele => {
                const cName = ele.className;
                if(cName === "layer-date-year") {
                    ele.innerHTML = type === "month" ? `${nowYearCount}年` : `${nowYearCount - minusYear}年 - ${nowYearCount + minusYear}年`;
                }else if(cName === "layer-date-content") {
                    ele.appendChild(oChild);
                }else if(cName.includes("changeMonth")) {
                    css(ele, "opacity", 0);
                };
            });
        };
        function destroyCalendar(ev) {
            ev = ev || window.event;
            !(ev.target === proxy.target || ev.target.className.includes("layer-date")) && calendar.destroy();
        };
        return calendar;
    };

    function addZero(str) {
        return (Number(str) < 10 ? "0" : "") + str;
    };
    function getProxy(elem) {
        const proxy = new Proxy(elem, {
            get(target, key) {
                return key === "target" ? target : target[key];
            },
            set(target, key, value) {
                target[key] = value;
                return true;
            }
        });
        return proxy;
    };
    function getLayerOffset(offset) {
        const W = window.innerWidth,
            H = window.innerHeight;
        let top, left = 0;
        if(offset === "c") {
            top = W / 2;
            left = H / 2;
        }else if(Array.isArray(offset)) {
            [top, left] = offset;
        };
        return [top, left];
    };
    function dateBeautify(date) {
        if (Array.isArray(date)) {
            return date.map(addZero).join("-");
        }else if(typeof date === "number") {
            return date;
        };
        date = date.toLocaleDateString().split("/");
        switch (type) {
            case "day":
                date = date.map(addZero).join("-");
                break;
            case "month":
                date = date.map(addZero).join("-");
                date = date.slice(0, date.lastIndexOf("-"));
                break;
            case "year":
                date = date[0];
                break;
        };
        return date;
    };
    function getAllChildren(parent) {
        const childrenArr = [],
            children = getChildren(parent);
        
        function getChildren(parent) {
            const children = parent.children,
                childrenLength = children.length;
            for(let i = 0; i < childrenLength; i ++) {
                const nowChild = children[i];
                childrenArr.push(nowChild);
                if(nowChild.children.length) {
                    getChildren(nowChild);
                };
            };
            return childrenArr;
        };
        return children;
    };
    function getInitOffset(top, left, direction) {
        switch(direction) {
            case "t":
                top += 20;
                break;
            case "r":
                left += 20;
                break;
            case "b":
                top -= 20;
                break;
            case "l":
                left -= 20;
                break;
        };
        return [top, left];
    };
    window.layer = layer;
})(window);