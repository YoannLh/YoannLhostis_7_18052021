const selectedKeywords = [];

class Main {
	constructor(recipes) {
		this.data = recipes;
		this.dataIngredients = [];
		this.dataAppliances = [];
		this.dataUstensils = [];
	}
	sortDataByIngredients() {

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

		for(const recipe of recipes) {
			for(const ingredient of recipe.ingredients) {
				this.dataIngredients.push(ingredient.ingredient.toLowerCase().sansAccent());
			}
		}
		const filteredArray = this.dataIngredients.filter((ele, pos) => {
    		return this.dataIngredients.indexOf(ele) == pos;
		})
		this.dataIngredients = filteredArray;
		console.log(this.dataIngredients);

		const ingredients = new Ingredients(this.dataIngredients);
		ingredients.displayIngredients(); 
		ingredients.clickAndDisplayKeyword();
		ingredients.closeKeyword();
	}
	sortByAppliances() {
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
		for(const recipe of recipes) {
			this.dataAppliances.push(recipe.appliance.toLowerCase().sansAccent());	
		}
		const filteredArray = this.dataAppliances.filter((ele, pos) => {
    		return this.dataAppliances.indexOf(ele) == pos;
		})
		this.dataAppliances = filteredArray;
		console.log(this.dataAppliances); 

		const appliances = new Appliances(this.dataAppliances);
		appliances.displayAppliances();
		appliances.clickAndDisplayKeyword();
	}
	sortByUstensils() {
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
		for(const recipe of recipes) {
			for(const ustensil of recipe.ustensils) {
				this.dataUstensils.push(ustensil.toLowerCase().sansAccent());
			}
		}
		const filteredArray = this.dataUstensils.filter((ele, pos) => {
    		return this.dataUstensils.indexOf(ele) == pos;
		})
		this.dataUstensils = filteredArray;
		console.log(this.dataUstensils);

		const ustensils = new Ustensils(this.dataUstensils);
		ustensils.displayUstensils();
		ustensils.clickAndDisplayKeyword();
	}
}

const main = new Main(recipes);
main.sortDataByIngredients();
main.sortByAppliances();
main.sortByUstensils();
























