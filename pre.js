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
    logoImg.src = './icons/logo.svg';
    logoImg.alt = 'Logo';
    chatboxLogo.appendChild(logoImg);

    const headerText = document.createElement('div');
    headerText.classList.add('chatbox-header-text');
    headerText.innerHTML = `
    <h2>Hi this is Huma!</h2>
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
        <div class="chatbox-logo"><img src="./icons/logo.svg" alt="Logo"></div>
        <div class="message">Hi there</div>
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

    // Append to document body or a container
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