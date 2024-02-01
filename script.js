var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var book = [//maybe better name
    'I love to sing because it\'s fun',
    'where are you going',
    'can I call you tomorrow',
    'why did you talk while I was talking',
    'she enjoys reading books and playing games',
    'where are you going',
    'have a great day',
    'she sells seashells on the seashore'
];//idea maybe link incantation to a sound so if hear sound know that this is the incantation to say (order clue + calcul num of possibilities and memroy aspect of the game)

var sound = [
    'assets/sound/baby_cry_in_church.mp3',
    'assets/sound/boo_and_laugh.mp3',
    'assets/sound/creepy_whispering.mp3',
    'assets/sound/evil_shreik.mp3',
    'assets/sound/four_voices_whispering.mp3',
    'assets/sound/ghost_whispers.mp3',
    'assets/sound/horror_sfx_3.mp3',
    'assets/sound/lurking_monster.mp3',
    'assets/sound/possessed_laugh.mp3',
    'assets/sound/scream_echo.mp3',
    'assets/sound/whisper_trail.mp3',
    'assets/sound/wolf_howling.mp3',
];//find way to store path 'assets/sound/'? //audio file array + random or order?

var spell = document.querySelector('.spell');
var speech = document.querySelector('.speech');
var button = document.querySelector('button');

speech.addEventListener('keydown', function (event) {
    console.log(event.key);
    if (event.key === ' '){
        event.preventDefault();
        console.log("Spacebar");
        speech.value += ' ';
    }
    if (event.key === 'Enter') {
        speech.value = this.value;
        if (speech.value === spell.textContent){
            speech.style.background = 'lime';
            var audio = new Audio(sound[randomAudio()]);
            audio.play();
        }
        else {
            speech.style.background = 'red';
        }
    }
})


function randomIncantation() {
    return Math.floor(Math.random() * book.length);
}

function randomAudio() {
    return Math.floor(Math.random() * sound.length);
}

function testSpeech() {
  button.disabled = true;
  button.textContent = 'Test in progress';

  var incantation = book[randomIncantation()];
  incantation = incantation.toLowerCase();
  spell.textContent = incantation;
  speech.value = 'Right or wrong?';
  speech.style.background = 'rgba(0,0,0,0.2)';
  
  var grammar = '#JSGF V1.0; grammar speech; public <speech> = ' + speech +';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  recognition.start();
  
  recognition.onresult = function(event) {
      /*
      The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      It has a getter so it can be accessed like an array
      The first [0] returns the SpeechRecognitionResult at position 0.
      Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      These also have getters so they can be accessed like arrays.
      The second [0] returns the SpeechRecognitionAlternative at position 0.
      We then return the transcript property of the SpeechRecognitionAlternative object 
      */
     var speechResult = event.results[0][0].transcript.toLowerCase().replace(/[.,\/#!$%?\^&\*;:{}=\-_`~()]/g,"");;///(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
     console.log(speechResult);
     speech.value = speechResult;
     if (speechResult === incantation) {
         speech.style.background = 'lime';
         var audio = new Audio(sound[randomAudio()]);
         audio.play();
        }
        else {
            speech.style.background = 'red';
        }
        console.log('Confidence: ' + event.results[0][0].confidence);
    }
    
    recognition.onspeechend = function() {
    recognition.stop();
    button.disabled = false;
    button.textContent = 'Start new chant';
}

recognition.onerror = function(event) {
    button.disabled = false;
    button.textContent = 'Start new chant';
    speech.value = 'Error occurred in recognition: ' + event.error;
    speech.style.background = 'orange';
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
      /*
      Fired when the speech recognition service returns a final speech with no significant recognition.
      This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold. 
      */
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}

button.addEventListener('click', testSpeech);
//     // Check if the pressed key is the spacebar (keyCode 32)
//     // if (event.key == "Space"){
//     // if (event.keyCode == 32){
//     if (event.key === ' '){
//         // Prevent the default action of the spacebar
//         event.preventDefault();
//         console.log("Spacebar");
//     }
//     // if (this.enableKeyboardNavigation) {
//     //       $(document).keydown(function(e) {
//     //        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
//     //        switch(key) {
//     //         case 32: // space
//     //          gallery.next();
//     //          e.preventDefault();
//     //          break;
//     //        }
//     //       })
//     // }
//     // Add your custom logic here if needed
// });
