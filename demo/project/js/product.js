(() => {
    window.addEventListener("load", () => {
        const oNum = document.getElementsByClassName("num")[0],
            oStock = document.getElementsByClassName("stock")[0].getElementsByTagName("span")[0],
            oControl = document.getElementsByClassName("control")[0].getElementsByTagName("i"),
            maxNumber = Number.parseInt(oStock.innerHTML);

        let number = Number.parseInt(oNum.value);

        [...oControl].forEach((ele, index) => {
            ele.addEventListener("click", function() {
                number = index ? -- number : ++ number;
                number = Math.min(number, maxNumber);
                number = Math.max(number, 1);
                oNum.value = number;
            }, false);
        });

        oNum.addEventListener("change", function() {
            const value = this.value;
            if(!/^\d+$/.test(value)){
                this.value = 1;
            }else if(Number.parseInt(value) > maxNumber){
                this.value = maxNumber;
            };
        }, false);
    }, false);
})();