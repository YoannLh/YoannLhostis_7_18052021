
class Input {
	constructor() {
		this.input = document.getElementById("input");
		this.search = document.getElementById("magnifyingGlass");
		this.cards = [];
		this.containerCards = document.getElementById("containerCards");
	}
	listeningChanges() {
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
		const regex2 = new RegExp(/ /);
		this.input.addEventListener("input", (event) => {
			console.log("on change : " + event.target.value);
			event.preventDefault();
			// Supérieur à 3 caractères >>> lance tri
			if(event.target.value.length >= 3) {
				this.cards = [];
				for(const recipe of main.data) { 
					let cleaned = recipe.name.toLowerCase().sansAccent();
					let result = cleaned.split(regex2);
					console.log(result);
					for(const word of result) {
						let splitted = word.split('');
						if(event.target.value == splitted.splice(0, event.target.value.length).join('')) {
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
			if(event.target.value.length < 3) {
				this.containerCards.innerHTML = 
					'<p style="margin: auto; color: red">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
			}
			if(event.target.value.length == 0) {
				main.createAndDisplayCards();
			}
		})
	}
	sortTitles() {

	}
	sortIngredients() {

	}
	sortDescriptions() {

	}
	clickOnSearch() {
		this.search.addEventListener("click", () => {
			console.log("search");
		})
		//this.containerCards.innerHTML = "";
	}
}

const input = new Input();
input.listeningChanges();
input.clickOnSearch();
