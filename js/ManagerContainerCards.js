
class ManagerContainerCards {
	constructor() {
		this.containerCards = document.getElementById("containerCards");
	}
	render() {
		//this.containerCards.innerHTML = 
			
	}
}

const managerContainerCards = new ManagerContainerCards();
managerContainerCards.render();

this.containerCards.innerHTML =
	recipes.map(recipe => {

		let displayIngredients = () => {
			return recipe.ingredients.map(ing => {
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
				if(ing.quantite && !ing.unti) {
					return '<li><span class="bold">' + ing.ingredient + '</span>' + ": " + ing.quantite + '</li>';
				}
			})
		};

		return ('<article class="card">' + 
			'<div class="up"></div>' +
			'<div class="down">' +
				'<div class="titlePlusTime flex">' +
					'<div class="titleMenu">' + recipe.name + '</div>' +
					'<div class="menuTime"><i class="far fa-clock"></i>' + " " + recipe.time + " mn" + '</div>' +
				'</div>' +
				'<div>' + 
					'<div class="contentMenu flex">' +
						'<ul>' +
							displayIngredients().join("") +
						'</ul>' +
						'<div class="recipe">' + recipe.description + '</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</article>'
		)
}).join("");





















