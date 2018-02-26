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
                arr = document.getElementsByClassName(prap.slice(1));
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
        }
    };

    window.$ = $;
})();