class Dictionnaire {

getWord() {
  let rnd = Math.floor(Math.random() * 223433);
  
  return this.dictionnaire[rnd];
}

}