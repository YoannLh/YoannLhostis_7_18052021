
class Ingredients {
	constructor(ingredients) {
		this.data = ingredients;
		this.sortedData = []; // ???
		this.containerIngredients = document.getElementById("containerIngredients");
		this.containerKeywords = document.getElementById("containerKeywords");
	}
	displayIngredients() {
		let i = 0;
		this.containerIngredients.innerHTML = 
			this.data.map(ingredient => {
				i++;
				return '<p id="ingredient' + i + '">' + ingredient + '</p>';
			}).join('');
	}
	displaySortedIngredients(sortedData) { // ??? dans l'idée de l'envoi d'un tableau trié dans les algos
		console.log(sortedData);
		return this.containerIngredients.innerHTML = 
			this.sortedData.map(ingredient => {
				return '<p>' + ingredient + '</p>';
			}).join('');
	}
	clickAndDisplayKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById("ingredient" + i + "").addEventListener("click", (event) => {
				selectedKeywords.push('<div class="keyword bg-primary flex"><p>' + event.target.innerText + '</p><div id="closeIngredient' + i + '"><i class="far fa-times-circle"></i></div></div>');
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return element;
					}).join('');		
			});
		}
	}
	closeKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById("closeIngredient" + i + "").addEventListener("click", () => {
				console.log("delete keyword " + i);
				let index = selectedKeywords.indexOf("closeIngredient" + i + "");
				selectedKeywords.slice(index, 1);
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return element;
					}).join('');		
			});
		}
	}
}

