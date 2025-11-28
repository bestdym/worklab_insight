document.addEventListener("DOMContentLoaded", function() {
    console.log("Team Solid: Employment JS loaded with Smooth Slide Animation...");

    // ==========================================
    // 1. DATA DUMMY
    // ==========================================
    const sectorData = {
        "Manufacturing": [65, 64, 66, 68, 70, 69, 71, 73, 72, 74, 75, 76],
        "Digital & ICT": [20, 45, 35, 60, 40, 55, 30, 65, 45, 70, 50, 85],
        "Agriculture":   [50, 55, 60, 80, 85, 90, 85, 60, 55, 50, 45, 40],
        "Mining":        [40, 38, 35, 32, 30, 35, 45, 55, 60, 58, 55, 50],
        "Retail":        [30, 35, 40, 42, 45, 40, 38, 45, 55, 65, 80, 95],
        "Finance":       [55, 58, 60, 62, 65, 70, 72, 75, 74, 78, 80, 82]
    };
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // ==========================================
    // 2. LOGIKA ANIMASI SLIDE
    // ==========================================
    function setupChartRevealAnimations() {
        const charts = document.querySelectorAll('.chart-container canvas');
        
        charts.forEach((canvas, index) => {
            // Memberi jeda (delay) antar grafik agar muncul berurutan
            setTimeout(() => {
                canvas.classList.add('slide-active');
            }, 200 + (index * 250)); 
        });
    }

    // ==========================================
    // 3. KONFIGURASI CHART (ANIMASI INTERNAL MATI)
    // ==========================================
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        
        // PENTING: Matikan animasi loading internal Chart.js
        // Agar tidak bentrok dengan animasi slide CSS
        animation: {
            duration: 0 
        },
        
        // Animasi Hover tetap aktif
        transitions: {
            active: {
                animation: { duration: 400, easing: 'easeOutQuart' }
            }
        },

        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 10,
                usePointStyle: true,
                titleFont: { size: 13, weight: 'bold', family: "'Inter', sans-serif" },
                bodyFont: { size: 12, family: "'Inter', sans-serif" },
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + (context.chart.canvas.id === 'sectorChart' ? '%' : ' mil');
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
            y: { display: true, grid: { color: '#f3f4f6', drawBorder: false }, ticks: { display: true, color: '#9ca3af', maxTicksLimit: 6 } }
        },
        elements: {
            point: { radius: 0, hitRadius: 20, hoverRadius: 8, hoverBorderWidth: 3, hoverBackgroundColor: '#ffffff' },
            line: { tension: 0.4, borderCapStyle: 'round', borderJoinStyle: 'round' }
        }
    };

    // ==========================================
    // 4. RENDERING CHART
    // ==========================================

    // Chart 1: Unemployment
    const ctx1 = document.getElementById('unemploymentChart');
    if (ctx1) {
        const gradient1 = ctx1.getContext('2d').createLinearGradient(0, 0, 0, 200);
        gradient1.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
        gradient1.addColorStop(1, 'rgba(239, 68, 68, 0)');

        new Chart(ctx1.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', 'Q1 24', 'Q2 24'],
                datasets: [{
                    label: 'Unemployment',
                    data: [3.2, 5.0, 4.2, 3.5, 4.8, 3.0, 2.5],
                    borderColor: '#ef4444',
                    backgroundColor: gradient1,
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: { ...commonOptions, scales: { x: {display:true, grid:{display:false}}, y: {display:true, min: 1, max: 6, grid:{display:false}} } }
        });
    }

    // Chart 2: Labor Force
    const ctx2 = document.getElementById('laborChart');
    if (ctx2) {
        new Chart(ctx2.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', 'Q1 24', 'Q2 24'],
                datasets: [{
                    label: 'Labor Force',
                    data: [4.5, 3.0, 4.2, 3.5, 5.5, 4.0, 6.0],
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: { ...commonOptions, scales: { x: {display:true, grid:{display:false}}, y: {display:true, min: 2, max: 7, grid:{display:false}} } }
        });
    }

    // Chart 3: Sector Growth (Interactive)
    let sectorChart;
    const ctx3 = document.getElementById('sectorChart');
    if (ctx3) {
        const gradient3 = ctx3.getContext('2d').createLinearGradient(0, 0, 0, 300);
        gradient3.addColorStop(0, 'rgba(30, 58, 138, 0.2)');
        gradient3.addColorStop(1, 'rgba(30, 58, 138, 0)');

        sectorChart = new Chart(ctx3.getContext('2d'), {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Growth',
                    data: sectorData["Digital & ICT"],
                    borderColor: '#1e3a8a',
                    backgroundColor: gradient3,
                    borderWidth: 3,
                    fill: true
                }]
            },
            options: { ...commonOptions, scales: { x: {display:true, grid:{display:false}}, y: {display:false} } }
        });
    }

    // ==========================================
    // 5. EKSEKUSI
    // ==========================================
    
    // Trigger Animasi Slide-In
    requestAnimationFrame(() => {
        setupChartRevealAnimations();
    });

    // Dropdown Logic (Reset Animasi saat ganti data)
    const selector = document.getElementById('sectorSelect');
    if (selector && sectorChart) {
        selector.addEventListener('change', function() {
            const selectedValue = this.value;
            const newData = sectorData[selectedValue];
            if (newData) {
                // Update Data
                sectorChart.data.datasets[0].data = newData;
                sectorChart.update();

                // Opsional: Re-trigger animasi slide jika diinginkan
                const canvas = document.querySelector('#sectorChart');
                canvas.classList.remove('slide-active');
                setTimeout(() => canvas.classList.add('slide-active'), 50);
            }
        });
    }
});









