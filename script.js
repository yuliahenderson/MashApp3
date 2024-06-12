// Function to detect if the device is desktop
function isDesktop() {
    return window.matchMedia("(min-width: 993px)").matches;
}

// Ensure the code runs only when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    if (isDesktop()) {
        console.log("Running desktop-specific scripts...");

        // Desktop-specific JavaScript functions

        // Slider functionality
        function desktopSliderFunction() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const containerHeight = document.querySelector('.container-phone').offsetHeight;
            let index = 0;

            // Set the height of each slide to match its image's height
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                img.onload = function() {
                    slide.style.height = img.offsetHeight + 'px';
                }
                if (img.complete) { // Ensure height is set if image is already loaded
                    img.onload();
                }
            });

            function nextSlide() {
                index++;
                if (index === slides.length) {
                    index = 0;
                }
                slider.style.transform = `translateY(-${slides[index].offsetTop}px)`;
            }

            setInterval(nextSlide, 5000);
        }

function desktopFixedHeaderFunction() {
    var header = document.getElementById('fixedHeader');
    var mlogo = document.getElementById('mlogo');
    var button = document.getElementById('scrollButton');
    var nav = document.querySelector('nav');
    var logo = document.getElementById('logo');

    // Store the original logo source
    var originalLogoSrc = mlogo.src;

    function isScrollSnappedToPage2() {
        var page2 = document.getElementById('page2');
        if (page2) {
            var rect = page2.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight && Math.abs(rect.top) % window.innerHeight === 0;
        }
        return false;
    }

    function changeColorsAndLogo() {
        if (isScrollSnappedToPage2()) {
            // Change colors and logo when scroll-snapped to page2
            header.style.backgroundColor = '#ffffff';
            button.style.color = '#ffffff';
            button.style.backgroundColor = '#000000';
            mlogo.src = 'Images/logo_black.png';
            mlogo.style = 'width="45px" height="36px';
            nav.style.display = 'block';
            logo.style.display = 'none';
        } else {
            // Revert colors and logo when not scroll-snapped to page2
            header.style.backgroundColor = 'transparent';
            button.style.color = '#000000';
            button.style.backgroundColor = '#ffffff';
            mlogo.src = originalLogoSrc;
            // nav.style.display = 'none';
            logo.style.display = 'block';
        }
    }

    // Call the function to set initial state based on page load position
    changeColorsAndLogo();

    // Attach scroll event listener to the window
    window.addEventListener('scroll', changeColorsAndLogo);
}




        // Function to initialize all desktop-specific functionality
        function initializeDesktopFunctions() {
            desktopSliderFunction();
            desktopFixedHeaderFunction();
            // Call other desktop-specific functions here
        }

        // Initialize all desktop functions
        initializeDesktopFunctions();
    }
});



// Function to detect if the device is mobile
function isMobile() {
    return window.matchMedia("(max-width: 993px)").matches;
}

// Ensure the code runs only when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    if (isMobile()) {
        console.log("Running mobile-specific scripts...");

        // Mobile-specific JavaScript functions

        // Slider functionality
function mobileSliderFunction() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let index = 0;

    // Function to handle image load event
    function handleImageLoad() {
        const slideHeight = this.offsetHeight; // Get the height of the loaded image
        nextSlide(slideHeight); // Call nextSlide function with the slideHeight
    }

    // Attach load event listener to each image
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        img.addEventListener('load', handleImageLoad);
    });

    // Function to transition to the next slide
    function nextSlide(slideHeight) {
        index++;
        if (index === slides.length) {
            index = 0;
        }
        const translateY = -index * slideHeight + 'px';
        slider.style.transform = `translateY(${translateY})`;
    }

    setInterval(() => {
        // Start the slideshow once all images are loaded
        const allImagesLoaded = Array.from(slides).every(slide => slide.querySelector('img').complete);
        if (allImagesLoaded) {
            const slideHeight = slides[0].querySelector('img').offsetHeight;
            nextSlide(slideHeight);
        }
    }, 5000);
}

