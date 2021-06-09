
class Appliances {
	constructor(appliances) {
		this.data = appliances;
		this.sortedData = []; // ???
		this.containerAppliances = document.getElementById("containerAppliances");
		this.containerKeywords = document.getElementById("containerKeywords");
	}
	displayAppliances() {
		let i = 0;
		this.containerAppliances.innerHTML = 
			this.data.map(appliance => {
				i++;
				return '<p id="appliance' + i + '">' + appliance + '</p>';
			}).join('');
	}

	// displaySortedAppliances(sortedData) { // ??? dans l'idée de l'envoi d'un tableau trié dans les algos
	// 	console.log(sortedData);
	// 	return this.containerAppliances.innerHTML = 
	// 		this.sortedData.map(appliance => {
	// 			return '<p>' + appliance + '</p>';
	// 		}).join('');
	// }
	
	sortKeywords() {
		
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

