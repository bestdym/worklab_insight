const sectorMap = {
    'Technology': 'Teknologi',
    'Manufacturing': 'Manufaktur',
    'Agriculture': 'Pertanian',
    'Mining': 'Pertambangan',
    'Retail': 'Ritel',
    'Finance': 'Keuangan'
};

const correlationData = {
    Technology: "Pertumbuhan PDB sektor Teknologi yang eksponensial (+180%) memiliki hubungan erat dengan penyerapan tenaga kerja (+190%). Ketika ekonomi digital tumbuh, permintaan akan layanan aplikasi dan data meningkat, mendorong perusahaan startup dan korporasi untuk melakukan ekspansi besar-besaran dan merekrut talenta digital (Hukum Okun).",
    Manufacturing: "Di sektor Manufaktur, kualitas pertumbuhan mulai bergeser. Pertumbuhan PDB (+23.2%) didorong oleh otomatisasi mesin (capital-intensive), sehingga penyerapan tenaga kerja (+30%) tumbuh namun tidak secepat nilai outputnya. Tantangan saat ini adalah meningkatkan skill pekerja agar bisa berkolaborasi dengan teknologi pabrik cerdas.",
    Agriculture: "Sektor Pertanian mengalami fenomena transformasi struktural. Penurunan PDB (-6.6%) dan tenaga kerja (-20%) menandakan peralihan ekonomi dari agraris ke industri/jasa. Banyak tenaga kerja muda berpindah ke kota (urbanisasi), meninggalkan lahan pertanian yang kini dituntut untuk lebih efisien menggunakan teknologi mekanisasi.",
    Mining: "Sektor Pertambangan menunjukkan anomali unik. Nilai ekonomi (PDB) melonjak drastis (+35.7%) akibat harga komoditas global, namun penyerapan tenaga kerjanya relatif kecil karena sifat industri yang padat modal. Investasi besar di alat berat meningkatkan output tanpa memerlukan rekrutmen massal seperti di sektor ritel.",
    Retail: "Sektor Ritel adalah bukti nyata ekonomi inklusif. Pertumbuhan PDB (+44.4%) langsung berdampak pada lonjakan penyerapan tenaga kerja (+61.1%). Sektor ini sangat responsif: setiap kenaikan konsumsi masyarakat langsung membuka lowongan untuk pramuniaga, kurir logistik, hingga admin toko online.",
    Finance: "Sektor Keuangan tumbuh sangat pesat (+68.1%) secara nilai, namun pola kerjanya berubah. Penyerapan tenaga kerja tinggi (+87.5%) tidak lagi didominasi oleh staf cabang bank, melainkan oleh talenta spesialis (IT Security, Analis Data, Compliance). Ini menunjukkan pergeseran ke arah pekerjaan bernilai tambah tinggi."
};

