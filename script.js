window.onload = function() {
    // Intro animation delay of 3 seconds before hiding intro and showing main content
    setTimeout(function() {
        // Shrink green page before hiding it
        document.querySelector('.intro').style.animation = 'fadeOut 1s forwards';

        // After the green page fades out, show the main content
        setTimeout(function() {
            const mainPage = document.querySelector('.page1');
            mainPage.classList.remove('hidden'); // Show main content
        }, 1000); // Allow time for fade-out
    }, 3000); // Transition after 3 seconds
};

document.addEventListener("DOMContentLoaded", function () {
  let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
  };

  let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Check if the entry is a card title for counter animation
              if (entry.target.classList.contains('card-title1')) {
                  startCounter(entry.target, 8);  // Experience
              } else if (entry.target.classList.contains('card-title2')) {
                  startCounter(entry.target, 82); // Customer Satisfaction
              } else if (entry.target.classList.contains('card-title3')) {
                  startCounter(entry.target, 35); // Projects Complete
              } else if (entry.target.classList.contains('card-title4')) {
                  startCounter(entry.target, 100); // Service Guarantee
              }

              // Trigger box animation
              if (entry.target.classList.contains('box')) {
                  entry.target.classList.add('visible'); // Add visible class for animation
              }

              observer.unobserve(entry.target); // Stop observing after the animation starts
          }
      });
  }, options);

  // Observe card titles for counter animation
  document.querySelectorAll('.card-title1, .card-title2, .card-title3, .card-title4').forEach(title => {
      observer.observe(title);
  });

  // Observe boxes for sliding up animation
  document.querySelectorAll('.box').forEach(box => {
      box.classList.add('hidden'); // Initially hidden
      observer.observe(box); // Observe each box for slide-up animation
  });
});

// Function to start the counter animation
function startCounter(element, target) {
  let count = 0;
  let increment = target / 30; // Increment in small steps for smooth animation
  let interval = setInterval(() => {
      count += increment;
      if (count >= target) {
          element.textContent = Math.ceil(target);
          clearInterval(interval);
      } else {
          element.textContent = Math.ceil(count);
      }
  }, 50); // Update every 50ms for smooth animation
}

document.querySelectorAll('.questionsbox').forEach(box => {
  box.addEventListener('click', function() {
      // Toggle active class on click
      this.classList.toggle('active');
  });
});

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

cards.forEach(card => {
    observer.observe(card);
});

let scrollInterval;
const gallery = document.querySelector('.gallery');
const scrollAmount = 320; // Adjust this value based on your card width + margin

function startScrolling() {
    scrollInterval = setInterval(() => {
        gallery.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
            gallery.scrollLeft = 0; // Reset to start
        }
    }, 2500); // Change the interval time as needed
}

function pauseScrolling() {
    clearInterval(scrollInterval);
}

gallery.addEventListener('mouseover', pauseScrolling);
gallery.addEventListener('mouseout', startScrolling);

// Start scrolling on page load
startScrolling();