// --- DATABASE DUMMY & SKENARIO ---
const dummyData = {
    // SKENARIO 2025: RESESI / EKONOMI BURUK
    // 2025: SKENARIO KRISIS/RESESI (Pengangguran 14.5%)
    '2025': {
        'All': {
            age: [15, 45, 80, 85, 65, 40], 
            gender: [52, 48], 
            total: "138M",    
            edu: [60, 60, 30, 10], 
            unemployment: "14.5%"   
        },
        'Java': {
            age: [20, 50, 70, 75, 50, 30],
            gender: [53, 47],
            total: "78M",
            edu: [55, 65, 25, 10],
            unemployment: "13.8%"
        },
        'Sumatra': {
            age: [10, 40, 60, 60, 50, 30],
            gender: [51, 49],
            total: "30M",
            edu: [70, 40, 20, 5],
            unemployment: "15.2%"
        },
        'Kalimantan': {
            age: [10, 30, 40, 50, 40, 20],
            gender: [65, 35],
            total: "12M",
            edu: [60, 40, 15, 5],
            unemployment: "12.5%"
        }
    },

    // 2024: TAHUN TRANSISI (Mulai Turun - Pengangguran 11.4%)
    '2024': {
        'All': {
            age: [25, 55, 85, 80, 55, 35], // Usia muda mulai sulit cari kerja
            gender: [51, 49], 
            total: "145M",    // Turun sedikit dari 150M
            edu: [50, 70, 40, 15], 
            unemployment: "11.4%" // Mulai naik dari 8.2%
        },
        'Java': {
            age: [30, 60, 75, 70, 45, 25],
            gender: [54, 46],
            total: "82M",
            edu: [40, 80, 50, 20],
            unemployment: "10.5%"
        },
        'Sumatra': {
            age: [20, 45, 65, 55, 45, 28],
            gender: [50, 50],
            total: "33M",
            edu: [55, 50, 25, 8],
            unemployment: "12.1%"
        },
        'Kalimantan': {
            age: [15, 35, 45, 45, 35, 18],
            gender: [62, 38],
            total: "14M",
            edu: [55, 45, 18, 5],
            unemployment: "9.5%"
        }
    },

    // 2023: TAHUN NORMAL (Puncak Pemulihan - Pengangguran 8.2%)
    '2023': {
        'All': {
            age: [35, 65, 90, 70, 50, 30],
            gender: [51, 49], 
            total: "150M",
            edu: [40, 85, 50, 25],
            unemployment: "8.2%"
        },
        'Java': {
            age: [40, 70, 80, 60, 40, 20],
            gender: [55, 45],
            total: "85M",
            edu: [30, 95, 60, 30],
            unemployment: "7.5%"
        },
        'Sumatra': {
            age: [30, 50, 70, 50, 40, 25],
            gender: [50, 50],
            total: "35M",
            edu: [45, 60, 30, 10],
            unemployment: "9.1%"
        },
        'Kalimantan': {
            age: [20, 40, 50, 40, 30, 15],
            gender: [60, 40],
            total: "15M",
            edu: [50, 50, 20, 5],
            unemployment: "6.8%"
        }
    },

    // DATA HISTORIS LAMA
    '2022': {
        'All': {
            age: [38, 62, 85, 75, 45, 28],
            gender: [52, 48],
            total: "148M",
            edu: [45, 80, 45, 20],
            unemployment: "9.5%"
        }
    },
    '2021': {
        'All': {
            age: [40, 60, 80, 70, 40, 25],
            gender: [53, 47],
            total: "142M",
            edu: [50, 75, 40, 15],
            unemployment: "10.2%"
        }
    }
};

