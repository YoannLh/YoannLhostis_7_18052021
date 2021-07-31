
class Button {
	constructor(type, color, data) {
		this.type = type;
		this.color = color;
		this.data = data;
		this.dataSortedByInput = []; 
		this.dataSortedByInputSearch = []; // ???
		this.containerKeywords = document.getElementById("containerKeywords");
		this.input = document.getElementById("searchInDataButton" + this.type); 
		this.containerElements = document.getElementById("container" + this.type);
		this.cards = [];
		this.containerCards = document.getElementById("containerCards");
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
				console.log(main.selectedKeywords);
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
				console.log("click on " + element);
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
		console.log("close");
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
		console.log("display");
		String.prototype.sansAccent = function(){
	   		var accent = [
		        /[\300-\306]/g, /[\340-\346]/g, // A, a
	    	    /[\310-\313]/g, /[\350-\353]/g, // E, e
		        /[\314-\317]/g, /[\354-\357]/g, // I, i
	    	    /[\322-\330]/g, /[\362-\370]/g, // O, o
		        /[\331-\334]/g, /[\371-\374]/g, // U, u
	    	    /[\321]/g, /[\361]/g, // N, n
		        /[\307]/g, /[\347]/g, // C, c
	    	];
	    	var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
	    	var str = this;
	    	for(var i = 0; i < accent.length; i++){
	        	str = str.replace(accent[i], noaccent[i]);
	    	}
	    	return str;
		}
		//this.cards = [];
		for(const recipe of main.data) {
			let array = [];
			for(const item of recipe.ingredients) {  
				array.push(item.ingredient.toLowerCase().sansAccent());
			}
			for(const element of main.selectedKeywords) {
				if(array.includes(element.name)) {
					console.log("included " + element.name);
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
			}	
			array = [];
			this.sortByPresentsIngredients();
		}
	}
	sortByPresentsIngredients() { 
		for(const card of this.cards) {
			let array = [];
			for(const container of card.ingredients) {
				array.push(container.ingredient.toLowerCase().sansAccent());
			}
			for(const element of main.selectedKeywords) {
				if(!array.includes(element.name)) {
					console.log("not included : " + element.name);
					let index = this.cards.indexOf(card);
					this.cards.splice(index, 1);
				}
			}
			array = [];
		}
		// A éclaircir
		const cache = {};
		this.cards = this.cards.filter((elem, index, array) => {
			return cache[elem.id] ? 0 : cache[elem.id] = 1;
		});
		this.containerCards.innerHTML = 
			this.cards.map(card => {
				return card.render();
			}).join('');
		if(main.selectedKeywords.length == 0) {
			this.cards = [];
			for(const recipe of recipes) {
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
			this.containerCards.innerHTML = this.cards.map(card => {
				return card.render();
			}).join('');
		}
	}
}