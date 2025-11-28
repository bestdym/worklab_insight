document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const desktopMenu = document.getElementById('desktopMenu');

    if (mobileMenuBtn && desktopMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            desktopMenu.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('nav-active'));
            this.classList.add('nav-active');
        });
    });

    let jobsData = [];

    const itemsPerPage = 9;
    let currentPage = 1;
    let filteredJobs = [...jobsData]; 

    function createPageBtn(text, onClick, isActive = false) {
        const btn = document.createElement('button');
        btn.innerHTML = text;
        btn.className = `w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
            isActive 
            ? 'bg-blue-600 text-white shadow-md scale-105' 
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-blue-300'
        }`;
        btn.addEventListener('click', onClick);
        return btn;
    }

    function changePage(page) {
        currentPage = page;
        renderDisplay();
        const listings = document.getElementById('jobListings');
        if (listings) {
            listings.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function renderDisplay() {
        const container = document.getElementById('jobListings');
        const pagination = document.getElementById('pagination');
        
        if (!container) return;
        container.innerHTML = '';
        if (pagination) pagination.innerHTML = '';

        if (filteredJobs.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500">Tidak ada lowongan yang sesuai.</div>`;
            return;
        }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = filteredJobs.slice(start, end);
        const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

        function getTypeClass(type) {
            const t = (type || '').toLowerCase();
            if (t === 'full-time') return 'full-time';
            if (t === 'magang' || t === 'intern') return 'magang';
            if (t === 'part-time') return 'part-time';
            if (t === 'contract' || t === 'kontak' || t === 'contact') return 'contract';
            if (t === 'remote') return 'remote';
            if (t === 'freelance') return 'freelance';
            if (t === 'commission') return 'commission';
            if (t === 'project') return 'project';
            if (t === 'partnership' || t === 'partner sip' || t === 'partnerships') return 'partnership';
            return 'part-time';
        }

        pageData.forEach((job, index) => {
            const card = document.createElement('div');
            card.className = 'job-card bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 relative group job-card-animate';
            card.style.animationDelay = `${index * 100}ms`;
            const typeClass = getTypeClass(job.type);

            card.innerHTML = `
                <div class="job-type-badge ${typeClass}">${job.type}</div>
                <div class="flex items-start mb-4 pr-16">
                    <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-blue-600 mr-3 text-sm">${job.logo}</div>
                    <div>
                        <h3 class="font-bold text-gray-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">${job.title}</h3>
                        <p class="text-sm text-gray-500 mt-1">${job.company}</p>
                    </div>
                </div>
                <div class="text-sm text-gray-500 space-y-2 mb-4">
                    <div class="flex items-center gap-2"><i class="fas fa-map-marker-alt w-4"></i> ${job.location}</div>
                    <div class="flex items-center gap-2"><i class="far fa-clock w-4"></i> ${job.posted}</div>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${job.skills.map(skill => `<span class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">${skill}</span>`).join('')}
                </div>
                <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span class="font-bold text-gray-800 text-sm">${job.salary}</span>
                    <div class="flex gap-2">
                        <button class="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition btn-detail flex items-center gap-2" data-id="${job.id}"><i class="fas fa-eye"></i> Lihat Detail</button>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition btn-apply flex items-center gap-2" data-id="${job.id}"><i class="fas fa-paper-plane"></i> Lamar</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
            const detailBtn = card.querySelector('.btn-detail');
            if(detailBtn) detailBtn.addEventListener('click', () => openModal(job));
            const applyBtn = card.querySelector('.btn-apply');
            if(applyBtn) applyBtn.addEventListener('click', () => openApply(job));
        });

        if (totalPages > 1 && pagination) {
            if(currentPage > 1) {
                const prevBtn = createPageBtn('<', () => changePage(currentPage - 1));
                pagination.appendChild(prevBtn);
            }

            for (let i = 1; i <= totalPages; i++) {
                const btn = createPageBtn(i, () => changePage(i), i === currentPage);
                pagination.appendChild(btn);
            }

            if(currentPage < totalPages) {
                const nextBtn = createPageBtn('>', () => changePage(currentPage + 1));
                pagination.appendChild(nextBtn);
            }
        }
    }

    const searchInput = document.getElementById('searchInput');
    const sectorFilter = document.getElementById('sectorFilter'); // Hidden Select
    const locationFilter = document.getElementById('locationFilter'); // Hidden Select
    const searchButton = document.getElementById('searchButton');

    function filterJobs() {
        const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const sector = sectorFilter ? sectorFilter.value : '';
        const loc = locationFilter ? locationFilter.value : '';

        filteredJobs = jobsData.filter(job => {
            const matchSearch = !term || job.title.toLowerCase().includes(term) || job.company.toLowerCase().includes(term);
            const matchLoc = !loc || job.location === loc;
            
            let matchSector = true;
            if (sector) {
                const keywords = {
                    'Teknologi Informasi': ['developer', 'react', 'node', 'ui', 'tech'],
                    'Jasa Keuangan': ['bank', 'finance', 'analyst'],
                    'Manufaktur': ['manufaktur', 'pabrik'],
                    'Pendidikan': ['guru', 'dosen'],
                    'Kesehatan': ['dokter', 'medis']
                };
                const content = (job.title + ' ' + job.company + ' ' + job.description).toLowerCase();
                const keys = keywords[sector] || [];
                matchSector = keys.some(k => content.includes(k));
            }
            return matchSearch && matchLoc && matchSector;
        });

        currentPage = 1; 
        renderDisplay();
    }

    if(searchInput) {
        searchInput.addEventListener('keyup', filterJobs);
        sectorFilter.addEventListener('change', filterJobs);
        locationFilter.addEventListener('change', filterJobs);
        searchButton.addEventListener('click', filterJobs);
    }

    function setupDropdown(btnId, listId, labelId, selectId) {
        const btn = document.getElementById(btnId);
        const list = document.getElementById(listId);
        const label = document.getElementById(labelId);
        const select = document.getElementById(selectId);
        if(!btn || !list) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('[id^="list"]').forEach(el => { if(el.id !== listId) el.classList.add('hidden'); });
            list.classList.toggle('hidden');
        });

        list.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                label.textContent = item.textContent;
                label.classList.add('text-gray-900', 'font-medium');
                select.value = item.getAttribute('data-value');
                select.dispatchEvent(new Event('change'));
                list.classList.add('hidden');
            });
        });
    }
    setupDropdown('btnSektor', 'listSektor', 'labelSektor', 'sectorFilter');
    setupDropdown('btnLokasi', 'listLokasi', 'labelLokasi', 'locationFilter');
    document.addEventListener('click', () => {
        document.querySelectorAll('[id^="list"]').forEach(el => el.classList.add('hidden'));
    });

    function openModal(job) {
        const modal = document.getElementById('jobDetailModal');
        const titleEl = document.getElementById('modalJobTitle');
        const logoEl = document.getElementById('modalCompanyLogo');
        const nameEl = document.getElementById('modalCompanyName');
        const locEl = document.querySelector('#modalLocation span');
        const typeEl = document.getElementById('modalJobType');
        const descEl = document.getElementById('modalDescription');
        const detEl = document.getElementById('modalDetails');
        const reqEl = document.getElementById('modalRequirements');
        if(!modal) return;
        if(titleEl) titleEl.textContent = job.title;
        if(logoEl) logoEl.textContent = job.logo || '';
        if(nameEl) nameEl.textContent = job.company || '';
        if(locEl) locEl.textContent = job.location || '';
        if(typeEl) {
            typeEl.textContent = job.type || '';
            typeEl.className = 'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ' + (job.type === 'Full-time' ? 'bg-blue-100 text-blue-700' : (job.type === 'Magang' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'));
        }
        if(descEl) descEl.textContent = job.description || '';
        if(detEl) detEl.textContent = job.details || '';
        if(reqEl) {
            reqEl.innerHTML = '';
            const reqs = Array.isArray(job.requirements) ? job.requirements : [];
            reqs.forEach(r => {
                const li = document.createElement('li');
                li.textContent = r;
                reqEl.appendChild(li);
            });
        }
        modal.classList.remove('hidden');
    }

    function openApply(job) {
        alert('Lamar ' + job.title);
    }

    const closeBtn = document.getElementById('closeModal');
    if(closeBtn) closeBtn.addEventListener('click', () => {
        const modal = document.getElementById('jobDetailModal');
        if(modal) modal.classList.add('hidden');
    });
    const modalOverlay = document.getElementById('jobDetailModal');
    if(modalOverlay) modalOverlay.addEventListener('click', (e) => {
        if(e.target.id === 'jobDetailModal') modalOverlay.classList.add('hidden');
    });

    async function loadJobs() {
        try {
            const res = await fetch('assete/data/jobs.json');
            const data = await res.json();
            jobsData = Array.isArray(data) ? data : [];
            filteredJobs = [...jobsData];
            renderDisplay();
        } catch (e) {
            filteredJobs = [];
            renderDisplay();
        }
    }
    loadJobs();

    const initAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('exit-up');
                } else {
                    if(entry.boundingClientRect.top > 0) entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.hero-text, .section-title, .stats-title, .stat-card, .news-card, .hero-images, .animate-fade-in-up, .job-card').forEach(el => observer.observe(el));
    };
    initAnimations();

    const initNewsLogic = () => {
        const slider = document.getElementById('newsSlider');
        const cards = slider ? slider.querySelectorAll('.news-card') : [];

        if (slider && cards.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const el = entry.target;
                    if (entry.isIntersecting) {
                        el.classList.add('visible');
                        setTimeout(() => { if(el.classList.contains('visible')) el.style.transitionDelay = '0s'; }, 1200);
                    } else {
                        if (entry.boundingClientRect.top > 0) {
                            el.classList.remove('visible');
                            el.style.transitionDelay = el.dataset.delay;
                        }
                    }
                });
            }, { threshold: 0.15 });

            cards.forEach((el, index) => {
                let delayTime = (index < 3) ? index * 200 : 100;
                el.dataset.delay = `${delayTime}ms`;
                el.style.transitionDelay = `${delayTime}ms`;
                observer.observe(el);
            });

            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const dotsContainer = document.getElementById('sliderDots');
            
            const moveSlider = (direction) => {
                const cardWidth = cards[0].offsetWidth + 25;
                if (direction === 'left') slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                else slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            };

            if(prevBtn) prevBtn.addEventListener('click', () => moveSlider('left'));
            if(nextBtn) nextBtn.addEventListener('click', () => moveSlider('right'));

            const cardsPerView = 3; 
            const totalDots = Math.max(0, cards.length - (cardsPerView - 1));
            
            if(dotsContainer) {
                for (let i = 0; i < totalDots; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dotsContainer.appendChild(dot);
                }
                const dots = document.querySelectorAll('.dot');
                slider.addEventListener('scroll', () => {
                    const cardWidth = cards[0].offsetWidth + 25;
                    const scrollIndex = Math.round(slider.scrollLeft / cardWidth);
                    dots.forEach(d => d.classList.remove('active'));
                    if(dots[scrollIndex]) dots[scrollIndex].classList.add('active');
                });
            }
        }
    };
    initNewsLogic();
});


// ==========================================
    // 7. DARK MODE LOGIC
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Cek Local Storage (Apakah user pernah pilih dark mode?)
    const currentTheme = localStorage.getItem('theme');
    
    // Fungsi Update Icon
    const updateIcon = (isDark) => {
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); // Ganti jadi matahari
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); // Ganti jadi bulan
        }
    };

    // Terapkan tema saat load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    // Event Listener Klik Tombol
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Cek apakah sekarang dark mode
            const isDark = body.classList.contains('dark-mode');
            
            // Update Icon
            updateIcon(isDark);

            // Simpan ke Local Storage
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }