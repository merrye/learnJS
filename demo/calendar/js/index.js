const nowTime = new Date(),
    INIT_YEAR_COUNT = 15,
    oTime = document.getElementsByClassName("time"),
    oMain = document.getElementsByClassName("main")[0],
    oYear = document.getElementsByClassName("year")[0],
    oMonth = document.getElementsByClassName("month")[0],
    oClear = document.getElementsByClassName("clear")[0],
    oNowTime = document.getElementsByClassName("nowTime")[0],
    oConfirm = document.getElementsByClassName("confirm")[0],
    oChangeYear = document.getElementsByClassName("changeYear"),
    oChangeMonth = document.getElementsByClassName("changeMonth"),
    oResult = document.getElementsByClassName("result")[0],
    oYearItem = document.getElementsByClassName("year-item"),
    oMonthItem = document.getElementsByClassName("month-item"),
    monthArr = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

let [nowYearCount , nowMonthCount , nowDateCount] = nowTime.toLocaleDateString().split("/").map(ele => Number(ele));

init();

function init(){
    setCalendar(nowTime);
    oMonth.addEventListener("click" , () => {
        changeDate({
            loopCount: 12,
            loopHTMLElements: oMonthItem,
            getHtml: i => monthArr[i],
            setDate: (ele , index) => nowMonthCount = index + 1,
            getClassName: i => i === nowMonthCount - 1 ? "month-item now" : "month-item",
        });
    } , false);

    oYear.addEventListener("click" , () => {
        oYear.innerHTML = `${nowYearCount - 7}年-${nowYearCount + 7}年`;
        changeDate({
            loopCount: 15,
            loopHTMLElements: oYearItem,
            getHtml: i => `${nowYearCount - 7 + i}年`,
            getClassName: i => i === 7 ? "year-item now" : "year-item",
            setDate: (ele , index) => nowYearCount = Number.parseInt(ele.innerHTML),
        });
        [...oChangeYear].forEach((ele , index) => {
            ele.removeEventListener("click" , index ? yearAdd : yearLess , false);
            ele.addEventListener("click", index ? yearAddMore : yearLessMore ,false);
        });
    } , false);

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
            const html = ele.innerHTML,
                className = ele.className;
            if(className.includes("prevMonth")){
                MonthSubtract();
            }else if(className.includes("nextMonth")){
                MonthAdd();
            };
            nowDateCount = Number(html);
            setCalendar(new Date(`${nowYearCount}/${nowMonthCount}/${nowDateCount}`));
        } , false);
    });
};

function yearAddMore(){
    setYear(INIT_YEAR_COUNT)
};

function yearLessMore(){
    setYear(-INIT_YEAR_COUNT)
};

function setYear(YEAR_COUNT){
    oYear.innerHTML = oYear.innerHTML.split("-").map(ele => `${Number.parseInt(ele) + YEAR_COUNT}年`).join("-");
    [...oYearItem].forEach(ele => ele.innerHTML = `${Number.parseInt(ele.innerHTML) + YEAR_COUNT}年`);
};

function setCalendar(time){
    const dateArr = [31,28,31,30,31,30,31,31,30,31,30,31],
        [nowYear , nowMonth , nowDate] = time.toLocaleDateString().split("/").map(ele => Number(ele)),
        newTime = new Date(`${nowYear}/${nowMonth}/1`),  // 获取本月1号的时间
        newTimeDay = newTime.getDay(),    // 获取本月1号为周几
        prevAllDays = dateArr[nowMonth - 2 !== -1 ? nowMonth - 2 : 11],
        isLeapYear = nowYear % 4 === 0 && nowYear % 100 !== 0 || nowYear % 400 === 0,   // 判断是否为闰年
        allDays = (isLeapYear && nowMonth === 2) ? 29 : dateArr[nowMonth - 1];
    oYear.innerHTML = `${nowYear}年`;
    oMonth.innerHTML = `${nowMonth}月`;
    let rowCount = 0,
        columnCount = -1,
        count = prevAllDays - newTimeDay,
        className = "time";
    for(let i=0;i < 42;i ++){
        count ++;
        columnCount ++;
        if((count === prevAllDays + 1 && rowCount === 0) || (count === allDays + 1 && rowCount !== 0)){
            count = 1;
        };
        const sum = rowCount * 7 + columnCount;
        if(sum < newTimeDay){
            className = "time prevMonth";
        }else if(sum >= allDays + newTimeDay){
            className = "time nextMonth";
        }else if(sum === newTimeDay + nowDate - 1){
            className = "time nowTime"; 
        }else{
            className = "time"; 
        };
        if(columnCount === 7){
            rowCount ++;
            columnCount = 0;
        };
        oTime[rowCount * 7 + columnCount].innerHTML = count;
        oTime[rowCount * 7 + columnCount].className = className;
    };
    oResult.innerHTML = `${nowYear}-${nowMonth}-${nowDate}`;
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
    if(nowMonthCount === 13){
        nowMonthCount = 1;
        nowYearCount ++;
    };
};

function MonthSubtract(){
    nowMonthCount --;
    if(nowMonthCount === 0){
        nowMonthCount = 12;
        nowYearCount --;
    };
};

function setInitState(){
    oMonth.style.display = "inline-block";
    [...oChangeMonth].forEach(ele => ele.style.opacity = 1);
    [...oChangeYear].forEach((ele , index) => {
        ele.addEventListener("click" , index ? yearAdd : yearLess , false);
        ele.removeEventListener("click", index ? yearAddMore : yearLessMore ,false)
    });
};