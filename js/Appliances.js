
class Appliances {
	constructor(appliances) {
		this.data = appliances;
		this.dataSortedByInput = [];
		this.dataSortedByMainSearch = []; // ???
		this.containerKeywords = document.getElementById("containerKeywords");
		this.input = document.getElementById("searchInMenuAppliances");
		this.containerAppliances = document.getElementById("containerAppliances");
	}
	displayAppliances() {
		let i = 0;
		this.containerAppliances.innerHTML = 
			this.data.map(appliance => {
				i++;
				return '<p id="appliance' + i + '">' + appliance + '</p>';
			}).join('');
		this.clickAndDisplayKeyword();
	}
	clickAndDisplayKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById("appliance" + i + "").addEventListener("click", (event) => {
				selectedKeywords.push({"name": event.target.innerText, "color": "danger"});
				console.log(selectedKeywords);
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';
					}).join('');
				this.closeKeyword();
			});
		}	
	}
	// Rectification: les mots restants dépendent apparemment de la frappe dans l'input...
	// Passer tous les keywords en string (sans espace, sans de, en, d', etc pour alléger la recherche)
	// => 'j'u's'c'i't'r'o'n' et checker occurences ???
	listenInputAndDisplaySortedKeywords() {
		// this.input.addEventListener("input", (event) => {
		// 	for(const ingredient of this.data) {
		// 		const regex1 = new RegExp(/d'/);
		// 		const regex2 = new RegExp(/ /);
		// 		let resultWithoutD = ingredient.replace(regex1, "");
		// 		let result = resultWithoutD.split(regex2);
		// 		for(const word of result) {
		// 			if(event.target.value == word) {
		// 				this.dataSortedByInput.push(ingredient);
		// 				this.containerIngredients.innerHTML = 
		// 					this.dataSortedByInput.map(ingredient => {
		// 						return  '<p id="' + ingredient + '">' + ingredient + '</p>';
		// 					}).join('');
		// 			}
		// 			if(event.target.value == "") {
		// 				this.dataSortedByInput = [];
		// 				this.displayIngredients();
		// 			}
		// 			if(event.target.value == "la") {
		// 				return;
		// 			}
		// 			if(event.target.value == "en") {
		// 				return;
		// 			}
		// 			if(event.target.value == "au") {
		// 				return;
		// 			}
		// 			if(event.target.value == "a") {
		// 				return;
		// 			}
		// 			if(event.target.value == "ou") {
		// 				return;
		// 			}	
		// 		}
		// 	}
		// });
		
		this.input.addEventListener("input", (event) => {
			this.dataSortedByInput = [];
			for(const appliance of this.data) {
				const regex1 = new RegExp(/d'/);
				const regex2 = new RegExp(/ /);
				let resultWithoutD = appliance.replace(regex1, "");
				let result = resultWithoutD.split(regex2);
				for(const word of result) {
					let splitted = word.split('');
					if(event.target.value == splitted.splice(0, event.target.value.length).join('')) {
						this.dataSortedByInput.push(appliance);
						this.containerAppliances.innerHTML = 
							this.dataSortedByInput.map(appliance => {
								return  '<p id="' + appliance + '">' + appliance + '</p>';
							}).join('');
					}
				}
			}	
			if(event.target.value == "") {
				this.dataSortedByInput = [];
				this.displayAppliances();
			}
			this.clickAndDisplaySortedKeyword(); 
		});
	}
	clickAndDisplaySortedKeyword() { 
		console.log("clickAndDisplaySortedKeyword()");
		for(const appliance of this.dataSortedByInput) {
			document.getElementById(appliance).addEventListener("click", (event) => {
				console.log("click on " + appliance);
				selectedKeywords.push({"name": event.target.innerText, "color": "danger"});
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';
					}).join('');
				this.displayAppliances();
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
			})
		}
	}
	// displaySortedAppliances(sortedData) { // ??? dans l'idée de l'envoi d'un tableau trié dans les algos
	// 	console.log(sortedData);
	// 	return this.containerAppliances.innerHTML = 
	// 		this.sortedData.map(appliance => {
	// 			return '<p>' + appliance + '</p>';
	// 		}).join('');
	// }
}

