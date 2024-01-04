let chatbox = document.querySelector('.chatbox')
let chatboxBtn = document.querySelector('.open-chat-btn')
let chatboxCloseBtn = document.querySelector('.chatbox-close-btn')
let chatboxBody = document.querySelector('.chatbox-body')
let chatboxBodyInner = document.querySelector('.chatbox-body-inner')
let chatboxInput = document.querySelector('.chatbox-input')
let chatboxSendBtn = document.querySelector('.chatbox-send-btn')
let chatboxTime = document.querySelectorAll('.chatbox-time')
let botMessage = ''
let message = ''
let enableSendMessage = true
let apiResolved = false
let tempDots = '<span class="dots-cont"> <span class="dot dot-1"></span> <span class="dot dot-2"></span> <span class="dot dot-3"></span> </span> '
// let date = new Date("October 13, 2014 07:8:00")
let date = new Date()

const getDate = (date) => {
    let day = ''
    let dayno = date.getDay()
    switch (dayno) {
        case 0:
            day = 'Sun'
            break;
        case 1:
            day = 'Mon'
            break;
        case 2:
            day = 'Tue'
            break;
        case 3:
            day = 'Wed'
            break;
        case 4:
            day = 'Thu'
            break;
        case 5:
            day = 'Fri'
            break;
        case 6:
            day = 'Sat'
            break;
    }
    return day
}
const getTime = (date) => {
    let mer = Number.parseInt((date.getHours()) / 12) === 0 ? 'AM' : 'PM'
    let hrs = Number.parseInt((date.getHours()) % 12) === 0 && Number.parseInt((date.getHours()) / 12) === 1 ? 12 : Number.parseInt((date.getHours()) % 12)
    hrs = hrs <= 9 ? `0${hrs}` : `${hrs}`
    let min = date.getMinutes()
    min = min <= 9 ? `0${min}` : `${min}`
    let str = `${hrs}:${min} ${mer}`
    return str
}
// console.log(getTime(date))

// Give time stamp to initial messages
Array.from(chatboxTime).forEach((el) => {
    let time = getTime(date)
    el.innerHTML = time
})

// Intiate stats and flags 
const resetStats = () => {
    enableSendMessage = true
    apiResolved = false
    if (message.length > 0) {
        chatboxSendBtn.disabled = false
    }
}

// Random quote api
const getQuote = () => {
    fetch('https://type.fit/api/quotes').then((res) => {
        return res.json()
    }).then((data) => {
        let index = Math.round(Math.random() * (data.length - 1))
        // console.log(index)
        // console.log(data)
        botMessage = data[index].text
        apiResolved = true
    }).catch((err) => {
        console.log('Some error in getting message')
        apiResolved = false
    })
}

// Handle response
const handleResponse = (el) => {
    let i = 0
    let box = document.createElement('div')
    box.innerHTML = `<div class="chatbox-logo"><img src="./icons/logo.svg" alt="Logo"></div><div class="message">${tempDots}</div>`
    el.appendChild(box)
    chatboxBodyInner.appendChild(el)
    chatboxBody.scrollTop = chatboxBody.scrollHeight
    let loader = setInterval(() => {
        // console.log(i)
        if (i >= 2 && i <= 14 && apiResolved) {
            let date = new Date()
            let time = getTime(date)
            box.innerHTML = `<div class="chatbox-logo"><img src="./icons/logo.svg" alt="Logo"></div><div class="message">${botMessage}</div>`
            el.innerHTML += `<div class="chatbox-time">${time}</div>`
            el.classList.add('chatbox-fade')
            stopFade()
            chatboxBody.scrollTop = chatboxBody.scrollHeight
            resetStats()
            clearInterval(loader)
        }
        else if (i == 14 && !apiResolved) {
            chatboxBodyInner.removeChild(el)
            resetStats()
            clearInterval(loader)
        }
        i = i + 2
    }, 2000)
}

// Stop slide animation
const stopSlide = () => {
    let els = document.querySelectorAll('.chatbox-slide')
    els.forEach((el) => {
        el.addEventListener('animationend', () => {
            el.classList.remove('chatbox-slide')
        })
    })
}

// Stop Fade up animation
const stopFade = () => {
    let els = document.querySelectorAll('.chatbox-fade')
    els.forEach((el) => {
        el.addEventListener('animationend', () => {
            el.classList.remove('chatbox-fade')
        })
    })
}

// Events
chatboxBtn.addEventListener('click', () => {
    chatbox.classList.toggle('active')
    document.body.classList.toggle('chatbox-body-overflow')
})
chatboxCloseBtn.addEventListener('click', () => {
    chatbox.classList.toggle('active')
    document.body.classList.remove('chatbox-body-overflow')
})
chatboxInput.addEventListener('input', (event) => {
    message = event.target.value.trim()
    message.length > 0 && enableSendMessage ? chatboxSendBtn.disabled = false : chatboxSendBtn.disabled = true
})
chatboxInput.addEventListener('click', (event) => {
    message = event.target.value.trim()
    chatboxBody.scrollTop = chatboxBody.scrollHeight
})

// Send message
chatboxSendBtn.addEventListener('click', () => {
    if (message !== '' && enableSendMessage) {
        let date = new Date()
        let time = getTime(date)
        let messageBox = document.createElement('div')
        messageBox.classList.add('chatbox-message', 'to')
        messageBox.innerHTML = `<div class="message chatbox-slide">${message}</div>
        <div class="chatbox-time">${time}</div>`
        chatboxBodyInner.appendChild(messageBox)
        stopSlide()
        getQuote()
        chatboxInput.value = ''
        chatboxBody.scrollTop = chatboxBody.scrollHeight
        chatboxSendBtn.disabled = true
        enableSendMessage = false
        setTimeout(() => {
            let messageBox = document.createElement('div')
            messageBox.classList.add('chatbox-message', 'from')
            handleResponse(messageBox)
        }, 500)
    }
    message = ''
})

// Enter key 
chatbox.addEventListener('keypress', (event) => {
    // console.log(event.key)
    if (event.key === 'Enter' && chatbox.classList.contains('active') && enableSendMessage) {
        chatboxSendBtn.click()
    }
})

// Get Message