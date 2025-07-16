// Calculate and display current age
function calculateAge() {
    const birthDate = new Date('1964-04-04');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    document.getElementById('age').textContent = age;
}

// Birthday cake interaction
function initializeCakeInteraction() {
    const blowButton = document.getElementById('blowCandles');
    const candles = document.querySelectorAll('.candle');
    const flames = document.querySelectorAll('.flame');
    
    let candlesBlown = false;
    
    blowButton.addEventListener('click', function() {
        if (!candlesBlown) {
            // Blow out candles
            candles.forEach((candle, index) => {
                setTimeout(() => {
                    candle.classList.add('blown');
                    
                    // Add sparkle effect
                    createSparkles(candle);
                    
                    // Play blow animation
                    candle.style.animation = 'shake 0.5s ease-in-out';
                }, index * 100);
            });
            
            // Change button text
            blowButton.innerHTML = '<i class="fas fa-redo"></i> Thắp lại';
            candlesBlown = true;
            
            // Show birthday message
            showBirthdayMessage();
            
            // Trigger confetti
            createConfetti();
            
        } else {
            // Relight candles
            candles.forEach((candle, index) => {
                setTimeout(() => {
                    candle.classList.remove('blown');
                    candle.style.animation = 'none';
                }, index * 100);
            });
            
            blowButton.innerHTML = '<i class="fas fa-wind"></i> Thổi nến';
            candlesBlown = false;
        }
    });
}

// Create sparkle effect when candles are blown
function createSparkles(candle) {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkles';
    sparkleContainer.style.cssText = `
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: none;
    `;
    
    candle.appendChild(sparkleContainer);
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 12px;
            animation: sparkleFloat 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        sparkleContainer.appendChild(sparkle);
    }
    
    setTimeout(() => {
        sparkleContainer.remove();
    }, 2000);
}

// Show birthday message
function showBirthdayMessage() {
    const message = document.createElement('div');
    message.className = 'birthday-message';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff5252, #f44336);
            color: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: messageAppear 0.5s ease-out;
        ">
            <h2 style="margin-bottom: 15px;">🎉 Chúc mừng sinh nhật! 🎉</h2>
            <p>Chúc mẹ có một ngày sinh nhật thật đặc biệt!</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                margin-top: 20px;
                background: white;
                color: #f44336;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
            ">Đóng</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
        }
    }, 5000);
}

// Create confetti effect
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999;
    `;
    document.body.appendChild(confettiContainer);
    
    const colors = ['#ff5252', '#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#e91e63'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            animation-delay: ${Math.random() * 2}s;
        `;
        confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => {
        confettiContainer.remove();
    }, 6000);
}

// Add scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.info-card, .wish-card, .memory-card').forEach(card => {
        observer.observe(card);
    });
}

// Add floating animation to cards on hover
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.info-card, .wish-card, .memory-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add typing effect for the main title
function initializeTypingEffect() {
    const titleElement = document.querySelector('.main-title');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
}

// Add dynamic CSS for animations
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes messageAppear {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-30px) scale(0.5);
            }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        
        .sparkles {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    calculateAge();
    initializeCakeInteraction();
    initializeScrollAnimations();
    initializeCardAnimations();
    addDynamicStyles();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Add some fun easter eggs
document.addEventListener('keydown', function(event) {
    // Press 'H' for Happy Birthday message
    if (event.key.toLowerCase() === 'h') {
        showBirthdayMessage();
    }
    
    // Press 'C' for confetti
    if (event.key.toLowerCase() === 'c') {
        createConfetti();
    }
});

// Add click effect to hearts
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('heart')) {
        event.target.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            event.target.style.animation = 'floatHearts 15s infinite linear';
        }, 500);
    }
});