
class Input {
	constructor() {
		this.input = document.getElementById("input");
		this.search = document.getElementById("magnifyingGlass");
		this.cards = [];
		this.containerCards = document.getElementById("containerCards");
	}
	listeningChanges() {
		this.input.addEventListener("input", (event) => {
			console.log("on change : " + event.target.value);
			event.preventDefault();
			// Supérieur à 3 caractères >>> lance tris
			if(event.target.value.length >= 3) {
				console.time('input.listeningChanges()');
				this.cards = [];
				this.sortAllData();
				console.timeEnd('input.listeningChanges()');
			}
			if(event.target.value.length >= 3 && this.cards.length == 0) {
				this.containerCards.innerHTML = 
					'<p style="margin: auto; color: red">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
			}
		})
	}
	createAndPushCard(recipe) {
		const card = new Card(
			recipe.id,
			recipe.name,
			recipe.ingredients,
			recipe.time,
			recipe.description,
			recipe.appliance,
			recipe.ustensils);
		this.cards.push(card);
	}
	displaySortedCards() {
		this.containerCards.innerHTML = 
			this.cards.map(card => {
				return card.render();
			}).join('');
	}
	sortAllData() {
		const recipes = [];
		for(const recipe of main.data) {
			recipes.push(recipe);
		}
		for(const recipe of recipes) {
			for(let i = 0; i <= recipe.name.length; i++) { 
				if(event.target.value == recipe.name.toLowerCase().split('').splice(i, event.target.value.length).join('')) {
					this.createAndPushCard(recipe);	
				}
			}
			this.displaySortedCards();
		}
		for(const recipe of recipes) {
			for(const ingredient of recipe.ingredients) {
				for(let i = 0; i <= ingredient.ingredient.length; i++) { 
					if(event.target.value == ingredient.ingredient.toLowerCase().split('').splice(i, event.target.value.length).join('')) {
						this.createAndPushCard(recipe);
					}
				}
			}
			this.displaySortedCards();
		}
		for(const recipe of recipes) {
			for(let i = 0; i <= recipe.description.length; i++) { 
				if(event.target.value == recipe.description.toLowerCase().split('').splice(i, event.target.value.length).join('')) {
					this.createAndPushCard(recipe);
				}
			}
			this.displaySortedCards();
		}
	}
	clickOnSearch() {
		this.search.addEventListener("click", () => {
			console.log("search");
		})
	}
}

const input = new Input();
input.listeningChanges();
input.clickOnSearch();


// class Input {
// 	constructor() {
// 		this.input = document.getElementById("input");
// 		this.search = document.getElementById("magnifyingGlass");
// 		this.cards = [];
// 		this.containerCards = document.getElementById("containerCards");
// 	}
// 	cleanAccent(word) {
// 	   	var accent = [
// 		    /[\300-\306]/g, /[\340-\346]/g, // A, a
// 	    	/[\310-\313]/g, /[\350-\353]/g, // E, e
// 		    /[\314-\317]/g, /[\354-\357]/g, // I, i
// 	    	/[\322-\330]/g, /[\362-\370]/g, // O, o
// 		    /[\331-\334]/g, /[\371-\374]/g, // U, u
// 	    	/[\321]/g, /[\361]/g, // N, n
// 		    /[\307]/g, /[\347]/g, // C, c
// 	    ];
// 	    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
// 	    for(var i = 0; i < accent.length; i++) {
// 	        word = word.replace(accent[i], noaccent[i]);
// 	    }
// 	    return word;
// 	}
// 	listeningChanges() {
// 		this.input.addEventListener("input", (event) => {
// 			event.preventDefault();
// 			if(event.target.value.length == 0) {
// 				main.createAndDisplayCards();
// 			} 
// 			// Si supérieur à 3 caractères >>> lance tri
// 			if(event.target.value.length >= 3) {
// 				console.time('input.listeningChanges()');
// 				this.cards = [];
// 				this.sortTitles();
// 				this.sortIngredients();
// 				this.sortDescriptions();
// 				this.deleteDoubles();
// 				console.timeEnd('input.listeningChanges()');
// 			}
// 			if(event.target.value.length >= 3 && this.cards.length == 0) {
// 				this.containerCards.innerHTML = 
// 					'<p style="margin: auto; color: red">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
// 			}
// 		})
// 	}
// 	sortTitles() {
// 		console.log("titles");
// 		//const regex = RegExp(/ /);
// 		for(const recipe of main.data) { 
// 			let cleaned = recipe.name.toLowerCase();
// 			let cleaned2 = this.cleanAccent(cleaned);
// 			//let result = cleaned2.split(regex);
// 			//for(const letter of cleaned2) {
// 			for(let i = 0; i <= cleaned2.length; i++) { 
// 				let splitted = cleaned2.split('');
// 				if(event.target.value == splitted.splice(i, event.target.value.length).join('')) {
// 					const card = new Card(
// 						recipe.id,
// 						recipe.name,
// 						recipe.ingredients,
// 						recipe.time,
// 						recipe.description,
// 						recipe.appliance,
// 						recipe.ustensils);
// 					this.cards.push(card);
// 				}	
// 			}	
// 		}
// 	}
// 	sortIngredients() {
// 		console.log("ing");
// 		const regex = RegExp(/ /);
// 		for(const recipe of main.data) { 
// 			for(const item of recipe.ingredients) {
// 				let cleaned = item.ingredient.toLowerCase();
// 				let cleaned2 = this.cleanAccent(cleaned);
// 				let result = cleaned2.split(regex);
// 				for(const word of result) {
// 					for(let i = 0; i <= word.length; i++) { 
// 						let splitted = word.split('');
// 						if(event.target.value == splitted.splice(i, event.target.value.length).join('')
// 						|| event.target.value == cleaned2.split('').splice(i, event.target.value.length).join('')) {
// 							const card = new Card(
// 								recipe.id,
// 								recipe.name,
// 								recipe.ingredients,
// 								recipe.time,
// 								recipe.description,
// 								recipe.appliance,
// 								recipe.ustensils);
// 							this.cards.push(card);
// 						}
// 					}
// 				}
// 			}			
// 		}
// 	}
// 	sortDescriptions() {
// 		console.log("desc");
// 		const regex = RegExp(/ /);
// 		for(const recipe of main.data) {
// 			let cleaned = recipe.description.toLowerCase();
// 			let cleaned2 = this.cleanAccent(cleaned);
// 			let result = cleaned2.split(regex);
// 			for(const word of result) {
// 				for(let i = 0; i <= word.length; i++) { 
// 					let splitted = word.split('');
// 					if(event.target.value == splitted.splice(i, event.target.value.length).join('')
// 					|| event.target.value == cleaned2.split('').splice(i, event.target.value.length).join('')) {
// 						const card = new Card(
// 							recipe.id,
// 							recipe.name,
// 							recipe.ingredients,
// 							recipe.time,
// 							recipe.description,
// 							recipe.appliance,
// 							recipe.ustensils);
// 						this.cards.push(card);
// 					}
// 				}
// 			}			
// 		}
// 	}
// 	deleteDoubles() {
// 		const cache = {};
// 		this.cards = this.cards.filter((elem, index, array) => {
// 			return cache[elem.id] ? 0 : cache[elem.id] = 1;
// 		});
// 		this.containerCards.innerHTML = 
// 			this.cards.map(card => {
// 				return card.render();
// 			}).join('');
// 	}
// 	clickOnSearch() {
// 		this.search.addEventListener("click", () => {
// 			console.log("search");
// 		})
// 	}
// }

// const input = new Input();
// input.listeningChanges();
// input.clickOnSearch();

