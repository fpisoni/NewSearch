class PorchDog{

	//methods

		//constructor
		constructor(request){
			this.req=request;
			this.prom=null;
		}
		//

		//getters
		getReq(){
			return this.req;
		}

		getProm(){
			return this.prom;
		}
		//

			//setting up methods
			 setDog(url,completed,fail,aborted){
				this.getReq().addEventListener("load", completed);
				this.getReq().addEventListener("error", fail);
				this.getReq().addEventListener("abort", aborted);
				this.getReq().open("GET",url);
				this.getReq().send();
			}

			//

			//handling and formatting response
			parseResponse(ans){	//turns the response into a DOM
				var parser = new DOMParser();
				var doc = parser.parseFromString(ans,"text/html");
				let news = [];
				let not;
				Array.from(doc.getElementsByClassName("title")).forEach(i =>{
					not = this.retrieveNews(i);
					news.push(not);
				});
				return news;
			}

			retrieveNews(noti){ //converts each new into a JSON-compatible format.
				let link = noti.parentNode.href.replace("moz-extension://42d07d34-4874-4cbd-8e98-fedf950a3e97","https://www.diarioregistrado.com");
				let noticia = {
					title: noti.firstChild.data,
					link: link
				}
				return noticia;
			}
			//
	//
}