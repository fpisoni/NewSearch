function handleMessage(message, sender, sendResponse){
	console.log("message: ", message, "at: (content-script.js)");
	return new Promise ((resolve,reject) => {
		var req = new XMLHttpRequest();
		var url = "https://www.diarioregistrado/buscar?q="+message.search;
		console.log(url);
		req.addEventListener("load",completed);
		req.addEventListener("error",fail);
		req.addEventListener("abort",aborted);
		req.open("GET",url);
		req.send();




		function completed(e){
			console.log("ans: ",this.responseText);
			console.log("Succesfully recieved response.");
			var news = this.parseResponse(ans);
			console.log("check1.background");
			console.log(news);
			resolve(news);
		}

		function parseResponse(ans){
			var parser = new DOMParser;
			console.log(parser);
			var doc = parser.parseFromString(ans,"application/xml");
			console.log(doc.querySelector("body"));
			var noti = Array.from(doc.getElementsByClassName("hover-overlay-container navbar-color"));
			console.log(noti);
			return noti.slice(0,6);
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