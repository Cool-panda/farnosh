let poems = [];
let currentPage = 1;
const poemsPerPage = 10;

async function fetchPoems() {
    const response = await fetch('/api/poems');
    poems = await response.json();
    renderPoems();
}

function renderPoems() {
    const poemsContainer = document.getElementById('poems');
    poemsContainer.innerHTML = '';

    let start = (currentPage - 1) * poemsPerPage;
    let end = start + poemsPerPage;
    let currentPoems = poems.slice(start, end);

    currentPoems.forEach(poem => {
        let poemDiv = document.createElement('div');
        poemDiv.className = 'poem';
        poemDiv.innerText = poem;
        poemsContainer.appendChild(poemDiv);
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPoems();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < Math.ceil(poems.length / poemsPerPage)) {
        currentPage++;
        renderPoems();
    }
});

document.getElementById('poemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPoem = document.getElementById('newPoem').value.trim();
    if (newPoem) {
        await fetch('/api/poems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ poem: newPoem })
        });
        document.getElementById('newPoem').value = '';
        fetchPoems();
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = '❤️';  // اینجا ایموجی قلب رو گذاشتیم
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px'; // اندازه رندوم برای جذابیت
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

fetchPoems();
