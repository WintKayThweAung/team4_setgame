/*$(function () {
    $("#sendBtn").on("click", function () {
        console.log("This is new game.");
        $.get("newgame", {
            description: $("#description").val()

        }).done(function () {
            $("#description").val("");

        }).fail(function () {

        });
    });

});*/
function newGame(){
    console.log("New Game");
     $("#sendBtn").on("click", function () {
        console.log("This is new game.");
        $.get("newgame", {
            description: $("#description").val()

        }).done(function () {
            
            $("#description").val("");

        }).fail(function () {

        });
         $.get("api/card/go").done(function () {

        }).fail(function () {
        //.fail(function () {

        });
    });
    }

//var gameid;
function allGameSelect(gameid)
{
    alert("This is li click. ID is : " + gameid);

    $("#allgamelist").on("click", "a[data-game]", function () {
        console.log("Please-----------");
        //gameid = $(this).attr("id");
        console.log("GameId" + " " + gameid);
        $.get("api/card/" + gameid).done(function () {

        }).fail(function () {

            console.log("Not found!");
        });

    });
}


console.log("here all gamelist function outside");
function allGameList()
{
    var allgameTemplate = Handlebars.compile($("#allgameTemplate").html());

    console.log("This is entry point.");
    $.get("api/card/all").done(function (result) {
        console.log(JSON.stringify(result));
        var allgame = result.Game;
        console.log(JSON.stringify(allgame));
        for (var i in allgame) {
            $("#allgamelist").append(allgameTemplate({
                gameid: allgame[i].GameId,
                description: allgame[i].Description

            }
            ));
        }


    }).fail(function () {
        console.log("No data");
    });

}

/*$("#push").on("click",function(){
 var status = $(this).attr('gameid');
 console.log(status);
 })
 
 
 
 $("#myid").on("click", ".takegameId", function(){
 console.log('clicked');*/
//});
/*$('li').click(function() {
 console.log("This is ul li click.....");
 alert("This is li .");
 });
 
 //$("li").click(function(){ alert("success"); });
 
 $(document).on('click', 'gameid', function() { 
 console.log("Click success");
 })*/

//});




 