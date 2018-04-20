function handleMessage(message, sender, sendResponse){
	console.log("message: ", message, "at: (content-script.js)");
	return new Promise ((resolve,reject) => {
		var req = new XMLHttpRequest();
		var url = "https://www.diarioregistrado.com/buscar?q="+message.search;
		req.addEventListener("load",completed);
		req.addEventListener("error",fail);
		req.addEventListener("abort",aborted);
		req.open("GET",url);
		req.send();

		function completed(e){
			console.log("Succesfully recieved response.");
			var news = parseResponse(this.responseText);
			console.log(news);
			resolve(news);
		}

		function parseResponse(ans){
			var parser = new DOMParser();
			var doc = parser.parseFromString(ans,"text/html");
			let news = [];
			let not;
			Array.from(doc.getElementsByClassName("title")).forEach(i =>{
				not = retrieveNews(i);
				news.push(not);
			});
			return news;
		}

		function retrieveNews(noti){
			let link = noti.parentNode.href.replace("moz-extension://42d07d34-4874-4cbd-8e98-fedf950a3e97","https://www.diarioregistrado.com");
			let noticia = {
				title: noti.firstChild.data,
				link: link
			}
			return noticia;
		}

		function fail(e){
			console.log("ans: ",this.responseText);
			console.log(e);
			console.log("There was an error recieving response.");
			reject();
		}

		function aborted(e){
			console.log("ans: ",this.responseText);
			console.log("The transference was aborted.");
			reject();
		}
	})
};

browser.runtime.onMessage.addListener(handleMessage);