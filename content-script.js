class PopupHandler{
	
	//constructor
	constructor(container, close){
		console.log("check1.2");
		this.container = container;
		this.close = close;
		this.setAttributes(this.container,this.close);
		document.querySelector("body").appendChild(this.container);
		console.log("check1.3");
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
	console.log("check3.2.1");
	browser.runtime.sendMessage({
		message: noti.innerHTML
	}).then(response =>{
		console.log("check3.2.2");
		if (response) {
			console.log("check3.2.3");
			response.forEach(function(news){
				news.setAttribute("class","relatedNew_srch");
				this.container.appendChild(news);
			})
			console.log("check3.2.4");
		}
		})
	}

	addChilds(){
		console.log("check4.2.1");
		var breakbar = document.createElement("br");
		breakbar.setAttribute("class","breakbar_srch");
		var related_text = document.createElement("h1");
		console.log("check4.2.2");
		related_text.innerHTML = "Related titles: ";
		related_text.setAttribute("class","rltdText_srch");
		console.log("check4.2.3");
		this.container.appendChild(breakbar);
		this.container.appendChild(related_text);
		console.log("check4.2.4");
	}

	showDiv(noti){
		console.log("check4.1");
		var innerNew = noti.cloneNode(false);
		innerNew.setAttribute("id","innerNew_srch");
		console.log("check4.2");
		this.container.appendChild(innerNew);
		this.addChilds();
		this.container.style.display = "block";
		console.log("check4.3");
	}

	reduce (){
		console.log("check5.1");
		this.container.style.display="none";
		document.getElementById("innerNew_srch").remove();
		console.log("check5.2");
		document.getElementsByClassName("breakbar_srch")[0].remove();
		document.getElementsByClassName("rltdText_srch")[0].remove();
		var news = document.getElementsByClassName("relatedNew_srch");
		console.log("check5.3");
		if(news){
			Array.from(news).forEach(function(noti){
				console.log("check5.4");
				noti.remove();
			}
		)};	
	}

	amplify(noti){
		console.log("check4");
		this.showDiv(noti);
		console.log("check5");
		this.close.addEventListener("click",function(){popup.reduce();});
		console.log("check6");
	}
	//

}

function createButton(noti,popup){
	console.log("check3.1");
	var button = document.createElement("button");
	button.setAttribute("class","button_srch");
	var text = document.createTextNode("Search");
	console.log("check3.2");
	button.addEventListener("click",function(){popup.amplify(noti);});
	button.addEventListener("click",function(){popup.relatedTitlesSearch(noti);});
	button.appendChild(text);
	noti.appendChild(button);
	console.log("check3.3");
}
console.log("check1");
var titles = document.getElementsByTagName("h1");
var popup = new PopupHandler(document.createElement("div"),document.createElement("span"));
document.querySelector("body").appendChild(popup.getContainer());
console.log("check2");
Array.from(titles).forEach(function(noti){
	console.log("check3");
	createButton(noti,popup);
});