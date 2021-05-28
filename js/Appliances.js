
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
	displaySortedAppliances(sortedData) { // ??? dans l'idée de l'envoi d'un tableau trié dans les algos
		console.log(sortedData);
		return this.containerAppliances.innerHTML = 
			this.sortedData.map(appliance => {
				return '<p>' + appliance + '</p>';
			}).join('');
	}
	clickAndDisplayKeyword() {
		for(let i = 1; i <= this.data.length; i++) {
			document.getElementById("appliance" + i + "").addEventListener("click", (event) => {
				selectedKeywords.push('<div class="keyword bg-danger flex"><p>' + event.target.innerText + '</p><div><i class="far fa-times-circle"></i></div></div>');
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return element;
					}).join('');
					
			});
		}
	}
}

