


  
 
function expand(id){
    
    let rd=id+'d';
    let rn= id+'n';
    let t=document.getElementById(rd).className
    if(t=='row-data-ex'){
      document.getElementById(rd).className='row-data';
    document.getElementById(rn).className='row-name';
    document.getElementById(id).style.height='75px';

    }
    else{
      document.getElementById(id).style.height='100px';
    document.getElementById(rd).className='row-data-ex';

    document.getElementById(rn).className='row-name-ex';}
   }


function upl(){
      var nam= document.getElementById('fn').value;
      var dat= document.getElementById('fd').value;
       
       let params = (new URL(document.location)).searchParams;
          let id = params.get("id");
       
       console.log(id);
      

   
      var t="/form?name="+nam+"&data="+dat;
      
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    
     setInterval(() => {
       location.reload();
     },100);
    }
  };
  xhttp.open("POST",t, true);
  xhttp.send();

  }


function add(){
     let vis=  document.getElementById('ad').style.visibility ;
     if(vis=='hidden'){
         vis='visible';
     }
     else {
         vis='hidden';
     }
     document.getElementById('ad').style.visibility=vis; 
  }


function list(id){
    var a= document.getElementById(id+'o').style.zIndex;
    if(a=="-1"){
        document.getElementById(id+'o').style.zIndex="+1";
        }
    else{
     document.getElementById(id+'o').style.zIndex="-1";
        }}
    

 function rdelete(id){

   var s='/delete?index='+id;
   var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      setInterval(() => {
      
        document.getElementById('r'+id).style.height="0px";
      },200);
      document.getElementById('r'+id).innerHTML="";
        document.getElementById('r'+id).className="";
     
    }
  };
  xhttp.open("GET",s, true);
  xhttp.send();
 

    }


function show_feed(){
      
  var a= document.querySelector('.feedback').style.display;
  if(a=='none'){
    document.querySelector('.feedback').style.display='block';
  }
  else{
    document.querySelector('.feedback').style.display='none';
  }
  }

  function rupdate(id){
      var name=document.getElementById('r'+id+'n').innerHTML;
      var data= document.getElementById('r'+id+'d').innerHTML;
      document.getElementById('r'+id).innerHTML='<div class="oadd" id="ad"><input class="add-name" id="un" name="name" value="'+name+'"><input class="add-data" id="ud" name="data" value="'+data+'" "><button class="add-send" type="submit" onclick="update(\''+id+'\')" ><i class="material-icons">send</i></button></div>';
      
    }
    function update(id){
      var name=document.getElementById('un').value;
      var data= document.getElementById('ud').value; 
      
      
      var s='/uptade?index='+id+'&name='+name+'&data='+data;
      var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
       setInterval(() => {
         location.reload();
       }, 300);
        
       }
     };
     xhttp.open("GET",s, true);
     xhttp.send();
    
    }
    
    