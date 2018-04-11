
//----------------------------------BASE FUNCTIONS---------------------------------------------------------------------
function deleteSon(obj){
	Array.from(this.childNodes).forEach(function(son){
		deleteSon(son);
	})
	this.remove();
}

function relatedImagesSearch(image, popup){
	//calls BackgroundScript
	//adds Images to Popup.
}


function incrementImage(popup,image){
	popup.childNodes[0].width=image.width + image.width/2;  //full size?
	popup.childNodes[0].height=image.height + image.height/2;
}

function createNewDiv(image,popup){
	popup.setAttribute("id","popup_zoom");
	var innerImg = image.cloneNode(false);
	innerImg.setAttribute("id","innerImg_zoom");
	popup.appendChild(innerImg);
}


//-------------------------------------TOP FUNCTIONS-------------------------------------------------------------------


function reduce (){
	var popup = document.getElementById("popup_zoom");
	Array.from(popup.childNodes).forEach(function(son){
		deleteSon(son);
	})
	popup.remove();
}


function amplify(image){
	var popup = document.createElement("div");
	document.querySelector("body").appendChild(popup);
	createNewDiv(image,popup);
	relatedImagesSearch(image,popup);
	incrementImage(popup,image);
	popup.addEventListener("mouseout",function(){reduce();});
}


//---------------------------------------------------------------------------------------------------------------------


var images = document.getElementsByTagName("img");
var posX,posY;


Array.from(images).forEach(function(image){
	image.addEventListener("click",function(){amplify(image);});  
});