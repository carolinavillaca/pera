const YOUTUBE_API_KEY = '';

async function buscarVideosYouTube(termo) {
    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(termo)}&key=${YOUTUBE_API_KEY}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (!data.items) {
            console.error('Erro na API do YouTube:', data.error?.message || data);
            return [];
        }

        return data.items;
    } catch (error) {
        console.error('Erro ao buscar vídeos do YouTube:', error);
        return [];
    }
}

buscarVideosYouTube('lofi').then(videos => console.log(videos));

function renderizarCardsYoutube(videos, containerSelector) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <div class="card-overlay">
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <button class="btn-play">Assista agora</button>
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

buscarVideosYouTube('filme romance trailer').then(videos => {
    renderizarCardsYoutube(videos, '#romances-row');
});

buscarVideosYouTube('filme infantil trailer desenho').then(videos => {
    renderizarCardsYoutube(videos, '#infantil-row');
});

function renderizarSlidesComAPI(videos, containerSelector) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';
    videos.forEach((video, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide' + (i === 0 ? ' active' : '');
        slide.style.backgroundImage = `url('${video.snippet.thumbnails.high.url}')`;
        slide.innerHTML = `
            <div class="slide-content">
                <h1>${video.snippet.title}</h1>
                <p>${video.snippet.description ? video.snippet.description.substring(0, 100) + '...' : ''}</p>
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank" class="btn-play">Assista agora</a>
            </div>
        `;
        container.appendChild(slide);
    });
}

buscarVideosYouTube('ação trailer').then(videos => {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        if(videos[i]) {
            slide.style.backgroundImage = `url('${videos[i].snippet.thumbnails.high.url}')`;
            slide.querySelector('h1').textContent = videos[i].snippet.title;
            slide.querySelector('p').textContent = videos[i].snippet.description.substring(0, 100) + '...';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // carrossel
    const slides = document.querySelectorAll('.hero-carousel .slide');
    const prevBtn = document.querySelector('.hero-carousel .prev');
    const nextBtn = document.querySelector('.hero-carousel .next');
    let currentIndex = 0;

    function showSlide(index) {
        if (!slides || slides.length === 0) return; 
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        slides[currentIndex].classList.add('active');
    }

    if (slides.length > 0) {
        nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
        prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
        setInterval(() => showSlide(currentIndex + 1), 5000);
        showSlide(currentIndex);
    }

    //botões humor
    const moodBtns = document.querySelectorAll('.mood-btn');
    if (moodBtns) { 
        moodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                moodBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }


    // formulário de cadastro
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (name === "" || email === "" || password === "" || confirmPassword === "") {
                alert("Por favor, preencha todos os campos.");
                return;
            }
            if (password !== confirmPassword) {
                alert("As senhas não coincidem.");
                return;
            }
            if (password.length < 8) {
                alert("A senha deve ter no mínimo 8 caracteres.");
                return;
            }
            // Simula um cadastro bem-sucedido
            alert("Cadastro realizado com sucesso! Redirecionando para seleção de perfil...");
            window.location.href = 'perfis.html'; 
        });
    }

    // Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Validação simples (apenas para demonstração)
            if (email === "" || password === "") {
                alert("Por favor, preencha todos os campos.");
                return;
            }
            alert("Login efetuado! Redirecionando para seleção de perfil...");
            window.location.href = 'perfis.html'; 
        });
    }

    // seleção de perfil

// --- LÓGICA DE PERFIS, HEADER E PESQUISA ---

// 1. Seleção de perfil e redirecionamento (para perfis.html)
const profileItems = document.querySelectorAll('.profile-item');
if (profileItems.length > 0) {
    profileItems.forEach(item => {
        item.addEventListener('click', () => {
            const profileImgSrc = item.getAttribute('data-img-src');
            const profileName = item.dataset.profile; 

            if (profileImgSrc) { // Se for um perfil clicável com imagem
                localStorage.setItem('selectedProfileImg', profileImgSrc);
                window.location.href = 'index.html';
            } else if (profileName === "Gerenciar perfis") {
                alert("Redirecionando para gerenciamento de perfis (funcionalidade futura)...");
            }
        });
    });
}

// 2. Exibição do perfil salvo no header (para index.html)
const headerProfileImg = document.getElementById('header-profile-img');
if (headerProfileImg) {
    const savedProfileImg = localStorage.getItem('selectedProfileImg');
    if (savedProfileImg) {
        headerProfileImg.src = savedProfileImg;
    }
}

// 3. Funcionalidade da Barra de Pesquisa (para index.html)
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        document.querySelectorAll('.movie-section').forEach(section => {
            let sectionHasVisibleMovies = false;
            
            section.querySelectorAll('.movie-card').forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                
                if (title.includes(searchTerm)) {
                    card.style.display = 'block';
                    sectionHasVisibleMovies = true;
                } else {
                    card.style.display = 'none';
                }
            });

            if (sectionHasVisibleMovies) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
}
});
