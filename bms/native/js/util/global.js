var globalService = {
    tokenOfHeader:localStorage.getItem("token"),
    basePath:"http://192.168.1.198:8080",
    setUIHtml:function(html){
        $('section').html(html);
    }
}