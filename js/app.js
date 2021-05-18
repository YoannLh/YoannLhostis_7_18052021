
class MainManager {
	constructor() {
		this.search = document.getElementById("magnifyingGlass");
	}
	go() {
		this.search.addEventListener("click", () => {
			console.log("search");
		})
	}
}

const mainManager = new MainManager();
mainManager.go();