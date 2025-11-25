document.addEventListener("DOMContentLoaded", () => {
    // Toggle mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const desktopMenu = document.getElementById('desktopMenu');

    if (mobileMenuBtn && desktopMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            desktopMenu.classList.toggle('hidden');
        });
    }

    // Active menu effect
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(el => {
                el.classList.remove('nav-active');
            });
            this.classList.add('nav-active');
        });
    });

    // Sample job data with detailed information
    const jobsData = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "PT Teknologi Maju Bersama",
            location: "Jakarta",
            type: "Full-time",
            posted: "2 days ago",
            skills: ["React", "JavaScript", "TailwindCSS"],
            salary: "IDR 8-12 Juta/bulan",
            description: "Mengembangkan aplikasi web menggunakan teknologi modern dengan fokus pada user experience.",
            details: "Bertanggung jawab untuk mengembangkan antarmuka pengguna yang responsif dan interaktif untuk platform digital kami. Bekerja sama dengan tim desain dan backend untuk memastikan implementasi yang sempurna dari fitur-fitur baru.",
            requirements: [
                "Minimal 1 tahun pengalaman sebagai Frontend Developer",
                "Menguasai React.js dan JavaScript ES6+",
                "Memahami konsep UI/UX dasar",
                "Mampu bekerja dalam tim dan memiliki komunikasi yang baik",
                "Bersedia belajar teknologi baru secara mandiri"
            ],
            logo: "TM"
        },
        {
            id: 2,
            title: "Digital Marketing Specialist",
            company: "CV Inovasi Digital",
            location: "Yogyakarta",
            type: "Magang",
            posted: "5 days ago",
            skills: ["SEO", "Social Media", "Analytics"],
            salary: "IDR 2-3 Juta/bulan",
            description: "Mengelola strategi pemasaran digital untuk meningkatkan brand awareness dan konversi.",
            details: "Membantu dalam merancang dan mengeksekusi kampanye pemasaran digital melalui berbagai platform media sosial dan mesin pencari. Menganalisis data performa kampanye dan memberikan rekomendasi perbaikan.",
            requirements: [
                "Mahasiswa semester 5 ke atas jurusan Komunikasi, Bisnis, atau terkait",
                "Memahami dasar-dasar SEO dan media sosial",
                "Mampu menggunakan Google Analytics dan Facebook Insights",
                "Kreatif dan memiliki ide-ide inovatif",
                "Mampu bekerja secara mandiri dan dalam tim"
            ],
            logo: "ID"
        },
        {
            id: 3,
            title: "Data Analyst",
            company: "Bank Finansial Indonesia",
            location: "Surabaya",
            type: "Full-time",
            posted: "1 week ago",
            skills: ["Python", "SQL", "Power BI"],
            salary: "IDR 10-15 Juta/bulan",
            description: "Menganalisis data untuk memberikan insights yang mendukung pengambilan keputusan bisnis.",
            details: "Mengumpulkan, membersihkan, dan menganalisis data dari berbagai sumber untuk mengidentifikasi tren dan pola yang relevan bagi bisnis. Membuat laporan dan visualisasi data yang mudah dipahami oleh manajemen.",
            requirements: [
                "Lulusan S1 Statistik, Matematika, atau bidang terkait",
                "Menguasai Python dan SQL untuk analisis data",
                "Berpengalaman dengan Power BI atau Tableau",
                "Memiliki kemampuan analitis yang kuat",
                "Mampu menyampaikan temuan secara jelas dan efektif"
            ],
            logo: "BFI"
        },
        {
            id: 4,
            title: "Backend Developer",
            company: "Startup Digital Indonesia",
            location: "Bandung",
            type: "Full-time",
            posted: "3 days ago",
            skills: ["Node.js", "Express", "MongoDB"],
            salary: "IDR 9-13 Juta/bulan",
            description: "Membangun dan memelihara server, database, dan aplikasi backend untuk platform digital.",
            details: "Merancang dan mengimplementasikan arsitektur backend yang skalabel dan aman. Mengoptimalkan performa sistem dan memastikan integritas data. Bekerja sama dengan tim frontend untuk integrasi API.",
            requirements: [
                "Minimal 2 tahun pengalaman sebagai Backend Developer",
                "Menguasai Node.js, Express, dan MongoDB",
                "Memahami prinsip RESTful API dan GraphQL",
                "Mampu bekerja dengan Docker dan cloud services",
                "Memiliki pengetahuan tentang security best practices"
            ],
            logo: "SDI"
        },
        {
            id: 5,
            title: "UX Designer",
            company: "Design Studio Creative",
            location: "Jakarta",
            type: "Part-time",
            posted: "1 day ago",
            skills: ["Figma", "Adobe XD", "User Research"],
            salary: "IDR 6-8 Juta/bulan",
            description: "Merancang pengalaman pengguna yang intuitif dan menarik untuk produk digital.",
            details: "Melakukan riset pengguna, membuat wireframe dan prototipe, serta melakukan pengujian usability untuk memastikan produk sesuai dengan kebutuhan pengguna. Bekerja sama dengan tim developer untuk implementasi desain.",
            requirements: [
                "Portofolio desain UX/UI yang menunjukkan proses kerja",
                "Menguasai Figma atau Adobe XD",
                "Memahami prinsip desain UX dan user-centered design",
                "Mampu melakukan riset pengguna dan analisis hasil",
                "Kemampuan komunikasi yang baik untuk presentasi dan kolaborasi"
            ],
            logo: "DSC"
        },
        {
            id: 6,
            title: "Project Manager",
            company: "Consulting Group International",
            location: "Medan",
            type: "Full-time",
            posted: "1 week ago",
            skills: ["Agile", "Scrum", "Risk Management"],
            salary: "IDR 15-20 Juta/bulan",
            description: "Mengelola proyek dari awal hingga akhir, memastikan proyek selesai tepat waktu dan sesuai anggaran.",
            details: "Merencanakan, mengorganisir, dan mengkoordinasikan sumber daya untuk mencapai tujuan proyek. Memantau kemajuan proyek, mengelola risiko, dan berkomunikasi dengan stakeholder. Menggunakan metodologi Agile dan Scrum dalam manajemen proyek.",
            requirements: [
                "Sertifikasi PMP atau Scrum Master merupakan nilai tambah",
                "Minimal 3 tahun pengalaman sebagai Project Manager",
                "Menguasai metodologi Agile dan Scrum",
                "Kemampuan manajemen risiko dan resolusi masalah",
                "Kemampuan kepemimpinan dan komunikasi yang kuat"
            ],
            logo: "CGI"
        }
    ];

    // Function to render job cards
    function renderJobCards(jobs) {
        const jobListingsContainer = document.getElementById('jobListings');
        jobListingsContainer.innerHTML = '';

        if (jobs.length === 0) {
            jobListingsContainer.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-500">
                    Tidak ada lowongan yang sesuai dengan pencarian Anda.
                </div>
            `;
            return;
        }

        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            
            // Determine job type badge color and text
            let typeClass = '';
            let typeText = '';
            if (job.type === 'Full-time') {
                typeClass = 'full-time';
                typeText = 'Full-time';
            } else if (job.type === 'Magang') {
                typeClass = 'magang';
                typeText = 'Magang';
            } else if (job.type === 'Part-time') {
                typeClass = 'part-time';
                typeText = 'Part-time';
            }

            jobCard.innerHTML = `
                <div class="job-type-badge ${typeClass}">${typeText}</div>
                <div class="job-header">
                    <div class="company-logo">${job.logo}</div>
                    <div>
                        <div class="job-title">${job.title}</div>
                        <div class="company-name">${job.company}</div>
                    </div>
                </div>
                <div class="job-meta">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
                <div class="job-meta">
                    <i class="far fa-clock"></i>
                    <span>Posted ${job.posted}</span>
                </div>
                <div class="job-tags">
                    ${job.skills.map(skill => `<span class="job-tag">${skill}</span>`).join('')}
                </div>
                <div class="job-salary">${job.salary}</div>
                <div class="job-buttons">
                    <button class="detail-button" onclick="showJobDetail(${job.id})">
                        <i class="fas fa-eye mr-2"></i>Lihat Detail
                    </button>
                    <a href="#" class="apply-button">
                        <i class="fas fa-paper-plane mr-2"></i>Lamar
                    </a>
                </div>
            `;

            jobListingsContainer.appendChild(jobCard);
        });
    }

    // Function to show job detail modal
    window.showJobDetail = function(jobId) {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;

        // Set modal content
        document.getElementById('modalJobTitle').textContent = job.title;
        document.getElementById('modalCompanyName').textContent = job.company;
        document.getElementById('modalLocation').querySelector('span').textContent = job.location;
        document.getElementById('modalCompanyLogo').textContent = job.logo;
        document.getElementById('modalDescription').textContent = job.description;
        document.getElementById('modalDetails').textContent = job.details;
        
        // Set job type badge
        const jobTypeBadge = document.getElementById('modalJobType');
        if (job.type === 'Full-time') {
            jobTypeBadge.textContent = 'Full-time';
            jobTypeBadge.className = 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800';
        } else if (job.type === 'Magang') {
            jobTypeBadge.textContent = 'Magang';
            jobTypeBadge.className = 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800';
        } else if (job.type === 'Part-time') {
            jobTypeBadge.textContent = 'Part-time';
            jobTypeBadge.className = 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800';
        }

        // Set requirements
        const requirementsList = document.getElementById('modalRequirements');
        requirementsList.innerHTML = '';
        job.requirements.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            requirementsList.appendChild(li);
        });

        // Show modal
        document.getElementById('jobDetailModal').classList.remove('hidden');
    };

    // Close modal
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('jobDetailModal').classList.add('hidden');
    });

    // Close modal when clicking outside
    document.getElementById('jobDetailModal').addEventListener('click', (e) => {
        if (e.target.id === 'jobDetailModal') {
            document.getElementById('jobDetailModal').classList.add('hidden');
        }
    });

    // Initialize with all jobs
    renderJobCards(jobsData);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const sectorFilter = document.getElementById('sectorFilter');
    const locationFilter = document.getElementById('locationFilter');
    const searchButton = document.getElementById('searchButton');
    const viewAllJobs = document.getElementById('viewAllJobs');

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedSector = sectorFilter.value;
        const selectedLocation = locationFilter.value;

        let filteredJobs = jobsData.filter(job => {
            // Filter by search term
            const matchesSearch = !searchTerm || 
                job.title.toLowerCase().includes(searchTerm) || 
                job.company.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                job.details.toLowerCase().includes(searchTerm);
            
            // Filter by sector (for this example, we'll use the company name as proxy for sector)
            const matchesSector = !selectedSector || 
                (selectedSector === 'Teknologi Informasi' && job.company.includes('Teknologi')) ||
                (selectedSector === 'Manufaktur' && job.company.includes('Manufaktur')) ||
                (selectedSector === 'Jasa Keuangan' && job.company.includes('Bank') || job.company.includes('Finansial')) ||
                (selectedSector === 'Pendidikan' && job.company.includes('Pendidikan')) ||
                (selectedSector === 'Kesehatan' && job.company.includes('Kesehatan'));
            
            // Filter by location
            const matchesLocation = !selectedLocation || job.location === selectedLocation;
            
            return matchesSearch && matchesSector && matchesLocation;
        });

        renderJobCards(filteredJobs);
    }

    // Add event listeners
    searchInput.addEventListener('keyup', filterJobs);
    sectorFilter.addEventListener('change', filterJobs);
    locationFilter.addEventListener('change', filterJobs);
    searchButton.addEventListener('click', filterJobs);

    // View all jobs button
    viewAllJobs.addEventListener('click', function(e) {
        e.preventDefault();
        searchInput.value = '';
        sectorFilter.value = '';
        locationFilter.value = '';
        renderJobCards(jobsData);
    });
});