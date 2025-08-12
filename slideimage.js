function initComparisons() {
    const slider = document.querySelector('.img-comp-slider');
    const sliderLine = document.querySelector('.img-comp-slider-line');
    const overlay = document.querySelector('.img-comp-overlay');
    let clicked = false;
    
    // Set initial position
    overlay.style.width = '50%';
    slider.style.left = '50%';
    sliderLine.style.left = '50%';
    
    // Desktop events
    slider.addEventListener('mousedown', slideReady);
    window.addEventListener('mouseup', slideFinish);
    slider.addEventListener('mousemove', slideMove);
    
    // Touch events for mobile
    slider.addEventListener('touchstart', slideReady);
    window.addEventListener('touchend', slideFinish);
    slider.addEventListener('touchmove', slideMove);
    
    function slideReady(e) {
        e.preventDefault();
        clicked = true;
        window.addEventListener('mousemove', slideMove);
        window.addEventListener('touchmove', slideMove);
    }
    
    function slideFinish() {
        clicked = false;
        window.removeEventListener('mousemove', slideMove);
        window.removeEventListener('touchmove', slideMove);
    }
    
    function slideMove(e) {
        if (!clicked) return false;
        
        let pos = getCursorPos(e);
        if (pos < 0) pos = 0;
        if (pos > 300) pos = 300; // Container width
        
        slide(pos);
    }
    
    function getCursorPos(e) {
        e = e || window.event;
        const container = document.querySelector('.img-comp-container');
        const rect = container.getBoundingClientRect();
        
        // Check if it's a touch event
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        
        return clientX - rect.left;
    }
    
    function slide(pos) {
        const container = document.querySelector('.img-comp-container');
        const width = container.offsetWidth;
        const percentage = (pos / width) * 100;
        
        // Limit between 0-100%
        const finalPercentage = Math.min(Math.max(percentage, 0), 100);
        
        overlay.style.width = finalPercentage + '%';
        slider.style.left = finalPercentage + '%';
        sliderLine.style.left = finalPercentage + '%';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initComparisons);