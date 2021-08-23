let currentCards = [];

class Button {
	constructor(type, color, data) {
		this.type = type;
		this.color = color;
		this.data = data;
		this.dataSortedByInput = []; 
		this.containerKeywords = document.getElementById("containerKeywords");
		this.input = document.getElementById("searchInDataButton" + this.type); 
		this.containerElements = document.getElementById("container" + this.type);
		this.containerCards = document.getElementById("containerCards");
		this.clickOnButtonListener = document.getElementById("dropdownMenuButton" + this.type);
	}
	listenClickOnButton() {
		this.clickOnButtonListener.addEventListener("click", () => {
			if(input.cards.length > 0) {
				this.data = [];
				if(this.type == "Ingredients") {
					for(const recipe of input.cards) {
						for(const container of recipe.ingredients) {
							this.data.push(container.ingredient.toLowerCase());
						}
					}
				}
				if(this.type == "Appliance") {
					for(const recipe of input.cards) {
						this.data.push(recipe.appliance.toLowerCase());
					}	
				}
				if(this.type == "Ustensils") {
					for(const recipe of input.cards) {
						for(const ustensil of recipe.ustensils) {
							this.data.push(ustensil.toLowerCase());
						}
					}
				}
			}
			if(currentCards.length > 0) {
				this.data = [];
				if(this.type == "Ingredients") {
					for(const recipe of currentCards) {
						for(const container of recipe.ingredients) {
							this.data.push(container.ingredient.toLowerCase());
						}
					}
				}
				if(this.type == "Appliance") {
					for(const recipe of currentCards) {
						this.data.push(recipe.appliance.toLowerCase());
					}
		}
				if(this.type == "Ustensils") {
					for(const recipe of currentCards) {
						for(const ustensil of recipe.ustensils) {
							this.data.push(ustensil.toLowerCase());
						}
					}
				}
			}
			this.displayElements();
		})
	}
	displayElements() {
		let i = 0;
		this.containerElements.innerHTML =
			this.data.map(element => {
				i++;
				return '<p id="' + this.type.toLowerCase() + i + '">' + element + '</p>';
			}).join('');
		this.clickAndDisplayKeyword();
	}
	clickAndDisplayKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById(this.type.toLowerCase() + i).addEventListener("click", (event) => {
				main.selectedKeywords.push({"name": event.target.innerText, "color": this.color});
				this.containerKeywords.innerHTML = 
					main.selectedKeywords.map(element => {
						return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';
					}).join('');
					this.closeKeyword();	
					this.displayCards();
			});
		}
	}
	listenInputAndDisplaySortedKeywords() {
		let filteredArray = [];
		const regex1 = new RegExp(/d'/);
		const regex2 = new RegExp(/ /);
		this.input.addEventListener("input", (event) => {
			this.dataSortedByInput = [];
			for(const element of this.data) {
				let resultWithoutD = element.replace(regex1, "");
				let result = resultWithoutD.split(regex2);
				for(const word of result) {
					let splitted = word.split('');
					if(event.target.value == splitted.splice(0, event.target.value.length).join('')
					|| event.target.value == element.split('').splice(0, event.target.value.length).join('')) {
						this.dataSortedByInput.push(element);
						filteredArray = this.dataSortedByInput.filter((ele, pos) => {
    						return this.dataSortedByInput.indexOf(ele) == pos;
						})
					}
				}
			}
			this.containerElements.innerHTML = 
				filteredArray.map(element => {
					return  '<p id="' + element + '">' + element + '</p>';
				}).join('');	
			if(event.target.value == "") {
				this.dataSortedByInput = [];
				this.displayElements();
			}
			this.clickAndDisplaySortedKeyword(); 
		});
	}
	clickAndDisplaySortedKeyword() { 
		for(const element of this.dataSortedByInput) {
			document.getElementById(element).addEventListener("click", (event) => {
				main.selectedKeywords.push({"name": event.target.innerText, "color": this.color});
				this.containerKeywords.innerHTML = 
					main.selectedKeywords.map(element => {
						return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';
					}).join('');
				this.displayElements();
				this.input.value = "";
				this.closeKeyword();
				this.displayCards();
			});
		}
	}
	closeKeyword() {
		for(const keyword of main.selectedKeywords) {
			let id = keyword.name.toString();
			document.getElementById(id).addEventListener("click", () => {
				let index = main.selectedKeywords.indexOf(keyword);
				main.selectedKeywords.splice(index, 1);
				this.containerKeywords.innerHTML =
				main.selectedKeywords.map(element => {
					return '<div id="' + element.name + '" class="keyword bg-' + element.color + ' flex"><p>' + element.name + '</p><div><i class="far fa-times-circle"></i></div></div>';	
				}).join('');
				this.closeKeyword();
				this.displayCards();
			});
		}
	}
	displayCards() {
		if(input.cards.length == 0) {
			for(const recipe of main.data) {
				let array = [];
				for(const item of recipe.ingredients) {
					array.push(item.ingredient.toLowerCase());
				}
				array.push(recipe.appliance.toLowerCase());
				for(const item of recipe.ustensils) {
					array.push(item.toLowerCase());
				}
				for(const element of main.selectedKeywords) {
					if(array.includes(element.name)) {
						const card = new Card(
							recipe.id,
							recipe.name,
							recipe.ingredients,
							recipe.time,
							recipe.description,
							recipe.appliance,
							recipe.ustensils);
						currentCards.push(card);
					}
				}	
				array = [];
				this.sortByPresentsIngredientsApplianceOrUstensils();
			}
		}
		if(input.cards.length > 0) {
			for(const recipe of input.cards) {
				let array = [];
				for(const item of recipe.ingredients) {
					array.push(item.ingredient.toLowerCase());
				}
				array.push(recipe.appliance.toLowerCase());
				for(const item of recipe.ustensils) {
					array.push(item.toLowerCase());
				}
				for(const element of main.selectedKeywords) {
					if(array.includes(element.name)) {
						const card = new Card(
							recipe.id,
							recipe.name,
							recipe.ingredients,
							recipe.time,
							recipe.description,
							recipe.appliance,
							recipe.ustensils);
						currentCards.push(card);
					}
				}	
				array = [];
				this.sortByPresentsIngredientsApplianceOrUstensils();
			}
		}
	}
	sortByPresentsIngredientsApplianceOrUstensils() {
		for(const card of currentCards) {
			let array = [];
			for(const container of card.ingredients) {
				array.push(container.ingredient.toLowerCase());
			}
			array.push(card.appliance.toLowerCase());
			for(const item of card.ustensils) {
				array.push(item.toLowerCase());
			}
			for(const element of main.selectedKeywords) {
				if(!array.includes(element.name)) {
					let index = this.cards.indexOf(card);
					currentCards.splice(index, 1);
					return;
				}
			}
		}
		const cache = {};
		currentCards = currentCards.filter((elem, index, array) => {
			return cache[elem.id] ? 0 : cache[elem.id] = 1;
		});
		this.containerCards.innerHTML = 
			currentCards.map(card => {
				return card.render();
			}).join('');
		if(main.selectedKeywords.length == 0) {
			if(input.cards.length > 0) {
				currentCards = input.cards;
			} else {
				currentCards = [];
				for(const recipe of recipes) {
					const card = new Card(
						recipe.id,
						recipe.name,
						recipe.ingredients,
						recipe.time,
						recipe.description,
						recipe.appliance,
						recipe.ustensils);
					currentCards.push(card);
				}
			}
			this.containerCards.innerHTML = currentCards.map(card => {
				return card.render();
			}).join('');
		}
		this.listenClickOnButton();
	}
}














