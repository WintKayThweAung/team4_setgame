
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.setgame.rest;

import com.setgame.business.CardBean;
import com.setgame.model.Card;
import com.setgame.model.Game;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.sse.EventOutput;
import org.glassfish.jersey.media.sse.SseFeature;

/**
 * 
 *
 * @author Nu Nu
 */
//@RequestScoped
@ApplicationScoped
//@SessionScoped
@Path("/card")

public class CardResource{
    
    @Inject private CardResult cardresult;
    @EJB private CardBean cardbean;   
    Integer id = 0;
    Card[] result=new Card[12];
   
    @GET   
    @Path("/twelvecard")
    @Produces(MediaType.APPLICATION_JSON)
     public Response getTwelveCard()
     {
         System.out.println("OK{}{}{}{}{}{}{}{"+id);
         
        JsonArrayBuilder builder=Json.createArrayBuilder();
        
        for(Card c:result)
        {
            builder.add(c.toJson());                  
        }
        JsonObject jo = Json.createObjectBuilder()
                .add("cards",builder)
                .add("GameId",id)
                .build();
         System.out.println("this is final point.>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<");
         System.out.println(id);
       return (Response.ok(jo).build());
       
    }
     
        @GET
        @Path("/result")
        @Produces(SseFeature.SERVER_SENT_EVENTS)    
     
      //public Response connect(@PathParam("GameId") Integer gameid){
        public Response connect()
        {
        System.out.println("New Connection");
        EventOutput eo=new EventOutput();      
        cardresult.add(eo);
        return (Response.ok(eo).build());
       }
        
       @GET
       @Path("/all")
       public Response getAll(){
         JsonArrayBuilder builder=Json.createArrayBuilder();
         List<Game> res=cardbean.getall();
         
         res.stream().forEach((g) -> {
             builder.add(g.toJson());
             
        });
        JsonObject jo = Json.createObjectBuilder().add("Game",builder).build();
        System.out.println("Can i see u>>");
        return (Response.ok(jo).build());
       
         
     }
 
     @GET
     @Path("{GameId}")
     public void  selectedGame(@PathParam("GameId")Integer gameid)
     {
         cardbean.checkCard(gameid);
         id=cardbean.getCard();
         System.out.println("HO HO this is gameid"+gameid);
         result=cardbean.getCardList();
         System.out.println("This is result:>>>>>"+result[0].getColour());
         System.out.println("hey this is selectedGame.");
      //public Card[] selectedGame(Integer gameid){
         /*System.out.println("This is gameid;"+gameid);
        result=cardbean.getTwelveCards();
        System.out.println("Hello this is Game Map");
        gamemap.put(gameid, result);
        System.out.println("This is a Map value:"+gamemap.get(gameid));*/
         //JsonObject jo = null ;
        /* gameList=cardbean.getall();
         for(Game g:gameList){
            result1=cardbean.getTwelveCards();
            gamemap.put(g.getGameId(), result1);
         }*/  
        
     }
     
     @GET
     @Path("/go")
     public void get()
     {
         System.out.println("NewGame function");
         
         //Integer i=Integer.parseInt(req.getParamter);
        cardbean.checkCard(0);
         id=cardbean.getCard();
         System.out.println("HO HO this is gameid"+0);
         result=cardbean.getCardList();
         System.out.println("This is result:>>>>>"+result[0].getColour());
         System.out.println("hey this is selectedGame.");
     }
}
         

     
   