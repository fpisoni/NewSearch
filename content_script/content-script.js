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
	relatedTitlesSearch(noti){
	browser.runtime.sendMessage({
		message: noti.firstChild.data
	}).then(response =>{
		if (response) {
			response.forEach(function(news){
				news.setAttribute("class","relatedNew_srch");
				this.container.appendChild(news);
			})
		} else{
			var txt = document.createTextNode("No related news were found.");
			txt.setAttribute("class, failureText_srch");
			this.container.appendChild();
		}
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
		var innerNew = document.createElement("h3");
		innerNew.setAttribute("id","innerNew_srch");
		innerNew.innerHTML=noti.firstChild.data;
		this.container.appendChild(innerNew);
		//this.container.appendChild(noti.firstChild.data);
		this.addChilds();
		this.relatedTitlesSearch(noti);
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
		)} else {
			document.getElementsByClassName("failureText_srch")[0].remove();
		}
	}

	amplify(noti){
		this.showDiv(noti);
		this.close.addEventListener("click",function(){popup.reduce();});
	}
	//
}

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