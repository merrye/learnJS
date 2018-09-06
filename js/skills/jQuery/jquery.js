(() => {

    // 接口函数
    function $(prap) {
        const type = (typeof prap).toLowerCase();
        if (type === "function") {
            window.onload = prap;
        } else if (type === "string") {
            return new Init(prap);
        };
    };

    // 对象
    function Init(prap) {
        this.jsonObject = this.init(prap);
    };

    Init.prototype = {
        // 获取对应JS对象
        init: function (prap) {
            let arr = [];
            if (prap.startsWith("#")) {
                arr[0] = document.getElementById(prap.slice(1));
            } else if(prap.startsWith(".")) {
                arr = [...document.getElementsByClassName(prap.slice(1))];
            };
            return arr;
        },
        // 设置/获取样式
        css: function () {
            const prap = arguments,
                type = (typeof prap[0]).toLowerCase();
            if (prap.length === 2) {
                this.each(function () {
                    this.style[prap[0]] = prap[1];
                });
            } else if (type === "string") {
                const obj = this.jsonObject[0], attr = prap[0];
                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
            } else if (type === "object") {
                for (let [k, v] of Object.entries(prap[0])) {
                    this.css(k, v);
                };
            };
        },
        html: function() {
            const content = arguments[0];
            if (content) {
                return this.jsonObject[0].innerHTML;
            } else {
                this.each(function () {
                    this.innerHTML = content;
                });
            };
        },
        text: function () {
            const content = arguments[0];
            if (content) {
                return this.jsonObject[0].innerText;
            } else {
                this.each(function () {
                    this.innerText = content;
                });
            };
        },
        // 遍历
        each: function (prap) {
            const length = this.jsonObject.length;
            for (let i = 0; i < length; i ++) {
                prap.call(this.jsonObject[i], i);
            };
        },
        addClass: function (prap) {
            const cNameArr = prap.split(" "),
                cNameArrLenth = cNameArr.length;
            for (let i = 0; i < cNameArrLenth; i ++) {
                const cName = cNameArr[i];
                this.each(function () {
                    const thisClassName = this.className,
                        reg = new RegExp(`\\b${cName}\\b`);
                    if (reg.test(thisClassName)) {
                        return;
                    } else {
                        this.className += (thisClassName ? " " : "") + cName;
                    };
                });
            };
        },
        removeClass: function (prap) {
            const cNameArr = prap.split(" "),
                cNameArrLenth = cNameArr.length;
            for (let i = 0; i < cNameArrLenth; i ++) {
                const cName = cNameArr[i];
                this.each(function () {
                    const thisClassName = this.className,
                        reg = new RegExp(`\\b${cName}\\b\\s?`);
                    this.className = thisClassName.replace(reg, "").trim();
                });
            };
        },
        toggleClass (prap) {
            const cNameArr = prap.split(" "),
                cNameArrLenth = cNameArr.length;
            for (let i = 0; i < cNameArrLenth; i ++) {                
                const cName = cNameArr[i];
                this.each(function () {
                    const thisClassName = this.className,
                        reg = new RegExp(`\\b${cName}\\b\\s?`);
                    this.className = reg.test(thisClassName) ? thisClassName.replace(reg, "").trim() : `${thisClassName} ${cName}`;
                });
            };
        },
        attr () {
            const argu = arguments;
            if (argu.length === 2) {
                this.each(function () {
                    this.setAttribute(argu[0], argu[1]);
                });
            } else {
                const type = (typeof argu[0]).toLowerCase();
                if (type === "string") {
                    return this.jsonObject[0].getAttribute(argu[0]);
                } else if (type === "object") {
                    for (let [k, v] of O0bject.entries(argu[0])) {
                        this.each(function () {
                            this.setAttribute(k, v);
                        });
                    };
                };
            };
        },
        removeAttr (prap) {
            this.each(function () {
                this.removeAttribute(prap);
            });
        },
        val (prap) {
            if (prap !== undefined) {
                this.each(function () {
                    this.value = prap;
                });
            } else {
                return this.jsonObject[0].value;
            };
        },
        show () {
            this.each(function () {
                this.style.display = "block";
            });
        },
        hide () {
            this.each(function () {
                this.style.display = "none";
            });
        },
        fadeIn (prap) {
            const argus = arguments,
                length = argus.length;
            let time, fn, easing;
            for (let i = 0;i < length; i ++) {
                let argu = argus[i],
                    t = (typeof argu).toLowerCase();
                switch (t) {
                    case "number":
                        time = argu;
                        break;
                    case "string":
                        if (argu === "slow" || argu === "normal" || argu === "fast") {
                            switch (argu) {
                                case "slow":
                                    time = 800;
                                    break;
                                case "noarmal":
                                    time = 600;
                                    break;
                                case "fast":
                                    time = 400;
                                    break;
                            };
                        } else {
                            easing = argu;
                        };
                        break;
                    case "function":
                        fn = argu[i];
                        break;
                };
            };
            time = time === undefined ? 200 : time;
            this.each(function (i) {
                let This = this,
                    startVal = Number.parseInt(getStyle(This, "opacity"));
                if (startVal === undefined) {
                    startVal = Number.parseInt(getStyle(This, "filter").replace(/\D/g, "")) / 100;
                };
                if (getStyle(obj, "display") === "none") {
                    startVal = 0;
                    this.style.opacity = 0;
                    this.style.filter = "alpha(opacity=0)";
                };
                This.style.display = "block";
                let startTime = new Date(),
                    endVal = 1,
                    timer = setInterval(() => {
                        let nowTime = new Date(),
                            prop = (nowTime - startTime) / time;
                        if (prop >= 1) {
                            prop = 1;
                            clearInterval(timer);
                        };
                        let val = startVal + prop * (endVal - startVal);
                        This.style.opacity = val;
                        This.style.filter = `alpha(opacity=${val * 100})`;
                    }, 13);
            });

            function getStyle (obj, attr) {
                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
            };
        },
    };

    window.$ = $;
})();