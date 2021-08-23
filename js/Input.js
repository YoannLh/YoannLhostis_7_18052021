
class Input {
	constructor() {
		this.input = document.getElementById("input");
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
	displaySortedCardsAndDeleteDoubles() {
		const cache = {};
		this.cards = this.cards.filter((elem, index, array) => {
			return cache[elem.id] ? 0 : cache[elem.id] = 1;
		});
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
			this.displaySortedCardsAndDeleteDoubles();
		}
		for(const recipe of recipes) {
			for(const ingredient of recipe.ingredients) {
				for(let i = 0; i <= ingredient.ingredient.length; i++) {
					if(event.target.value == ingredient.ingredient.toLowerCase().split('').splice(i, event.target.value.length).join('')) {
						this.createAndPushCard(recipe);
					}
				}
			}
			this.displaySortedCardsAndDeleteDoubles();
		}
		for(const recipe of recipes) {
			for(let i = 0; i <= recipe.description.length; i++) { 
				if(event.target.value == recipe.description.toLowerCase().split('').splice(i, event.target.value.length).join('')) {
					this.createAndPushCard(recipe);
				}
			}
			this.displaySortedCardsAndDeleteDoubles();
		}
	}
}

const input = new Input();
input.listeningChanges();
input.clickOnSearch();












