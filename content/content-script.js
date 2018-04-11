
//----------------------------------BASE FUNCTIONS---------------------------------------------------------------------


function relatedImagesSearch(image, popup){
	//calls BackgroundScript
	//adds Images to Popup.
}



function showDiv(image,popup){
	var innerImg = image.cloneNode(false);
	innerImg.setAttribute("id","innerImg_zoom");
	popup.appendChild(innerImg);
	popup.style.display = "block";
}


//-------------------------------------TOP FUNCTIONS-------------------------------------------------------------------



function reduce (){
	var popup = document.getElementById("popup_zoom");
	popup.remove();
}


function amplify(image){
	showDiv(image,popup);
	relatedImagesSearch(image,popup);
	close.addEventListener("click",function(){reduce();});
}

function createButton(image){
	var button = document.createElement("button");
	var text = document.createTextNode("Zoom");
	button.addEventListener("click",function(){amplify(image);});
	button.appendChild(text);
	image.parentNode.appendChild(button);
}

//---------------------------------------------------------------------------------------------------------------------


var images = document.getElementsByTagName("img");
var popup = document.createElement("div");
popup.setAttribute("id","popup_zoom");
var close = document.createElement("span").setAttribute("class","close_zoom");
popup.appendChild(close);
document.querySelector("body").appendChild(popup);

Array.from(images).forEach(function(image){
	createButton(image);
});