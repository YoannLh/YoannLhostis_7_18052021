
class Input {
	constructor() {
		this.input = document.getElementById("input");
		this.search = document.getElementById("magnifyingGlass");
	}
	listeningChanges() {
		this.input.addEventListener("input", (event) => {
			console.log("on change : " + event.target.value);
			event.preventDefault();
			// Supérieur à 3 caractères >>> lance tris
			if(event.target.value.length >= 3) {
				console.log("input >= 3");
			}
		})
	}
	clickOnSearch() {
		this.search.addEventListener("click", () => {
			console.log("search");
		})
	}
}

const input = new Input();
input.listeningChanges();
input.clickOnSearch();
