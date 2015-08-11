var source;
$(document).ready(function(){
    var cardTemplate=Handlebars.compile($("#cardTemplate").html());   
    var newcardTemplate=Handlebars.compile($("#newcardTemplate").html());
    
       $.getJSON("api/card/twelvecard")
               .done(function(result){
                
                var id=result.GameId;
                console.log(id);
                 $("#gameid").val(id);
                
                var count1=0;
                for(var a=0; a<result.cards.length; a++)
                {
                    var cardElement=cardTemplate({position:result.cards[a].CardUrl});
                    $("#"+a).append($(cardElement));
                    
                }
                
               }).fail(function (){
                   
                  console.log("Not found!"); 
               });   
   
});

$(function(){             
    var cardTemplate=Handlebars.compile($("#cardTemplate").html());   
    var newcardTemplate=Handlebars.compile($("#newcardTemplate").html());
    
    source=new EventSource("api/card/result");
    source.onmessage=function(event){
    console.log("Event : "+JSON.stringify(event.data));
    var temp=JSON.parse(event.data);
    var cards = temp.Cards;
    var gameid=temp.Integer;
  $("#gameid").text=gameid;
    for (var i in cards) {
        JSON.stringify(cards[i]);   
    if(i==0){    
        var cardElement=newcardTemplate({newid:$("#card1").val(),newposition:cards[i]["CardUrl"]}); 
        $("#"+$("#card1").val()).replaceWith($(cardElement));
        console.log("Replace Card1");
            }
    else if(i==1){                    
         var cardElement=newcardTemplate({newid:$("#card2").val(),newposition:cards[i]["CardUrl"]});
          $("#"+$("#card2").val()).replaceWith($(cardElement));
          console.log("Replace Card2");
                }
    else if (i==2){                    
          var cardElement=newcardTemplate({newid:$("#card3").val(),newposition:cards[i]["CardUrl"]});
           $("#"+$("#card3").val()).replaceWith($(cardElement));
           console.log("Replace Card3");
                }
    else if(i==3){
        var cardElement=cardTemplate({count:$("#card4").val(),position:cards[i]["CardUrl"]});
        $("#correct_img").append($(cardElement)); 
        console.log("Show correct card1");        
                }
    else if(i==4){     
         var cardElement=cardTemplate({count:$("#card5").val(),position:cards[i]["CardUrl"]});
         $("#correct_img").append($(cardElement)); 
         console.log("Show correct card2");        
                 }
    else{        
        var cardElement=cardTemplate({count:$("#card6").val(),position:cards[i]["CardUrl"]});
        $("#correct_img").append($(cardElement)); 
        console.log("Show correct card3");        
        }   
                
}
    }
});
               
$(function(){
     $("#Btnsubmit").on("click",function(){
        console.log("From JS");
        $.get("validateCard",{
            card1:$("#card1").val(),
            card2:$("#card2").val(),
            card3:$("#card3").val(),
                    }).done(function(){
                          $("#card1").val("");
                          $("#card2").val("");
                          $("#card3").val("");
                    });
    });
});


