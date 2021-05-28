
class Ustensils {
	constructor(ustensils) {
		this.data = ustensils;
		this.sortedData = []; // ???
		this.containerUstensils = document.getElementById("containerUstensils");
		this.containerKeywords = document.getElementById("containerKeywords");
	}
	displayUstensils() {
		let i = 0;
		this.containerUstensils.innerHTML = 
			this.data.map(ustensil => {
				i++;
				return '<p id="ustensil' + i + '">' + ustensil + '</p>';
			}).join('');
	}
	displaySortedUstensils(sortedData) { // ??? dans l'idée de l'envoi d'un tableau trié dans les algos
		console.log(sortedData);
		return this.containerUstensils.innerHTML = 
			this.sortedData.map(ustensil => {
				return '<p>' + ustensil + '</p>';
			}).join('');
	}
	clickAndDisplayKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById("ustensil" + i + "").addEventListener("click", (event) => {
				selectedKeywords.push('<div class="keyword bg-success flex"><p>' + event.target.innerText + '</p><div><i class="far fa-times-circle"></i></div></div>');
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return element;
					}).join('');
					
			});
		}
	}
}

