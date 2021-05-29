
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
				selectedKeywords.push('<div class="keyword bg-danger flex"><p>' + event.target.innerText + '</p><div id="close' + (selectedKeywords.length + 1) + '"><i class="far fa-times-circle"></i></div></div>');
				console.log(selectedKeywords);
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return element;
					}).join('');
				this.closeKeyword();
			});
		}	
	}
	closeKeyword() {
		let temp = selectedKeywords;
		for(const el of temp) {
			let index = temp.indexOf(el) + 1;
			console.log(index);
			document.getElementById("close" + index + "").addEventListener("click", () => {
				console.log("click" + index + " !");
				temp.splice(index - 1, 1);
				selectedKeywords = temp;
				this.containerKeywords.innerHTML = 
					selectedKeywords.map(element => {
						return element;
					}).join('');
				console.log(selectedKeywords);
				this.closeKeyword();
			})
		}	
	}
}

