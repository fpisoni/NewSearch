function handleMessage(message, sender, sendResponse){
	console.log("message: ", message, "at: (content-script.js)");
	return new Promise((resolve,reject)=>{

		function fail(){
			console.log("ans: ",dog.getReq().responseText);
			console.log("There was an error recieving response.");
			reject();
		}

		function aborted(){
			console.log("ans: ",dog.getReq().responseText);
			console.log("The transference was aborted.");
			reject();
		}

		function completed(){
			console.log("Succesfully recieved response.");
			var news = dog.parseResponse(dog.getReq().responseText);
			resolve(news);
		}

		var dog = new PorchDog(new XMLHttpRequest());
		var url = "https://www.diarioregistrado.com/buscar?q="+message.search;
		dog.setDog(url,completed,fail,aborted);
	})

}

browser.runtime.onMessage.addListener(handleMessage);