const modalContent = {
    uptrend: {
        title: "Dampak Ekonomi Naik (Ekspansi)",
        desc: "Fase di mana aktivitas ekonomi meningkat, ditandai dengan kenaikan PDB.",
        list: [
            "Permintaan barang & jasa tinggi, perusahaan butuh lebih banyak staf.",
            "Daya tawar pekerja meningkat, gaji cenderung naik.",
            "Munculnya peluang bisnis baru (UMKM bertambah).",
            "Pemerintah mendapatkan pajak lebih banyak untuk pembangunan."
        ],
        color: "blue",
        icon: "fa-arrow-up"
    },
    investment: {
        title: "Peran Investasi",
        desc: "Penanaman modal (asing/dalam negeri) untuk mengembangkan kapasitas produksi.",
        list: [
            "Membuka pabrik atau kantor cabang baru = Lowongan kerja masif.",
            "Transfer teknologi dan peningkatan skill pekerja lokal.",
            "Meningkatkan daya saing produk nasional di pasar global.",
            "Efek berganda (multiplier effect) ke pedagang sekitar area industri."
        ],
        color: "green",
        icon: "fa-money-bill-wave"
    },
    recession: {
        title: "Dampak Resesi (Kontraksi)",
        desc: "Penurunan aktivitas ekonomi yang signifikan berlangsung berbulan-bulan.",
        list: [
            "Perusahaan melakukan efisiensi biaya, seringkali melalui PHK.",
            "Pembekuan rekrutmen (Hiring Freeze).",
            "Daya beli masyarakat turun, sektor ritel terpukul.",
            "Peralihan tenaga kerja ke sektor informal (ojek online, dsb) meningkat."
        ],
        color: "red",
        icon: "fa-exclamation-triangle"
    }
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

const dummyData = {
    '2025': {
        'All': { age: [15, 45, 80, 85, 65, 40], gender: [52, 48], total: "138Jt", edu: [60, 60, 30, 10], unemployment: "14.5%" },
        'Java': { age: [20, 50, 70, 75, 50, 30], gender: [53, 47], total: "78Jt", edu: [55, 65, 25, 10], unemployment: "13.8%" },
        'Sumatra': { age: [10, 40, 60, 60, 50, 30], gender: [51, 49], total: "30Jt", edu: [70, 40, 20, 5], unemployment: "15.2%" },
        'Kalimantan': { age: [10, 30, 40, 50, 40, 20], gender: [65, 35], total: "12Jt", edu: [60, 40, 15, 5], unemployment: "12.5%" }
    },
    '2024': {
        'All': { age: [25, 55, 85, 80, 55, 35], gender: [51, 49], total: "145Jt", edu: [50, 70, 40, 15], unemployment: "11.4%" },
        'Java': { age: [30, 60, 75, 70, 45, 25], gender: [54, 46], total: "82Jt", edu: [40, 80, 50, 20], unemployment: "10.5%" },
        'Sumatra': { age: [20, 45, 65, 55, 45, 28], gender: [50, 50], total: "33Jt", edu: [55, 50, 25, 8], unemployment: "12.1%" },
        'Kalimantan': { age: [15, 35, 45, 45, 35, 18], gender: [62, 38], total: "14Jt", edu: [55, 45, 18, 5], unemployment: "9.5%" }
    },
    '2023': {
        'All': { age: [35, 65, 90, 70, 50, 30], gender: [51, 49], total: "150Jt", edu: [40, 85, 50, 25], unemployment: "8.2%" },
        'Java': { age: [40, 70, 80, 60, 40, 20], gender: [55, 45], total: "85Jt", edu: [30, 95, 60, 30], unemployment: "7.5%" },
        'Sumatra': { age: [30, 50, 70, 50, 40, 25], gender: [50, 50], total: "35Jt", edu: [45, 60, 30, 10], unemployment: "9.1%" },
        'Kalimantan': { age: [20, 40, 50, 40, 30, 15], gender: [60, 40], total: "15Jt", edu: [50, 50, 20, 5], unemployment: "6.8%" }
    },
    '2022': {
        'All': { age: [38, 62, 85, 75, 45, 28], gender: [52, 48], total: "148Jt", edu: [45, 80, 45, 20], unemployment: "9.5%" }
    },
    '2021': {
        'All': { age: [40, 60, 80, 70, 40, 25], gender: [53, 47], total: "142Jt", edu: [50, 75, 40, 15], unemployment: "10.2%" }
    }
};

let jobsData = [];
let selectedJob = null;
let currentMetric = 'GDP';
let currentSector = 'Technology';
let currentRegion = 'Indonesia';
let compareSector = 'Manufacturing';
let isCompareMode = false;
let maxYear = 2024;
let chartInstance = null;
let ageChart, genderChart, eduChart;

const detailData = {
    'faktorPHK': {
        title: "Analisis Mendalam: Pemicu PHK Massal",
        icon: '<i class="fas fa-chart-line text-red-600"></i>',
        headerColor: 'bg-red-50',
        content: `<p class="font-semibold text-gray-800 mb-2">1. Koreksi Pasar Pasca-Pandemi</p><p class="mb-4">Selama pandemi, perusahaan teknologi merekrut secara agresif ("overhiring")...</p><p class="font-semibold text-gray-800 mb-2">2. Tekanan Investor & Suku Bunga Tinggi</p><p class="mb-4">Era "uang murah" (suku bunga rendah) telah berakhir...</p><p class="font-semibold text-gray-800 mb-2">3. Disrupsi AI Generatif</p><p>Adopsi teknologi AI seperti ChatGPT...</p>`
    },
    'magangIdeal': {
        title: "Standar Program Magang Berkualitas",
        icon: '<i class="fas fa-check-circle text-green-600"></i>',
        headerColor: 'bg-green-50',
        content: `<p>Magang yang ideal harus memenuhi prinsip <strong>Learning by Doing</strong>...</p>`
    },
    'eksploitasi': {
        title: "Red Flags: Tanda Eksploitasi Magang",
        icon: '<i class="fas fa-exclamation-triangle text-yellow-600"></i>',
        headerColor: 'bg-yellow-50',
        content: `<p class="mb-4">Banyak perusahaan menyalahgunakan label "magang"...</p>`
    }
};

const initJobsSystem = () => {
    const currentFile = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach((link) => {
        const href = link.getAttribute('href') || '';
        const file = href.split('/').pop();
        if (file === currentFile) link.classList.add('nav-active');
        else link.classList.remove('nav-active');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('nav-active'));
            this.classList.add('nav-active');
        });
    });

    const itemsPerPage = 9;
    let currentPage = 1;
    let filteredJobs = [];

    const createPageBtn = (text, onClick, isActive = false) => {
        const btn = document.createElement('button');
        btn.innerHTML = text;
        btn.className = `w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${isActive ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-blue-300'}`;
        btn.addEventListener('click', onClick);
        return btn;
    }

    const changePage = (page) => {
        currentPage = page;
        renderDisplay();
        const listings = document.getElementById('jobListings');
        if (listings) listings.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const renderDisplay = () => {
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

        const getTypeClass = (type) => {
            const t = (type || '').toLowerCase();
            if (t === 'full-time') return 'full-time';
            if (t.includes('magang') || t.includes('intern')) return 'magang';
            if (t.includes('contract') || t.includes('kontak')) return 'contract';
            if (t === 'remote') return 'remote';
            if (t === 'freelance') return 'freelance';
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
            if (detailBtn) detailBtn.addEventListener('click', () => openJobModal(job));
            const applyBtn = card.querySelector('.btn-apply');
            if (applyBtn) applyBtn.addEventListener('click', () => openApply(job));
        });

        if (totalPages > 1 && pagination) {
            if (currentPage > 1) pagination.appendChild(createPageBtn('<', () => changePage(currentPage - 1)));
            for (let i = 1; i <= totalPages; i++) pagination.appendChild(createPageBtn(i, () => changePage(i), i === currentPage));
            if (currentPage < totalPages) pagination.appendChild(createPageBtn('>', () => changePage(currentPage + 1)));
        }
    }

    const searchInput = document.getElementById('searchInput');
    const sectorFilter = document.getElementById('sectorFilter');
    const locationFilter = document.getElementById('locationFilter');
    const searchButton = document.getElementById('searchButton');

    const filterJobs = () => {
        const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const sector = sectorFilter ? sectorFilter.value : '';
        const loc = locationFilter ? locationFilter.value : '';

        const keywordMap = {
            'Digital & TIK': ['developer', 'react', 'node', 'ui', 'ux', 'tech', 'software', 'ict', 'it', 'golang', 'swift', 'network', 'security', 'seo', 'content', 'designer', 'game'],
            'Manufaktur': ['manufaktur', 'pabrik', 'teknisi', 'produksi', 'otomotif', 'mesin', 'maintenance'],
            'Keuangan': ['bank', 'finance', 'fintech', 'akuntansi', 'accounting', 'tax', 'pajak', 'analyst', 'kredit'],
            'Ritel': ['retail', 'ritel', 'kasir', 'supermarket', 'toko', 'e-commerce', 'kurir', 'barista', 'resepsionis', 'customer service', 'logistik'],
            'Pertanian': ['pertanian', 'agri', 'agriculture', 'pangan', 'perkebunan', 'ternak'],
            'Pertambangan': ['tambang', 'mining', 'batubara', 'miner', 'smelter']
        };

        filteredJobs = jobsData.filter(job => {
            const matchSearch = !term || job.title.toLowerCase().includes(term) || job.company.toLowerCase().includes(term);
            const matchLoc = !loc || job.location === loc;
            let matchSector = true;
            if (sector) {
                if (job.sector) matchSector = job.sector === sector;
                else {
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

    if (searchInput) {
        searchInput.addEventListener('keyup', filterJobs);
        sectorFilter.addEventListener('change', filterJobs);
        locationFilter.addEventListener('change', filterJobs);
        searchButton.addEventListener('click', filterJobs);
    }

    const setupDropdown = (btnId, listId, labelId, selectId) => {
        const btn = document.getElementById(btnId);
        const list = document.getElementById(listId);
        const label = document.getElementById(labelId);
        const select = document.getElementById(selectId);
        if (!btn || !list) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('[id^="list"]').forEach(el => { if (el.id !== listId) el.classList.add('hidden'); });
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

    const openJobModal = (job) => {
        const modal = document.getElementById('jobDetailModal');
        if (!modal) return;
        
        const elements = {
            'modalJobTitle': job.title,
            'modalCompanyLogo': job.logo || '',
            'modalCompanyName': job.company || '',
            'modalLocation': job.location || '',
            'modalJobType': job.type || '',
            'modalDescription': job.description || '',
            'modalDetails': job.details || ''
        };

        if(document.getElementById('modalJobTitle')) document.getElementById('modalJobTitle').textContent = job.title;
        if(document.getElementById('modalCompanyLogo')) document.getElementById('modalCompanyLogo').textContent = job.logo || '';
        if(document.getElementById('modalCompanyName')) document.getElementById('modalCompanyName').textContent = job.company || '';
        if(document.querySelector('#modalLocation span')) document.querySelector('#modalLocation span').textContent = job.location || '';
        if(document.getElementById('modalDescription')) document.getElementById('modalDescription').textContent = job.description || '';
        if(document.getElementById('modalDetails')) document.getElementById('modalDetails').textContent = job.details || '';

        const typeEl = document.getElementById('modalJobType');
        if (typeEl) {
            typeEl.textContent = job.type || '';
            typeEl.className = 'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ' + (job.type === 'Full-time' ? 'bg-blue-100 text-blue-700' : (job.type === 'Magang' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'));
        }

        const reqEl = document.getElementById('modalRequirements');
        if (reqEl) {
            reqEl.innerHTML = '';
            (Array.isArray(job.requirements) ? job.requirements : []).forEach(r => {
                const li = document.createElement('li');
                li.textContent = r;
                reqEl.appendChild(li);
            });
        }

        const benEl = document.getElementById('modalBenefits');
        if (benEl) {
            benEl.innerHTML = '';
            const defaultBenefits = ['Pengalaman industri nyata', 'Mentoring profesional', 'Jaringan', 'Soft skills', 'Sertifikasi', 'Potensi karier'];
            (Array.isArray(job.benefits) ? job.benefits : defaultBenefits).forEach(b => {
                const li = document.createElement('li');
                li.textContent = b;
                benEl.appendChild(li);
            });
        }

        selectedJob = job;
        modal.classList.remove('hidden');
    }

    window.openApply = (job) => {
        const applyModal = document.getElementById('applyModal');
        const title = document.getElementById('applyModalTitle');
        if (title) title.textContent = `Form Lamaran - ${job?.title || ''}`;
        if (applyModal) applyModal.classList.remove('hidden');
    }

    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) closeBtn.addEventListener('click', () => document.getElementById('jobDetailModal')?.classList.add('hidden'));
    
    const modalOverlay = document.getElementById('jobDetailModal');
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target.id === 'jobDetailModal') modalOverlay.classList.add('hidden'); });

    const detailBackBtn = document.getElementById('detailBackBtn');
    if (detailBackBtn) detailBackBtn.addEventListener('click', () => document.getElementById('jobDetailModal')?.classList.add('hidden'));
    
    const detailBackBottomBtn = document.getElementById('detailBackBottomBtn');
    if (detailBackBottomBtn) detailBackBottomBtn.addEventListener('click', () => document.getElementById('jobDetailModal')?.classList.add('hidden'));

    const closeApply = document.getElementById('closeApplyModal');
    if (closeApply) closeApply.addEventListener('click', () => document.getElementById('applyModal')?.classList.add('hidden'));
    
    const applyCancelBtn = document.getElementById('applyCancelBtn');
    if (applyCancelBtn) applyCancelBtn.addEventListener('click', () => document.getElementById('applyModal')?.classList.add('hidden'));
    
    const applyOverlay = document.getElementById('applyModal');
    if (applyOverlay) applyOverlay.addEventListener('click', (e) => { if (e.target.id === 'applyModal') applyOverlay.classList.add('hidden'); });

    const modalApplyBtn = document.getElementById('modalApplyButton');
    if(modalApplyBtn) modalApplyBtn.addEventListener('click', () => { if(selectedJob) window.openApply(selectedJob); });

    const applySendBtn = document.getElementById('applySendBtn');
    if (applySendBtn) applySendBtn.addEventListener('click', () => {
        const name = document.getElementById('applyName')?.value.trim();
        const wa = document.getElementById('applyWhatsapp')?.value.trim();
        const email = document.getElementById('applyEmail')?.value.trim();
        const address = document.getElementById('applyAddress')?.value.trim();
        if (!name || !wa || !email || !address) {
            alert('Mohon lengkapi Nama, WhatsApp, Email, dan Alamat.');
            return;
        }
        alert('Lamaran terkirim. Terima kasih!');
        document.getElementById('applyModal')?.classList.add('hidden');
    });

    const loadJobs = async () => {
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
};

const initRegionalData = () => {
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

    window.showRegionalData = function () {
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

    window.closeRegionalData = function () {
        document.getElementById('regionalDataModal').classList.add('hidden');
    }

    const regionalModal = document.getElementById('regionalDataModal');
    if (regionalModal) {
        regionalModal.addEventListener('click', (e) => {
            if (e.target.id === 'regionalDataModal') window.closeRegionalData();
        });
    }
};

// ==========================================
// FEATURE 3: SECTOR DASHBOARD & CHARTS (UPDATED)
// ==========================================
const initSectorDashboard = () => {
    // 1. Sector Cards Data
    const sectorData = {
        "Technology": {
            growth: "15.2%", growthBadge: "+2.1% YoY", growthDesc: "Didorong oleh AI & Digitalisasi",
            wage: "12,500,000", wageBadge: "High Paid", jobs: "14,205", jobsBadge: "Tinggi", jobsDesc: "Di seluruh portal",
            skill: "Data Analysis", skillDesc: "Dibutuhkan di 70% lowongan", chartData: [1.2, 2.5, 3.8, 5.5, 7.8], chartColor: '#3b82f6'
        },
        "Finance": {
            growth: "8.5%", growthBadge: "+1.4% YoY", growthDesc: "Stabil pasca pandemi",
            wage: "10,200,000", wageBadge: "Competitive", jobs: "8,450", jobsBadge: "Sedang", jobsDesc: "Fokus pada Fintech",
            skill: "Risk Mgmt", skillDesc: "Sertifikasi FRM diutamakan", chartData: [4.0, 4.2, 4.5, 4.8, 5.1], chartColor: '#8b5cf6'
        },
        "Healthcare": {
            growth: "10.1%", growthBadge: "+3.5% YoY", growthDesc: "Kebutuhan tenaga medis naik",
            wage: "8,800,000", wageBadge: "Rising", jobs: "12,100", jobsBadge: "Sangat Tinggi", jobsDesc: "Kekurangan suplai perawat",
            skill: "Patient Care", skillDesc: "STR aktif wajib", chartData: [3.0, 3.5, 4.2, 5.0, 6.2], chartColor: '#10b981'
        },
        "Manufacturing": {
            growth: "-1.8%", growthBadge: "Menurun", growthDesc: "Dampak otomatisasi",
            wage: "5,400,000", wageBadge: "Standard", jobs: "6,200", jobsBadge: "Rendah", jobsDesc: "Pabrik padat karya berkurang",
            skill: "Machine Ops", skillDesc: "Operasional mesin CNC", chartData: [6.0, 5.8, 5.5, 5.2, 5.0], chartColor: '#ef4444'
        },
        "Retail": {
            growth: "3.1%", growthBadge: "+0.2% YoY", growthDesc: "Peralihan ke E-commerce",
            wage: "4,200,000", wageBadge: "Entry Level", jobs: "22,500", jobsBadge: "Masif", jobsDesc: "Turnover karyawan tinggi",
            skill: "Sales", skillDesc: "Komunikasi & Negosiasi", chartData: [4.5, 4.0, 4.1, 4.3, 4.5], chartColor: '#f59e0b'
        },
        "Agriculture": {
            growth: "2.4%", growthBadge: "Stabil", growthDesc: "Musim panen raya",
            wage: "3,500,000", wageBadge: "Low", jobs: "15,000", jobsBadge: "Tinggi", jobsDesc: "Musiman",
            skill: "Farming", skillDesc: "Pengalaman lapangan", chartData: [3.0, 3.1, 3.2, 3.4, 3.5], chartColor: '#84cc16'
        },
        "Construction": {
            growth: "5.5%", growthBadge: "Naik", growthDesc: "Proyek IKN & Infrastruktur",
            wage: "4,800,000", wageBadge: "Medium", jobs: "9,000", jobsBadge: "Sedang", jobsDesc: "Proyek pemerintah",
            skill: "Civil Eng", skillDesc: "Sertifikasi K3", chartData: [2.0, 2.5, 3.5, 4.0, 5.0], chartColor: '#f97316'
        }
    };

    // 2. Main Employment Trend Chart (Ctx: employmentTrendChart)
    const ctx = document.getElementById('employmentTrendChart')?.getContext('2d');
    let employmentChart;

    const initMainChart = (data, color) => {
        if (!ctx) return;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, color + '80');
        gradient.addColorStop(1, color + '00');

        if (employmentChart) employmentChart.destroy();

        employmentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Employment (Millions)', data: data, borderColor: color, backgroundColor: gradient,
                    borderWidth: 4, pointBackgroundColor: '#fff', pointBorderColor: color, fill: true, tension: 0.4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { grid: { borderDash: [5, 5], color: '#f1f5f9' } }, x: { grid: { display: false } } },
                animation: { duration: 1500, easing: 'easeOutQuart' }
            }
        });
    }

    // 3. Side Charts (Growth & Total Workers)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Data untuk Chart Kiri (Pertumbuhan)
    const leftChartData = {
        "Manufacturing": [65, 64, 66, 68, 70, 69, 71, 73, 72, 74, 75, 76],
        "Digital & ICT": [20, 45, 35, 60, 40, 55, 30, 65, 45, 70, 50, 85],
        "Agriculture": [50, 55, 60, 80, 85, 90, 85, 60, 55, 50, 45, 40],
        "Mining": [40, 38, 35, 32, 30, 35, 45, 55, 60, 58, 55, 50],
        "Retail": [30, 35, 40, 42, 45, 40, 38, 45, 55, 65, 80, 95],
        "Finance": [55, 58, 60, 62, 65, 70, 72, 75, 74, 78, 80, 82]
    };

    // Data untuk Chart Kanan (Total Pekerja) - INI YANG KEMARIN HILANG
    const rightChartData = {
        "Manufacturing": [18.2, 18.8, 17.9, 18.5, 18.1, 19.0, 18.3, 18.7, 17.8, 18.4, 18.9, 18.2],
        "Digital & ICT": [5.5, 5.2, 5.8, 5.4, 6.1, 5.6, 5.9, 5.3, 6.0, 5.7, 6.2, 5.5],
        "Agriculture": [38.5, 36.2, 39.1, 37.5, 36.8, 38.9, 39.5, 36.5, 37.2, 38.8, 36.0, 37.8],
        "Mining": [1.25, 1.45, 1.15, 1.35, 1.50, 1.20, 1.40, 1.10, 1.30, 1.48, 1.22, 1.38],
        "Retail": [13.8, 14.5, 13.2, 14.1, 13.5, 15.0, 13.9, 14.6, 13.4, 14.8, 13.6, 15.2],
        "Finance": [3.10, 3.25, 2.95, 3.15, 3.30, 3.05, 3.28, 2.98, 3.12, 3.26, 3.00, 3.18]
    };

    const initSideCharts = () => {
        if (typeof Chart === 'undefined') return;

        const commonOptions = {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            elements: { line: { tension: 0.4 } }
        };

        // --- Chart Kiri (Growth) ---
        const ctxLeft = document.getElementById('sectorChart');
        const selectLeft = document.getElementById('sectorSelect');
        let leftChart;

        if (ctxLeft) {
            leftChart = new Chart(ctxLeft.getContext('2d'), {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{ label: 'Growth', data: leftChartData["Digital & ICT"] || [], borderColor: '#1e3a8a', borderWidth: 3, fill: true }]
                },
                options: commonOptions
            });

            if (selectLeft) {
                selectLeft.addEventListener('change', function () {
                    const val = this.value;
                    if (leftChartData[val]) {
                        leftChart.data.datasets[0].data = leftChartData[val];
                        leftChart.update();
                    }
                });
            }
        }

        // --- Chart Kanan (Total Workers) - BAGIAN INI DIPERBAIKI ---
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
                        data: rightChartData["Digital & ICT"] || [],
                        borderColor: '#10b981', // Green Color
                        backgroundColor: gradRight,
                        borderWidth: 3,
                        fill: true
                    }]
                },
                options: commonOptions
            });

            if (selectRight) {
                selectRight.addEventListener('change', function() {
                    const val = this.value;
                    const newData = rightChartData[val];
                    if (newData) {
                        rightChart.data.datasets[0].data = newData;
                        rightChart.update();
                    }
                });
            }
        }
    }

    // Initialize Calls
    if(sectorData['Technology']) initMainChart(sectorData['Technology'].chartData, sectorData['Technology'].chartColor);
    initSideCharts();
    
    // Animation Logic
    const replayAnimations = () => {
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

    // Dashboard Update Logic
    const updateDashboard = (sector) => {
        const data = sectorData[sector];
        if(!data) return; 

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

        initMainChart(data.chartData, data.chartColor);
    }
    
    // Sector Select Button
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
    
    replayAnimations();
};

    const initDemographics = () => {
        const getData = (year, region) => {
            if (dummyData[year] && dummyData[year][region]) return dummyData[year][region];
            else if (dummyData[year] && dummyData[year]['All']) return dummyData[year]['All'];
            return dummyData['2023']['All'];
        }

        const initAgeChart = (data) => {
            const el = document.getElementById('ageChart');
            if (!el) return;
            ageChart = new Chart(el.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
                    datasets: [{ data: data, backgroundColor: ['#d1d5db', '#d1d5db', '#1e3a8a', '#d1d5db', '#d1d5db', '#d1d5db'], borderRadius: 4 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }
            });
        }

        const initGenderChart = (data) => {
            const el = document.getElementById('genderChart');
            if (!el) return;
            genderChart = new Chart(el.getContext('2d'), {
                type: 'doughnut',
                data: { labels: ['Laki-laki', 'Perempuan'], datasets: [{ data: data, backgroundColor: ['#1e3a8a', '#60a5fa'], borderWidth: 0, cutout: '75%' }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
        }

        const initEduChart = (data) => {
            const el = document.getElementById('educationChart');
            if (!el) return;
            eduChart = new Chart(el.getContext('2d'), {
                type: 'bar',
                data: { labels: ['SMA', 'S1', 'S2', 'S3'], datasets: [{ data: data, backgroundColor: ['#d1d5db', '#1e3a8a', '#d1d5db', '#d1d5db'], borderRadius: 4 }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }
            });
        }

        window.updateDemographics = () => {
            const region = document.getElementById('regionFilter')?.value;
            const year = document.getElementById('yearFilter')?.value;
            const currentData = getData(year, region);

            if (ageChart) { ageChart.data.datasets[0].data = currentData.age; ageChart.update(); }
            if (genderChart) { genderChart.data.datasets[0].data = currentData.gender; genderChart.update(); }
            if (eduChart) { eduChart.data.datasets[0].data = currentData.edu; eduChart.update(); }

            if (document.getElementById('totalWorkforce')) document.getElementById('totalWorkforce').innerText = currentData.total;
            if (document.getElementById('malePct')) document.getElementById('malePct').innerText = currentData.gender[0] + "%";
            if (document.getElementById('femalePct')) document.getElementById('femalePct').innerText = currentData.gender[1] + "%";
            
            const unemp = document.getElementById('unemploymentRate');
            if(unemp) {
                unemp.innerText = currentData.unemployment;
                unemp.style.color = parseFloat(currentData.unemployment) > 10 ? "#dc2626" : "#1e3a8a";
            }
        }

        const initialData = dummyData['2023']['All'];
        initAgeChart(initialData.age);
        initGenderChart(initialData.gender);
        initEduChart(initialData.edu);

        document.getElementById('regionFilter')?.addEventListener('change', window.updateDemographics);
        document.getElementById('yearFilter')?.addEventListener('change', window.updateDemographics);
    };

    const initMacroEconomics = () => {
        const updateChart = () => {
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
                    data: compareFilteredData, borderColor: '#28a745', backgroundColor: 'rgba(40, 167, 69, 0.05)',
                    borderWidth: 2, borderDash: [5, 5], tension: 0.3, pointRadius: 2, fill: false
                };
            } else {
                if (chartInstance.data.datasets[1]) chartInstance.data.datasets.splice(1, 1);
            }
            chartInstance.update();
        }

        const updateSidebar = () => {
            const data = dataStore[currentMetric][currentSector][currentRegion];
            const bigStatEl = document.getElementById('bigStat');
            if (bigStatEl) {
                const lastVal = data.data[data.data.length - 1];
                const unit = currentMetric === 'GDP' ? 'T IDR' : 'Ribu';
                const growthClass = data.growth.includes('+') ? 'positive' : 'negative';
                bigStatEl.innerHTML = `${lastVal} ${unit} <span class="growth ${growthClass}">↗ ${data.growth}</span>`;
            }

            const summaryContainer = document.getElementById('summaryContent');
            if (summaryContainer) {
                const sectors = ['Technology', 'Manufacturing', 'Agriculture', 'Mining', 'Retail', 'Finance'];
                summaryContainer.innerHTML = '';
                sectors.forEach((sector) => {
                    const sectorData = dataStore[currentMetric][sector][currentRegion];
                    const isPositive = sectorData.summary.percent.includes('↑') || sectorData.summary.percent.includes('+');
                    const colorClass = isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
                    const activeClass = (sector === currentSector) ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-2 -m-2 bg-blue-50/50' : '';
                    summaryContainer.innerHTML += `
                        <div class="stat-item flex justify-between items-center ${activeClass}">
                            <div class="stat-info"><span class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">${sectorData.summary.label}</span><span class="block text-sm font-bold text-gray-800">${sectorData.summary.val}</span></div>
                            <span class="text-xs font-bold px-2 py-1 rounded-full ${colorClass}">${sectorData.summary.percent}</span>
                        </div>${sector !== 'Finance' && activeClass === '' ? '<div class="border-b border-gray-50"></div>' : ''}`;
                });
            }
            
            const takeawaysList = document.getElementById('takeawaysList');
            if(takeawaysList) takeawaysList.innerHTML = data.takeaways.map(item => `<li class="leading-relaxed">${item}</li>`).join('');

            const correlationTextEl = document.getElementById('correlationText');
            if (correlationTextEl) correlationTextEl.textContent = correlationData[currentSector] || "Data analisis belum tersedia.";
        }

        const ctx = document.getElementById('growthChart');
        if (ctx) {
            const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(0, 123, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 123, 255, 0.0)');
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: { labels: [], datasets: [{ label: 'Pertumbuhan PDB', data: [], borderColor: '#007bff', backgroundColor: gradient, borderWidth: 3, tension: 0.3, fill: true }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true } }, scales: { y: { display: false }, x: { grid: { display: false } } } }
            });
        }

        document.getElementById('metricSelect')?.addEventListener('change', function () { currentMetric = this.value; updateChart(); updateSidebar(); });
        document.getElementById('sectorSelect')?.addEventListener('change', function () { currentSector = this.value; updateChart(); updateSidebar(); });
        document.getElementById('compareSectorSelect')?.addEventListener('change', function () { compareSector = this.value; updateChart(); });
        document.getElementById('regionSelect')?.addEventListener('change', function () { currentRegion = this.value; updateChart(); updateSidebar(); });
        document.getElementById('compareToggle')?.addEventListener('change', function () { 
            isCompareMode = this.checked; 
            const dd = document.getElementById('compareSectorSelect');
            if(dd) dd.style.display = isCompareMode ? 'inline-block' : 'none';
            updateChart(); 
        });
        document.getElementById('yearRange')?.addEventListener('input', function () { 
            maxYear = parseInt(this.value); 
            document.getElementById('currentYear').textContent = maxYear; 
            updateChart(); 
        });

        updateChart();
        updateSidebar();
    };

    const initCoreUI = () => {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const desktopMenu = document.getElementById('desktopMenu');
        const mobileDropdown = document.getElementById('mobileDropdown');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (mobileDropdown) mobileDropdown.classList.toggle('hidden');
                else if (desktopMenu) desktopMenu.classList.toggle('hidden');
            });
                
        }

        const themeToggleBtn = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;
        const currentTheme = localStorage.getItem('theme');

        const updateIcon = (isDark) => {
            if(!themeIcon) return;
            if (isDark) { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
            else { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
        };

        if (currentTheme === 'dark') { body.classList.add('dark-mode'); updateIcon(true); }

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                body.classList.toggle('dark-mode');
                const isDark = body.classList.contains('dark-mode');
                updateIcon(isDark);
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }

        window.showDetail = (key) => {
            const data = detailData[key];
            if (!data) return;
            document.getElementById('modalTitle').innerText = data.title;
            document.getElementById('modalIconContainer').innerHTML = data.icon;
            document.getElementById('modalBody').innerHTML = data.content;
            document.getElementById('detailModal')?.classList.remove('hidden');
        }
        document.getElementById('detailModal')?.addEventListener('click', (e) => { if(e.target.id === 'detailModal') document.getElementById('detailModal').classList.add('hidden'); });

        window.openModalInfo = (type) => {
            const modal = document.getElementById('infoModal');
            const content = modalContent[type];
            if (content && modal) {
                document.getElementById('modalTitle').textContent = content.title;
                document.getElementById('modalDesc').textContent = content.desc;
                document.getElementById('modalList').innerHTML = content.list.map(item => `<li>${item}</li>`).join('');
                modal.classList.remove('hidden');
            }
        }
        window.closeModalInfo = () => document.getElementById('infoModal')?.classList.add('hidden');
        document.addEventListener('keydown', (e) => { if (e.key === "Escape") window.closeModalInfo(); });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('exit-up');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.hero-text, .section-title, .stats-title, .stat-card, .news-card, .hero-images, .animate-fade-in-up, .job-card').forEach(el => observer.observe(el));
        
        setTimeout(() => { document.querySelectorAll('canvas').forEach(c => c.classList.add('slide-active')); }, 500);
    };


    document.addEventListener("DOMContentLoaded", () => {
        console.log("System Initializing...");
        
        initCoreUI();
        initJobsSystem();
        initRegionalData();
        initSectorDashboard();
        initDemographics();
        initMacroEconomics();
        initNationalStats();  

        window.openModal = (type) => {
            window.openModalInfo(type);
        };

        window.closeModal = () => {
            window.closeModalInfo();
        };

        console.log("System Ready.");
    });

