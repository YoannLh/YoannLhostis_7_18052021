  
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
	listenInputAndDisplaySortedKeywords() {
		this.input.addEventListener("input", (event) => {
			for(const ingredient of this.data) {
				const regex1 = new RegExp(/d'/);
				const regex2 = new RegExp(/ /);
				let resultWithoutD = ingredient.replace(regex1, "");
				let result = resultWithoutD.split(regex2);
				for(const word of result) {
					if(event.target.value == word) {
						this.dataSortedByInput.push(ingredient);
						this.containerIngredients.innerHTML = 
							this.dataSortedByInput.map(ingredient => {
								return  '<p id="' + ingredient + '">' + ingredient + '</p>';
							}).join('');
					}
					if(event.target.value == "") {
						this.dataSortedByInput = [];
						this.displayIngredients();
					}
					if(event.target.value == "la") {
						return;
					}
					if(event.target.value == "en") {
						return;
					}
					if(event.target.value == "au") {
						return;
					}
					if(event.target.value == "a") {
						return;
					}
					if(event.target.value == "ou") {
						return;
					}	
				}
			}
		});
	}
	clickAndDisplaySortedKeyword() { 
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
			});
		}
	}
	// displaySortedIngredients(dataSortedByMainSearch) { // ??? dans l'idée de l'envoi d'un tableau dans l'input principal de la page
	// 	console.log(dataSortedByMainSearch);
	// 	return this.containerIngredients.innerHTML = 
	// 		this.sortedData.map(ingredient => {
	// 			return '<p>' + ingredient + '</p>';
	// 		}).join('');
	// }
}


