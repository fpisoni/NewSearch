function createButton(noti,popup){
	var button = document.createElement("button");
	button.setAttribute("class","button_srch");
	var text = document.createTextNode("Search");
	button.addEventListener("click",function(){popup.amplify(noti);});
	button.appendChild(text);
	noti.appendChild(button);
}

var titles = document.getElementsByTagName("h1");
var popup = new PopupHandler(document.createElement("div"),document.createElement("span"));
document.querySelector("body").appendChild(popup.getContainer());
Array.from(titles).forEach(function(noti){
	createButton(noti,popup);
});