// Call the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', mobileSliderFunction);

        // Fixed header change on scroll
        function mobileFixedHeaderFunction() {

            var header = document.getElementById('fixedHeader');
            var mlogo = document.querySelector('.mobile-only #mlogo');
            var button = document.querySelector('.mobile-only #scrollButton');
            var nav = document.querySelector('.mobile-only nav');
            var logo = document.querySelector('.mobile-only #logo');

            // Store the original logo source
            var originalLogoSrc = mlogo.src;

            function isScrolled5PercentOfPage1() {
                var page1 = document.getElementById('page1');
                if (page1) {
                    var scrollTop = window.scrollY || window.pageYOffset;
                    var scrollThreshold = page1.offsetHeight * 0.10; // 10% of page1 height
                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 1 element not found.');
                    return false;
                }
            }

            function changeColorsAndLogo() {
                if (isScrolled5PercentOfPage1()) {
                    console.log('Scrolled 5% of Page 1 - changing colors and logo');
                    // Change colors and logo when scrolled 5% of page1
                    header.style.backgroundColor = '#ffffff';
                    button.style.color = '#ffffff';
                    button.style.backgroundColor = '#000000';
                    mlogo.src = 'Images/logo_black.png';
                    mlogo.style = 'width="45px" height="36px';
                    nav.style.display = 'block';
                    logo.style.display = 'none';
                } else {
                    console.log('Not scrolled 5% of Page 1 - reverting colors and logo');
                    // Revert colors and logo when not scrolled 5% of page1
                    header.style.backgroundColor = 'transparent';
                    button.style.color = '#000000';
                    button.style.backgroundColor = '#ffffff';
                    mlogo.src = originalLogoSrc;
                    nav.style.display = 'none';
                    logo.style.display = 'block';
                }
            }

            // Call the function to set initial state based on page load position
            changeColorsAndLogo();

            // Attach scroll event listener to the window
            window.addEventListener('scroll', changeColorsAndLogo);
        }

        // Theme color meta tag change
        function mobileThemeColorMetaFunction() {
            var themeColorMeta = document.getElementById('theme-color-meta');

            function isScrolledTo95PercentOfPage2() {
                var page2 = document.getElementById('page2');
                if (page2) {
                    var page2Height = page2.offsetHeight;
                    var page2Top = page2.offsetTop;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var scrollThreshold = page2Top + (page2Height * 0.95); // 95% of page2 height

                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 2 element not found.');
                    return false;
                }
            }

            function isScrolledTo25PercentOfPage3() {
                var page3 = document.getElementById('page3');
                if (page3) {
                    var page3Top = page3.offsetTop;
                    var page3Height = page3.offsetHeight;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var scrollThreshold = page3Top + (page3Height * 0.25); // 25% of page3 height

                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 3 element not found.');
                    return false;
                }
            }

            function isScrolledTo95PercentOfPage8() {
                var page8 = document.getElementById('page8');
                if (page8) {
                    var page8Height = page8.offsetHeight;
                    var page8Top = page8.offsetTop;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var scrollThreshold = page8Top + (page8Height * 0.95); // 95% of page8 height

                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 8 element not found.');
                    return false;
                }
            }

            function isScrolledTo95PercentOfPage9() {
                var page9 = document.getElementById('page9');
                if (page9) {
                    var page9Top = page9.offsetTop;
                    var page9Height = page9.offsetHeight;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var scrollThreshold = page9Top + (page9Height * 0.95); // 95% of page9 height

                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 9 element not found.');
                    return false;
                }
            }

            function handleScroll() {
                var scrolledTo95PercentOfPage2 = isScrolledTo95PercentOfPage2();
                var scrolledTo25PercentOfPage3 = isScrolledTo25PercentOfPage3();
                var scrolledTo95PercentOfPage8 = isScrolledTo95PercentOfPage8();
                var scrolledTo95PercentOfPage9 = isScrolledTo95PercentOfPage9();

                if (scrolledTo95PercentOfPage2 && !scrolledTo25PercentOfPage3) {
                    console.log('Scrolled to 95% of Page 2 and not 25% of Page 3 - changing meta color to green');
                    // Change meta tag color to green when scrolled to 95% of page2 and not scrolled to 25% of page3
                    themeColorMeta.setAttribute('content', '#38FF27');
                } else if (scrolledTo95PercentOfPage8 && !scrolledTo95PercentOfPage9) {
                    console.log('Scrolled to 95% of Page 8 and not 95% of Page 9 - changing meta color to grey');
                    // Change meta tag color to grey when scrolled to 95% of page8 and not scrolled to 95% of page9
                    themeColorMeta.setAttribute('content', '#f4f4f4');
                } else {
                    console.log('Resetting meta color to white');
                    // Reset meta tag color to white if none of the above conditions are met
                    themeColorMeta.setAttribute('content', '#ffffff');
                }
            }

            // Initial call to handleScroll() to set initial state based on page load position
            handleScroll();

            // Attach scroll event listener to the window
            window.addEventListener('scroll', handleScroll);
        }

        // Fixed header color change to green on page 3
        function mobileFixedHeaderGreenFunction() {
            var header = document.getElementById('fixedHeader');

            function isScrolledTo90PercentOfPage2() {
                var page2 = document.getElementById('page2');
                if (page2) {
                    var page2Height = page2.offsetHeight;
                    var page2Top = page2.offsetTop;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var scrollThreshold = page2Top + (page2Height * 0.95); // 95% of page2 height

                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 2 element not found.');
                    return false;
                }
            }

            function isScrolledTo25PercentOfPage3() {
                var page3 = document.getElementById('page3');
                if (page3) {
                    var page3Top = page3.offsetTop;
                    var page3Height = page3.offsetHeight;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var scrollThreshold = page3Top + (page3Height * 0.25); // 25% of page3 height

                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 3 element not found.');
                    return false;
                }
            }

            function handleScroll() {
                var scrolledTo90PercentOfPage2 = isScrolledTo90PercentOfPage2();
                var scrolledTo25PercentOfPage3 = isScrolledTo25PercentOfPage3();

                if (scrolledTo90PercentOfPage2 && !scrolledTo25PercentOfPage3) {
                    console.log('Scrolled to 95% of Page 2 and not 25% of Page 3 - changing header color to green');
                    // Change header color to green if scrolled to 95% of page2 and not scrolled to 25% of page3
                    header.style.backgroundColor = '#38FF27';
                }
            }

            // Initial call to handleScroll() to set initial state based on page load position
            handleScroll();

            // Attach scroll event listener to the window
            window.addEventListener('scroll', handleScroll);
        }

