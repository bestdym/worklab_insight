document.addEventListener("DOMContentLoaded", () => {
    console.log("System Loaded: Charts with Y-Axis Enabled.");

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const leftChartData = {
        "Manufacturing": [65, 64, 66, 68, 70, 69, 71, 73, 72, 74, 75, 76],
        "Digital & ICT": [20, 45, 35, 60, 40, 55, 30, 65, 45, 70, 50, 85],
        "Agriculture": [50, 55, 60, 80, 85, 90, 85, 60, 55, 50, 45, 40],
        "Mining": [40, 38, 35, 32, 30, 35, 45, 55, 60, 58, 55, 50],
        "Retail": [30, 35, 40, 42, 45, 40, 38, 45, 55, 65, 80, 95],
        "Finance": [55, 58, 60, 62, 65, 70, 72, 75, 74, 78, 80, 82]
    };

    const rightChartData = {
        "Manufacturing": [18.2, 18.8, 17.9, 18.5, 18.1, 19.0, 18.3, 18.7, 17.8, 18.4, 18.9, 18.2],
        "Digital & ICT": [5.5, 5.2, 5.8, 5.4, 6.1, 5.6, 5.9, 5.3, 6.0, 5.7, 6.2, 5.5],
        "Agriculture": [38.5, 36.2, 39.1, 37.5, 36.8, 38.9, 39.5, 36.5, 37.2, 38.8, 36.0, 37.8],
        "Mining": [1.25, 1.45, 1.15, 1.35, 1.50, 1.20, 1.40, 1.10, 1.30, 1.48, 1.22, 1.38],
        "Retail": [13.8, 14.5, 13.2, 14.1, 13.5, 15.0, 13.9, 14.6, 13.4, 14.8, 13.6, 15.2],
        "Finance": [3.10, 3.25, 2.95, 3.15, 3.30, 3.05, 3.28, 2.98, 3.12, 3.26, 3.00, 3.18]
    };

    const initCharts = () => {
        if (typeof Chart === 'undefined') return;

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 },
            transitions: {
                active: { animation: { duration: 400, easing: 'easeOutQuart' } }
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
                    usePointStyle: true,
                    titleFont: { size: 13, weight: 'bold' },
                    callbacks: {
                        label: function(context) {
                            let val = context.parsed.y;
                            if (context.chart.canvas.id === 'sectorChart') return val + '% Growth';
                            if (context.chart.canvas.id === 'sectorTotalChart') return val + ' Juta Pekerja';
                            return val;
                        }
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
                y: { display: true, grid: { color: '#f3f4f6', drawBorder: false }, ticks: { color: '#9ca3af', maxTicksLimit: 6 } }
            },
            elements: {
                point: { radius: 0, hitRadius: 20, hoverRadius: 8, hoverBorderWidth: 3, hoverBackgroundColor: '#ffffff' },
                line: { tension: 0.4 }
            }
        };

        const ctx1 = document.getElementById('unemploymentChart');
        if (ctx1) {
            new Chart(ctx1.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023', 'Q1 24', 'Q2 24'],
                    datasets: [{ label: 'Unemployment', data: [3.2, 5.0, 4.2, 3.5, 4.8, 3.0, 2.5], borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', fill: true }]
                },
                options: commonOptions
            });
        }

        const ctx2 = document.getElementById('laborChart');
        if (ctx2) {
            new Chart(ctx2.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023', 'Q1 24', 'Q2 24'],
                    datasets: [{ label: 'Labor Force', data: [4.5, 3.0, 4.2, 3.5, 5.5, 4.0, 6.0], borderColor: '#3b82f6', fill: false }]
                },
                options: commonOptions
            });
        }

        const ctxLeft = document.getElementById('sectorChart');
        const selectLeft = document.getElementById('sectorSelect');
        let leftChart;

        if (ctxLeft) {
            const gradLeft = ctxLeft.getContext('2d').createLinearGradient(0, 0, 0, 300);
            gradLeft.addColorStop(0, 'rgba(30, 58, 138, 0.2)');
            gradLeft.addColorStop(1, 'rgba(30, 58, 138, 0)');

            leftChart = new Chart(ctxLeft.getContext('2d'), {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Growth',
                        data: leftChartData["Digital & ICT"],
                        borderColor: '#1e3a8a',
                        backgroundColor: gradLeft,
                        borderWidth: 3,
                        fill: true
                    }]
                },
                
                options: { 
                    ...commonOptions, 
                    scales: { 
                        x: { display: true, grid: { display: false } }, 
                        y: { display: true, grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af' } } 
                    } 
                }
            });

            if (selectLeft) {
                selectLeft.addEventListener('change', function() {
                    const val = this.value;
                    const newData = leftChartData[val];
                    if (newData) {
                        leftChart.data.datasets[0].data = newData;
                        leftChart.update();
                        ctxLeft.classList.remove('slide-active');
                        setTimeout(() => ctxLeft.classList.add('slide-active'), 50);
                    }
                });
            }
        }

        const ctxRight = document.getElementById('sectorTotalChart');
        const selectRight = document.getElementById('totalWorkersSelect');
        let rightChart;

        if (ctxRight) {
            const gradRight = ctxRight.getContext('2d').createLinearGradient(0, 0, 0, 300);
            gradRight.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
            gradRight.addColorStop(1, 'rgba(16, 185, 129, 0)');

            rightChart = new Chart(ctxRight.getContext('2d'), {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Workers',
                        data: rightChartData["Digital & ICT"],
                        borderColor: '#10b981',
                        backgroundColor: gradRight,
                        borderWidth: 3,
                        fill: true
                    }]
                },
                options: { 
                    ...commonOptions, 
                    scales: { 
                        x: { display: true, grid: { display: false } }, 
                        y: { display: true, grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af' } } 
                    } 
                }
            });

            if (selectRight) {
                selectRight.addEventListener('change', function() {
                    const val = this.value;
                    const newData = rightChartData[val];
                    if (newData) {
                        rightChart.data.datasets[0].data = newData;
                        rightChart.update();
                        ctxRight.classList.remove('slide-active');
                        setTimeout(() => ctxRight.classList.add('slide-active'), 50);
                    }
                });
            }
        }
    };

    const initOthers = () => {
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.toggle('dark-mode');
                const icon = document.getElementById('themeIcon');
                if (icon) {
                    if (document.body.classList.contains('dark-mode')) {
                        icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
                    } else {
                        icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
                    }
                }
            });
        }

        const mobileBtn = document.getElementById('mobileMenuBtn');
        const deskMenu = document.getElementById('desktopMenu');
        if (mobileBtn && deskMenu) {
            mobileBtn.addEventListener('click', () => deskMenu.classList.toggle('hidden'));
        }

        setTimeout(() => {
            document.querySelectorAll('canvas').forEach(c => c.classList.add('slide-active'));
        }, 500);
    };

    initCharts();
    initOthers();
});










