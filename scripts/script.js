const images = [
    {
        url: "images/png/img_Rostov-on-Don_LCD-admiral.png",
        title: "Rostov-on-Don, Admiral",
        city: ["Rostov-on-Don", "LCD admiral"],
        apartmentArea: "81 m2",
        repairTime: "3.5 months",
        repairCost: "Upon request"
    }, {
        url: "images/png/img_Sochi_Thieves.png",
        title: "Sochi Thieves",
        city: ["Sochi", "Thieves"],
        apartmentArea: "105 m2",
        repairTime: "4 months",
        repairCost: "Upon request"
    }, {
        url: "images/png/img_Rostov-on-Don_Patriotic.png",
        title: "Rostov-on-Don Patriotic",
        city: ["Rostov-on-Don", "Patriotic"],
        apartmentArea: "93 m2",
        repairTime: "3 months",
        repairCost: "Upon request"
    },
];

function initSlider(options) {
    //проверяем, что пришедший с сервера массив с проектами не пустой
    if (!images || !images.length) return;

    options = options || {
        titles: true,
        dots: true,
        description: false,
        autoplay: false,
    };

    const sliderImages = document.querySelector(".slider__images");
    const sliderNav = document.querySelector(".slider__nav");
    const sliderDots = document.querySelector(".slider__dots");
    const sliderCaptions = document.querySelector(".slider__captions");
    const sliderInfoCity = document.querySelector(".slider__info-city");
    const sliderInfoApartmentArea = document.querySelector(".slider__info-apartment-area");
    const sliderInfoRepairTime = document.querySelector(".slider__info-repair-time");
    const sliderInfoRepairCost = document.querySelector(".slider__info-repair-cost");

    initImages();
    initArrows();

    if (options.titles) {
        initTitles();
    }

    if (options.dots) {
        initDots();
    }

    if (options.description) {
        initDescription();
    }

    if (options.autoplay) {
        initAutoplay();
    }

    // Вывод изображений из массива в html
    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = document.createElement("div");
            imageDiv.className = `image n${index} ${index === 0 ? "active" : ""}`;
            imageDiv.style.backgroundImage = `url(${image.url})`;
            imageDiv.setAttribute("data-index", index);
            sliderImages.appendChild(imageDiv);
        });
    }

    // УПРАВЛЕНИЕ СТРЕЛКАМИ
    function initArrows() {
        sliderNav.querySelectorAll(".slider__arrow").forEach((arrow) => {
            arrow.addEventListener("click", () => {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        });
    }

    // УПРАВЛЕНИЕ ТОЧКАМИ переключения слайдера
    function initDots() {
        images.forEach((image, index) => {
            let dotDiv = document.createElement("div");
            dotDiv.className = `slider__dot-item n${index} ${index === 0 ? "active" : ""}`;
            dotDiv.setAttribute("data-index", index);
            sliderDots.appendChild(dotDiv);
        });
        sliderDots.querySelectorAll(".slider__dot-item").forEach(dot => {
            dot.addEventListener("click", function () {
                moveSlider(this.dataset.index);
            });
        });
    }

    // УПРАВЛЕНИЕ ССЫЛКАМИ над слайдером
    function initTitles() {
        images.forEach((image, index) => {
            let captionDiv = document.createElement("div");
            captionDiv.className = `slider__caption-item slider__title n${index} ${index === 0 ? "active" : ""}`;
            captionDiv.textContent = image.title;
            captionDiv.setAttribute("data-index", index);
            sliderCaptions.appendChild(captionDiv);
        });
        sliderCaptions.querySelectorAll(".slider__caption-item").forEach(caption => {
            caption.addEventListener("click", function () {
                moveSlider(this.dataset.index);
            });
        });
    }

    // ВЫВОД ОПИСАНИЯ СЛАЙДЕРА
    // ВЫВОД ГОРОДА, ВЫВОД ПЛОЩАДИ, ВЫВОД ВРЕМЕНИ РЕМОНТА, ВЫВОД СТОИМОСТИ РЕМОНТА 
    function initDescription() {
        images.forEach((image, index) => {
            let cityElement = document.createElement("p");
            cityElement.className = `slider__info-text slider__text n${index} ${index === 0 ? "active" : ""}`;
            if (Array.isArray(image.city)) {
                image.city.forEach(city => {
                    let cityDiv = document.createElement("div");
                    cityDiv.textContent = city;
                    cityElement.appendChild(cityDiv);
                })
            } else {
                cityElement.textContent = image.city;
            }
            cityElement.setAttribute("data-index", index);
            sliderInfoCity.appendChild(cityElement);

            let areaElement = document.createElement("p");
            areaElement.className = `slider__info-text slider__text n${index} ${index === 0 ? "active" : ""}`;
            areaElement.textContent = image.apartmentArea;
            areaElement.setAttribute("data-index", index);
            sliderInfoApartmentArea.appendChild(areaElement);

            let timeElement = document.createElement("p");
            timeElement.className = `slider__info-text slider__text n${index} ${index === 0 ? "active" : ""}`;
            timeElement.textContent = image.repairTime;
            timeElement.setAttribute("data-index", index);
            sliderInfoRepairTime.appendChild(timeElement);

            let costElement = document.createElement("p");
            costElement.className = `slider__info-text slider__text n${index} ${index === 0 ? "active" : ""}`;
            costElement.textContent = image.repairCost;
            costElement.setAttribute("data-index", index);
            sliderInfoRepairCost.appendChild(costElement);
        });
    }

     // АВТОМАТИЧЕСКОЕ ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ
     function initAutoplay() {
        setInterval(() => {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
            moveSlider(nextNumber);
        }, options.interval);
    }

    // ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ
    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");

        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");

        sliderCaptions.querySelector(".active").classList.remove("active");
        sliderCaptions.querySelector(".n" + num).classList.add("active");

        sliderInfoCity.querySelector(".active").classList.remove("active");
        sliderInfoCity.querySelector(".n" + num).classList.add("active");

        sliderInfoApartmentArea.querySelector(".active").classList.remove("active");
        sliderInfoApartmentArea.querySelector(".n" + num).classList.add("active");

        sliderInfoRepairTime.querySelector(".active").classList.remove("active");
        sliderInfoRepairTime.querySelector(".n" + num).classList.add("active");

        sliderInfoRepairCost.querySelector(".active").classList.remove("active");
        sliderInfoRepairCost.querySelector(".n" + num).classList.add("active");
    }

};

let sliderOptions = {
    titles: true,
    dots: true,
    description: true,
    autoplay: true,
    interval: 5000
};

document.addEventListener("DOMContentLoaded", () => {
    initSlider(sliderOptions);
});
