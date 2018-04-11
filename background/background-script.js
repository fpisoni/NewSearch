browser.runtime.onMessage.addEventListener(function (message, sender, sendResponse){
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
			resolve(news);
		}

		function parseResponse(ans){
			var parser = new DOMParser;
			var doc = parser.parseFromString(ans,);
			var news = doc.getElementsByClassName("col-md-8");
			return Array.from(news).filter(noti => (noti.indexOf)%2==0)
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
});