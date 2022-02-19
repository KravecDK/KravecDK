function slidesPlugin(activesSlide) {
    const slid = document.querySelectorAll('.slid')

    slid[activesSlide].classList.add('active')
    
    for (const slide of slid) {
        slide.addEventListener('click', () => {
            clearActiveClasses()
            slide.classList.add('active')
        })
    }
    
    function clearActiveClasses() {
        slid.forEach((slide) => {
    slide.classList.remove('active')
        })
    }
}

slidesPlugin(3)