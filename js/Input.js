
class Input {
	constructor() {
		this.input = document.getElementById("input");
		this.search = document.getElementById("magnifyingGlass");
		this.cards = [];
		this.containerCards = document.getElementById("containerCards");
	}
	
	clickOnSearch() {
		this.search.addEventListener("click", () => {
			console.log("search");
		})
	}
}

const input = new Input();

input.clickOnSearch();
