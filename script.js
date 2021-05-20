'use strict'

const startPageContainer = document.querySelector('.startPageContainer')
const levelBtns = document.querySelectorAll('.levelCircle')
const btnStart = document.querySelector('.start-btn')
const theoryBoard = document.querySelector('.theory-lecture')
const question = document.querySelector('.question')
const virtualKeys = document.querySelectorAll('.key')
const btnSurrender = document.querySelector('.surrender')
const answerRevealed = document.querySelector('.answer')
const resultsScrn = document.querySelector('.resultsScreen')
const resultsEmoji = document.querySelector('.emoji')
const resultsMessage = document.querySelector('.message')
const resultsBar = document.querySelector('.resultsBar-fill')
const btnAgain = document.querySelector('.again-btn')

const shortcuts = {
    undo: {
        name: 'undo',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite atšaukti paskutinį atliktą veiksmą?',
        keys: ['Ctrl', 'z'],
        level: 1
    },
    selectAll: {
        name: 'selectAll',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite pažymėti visą tekstą?',
        keys: ['Ctrl', 'a'],
        level: 1
    },
    copy: {
        name: 'copy',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite nukopijuoti pažymėtą tekstą?',
        keys: ['Ctrl', 'c'],
        level: 1
    },
    cut: {
        name: 'cut',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite iškirpti pažymėtą tekstą?',
        keys: ['Ctrl', 'x'],
        level: 1
    },
    paste: {
        name: 'paste',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite įklijuoti nukopijuotą tekstą?',
        keys: ['Ctrl', 'v'],
        level: 1
    },
    clipboard: {
        name: 'clipboard',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite peržiūrėti kopijavimo istoriją?',
        keys: ['Windows', 'v'],
        level: 2
    },
    find: {
        name: 'find',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite surasti tam tikrą žodį tekste?',
        keys: ['Ctrl', 'f'],
        level: 2
    },
    snapshot: {
        name: 'snapshot',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite atlikti ekrano nuotrauką?',
        keys: ['Shift','Windows', 's'],
        level: 3
    },
    emoji: {
        name: 'emoji',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite įterpti emoji?',
        keys: ['Windows', ';'],
        level: 2
    },
    openClosedTab: {
        name: 'openClosedTab',
        theoryQuestion: 'Kokią mygtukų kombinaciją reikia spausti, jei norite atidaryti netyčia uždarytą naršyklės skirtuką?',
        keys: ['Ctrl', 'Shift', 't'],
        level: 3
    }
}

const resultsObj = {
    terrible : {
        message: 'Siaubingai bloga...',
        emojiClass: 'fa-dizzy'
    },
    veryBad : {
        message: 'Labai blogai...',
        emojiClass: 'fa-angry'
    },
    bad : {
        message: 'Prastai...',
        emojiClass: 'fa-frown'
    },
    meh : {
        message: 'Vidutiniškai.',
        emojiClass: 'fa-meh'
    },
    ok : {
        message: 'Gerai.',
        emojiClass: 'fa-smile'
    },
    veryGood : {
        message: 'Labai gerai.',
        emojiClass: 'fa-grin'
    },
    excellent : {
        message: 'Puikiai!',
        emojiClass: 'fa-grin-hearts'
    },

}

let gameLevel = 1
const sequence = []
let currentShortcut = []
const pointsForOneQuestion = 3
let scoreMax = 0
let scoreCurrentQuestion = pointsForOneQuestion
let scorePlayerTotal = 0

// Functions
const createSequence = function () {
    for (const shortcut of Object.values(shortcuts)) {
        if (shortcut.level <= gameLevel) sequence.push(shortcut.name)
    }
    sequence.sort(() => Math.random() - 0.5)
    scoreMax = sequence.length * pointsForOneQuestion
}

const askQuestion = function () {
    answerRevealed.classList.add('hidden')
    btnSurrender.classList.add('hidden')
    if (sequence.length) {
        question.textContent = shortcuts[sequence[0]].theoryQuestion
        currentShortcut = shortcuts[sequence[0]].keys.slice()
    } else {
        showResults()
        console.log(scorePlayerTotal + "/" + scoreMax)
    }
   
}

const resetCurrentQuestion = function () {
    currentShortcut = shortcuts[sequence[0]].keys
    resetKeyboard()
    currentShortcut = shortcuts[sequence[0]].keys.slice()
}
const resetKeyboard = function () {
    virtualKeys.forEach(key => {
        key.classList.remove('correct')
    })
}

