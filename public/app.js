require.config({
    paths: {
        'text':'libs/requirejs/require-text'
    }
})
requirejs(['text!templates/front_page.html'], function(tmplHelloWorld){
    var currentUser = Math.random()

    $(document.body).append(tmplHelloWorld);
    var resized = function(){
        $(".chat-sidebar").css("height",($(window).height()-150)+"px");
        $(".chat-area").css("height",($(window).height()-150)+"px");
    }
    $(window).resize(resized);
    resized()

    var addMessage = function(m){
        $(".chat-area").append(m+"<br>");
    }

    // LISTEN
    PUBNUB.subscribe({
        channel  : "hello_world",
        callback : function(data){
            if(currentUser != data.user){
                addMessage(data.message);
            }
        }
    })

    var sendMessage = function(){
        addMessage($('.chat-input').val());
        PUBNUB.publish({
            channel : "hello_world",
            message : {user:currentUser,message:$('.chat-input').val()}
        })
        $('.chat-input').val("")
    }

    // SEND
    $('.chat-send').click(function(){
        sendMessage();
    })
    $('.chat-input').keydown(function(e){
        if(e.keyCode == 13){
            sendMessage();
        }
    })
});