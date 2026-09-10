// Mobile menu toggle ke liye choti si JS script (agar chaho toh script.js mein daal sakti ho)
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function changeSlide(n) {
    showSlides(slideIndex += n);
}// Har category ki apni images ki lists
const galleryData = {
    dupattas: ["dupata.jfif", "download (20).jfif", "download (21).jfif", "22.jfif", "pink.jfif", "mmm.jfif", "dd.jfif"],
    caligraphy: ["caligraphy.jfif", "cali 2.jfif", "download (5).jfif", "download (7).jfif", "download (8).jfif", "download (9).jfif", "ge2.jfif"],
    sketches: ["art.jfif", "download (3).jfif", "download (10).jfif", "download (11).jfif", "Horse pencil drawing.jfif", "ppp.jfif", "gart.jfif"],
    frames: ["nikahnama.jfif", "tray.jfif", "nika special pletar.jfif", "nikkah bidh box.jfif", "nika2.jfif", "nika3.jfif", "gnn.jfif"],
    handicrafts: [ "handi3.jfif", "sunflower phonecase.jfif", "handi4.jfif", "handi5.jfif", "handi6.jfif","download (22).jfif", "hgg.jfif"],
    gifts: ["gift.jfif", "bbb.jfif", "bbb2.jfif", "g222.jfif", "g33.jfif", "g44.jfif", "glasttt.jfif"],
    scrapbooks: ["download (4).jfif", "download (13).jfif", "s3.jfif", "s4.jfif", "s5.jfif", "s6.jfif", "gss.jfif"],
};

let currentCategoryImages = [];
let currentSlideIndex = 0;

function openSlider(category) {
    currentCategoryImages = galleryData[category];
    currentSlideIndex = 0;
    
    const modal = document.getElementById("imageSliderModal");
    modal.style.display = "flex";
    updateSliderImage();
}

function closeSlider() {
    document.getElementById("imageSliderModal").style.display = "none";
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= currentCategoryImages.length) {
        currentSlideIndex = 0; 
    }
    if (currentSlideIndex < 0) {
        currentSlideIndex = currentCategoryImages.length - 1; 
    }
    updateSliderImage();
}

function updateSliderImage() {
    if(currentCategoryImages && currentCategoryImages.length > 0) {
        document.getElementById("sliderImage").src = currentCategoryImages[currentSlideIndex];
    }
}

// Sabhi "Order Now" buttons ko khud-b-khud order.html par redirect karne ke liye
document.querySelectorAll('.service-box .order-btn').forEach(btn => {
    btn.setAttribute('href', 'order.html');
});

document.querySelectorAll('.service-box').forEach(box => {
    const titleElement = box.querySelector('h3');
    const btn = box.querySelector('.order-btn');
    if (titleElement && btn) {
        const title = titleElement.innerText.trim().replace(/\s+/g, '-');
        btn.setAttribute('href', `order.html?service=${title}`);
    }
});
// Form submit hone par EmailJS ke zariye email bhejne ka code
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Page ko refresh hone se roknay ke liye

        // Form se values lena
        const customerName = document.getElementById('customer-name') ? document.getElementById('customer-name').value : "Valued Customer";
        const customerEmail = document.getElementById('customer-email').value;
        const serviceNameInput = document.getElementById('serviceInput');
        const serviceName = serviceNameInput ? serviceNameInput.value : "D&A Creations Custom Order";

        const templateParams = {
            to_name: customerName,
            email: customerEmail,
            service_name: serviceName,
            order_id: Math.floor(100000 + Math.random() * 900000)
        };

        // EmailJS function call
        emailjs.send('service_dfiub5n', 'cs35of2', templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
               alert('Order successfully placed! Confirmation email sent.');
               orderForm.reset(); // Form clear karne ke liye
            }, function(error) {
               console.log('FAILED...', error);
               alert('Something went wrong, please try again.');
            });
    });
}