// ==========================================
// FEATURE: NATIONAL STATS CHARTS (YANG HILANG)
// ==========================================
const initNationalStats = () => {
    // Cek apakah Chart.js sudah di-load
    if (typeof Chart === 'undefined') return;

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
            y: { display: true, grid: { color: '#f3f4f6', drawBorder: false }, ticks: { color: '#9ca3af', maxTicksLimit: 6 } }
        },
        elements: {
            point: { radius: 0, hitRadius: 20, hoverRadius: 8, hoverBorderWidth: 3, hoverBackgroundColor: '#ffffff' },
            line: { tension: 0.4 }
        }
    };

    // 1. Grafik Pengangguran (Kiri Atas)
    const ctx1 = document.getElementById('unemploymentChart');
    if (ctx1) {
        new Chart(ctx1.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', 'Q1 24', 'Q2 24'],
                datasets: [{ 
                    label: 'Unemployment Rate', 
                    data: [5.2, 7.0, 6.5, 5.8, 5.3, 5.1, 4.8], // Data dummy disesuaikan
                    borderColor: '#ef4444', 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: commonOptions
        });
    }

    // 2. Grafik Partisipasi Angkatan Kerja (Kanan Atas)
    const ctx2 = document.getElementById('laborChart');
    if (ctx2) {
        new Chart(ctx2.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', 'Q1 24', 'Q2 24'],
                datasets: [{ 
                    label: 'Labor Force', 
                    data: [67.5, 64.0, 65.2, 66.5, 68.0, 69.1, 69.5], // Data dummy disesuaikan
                    borderColor: '#3b82f6', 
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: commonOptions
        });
    }
};