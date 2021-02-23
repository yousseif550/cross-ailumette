const prompt = require('prompt-sync')({sigint: true})

let array = [
    [''],
    ['|'],
    ['|','|','|'],
    ['|','|','|','|','|'],
    ['|','|','|','|','|','|','|']
]

let vide = [ [ '' ], [], [], [], []]

function render () {
    console.log('*********')
    for (i=0; i<array.length; i++){
        process.stdout.write('*')
        for (j=0; j<array[i].length; j++){
            process.stdout.write(array[i][j])
        }
        console.log('*')
    }
    console.log('*********')

}

function input() {
    let line = 0;
    let nb = 0;

    while(!check(line )) {
        line = prompt ('Sur quelles lignes voulait-vous piocher ?')
        console.log('a :', line)
    }
    while(!check2(nb, line)) { 
        nb = prompt("Combien d'allumettes voulez-vous retirer ?")
    }
}


function check(line){
    if (line == undefined) {
        return false
    }
    else if(line <= 0 || line > 4  ) {
        console.log('b :', line)
        console.log('Veuillez saisir une ligne compris entre 1 et 4')
        return false
    }
    else if  (count(line) == 0) {
        console.log ('AUCUNE ALLUMETTES, SAISIR UNE AUTRE LIGNE')
        return false
    }
    else if (isNaN(line)) {
        console.log('SAISIR UN NOMBRE')
        return false
    }
    else {
        return true
    }
}

function check2(nb, line) {
    let tab = array[line]
    if (nb == undefined) {
        return false
    }
    else if  (nb > count(line)) {
        console.log ('PAS ASSEZ DALLUMETTES')
        return false
    }
    else if (isNaN(nb)){
        console.log ('SAISIR UN NOMBRE')
        return false
    }
    else if (nb <= 0){
        console.log('SAISIR UN NOMBRE POSITIF IL RESTE', count(line), 'ALLUMETTES')
        return false
    }
    else {
        for (let i = 0; i < nb; i++) {
            
            tab.pop();
        }
        render();
        return true
    }
}


function count(line) {
    let compteur = 0;
    for (let i = 0; i < array[line].length; i++){
        if (array[line][i] == '|'){
            compteur++;
        }
    }
    return compteur;
    
}

function end () {
    console.log(array)
    console.log(vide)
    if (array == vide ){
        console.log('FIN DE PARTIE')
    }
    
}
function main(){
    render()
    input()
}

function random(min,max){
    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function ai(line){
    let match = random(1,4);
    let game = random(1,6);
    console.log('IA a supprimé', game,' match(s) de la ligne',match);
    for (let i = 0; i < game; i++) {
        let tab = array[line];
        tab = array[match];            
        tab.pop();
    }
}

function tour () {
    let x = 0;
 
    while (array != vide) {
      if (x % 2 == 0) {
        main()
      }
      else if (x % 2 != 0){

        ai();
      }
      else if (array == vide ){
        end();
        return false
    }      
      x++;
    }

}

tour();
