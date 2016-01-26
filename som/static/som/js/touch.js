window.addEventListener('load', function(){
    var el = document.getElementById('page-content-wrapper3')
    var inner = document.getElementById('inner')
    swipedetect(el, function(swipedir){
        if (swipedir != 'none'){
            if(swipedir == "left"){
                $("#hack").text("2");
                $("#mapp").html('<i class="fa fa-picture-o fa-2x">');
                $("#page-content-wrapper3").animate({
                    marginLeft: "-100%",
                },1000, function() {
            // Animation complete.
                $('#page-content-wrapper3').css("display","none");
                $('#page-content-wrapper2').css("display","block");
                });
            }

            if (swipedir == "up"){
                var val = $("#hack").text();
                var x = parseInt(val);
                if (x == 1){
                    console.log("it is 1")
                    $("#page-content-wrapper").animate({
                        marginTop: "-100%",
                    },500);
                    $("#page-content-wrapper").animate({
                        marginTop: "0%",
                    },10);
                }
                if (x == 2){
                    console.log("it is 2")
                    $("#page-content-wrapper2").animate({
                        marginTop: "-100%",
                    },500);
                    $("#page-content-wrapper2").animate({
                        marginTop: "0%",
                    },10);
                }
                if (x == 3){
                    console.log("it is 3")
                    $("#page-content-wrapper3").animate({
                        marginTop: "-100%",
                    },500);
                    $("#page-content-wrapper3").animate({
                        marginTop: "0%",
                    },10);
                }
            }

            if (swipedir == "down"){
                $("#wrapper").toggleClass("toggled");
            }
        }
    })
}, false)
window.addEventListener('load', function(){
    var el = document.getElementById('page-content-wrapper2')
    var inner = document.getElementById('inner')
    swipedetect(el, function(swipedir){
        if (swipedir != 'none'){
            if(swipedir == "left"){
                $("#hack").text("1");
                $("#mapp").html('<i class="fa fa-pencil fa-2x">');
                $("#page-content-wrapper2").animate({
                    marginLeft: "-100%",
                },1000, function(){
                    $('#page-content-wrapper2').css("display","none");
                    $('#page-content-wrapper').css("display","block");
                });
            }
            if(swipedir == "right"){
                $("#hack").text("3");
                $("#mapp").html('<i class="fa fa-text-width fa-2x">');
                $('#page-content-wrapper3').css("display","block");
                $('#page-content-wrapper2').css("display","none");
                $("#page-content-wrapper3").animate({
                    marginLeft: "0",
                },1000,function(){});
            }
            if (swipedir == "up"){
                var val = $("#hack").text();
                var x = parseInt(val);
                if (x == 1){
                    console.log("it is 1")
                    $("#page-content-wrapper").animate({
                        marginTop: "-100%",
                    },500);
                    $("#page-content-wrapper").animate({
                        marginTop: "0%",
                    },10);
                }
                if (x == 2){
                    console.log("it is 2")
                    $("#page-content-wrapper2").animate({
                        marginTop: "-100%",
                    },500);
                    $("#page-content-wrapper2").animate({
                        marginTop: "0%",
                    },10);
                }
                if (x == 3){
                    console.log("it is 3")
                    $("#page-content-wrapper3").animate({
                        marginTop: "-100%",
                    },500);
                    $("#page-content-wrapper3").animate({
                        marginTop: "0%",
                    },10);
                }
            }

            if (swipedir == "down"){
                $("#wrapper").toggleClass("toggled");
            }
        }
    })
}, false)
window.addEventListener('load', function(){
    var el = document.getElementById('page-content-wrapper')
    var inner = document.getElementById('inner')
    swipedetect(el, function(swipedir){
        if (swipedir != 'none'){
            $("#hack").text("2");
            $("#mapp").html('<i class="fa fa-picture-o fa-2x">');
            $('#page-content-wrapper2').css("display","block");
            $('#page-content-wrapper').css("display", "none")
            $("#page-content-wrapper2").animate({
                marginLeft: "0",
            },1000,function(){});
        }
            if (swipedir == "up"){
                var val = $("#hack").text();
                var x = parseInt(val);
                if (x == 1){
                    console.log("it is 1")
                    $("#page-content-wrapper").animate({
                        marginTop: "-100%",
                    },500);
                    $("#page-content-wrapper").animate({
                        marginTop: "0%",
                    },10);
                }
                if (x == 2){
                    console.log("it is 2")
                    $("#page-content-wrapper2").animate({
                        marginTop: "-100%",
                    },500);
                    $("#page-content-wrapper2").animate({
                        marginTop: "0%",
                    },10);
                }
                if (x == 3){
                    console.log("it is 3")
                    $("#page-content-wrapper3").animate({
                        marginTop: "-100%",
                    },1500);
                    $("#page-content-wrapper3").animate({
                        marginTop: "0%",
                    },10);
                }
            }
            if (swipedir == "down"){
                $("#wrapper").toggleClass("toggled");
            }

    })

}, false)

function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
