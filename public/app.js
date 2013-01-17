require.config({
    paths: {
        'text':'libs/requirejs/require-text'
    }
})
requirejs(['text!templates/front_page.html'], function(tmplHelloWorld){
    $(document.body).append(tmplHelloWorld);
    var resized = function(){
        $(".chat-sidebar").css("height",($(window).height()-150)+"px");
        $(".chat-area").css("height",($(window).height()-150)+"px");
    }
    $(window).resize(resized);
    resized()
});