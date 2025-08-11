// Counter animation function
function animateCounter(element, finalValue, duration = 2000) {
    let start = 0;
    const increment = finalValue / (duration / 16);
    const counter = () => {
        start += increment;
        if (start >= finalValue) {
            element.textContent = formatNumber(finalValue);
            element.classList.add('counting');
            return;
        }
        element.textContent = formatNumber(Math.floor(start));
        requestAnimationFrame(counter);
    };
    counter();
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initialize counters when section comes into view
function initImpactCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(document.getElementById('children-count'), 5000);
                animateCounter(document.getElementById('communities-count'), 120);
                animateCounter(document.getElementById('countries-count'), 15);
                initImpactChart();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.querySelector('.impact-section'));
}

// Initialize chart
function initImpactChart() {
    const ctx = document.getElementById('impactChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Education', 'Healthcare', 'Clean Water', 'Food Security', 'Shelter'],
            datasets: [{
                label: 'Projects Supported',
                data: [48, 32, 25, 37, 19],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(139, 92, 246, 0.7)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(139, 92, 246, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Our Impact Areas',
                    color: 'white',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Add hover effect to cards
function addCardHoverEffects() {
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize all impact section functionality
document.addEventListener('DOMContentLoaded', function() {
    initImpactCounters();
    addCardHoverEffects();
    
    // Make sure Chart.js is loaded before initializing
    if (typeof Chart !== 'undefined') {
        initImpactChart();
    } else {
        console.warn('Chart.js not loaded - impact chart will not be displayed');
    }
});