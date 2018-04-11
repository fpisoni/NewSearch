class PopupHandler{
	constructor(){
		this.container = document.createElement("div");
		this.close = document.createElement("span");
		this.container.setAttribute("id","popup_srch");
		this.close.setAttribute("id","close_srch");
		this.close.innerHTML="&times;";
		this.container.appendChild(this.close);
		document.querySelector("body").appendChild(this.container);
	}

	getContainer(){
		return this.container;
	}
	
	relatedTitlesSearch(noti, popup){
	browser.runtime.sendMessage({
		"source": noti;
	}).then(response =>{
		Array.from(response).forEach(function(news){
			news.setAttribute("class","relatedNew_srch");
			popup.appendChild(news);
			})
		})
	}

	addChilds(){
		var breakbar = document.createElement("br");
		breakbar.setAttribute("class","breakbar_srch");
		var related_text = document.createElement("h1");
		related_text.innerHTML = "Related titles: ";
		related_text.setAttribute("class","rltdText_srch");
		this.container.appendChild(breakbar);
		this.container.appendChild(related_text);
	}

	showDiv(noti){
		var innerNew = noti.cloneNode(false);
		innerNew.setAttribute("id","innerNew_srch");
		this.container.appendChild(innerNew);
		this.addChilds();
		this.container.style.display = "block";
	}


	reduce (){
		this.container.style.display="none";
		document.getElementById("innerNew_srch").remove();
		document.getElementsByClassName("breakbar_srch")[0].remove();
		document.getElementsByClassName("rltdText_srch")[0].remove();
		var news = document.getElementsByClassName("relatedNew_srch");
		if(news){
			Array.from(news).forEach(function(noti){
				noti.remove();
			}
		)};	
	}
	amplify(noti){
		this.showDiv(noti);
		this.close.addEventListener("click",function(){popup.reduce();});
	}

}

function createButton(noti,popup){
	var button = document.createElement("button");
	button.setAttribute("class","button_srch");
	var text = document.createTextNode("Search");
	button.addEventListener("click",function(){popup.amplify(noti);});
	button.addEventListener("click",function(){popup.relatedTitlesSearch(noti);});
	button.appendChild(text);
	noti.parentNode.appendChild(button);
}

var titles = document.getElementsByClassName("article-title");
var popup = new PopupHandler();
document.querySelector("body").appendChild(popup.getContainer());
Array.from(titles).forEach(function(noti){
	createButton(noti,popup);
});