// ... (Sisa kode JS ke bawah tetap sama, tidak perlu diubah)

// --- INITIAL VARIABEL CHART ---
let ageChart, genderChart, eduChart;

// Fungsi Helper Data
function getData(year, region) {
    // Cek apakah data tahun & region ada
    if (dummyData[year] && dummyData[year][region]) {
        return dummyData[year][region];
    } 
    // Jika region tidak ada, pakai 'All' dari tahun itu
    else if (dummyData[year] && dummyData[year]['All']) {
        return dummyData[year]['All'];
    }
    // Fallback terakhir ke 2023 All
    return dummyData['2023']['All'];
}

// 1. AGE CHART
function initAgeChart(data) {
    const ctxAge = document.getElementById('ageChart').getContext('2d');
    ageChart = new Chart(ctxAge, {
        type: 'bar',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
            datasets: [{
                data: data,
                backgroundColor: ['#d1d5db', '#d1d5db', '#1e3a8a', '#d1d5db', '#d1d5db', '#d1d5db'],
                borderRadius: 4,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });
}

// 2. GENDER CHART
function initGenderChart(data) {
    const ctxGender = document.getElementById('genderChart').getContext('2d');
    genderChart = new Chart(ctxGender, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                data: data,
                backgroundColor: ['#1e3a8a', '#60a5fa'],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: true } }
        }
    });
}

