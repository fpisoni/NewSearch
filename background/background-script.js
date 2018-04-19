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
			console.log("ans: ",this.responseText);
			console.log("Succesfully recieved response.");
			var news = parseResponse(this.responseText);
			console.log(news);
			resolve(news);
		}

		function parseResponse(ans){
			var parser = new DOMParser();
			var doc = parser.parseFromString(ans,"text/html");
			return retrieveNews(doc).slice(0,5);
		}

		function retrieveNews(doc){
			let news = doc.getElementsByClassName("title");
			let ar = [];
			let not;
			Array.from(news).forEach(i=>{
				not=i.parentNode.cloneNode(true);
				not.href="https://diarioregistrado.com/"+not.href;
				console.log(not);
				ar.push(not);
			});			
			console.log(ar);
			return ar;
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