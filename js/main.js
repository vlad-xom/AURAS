  const starsContainers = document.querySelectorAll('.stars');

  starsContainers.forEach(container => {
    const rating = Math.floor(parseFloat(container.dataset.rating)); // округляємо вниз до цілої
    const stars = container.querySelectorAll('.star');

    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('filled');
      } else {
        star.classList.remove('filled');
      }
    });
  });


const dropdownBtn = document.getElementById('phoneDropdownBtn');
const phoneDropdown = document.getElementById('phoneDropdown');

dropdownBtn.addEventListener('click', () => {
    const isVisible = phoneDropdown.style.display === 'block';
    phoneDropdown.style.display = isVisible ? 'none' : 'block';
    dropdownBtn.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
});

// Закриття при кліку поза дропдауном
document.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target) && !phoneDropdown.contains(e.target)) {
        phoneDropdown.style.display = 'none';
        dropdownBtn.style.transform = 'rotate(0deg)';
    }
});



const langBlock = document.querySelector('.language');
const langBtn = document.getElementById('langBtn');
const langCode = document.querySelector('.language-code');
const langFlag = document.querySelector('.language-flag');

langBtn.addEventListener('click', () => {
  langBlock.classList.toggle('active');
});

// Закриття при кліку поза меню
document.addEventListener('click', (e) => {
  if (!langBlock.contains(e.target)) {
    langBlock.classList.remove('active');
  }
});

// Зміна мови
document.querySelectorAll('.language-list li').forEach(item => {
  item.addEventListener('click', () => {
    langCode.textContent = item.dataset.lang;
    langFlag.src = item.querySelector('img').src;
    langBlock.classList.remove('active');
  });
});
//Latest Publications by Category:
document.addEventListener("DOMContentLoaded", function() {

    const buttons = document.querySelectorAll('.gallery-button__item');
    const gallery = document.querySelector('.gallery-info');
    const categoryName = document.querySelector('.category-name');

    const data = {
        destinations: [
            { 
                img: "img/gallery-1.svg",
                button: { text: "Destinations", url: "#" },
                title: "Top destinations in 2025",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean rutrum elit dolor"
            },
            { 
                img: "img/gallery-2.svg",
                button: { text: "Water Activities", url: "#" },
                title: "The best museums in Paris",
                text: "Lorem ipsum dolor sit amet, consectetur..."
            },
            { 
                img: "img/gallery-3.svg",
                button: { text: "Winter Activities", url: "#" },
                title: "Horse Riders Insurance",
                text: "Lorem ipsum dolor sit amet, consectetur..."
            }
        ],
        water: [
            { img: "img/gallery-2.svg", button: { text: "Water Activities", url: "#" }, title: "The best museums in Paris", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean rutrum elit dolor" },
            { img: "img/gallery-3.svg", button: { text: "Winter Activities", url: "#" }, title: "Horse Riders Insurance", text: "Lorem ipsum dolor sit amet, consectetur..." },
            { img: "img/gallery-1.svg", button: { text: "Destinations", url: "#" }, title: "Top destinations in 2025", text: "Lorem ipsum dolor sit amet, consectetur..." }
        ],
        winter: [
            { img: "img/gallery-3.svg", button: { text: "Winter Activities", url: "#" }, title: "Horse Riders Insurance", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean rutrum elit dolor" },
            { img: "img/gallery-2.svg", button: { text: "Water Activities", url: "#" }, title: "Horse Riders Insurance", text: "Lorem ipsum dolor sit amet, consectetur..." },
            { img: "img/gallery-1.svg", button: { text: "Destinations", url: "#" }, title: "Top destinations in 2025", text: "Lorem ipsum dolor sit amet, consectetur..." }
        ],
        hiking: [], extreme: [], sports: []
    };

    function renderCategory(category) {
        gallery.innerHTML = "";

        if (!data[category] || data[category].length === 0) return;

        data[category].forEach((item, index) => {
            if (!item.img) return;

            const card = document.createElement("div");
            card.classList.add("gallery-card");
            if (index === 0) card.classList.add("gallery-card--large");

            card.innerHTML = `
                <img src="${item.img}" alt="">
                <div class="gallery-card__overlay">
                    ${item.button ? `<a href="${item.button.url}" class="gallery-card__button">${item.button.text}</a>` : ''}
                    ${item.title ? `<h4 class="gallery-card__title">${item.title}</h4>` : ''}
                    ${item.text ? `<p class="gallery-card__text">${item.text}</p>` : ''}
                </div>
            `;

            gallery.appendChild(card);
        });
    }

    buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            if (idx > 2) return;

            buttons.forEach(b => b.classList.remove('gallery-button__item--active'));
            btn.classList.add('gallery-button__item--active');

            categoryName.textContent = `by ${btn.textContent}`;
            renderCategory(btn.dataset.category);
        });
    });

    categoryName.textContent = `by Destinations`;
    renderCategory("destinations");
});
//All articles
document.querySelectorAll('.custom-select').forEach(select => {
  const buttonText = select.querySelector('.custom-select__text');
  const button = select.querySelector('.custom-select__button');
  const options = select.querySelector('.custom-select__options');
  const placeholder = select.dataset.placeholder;

  button.addEventListener('click', () => {
    // перемикання видимості списку
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });

  options.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      // просто змінюємо текст кнопки на вибране
      buttonText.textContent = option.textContent;
      options.style.display = 'none';
    });
  });

  // закриваємо список при кліку поза селектом
  document.addEventListener('click', e => {
    if (!select.contains(e.target)) {
      options.style.display = 'none';
    }
  });
});
/////////////
[
  {
    id: 1,
    title: "New Terms for Sailing Insurance",
    description: "Lorem ipsum...",
    image: "img/article1.jpg",
    category: "insurance",
    readTime: 4,
    views: 245,
    likes: 97,
    createdAt: "2025-07-14"
  }
]
const container = document.getElementById("articlesContainer");
const loadMoreBtn = document.getElementById("loadMore");

let page = 1;
let articles = []; // тут буде API

async function fetchArticles() {
  // замість цього буде fetch("/api/articles?page=" + page)
  const response = await fetch("data.json");
  articles = await response.json();
  renderArticles(articles);
}

function renderArticles(data) {
  container.innerHTML = "";

  data.forEach(article => {
    container.innerHTML += `
      <div class="article-card">
        <div class="article-card__image">
          <img src="${article.image}" alt="">
          <div class="article-card__stats">
            <span>👁 ${article.views}</span>
            <span>❤ ${article.likes}</span>
          </div>
        </div>

        <div class="article-card__content">
          <div class="article-card__meta">
            ${formatDate(article.createdAt)} • ${article.readTime} min
          </div>

          <h3 class="article-card__title">
            ${article.title}
          </h3>

          <p class="article-card__desc">
            ${article.description}
          </p>

          <a href="/article/${article.id}" class="article-card__link">
            Read more →
          </a>
        </div>
      </div>
    `;
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB");
}

loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchArticles();
});

fetchArticles();
/////////////

//////////////////////////////////////////////////////
document.querySelectorAll('.has-dropdown').forEach(item => {
  item.querySelector('.footer__head').addEventListener('click', () => {

    document.querySelectorAll('.has-dropdown').forEach(el => {
      if (el !== item) el.classList.remove('active');
    });

    item.classList.toggle('active');
  });
});
///////////////////////////////
  // Цей код спрацює 100%, бо він прямо в HTML