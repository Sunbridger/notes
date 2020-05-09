// 打开url的方式
var urlOpen = {
    'iframe' : function(url) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);
    },
    'location' : function(url) {
        window.location = url;
    },
    'href' : function(url) {
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        document.body.appendChild(a);
        a.click();
    },
    'script' : function(url) {
        var script = document.createElement('script');
        script.setAttribute('type', 'test/javascript');
        script.innerHTML = '(function(){' +
            'var a = document.createElement("a");' +
            'a.style.display = "none";' +
            'a.href = "' + url.replace(/"/g, '\\"') + '";' +
            'document.body.appendChild(a);' +
            'a.click();' +
            '})()';
        document.body.appendChild(script);
    },
    'open' : function(url) {
        window.open(url);
    }
};