const showResults = function () {
    theoryBoard.classList.add('hidden')
    resultsScrn.classList.remove('hidden')
    const percentageScore = scorePlayerTotal / scoreMax * 100
    console.log(percentageScore)
    if (percentageScore === 100) {
        resultsEmoji.innerHTML = `<i class="fas ${resultsObj.excellent.emojiClass}"></i>`
        resultsMessage.textContent = resultsObj.excellent.message
    } else if (percentageScore >= 80 && percentageScore < 100) {
        resultsEmoji.innerHTML = `<i class="fas ${resultsObj.veryGood.emojiClass}"></i>`
        resultsMessage.textContent = resultsObj.veryGood.message
    } else if (percentageScore >= 60 && percentageScore < 80) {
        resultsEmoji.innerHTML = `<i class="fas ${resultsObj.ok.emojiClass}"></i>`
        resultsMessage.textContent = resultsObj.ok.message
    } else if (percentageScore >= 40 && percentageScore < 60) {
        resultsEmoji.innerHTML = `<i class="fas ${resultsObj.meh.emojiClass}"></i>`
        resultsMessage.textContent = resultsObj.meh.message
    } else if (percentageScore >= 20 && percentageScore < 40) {
        resultsEmoji.innerHTML = `<i class="fas ${resultsObj.bad.emojiClass}"></i>`
        resultsMessage.textContent = resultsObj.bad.message
    } else if (percentageScore > 0 && percentageScore < 20) {
        resultsEmoji.innerHTML = `<i class="fas ${resultsObj.veryBad.emojiClass}"></i>`
        resultsMessage.textContent = resultsObj.veryBad.message
    } else if (percentageScore === 0) {
        resultsEmoji.innerHTML = `<i class="fas ${resultsObj.terrible.emojiClass}"></i>`
        resultsMessage.textContent = resultsObj.terrible.message
    }
   
   
    setTimeout(function(){
    resultsBar.style.width = `${scorePlayerTotal * 400 / scoreMax}px`
}, 500)
}



// btnLevel1.addEventListener('click', () => {
//     btnLevel1.classList.remove('inactive')
//     btnLevel2.classList.add('inactive')
//     gameLevel = 1
// })
// btnLevel2.addEventListener('click', () => {
//     btnLevel2.classList.remove('inactive')
//     btnLevel1.classList.add('inactive')
//     gameLevel = 2
// })


levelBtns.forEach((levelBtn, idx) => {
   levelBtn.addEventListener('click', () => {
       gameLevel = idx+1
       levelBtns.forEach((levelBtn2, idx2) => {
            if (idx2 <= idx) {
                levelBtn2.classList.add('activeLevel')
            } else {
                levelBtn2.classList.remove('activeLevel')
            }
       })
   })
})

btnStart.addEventListener('click', () => {
    startPageContainer.classList.add('hidden')
    theoryBoard.classList.remove('hidden')
    createSequence()
    console.log(sequence)
    askQuestion()
    console.log(gameLevel)
})


virtualKeys.forEach((key) => {
    key.addEventListener('click', () => {
        if (currentShortcut.length && currentShortcut.includes(key.id)) {
            key.classList.add('correct')
            currentShortcut.splice(currentShortcut.indexOf(key.id), 1)
            if (!currentShortcut.length) {
                sequence.shift()
                setTimeout(function(){
                    scorePlayerTotal += scoreCurrentQuestion
                    scoreCurrentQuestion = pointsForOneQuestion
                    resetKeyboard()
                    askQuestion()
            }, 500)
            }
      
        } else {
            resetCurrentQuestion()
            if(scoreCurrentQuestion) scoreCurrentQuestion -= 2
            if(scoreCurrentQuestion < 0) {
                scoreCurrentQuestion = 0
                btnSurrender.classList.remove('hidden')
            }
        }
    })
})

btnSurrender.addEventListener('click', () => {
    btnSurrender.classList.add('hidden')
    answerRevealed.classList.remove('hidden')
    answerRevealed.textContent = shortcuts[sequence[0]].keys.join(' + ')
})


btnAgain.addEventListener('click', () => {
    resultsScrn.classList.add('hidden')
    startPageContainer.classList.remove('hidden')
    scorePlayerTotal = 0
    resultsBar.style.width = '0px'
})
