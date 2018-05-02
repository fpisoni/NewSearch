function setDog(dog,url){
	dog.getReq().addEventListener("load", function() { dog.completed(); });
	dog.getReq().addEventListener("error", function() { dog.fail(); });
	dog.getReq().addEventListener("abort", function() { dog.aborted(); });
	dog.getReq().open("GET",url);
	dog.getReq().send();
}

function handleMessage(message, sender, sendResponse){
	console.log("message: ", message, "at: (content-script.js)");
	var dog = new PorchDog(new XMLHttpRequest());
	var url = "https://www.diarioregistrado.com/buscar?q="+message.search;
	setDog(dog,url);
	return dog.getProm();
}

browser.runtime.onMessage.addListener(handleMessage);