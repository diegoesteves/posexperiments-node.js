var frase;
carregaFrase = function(callback) { 
	setTimeout{function() {
		frase = "minha frase que demora";
		callback();
	}, 3000)}
imprimeFrase = function () {console.log(frase);}
carregaFrase(imprimeFrase);
console.log("ola!");
