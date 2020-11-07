// Get all keys
const keys = document.querySelectorAll(".key")

// play notes
function playNote(event) {
    // event.type -> conseguimos saber por onde estamos executando o evento (click or keydown)
    // event.keyCode -> Retorna o código da tecla digitada
    // Pelo event.targer conseguimos ter acesso ao dataset que nos dá o código da key
    
    // KeyCode
    let audioKeyCode = getKeyCode(event)
    // typed or pressed key
    const key = document.querySelector(`[data-key='${audioKeyCode}']`)
    // if key exists
    const isKeyExists = key 
    if (!isKeyExists) {
        // Se a key não existir
        return
    }
    // play audio
    addPlayingClass(key)
    audioPlay(audioKeyCode)
}

function addPlayingClass(key) {
    key.classList.add("playing")
}

function getKeyCode(event) {
    let keyCode
    const isKeyboard = event.type === "keydown"

    if (isKeyboard) {
        // Se o evento for keydown
        keyCode = event.keyCode // Código da tecla
    } else {
        keyCode = event.target.dataset.key
    }
    return keyCode
}

function audioPlay(audioKeyCode) {
    const audio = document.querySelector(`audio[data-key='${audioKeyCode}']`)
    audio.currentTime = 0
    audio.play()
}

function removePlayingClass(event) {
    event.target.classList.remove("playing")
}

// click with mouse
keys.forEach(key => { // Precisamos usar o evento em cada tecla
    key.addEventListener("click", playNote)
    key.addEventListener("transitionend", removePlayingClass) // Quando acabar a transição ele tira a classe
})
// type keyboard
// Objeto window -> se refere a janela toda
window.addEventListener("keydown", playNote) 
// Toda vez que eu pressionar a tecla irá executar uma função 
// .addEventListener -> responsável por ouvir os eventos, quando ouvido ele executa o evento