// 3. EDUCATION CHART
function initEduChart(data) {
    const ctxEdu = document.getElementById('educationChart').getContext('2d');
    eduChart = new Chart(ctxEdu, {
        type: 'bar',
        data: {
            labels: ['High School', "Bachelor's", "Master's", 'PhD'],
            datasets: [{
                data: data,
                backgroundColor: ['#d1d5db', '#1e3a8a', '#d1d5db', '#d1d5db'],
                borderRadius: 4,
                barPercentage: 0.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });
}

// UPDATE DASHBOARD FUNCTION
function updateDashboard() {
    const region = document.getElementById('regionFilter').value;
    const year = document.getElementById('yearFilter').value;
    
    // Ambil data berdasarkan pilihan user
    const currentData = getData(year, region);

    // Update Data Chart
    ageChart.data.datasets[0].data = currentData.age;
    ageChart.update();

    genderChart.data.datasets[0].data = currentData.gender;
    genderChart.update();
    
    eduChart.data.datasets[0].data = currentData.edu;
    eduChart.update();

    // Update Teks HTML
    document.getElementById('totalWorkforce').innerText = currentData.total;
    document.getElementById('malePct').innerText = currentData.gender[0] + "%";
    document.getElementById('femalePct').innerText = currentData.gender[1] + "%";
    document.getElementById('unemploymentRate').innerText = currentData.unemployment;
    
    // Ubah warna indikator jika pengangguran tinggi (2025)
    const unemploymentEl = document.getElementById('unemploymentRate');
    if (parseFloat(currentData.unemployment) > 10) {
        unemploymentEl.style.color = "#dc2626"; // Merah (Bahaya)
    } else {
        unemploymentEl.style.color = "#1e3a8a"; // Biru (Normal)
    }
}

// INITIAL RUN
document.addEventListener('DOMContentLoaded', () => {
    const ageEl = document.getElementById('ageChart');
    const genderEl = document.getElementById('genderChart');
    const eduEl = document.getElementById('educationChart');
    const regionFilterEl = document.getElementById('regionFilter');
    const yearFilterEl = document.getElementById('yearFilter');

    if (ageEl && genderEl && eduEl) {
        const initialData = dummyData['2023']['All'];
        initAgeChart(initialData.age);
        initGenderChart(initialData.gender);
        initEduChart(initialData.edu);
    }

    if (regionFilterEl) regionFilterEl.addEventListener('change', updateDashboard);
    if (yearFilterEl) yearFilterEl.addEventListener('change', updateDashboard);
});









// ==========================================
// File: assete/js/test.js
// Deskripsi: Logic Dashboard Ekonomi (Data Fluktuatif)
// ==========================================

// ---------------------------------------------------------
// 1. DATA STORE (Database Lokal)
// ---------------------------------------------------------
const dataStore = {
    GDP: {
        Technology: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [750, 820, 790, 950, 1100, 1050, 1250, 1400, 1380, 1550, 1650, 1800, 1750, 1900, 2100], 
                growth: '+180%',
                summary: { label: 'Technology GDP', val: '750T → 2100T IDR', percent: '↑ +180%' },
                takeaways: ['Lonjakan tinggi pasca-pandemi (2020+).', 'Koreksi pasar terjadi di 2015 dan 2022.', 'Sektor growth tertinggi namun volatil.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [800, 900, 880, 1050, 1200, 1150, 1350, 1500, 1480, 1650, 1850, 1950, 1900, 2050, 2200],
                growth: '+175%',
                summary: { label: 'Technology GDP (Asia)', val: '800T → 2200T IDR', percent: '↑ +175%' },
                takeaways: ['Tren Asia mengikuti pola global.', 'Investasi startup mendorong volatilitas.', 'Pemulihan cepat setelah koreksi.']
            }
        },
        Manufacturing: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [2800, 2950, 2900, 3050, 3150, 3100, 3200, 3350, 3400, 3300, 2900, 3100, 3300, 3250, 3450],
                growth: '+23.2%',
                summary: { label: 'Manufacturing GDP', val: '2800T → 3450T IDR', percent: '↑ +23.2%' },
                takeaways: ['Dampak signifikan pandemi di 2020.', 'Pemulihan lambat namun pasti di 2021-2024.', 'Fluktuasi mengikuti demand global.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [3000, 3150, 3100, 3250, 3350, 3300, 3450, 3600, 3650, 3550, 3100, 3300, 3500, 3550, 3700],
                growth: '+23.3%',
                summary: { label: 'Manufacturing GDP (Asia)', val: '3000T → 3700T IDR', percent: '↑ +23.3%' },
                takeaways: ['Basis produksi Asia kuat.', 'Drop signifikan di 2020 akibat lockdown.', 'Supply chain pulih di 2022.']
            }
        },
        Agriculture: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1050, 1120, 1080, 1150, 1000, 1050, 980, 1020, 990, 1010, 1080, 1030, 990, 950, 980],
                growth: '-6.6%',
                summary: { label: 'Agriculture GDP', val: '1050T → 980T IDR', percent: '↓ -6.6%' },
                takeaways: ['Sangat fluktuatif karena faktor cuaca.', 'Menjadi penyangga ekonomi saat krisis 2020.', 'Tren jangka panjang menurun.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1100, 1180, 1120, 1190, 1050, 1100, 1020, 1080, 1040, 1060, 1120, 1080, 1020, 980, 1000],
                growth: '-9.0%',
                summary: { label: 'Agriculture GDP (Asia)', val: '1100T → 1000T IDR', percent: '↓ -9.0%' },
                takeaways: ['Modernisasi mengurangi porsi agrikultur.', 'Volatilitas harga komoditas terlihat jelas.', 'Stabilisasi di level rendah.']
            }
        }
    },
    Employment: {
        Technology: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [50, 52, 58, 55, 65, 70, 68, 80, 95, 110, 105, 120, 115, 130, 145],
                growth: '+190%',
                summary: { label: 'Tech Employment', val: '50K → 145K', percent: '↑ +190%' },
                takeaways: ['Permintaan talenta digital sangat tinggi.', 'Sedikit penurunan (layoff) di 2022.', 'Recovery cepat di 2023.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [60, 65, 72, 70, 80, 85, 82, 95, 110, 125, 120, 135, 130, 145, 160],
                growth: '+166%',
                summary: { label: 'Tech Employment (Asia)', val: '60K → 160K', percent: '↑ +166%' },
                takeaways: ['Hub teknologi Asia terus merekrut.', 'Persaingan talenta menyebabkan churn rate.', 'Tren remote work terlihat.']
            }
        },
        Manufacturing: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [200, 210, 205, 215, 225, 220, 230, 240, 235, 245, 210, 230, 250, 255, 260],
                growth: '+30%',
                summary: { label: 'Manu. Employment', val: '200K → 260K', percent: '↑ +30%' },
                takeaways: ['PHK massal terlihat saat pandemi 2020.', 'Rebound penyerapan tenaga kerja di 2022.', 'Automasi mulai menekan pertumbuhan.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [220, 230, 225, 235, 245, 240, 250, 260, 255, 265, 230, 250, 270, 275, 280],
                growth: '+27%',
                summary: { label: 'Manu. Employment (Asia)', val: '220K → 280K', percent: '↑ +27%' },
                takeaways: ['Pola serupa dengan Indonesia.', 'Pemulihan sektor riil pasca pandemi.', 'Pertumbuhan melambat dibanding tech.']
            }
        },
        Agriculture: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [150, 155, 145, 148, 140, 142, 135, 138, 130, 128, 135, 130, 125, 122, 120],
                growth: '-20%',
                summary: { label: 'Agri Employment', val: '150K → 120K', percent: '↓ -20%' },
                takeaways: ['Urbanisasi mengurangi petani muda.', 'Spike kecil di 2020 fenomena "pulang kampung".', 'Penurunan struktural berlanjut.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [160, 165, 155, 158, 150, 152, 145, 148, 140, 138, 145, 140, 135, 132, 130],
                growth: '-18.7%',
                summary: { label: 'Agri Employment (Asia)', val: '160K → 130K', percent: '↓ -18.7%' },
                takeaways: ['Mekanisasi menggantikan tenaga kerja.', 'Penyerapan tenaga kerja terendah.', 'Peralihan ke sektor jasa.']
            }
        }
    }
};

