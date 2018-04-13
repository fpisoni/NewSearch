function handleMessage(message, sender, sendResponse){
	console.log("message: ", message, "at: (content-script.js)");
	return new Promise ((resolve,reject) => {
		var req = new XMLHttpRequest();
		var url = "http://www.diarioregistrado/buscar?q="+message;
		req.addEventListener("load",completed);
		req.addEventListener("error",fail);
		req.addEventListener("abort",aborted);
		var ans = req.open("GET",url);
		function completed(e){
			console.log("Succesfully recieved response.");
			var news = this.parseResponse(ans);
			console.log("check1.background");
			console.log(news);
			resolve(news);
		}

		function parseResponse(ans){
			var parser = new DOMParser;
			var doc = parser.parseFromString(ans,"application/xml");
			var noti = Array.from(doc.getElementsByClassName("hover-overlay-container navbar-color"));
			return noti.slice(0,6);
		}

		function fail(e){
			console.log("There was an error recieving response.");
			reject();
		}

		function aborted(e){
			console.log("The transference was aborted.");
			reject();
		}
	})
};

browser.runtime.onMessage.addListener(handleMessage);