module.exports= function(data){
var i;
let s ='';
for(i in data){
        

    if(data[i].data.startsWith('https')){
        s+='<div class="row"id="r'+i+'"><span class="row-name"id="r'+i+'n">'+data[i].name+'</span><a href="'+data[i].data+'"class="row-data" id="r'+i+'d">'+data[i].data+'</a><div class="extra"id="r'+i+'e"><button  onclick="list(\'r'+i+'\')" class="more-b"><i class="material-icons" style="color: black;z-index: 1;">more vert</i></button><div class="other" id="r'+i+'o" style="z-index: -1;"><button class="other-pb" onclick="rdelete(\''+i+'\')"> <p class="other-p">delete</p></button><button class="other-pb" onclick="rupdate(\''+i+'\')"><p class="other-p">update</p></button></div></div><button class="b1"id="r'+i+'b" type="button" onclick="expand(\''+'r'+i+'\')"><i class="material-icons" style="color: rgb(10, 10, 10);cursor: default;z-index: 1;">expand</i></button></div>'; 
    }
    else{
s+='<div class="row"id="r'+i+'"><span class="row-name"id="r'+i+'n">'+data[i].name+'</span><span class="row-data" id="r'+i+'d">'+data[i].data+'</span> <div class="extra"id="r'+i+'e"><button  onclick="list(\'r'+i+'\')" class="more-b"><i class="material-icons" style="color: black;z-index: 1;">more vert</i></button><div class="other" id="r'+i+'o" style="z-index: -1;"><button class="other-pb" onclick="rdelete(\''+i+'\')"> <p class="other-p">delete</p></button><button class="other-pb" onclick="rupdate(\''+i+'\')"><p class="other-p">update</p></button></div></div><button class="b1"id="r'+i+'b" type="button" onclick="expand(\''+'r'+i+'\')"><i class="material-icons" style="color: rgb(10, 10, 10);cursor: default;z-index: 1;">expand</i></button></div>';
}}
return s;
}