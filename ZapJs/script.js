// ZapJs part starts here
function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id : "+cid;
return new ZapJsElement(element);
}
$$$.model={
"onStartup":[],
"accordians":[],
"modals":[]
};
// modal specific code starts here
$$$.modals={};

$$$.modals.show=function(mid)
{
var modal=null;
for(var i=0;i<$$$.model.modals.length;i++)
{
if($$$.model.modals[i].getContentId()==mid)
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
}
function Modal(cref)
{
var objectAddress=this;

// some property that can be used to decide if the modal should be closed if the user clicks outside the modal area
this.beforeOpening=null;
this.afterOpening=null;
this.beforeClosing=null;
this.afterClosing=null;
var contentReference=cref;
this.getContentId=function(){
return contentReference.id;
}
var contentParentReference=contentReference.parentElement;
var contentIndex=0;
while(contentIndex<contentParentReference.children.length)
{
if(contentReference==contentParentReference.children[contentIndex])
{
break;
}
contentIndex++;
}
var modalMaskDivision=document.createElement("div");
modalMaskDivision.style.display="none";
modalMaskDivision.classList.add("zapjs_modalMask");
var modalDivision=document.createElement("div");
modalDivision.style.display="none";
modalDivision.classList.add("zapjs_modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);

var  headerDivision=document.createElement("div");
headerDivision.style.background="gold";
headerDivision.style.border="2px double black ";
headerDivision.style.right="0";
headerDivision.style.height="40px";
headerDivision.style.padding="5px";
modalDivision.appendChild(headerDivision);
if(contentReference.hasAttribute("size"))
{
var sz=contentReference.getAttribute("size");
let xpos=sz.indexOf("x");
if(xpos==-1) xpos=indexOf("X");
if(xpos==-1) throw "In case of modal size should be specified as widthxheight";
if(xpos==0 || xpos==sz.length-1) throw "In case of modal size should be specified as widthxheight";
let width=sz.substring(0,xpos);
let height=sz.substring(xpos+1);
modalDivision.style.width=width+"px";
modalDivision.style.height=height+"px";
}
else
{
modalDivision.style.width="300px";
modalDivision.style.height="300px";
}
if(contentReference.hasAttribute("header"))
{
var hd=contentReference.getAttribute("header");
headerDivision.innerHTML=hd;
}
if(contentReference.hasAttribute("maskColor"))
{
var mkc=contentReference.getAttribute("maskColor");
modalMaskDivision.style.background=mkc;
}
if(contentReference.hasAttribute("modalBackgroundColor"))
{
var mbc=contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background=mbc;
}
var contentDivision=document.createElement("div");
// contentDivision.style.border="1px solid black";
contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-130)+"px";
contentDivision.style.width="98%";
contentDivision.style.overflow="auto";
contentDivision.style.padding="5px";

contentReference.remove();
contentDivision.appendChild(contentReference);
contentReference.style.display='block';
contentReference.style.visibility='visible';
modalDivision.appendChild(contentDivision);

var footerDivision=document.createElement("div");
footerDivision.style.background="gold";
footerDivision.style.left="0";
footerDivision.style.right="0";
footerDivision.style.height="40px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.padding="5px";
footerDivision.style.border="2px double black ";

modalDivision.appendChild(footerDivision);

if(contentReference.hasAttribute("footer"))
{
var ft=contentReference.getAttribute("footer");
footerDivision.innerHTML=ft;
}
var closeButtonSpan=null;
if(contentReference.hasAttribute("closeButton"))
{
var cb=contentReference.getAttribute("closeButton");
if(cb.toUpperCase()=="TRUE")
{
closeButtonSpan=document.createElement("span");
closeButtonSpan.classList.add('zapjs_closeButton');
var closeButtonMarker=document.createTextNode("x");
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
}
if(contentReference.hasAttribute("beforeOpening"))
{
var oo=contentReference.getAttribute("beforeOpening");
this.beforeOpening=oo;
}
if(contentReference.hasAttribute("beforeClosing"))
{
var oc=contentReference.getAttribute("beforeClosing");
this.beforeClosing=oc;
}

if(contentReference.hasAttribute("afterOpening"))
{
var oo=contentReference.getAttribute("afterOpening");
this.afterOpening=oo;
}
if(contentReference.hasAttribute("afterClosing"))
{
var oc=contentReference.getAttribute("afterClosing");
this.afterClosing=oc;
}
this.show=function(){
let openModal=true;
if(this.beforeOpening)
{
openModal=eval(objectAddress.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display="block";
modalDivision.style.display="block";
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
};
if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.beforeClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalMaskDivision.style.display="none";
modalDivision.style.display="none";
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
}
}
}


// modal specific code end here

$$$.accordianHeadingClicked=function(accordianIndex,panelIndex)
{
alert(accordianIndex+","+panelIndex);
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display='none';
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}
$$$.toAccordian=function(accord)
{
let panels=[];
let expandedIndex=-1;
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++)
{
//alert(children[x].nodeName);
if(children[x].nodeName=="H3")
{
panels[panels.length]=children[x];
}
if(children[x].nodeName=="DIV")
{
panels[panels.length]=children[x];
}
}
if(panels.length%2!=0) throw "Heading and division malformed to create accordian";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H3") throw "Heading and division malformed to create accordian";
if(panels[x+1].nodeName!="DIV") throw "Heading and division malformed to create accordian";
}

function createClickHandler(accordianIndex,panelIndex)
{
return function(){
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}

let accordianIndex=$$$.model.accordians.length;
for(x=0;x<panels.length;x+=2)
{
panels[x].onclick=createClickHandler(accordianIndex,x);
panels[x+1].oldDisplay=panels[x+1].style.display;
panels[x+1].style.display="none";
}

$$$.model.accordians[accordianIndex]={
"panels":panels,
"expandedIndex":-1
};
}

$$$.onDocumentLoaded=function(func){
if((typeof func)!="function") throw "Expected function , found "+(typeof func)+ " in call to onDocumentLoad";
$$$.model.onStartup[$$$.model.onStartup.length]=func;
}

$$$.initFramework=function(){

let allTags=document.getElementsByTagName("*");
let t=null;
let i=0;
let a=null;
for(i=0;i<allTags.length;i++)
{
t=allTags[i];
if(t.hasAttribute("accordian"))
{
a=t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}
let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}
// setting up modal part starts here
var all=document.getElementsByTagName("*");
for(i=0;i<all.length;i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;
}
}
}
// setting up modal part ends here
} // end of initFramework
function ZapJsElement(element)
{
this.element=element;
this.html=function(content)
{
if(typeof this.element.innerHTML=="string")
{
if((typeof content)=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
} //html function ends
this.value=function(content)
{
if(typeof this.element.value)
{
if((typeof content)=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
} //html function ends
this.fillComboBox=function(jsonObject)
{
if(this.element.nodeName!="SELECT") throw "fillComboBox can be called on a SELECT type object only";
if(!jsonObject["dataSource"]) throw "dataSource property is missing in call to fillComboBox";
let dataSource=jsonObject["dataSource"];
if(!jsonObject["text"]) throw "text property is missing in call to fillComboBox";
let text=jsonObject["text"];
if(!jsonObject["value"]) throw "value property is missing in call to fillComboBox";
let value=jsonObject["value"];
let firstOption=null;
if(jsonObject["firstOption"])
{
firstOption=jsonObject["firstOption"];
if(!firstOption.text) throw "text property is missing in call to firstOption";
if(!firstOption.value) throw "value property is missing in call to firstOption";
}
if(firstOption)
{
obj=document.createElement("option");
obj.value=firstOption.value;
obj.text=firstOption.text;
this.element.appendChild(obj);
}
for(p in dataSource)
{
obj=document.createElement("option");
obj.value=dataSource[p].code;
obj.text=dataSource[p].title;
this.element.appendChild(obj);
}
}
} // class ZapJsElement ends
$$$.ajax=function(jsonObject)
{
if(!jsonObject["url"]) throw "url property is missing in call to ajax";
let url=jsonObject["url"];
if((typeof url)!="string") throw "url property should be of string type in call to ajax";
let methodType="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if((typeof methodType)!="string") throw "methodType property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
}
let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be a function in call to ajax";
}
let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be a function in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData) // We will change the code to traverse the jsonData
{
if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url+=queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
} // get part ends here
if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
let jsonData={};
let sendJSON=jsonObject["sendJSON"];
if(!sendJSON) sendJSON=false;
if((typeof sendJSON)!="boolean") throw "sendJSON project should be of boolean type in ajax call";
let queryString="";
if(jsonObject["data"])
{
if(sendJSON)
{
jsonData=jsonObject["data"];
}
else
{
queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData) // We will change the code to traverse the jsonData
{
// if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
}
}
xmlHttpRequest.open('POST',url,true);
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlHttpRequest.send(queryString);
}
}
}


window.addEventListener('load',function(){
$$$.initFramework();
});
// ZapJs part ends here
// user written function