// ---------------------------------------------------------
// 2. GLOBAL STATE VARIABLES
// ---------------------------------------------------------
let currentMetric = 'GDP';
let currentSector = 'Technology';
let currentRegion = 'Indonesia';
let isCompareMode = false;
let maxYear = 2024;
let chartInstance = null;

// ---------------------------------------------------------
// 3. LOGIC UTAMA (Fungsi Update)
// ---------------------------------------------------------

// Fungsi: Memperbarui tampilan Chart berdasarkan state saat ini
function updateChart() {
    if (!chartInstance) return;

    // Ambil data utama berdasarkan pilihan user
    const data = dataStore[currentMetric][currentSector][currentRegion];
    
    // Filter data berdasarkan slider tahun (Max Year)
    const filteredLabels = data.labels.filter((_, i) => parseInt(data.labels[i]) <= maxYear);
    const filteredData = data.data.slice(0, filteredLabels.length);

    // Update Dataset 0 (Dataset Utama)
    chartInstance.data.labels = filteredLabels;
    chartInstance.data.datasets[0].data = filteredData;
    chartInstance.data.datasets[0].label = `${currentMetric} Growth (${currentSector})`;

    // Logic Mode Compare (Bandingkan dengan Manufacturing)
    // Syarat: Toggle aktif DAN sektor saat ini bukan Manufacturing
    if (isCompareMode && currentSector !== 'Manufacturing') {
        const compareData = dataStore[currentMetric]['Manufacturing'][currentRegion];
        const compareFilteredData = compareData.data.slice(0, filteredLabels.length);
        
        // Tambahkan dataset kedua
        chartInstance.data.datasets[1] = {
            label: `${currentMetric} Growth (Manufacturing)`,
            data: compareFilteredData,
            borderColor: '#28a745', // Warna hijau untuk pembanding
            backgroundColor: 'rgba(40, 167, 69, 0.05)',
            borderWidth: 2,
            borderDash: [5, 5], // Garis putus-putus agar beda
            tension: 0.3, 
            pointRadius: 2,
            pointHoverRadius: 5,
            fill: false
        };
    } else {
        // Jika mode compare mati atau sedang melihat Manufacturing, hapus dataset kedua
        if (chartInstance.data.datasets[1]) {
            chartInstance.data.datasets.splice(1, 1); 
        }
    }

    chartInstance.update();
}

