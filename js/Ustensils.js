
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

	// displaySortedUstensils(sortedData) { // ??? dans l'idée de l'envoi d'un tableau trié dans les algos
	// 	console.log(sortedData);
	// 	return this.containerUstensils.innerHTML = 
	// 		this.sortedData.map(ustensil => {
	// 			return '<p>' + ustensil + '</p>';
	// 		}).join('');
	// }
	
	sortKeywords() {
		
	}
	clickAndDisplayKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById("ustensil" + i + "").addEventListener("click", (event) => {
				selectedKeywords.push({"name": event.target.innerText, "color": "success"});
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





















