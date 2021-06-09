
class Ingredients {
	constructor(ingredients) {
		this.data = ingredients;
		this.dataSortedByInput = []; 
		this.dataSortedByMainSearch = []; // ???
		this.containerKeywords = document.getElementById("containerKeywords");
		this.input = document.getElementById("searchInMenuIngredients"); 
		this.containerIngredients = document.getElementById("containerIngredients");
	}
	displayIngredients() {
		let i = 0;
		this.containerIngredients.innerHTML = 
			this.data.map(ingredient => {
				i++;
				return '<p id="ingredient' + i + '">' + ingredient + '</p>';
			}).join('');
	}
	listenInputAndSortKeywords() {
		this.input.addEventListener("input", (event) => {
			for(const ingredient of this.data) {
				const regex = new RegExp(/ /);
				//const regex2 = new RegExp(/d'/);
				let result = ingredient.split(regex);
				// manque les autres tris, soit des regex si c'est possible soit ... >>>
				console.log(result);
				for(const word of result) {
					// >>> ... un switch case (la, en, au etc)
					// par exemple :
					if(event.target.value == "la") {
						return;
					}
					// ... et
					if(event.target.value == word) {
						this.dataSortedByInput.push(ingredient);
						this.containerIngredients.innerHTML = 
							this.dataSortedByInput.map(ingredient => {
								return  '<p id="' + ingredient + '">' + ingredient + '</p>';
							}).join('');		
					}
				}
				// ... et
				if(event.target.value == "") {
					this.dataSortedByInput = [];
					this.displayIngredients();
				}
			}
			// découper avec une autre méthode peut etre
			for(const ingredient of this.dataSortedByInput) {
				document.getElementById(ingredient).addEventListener("click", (event) => {
					selectedKeywords.push({"name": event.target.innerText, "color": "primary"});
					this.containerKeywords.innerHTML = 
						selectedKeywords.map(element => {
							return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';
						}).join('');

					this.displayIngredients();
					this.input.value = "";
					this.closeKeyword();
				})
			}
		})
	}

	// displaySortedIngredients(dataSortedByMainSearch) { // ??? dans l'idée de l'envoi d'un tableau dans l'input principal de la page
	// 	console.log(dataSortedByMainSearch);
	// 	return this.containerIngredients.innerHTML = 
	// 		this.sortedData.map(ingredient => {
	// 			return '<p>' + ingredient + '</p>';
	// 		}).join('');
	// }

	clickAndDisplayKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById("ingredient" + i + "").addEventListener("click", (event) => {
				selectedKeywords.push({"name": event.target.innerText, "color": "primary"});
				console.log(selectedKeywords);
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';
					}).join('');
					this.closeKeyword();	
			});
		}
	}
	closeKeyword() {
		console.log("closeKeyword()");
		console.log(selectedKeywords);
		for(const keyword of selectedKeywords) {
			console.log(keyword.name);
			let id = keyword.name.toString();
			console.log(id);
			document.getElementById(id).addEventListener("click", () => {
				console.log(id + " clicked !!!");
				let index = selectedKeywords.indexOf(keyword);
				console.log(index);
				selectedKeywords.splice(index, 1);
				this.containerKeywords.innerHTML =
				selectedKeywords.map(element => {
					return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';	
				}).join('');
				this.closeKeyword();
			})
		}
	}
}

