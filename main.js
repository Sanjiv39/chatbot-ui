
// Data to be overwritten
let chatbotName = 'Quill'
let avatar = '3'

// Static

let chatbox = document.querySelector('.chatbox')
let chatboxBtn = document.querySelector('.open-chat-btn')
let chatboxCloseBtn = document.querySelector('.chatbox-close-btn')
let chatboxBody = document.querySelector('.chatbox-body')
let chatboxBodyInner = document.querySelector('.chatbox-body-inner')
let chatboxInput = document.querySelector('.chatbox-input')
let chatboxSendBtn = document.querySelector('.chatbox-send-btn')
let chatboxTime = document.querySelectorAll('.chatbox-time')

const getTime = (date) => {
    let mer = Number.parseInt((date.getHours()) / 12) === 0 ? 'AM' : 'PM'
    let hrs = Number.parseInt((date.getHours()) % 12) === 0 && Number.parseInt((date.getHours()) / 12) === 1 ? 12 : Number.parseInt((date.getHours()) % 12)
    hrs = hrs <= 9 ? `0${hrs}` : `${hrs}`
    let min = date.getMinutes()
    min = min <= 9 ? `0${min}` : `${min}`
    let str = `${hrs}:${min} ${mer}`
    return str
}

const preRunner = () => {
    let container = document.querySelector('.chat-container')
    // Create elements
    const chatbox = document.createElement('div');
    chatbox.classList.add('chatbox');

    const chatboxHeader = document.createElement('div');
    chatboxHeader.classList.add('chatbox-header');

    const chatboxLogo = document.createElement('div');
    chatboxLogo.classList.add('chatbox-logo');
    const logoImg = document.createElement('img');
    logoImg.src = `./avatars/avatar-${avatar}.webp`;
    logoImg.alt = 'Logo';
    chatboxLogo.appendChild(logoImg);

    const headerText = document.createElement('div');
    headerText.classList.add('chatbox-header-text');
    headerText.innerHTML = `
    <h2>Hi this is ${chatbotName}!</h2>
    <p>How can I help you?</p>`;

    const closeButton = document.createElement('button');
    closeButton.classList.add('chatbox-close-btn');
    const closeImg = document.createElement('img');
    closeImg.src = './icons/cross.svg';
    closeImg.alt = 'close';
    closeButton.appendChild(closeImg);

    chatboxHeader.appendChild(chatboxLogo);
    chatboxHeader.appendChild(headerText);
    chatboxHeader.appendChild(closeButton);

    const chatboxBody = document.createElement('div');
    chatboxBody.classList.add('chatbox-body');

    const chatboxBodyInner = document.createElement('div');
    chatboxBodyInner.classList.add('chatbox-body-inner');

    const chatFrom = document.createElement('div');
    chatFrom.classList.add('chatbox-message', 'from');
    chatFrom.innerHTML = `
    <div>
        <div class="chatbox-logo"><img src="./avatars/avatar-${avatar}.webp" alt="Logo"></div>
        <div class="message">Hey this is ${chatbotName}! Please tell how can I help you !</div>
    </div>
    <div class="chatbox-time"></div>`;

    // const chatTo = document.createElement('div');
    // chatTo.classList.add('chatbox-message', 'to');
    // chatTo.innerHTML = `<div class="message">Hi</div>
    // <div class="chatbox-time"></div>`;

    chatboxBodyInner.appendChild(chatFrom);
    // chatboxBodyInner.appendChild(chatTo);
    chatboxBody.appendChild(chatboxBodyInner);

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('chatbox-input-container');
    inputContainer.innerHTML = `
    <input inputmode="text" type="text" name="chatbox-input" autocomplete="off" placeholder="Type something..." class="chatbox-input">
    <button class="chatbox-send-btn" disabled><img src="./icons/send.svg" alt="send"></button>`;

    const chatboxFooter = document.createElement('a');
    chatboxFooter.classList.add('chatbox-footer');
    chatboxFooter.href = 'https://humalogy.ai';
    chatboxFooter.target = '_blank';
    chatboxFooter.innerHTML = `
    Powered by <span><img src="./icons/logo.svg" alt="Logo" srcset=""></span> Humalogy.ai`;

    chatbox.appendChild(chatboxHeader);
    chatbox.appendChild(chatboxBody);
    chatbox.appendChild(inputContainer);
    chatbox.appendChild(chatboxFooter);

    const openChatButton = document.createElement('button');
    openChatButton.classList.add('open-chat-btn');
    const openChatImg = document.createElement('img');
    openChatImg.src = './icons/message.svg';
    openChatImg.alt = 'Open chat';
    openChatButton.appendChild(openChatImg);

    container.appendChild(chatbox);
    container.appendChild(openChatButton)
}

