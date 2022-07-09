const button = document.getElementById('input-button');
const inputError = document.querySelector('.input-error');
const outputContainer = document.getElementById('output-group');
const menu = document.querySelector(".nav__menu");
const navMobile = document.querySelector(".nav__mobile");
const inputUrl = document.getElementById('input-url');


menu.addEventListener('click', function() {
    navMobile.classList.toggle('show');
})



let link, shortenedLink;

const renderOutput = function(link, shorten_link) {
    const html = 
    `<div class="output" id="output">
        <p class="real-url">
            ${link}
        </p>
        <p class="short-url">
            ${shorten_link}
        </p>
        <button class="button btn-input btn-copy">Copy</button>
    </div>`;
  
    outputContainer.insertAdjacentHTML('afterbegin', html);
       
}

const shorten = async function(link) {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
    const data = await response.json();
    shortenedLink = await data.result.full_short_link;
    
    renderOutput(link, shortenedLink);
    const output = document.getElementById('output');
    output.classList.add('show');
}


button.addEventListener('click', updateOutput);
document.addEventListener('keydown', function(e) {
    if(e.key === "Enter") updateOutput();
})

function updateOutput() {
    link = inputUrl.value;
    if(!link) {
        inputUrl.classList.add('error');
        inputError.style.opacity = 1;
    }
    else {
        shorten(link);
        inputUrl.classList.remove('error');
        inputError.style.opacity = 0;
    }
}


outputContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn-copy')) {
        const shortLink = document.querySelector('.short-url');
        const textarea = document.createElement('textarea');
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        document.body.appendChild(textarea);
        textarea.value = shortLink.textContent;
        textarea.select();
        document.execCommand('copy');
        console.log(shortLink.textContent);
    }
})