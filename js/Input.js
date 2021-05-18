
class Input {
	constructor() {
		this.input = document.getElementById("input");
		this.search = document.getElementById("magnifyingGlass");
	}
	listeningChanges() {
		this.input.addEventListener("input", () => {
			console.log("on change : " + event.target.value);
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