const update = () => {
    chatbox = document.querySelector('.chatbox')
    chatboxBtn = document.querySelector('.open-chat-btn')
    chatboxCloseBtn = document.querySelector('.chatbox-close-btn')
    chatboxBody = document.querySelector('.chatbox-body')
    chatboxBodyInner = document.querySelector('.chatbox-body-inner')
    chatboxInput = document.querySelector('.chatbox-input')
    chatboxSendBtn = document.querySelector('.chatbox-send-btn')
    chatboxTime = document.querySelectorAll('.chatbox-time')

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
            clientMessage = message.trim().replace(/ +/g, " ");
            let date = new Date()
            let time = getTime(date)
            let Box = document.createElement('div')
            let messageBox = document.createElement('div')
            messageBox.innerText = message
            Box.appendChild(messageBox)
            messageBox.classList.add('message', 'chatbox-slide')
            Box.classList.add('chatbox-message', 'to')
            Box.innerHTML += `<div class="chatbox-time">${time}</div>`
            chatboxBodyInner.appendChild(Box)
            Box.children[Box.children.length - 1].style.opacity = 0
            stopSlide()
            getQuote()
            chatboxInput.value = ''
            chatboxBody.scrollTop = chatboxBody.scrollHeight
            chatboxSendBtn.disabled = true
            enableSendMessage = false
            setTimeout(() => {
                let Box = document.createElement('div')
                Box.classList.add('chatbox-message', 'from')
                handleResponse(Box)
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
}

const main = () => {
    preRunner()
    update()
}

main()

// NEXT SCRIPT
let botMessage = ''
let message = ''
let clientMessage = ''
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
    fetch('https://devapi.humalogy.ai/huma-chat/ask-query/', {
        method: 'POST',
        headers: {
            // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0NiwiZW1haWwiOiJ0aG9yQGFzZ2FyZC5jb20ifQ.TblgIGz92nM1nCLTLpQUxYh9iFyteNU1sd53z3vn7G0',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "website_url": "https://excellobpo.com/",
            "user_question": clientMessage
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        // console.log(data)
        botMessage = data.data.message.replace('\n\nHumaChat:', '').trim()
        apiResolved = true
        clientMessage = ''
    }).catch((err) => {
        // console.log('Some error in getting message')
        apiResolved = false
        clientMessage = ''
    })
}

// Handle response
const handleResponse = (el) => {
    let i = 0
    let box = document.createElement('div')
    box.innerHTML = `<div class="chatbox-logo"><img src="./avatars/avatar-${avatar}.webp" alt="Logo"></div><div class="message">${tempDots}</div>`
    el.appendChild(box)
    chatboxBodyInner.appendChild(el)
    chatboxBody.scrollTop = chatboxBody.scrollHeight
    let loader = setInterval(() => {
        // console.log(i)
        if (i >= 2 && i <= 14 && apiResolved) {
            let date = new Date()
            let time = getTime(date)
            box.innerHTML = `<div class="chatbox-logo"><img src="./avatars/avatar-${avatar}.webp" alt="Logo"></div><div class="message">${botMessage}</div>`
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
            setTimeout(() => {
                el.nextSibling.style.opacity = 1
            }, 200)
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