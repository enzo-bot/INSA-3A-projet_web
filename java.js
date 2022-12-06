var word=[];
var n = 0;
var userInput=[];
var userType=[];
var nbEssai = 6;
//Position du prochain caractère que l'utilisateur va écrire
var gameI = 0; 
var gameJ = 0;
var divWidth = 80;
var space = 10;
var divHeight = 80;

function generateWord(dictionnary) {
  const len_dic = 223434;
	let rnd = Math.floor(Math.random()*len_dic);
  console.log(rnd);

  var array = new FileReader();
  
  var fic = new File([""],"dictionnaire.txt");
  
  array.readAsArrayBuffer(fic);

  console.log(array[0]);

  generatedWord=[];
	generatedWord[0]='T';
	generatedWord[1]='A';
	generatedWord[2]='B';
	generatedWord[3]='L';
	generatedWord[4]='E';
	generatedWord[5]='A';
	generatedWord[6]='U';
	//Choisir un mot au hasard
	//Retourner le mot dans un tableau
	return generatedWord;
}

function updateGame(){
	//On commence par supprimer l'ensemble de l'affichage graphique
	const jeu=document.getElementById("jeu");
			/*while(jeu.firstChild){ 
				jeu.removeChild(res.firstChild);
			}*/
	
	n = word.length;
	let child = jeu.firstChild;
	for(let i = 0;i<nbEssai;i++){
		for(let j=0;j<n;j++) {
			let letter = userInput[i][j];
			child.textContent=letter;
			if (userType[i][j]==1) {
				child.style.backgroundColor = ` #ffad22 `;
				//child.style.textColor = ` black `
			}
			else if (userType[i][j]==2) {
				child.style.backgroundColor = ` #08c011 `;
				//child.style.textColor = ` black `
			}
			child = child.nextSibling;
		}
	}
}

function generateGame(){
	const jeu=document.getElementById("jeu");
	while(jeu.firstChild){ 
		jeu.removeChild(jeu.firstChild);
	}



	for(let i = 0;i<nbEssai;i++){
		for(let j=0;j<n;j++) {
			var child = document.createElement('div');
			child.classList.add("case");
			child.style.width = `${divWidth}px`;
			child.style.height = `${divHeight}px`;
			child.style.backgroundColor = ` #818181 `;
			child.style.marginRight = `10px`;
			child.style.marginTop = `5px`;
			child.style.color = "white";
			child.style.textAlign = "center";
			child.style.borderRadius = "10px";
			child.style.verticalAligne = `middle`;
			child.style.lineHeight = `${divHeight}px`;
			child.style.border = `solid`;
			child.style.borderColor = `#333333`
			jeu.appendChild(child);
		}
	}
}


document.onkeydown = function(evt) {
	evt = evt || window.event;
	var charCode = evt.keyCode || evt.which;
	var charStr = String.fromCharCode(charCode);
	if((charCode >= 41 && charCode <= 90)||(charCode >= 97 && charCode <= 122)) {
		addLetter(charStr);
	}
	else if(charCode==8){
		removeLetter();
	}
	else if(charCode == 13){
		validerWord(gameI);
		updateGame();
	}
};

function addLetter(lettre) {
	userInput[gameI][gameJ] = lettre;
	updateGame();
	if (gameJ != n){
	    gameJ++;
	}
}

function removeLetter() {
	if (gameJ > 0){
		gameJ -= 1;
	}
	userInput[gameI][gameJ] = "";
	updateGame();
	
}

function validerWord() {
	if((gameJ==n)) {
		console.log("ok");
		gameJ =0;
		gameI +=1;
		checkWord(gameI-1);
		if (gameI >= nbEssai) {
			newGame();
		}
	}
}

function validWord(){
	return true;
}

function checkWord(i){
	let goodWord=1;
	for(let j =0;j<word.length;j++) {
		if(userInput[i][j] != word[j]) {
			goodWord = 0;
		}
	}

	if (goodWord==0) {
		for(let j =0;j<word.length;j++) {
			for(let k =0;k<word.length;k++) {
				if(userInput[i][j] == word[k]) {
					userType[i][j] = 1;
					if (j==k){
						userType[i][j] = 2;
					}
				}
			}
		}
	}
	else {
		for(let j =0;j<word.length;j++) {
			userType[i][j] = 2;
		}
	}
}

function newGame() {
	word = generateWord("dic.txt");
	n = word.length;
	userInput = [];
	userType=[];
	gameI = 0;
	gameJ = 0;
	for(let i = 0;i<nbEssai;i++){
		userInput[i] = [];
		userType[i] = [];
		for(let j=0;j<n;j++) {
			userInput[i][j] = "";
			userType[i][j] = 0;
		}
	}

	const jeu=document.getElementById("jeu");
	let wid = divWidth*n+space*n+10*n;
	jeu.style.width = `${wid}px`

	generateGame();
	updateGame();
}