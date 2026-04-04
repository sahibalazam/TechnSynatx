function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');
  if (!hamburger || !navList) return;

  hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    if (navList.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

const searchDB = [
  { title: "Escaping Tutorial Hell", url: "pages/blogs.html", cat: "Blog", tags: "tutorial practical code beginner" },
  { title: "Scalable Node.js APIs", url: "pages/blogs.html", cat: "Blog", tags: "node backend api architecture" },
  { title: "Web Development Services", url: "pages/services.html", cat: "Service", tags: "web dev website hire frontend" },
  { title: "Academy Courses", url: "pages/academy.html", cat: "Academy", tags: "learn course mentor class" }
];

function initSearch(basePath) {
  const btnOpen = document.getElementById('search-toggle-btn');
  const btnClose = document.getElementById('search-close-btn');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const resultsBox = document.getElementById('search-results');

  if (!btnOpen || !overlay) return;

  const closeSearch = () => {
    overlay.classList.remove('active');
    input.value = '';
    resultsBox.innerHTML = '';
    document.body.style.overflow = '';
  };

  btnOpen.addEventListener('click', () => {
    overlay.classList.add('active');
    setTimeout(() => input.focus(), 100);
    document.body.style.overflow = 'hidden';
  });

  btnClose.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeSearch());

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    resultsBox.innerHTML = '';
    if (!query) return;

    const matches = searchDB.filter(i => 
      i.title.toLowerCase().includes(query) || i.tags.includes(query) || i.cat.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      matches.forEach(item => {
        resultsBox.innerHTML += `<li><a href="${basePath}${item.url}">
          <strong style="color:var(--primary)">${item.title}</strong>
          <span style="font-size:0.8rem;color:var(--accent)">${item.cat}</span>
        </a></li>`;
      });
      resultsBox.querySelectorAll('a').forEach(a => a.addEventListener('click', closeSearch));
    } else {
      resultsBox.innerHTML = `<li style="padding:1rem;color:var(--text-light);text-align:center;">No results found.</li>`;
    }
  });
}