const dummyData = {
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

    '2024': {
        'All': {
            age: [25, 55, 85, 80, 55, 35], 
            gender: [51, 49], 
            total: "145M",   
            edu: [50, 70, 40, 15], 
            unemployment: "11.4%" 
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

let ageChart, genderChart, eduChart;
function getData(year, region) {
    if (dummyData[year] && dummyData[year][region]) {
        return dummyData[year][region];
    } 
    else if (dummyData[year] && dummyData[year]['All']) {
        return dummyData[year]['All'];
    }
    return dummyData['2023']['All'];
}

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

function updateDashboard() {
    const region = document.getElementById('regionFilter').value;
    const year = document.getElementById('yearFilter').value;
    const currentData = getData(year, region);

    ageChart.data.datasets[0].data = currentData.age;
    ageChart.update();

    genderChart.data.datasets[0].data = currentData.gender;
    genderChart.update();
    
    eduChart.data.datasets[0].data = currentData.edu;
    eduChart.update();

    document.getElementById('totalWorkforce').innerText = currentData.total;
    document.getElementById('malePct').innerText = currentData.gender[0] + "%";
    document.getElementById('femalePct').innerText = currentData.gender[1] + "%";
    document.getElementById('unemploymentRate').innerText = currentData.unemployment;
    
    const unemploymentEl = document.getElementById('unemploymentRate');
    if (parseFloat(currentData.unemployment) > 10) {
        unemploymentEl.style.color = "#dc2626"; 
    } else {
        unemploymentEl.style.color = "#1e3a8a"; 
    }
}

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







const sectorMap = {
    'Technology': 'Teknologi',
    'Manufacturing': 'Manufaktur',
    'Agriculture': 'Pertanian',
    'Mining': 'Pertambangan',
    'Retail': 'Ritel',
    'Finance': 'Keuangan'
};

const dataStore = {
    GDP: {
        Technology: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [750, 820, 790, 950, 1100, 1050, 1250, 1400, 1380, 1550, 1650, 1800, 1750, 1900, 2100],
                growth: '+180%',
                summary: { label: 'PDB Teknologi', val: '750T → 2100T IDR', percent: '↑ +180%' },
                takeaways: ['Lonjakan tinggi pasca-pandemi (2020+).', 'Koreksi pasar terjadi di 2015 dan 2022.', 'Sektor growth tertinggi namun volatil.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [800, 900, 880, 1050, 1200, 1150, 1350, 1500, 1480, 1650, 1850, 1950, 1900, 2050, 2200],
                growth: '+175%',
                summary: { label: 'PDB Teknologi (Asia)', val: '800T → 2200T IDR', percent: '↑ +175%' },
                takeaways: ['Tren Asia mengikuti pola global.', 'Investasi startup mendorong volatilitas.', 'Pemulihan cepat setelah koreksi.']
            }
        },
        Manufacturing: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [2800, 2950, 2900, 3050, 3150, 3100, 3200, 3350, 3400, 3300, 2900, 3100, 3300, 3250, 3450],
                growth: '+23.2%',
                summary: { label: 'PDB Manufaktur', val: '2800T → 3450T IDR', percent: '↑ +23.2%' },
                takeaways: ['Dampak signifikan pandemi di 2020.', 'Pemulihan lambat namun pasti di 2021-2024.', 'Fluktuasi mengikuti demand global.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [3000, 3150, 3100, 3250, 3350, 3300, 3450, 3600, 3650, 3550, 3100, 3300, 3500, 3550, 3700],
                growth: '+23.3%',
                summary: { label: 'PDB Manufaktur (Asia)', val: '3000T → 3700T IDR', percent: '↑ +23.3%' },
                takeaways: ['Basis produksi Asia kuat.', 'Drop signifikan di 2020 akibat lockdown.', 'Supply chain pulih di 2022.']
            }
        },
        Agriculture: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1050, 1120, 1080, 1150, 1000, 1050, 980, 1020, 990, 1010, 1080, 1030, 990, 950, 980],
                growth: '-6.6%',
                summary: { label: 'PDB Pertanian', val: '1050T → 980T IDR', percent: '↓ -6.6%' },
                takeaways: ['Sangat fluktuatif karena faktor cuaca.', 'Menjadi penyangga ekonomi saat krisis 2020.', 'Tren jangka panjang menurun.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1100, 1180, 1120, 1190, 1050, 1100, 1020, 1080, 1040, 1060, 1120, 1080, 1020, 980, 1000],
                growth: '-9.0%',
                summary: { label: 'PDB Pertanian (Asia)', val: '1100T → 1000T IDR', percent: '↓ -9.0%' },
                takeaways: ['Modernisasi mengurangi porsi agrikultur.', 'Volatilitas harga komoditas terlihat jelas.', 'Stabilisasi di level rendah.']
            }
        },
        Mining: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1400, 1450, 1420, 1500, 1550, 1480, 1520, 1600, 1650, 1700, 1550, 1750, 1900, 1850, 1900],
                growth: '+35.7%',
                summary: { label: 'PDB Pertambangan', val: '1400T → 1900T IDR', percent: '↑ +35.7%' },
                takeaways: ['Harga komoditas global sangat berpengaruh.', 'Lonjakan batubara/nikel di 2022.', 'Investasi smelter mendorong nilai tambah.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1500, 1550, 1520, 1600, 1650, 1600, 1650, 1750, 1800, 1850, 1700, 1900, 2050, 2000, 2100],
                growth: '+40.0%',
                summary: { label: 'PDB Pertambangan (Asia)', val: '1500T → 2100T IDR', percent: '↑ +40.0%' },
                takeaways: ['Permintaan energi China mendominasi.', 'Transisi energi mempengaruhi tren.', 'Stabilisasi harga di 2024.']
            }
        },
        Retail: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [900, 950, 1000, 1050, 1100, 1120, 1150, 1200, 1250, 1280, 1000, 1100, 1200, 1250, 1300],
                growth: '+44.4%',
                summary: { label: 'PDB Ritel', val: '900T → 1300T IDR', percent: '↑ +44.4%' },
                takeaways: ['Konsumsi rumah tangga pondasi utama.', 'Jatuh tajam saat PSBB 2020.', 'E-commerce mendisrupsi ritel fisik.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1000, 1080, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1200, 1350, 1450, 1550, 1600],
                growth: '+60.0%',
                summary: { label: 'PDB Ritel (Asia)', val: '1000T → 1600T IDR', percent: '↑ +60.0%' },
                takeaways: ['Kelas menengah Asia mendorong growth.', 'Digitalisasi ritel sangat cepat.', 'Pemulihan pariwisata membantu ritel.']
            }
        },
        Finance: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1550, 1650, 1600, 1680, 1750, 1800, 1850],
                growth: '+68.1%',
                summary: { label: 'PDB Keuangan', val: '1100T → 1850T IDR', percent: '↑ +68.1%' },
                takeaways: ['Pertumbuhan stabil meski krisis.', 'Fintech memperluas akses keuangan.', 'Suku bunga tinggi di 2023 menahan laju.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1200, 1280, 1350, 1400, 1480, 1550, 1620, 1700, 1800, 1900, 1850, 1950, 2050, 2150, 2250],
                growth: '+87.5%',
                summary: { label: 'PDB Keuangan (Asia)', val: '1200T → 2250T IDR', percent: '↑ +87.5%' },
                takeaways: ['Pusat keuangan (SG, HK) dominan.', 'Adopsi pembayaran digital masif.', 'Ketahanan sektor perbankan kuat.']
            }
        }
    },
    Employment: {
        Technology: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [50, 52, 58, 55, 65, 70, 68, 80, 95, 110, 105, 120, 115, 130, 145],
                growth: '+190%',
                summary: { label: 'Pekerja Teknologi', val: '50K → 145K', percent: '↑ +190%' },
                takeaways: ['Permintaan talenta digital sangat tinggi.', 'Sedikit penurunan (layoff) di 2022.', 'Recovery cepat di 2023.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [60, 65, 72, 70, 80, 85, 82, 95, 110, 125, 120, 135, 130, 145, 160],
                growth: '+166%',
                summary: { label: 'Pekerja Teknologi (Asia)', val: '60K → 160K', percent: '↑ +166%' },
                takeaways: ['Hub teknologi Asia terus merekrut.', 'Persaingan talenta menyebabkan churn rate.', 'Tren remote work terlihat.']
            }
        },
        Manufacturing: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [200, 210, 205, 215, 225, 220, 230, 240, 235, 245, 210, 230, 250, 255, 260],
                growth: '+30%',
                summary: { label: 'Pekerja Manufaktur', val: '200K → 260K', percent: '↑ +30%' },
                takeaways: ['PHK massal terlihat saat pandemi 2020.', 'Rebound penyerapan tenaga kerja di 2022.', 'Automasi mulai menekan pertumbuhan.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [220, 230, 225, 235, 245, 240, 250, 260, 255, 265, 230, 250, 270, 275, 280],
                growth: '+27%',
                summary: { label: 'Pekerja Manufaktur (Asia)', val: '220K → 280K', percent: '↑ +27%' },
                takeaways: ['Pola serupa dengan Indonesia.', 'Pemulihan sektor riil pasca pandemi.', 'Pertumbuhan melambat dibanding tech.']
            }
        },
        Agriculture: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [150, 155, 145, 148, 140, 142, 135, 138, 130, 128, 135, 130, 125, 122, 120],
                growth: '-20%',
                summary: { label: 'Pekerja Pertanian', val: '150K → 120K', percent: '↓ -20%' },
                takeaways: ['Urbanisasi mengurangi petani muda.', 'Spike kecil di 2020 fenomena "pulang kampung".', 'Penurunan struktural berlanjut.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [160, 165, 155, 158, 150, 152, 145, 148, 140, 138, 145, 140, 135, 132, 130],
                growth: '-18.7%',
                summary: { label: 'Pekerja Pertanian (Asia)', val: '160K → 130K', percent: '↓ -18.7%' },
                takeaways: ['Mekanisasi menggantikan tenaga kerja.', 'Penyerapan tenaga kerja terendah.', 'Peralihan ke sektor jasa.']
            }
        },
        Mining: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [30, 32, 35, 38, 36, 34, 35, 38, 40, 42, 38, 40, 45, 48, 50],
                growth: '+66.6%',
                summary: { label: 'Pekerja Pertambangan', val: '30K → 50K', percent: '↑ +66.6%' },
                takeaways: ['Padat modal, bukan padat karya.', 'Peningkatan skill untuk operasi alat berat.', 'Lokasi kerja remote jadi tantangan.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [35, 38, 40, 42, 40, 38, 40, 42, 45, 48, 44, 46, 50, 52, 55],
                growth: '+57.1%',
                summary: { label: 'Pekerja Tambang (Asia)', val: '35K → 55K', percent: '↑ +57.1%' },
                takeaways: ['Automasi tambang mengurangi headcount.', 'Fokus pada keselamatan kerja (K3).', 'Pertumbuhan moderat.']
            }
        },
        Retail: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 220, 240, 260, 280, 290],
                growth: '+61.1%',
                summary: { label: 'Pekerja Ritel', val: '180K → 290K', percent: '↑ +61.1%' },
                takeaways: ['Penyerap tenaga kerja terbesar kedua.', 'Shift ke logistik/kurir e-commerce.', 'Banyak pekerja informal.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 240, 260, 280, 300, 310],
                growth: '+55.0%',
                summary: { label: 'Pekerja Ritel (Asia)', val: '200K → 310K', percent: '↑ +55.0%' },
                takeaways: ['Sektor jasa mendominasi pasar kerja.', 'Kebutuhan staf digital marketing naik.', 'Recovery pasca pandemi solid.']
            }
        },
        Finance: {
            Indonesia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [40, 42, 45, 48, 50, 52, 55, 58, 60, 65, 62, 65, 68, 70, 75],
                growth: '+87.5%',
                summary: { label: 'Pekerja Keuangan', val: '40K → 75K', percent: '↑ +87.5%' },
                takeaways: ['Mencari talenta skill tinggi (analis/IT).', 'Efisiensi bank mengurangi staf cabang.', 'Growth di sektor asuransi & fintech.']
            },
            Asia: {
                labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                data: [50, 55, 58, 60, 65, 68, 70, 75, 80, 85, 82, 85, 90, 95, 100],
                growth: '+100%',
                summary: { label: 'Pekerja Keuangan (Asia)', val: '50K → 100K', percent: '↑ +100%' },
                takeaways: ['Hub finansial (SG) menyerap ekspat.', 'Permintaan compliance & risk officer naik.', 'Gaji kompetitif menarik talenta.']
            }
        }
    }
};

let currentMetric = 'GDP';
let currentSector = 'Technology';
let currentRegion = 'Indonesia';
let compareSector = 'Manufacturing'; 
let isCompareMode = false;
let maxYear = 2024;
let chartInstance = null;

function updateChart() {
    if (!chartInstance) return;
    const data = dataStore[currentMetric][currentSector][currentRegion];
    const filteredLabels = data.labels.filter((_, i) => parseInt(data.labels[i]) <= maxYear);
    const filteredData = data.data.slice(0, filteredLabels.length);

    chartInstance.data.labels = filteredLabels;
    chartInstance.data.datasets[0].data = filteredData;
    
    const metricName = currentMetric === 'GDP' ? 'Pertumbuhan PDB' : 'Pertumbuhan Tenaga Kerja';
    const sectorName = sectorMap[currentSector] || currentSector;
    
    chartInstance.data.datasets[0].label = `${metricName} (${sectorName})`;
    
    if (isCompareMode) {
        const compareData = dataStore[currentMetric][compareSector][currentRegion];
        const compareFilteredData = compareData.data.slice(0, filteredLabels.length);
        const compareSectorName = sectorMap[compareSector] || compareSector;

        chartInstance.data.datasets[1] = {
            label: `${metricName} (${compareSectorName})`,
            data: compareFilteredData,
            borderColor: '#28a745', 
            backgroundColor: 'rgba(40, 167, 69, 0.05)',
            borderWidth: 2,
            borderDash: [5, 5], 
            tension: 0.3, 
            pointRadius: 2,
            pointHoverRadius: 5,
            fill: false
        };
    } else {
        if (chartInstance.data.datasets[1]) {
            chartInstance.data.datasets.splice(1, 1); 
        }
    }

    chartInstance.update();
}

function updateSidebar() {
    const data = dataStore[currentMetric][currentSector][currentRegion];
    const bigStatEl = document.getElementById('bigStat');
    
    if (bigStatEl) {
        const lastVal = data.data[data.data.length - 1];
        const unit = currentMetric === 'GDP' ? 'T IDR' : 'Ribu';
        const growthClass = data.growth.includes('+') ? 'positive' : 'negative';
        bigStatEl.innerHTML = `${lastVal} ${unit} <span class="growth ${growthClass}">↗ ${data.growth}</span>`;
    }

    const chartTitle = document.getElementById('chartTitle');
    const chartSubtitle = document.getElementById('chartSubtitle');
    
    if (chartTitle) {
        const metricName = currentMetric === 'GDP' ? 'PDB' : 'Tenaga Kerja';
        const sectorName = sectorMap[currentSector] || currentSector;
        chartTitle.textContent = `Pertumbuhan ${metricName} di Sektor ${sectorName}`;
    }
    
    if (chartSubtitle) {
        chartSubtitle.textContent = `Nilai (dalam ${currentMetric === 'GDP' ? 'Triliun IDR' : 'Ribuan'})`;
    }
    
    const sectors = ['Technology', 'Manufacturing', 'Agriculture', 'Mining', 'Retail', 'Finance'];

    sectors.forEach((sector, index) => {
        const sectorData = dataStore[currentMetric][sector][currentRegion];
        const statLabel = document.getElementById(`statLabel${index + 1}`);
        const statVal = document.getElementById(`statVal${index + 1}`);
        const statPercent = document.getElementById(`statPercent${index + 1}`);
        
        if(statLabel && statVal && statPercent) {
            statLabel.textContent = sectorData.summary.label;
            statVal.textContent = sectorData.summary.val;
            statPercent.textContent = sectorData.summary.percent;
            statPercent.className = `stat-percent ${sectorData.summary.percent.includes('↑') ? 'positive' : 'negative'}`;
        }
    });

    const takeawaysList = document.getElementById('takeawaysList');
    if(takeawaysList) {
        takeawaysList.innerHTML = data.takeaways.map(item => `<li>${item}</li>`).join('');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('growthChart');
    
    if (!ctx) {
        console.error('Canvas element #growthChart not found.');
        return;
    }

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0.0)');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], 
            datasets: [{
                label: 'Pertumbuhan PDB', 
                data: [],
                borderColor: '#007bff', 
                backgroundColor: gradient,
                borderWidth: 3,
                tension: 0.3,
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
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + (currentMetric === 'GDP' ? ' T IDR' : ' Ribu');
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: { 
                    grid: { display: false } 
                },
                y: { 
                    display: false, 
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

    const metricSelect = document.getElementById('metricSelect');
    if(metricSelect) {
        metricSelect.addEventListener('change', function() {
            currentMetric = this.value;
            updateChart();
            updateSidebar();
        });
    }

    const sectorSelect = document.getElementById('sectorSelect');
    if(sectorSelect) {
        sectorSelect.addEventListener('change', function() {
            currentSector = this.value;
            updateChart();
            updateSidebar();
        });
    }

    const compareSectorSelect = document.getElementById('compareSectorSelect');
    if(compareSectorSelect) {
        compareSectorSelect.addEventListener('change', function() {
            compareSector = this.value;
            updateChart();
        });
    }

    const regionSelect = document.getElementById('regionSelect');
    if(regionSelect) {
        regionSelect.addEventListener('change', function() {
            currentRegion = this.value;
            updateChart();
            updateSidebar();
        });
    }

    const compareToggle = document.getElementById('compareToggle');
    if(compareToggle) {
        compareToggle.addEventListener('change', function() {
            isCompareMode = this.checked;
            
            const compareDropdown = document.getElementById('compareSectorSelect');
            if (compareDropdown) {
                compareDropdown.style.display = isCompareMode ? 'inline-block' : 'none';
            }

            updateChart();
        });
    }

    const yearSlider = document.getElementById('yearRange');
    const currentYearDisplay = document.getElementById('currentYear');
    if (yearSlider && currentYearDisplay) {
        yearSlider.addEventListener('input', function() {
            maxYear = parseInt(this.value);
            currentYearDisplay.textContent = maxYear; 
            updateChart();
        });
    }

    updateChart();
    updateSidebar();
});