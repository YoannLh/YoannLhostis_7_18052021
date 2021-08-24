let iteration = 0;

class Input {
	constructor() {
		this.input = document.getElementById("input");
		this.cards = [];
		this.containerCards = document.getElementById("containerCards");
	}
	listeningChanges() {
		this.input.addEventListener("input", (event) => {
			event.preventDefault();
			if(event.target.value.length == 0) {
				main.createAndDisplayCards();
			} 
			// Si supérieur à 3 caractères >>> lance tri
			if(event.target.value.length >= 3) {
				console.time('input.listeningChanges()');
				this.cards = [];
				this.sortTitles();
				this.sortIngredients();
				this.sortDescriptions();
				this.deleteDoubles();
				console.timeEnd('input.listeningChanges()');
			}
			if(event.target.value.length >= 3 && this.cards.length == 0) {
				this.containerCards.innerHTML = 
					'<p style="margin: auto; color: red">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
			}
		})
	}
	sortTitles() {
		for(const recipe of main.data) { 
			iteration++;
			let cleaned = recipe.name.toLowerCase();
			for(let i = 0; i <= cleaned.length; i++) { 
				iteration++;
				let splitted = cleaned.split('');
				if(event.target.value == splitted.splice(i, event.target.value.length).join('')) {
					iteration++;
					const card = new Card(
						recipe.id,
						recipe.name,
						recipe.ingredients,
						recipe.time,
						recipe.description,
						recipe.appliance,
						recipe.ustensils);
					iteration++;
					this.cards.push(card);
				}	
			}	
		}
	}
	sortIngredients() {
		for(const recipe of main.data) {
			iteration++;
			for(const item of recipe.ingredients) {
				iteration++;
				let cleaned = item.ingredient.toLowerCase();
				let result = cleaned.split();
				for(const word of result) {
					iteration++;
					for(let i = 0; i <= word.length; i++) { 
						iteration++;
						let splitted = word.split('');
						if(event.target.value == splitted.splice(i, event.target.value.length).join('')
						|| event.target.value == cleaned.split('').splice(i, event.target.value.length).join('')) {
							iteration++;
							const card = new Card(
								recipe.id,
								recipe.name,
								recipe.ingredients,
								recipe.time,
								recipe.description,
								recipe.appliance,
								recipe.ustensils);
							iteration++;
							this.cards.push(card);
						}
					}
				}
			}			
		}
	}
	sortDescriptions() {
		for(const recipe of main.data) {
			iteration++;
			let cleaned = recipe.description.toLowerCase();
			let result = cleaned.split();
			for(const word of result) {
				iteration++;
				for(let i = 0; i <= word.length; i++) { 
					iteration++;
					let splitted = word.split('');
					if(event.target.value == splitted.splice(i, event.target.value.length).join('')
					|| event.target.value == cleaned.split('').splice(i, event.target.value.length).join('')) {
						iteration++;
						const card = new Card(
							recipe.id,
							recipe.name,
							recipe.ingredients,
							recipe.time,
							recipe.description,
							recipe.appliance,
							recipe.ustensils);
						iteration++;
						this.cards.push(card);
					}
				}
			}			
		}
	}
	deleteDoubles() {
		const cache = {};
		this.cards = this.cards.filter((elem, index, array) => {
			iteration++;
			return cache[elem.id] ? 0 : cache[elem.id] = 1;
		});
		this.containerCards.innerHTML = 
			this.cards.map(card => {
				iteration++;
				return card.render();
			}).join('');
			console.log("iterations : " + iteration);
			iteration = 0;
	}
}

const input = new Input();
input.listeningChanges();
