
class Button {
	constructor(type, color, data) {
		this.type = type;
		this.color = color;
		this.data = data;
		this.dataSortedByInput = []; 
		this.dataSortedByMainSearch = []; // ???
		this.containerKeywords = document.getElementById("containerKeywords");
		this.input = document.getElementById("searchInDataButton" + this.type); 
		this.containerElements = document.getElementById("container" + this.type);

		this.cards = [];
		this.containerCards = document.getElementById("containerCards");
	}
	displayElements() {
		let i = 0;
		this.containerElements.innerHTML =
			this.data.map(element => {
				i++;
				return '<p id="' + this.type.toLowerCase() + i + '">' + element + '</p>';
			}).join('');
		this.clickAndDisplayKeyword();
	}
	clickAndDisplayKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById(this.type.toLowerCase() + i).addEventListener("click", (event) => {
				main.selectedKeywords.push({"name": event.target.innerText, "color": this.color});
				console.log(main.selectedKeywords);
				this.containerKeywords.innerHTML = 
					main.selectedKeywords.map(element => {
						return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';
					}).join('');
					this.closeKeyword();	

					this.displayCards();
			});
		}
	}
	// Rectification: les mots restants dépendent apparemment de la frappe dans l'input...
	// Passer tous les keywords en string (sans espace, sans de, en, d', etc pour alléger la recherche)
	// => 'j'u's'c'i't'r'o'n' et checker occurences ???
	listenInputAndDisplaySortedKeywords() {
		// this.input.addEventListener("input", (event) => {
		// 	for(const ingredient of this.data) {
		// 		const regex1 = new RegExp(/d'/);
		// 		const regex2 = new RegExp(/ /);
		// 		let resultWithoutD = ingredient.replace(regex1, "");
		// 		let result = resultWithoutD.split(regex2);
		// 		for(const word of result) {
		// 			if(event.target.value == word) {
		// 				this.dataSortedByInput.push(ingredient);
		// 				this.containerIngredients.innerHTML = 
		// 					this.dataSortedByInput.map(ingredient => {
		// 						return  '<p id="' + ingredient + '">' + ingredient + '</p>';
		// 					}).join('');
		// 			}
		// 			if(event.target.value == "") {
		// 				this.dataSortedByInput = [];
		// 				this.displayIngredients();
		// 			}
		// 			if(event.target.value == "la") {
		// 				return;
		// 			}
		// 			if(event.target.value == "en") {
		// 				return;
		// 			}
		// 			if(event.target.value == "au") {
		// 				return;
		// 			}
		// 			if(event.target.value == "a") {
		// 				return;
		// 			}
		// 			if(event.target.value == "ou") {
		// 				return;
		// 			}	
		// 		}
		// 	}
		// });
		
		this.input.addEventListener("input", (event) => {
			this.dataSortedByInput = [];
			for(const element of this.data) {
				const regex1 = new RegExp(/d'/);
				const regex2 = new RegExp(/ /);
				let resultWithoutD = element.replace(regex1, "");
				let result = resultWithoutD.split(regex2);
				for(const word of result) {
					let splitted = word.split('');
					if(event.target.value == splitted.splice(0, event.target.value.length).join('')) {
						this.dataSortedByInput.push(element);
						this.containerElements.innerHTML = 
							this.dataSortedByInput.map(element => {
								return  '<p id="' + element + '">' + element + '</p>';
							}).join('');
					}
				}
			}	
			if(event.target.value == "") {
				this.dataSortedByInput = [];
				this.displayElements();
			}
			this.clickAndDisplaySortedKeyword(); 
		});
	}
	clickAndDisplaySortedKeyword() { 
		for(const element of this.dataSortedByInput) {
			document.getElementById(element).addEventListener("click", (event) => {
				console.log("click on " + element);
				main.selectedKeywords.push({"name": event.target.innerText, "color": this.color});
				this.containerKeywords.innerHTML = 
					main.selectedKeywords.map(element => {
						return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';
					}).join('');
				this.displayElements();
				this.input.value = "";
				this.closeKeyword();

				this.displayCards();
			});
		}
	}
	closeKeyword() {
		console.log("closeKeyword()");
		console.log(main.selectedKeywords);
		for(const keyword of main.selectedKeywords) {
			console.log(keyword.name);
			let id = keyword.name.toString();
			console.log(id);
			document.getElementById(id).addEventListener("click", () => {
				console.log(id + " clicked !!!");
				let index = main.selectedKeywords.indexOf(keyword);
				console.log(index);
				main.selectedKeywords.splice(index, 1);
				this.containerKeywords.innerHTML =
				main.selectedKeywords.map(element => {
					return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';	
				}).join('');
				this.closeKeyword();

				this.displayCards();
			});
		}
	}
	// displaySortedIngredients(dataSortedByMainSearch) { // ??? dans l'idée de l'envoi d'un tableau dans l'input principal de la page
	// 	console.log(dataSortedByMainSearch);
	// 	return this.containerIngredients.innerHTML = 
	// 		this.sortedData.map(ingredient => {
	// 			return '<p>' + ingredient + '</p>';
	// 		}).join('');
	// }
	displayCards() {
		String.prototype.sansAccent = function(){
	   		var accent = [
		        /[\300-\306]/g, /[\340-\346]/g, // A, a
	    	    /[\310-\313]/g, /[\350-\353]/g, // E, e
		        /[\314-\317]/g, /[\354-\357]/g, // I, i
	    	    /[\322-\330]/g, /[\362-\370]/g, // O, o
		        /[\331-\334]/g, /[\371-\374]/g, // U, u
	    	    /[\321]/g, /[\361]/g, // N, n
		        /[\307]/g, /[\347]/g, // C, c
	    	];
	    	var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
	    	var str = this;
	    	for(var i = 0; i < accent.length; i++){
	        	str = str.replace(accent[i], noaccent[i]);
	    	}
	    	return str;
		}
		
		// IL FAUT DESTACKER LES INGREDIENTS ET OBTENIR DES RESULTATS CROISES DES KEYWORDS
		// EXEMPLE AVEC TOMATE ET CONCOMBRE
		const regex2 = new RegExp(/ /);
		this.cards = [];
		for(const recipe of main.data) {
			for(const item of recipe.ingredients) {  
				for(const element of main.selectedKeywords) { 
					let cleaned = item.ingredient.toLowerCase().sansAccent();
					//let cleaned2 = this.cleanAccent(cleaned);
					let result = cleaned.split(regex2);
					console.log(element.name);
					console.log(result);
					for(const word of result) {
						if(element.name == word) {
							console.log("ok");
							const card = new Card(
								recipe.id,
								recipe.name,
								recipe.ingredients,
								recipe.time,
								recipe.description,
								recipe.appliance,
								recipe.ustensils);
							this.cards.push(card);
							this.containerCards.innerHTML = 
								this.cards.map(card => {
									return card.render();
								}).join('');
						}
					}
				}			
			}
		}
	}
}






















