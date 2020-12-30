function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
{
    let e = document.createElement("div")
    e.className = "mpopup";
    e.setAttribute("id","myPopup");
    e.innerText = "";
    document.body.appendChild(e);
}

document.ondblclick = function(e){
    let text = getSelectionText();
    let res = convertToDate(text);
    if (res == ""){
      return
    }

    let m = document.getElementById("myPopup");
    m.innerText = res;
   
    m.style.position = "absolute";
    m.style.left = e.pageX+"px";
    m.style.top = e.pageY+"px";
    m.style.display = "block";
}
document.body.onclick = function (){
  let e = document.getElementById("myPopup");
  e.style.display = "none";
};