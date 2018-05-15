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
			"search": noti.firstChild.data
		}).then(response =>{
			if (response){
				let tempContainer;
				response.forEach(news =>{
					tempContainer = document.createElement("a");
					tempContainer.setAttribute("href",news.link);
					tempContainer.appendChild(document.createTextNode(news.title));
					tempContainer.appendChild(document.createElement("br"));
					tempContainer.setAttribute("class","relatedNew_srch");
					this.container.appendChild(tempContainer);
				});
			} else {
				let para = document.createElement("p");
				let text = document.createTextNode("No related news found.");
				para.setAttribute("id","failureText_srch");
				para.appendChild(text);
				this.container.appendChild(para);
			}
	});
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
		var title = noti.firstChild;
		if (title.data){
			innerNew.innerHTML= title.data;
		}else{
			innerNew.innerHTML= title.firstChild.data;
		}
		this.container.appendChild(innerNew);
		this.addChilds();
		this.relatedTitlesSearch(noti);
		this.container.style.display = "block";
	}


	reduce (){
		this.container.style.display="none";
		document.getElementById("innerNew_srch").remove();
		document.getElementsByClassName("breakbar_srch")[0].remove();
		document.getElementsByClassName("rltdText_srch")[0].remove();
		if (news = document.getElementsByClassName("relatedNew_srch")){
			Array.from(news).forEach(function(noti){
				noti.remove();
			})
		} else {
			document.getElementById("failureText_srch").remove();
		}
	}

	amplify(noti){
		this.showDiv(noti);
		this.close.addEventListener("click",function(){popup.reduce();});
	}
	//
}