// Fungsi: Memperbarui Sidebar (Angka & Teks Summary)
function updateSidebar() {
    const data = dataStore[currentMetric][currentSector][currentRegion];
    
    // 1. Update Big Stat (Angka Besar di atas Chart)
    const bigStatEl = document.getElementById('bigStat');
    if (bigStatEl) {
        const lastVal = data.data[data.data.length - 1];
        const unit = currentMetric === 'GDP' ? 'T IDR' : 'K Workers';
        const growthClass = data.growth.includes('+') ? 'positive' : 'negative';
        bigStatEl.innerHTML = `${lastVal} ${unit} <span class="growth ${growthClass}">↗ ${data.growth}</span>`;
    }

    // 2. Update Judul Chart
    const chartTitle = document.getElementById('chartTitle');
    const chartSubtitle = document.getElementById('chartSubtitle');
    if (chartTitle) chartTitle.textContent = `${currentMetric} Growth in ${currentSector} Sector`;
    if (chartSubtitle) chartSubtitle.textContent = `Value (in ${currentMetric === 'GDP' ? 'Trillion IDR' : 'Thousands'})`;

    // 3. Update Summary Stats (Looping ke 3 kotak kecil di sidebar)
    const sectors = ['Technology', 'Manufacturing', 'Agriculture'];
    sectors.forEach((sector, index) => {
        const sectorData = dataStore[currentMetric][sector][currentRegion];
        const statLabel = document.getElementById(`statLabel${index + 1}`);
        const statVal = document.getElementById(`statVal${index + 1}`);
        const statPercent = document.getElementById(`statPercent${index + 1}`);
        
        if(statLabel && statVal && statPercent) {
            statLabel.textContent = sectorData.summary.label;
            statVal.textContent = sectorData.summary.val;
            statPercent.textContent = sectorData.summary.percent;
            // Ubah warna teks (hijau jika naik, merah jika turun)
            statPercent.className = `stat-percent ${sectorData.summary.percent.includes('↑') ? 'positive' : 'negative'}`;
        }
    });

    // 4. Update Key Takeaways (List point)
    const takeawaysList = document.getElementById('takeawaysList');
    if(takeawaysList) {
        takeawaysList.innerHTML = data.takeaways.map(item => `<li>${item}</li>`).join('');
    }
}

// ---------------------------------------------------------
// 4. INISIALISASI (Saat Website Selesai Loading)
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('growthChart');
    
    // Cek keamanan jika elemen tidak ditemukan
    if (!ctx) {
        console.error('Canvas element #growthChart not found.');
        return;
    }

    // Buat Gradient Background agar Chart terlihat modern
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0.0)');

    // Setup Chart Instance Baru
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Akan diisi oleh fungsi updateChart()
            datasets: [{
                label: 'GDP Growth',
                data: [],
                borderColor: '#007bff', // Warna Biru Utama
                backgroundColor: gradient,
                borderWidth: 3,
                tension: 0.3, // Membuat garis sedikit melengkung (wavy) agar terlihat dinamis
                pointRadius: 3,
                pointHoverRadius: 6,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true },
                tooltip: { 
                    mode: 'index', 
                    intersect: false,
                    callbacks: {
                        // Kustomisasi label tooltip agar ada unitnya
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + (currentMetric === 'GDP' ? ' T IDR' : ' K');
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: { 
                    grid: { display: false } // Hilangkan grid vertikal agar bersih
                },
                y: { 
                    display: false, // Hilangkan angka axis Y di kiri
                    min: 0 
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });

    // ---------------------------------------------------------
    // 5. EVENT LISTENERS (Interaksi User)
    // ---------------------------------------------------------
    
    // Listener: Ganti Metric (GDP / Employment)
    const metricSelect = document.getElementById('metricSelect');
    if(metricSelect) {
        metricSelect.addEventListener('change', function() {
            currentMetric = this.value;
            updateChart();
            updateSidebar();
        });
    }

    // Listener: Ganti Sector (Tech / Manu / Agri)
    const sectorSelect = document.getElementById('sectorSelect');
    if(sectorSelect) {
        sectorSelect.addEventListener('change', function() {
            currentSector = this.value;
            updateChart();
            updateSidebar();
        });
    }

    // Listener: Ganti Region (Indonesia / Asia)
    const regionSelect = document.getElementById('regionSelect');
    if(regionSelect) {
        regionSelect.addEventListener('change', function() {
            currentRegion = this.value;
            updateChart();
            updateSidebar();
        });
    }

    // Listener: Toggle Compare Mode
    const compareToggle = document.getElementById('compareToggle');
    if(compareToggle) {
        compareToggle.addEventListener('change', function() {
            isCompareMode = this.checked;
            updateChart();
        });
    }

    // Listener: Slider Tahun
    const yearSlider = document.getElementById('yearRange');
    const currentYearDisplay = document.getElementById('currentYear');
    if (yearSlider && currentYearDisplay) {
        yearSlider.addEventListener('input', function() {
            maxYear = parseInt(this.value);
            currentYearDisplay.textContent = maxYear; // Update teks tahun di sebelah slider
            updateChart();
        });
    }

    // Panggil fungsi update pertama kali saat halaman dibuka
    updateChart();
    updateSidebar();
});
