const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ff00ff', '#ff1493', '#adff2f', 'yellow', 'purple', '#adff2f', '#00ffff', '#00ffff', '#ff0000']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})



function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if  (time === 0) {
        finisfhGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finisfhGame() {
    timeEl.parentNode.classList.add('hide')
board.innerHTML = `<h1>Cчет: <span class='primary'>${score}</span></h1>`
}


function getRendomColor () {    
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}




function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRendomNumber(10, 50)
    const {width, height} = board.getBoundingClientRect()
    const x = getRendomNumber(0, width - size)
    const y = getRendomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`


    const color = getRendomColor()
    circle.style.backgroundColor = color     
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`     
    

    board.append(circle)
}

function getRendomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function winTheGame() {
    function kill() {       
        const circle = document.querySelector('.circle')  

        if (circle) {      
            circle.click()     
        }
    }

    setInterval(kill, 70) 
}




