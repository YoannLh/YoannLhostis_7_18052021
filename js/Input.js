
class Input {
	constructor() {
		this.input = document.getElementById("input");
		this.search = document.getElementById("magnifyingGlass");
		this.cards = [];
		this.containerCards = document.getElementById("containerCards");
	}
	cleanAccent(word) {
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
	    for(var i = 0; i < accent.length; i++) {
	        word = word.replace(accent[i], noaccent[i]);
	    }
	    return word;
	}
	listeningChanges() {
		this.input.addEventListener("input", (event) => {
			event.preventDefault();
			if(event.target.value.length == 0) {
				main.createAndDisplayCards();
			} 
			// Si supérieur à 3 caractères >>> lance tri
			if(event.target.value.length >= 3) {
				this.cards = [];
				this.sortTitles();
				this.sortIngredients();
				this.sortDescriptions();
				this.deleteDoubles();
			}
			if(event.target.value.length >= 3 && this.cards.length == 0) {
				this.containerCards.innerHTML = 
					'<p style="margin: auto; color: red">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
			}
		})
	}
	sortTitles() {
		console.log("titles");
		const regex = RegExp(/ /);
		for(const recipe of main.data) { 
			let cleaned = recipe.name.toLowerCase();
			let cleaned2 = this.cleanAccent(cleaned);
			let result = cleaned2.split(regex);
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
				}	
			}	
		}
	}
	sortIngredients() {
		console.log("ing");
		const regex = RegExp(/ /);
		for(const recipe of main.data) { 
			for(const item of recipe.ingredients) {
				let cleaned = item.ingredient.toLowerCase();
				let cleaned2 = this.cleanAccent(cleaned);
				let result = cleaned2.split(regex);
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
					}
				}
			}			
		}
	}
	sortDescriptions() {
		console.log("desc");
		const regex = RegExp(/ /);
		for(const recipe of main.data) {
			let cleaned = recipe.description.toLowerCase();
			let cleaned2 = this.cleanAccent(cleaned);
			let result = cleaned2.split(regex);
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
				}
			}			
		}
	}
	deleteDoubles() {
		const cache = {};
			this.cards = this.cards.filter((elem,index,array) => {
				return cache[elem.id] ? 0 : cache[elem.id] = 1;
		});
		this.containerCards.innerHTML = 
			this.cards.map(card => {
				return card.render();
			}).join('');
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
