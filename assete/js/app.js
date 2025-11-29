document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const desktopMenu = document.getElementById('desktopMenu');
    const mobileDropdown = document.getElementById('mobileDropdown');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileDropdown) {
                mobileDropdown.classList.toggle('hidden');
            } else if (desktopMenu) {
                desktopMenu.classList.toggle('hidden');
            }
        });
    }

    
    const currentFile = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach((link) => {
        const href = link.getAttribute('href') || '';
        const file = href.split('/').pop();
        if (file === currentFile) {
            link.classList.add('nav-active');
        } else {
            link.classList.remove('nav-active');
        }
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('nav-active'));
            this.classList.add('nav-active');
        });
    });
    
    let jobsData = [];
    let selectedJob = null;

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
                    <div class="flex items-center gap-2"><i class="fa-solid fa-map-marker-alt w-4"></i> ${job.location}</div>
                    <div class="flex items-center gap-2"><i class="fa-regular fa-clock w-4"></i> ${job.posted}</div>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${job.skills.map(skill => `<span class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">${skill}</span>`).join('')}
                </div>
                <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span class="font-bold text-gray-800 text-sm">${job.salary}</span>
                    <div class="flex gap-2">
                        <button class="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition btn-detail flex items-center gap-2" data-id="${job.id}"><i class="fa-solid fa-eye"></i> Lihat Detail</button>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition btn-apply flex items-center gap-2" data-id="${job.id}"><i class="fa-solid fa-paper-plane"></i> Lamar</button>
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
    const sectorFilter = document.getElementById('sectorFilter'); 
    const locationFilter = document.getElementById('locationFilter'); 
    const searchButton = document.getElementById('searchButton');

    function filterJobs() {
        const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const sector = sectorFilter ? sectorFilter.value : '';
        const loc = locationFilter ? locationFilter.value : '';

        const keywordMap = {
            'Digital & TIK': ['developer','react','node','ui','ux','tech','software','ict','it','golang','swift','network','security','seo','content','designer','game'],
            'Manufaktur': ['manufaktur','pabrik','teknisi','produksi','otomotif','mesin','maintenance'],
            'Keuangan': ['bank','finance','fintech','akuntansi','accounting','tax','pajak','analyst','kredit'],
            'Ritel': ['retail','ritel','kasir','supermarket','toko','e-commerce','kurir','barista','resepsionis','customer service','logistik'],
            'Pertanian': ['pertanian','agri','agriculture','pangan','perkebunan','ternak'],
            'Pertambangan': ['tambang','mining','batubara','miner','smelter']
        };

        filteredJobs = jobsData.filter(job => {
            const matchSearch = !term || job.title.toLowerCase().includes(term) || job.company.toLowerCase().includes(term);
            const matchLoc = !loc || job.location === loc;

            let matchSector = true;
            if (sector) {
                if (job.sector) {
                    matchSector = job.sector === sector;
                } else {
                    const content = (job.title + ' ' + job.company + ' ' + job.description).toLowerCase();
                    const keys = keywordMap[sector] || [];
                    matchSector = keys.some(k => content.includes(k));
                }
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
        if (mobileDropdown && !mobileDropdown.classList.contains('hidden')) mobileDropdown.classList.add('hidden');
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
        const benEl = document.getElementById('modalBenefits');
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
        if(benEl) {
            benEl.innerHTML = '';
            const defaultBenefits = [
                'Pengalaman industri nyata',
                'Mentoring profesional',
                'Jaringan dan relasi kerja',
                'Peningkatan soft skills',
                'Kesempatan sertifikasi',
                'Potensi karier jangka panjang'
            ];
            const bens = Array.isArray(job.benefits) ? job.benefits : defaultBenefits;
            bens.forEach(b => {
                const li = document.createElement('li');
                li.textContent = b;
                benEl.appendChild(li);
            });
        }
        selectedJob = job;
        modal.classList.remove('hidden');
    }

    function openApply(job) {
        const applyModal = document.getElementById('applyModal');
        const title = document.getElementById('applyModalTitle');
        if(title) title.textContent = `Form Lamaran - ${job?.title || ''}`;
        if(applyModal) applyModal.classList.remove('hidden');
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

    const modalApplyBtn = document.getElementById('modalApplyButton');
    if(modalApplyBtn) modalApplyBtn.addEventListener('click', () => {
        if(selectedJob) openApply(selectedJob);
    });

    const detailBackBtn = document.getElementById('detailBackBtn');
    if(detailBackBtn) detailBackBtn.addEventListener('click', () => {
        const modal = document.getElementById('jobDetailModal');
        if(modal) modal.classList.add('hidden');
    });

    const detailBackBottomBtn = document.getElementById('detailBackBottomBtn');
    if(detailBackBottomBtn) detailBackBottomBtn.addEventListener('click', () => {
        const modal = document.getElementById('jobDetailModal');
        if(modal) modal.classList.add('hidden');
    });

    const closeApply = document.getElementById('closeApplyModal');
    if(closeApply) closeApply.addEventListener('click', () => {
        const m = document.getElementById('applyModal');
        if(m) m.classList.add('hidden');
    });
    const applyCancelBtn = document.getElementById('applyCancelBtn');
    if(applyCancelBtn) applyCancelBtn.addEventListener('click', () => {
        const m = document.getElementById('applyModal');
        if(m) m.classList.add('hidden');
    });
    const applySendBtn = document.getElementById('applySendBtn');
    if(applySendBtn) applySendBtn.addEventListener('click', () => {
        const name = document.getElementById('applyName')?.value.trim();
        const wa = document.getElementById('applyWhatsapp')?.value.trim();
        const email = document.getElementById('applyEmail')?.value.trim();
        const address = document.getElementById('applyAddress')?.value.trim();
        if(!name || !wa || !email || !address) {
            alert('Mohon lengkapi Nama, WhatsApp, Email, dan Alamat.');
            return;
        }
        alert('Lamaran terkirim. Terima kasih!');
        const m = document.getElementById('applyModal');
        if(m) m.classList.add('hidden');
    });
    const applyOverlay = document.getElementById('applyModal');
    if(applyOverlay) applyOverlay.addEventListener('click', (e) => {
        if(e.target.id === 'applyModal') applyOverlay.classList.add('hidden');
    });

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


    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    
    const updateIcon = (isDark) => {
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); 
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); 
        }
    };

    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            
            const isDark = body.classList.contains('dark-mode');
            
            
            updateIcon(isDark);

            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    document.addEventListener("DOMContentLoaded", () => {

    
    const fullRegionalData = [
        { region: "DKI Jakarta", umr: "Rp 5.067.381", unemp: "6.5%", sector: "Jasa & Keuangan", color: "purple", status: "Tumbuh", statusColor: "green" },
        { region: "Jawa Barat", umr: "Rp 2.057.495", unemp: "7.8%", sector: "Manufaktur", color: "blue", status: "Stabil", statusColor: "yellow" },
        { region: "Jawa Tengah", umr: "Rp 2.043.992", unemp: "5.1%", sector: "Pertanian & Industri", color: "orange", status: "Stabil", statusColor: "yellow" },
        { region: "Jawa Timur", umr: "Rp 2.165.244", unemp: "4.8%", sector: "Perdagangan", color: "blue", status: "Tumbuh", statusColor: "green" },
        { region: "Banten", umr: "Rp 2.927.512", unemp: "7.5%", sector: "Industri Berat", color: "gray", status: "Waspada", statusColor: "red" },
        { region: "Bali", umr: "Rp 2.813.672", unemp: "2.6%", sector: "Pariwisata", color: "orange", status: "Pulih", statusColor: "blue" },
        { region: "DI Yogyakarta", umr: "Rp 2.125.897", unemp: "3.6%", sector: "Pendidikan & Wisata", color: "purple", status: "Stabil", statusColor: "yellow" },
        { region: "Sumatera Utara", umr: "Rp 2.809.915", unemp: "5.8%", sector: "Perkebunan", color: "green", status: "Tumbuh", statusColor: "green" },
        { region: "Kalimantan Timur", umr: "Rp 3.360.858", unemp: "5.7%", sector: "Pertambangan", color: "gray", status: "Booming", statusColor: "green" },
        { region: "Sulawesi Selatan", umr: "Rp 3.434.298", unemp: "4.5%", sector: "Maritim & Pangan", color: "blue", status: "Stabil", statusColor: "yellow" },
        { region: "Papua", umr: "Rp 4.024.270", unemp: "2.8%", sector: "Pertambangan", color: "gray", status: "Stabil", statusColor: "yellow" }
    ];

    window.showRegionalData = function() {
        const modal = document.getElementById('regionalDataModal');
        const tbody = document.getElementById('fullRegionalDataBody');
        
        tbody.innerHTML = '';

        fullRegionalData.forEach(item => {
            const row = document.createElement('tr');
            row.className = "hover:bg-blue-50/50 transition duration-150";
            
            let statusClass = item.statusColor === 'green' ? 'bg-green-100 text-green-700' : 
                              (item.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 
                              (item.statusColor === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'));

            let sectorClass = `bg-${item.color}-100 text-${item.color}-700`;

            row.innerHTML = `
                <td class="px-6 py-4 font-bold text-gray-800">${item.region}</td>
                <td class="px-6 py-4 font-mono text-gray-600">${item.umr}</td>
                <td class="px-6 py-4 font-semibold text-gray-700">${item.unemp}</td>
                <td class="px-6 py-4"><span class="${sectorClass} px-3 py-1 rounded-lg text-xs font-semibold">${item.sector}</span></td>
                <td class="px-6 py-4"><span class="${statusClass} px-3 py-1 rounded-full text-xs font-bold">${item.status}</span></td>
            `;
            tbody.appendChild(row);
        });

        modal.classList.remove('hidden');
    }

    window.closeRegionalData = function() {
        document.getElementById('regionalDataModal').classList.add('hidden');
    }

    document.getElementById('regionalDataModal').addEventListener('click', (e) => {
        if(e.target.id === 'regionalDataModal') closeRegionalData();
    });
    
    
    const sectorData = {
        "Technology": {
            growth: "15.2%", growthBadge: "+2.1% YoY", growthDesc: "Didorong oleh AI & Digitalisasi",
            wage: "12,500,000", wageBadge: "High Paid",
            jobs: "14,205", jobsBadge: "Tinggi", jobsDesc: "Di seluruh portal terdaftar",
            skill: "Data Analysis", skillDesc: "Dibutuhkan di 70% lowongan",
            chartData: [1.2, 2.5, 3.8, 5.5, 7.8], chartColor: '#3b82f6'
        },
        "Finance": {
            growth: "8.5%", growthBadge: "+1.4% YoY", growthDesc: "Stabil pasca pandemi",
            wage: "10,200,000", wageBadge: "Competitive",
            jobs: "8,450", jobsBadge: "Sedang", jobsDesc: "Fokus pada Fintech",
            skill: "Risk Mgmt", skillDesc: "Sertifikasi FRM diutamakan",
            chartData: [4.0, 4.2, 4.5, 4.8, 5.1], chartColor: '#8b5cf6'
        },
        "Healthcare": {
            growth: "10.1%", growthBadge: "+3.5% YoY", growthDesc: "Kebutuhan tenaga medis naik",
            wage: "8,800,000", wageBadge: "Rising",
            jobs: "12,100", jobsBadge: "Sangat Tinggi", jobsDesc: "Kekurangan suplai perawat",
            skill: "Patient Care", skillDesc: "STR aktif wajib",
            chartData: [3.0, 3.5, 4.2, 5.0, 6.2], chartColor: '#10b981'
        },
        "Manufacturing": {
            growth: "-1.8%", growthBadge: "Menurun", growthDesc: "Dampak otomatisasi",
            wage: "5,400,000", wageBadge: "Standard",
            jobs: "6,200", jobsBadge: "Rendah", jobsDesc: "Pabrik padat karya berkurang",
            skill: "Machine Ops", skillDesc: "Operasional mesin CNC",
            chartData: [6.0, 5.8, 5.5, 5.2, 5.0], chartColor: '#ef4444'
        },
        "Retail": {
            growth: "3.1%", growthBadge: "+0.2% YoY", growthDesc: "Peralihan ke E-commerce",
            wage: "4,200,000", wageBadge: "Entry Level",
            jobs: "22,500", jobsBadge: "Masif", jobsDesc: "Turnover karyawan tinggi",
            skill: "Sales", skillDesc: "Komunikasi & Negosiasi",
            chartData: [4.5, 4.0, 4.1, 4.3, 4.5], chartColor: '#f59e0b'
        },
        "Agriculture": {
            growth: "2.4%", growthBadge: "Stabil", growthDesc: "Musim panen raya",
            wage: "3,500,000", wageBadge: "Low",
            jobs: "15,000", jobsBadge: "Tinggi", jobsDesc: "Musiman",
            skill: "Farming", skillDesc: "Pengalaman lapangan",
            chartData: [3.0, 3.1, 3.2, 3.4, 3.5], chartColor: '#84cc16'
        },
        "Construction": {
            growth: "5.5%", growthBadge: "Naik", growthDesc: "Proyek IKN & Infrastruktur",
            wage: "4,800,000", wageBadge: "Medium",
            jobs: "9,000", jobsBadge: "Sedang", jobsDesc: "Proyek pemerintah",
            skill: "Civil Eng", skillDesc: "Sertifikasi K3",
            chartData: [2.0, 2.5, 3.5, 4.0, 5.0], chartColor: '#f97316'
        }
    };

    
    const ctx = document.getElementById('employmentTrendChart').getContext('2d');
    let employmentChart;

    function initChart(data, color) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, color + '80'); 
        gradient.addColorStop(1, color + '00'); 

        if (employmentChart) employmentChart.destroy();

        employmentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Employment (Millions)',
                    data: data,
                    borderColor: color,
                    backgroundColor: gradient,
                    borderWidth: 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: color,
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.4 
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { borderDash: [5, 5], color: '#f1f5f9' }, beginAtZero: false },
                    x: { grid: { display: false } }
                },
                animation: { duration: 1500, easing: 'easeOutQuart' }
            }
        });
    }

    
    function replayAnimations() {
        const cards = document.querySelectorAll('.stat-card');
        
        cards.forEach((card, index) => {
            
            card.classList.remove('animate-slide-left');
            
            
            card.classList.add('opacity-0');
            
            
            card.style.opacity = ''; 
            card.style.transform = '';
            
            
            void card.offsetWidth;

            
            setTimeout(() => {
                card.classList.remove('opacity-0'); 
                card.classList.add('animate-slide-left'); 
            }, index * 150); 
        });

        
        const chartWrapper = document.querySelector('.chart-wrapper');
        if(chartWrapper) {
            chartWrapper.classList.remove('animate-slide-left');
            chartWrapper.classList.add('opacity-0');
            
            chartWrapper.style.opacity = ''; 
            
            void chartWrapper.offsetWidth;
            
            setTimeout(() => {
                chartWrapper.classList.remove('opacity-0');
                chartWrapper.classList.add('animate-slide-left');
            }, 600); 
        }
    }

    function updateDashboard(sector) {
        const data = sectorData[sector];
        
        if(!data) {
            return; 
        }

        replayAnimations();

        const ids = [
            { id: 'valGrowth', val: data.growth }, { id: 'badgeGrowth', val: data.growthBadge }, { id: 'descGrowth', val: data.growthDesc },
            { id: 'valWage', val: data.wage }, { id: 'badgeWage', val: data.wageBadge },
            { id: 'valJobs', val: data.jobs }, { id: 'badgeJobs', val: data.jobsBadge }, { id: 'descJobs', val: data.jobsDesc },
            { id: 'valSkill', val: data.skill }, { id: 'descSkill', val: data.skillDesc },
            { id: 'sectorTitle', val: sector }
        ];

        ids.forEach(item => {
            const el = document.getElementById(item.id);
            if(el) {
                el.textContent = item.val;
                    
                if(item.id === 'badgeGrowth') {
                    if(data.growth.includes('-')) {
                        el.className = "text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded";
                    } else {
                        el.className = "text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded";
                    }
                }
            }
        });

        initChart(data.chartData, data.chartColor);
    }

    
    const btn = document.getElementById('btnSektorAnalysis');
    const list = document.getElementById('listSektorAnalysis');
    const label = document.getElementById('labelSektorAnalysis');

    if(btn && list) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            list.classList.toggle('hidden');
        });

        list.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const val = item.getAttribute('data-value');
                label.textContent = val; 
                list.classList.add('hidden');
                  
                updateDashboard(val);
            });
        });

        document.addEventListener('click', () => list.classList.add('hidden'));
    }

    
    initChart(sectorData['Technology'].chartData, sectorData['Technology'].chartColor);
    replayAnimations();

});

    const detailData = {
        'faktorPHK': {
            title: "Analisis Mendalam: Pemicu PHK Massal",
            icon: '<i class="fas fa-chart-line text-red-600"></i>',
            headerColor: 'bg-red-50',
            content: `
                <p class="font-semibold text-gray-800 mb-2">1. Koreksi Pasar Pasca-Pandemi</p>
                <p class="mb-4">Selama pandemi, perusahaan teknologi merekrut secara agresif ("overhiring") karena lonjakan permintaan digital. Saat kondisi normal kembali, pendapatan tidak sebanding dengan biaya operasional yang membengkak, memaksa perusahaan melakukan efisiensi ekstrem.</p>
                
                <p class="font-semibold text-gray-800 mb-2">2. Tekanan Investor & Suku Bunga Tinggi</p>
                <p class="mb-4">Era "uang murah" (suku bunga rendah) telah berakhir. Investor kini menuntut profitabilitas nyata (profitability) daripada sekadar pertumbuhan pengguna (growth). Perusahaan yang "bakar uang" dipaksa memangkas biaya, dan beban gaji karyawan seringkali menjadi target utama.</p>
                <p class="font-semibold text-gray-800 mb-2">3. Disrupsi AI Generatif</p>
                <p>Adopsi teknologi AI seperti ChatGPT dan otomatisasi lainnya mulai menggantikan peran pekerjaan rutin, seperti customer service level 1, entry data, dan penulisan konten dasar, mengurangi kebutuhan jumlah staf.</p>
            `
        },
        'magangIdeal': {
            title: "Standar Program Magang Berkualitas",
            icon: '<i class="fas fa-check-circle text-green-600"></i>',
            headerColor: 'bg-green-50',
            content: `
                <p>Magang yang ideal harus memenuhi prinsip <strong>Learning by Doing</strong>, bukan sekadar <em>Cheap Labor</em>. Berikut indikator utamanya:</p>
                <ul class="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Mentorship Terstruktur:</strong> Pemagang didampingi oleh supervisor yang memberikan arahan, feedback, dan evaluasi berkala, bukan dibiarkan bekerja sendiri tanpa panduan.</li>
                    <li><strong>Kurikulum Pembelajaran:</strong> Terdapat rencana kerja (workplan) yang jelas tentang skill apa yang akan dipelajari selama periode magang.</li>
                    <li><strong>Kompensasi Layak:</strong> Meskipun statusnya belajar, pemagang berhak mendapatkan uang saku (transport & makan) sebagai bentuk apresiasi kontribusi mereka.</li>
                    <li><strong>Konversi SKS:</strong> Untuk mahasiswa, program harus bisa dikonversi menjadi nilai akademik (seperti program MSIB Kampus Merdeka).</li>
                </ul>
            `
        },
        'eksploitasi': {
            title: "Red Flags: Tanda Eksploitasi Magang",
            icon: '<i class="fas fa-exclamation-triangle text-yellow-600"></i>',
            headerColor: 'bg-yellow-50',
            content: `
                <p class="mb-4">Banyak perusahaan menyalahgunakan label "magang" untuk mendapatkan tenaga kerja gratis. Waspadai tanda-tanda berikut:</p>
                
                <div class="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
                    <h5 class="font-bold text-red-700 mb-2">Modus Operandi Umum:</h5>
                    <ul class="list-disc pl-5 text-red-600 text-sm space-y-1">
                        <li>Menggantikan peran staff tetap yang resign (mengisi kekosongan posisi krusial).</li>
                        <li>Beban kerja setara karyawan full-time (9-5 atau lembur) tapi tanpa upah/benefit.</li>
                        <li>Pekerjaan bersifat repetitif/administrasi saja (fotokopi, buat kopi) tanpa transfer ilmu.</li>
                        <li>Penahanan ijazah atau denda penalti jika berhenti di tengah jalan.</li>
                    </ul>
                </div>
                <p>Jika Anda mengalami hal ini, segera konsultasikan dengan dosen pembimbing atau serikat pekerja terkait.</p>
            `
        }
    };
    function showDetail(key) {
        const data = detailData[key];
        if(!data) return;

        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalIconContainer').innerHTML = data.icon;
        document.getElementById('modalBody').innerHTML = data.content;
        
        document.getElementById('detailModal').classList.remove('hidden');
    }
    function closeDetailModal() {
        document.getElementById('detailModal').classList.add('hidden');
    }

    document.getElementById('detailModal').addEventListener('click', (e) => {
        if(e.target.id === 'detailModal') closeDetailModal();
    });