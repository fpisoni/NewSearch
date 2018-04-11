class PopupHandler{
	
	//constructor
	constructor(container, close){
		this.container = container;
		this.close = close;
		this.setAttributes(this.container,this.close);
		document.querySelector("body").appendChild(this.container);
	}

	//getters
	getContainer(){
		return this.container;
	}
	//

	//initializer
	setAttributes(container, close){
		container.setAttribute("id","popup_srch");
		close.setAttribute("id","close_srch");
		close.innerHTML="&times;";
		container.appendChild(close);
	}
	//

	//methods
	relatedTitlesSearch(noti, popup){
	browser.runtime.sendMessage({
		"source": noti;
	}).then(response =>{
		response.forEach(function(news){
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
		close.addEventListener("click",function(){popup.reduce();});
	}
	//

}

function createButton(noti,popup){
	var button = document.createElement("button");
	button.setAttribute("class","button_srch");
	var text = document.createTextNode("Search");
	button.addEventListener("click",function(){popup.amplify(noti);});
	button.addEventListener("click",function(){popup.relatedTitlesSearch(noti);});
	button.appendChild(text);
	noti.appendChild(button);
}

var titles = document.getElementsByClassName("h1");
var popup = new PopupHandler(document.createElement("div"),document.createElement("span"));
document.querySelector("body").appendChild(popup.getContainer());
Array.from(titles).forEach(function(noti){
	createButton(noti,popup);
});