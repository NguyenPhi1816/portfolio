const navbar = document.querySelector('.nav');
const scrollBtn = document.querySelector('.scroll-down');
const sections = document.querySelectorAll('.section');
const links = document.querySelectorAll('.link');
const hamburger = document.querySelector('.hamburger');
const linksMobileContainer = document.querySelector('.links-mobile');
const linksMobile = document.querySelectorAll('.link-mobile > a');
const BackToTopBtn = document.querySelector('.back-to-top');
const personImg = document.querySelector('.person-img');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
const slideContainer = document.querySelector('.slide-container');
const sliderNavigation = document.querySelector('.slider-navigation');
const form = document.querySelector('.form');
const submitBtn = form.querySelector('.submit-btn');
const clearBtn = form.querySelector('.clear-btn');

const app = {
    webData: [
        {
            url: '#',
            img: './images/sneakers.png',
            name: 'Sneaker Shop',
            type: 'E-commerce Website',
        },
        {
            url: '#',
            img: './images/blog.png',
            name: 'Go with Kha Phi',
            type: 'Travel Blog',
        },
        {
            url: '#',
            img: './images/turntable.png',
            name: 'Your Musik',
            type: 'Music Player',
        }
    ],

    activateMobileLinks: function () {
        hamburger.addEventListener('click', () => { 
            hamburger.classList.toggle('active-hamburger');
            linksMobileContainer.classList.toggle('active-links-mobile');
        });
    },

    scrollToView: function (x, y) {
        if (window.outerWidth <= 500) {
            let navHeight = navbar.offsetHeight;
            window.scrollTo(x, y - navHeight);
        } else {
            window.scrollTo(x, y);
        }
    },

    scrollDownBtn: function () {
        scrollBtn.addEventListener('click', (e) => {
            this.scrollToView(0, sections[1].offsetTop);
        });
    },

    mobileLinksOnClick: function () {
        linksMobile.forEach(link => { 
            link.addEventListener('click', (e) => {
                e.preventDefault();
                hamburger.classList.remove('active-hamburger');
                linksMobileContainer.classList.remove('active-links-mobile');

                let sectionClass = 'section-' + e.target.innerText.toLowerCase();
                let section = Array.from(sections).find(function (section) { 
                    return section.classList.contains(sectionClass);
                });

                this.scrollToView(0, section.offsetTop);
            });
        });
    },

    resetActiveLink: function () {
        window.onscroll = function () {
            let current = '';
            sections.forEach((section) => { 
                let sectionTop;
                if (window.outerWidth <= 500) {
                    let navHeight = navbar.offsetHeight;
                    sectionTop = section.offsetTop - navHeight;
                } else {
                    sectionTop = section.offsetTop;
                }
                if (window.pageYOffset >= sectionTop - 1) {
                    current = section.getAttribute('id');
                }
            });

            links.forEach(link => { 
                link.classList.remove('active-link');
                if (link.classList.contains('link-' + current)) {
                    link.classList.add('active-link');
                }
            });

            linksMobile.forEach(link => { 
                link.classList.remove('active-link');
                if (link.classList.contains('link-' + current)) {
                    link.classList.add('active-link');
                }
            });
        }
    },

    BackToTop: function () {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= sections[0].offsetHeight) {
                BackToTopBtn.classList.add('active-back-to-top');
            } else {
                BackToTopBtn.classList.remove('active-back-to-top');
            }
        });
    },

    aboutImg: function () {
        personImg.style.height = personImg.offsetWidth + 'px';
    },

    renderSlider: function (currentSlide, totalSlide) {
        let html = '';
        let j = currentSlide - 1;
        if (j < 0) {
            j = app.webData.length - 1;
        }
        for (let i = 0; i < totalSlide + 2; i++) {
            if (j > app.webData.length - 1) {
                j = 0
            }
            html += `<div class="slide" id="${j}">
                    <img src="${app.webData[j].img}" alt="image" />
                    <h3 class="web-name">${app.webData[j].name}</h3>
                    <p class="web-type">${app.webData[j].type}</p>
                    <div class="visit-btn">
                        <a href="${app.webData[j].url}" target="_blank">VISIT</a>
                    </div>
                </div>`;
            j++;
        }
        slideContainer.innerHTML = html;

        navigationHtml = '';
        let pageNavigation = Math.ceil(app.webData.length / totalSlide);
        for (let i = 1; i <= pageNavigation; i++) {
            if (i == 1) {
                navigationHtml += `<span class="slider-page active-page" id="${i}"></span>`
            } else {
                navigationHtml += `<span class="slider-page" id="${i}"></span>`
            }
        }
        sliderNavigation.innerHTML = navigationHtml;
    },

    pushBack: function (currentSlide) {
        let div = document.createElement("div");
        div.className = 'slide';
        let j = parseInt(currentSlide);
        j++;
        if (j >= app.webData.length) {
            j = j % app.webData.length;
        }
        div.id = j;
        div.innerHTML = `<img src="${app.webData[j].img}" alt="image" />
                    <h3 class="web-name">${app.webData[j].name}</h3>
                    <p class="web-type">${app.webData[j].type}</p>
                    <div class="visit-btn">
                        <a href="${app.webData[j].url}" target="_blank">VISIT</a>
                    </div>`;
        slideContainer.appendChild(div);
    },

    pushFirst: function (currentSlide) {
        let div = document.createElement("div");
        div.className = 'slide';
        let j = parseInt(currentSlide);
        j--;
        if (j < 0) {
            j = app.webData.length - 1;
        }
        div.id = j;
        div.innerHTML = `<img src="${app.webData[j].img}" alt="image" />
                    <h3 class="web-name">${app.webData[j].name}</h3>
                    <p class="web-type">${app.webData[j].type}</p>
                    <div class="visit-btn">
                        <a href="${app.webData[j].url}" target="_blank">VISIT</a>
                    </div>`;
        slideContainer.prepend(div);
    },

    resetActivePage: function (currentSlide, totalSlide) {
        let pages = document.querySelectorAll('.slider-page');
        let currentPage = Math.floor(currentSlide / totalSlide + 1);
        pages.forEach((page) => { 
            page.classList.remove('active-page');
        });
        pages[currentPage - 1].classList.add('active-page');
    },

    navigatePage: function (totalSlide) {
        let pages = document.querySelectorAll('.slider-page');
        pages.forEach((page) => { 
            page.addEventListener('click', (e) => {
                let currentSlide = parseInt(slideContainer.firstChild.id) + 1;
                if (currentSlide > app.webData.length - 1) {
                    currentSlide = 0;
                }
                let times = (e.target.id - 1) * totalSlide - currentSlide;
                if (times < 0) {
                    for (let i = 0; i < Math.abs(times); i++) {
                        sliderPrev.click();
                    }
                } else {
                    for (let i = 0; i < times; i++) {
                        sliderNext.click();
                    }
                }
            })
        });
    },

    slider: function (totalSlide) {
        const _this = this;
        let sliderShow = document.querySelector('.slider-show');
        sliderShow.style.width = totalSlide * 200 + (totalSlide - 1) * 20 + 'px';
        let currentSlide = 0;
        this.renderSlider(currentSlide, totalSlide);
        sliderNext.addEventListener('click', function () {
            currentSlide++;
            if (currentSlide > app.webData.length - 1) {
                currentSlide = 0;
            }
            slideContainer.style.animation = 'toLeft 0.2s linear forwards';
            slideContainer.style.left = '-220px';
            _this.pushBack(slideContainer.lastChild.id);
            slideContainer.firstChild.remove();
            _this.resetActivePage(currentSlide, totalSlide);
            setTimeout(() => { slideContainer.style.animation = "" }, 300);
        });

        sliderPrev.addEventListener('click', function () { 
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = app.webData.length - 1;
            }
            _this.pushFirst(slideContainer.firstChild.id);
            slideContainer.style.animation = 'toRight 0.2s linear forwards';
            slideContainer.style.left = '-220px';
            slideContainer.lastChild.remove();
            _this.resetActivePage(currentSlide, totalSlide);
            setTimeout(() => { slideContainer.style.animation = "" }, 300);
        });
        this.navigatePage(totalSlide);
    },

    validate: function (input) {
        let errorMessage;
        let value = input.value;
        switch (input.id) {
            case 'email': {
                let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regex.test(value)) {
                    errorMessage = 'Your email is not valid';
                }
            }
            default: {
                if (value.trim() === '') {
                    errorMessage = 'This field is required';
                }
            }
        }
        if (errorMessage) {
            input.classList.add('invalid-form');
            let formMessage = input.nextElementSibling;
            formMessage.classList.add('invalid');
            formMessage.innerHTML = `<p>${errorMessage}</p>`;
            return 0;
        } else {
            return 1;
        }
    },

    getFormValue: function (form) {
        const _this = this;
        const inputs = form.querySelectorAll('input[type=text]');
        let value = {
            name: '',
            email: '',
            subject: '',
            message: '',
        };
        
        inputs.forEach((input) => { 
            input.addEventListener('blur', () => { 
                _this.validate(input);
            });
        });

        inputs.forEach(input => { 
            input.addEventListener('input', () => { 
                let invalidForms = form.querySelectorAll('.invalid-form');
                if (invalidForms)
                    invalidForms.forEach((invalidForm) => {
                        if (_this.validate(invalidForm) === 1) {
                            invalidForm.classList.remove('invalid-form');
                            let formMessage = invalidForm.nextElementSibling;
                            formMessage.classList.remove('invalid');
                            formMessage.innerHTML = '';
                        }
                    });
            });
        });
        
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let isValid = 1;
            for (let i = 0; i < inputs.length; i++) {
                if (_this.validate(inputs[i]) !== 1) {
                    isValid = 0;
                }
            }
            if (isValid !== 0) {
                const successMessage = document.querySelector('.form-message-success');
                successMessage.classList.add('valid');
                successMessage.innerHTML = '<p>Your message has been sent successfully!</p>';
                setTimeout(() => { 
                    successMessage.classList.remove('valid');
                    successMessage.innerHTML = '';
                }, 2000);
                value.name = inputs[0].value.trim();
                value.email = inputs[1].value.trim();
                value.subject = inputs[2].value.trim();
                value.message = inputs[3].value.trim();
                console.log(value);
                inputs.forEach(input => input.value = '');
            }
        });

        clearBtn.addEventListener('click', (e) => { 
            e.preventDefault();
            let invalidForms = form.querySelectorAll('.invalid-form');
            if (invalidForms) {
                invalidForms.forEach((invalidForm) => {
                    invalidForm.classList.remove('invalid-form');
                });
            }
            let invalidMessages = form.querySelectorAll('.invalid');
            if (invalidMessages) {
                invalidMessages.forEach((message) => { 
                    message.classList.remove('invalid');
                });
            }
            inputs.forEach((input) => { 
                input.value = '';
            });
        });
    },

    start: function () {
        this.activateMobileLinks();
        this.scrollDownBtn();
        this.mobileLinksOnClick();
        this.resetActiveLink();
        this.BackToTop();
        this.aboutImg();

        if (window.outerWidth <= 500) {
            this.slider(1);
        } else {
            this.slider(4);
        }

        this.getFormValue(form);
    }
}

window.addEventListener('DOMContentLoaded', (e) => {
    window.addEventListener('resize', () => { 
        location.reload();
    });

    app.start();
});