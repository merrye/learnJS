;((window) => {
    function ajax({
        url,
        type = "GET",
        isAsync = true,
        success,
        error
    }) {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("load" , transferComplete);
        xhr.addEventListener("progress" , updateProgress);
        xhr.addEventListener("error" , transferFailed);
        xhr.addEventListener("abort" , transferCanceled);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === XMLHttpRequest.DONE && ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)) {
                success(xhr.responseText);
            }else{
                error();
            };
        };

        xhr.open(type, url , isAsync);
        xhr.send();
    };

    function updateProgress(ev) {
        console.log(ev);
        if(ev.lengthComputable) {
            console.log(ev.loaded / ev.total);
        };
    };

    function transferComplete(ev){
        console.log(ev);
    };

    function transferFailed(ev) {
        console.log(ev);
    };

    function transferCanceled(ev) {
        console.log(ev);
    };

    window.ajax = ajax;
})(window);