// Function to initialize the slider
function initializeSlider() {
  const slides = document.querySelectorAll('.slide4');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.classList.remove('inactive');
      } else {
        slide.classList.remove('active');
        slide.classList.add('inactive');
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Initial setup
  showSlide(currentIndex);

  // Start the loop
  setInterval(nextSlide, 9000); // Change image every 9 seconds
}

// Listen for the scroll event
window.addEventListener('scroll', () => {
  // Get the distance between the top of the page and the top of the "page4" section
  const page4Top = document.querySelector('.slider-page4').offsetTop;

  // Check if the user has scrolled to the "page4" section
  if (window.scrollY >= page4Top - window.innerHeight / 2) {
    // Execute initializeSlider function when scrolled to "page4"
    initializeSlider();

    // Remove the scroll event listener to prevent multiple executions
    window.removeEventListener('scroll', initializeSlider);
  }
});


        // Fixed header color change to grey on page 9
        function mobileFixedHeaderGreyFunction() {
            var header = document.getElementById('fixedHeader');

            function isScrolledTo95PercentOfPage8() {
                var page8 = document.getElementById('page8');
                if (page8) {
                    var page8Height = page8.offsetHeight;
                    var page8Top = page8.offsetTop;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var scrollThreshold = page8Top + (page8Height * 0.95); // 95% of page8 height

                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 8 element not found.');
                    return false;
                }
            }

            function isScrolledTo95PercentOfPage9() {
                var page9 = document.getElementById('page9');
                if (page9) {
                    var page9Top = page9.offsetTop;
                    var page9Height = page9.offsetHeight;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var scrollThreshold = page9Top + (page9Height * 0.95); // 95% of page9 height

                    return scrollTop >= scrollThreshold;
                } else {
                    console.error('Page 9 element not found.');
                    return false;
                }
            }

            function handleScroll() {
                var scrolledTo95PercentOfPage8 = isScrolledTo95PercentOfPage8();
                var scrolledTo95PercentOfPage9 = isScrolledTo95PercentOfPage9();

                if (scrolledTo95PercentOfPage8 && !scrolledTo95PercentOfPage9) {
                    console.log('Scrolled to 95% of Page 8 and not 95% of Page 9 - changing header color to grey');
                    // Change header color to grey if scrolled to 95% of page8 and not scrolled to 95% of page9
                    header.style.backgroundColor = '#f4f4f4';
                }
            }

            // Initial call to handleScroll() to set initial state based on page load position
            handleScroll();

            // Attach scroll event listener to the window
            window.addEventListener('scroll', handleScroll);
        }

        // Function to initialize all mobile-specific functionality
        function initializeMobileFunctions() {
            mobileSliderFunction();
            mobileFixedHeaderFunction();
            mobileThemeColorMetaFunction();
            mobileFixedHeaderGreenFunction();
            mobileFixedHeaderGreyFunction();
            // Call other mobile-specific functions here
        }

        // Initialize all mobile functions
        initializeMobileFunctions();
    }
});




