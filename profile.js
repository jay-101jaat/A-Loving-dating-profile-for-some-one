document.addEventListener('DOMContentLoaded', () => {

    // ==============================================
    // 1. Smooth Scroll for All Internal Links
    // ==============================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Stop instant jump

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ==============================================
    // 2. The "Hard to Get" Button (Random Move)
    // ==============================================
    // Select any button with the class 'btn-dodge'
    const dodgeButtons = document.querySelectorAll('.btn-dodge');

    dodgeButtons.forEach(btn => {
        btn.addEventListener('mouseover', () => {
            // Calculate random X and Y positions between -100px and 100px
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;

            // Apply the translation
            // Note: We use !important behavior logic via inline styles ensuring it moves
            btn.style.transform = `translate(${x}px, ${y}px)`;

            // Optional: Change text to be cheeky
            const originalText = btn.innerText;
            const cheekyTexts = ["Too Slow!", "Nope!", "Try Again!", "Missed Me!"];
            btn.innerText = cheekyTexts[Math.floor(Math.random() * cheekyTexts.length)];

            // Reset text after a delay (optional)
            setTimeout(() => {
                btn.innerText = originalText;
            }, 1500);
        });
    });
    // ==============================================
    // 3. Typing Effect Logic
    // ==============================================
    const typedTextSpan = document.querySelector(".typing-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["a Developer.", "6ft of good decision.", "Date night Certified.", "ready to commit."];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");

            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");

            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the typing effect on load
    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }
        // ==============================================
    // 4. Reveal Hidden Text on Card Hover
    // ==============================================
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        const hiddenText = card.querySelector('.feature-desc');
        
        // Safety check: ensure the card actually has text
        if (hiddenText) {
            // Set initial styles via JS (or you can do this in CSS)
            hiddenText.style.opacity = '0';
            hiddenText.style.transform = 'translateY(10px)'; // Start slightly lower
            hiddenText.style.transition = 'all 0.5s ease-in-out';
            
            // Mouse Enter (Fade In)
            card.addEventListener('mouseenter', () => {
                hiddenText.style.opacity = '1';
                hiddenText.style.transform = 'translateY(0)';
            });

            // Mouse Leave (Fade Out)
            card.addEventListener('mouseleave', () => {
                hiddenText.style.opacity = '0';
                hiddenText.style.transform = 'translateY(10px)';
            });
        }
    });
    // ==============================================
    // 5. Compatibility Quiz Logic
    // ==============================================
    
    // Configuration: Define your ideal answers here
    // Keys match the 'name' attributes in your HTML
    const correctAnswers = {
        sunday: 'gaming',   // Matches value="gaming"
        pizza: 'yes'        // Matches value="yes"
    };

    const quizButton = document.querySelector('.quiz-form .btn-secondary');
    const quizForm = document.querySelector('.quiz-form');

    if (quizButton) {
        quizButton.addEventListener('click', () => {
            let score = 0;
            let totalQuestions = Object.keys(correctAnswers).length;
            
            // 1. Calculate Score
            for (let question in correctAnswers) {
                const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
                if (userAnswer && userAnswer.value === correctAnswers[question]) {
                    score++;
                }
            }

            // 2. Calculate Percentage
            const percentage = Math.round((score / totalQuestions) * 100);
            
            // 3. Determine Result Message
            let message = "";
            let title = "";
            
            if (percentage === 100) {
                title = "It's a 100% Match! ❤️";
                message = "Pack your bags, we're going to Ikea.";
            } else if (percentage >= 50) {
                title = "Solid " + percentage + "% Match 🤝";
                message = "We can definitely work with this. I'll teach you good taste.";
            } else {
                title = "Oh no... " + percentage + "% 🚩";
                message = "Opposites attract, right? ...Right?";
            }

            // 4. Display Results (Replace Form with Result Card)
            // We use the existing glassmorphism styles
            quizForm.innerHTML = `
                <div class="result-card" style="text-align: center; animation: fadeInUp 0.5s ease;">
                    <h3 style="font-size: 2rem; color: var(--accent-primary); margin-bottom: 1rem;">${percentage}%</h3>
                    <h4 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${title}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">${message}</p>
                    <button onclick="location.reload()" class="btn btn-secondary btn-sm">Try Again</button>
                    <a href="#proposal" class="btn btn-primary romantic-glow" style="margin-left: 10px;">Say Hi</a>
                </div>
            `;
        });
    }
    // ==============================================
    // 6. Three Playful Buttons Logic
    // ==============================================

    // Button 1: The "Celebrate" Button (Confetti Effect)
    const btnCelebrate = document.getElementById('btn-celebrate');
    if (btnCelebrate) {
        btnCelebrate.addEventListener('click', (e) => {
            const button = e.target;
            button.innerText = "Yay! 🎉";
            
            // Simple emoji confetti burst
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.innerText = ['❤️', '✨', '🎉', '🌹'][Math.floor(Math.random() * 4)];
                particle.style.position = 'fixed';
                particle.style.left = button.getBoundingClientRect().left + 'px';
                particle.style.top = button.getBoundingClientRect().top + 'px';
                particle.style.fontSize = '20px';
                particle.style.pointerEvents = 'none';
                particle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
                document.body.appendChild(particle);

                // Animate slightly delayed
                requestAnimationFrame(() => {
                    const x = (Math.random() - 0.5) * 200;
                    const y = (Math.random() - 1) * 200;
                    particle.style.transform = `translate(${x}px, ${y}px)`;
                    particle.style.opacity = '0';
                });

                // Cleanup
                setTimeout(() => particle.remove(), 1000);
            }
        });
    }

    // Button 2: The "Shy" Button (Runs away on hover/click attempt)
    const btnShy = document.getElementById('btn-shy');
    if (btnShy) {
        // Run away on hover
        btnShy.addEventListener('mouseover', moveButton);
        btnShy.addEventListener('click', moveButton);

        function moveButton() {
            const x = Math.random() * 300 - 150; // -150 to 150
            const y = Math.random() * 300 - 150;
            btnShy.style.transform = `translate(${x}px, ${y}px)`;
            
            const shyTexts = ["Not yet!", "Too fast!", "Catch me!", "Nope!"];
            btnShy.innerText = shyTexts[Math.floor(Math.random() * shyTexts.length)];
        }
    }

    // Button 3: The "Secret" Button (Reveals a hidden note)
    const btnSecret = document.getElementById('btn-secret');
    const secretMessage = document.getElementById('secret-message');
    
    if (btnSecret && secretMessage) {
        btnSecret.addEventListener('click', () => {
            btnSecret.style.display = 'none'; // Hide button
            secretMessage.classList.remove('hidden'); // Show message
            secretMessage.style.opacity = 0;
            
            // Fade in effect
            let opacity = 0;
            const fadeIn = setInterval(() => {
                if (opacity >= 1) clearInterval(fadeIn);
                secretMessage.style.opacity = opacity;
                opacity += 0.05;
            }, 30);
        });
    }


});
