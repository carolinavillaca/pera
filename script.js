document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO CARROSSEL DE DESTAQUE ---
    const slides = document.querySelectorAll('.hero-carousel .slide');
    const prevBtn = document.querySelector('.hero-carousel .prev');
    const nextBtn = document.querySelector('.hero-carousel .next');
    let currentIndex = 0;

    function showSlide(index) {
        // Esconde todos os slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Garante que o índice seja cíclico
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Mostra o slide correto
        slides[currentIndex].classList.add('active');
    }

    if (slides.length > 0) {
        // Event listeners para os botões
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });

        // Troca automática de slide (opcional)
        setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // Muda a cada 5 segundos

        // Mostra o primeiro slide ao carregar
        showSlide(currentIndex);
    }


    // --- LÓGICA DOS BOTÕES DE HUMOR ---
    const moodBtns = document.querySelectorAll('.mood-btn');

    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            moodBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
            // Adiciona a classe 'active' apenas no botão clicado
            btn.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO CARROSSEL DE DESTAQUE (JÁ EXISTENTE) ---
    const slides = document.querySelectorAll('.hero-carousel .slide');
    const prevBtn = document.querySelector('.hero-carousel .prev');
    const nextBtn = document.querySelector('.hero-carousel .next');
    let currentIndex = 0;

    function showSlide(index) {
        if (!slides || slides.length === 0) return; // Garante que o carrossel exista na página
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


    // --- LÓGICA DOS BOTÕES DE HUMOR (JÁ EXISTENTE) ---
    const moodBtns = document.querySelectorAll('.mood-btn');
    if (moodBtns) { // Garante que os botões existam na página
        moodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                moodBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // --- LÓGICA PARA FORMULÁRIOS DE AUTENTICAÇÃO ---

    // Formulário de Cadastro
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validação simples (apenas para demonstração)
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
            window.location.href = 'perfis.html'; // Redireciona para a página de perfis
        });
    }

    // Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Validação simples (apenas para demonstração)
            if (email === "" || password === "") {
                alert("Por favor, preencha todos os campos.");
                return;
            }
            // Simula um login bem-sucedido
            alert("Login efetuado! Redirecionando para seleção de perfil...");
            window.location.href = 'perfis.html'; // Redireciona para a página de perfis
        });
    }

    // --- LÓGICA PARA SELEÇÃO DE PERFIL ---
    const profileItems = document.querySelectorAll('.profile-item');
    if (profileItems.length > 0) {
        profileItems.forEach(item => {
            item.addEventListener('click', () => {
                const profileName = item.dataset.profile; // Pega o nome do perfil do atributo data-profile
                if (profileName === "Gerenciar perfis") {
                    alert("Redirecionando para gerenciamento de perfis (funcionalidade futura)...");
                    // Aqui você redirecionaria para uma página de gerenciamento real
                } else {
                    alert(`Bem-vindo(a), ${profileName}! Carregando sua experiência...`);
                    window.location.href = 'index.html'; // Redireciona para a página principal
                }
            });
        });
    }

});