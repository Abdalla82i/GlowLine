function validateForm() {
    var usernameInput = document.getElementById('username');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var confirmInput = document.getElementById('confirm');

    var usernameValue = usernameInput.value.trim();
    var emailValue = emailInput.value.trim();
    var passwordValue = passwordInput.value.trim();
    var confirmValue = confirmInput.value.trim();
    var isValid = true;

    if (usernameValue === '' || usernameValue.length <= 3) {
        setError('usernameError', 'Username must be more than 3 characters');
        isValid = false;
    } else {
        setSuccess('usernameError');
    }

    if (emailValue === '') {
        setError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError('emailError', 'Email is not valid');
        isValid = false;
    } else {
        setSuccess('emailError');
    }

    if (passwordValue === '' || !/^[A-Z]/.test(passwordValue) || passwordValue.length <= 8) {
        setError('passwordError', 'Password must start with a capital letter and be more than 8 characters');
        isValid = false;
    } else {
        setSuccess('passwordError');
    }

    if (confirmValue === '') {
        setError('confirmError', 'Please confirm password');
        isValid = false;
    } else if (confirmValue !== passwordValue) {
        setError('confirmError', 'Passwords do not match');
        isValid = false;
    } else {
        setSuccess('confirmError');
    }

    if (isValid) {
        setCookie('username', usernameValue, 7); 
    }

    return isValid;
}

function setError(id, message) {
    var errorElement = document.getElementById(id);
    var inputControl = errorElement.previousElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(id) {
    var errorElement = document.getElementById(id);
    var inputControl = errorElement.previousElementSibling;
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

///////////////////////////////////////////////////////

// Cookie handling functions
function setCookie(name, value, days) { //it take 3 param name,value , expirationday
    var expires = ""; //will have the value of expirationdate
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();// current time 
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";//set cookie by concatenating the name,value or an empty string if value is falsy th
 
}

function getCookie(name) { //getcookie that take param = name
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];//assign in c
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function displayUsername() {
    var username = getCookie('username');
    if (username) {
        document.getElementById('displayUsername').innerHTML = '<a href="/index.html">Welcome! ' + username + '</a>';
    } else {
        document.getElementById('displayUsername').innerHTML = '<a href="/index.html">Login</a>';
    }
}
window.onload = function() {//display username when i refresh the page if it exist
    displayUsername();
};

////////////////////////////////////////////////////////////////////////////
//slider//        
var currentIndex = 0;
        var slides = document.querySelectorAll('.slides img');
        var totalSlides = slides.length;
        function showSlide(index) {
            var slidesContainer = document.querySelector('.slides');
            slidesContainer.style.transition = 'transform 1s ease';
            slidesContainer.style.transform = `translateX(${-index * 100}%)`; //to make my slide move horizontaly
        }
       function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }
        setInterval(nextSlide, 2000); //move to next slide after 2sec
        showSlide(currentIndex);     
        var scrollButton = document.getElementById("scrollBtn");
        window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
};
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
}
