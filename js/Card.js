
class Card {
	constructor(id, name, ingredients, time, description, appliance, ustensils) {
		this.id = id;
		this.name = name;
		this.ingredients = ingredients;
		this.time = time;
		this.description = description;
		this.appliance = appliance;
		this.ustensils = ustensils;
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
		return ('<a class="card" href="./recettes/recette.html?id=' + this.id + '">' +
					'<div class="upCard"></div>' +
					'<div class="downCard">' +
						'<div class="titlePlusTime flex">' +
							'<div class="titleMenu">' + this.name + '</div>' +
							'<div class="menuTime"><i class="far fa-clock"></i>' + " " + this.time + " mn" + '</div>' +
						'</div>' +
						'<div>' + 
							'<div class="contentMenu flex">' +
								'<ul>' +
									this.displayIngredients() +
								'</ul>' +
								'<div class="recipe">' + this.description + '</div>' +
							'</div>' +
						'</div>' +
					'</div>' +	
				'</a>'
		)
	}
}






