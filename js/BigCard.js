
class BigCard {
	constructor(id, name, ingredients, time, description, appliance, ustensils) {
		this.id = id;
		this.name = name;
		this.ingredients = ingredients;
		this.time = time;
		this.description = description;
		this.appliance = appliance;
		this.ustensils = ustensils;
		this.container = document.getElementById("mainOfBigCard");
	}
	createBigCard() {
		let params = new URLSearchParams(document.location.search.substring(1));
		let idInURL = params.get("id");
		console.log(idInURL);
		for(const recipe of recipes) {
			if(idInURL == recipe.id) {
				console.log("id ok / " + idInURL);
				const createdBigCard = new BigCard(
					recipe.id, 
					recipe.name, 
					recipe.ingredients, 
					recipe.time, 
					recipe.description, 
					recipe.appliance, 
					recipe.ustensils);
				createdBigCard.render();
			}
		}
	}
	displayIngredients() {
		return this.ingredients.map(ing => {
			if(!ing.quantity && !ing.quantite) {
				return '<li><span class="bold">' + ing.ingredient + '</span></li>';
			}
			if(ing.quantity && ing.unit) {
				let unit = ing.unit;
				if(ing.unit == "grammes") {
					unit = "g";
				}
				return '<li><span class="bold">' + ing.ingredient + '</span>' + ": " + ing.quantity + unit + '</li>';
			}
			if(ing.quantite && ing.unit) {
				let unit = ing.unit;
				if(ing.unit == "grammes") {
					unit = "g";
				}
				return '<li><span class="bold">' + ing.ingredient + '</span>' + ": " + ing.quantite + unit + '</li>';
			}
			if(ing.quantity && !ing.unit) {
				return '<li><span class="bold">' + ing.ingredient + '</span>' + ": " + ing.quantity + '</li>';
			}
			if(ing.quantite && !ing.unit) {
				return '<li><span class="bold">' + ing.ingredient + '</span>' + ": " + ing.quantite + '</li>';
			}
		}).join('');
	}
	render() {
		console.log(this.description);
		this.container.innerHTML =
		
			'<div class="titleBigCardAndTime flex">' +
				'<h1 id="titleBigCard">' + this.name + '</h1>' +
				'<div class="timeBigCard flex">' +
					'<i class="far fa-clock"></i>' +
					'<div>' + this.time + ' mn</div>' +
				'</div>' +
			'</div>' +
			'<div class="ingredientsOfBigCard">' +
				this.displayIngredients() +
			'</div>' +
			'<div class="descriptionOfBigCard">' +
				this.description +
			'</div>';
	}
}

const bigCard = new BigCard();
bigCard.createBigCard();