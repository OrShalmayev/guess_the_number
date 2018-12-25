//Declaring variables
let body,randomNumber,counter,attempt_arr,guessField,guessSubmit,paras,guesses,guessResult,lowOrHi,resetButton;
let game;
 $(function(){
     //Variables
     randomNumber = Math.floor(Math.random()*1000)+1;
     counter = 1;
     attempt_arr = ['','1','2','3','4','5','6','7','8','9','10'];
     body = $('#id_body')
     
     //Functions
     game = new GuessGame(body);
     game.addToHTML();
     guessField.focus();
     //Events

     //Debug
     console.log({body,randomNumber,counter,attempt_arr,guessField,guessSubmit,paras,guesses,guessResult,lowOrHi,resetButton})

 });

 function GuessGame(_parent){
     this.parent = _parent;
 }

 GuessGame.prototype.addToHTML = function(){
     let heading= (`<h1>Guess The Number Game</h1>`)
     let newText = $(`    <input type="text" name="" id="id_guessField" placeholder = "Your guess..">
     `);
     let newSubmit = $(`<input type="submit" value="Submit" id="id_guessSubmit">`);
     this.newGame = $(`<div></div>`)


     $(this.newGame).html(`
     <div class="paras">
     <p id="id_guesses"></p>
     <p id="id_guessResult"></p>
     <p id="id_lowOrHi"></p>
     </div>
     `);
     $(this.newGame).prepend(newSubmit);
     $(this.newGame).prepend(newText);
     $(this.newGame).prepend(heading);
     $(this.parent).append(this.newGame);

     //Variables
     // guessField,guessSubmit,paras,guesses,guessResult,lowOrHi
     guessField = $('#id_guessField');
     guessSubmit = $('#id_guessSubmit');
     paras = $('.paras p');
     guesses = $('#id_guesses');
     guessResult = $('#id_guessResult');
     lowOrHi = $('#id_lowOrHi')

     //Event click on submit btn
     $(newSubmit).on("click",checkGuess);
 }
      
 function checkGuess(){
     //console.log('%c Hello there this is work' , 'color:blue;font-size:20px;')
     let userGuess = Number(guessField.val());
     //console.log(userGuess) --- Tested!
     if(counter === 1){$(guesses).text(`Previous guess: `);}
     $(guesses).append(` ${userGuess}`);
     if(userGuess === randomNumber){
         $(guessResult).html(`Congratulations you got it on your ${attempt_arr[counter]} attempt this is very impressive!!!`).css({color:'green',fontSize:'2em'});
         setGameOver();
     }else if(counter === 10){
         $(guessResult).html(`!!!GAME OVER!!!`).css({color:'red',fontSize:'2em'});
         setGameOver();
     }else{
         $(guessResult).html(`Wrong!`).css({color:'red',fontSize:'2em'});
     }
     if(userGuess>randomNumber){
         $(lowOrHi).html(`Last guess was too <mark>high</mark>!`).css({color:'orange'})
     }else{
         $(lowOrHi).html(`Last guess was too <mark>low</mark>!`).css({color:'orange'})
     }

     counter++;
     $(guessField).val('')
     guessField.focus();
     
     // console.log({guessField,guessSubmit,paras,guesses,guessResult,lowOrHi}); --- Tested!
 }//End checkGuess function ------------------------>
 function disableInputs(parameter){
     $(guessField).prop('disabled',parameter);
     $(guessSubmit).prop('disabled',parameter);
 }//End disableInputs function ------------------------>
 function setGameOver(){
     disableInputs(true);
     resetButton = $(`<button>Start New Game!</button>`);
     $(body).append(resetButton);
     $(resetButton).on('click',resetGame);
 }//End setGameOver function ------------------------>
 function resetGame(){
     disableInputs(false);
     $(resetButton).remove();
     $(paras).empty();
     resetVariables();
 }//End resetGame function ------------------------>
 function resetVariables(){
     randomNumber = Math.floor(Math.random()*1000)+1;
     counter = 1;
 }//End resetVariables function ------------------------>
