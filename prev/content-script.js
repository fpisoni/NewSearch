
//----------------------------------BASE FUNCTIONS---------------------------------------------------------------------

/*function relatedImagesSearch(image, popup){
	browser.runtime.sendMessage({
		"source": image.alt;
	}).then(response =>{
		Array.from(response).forEach(function(img){
			img.setAttribute("class","relatedImg_zoom");
			popup.appendChild(img);
		})
	})
}*/

function addChilds(popup){
	var breakbar = document.createElement("br");
	breakbar.setAttribute("class","breakbar_zoom");
	var related_text = document.createElement("h1");
	related_text.innerHTML = "Related images: ";
	related_text.setAttribute("class","rltdText_zoom");
	popup.appendChild(breakbar);
	popup.appendChild(related_text);
}

function showDiv(image,popup){
	var innerImg = image.cloneNode(false);
	innerImg.setAttribute("id","innerImg_zoom");
	popup.appendChild(innerImg);
	addChilds(popup);
	popup.style.display = "block";
}


//-------------------------------------TOP FUNCTIONS-------------------------------------------------------------------



function reduce (e){
	popup.style.display="none";
	document.getElementById("innerImg_zoom").remove();
	document.getElementsByClassName("breakbar_zoom")[0].remove();
	document.getElementsByClassName("rltdText_zoom")[0].remove();
	Array.from(document.getElementsByClassName("relatedImg_zoom")).forEach(function(image){
		image.remove;
	});
}


function amplify(image,popup){
	showDiv(image,popup);
	close.addEventListener("click",function(){reduce();});
}

function createButton(image,popup){
	var button = document.createElement("button");
	var text = document.createTextNode("Zoom");
	button.addEventListener("click",function(){amplify(image,popup);});
	button.addEventListener("click",function(){relatedImagesSearch(image,popup);});
	button.appendChild(text);
	image.parentNode.parentNode.appendChild(button);
}



var images = document.getElementsByTagName("img");
var popup = document.createElement("div");
popup.setAttribute("id","popup_zoom");
var close = document.createElement("span");
close.setAttribute("id","close_zoom");
close.innerHTML="&times;";
popup.appendChild(close);
document.querySelector("body").appendChild(popup);
Array.from(images).forEach(function(image){
	createButton(image,popup);
});