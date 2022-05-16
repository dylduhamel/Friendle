document.addEventListener("DOMContentLoaded", () => {
     const keys = document.querySelectorAll('.keyboard-row button');
     let guessedWords = [[]];
     let availableSpace = 1;

     let names = "James Nicholas Jack Fehme Landon Kevin Max Emmett Robert Edward George Dylan William Brian Louis John Charles Adrian Elijah Alexander Thomas Henry Noah Alan Nathaniel Nicholas Christian Raymond Ethan Edward Owen Kyle Scott Timothy Connor Austin Connor Walter Jason Scott Tyler Matthew Spencer Frederick Kurt Dane Anthony George Fulton Cameron Kieran Justin William Dexter Patrick Matthew Mark Ethan William Daniel Aidan Andrew Jeff Wilson William Michael Zain Spencer Cameron Connor Benson John Kyle Kyle Colin Robert Walker Ashley Graham Tommy Troy Sam Ethan Jesper"
     let nameArr = names.split(" ");

     let word = nameArr[Math.floor(Math.random()*nameArr.length)].toLocaleLowerCase();
     console.log(word);

     let guessedWordCount = 0;
     const wordLength = word.length;

     document.getElementById("board").style = `grid-template-columns: repeat(${wordLength},1fr);`

     createSquares();

     function getCurrentWordArr() {
          const numberOfGuessedWords = guessedWords.length; /** Basically we have an array of array's and the array's are the guessed words so we return the most current array */
          return guessedWords[numberOfGuessedWords - 1];
     }
     
     function updateGuessedWords(letter) {
          const currentWordArr = getCurrentWordArr();

          if (currentWordArr && currentWordArr.length < wordLength) { /** The 5 will have to change */
               currentWordArr.push(letter);

               const availableSpaceElement = document.getElementById(String(availableSpace));
               availableSpace = availableSpace + 1;

               availableSpaceElement.textContent = letter;
          }
     }

     function getTileColor(letter, index) {
          const isCorrectLetter = word.includes(letter);

          if(!isCorrectLetter) {
               return 'rgb(58, 58, 60)';
          }

          const letterInThatPosition = word.charAt(index);
          const isCorrectPosition = letter === letterInThatPosition;

          if(isCorrectPosition) {
               return 'rgb(83, 141, 78)';
          }

          return 'rgb(181, 159, 59)';
     }

     function handleDeleteLetter() {
          const currentWordArr = getCurrentWordArr();
          const removedLetter = currentWordArr.pop();

          guessedWords[guessedWords.length - 1] = currentWordArr;

          const lastLetterEl = document.getElementById(String(availableSpace - 1));

          lastLetterEl.textContent = "";
          availableSpace = availableSpace - 1;
     }

     function handleSubmitWord() {
          const currentWordArr = getCurrentWordArr();

          if (currentWordArr.length != wordLength) {
               window.alert(`Word must be ${wordLength} letters, idiot!`) 
               return;
          }

          const currentWord = currentWordArr.join('');

          const firstLetterId = guessedWordCount * wordLength + 1;
          const interval = 200;  
          currentWordArr.forEach((letter, index) => {
               setTimeout(() => {
                    const tileColor = getTileColor(letter, index);

                    const letterId = firstLetterId + index;
                    const letterEl = document.getElementById(letterId);
                    letterEl.classList.add("animate__flipInX");
                    letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
               }, interval * index);
          })

          guessedWordCount += 1;

          if(currentWord === word) {
               window.alert("That is correct!");
          }

          if(guessedWords.length === 6) {
               window.alert(`No more guesses, idiot! The name was ${word}`); 
          }
           
          guessedWords.push([]); /** Adds a new array to input another word guess */
     }

     function createSquares() {
          const gameBoard = document.getElementById("board");

          for(let i = 0; i < 6*wordLength; i++) {
               let square = document.createElement("div");
               square.classList.add("square");
               square.classList.add("animate__animated");
               square.setAttribute("id", i+1);
               gameBoard.appendChild(square);
          }
     }

     for (let i = 0; i < keys.length; i++) {
               keys[i].onclick = ({ target }) => {
                    const letter = target.getAttribute("data-key");

                    if(letter === "enter") {
                         handleSubmitWord();
                         return;
                    }

                    if(letter === 'del') {
                         handleDeleteLetter();
                         return;
                    }

                    updateGuessedWords(letter);
               }
          }

     document.addEventListener('keyup', (event) => {
          let letter = event.key;
          let letterCode = event.keyCode;

          if(letterCode === 13) {
               handleSubmitWord();
               return;
          }

          if(letterCode === 8) {
               handleDeleteLetter();
               return;
          }

          updateGuessedWords(letter);
     }, false);

})