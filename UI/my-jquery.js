$(document).ready(function(){

    $(".row-name").mouseenter(function(){
      $(this).animate({left:'120px'});
     
    });
    
    $(".row-name").mouseleave(function(){
        $(this).animate({left:'20px'});
         });  
     $(".other-p").mouseenter(function(){
        $(this).css({"background-color": "black", "color": "white"}) 
      
     });
     $(".other-p").mouseleave(function(){
        $(this).css({"background-color": "white", "color": "black"})  
       
      });
      $(".other-p").click(function(){
        $(this).css({"background-color": "#534f53", "color": "white"})  
       
      }); 

      $(".extra").mouseleave(function(){
        $(".other").css({"z-index": "-1"}) 
      });
      
      $(".row").mouseenter(function(){
        $(this).css({"height":"77px","width":"1004px","left":"-2px","top":"-1px","background-color": "rgb(220, 241, 248)"})
        
       } );

       $(".row").mouseleave(function(){
        $(this).css({"height":"75px","width":"1000px","left":"0px","top":"0px","background-color": "rgb(228, 242, 247)"})
       } );
       $(".add").mouseenter(function(){
        $(this).css({"height":"70px","width":"1024px","left":"-2px","top":"19px","background-color": "rgb(190, 230, 238)"})
        
       } );

       $(".add").mouseleave(function(){
        $(this).css({"height":"68px","width":"1020px","left":"0px","top":"20px","background-color": "rgb(219, 238, 240)"})
       } );

       $(".toolicon").click(function(){
        setInterval(() => {
          location.reload();
        },100);
        console.log("yes");
      });

      $(".toolicon").mouseenter(function(){
        $(".toolicon").css({"background-color": "white", "color": "black"}) 
      });
      $(".toolicon").mouseleave(function(){
        $(".toolicon").css({"color": "rgb(254, 254, 255)","background-color": "rgb(19, 19, 20)" }) 
      });
      

      $(".sign-in").mouseenter(function(){
        $(".sign-in").css({"background-color": "white", "color": "black"}) 
      });
      $(".sign-in").mouseleave(function(){
        $(".sign-in").css({"color": "rgb(254, 254, 255)","background-color": "rgb(19, 19, 20)" }) 
      });
    
    });
   
    
    
    