const sectorMap = {
  Technology: "Teknologi",
  Manufacturing: "Manufaktur",
  Agriculture: "Pertanian",
  Mining: "Pertambangan",
  Retail: "Ritel",
  Finance: "Keuangan",
};

const correlationData = {
  Technology:
    "Pertumbuhan PDB sektor Teknologi yang eksponensial (+180%) memiliki hubungan erat dengan penyerapan tenaga kerja (+190%). Ketika ekonomi digital tumbuh, permintaan akan layanan aplikasi dan data meningkat, mendorong perusahaan startup dan korporasi untuk melakukan ekspansi besar-besaran dan merekrut talenta digital (Hukum Okun).",
  Manufacturing:
    "Di sektor Manufaktur, kualitas pertumbuhan mulai bergeser. Pertumbuhan PDB (+23.2%) didorong oleh otomatisasi mesin (capital-intensive), sehingga penyerapan tenaga kerja (+30%) tumbuh namun tidak secepat nilai outputnya. Tantangan saat ini adalah meningkatkan skill pekerja agar bisa berkolaborasi dengan teknologi pabrik cerdas.",
  Agriculture:
    "Sektor Pertanian mengalami fenomena transformasi struktural. Penurunan PDB (-6.6%) dan tenaga kerja (-20%) menandakan peralihan ekonomi dari agraris ke industri/jasa. Banyak tenaga kerja muda berpindah ke kota (urbanisasi), meninggalkan lahan pertanian yang kini dituntut untuk lebih efisien menggunakan teknologi mekanisasi.",
  Mining:
    "Sektor Pertambangan menunjukkan anomali unik. Nilai ekonomi (PDB) melonjak drastis (+35.7%) akibat harga komoditas global, namun penyerapan tenaga kerjanya relatif kecil karena sifat industri yang padat modal. Investasi besar di alat berat meningkatkan output tanpa memerlukan rekrutmen massal seperti di sektor ritel.",
  Retail:
    "Sektor Ritel adalah bukti nyata ekonomi inklusif. Pertumbuhan PDB (+44.4%) langsung berdampak pada lonjakan penyerapan tenaga kerja (+61.1%). Sektor ini sangat responsif: setiap kenaikan konsumsi masyarakat langsung membuka lowongan untuk pramuniaga, kurir logistik, hingga admin toko online.",
  Finance:
    "Sektor Keuangan tumbuh sangat pesat (+68.1%) secara nilai, namun pola kerjanya berubah. Penyerapan tenaga kerja tinggi (+87.5%) tidak lagi didominasi oleh staf cabang bank, melainkan oleh talenta spesialis (IT Security, Analis Data, Compliance). Ini menunjukkan pergeseran ke arah pekerjaan bernilai tambah tinggi.",
};

const modalContent = {
  uptrend: {
    title: "Dampak Ekonomi Naik (Ekspansi)",
    desc: "Fase di mana aktivitas ekonomi meningkat, ditandai dengan kenaikan PDB.",
    list: [
      "Permintaan barang & jasa tinggi, perusahaan butuh lebih banyak staf.",
      "Daya tawar pekerja meningkat, gaji cenderung naik.",
      "Munculnya peluang bisnis baru (UMKM bertambah).",
      "Pemerintah mendapatkan pajak lebih banyak untuk pembangunan.",
    ],
    color: "blue",
    icon: "fa-arrow-up",
  },
  investment: {
    title: "Peran Investasi",
    desc: "Penanaman modal (asing/dalam negeri) untuk mengembangkan kapasitas produksi.",
    list: [
      "Membuka pabrik atau kantor cabang baru = Lowongan kerja masif.",
      "Transfer teknologi dan peningkatan skill pekerja lokal.",
      "Meningkatkan daya saing produk nasional di pasar global.",
      "Efek berganda (multiplier effect) ke pedagang sekitar area industri.",
    ],
    color: "green",
    icon: "fa-money-bill-wave",
  },
  recession: {
    title: "Dampak Resesi (Kontraksi)",
    desc: "Penurunan aktivitas ekonomi yang signifikan berlangsung berbulan-bulan.",
    list: [
      "Perusahaan melakukan efisiensi biaya, seringkali melalui PHK.",
      "Pembekuan rekrutmen (Hiring Freeze).",
      "Daya beli masyarakat turun, sektor ritel terpukul.",
      "Peralihan tenaga kerja ke sektor informal (ojek online, dsb) meningkat.",
    ],
    color: "red",
    icon: "fa-exclamation-triangle",
  },
};

const dataStore = {
  GDP: {
    Technology: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          750, 820, 790, 950, 1100, 1050, 1250, 1400, 1380, 1550, 1650, 1800,
          1750, 1900, 2100,
        ],
        growth: "+180%",
        summary: {
          label: "PDB Teknologi",
          val: "750T → 2100T IDR",
          percent: "↑ +180%",
        },
        takeaways: [
          "Lonjakan tinggi pasca-pandemi (2020+).",
          "Koreksi pasar terjadi di 2015 dan 2022.",
          "Sektor growth tertinggi namun volatil.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          800, 900, 880, 1050, 1200, 1150, 1350, 1500, 1480, 1650, 1850, 1950,
          1900, 2050, 2200,
        ],
        growth: "+175%",
        summary: {
          label: "PDB Teknologi (Asia)",
          val: "800T → 2200T IDR",
          percent: "↑ +175%",
        },
        takeaways: [
          "Tren Asia mengikuti pola global.",
          "Investasi startup mendorong volatilitas.",
          "Pemulihan cepat setelah koreksi.",
        ],
      },
    },
    Manufacturing: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          2800, 2950, 2900, 3050, 3150, 3100, 3200, 3350, 3400, 3300, 2900,
          3100, 3300, 3250, 3450,
        ],
        growth: "+23.2%",
        summary: {
          label: "PDB Manufaktur",
          val: "2800T → 3450T IDR",
          percent: "↑ +23.2%",
        },
        takeaways: [
          "Dampak signifikan pandemi di 2020.",
          "Pemulihan lambat namun pasti di 2021-2024.",
          "Fluktuasi mengikuti demand global.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          3000, 3150, 3100, 3250, 3350, 3300, 3450, 3600, 3650, 3550, 3100,
          3300, 3500, 3550, 3700,
        ],
        growth: "+23.3%",
        summary: {
          label: "PDB Manufaktur (Asia)",
          val: "3000T → 3700T IDR",
          percent: "↑ +23.3%",
        },
        takeaways: [
          "Basis produksi Asia kuat.",
          "Drop signifikan di 2020 akibat lockdown.",
          "Supply chain pulih di 2022.",
        ],
      },
    },
    Agriculture: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          1050, 1120, 1080, 1150, 1000, 1050, 980, 1020, 990, 1010, 1080, 1030,
          990, 950, 980,
        ],
        growth: "-6.6%",
        summary: {
          label: "PDB Pertanian",
          val: "1050T → 980T IDR",
          percent: "↓ -6.6%",
        },
        takeaways: [
          "Sangat fluktuatif karena faktor cuaca.",
          "Menjadi penyangga ekonomi saat krisis 2020.",
          "Tren jangka panjang menurun.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          1100, 1180, 1120, 1190, 1050, 1100, 1020, 1080, 1040, 1060, 1120,
          1080, 1020, 980, 1000,
        ],
        growth: "-9.0%",
        summary: {
          label: "PDB Pertanian (Asia)",
          val: "1100T → 1000T IDR",
          percent: "↓ -9.0%",
        },
        takeaways: [
          "Modernisasi mengurangi porsi agrikultur.",
          "Volatilitas harga komoditas terlihat jelas.",
          "Stabilisasi di level rendah.",
        ],
      },
    },
    Mining: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          1400, 1450, 1420, 1500, 1550, 1480, 1520, 1600, 1650, 1700, 1550,
          1750, 1900, 1850, 1900,
        ],
        growth: "+35.7%",
        summary: {
          label: "PDB Pertambangan",
          val: "1400T → 1900T IDR",
          percent: "↑ +35.7%",
        },
        takeaways: [
          "Harga komoditas global sangat berpengaruh.",
          "Lonjakan batubara/nikel di 2022.",
          "Investasi smelter mendorong nilai tambah.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          1500, 1550, 1520, 1600, 1650, 1600, 1650, 1750, 1800, 1850, 1700,
          1900, 2050, 2000, 2100,
        ],
        growth: "+40.0%",
        summary: {
          label: "PDB Pertambangan (Asia)",
          val: "1500T → 2100T IDR",
          percent: "↑ +40.0%",
        },
        takeaways: [
          "Permintaan energi China mendominasi.",
          "Transisi energi mempengaruhi tren.",
          "Stabilisasi harga di 2024.",
        ],
      },
    },
    Retail: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          900, 950, 1000, 1050, 1100, 1120, 1150, 1200, 1250, 1280, 1000, 1100,
          1200, 1250, 1300,
        ],
        growth: "+44.4%",
        summary: {
          label: "PDB Ritel",
          val: "900T → 1300T IDR",
          percent: "↑ +44.4%",
        },
        takeaways: [
          "Konsumsi rumah tangga pondasi utama.",
          "Jatuh tajam saat PSBB 2020.",
          "E-commerce mendisrupsi ritel fisik.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          1000, 1080, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1200,
          1350, 1450, 1550, 1600,
        ],
        growth: "+60.0%",
        summary: {
          label: "PDB Ritel (Asia)",
          val: "1000T → 1600T IDR",
          percent: "↑ +60.0%",
        },
        takeaways: [
          "Kelas menengah Asia mendorong growth.",
          "Digitalisasi ritel sangat cepat.",
          "Pemulihan pariwisata membantu ritel.",
        ],
      },
    },
    Finance: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1550, 1650, 1600,
          1680, 1750, 1800, 1850,
        ],
        growth: "+68.1%",
        summary: {
          label: "PDB Keuangan",
          val: "1100T → 1850T IDR",
          percent: "↑ +68.1%",
        },
        takeaways: [
          "Pertumbuhan stabil meski krisis.",
          "Fintech memperluas akses keuangan.",
          "Suku bunga tinggi di 2023 menahan laju.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          1200, 1280, 1350, 1400, 1480, 1550, 1620, 1700, 1800, 1900, 1850,
          1950, 2050, 2150, 2250,
        ],
        growth: "+87.5%",
        summary: {
          label: "PDB Keuangan (Asia)",
          val: "1200T → 2250T IDR",
          percent: "↑ +87.5%",
        },
        takeaways: [
          "Pusat keuangan (SG, HK) dominan.",
          "Adopsi pembayaran digital masif.",
          "Ketahanan sektor perbankan kuat.",
        ],
      },
    },
  },
  Employment: {
    Technology: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          50, 52, 58, 55, 65, 70, 68, 80, 95, 110, 105, 120, 115, 130, 145,
        ],
        growth: "+190%",
        summary: {
          label: "Pekerja Teknologi",
          val: "50K → 145K",
          percent: "↑ +190%",
        },
        takeaways: [
          "Permintaan talenta digital sangat tinggi.",
          "Sedikit penurunan (layoff) di 2022.",
          "Recovery cepat di 2023.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          60, 65, 72, 70, 80, 85, 82, 95, 110, 125, 120, 135, 130, 145, 160,
        ],
        growth: "+166%",
        summary: {
          label: "Pekerja Teknologi (Asia)",
          val: "60K → 160K",
          percent: "↑ +166%",
        },
        takeaways: [
          "Hub teknologi Asia terus merekrut.",
          "Persaingan talenta menyebabkan churn rate.",
          "Tren remote work terlihat.",
        ],
      },
    },
    Manufacturing: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          200, 210, 205, 215, 225, 220, 230, 240, 235, 245, 210, 230, 250, 255,
          260,
        ],
        growth: "+30%",
        summary: {
          label: "Pekerja Manufaktur",
          val: "200K → 260K",
          percent: "↑ +30%",
        },
        takeaways: [
          "PHK massal terlihat saat pandemi 2020.",
          "Rebound penyerapan tenaga kerja di 2022.",
          "Automasi mulai menekan pertumbuhan.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          220, 230, 225, 235, 245, 240, 250, 260, 255, 265, 230, 250, 270, 275,
          280,
        ],
        growth: "+27%",
        summary: {
          label: "Pekerja Manufaktur (Asia)",
          val: "220K → 280K",
          percent: "↑ +27%",
        },
        takeaways: [
          "Pola serupa dengan Indonesia.",
          "Pemulihan sektor riil pasca pandemi.",
          "Pertumbuhan melambat dibanding tech.",
        ],
      },
    },
    Agriculture: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          150, 155, 145, 148, 140, 142, 135, 138, 130, 128, 135, 130, 125, 122,
          120,
        ],
        growth: "-20%",
        summary: {
          label: "Pekerja Pertanian",
          val: "150K → 120K",
          percent: "↓ -20%",
        },
        takeaways: [
          "Urbanisasi mengurangi petani muda.",
          'Spike kecil di 2020 fenomena "pulang kampung".',
          "Penurunan struktural berlanjut.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          160, 165, 155, 158, 150, 152, 145, 148, 140, 138, 145, 140, 135, 132,
          130,
        ],
        growth: "-18.7%",
        summary: {
          label: "Pekerja Pertanian (Asia)",
          val: "160K → 130K",
          percent: "↓ -18.7%",
        },
        takeaways: [
          "Mekanisasi menggantikan tenaga kerja.",
          "Penyerapan tenaga kerja terendah.",
          "Peralihan ke sektor jasa.",
        ],
      },
    },
    Mining: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [30, 32, 35, 38, 36, 34, 35, 38, 40, 42, 38, 40, 45, 48, 50],
        growth: "+66.6%",
        summary: {
          label: "Pekerja Pertambangan",
          val: "30K → 50K",
          percent: "↑ +66.6%",
        },
        takeaways: [
          "Padat modal, bukan padat karya.",
          "Peningkatan skill untuk operasi alat berat.",
          "Lokasi kerja remote jadi tantangan.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [35, 38, 40, 42, 40, 38, 40, 42, 45, 48, 44, 46, 50, 52, 55],
        growth: "+57.1%",
        summary: {
          label: "Pekerja Tambang (Asia)",
          val: "35K → 55K",
          percent: "↑ +57.1%",
        },
        takeaways: [
          "Automasi tambang mengurangi headcount.",
          "Fokus pada keselamatan kerja (K3).",
          "Pertumbuhan moderat.",
        ],
      },
    },
    Retail: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 220, 240, 260, 280,
          290,
        ],
        growth: "+61.1%",
        summary: {
          label: "Pekerja Ritel",
          val: "180K → 290K",
          percent: "↑ +61.1%",
        },
        takeaways: [
          "Penyerap tenaga kerja terbesar kedua.",
          "Shift ke logistik/kurir e-commerce.",
          "Banyak pekerja informal.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [
          200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 240, 260, 280, 300,
          310,
        ],
        growth: "+55.0%",
        summary: {
          label: "Pekerja Ritel (Asia)",
          val: "200K → 310K",
          percent: "↑ +55.0%",
        },
        takeaways: [
          "Sektor jasa mendominasi pasar kerja.",
          "Kebutuhan staf digital marketing naik.",
          "Recovery pasca pandemi solid.",
        ],
      },
    },
    Finance: {
      Indonesia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [40, 42, 45, 48, 50, 52, 55, 58, 60, 65, 62, 65, 68, 70, 75],
        growth: "+87.5%",
        summary: {
          label: "Pekerja Keuangan",
          val: "40K → 75K",
          percent: "↑ +87.5%",
        },
        takeaways: [
          "Mencari talenta skill tinggi (analis/IT).",
          "Efisiensi bank mengurangi staf cabang.",
          "Growth di sektor asuransi & fintech.",
        ],
      },
      Asia: {
        labels: [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        data: [50, 55, 58, 60, 65, 68, 70, 75, 80, 85, 82, 85, 90, 95, 100],
        growth: "+100%",
        summary: {
          label: "Pekerja Keuangan (Asia)",
          val: "50K → 100K",
          percent: "↑ +100%",
        },
        takeaways: [
          "Hub finansial (SG) menyerap ekspat.",
          "Permintaan compliance & risk officer naik.",
          "Gaji kompetitif menarik talenta.",
        ],
      },
    },
  },
};

const dummyData = {
  2025: {
    All: {
      age: [15, 45, 80, 85, 65, 40],
      gender: [52, 48],
      total: "138Jt",
      edu: [60, 60, 30, 10],
      unemployment: "14.5%",
    },
    Java: {
      age: [20, 50, 70, 75, 50, 30],
      gender: [53, 47],
      total: "78Jt",
      edu: [55, 65, 25, 10],
      unemployment: "13.8%",
    },
    Sumatra: {
      age: [10, 40, 60, 60, 50, 30],
      gender: [51, 49],
      total: "30Jt",
      edu: [70, 40, 20, 5],
      unemployment: "15.2%",
    },
    Kalimantan: {
      age: [10, 30, 40, 50, 40, 20],
      gender: [65, 35],
      total: "12Jt",
      edu: [60, 40, 15, 5],
      unemployment: "12.5%",
    },
  },
  2024: {
    All: {
      age: [25, 55, 85, 80, 55, 35],
      gender: [51, 49],
      total: "145Jt",
      edu: [50, 70, 40, 15],
      unemployment: "11.4%",
    },
    Java: {
      age: [30, 60, 75, 70, 45, 25],
      gender: [54, 46],
      total: "82Jt",
      edu: [40, 80, 50, 20],
      unemployment: "10.5%",
    },
    Sumatra: {
      age: [20, 45, 65, 55, 45, 28],
      gender: [50, 50],
      total: "33Jt",
      edu: [55, 50, 25, 8],
      unemployment: "12.1%",
    },
    Kalimantan: {
      age: [15, 35, 45, 45, 35, 18],
      gender: [62, 38],
      total: "14Jt",
      edu: [55, 45, 18, 5],
      unemployment: "9.5%",
    },
  },
  2023: {
    All: {
      age: [35, 65, 90, 70, 50, 30],
      gender: [51, 49],
      total: "150Jt",
      edu: [40, 85, 50, 25],
      unemployment: "8.2%",
    },
    Java: {
      age: [40, 70, 80, 60, 40, 20],
      gender: [55, 45],
      total: "85Jt",
      edu: [30, 95, 60, 30],
      unemployment: "7.5%",
    },
    Sumatra: {
      age: [30, 50, 70, 50, 40, 25],
      gender: [50, 50],
      total: "35Jt",
      edu: [45, 60, 30, 10],
      unemployment: "9.1%",
    },
    Kalimantan: {
      age: [20, 40, 50, 40, 30, 15],
      gender: [60, 40],
      total: "15Jt",
      edu: [50, 50, 20, 5],
      unemployment: "6.8%",
    },
  },
  2022: {
    All: {
      age: [38, 62, 85, 75, 45, 28],
      gender: [52, 48],
      total: "148Jt",
      edu: [45, 80, 45, 20],
      unemployment: "9.5%",
    },
  },
  2021: {
    All: {
      age: [40, 60, 80, 70, 40, 25],
      gender: [53, 47],
      total: "142Jt",
      edu: [50, 75, 40, 15],
      unemployment: "10.2%",
    },
  },
};

let jobsData = [];
let selectedJob = null;
let currentMetric = "GDP";
let currentSector = "Technology";
let currentRegion = "Indonesia";
let compareSector = "Manufacturing";
let isCompareMode = false;
let maxYear = 2024;
let chartInstance = null;
let ageChart, genderChart, eduChart;

const detailData = {
  faktorPHK: {
    title: "Analisis: Pemicu PHK Massal (Tech Winter)",
    icon: '<i class="fas fa-chart-line text-red-600"></i>',
    headerColor: "bg-red-50",
    borderColor: "border-red-100",
    content: `
            <div class="space-y-6">
                <div>
                    <h4 class="font-bold text-gray-900 text-lg mb-2">1. Berakhirnya Era "Uang Murah"</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">Kenaikan suku bunga global membuat biaya pinjaman modal menjadi mahal. Startup yang dulunya "bakar uang" kini dipaksa investor untuk segera mencetak profit.</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 text-lg mb-2">2. Normalisasi Pasca-Pandemi</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">Perusahaan teknologi melakukan "Overhiring" saat pandemi. Kini aktivitas offline kembali normal, terjadi surplus tenaga kerja.</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 text-lg mb-2">3. Disrupsi AI & Efisiensi</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">Adopsi AI Generatif menggantikan peran administratif, memungkinkan perusahaan beroperasi dengan tim yang lebih ramping.</p>
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 text-lg mb-2">4. Ketidakpastian Geopolitik</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">Konflik global mengganggu rantai pasok dan menaikkan harga energi, memaksa industri memangkas produksi.</p>
                </div>
                <div class="bg-red-50 p-4 rounded-lg border border-red-200 mt-4">
                    <p class="font-bold text-red-800 text-xs uppercase tracking-wide">Dampak Langsung</p>
                    <p class="text-red-700 text-sm mt-1">Hiring Freeze dan standar gaji entry-level terkoreksi turun.</p>
                </div>
            </div>
        `,
  },
  magangIdeal: {
    title: "Standar Emas: Magang Berkualitas",
    icon: '<i class="fas fa-check-circle text-green-600"></i>',
    headerColor: "bg-green-50",
    borderColor: "border-green-100",
    content: `
            <div class="space-y-4">
                <p class="text-gray-600 text-sm mb-4">Magang adalah fase <strong>belajar</strong>. Pastikan tempat magangmu memiliki ciri-ciri ini:</p>
                <div class="flex items-start gap-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><i class="fas fa-chalkboard-user"></i></div>
                    <div>
                        <h5 class="font-bold text-gray-900 text-sm">Mentoring Terstruktur</h5>
                        <p class="text-gray-500 text-xs mt-1">Ada supervisor yang membimbing, bukan dilepas jalan sendiri.</p>
                    </div>
                </div>
                <div class="flex items-start gap-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><i class="fas fa-list-check"></i></div>
                    <div>
                        <h5 class="font-bold text-gray-900 text-sm">Job Desc Jelas</h5>
                        <p class="text-gray-500 text-xs mt-1">Tugas sesuai jurusan, bukan urusan personal (ambil kopi/fotokopi).</p>
                    </div>
                </div>
                <div class="flex items-start gap-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><i class="fas fa-wallet"></i></div>
                    <div>
                        <h5 class="font-bold text-gray-900 text-sm">Uang Saku (Pocket Money)</h5>
                        <p class="text-gray-500 text-xs mt-1">Minimal mengcover biaya transport dan makan siang.</p>
                    </div>
                </div>
                <div class="flex items-start gap-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><i class="fas fa-project-diagram"></i></div>
                    <div>
                        <h5 class="font-bold text-gray-900 text-sm">Dilibatkan di Proyek Nyata</h5>
                        <p class="text-gray-500 text-xs mt-1">Diajak meeting tim dan mengerjakan bagian dari proyek real.</p>
                    </div>
                </div>
                <div class="flex items-start gap-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><i class="fas fa-file-contract"></i></div>
                    <div>
                        <h5 class="font-bold text-gray-900 text-sm">Sertifikat & Referensi</h5>
                        <p class="text-gray-500 text-xs mt-1">Jaminan bukti tertulis dan penilaian performa di akhir.</p>
                    </div>
                </div>
            </div>
        `,
  },
  eksploitasi: {
    title: "Red Flags: Tanda Eksploitasi Magang",
    icon: '<i class="fas fa-exclamation-triangle text-yellow-600"></i>',
    headerColor: "bg-yellow-50",
    borderColor: "border-yellow-100",
    content: `
            <div class="space-y-4">
                <p class="text-gray-600 text-sm mb-4">Waspada jika lowongan magang memiliki ciri-ciri berikut:</p>
                <div class="grid grid-cols-1 gap-3">
                    <div class="bg-red-50 border border-red-100 p-3 rounded-lg">
                        <span class="font-bold text-red-700 block text-sm mb-1">🚩 "Mampu Bekerja di Bawah Tekanan"</span>
                        <p class="text-xs text-red-600">Kode halus untuk "Beban kerja berlebih tanpa bantuan tim".</p>
                    </div>
                    <div class="bg-red-50 border border-red-100 p-3 rounded-lg">
                        <span class="font-bold text-red-700 block text-sm mb-1">🚩 Peran Palugada</span>
                        <p class="text-xs text-red-600">Satu anak magang mengerjakan Desain, Admin, Sosmed, dan Sales.</p>
                    </div>
                    <div class="bg-red-50 border border-red-100 p-3 rounded-lg">
                        <span class="font-bold text-red-700 block text-sm mb-1">🚩 Penalti Resign</span>
                        <p class="text-xs text-red-600">Denda uang besar jika berhenti (Ilegal untuk konteks belajar).</p>
                    </div>
                    <div class="bg-red-50 border border-red-100 p-3 rounded-lg">
                        <span class="font-bold text-red-700 block text-sm mb-1">🚩 Mentor Gaib (Ghosting)</span>
                        <p class="text-xs text-red-600">Dibiarkan bekerja sendiri tanpa arahan, ekspektasi setara profesional.</p>
                    </div>
                    <div class="bg-red-50 border border-red-100 p-3 rounded-lg">
                        <span class="font-bold text-red-700 block text-sm mb-1">🚩 Overtime Tanpa Batas</span>
                        <p class="text-xs text-red-600">Sering diminta lembur di luar jam kerja dengan dalih "dedikasi".</p>
                    </div>
                </div>
            </div>
        `,
  },
};

const initJobsSystem = () => {
  const currentFile = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const file = href.split("/").pop();
    if (file === currentFile) link.classList.add("nav-active");
    else link.classList.remove("nav-active");
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function () {
      document
        .querySelectorAll(".nav-item")
        .forEach((el) => el.classList.remove("nav-active"));
      this.classList.add("nav-active");
    });
  });

  const itemsPerPage = 9;
  let currentPage = 1;
  let filteredJobs = [];

  const createPageBtn = (text, onClick, isActive = false) => {
    const btn = document.createElement("button");
    btn.innerHTML = text;
    btn.className = `w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow-md scale-105"
        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-blue-300"
    }`;
    btn.addEventListener("click", onClick);
    return btn;
  };

  const changePage = (page) => {
    currentPage = page;
    renderDisplay();
    const listings = document.getElementById("jobListings");
    if (listings)
      listings.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderDisplay = () => {
    const container = document.getElementById("jobListings");
    const pagination = document.getElementById("pagination");

    if (!container) return;
    container.innerHTML = "";
    if (pagination) pagination.innerHTML = "";

    if (filteredJobs.length === 0) {
      container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500">Tidak ada lowongan yang sesuai.</div>`;
      return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredJobs.slice(start, end);
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    const getTypeClass = (type) => {
      const t = (type || "").toLowerCase();
      if (t === "full-time") return "full-time";
      if (t.includes("magang") || t.includes("intern")) return "magang";
      if (t.includes("contract") || t.includes("kontak")) return "contract";
      if (t === "remote") return "remote";
      if (t === "freelance") return "freelance";
      return "part-time";
    };

    pageData.forEach((job, index) => {
      const card = document.createElement("div");
      card.className =
        "job-card bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 relative group job-card-animate";
      card.style.animationDelay = `${index * 100}ms`;
      const typeClass = getTypeClass(job.type);

      card.innerHTML = `
                <div class="job-type-badge ${typeClass}">${job.type}</div>
                <div class="flex items-start mb-4 pr-16">
                    <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-blue-600 mr-3 text-sm">${
                      job.logo
                    }</div>
                    <div>
                        <h3 class="font-bold text-gray-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">${
                          job.title
                        }</h3>
                        <p class="text-sm text-gray-500 mt-1">${job.company}</p>
                    </div>
                </div>
                <div class="text-sm text-gray-500 space-y-2 mb-4">
                    <div class="flex items-center gap-2"><i class="fa-solid fa-map-marker-alt w-4"></i> ${
                      job.location
                    }</div>
                    <div class="flex items-center gap-2"><i class="fa-regular fa-clock w-4"></i> ${
                      job.posted
                    }</div>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${job.skills
                      .map(
                        (skill) =>
                          `<span class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">${skill}</span>`
                      )
                      .join("")}
                </div>
                <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span class="font-bold text-gray-800 text-sm">${
                      job.salary
                    }</span>
                    <div class="flex gap-2">
                        <button class="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition btn-detail flex items-center gap-2" data-id="${
                          job.id
                        }"><i class="fa-solid fa-eye"></i> Lihat Detail</button>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition btn-apply flex items-center gap-2" data-id="${
                          job.id
                        }"><i class="fa-solid fa-paper-plane"></i> Lamar</button>
                    </div>
                </div>
            `;
      container.appendChild(card);
      const detailBtn = card.querySelector(".btn-detail");
      if (detailBtn)
        detailBtn.addEventListener("click", () => openJobModal(job));
      const applyBtn = card.querySelector(".btn-apply");
      if (applyBtn) applyBtn.addEventListener("click", () => openApply(job));
    });

    if (totalPages > 1 && pagination) {
      if (currentPage > 1)
        pagination.appendChild(
          createPageBtn("<", () => changePage(currentPage - 1))
        );
      for (let i = 1; i <= totalPages; i++)
        pagination.appendChild(
          createPageBtn(i, () => changePage(i), i === currentPage)
        );
      if (currentPage < totalPages)
        pagination.appendChild(
          createPageBtn(">", () => changePage(currentPage + 1))
        );
    }
  };

  const searchInput = document.getElementById("searchInput");
  const sectorFilter = document.getElementById("sectorFilter");
  const locationFilter = document.getElementById("locationFilter");
  const searchButton = document.getElementById("searchButton");

  const filterJobs = () => {
    const term = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const sector = sectorFilter ? sectorFilter.value : "";
    const loc = locationFilter ? locationFilter.value : "";

    const keywordMap = {
      "Digital & TIK": [
        "developer",
        "react",
        "node",
        "ui",
        "ux",
        "tech",
        "software",
        "ict",
        "it",
        "golang",
        "swift",
        "network",
        "security",
        "seo",
        "content",
        "designer",
        "game",
      ],
      Manufaktur: [
        "manufaktur",
        "pabrik",
        "teknisi",
        "produksi",
        "otomotif",
        "mesin",
        "maintenance",
      ],
      Keuangan: [
        "bank",
        "finance",
        "fintech",
        "akuntansi",
        "accounting",
        "tax",
        "pajak",
        "analyst",
        "kredit",
      ],
      Ritel: [
        "retail",
        "ritel",
        "kasir",
        "supermarket",
        "toko",
        "e-commerce",
        "kurir",
        "barista",
        "resepsionis",
        "customer service",
        "logistik",
      ],
      Pertanian: [
        "pertanian",
        "agri",
        "agriculture",
        "pangan",
        "perkebunan",
        "ternak",
      ],
      Pertambangan: ["tambang", "mining", "batubara", "miner", "smelter"],
    };

    filteredJobs = jobsData.filter((job) => {
      const matchSearch =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term);
      const matchLoc = !loc || job.location === loc;
      let matchSector = true;
      if (sector) {
        if (job.sector) matchSector = job.sector === sector;
        else {
          const content = (
            job.title +
            " " +
            job.company +
            " " +
            job.description
          ).toLowerCase();
          const keys = keywordMap[sector] || [];
          matchSector = keys.some((k) => content.includes(k));
        }
      }
      return matchSearch && matchLoc && matchSector;
    });
    currentPage = 1;
    renderDisplay();
  };

  if (searchInput) {
    searchInput.addEventListener("keyup", filterJobs);
    sectorFilter.addEventListener("change", filterJobs);
    locationFilter.addEventListener("change", filterJobs);
    searchButton.addEventListener("click", filterJobs);
  }

  const setupDropdown = (btnId, listId, labelId, selectId) => {
    const btn = document.getElementById(btnId);
    const list = document.getElementById(listId);
    const label = document.getElementById(labelId);
    const select = document.getElementById(selectId);
    if (!btn || !list) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll('[id^="list"]').forEach((el) => {
        if (el.id !== listId) el.classList.add("hidden");
      });
      list.classList.toggle("hidden");
    });

    list.querySelectorAll(".option-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        label.textContent = item.textContent;
        label.classList.add("text-gray-900", "font-medium");
        select.value = item.getAttribute("data-value");
        select.dispatchEvent(new Event("change"));
        list.classList.add("hidden");
      });
    });
  };
  setupDropdown("btnSektor", "listSektor", "labelSektor", "sectorFilter");
  setupDropdown("btnLokasi", "listLokasi", "labelLokasi", "locationFilter");
  document.addEventListener("click", () => {
    document
      .querySelectorAll('[id^="list"]')
      .forEach((el) => el.classList.add("hidden"));
  });

  const openJobModal = (job) => {
    const modal = document.getElementById("jobDetailModal");
    if (!modal) return;

    const elements = {
      modalJobTitle: job.title,
      modalCompanyLogo: job.logo || "",
      modalCompanyName: job.company || "",
      modalLocation: job.location || "",
      modalJobType: job.type || "",
      modalDescription: job.description || "",
      modalDetails: job.details || "",
    };

    if (document.getElementById("modalJobTitle"))
      document.getElementById("modalJobTitle").textContent = job.title;
    if (document.getElementById("modalCompanyLogo"))
      document.getElementById("modalCompanyLogo").textContent = job.logo || "";
    if (document.getElementById("modalCompanyName"))
      document.getElementById("modalCompanyName").textContent =
        job.company || "";
    if (document.querySelector("#modalLocation span"))
      document.querySelector("#modalLocation span").textContent =
        job.location || "";
    if (document.getElementById("modalDescription"))
      document.getElementById("modalDescription").textContent =
        job.description || "";
    if (document.getElementById("modalDetails"))
      document.getElementById("modalDetails").textContent = job.details || "";

    const typeEl = document.getElementById("modalJobType");
    if (typeEl) {
      typeEl.textContent = job.type || "";
      typeEl.className =
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium " +
        (job.type === "Full-time"
          ? "bg-blue-100 text-blue-700"
          : job.type === "Magang"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700");
    }

    const reqEl = document.getElementById("modalRequirements");
    if (reqEl) {
      reqEl.innerHTML = "";
      (Array.isArray(job.requirements) ? job.requirements : []).forEach((r) => {
        const li = document.createElement("li");
        li.textContent = r;
        reqEl.appendChild(li);
      });
    }

    const benEl = document.getElementById("modalBenefits");
    if (benEl) {
      benEl.innerHTML = "";
      const defaultBenefits = [
        "Pengalaman industri nyata",
        "Mentoring profesional",
        "Jaringan",
        "Soft skills",
        "Sertifikasi",
        "Potensi karier",
      ];
      (Array.isArray(job.benefits) ? job.benefits : defaultBenefits).forEach(
        (b) => {
          const li = document.createElement("li");
          li.textContent = b;
          benEl.appendChild(li);
        }
      );
    }

    selectedJob = job;
    modal.classList.remove("hidden");
  };

  window.openApply = (job) => {
    const applyModal = document.getElementById("applyModal");
    const title = document.getElementById("applyModalTitle");
    if (title) title.textContent = `Form Lamaran - ${job?.title || ""}`;
    if (applyModal) applyModal.classList.remove("hidden");
  };

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn)
    closeBtn.addEventListener("click", () =>
      document.getElementById("jobDetailModal")?.classList.add("hidden")
    );

  const modalOverlay = document.getElementById("jobDetailModal");
  if (modalOverlay)
    modalOverlay.addEventListener("click", (e) => {
      if (e.target.id === "jobDetailModal")
        modalOverlay.classList.add("hidden");
    });

  const detailBackBtn = document.getElementById("detailBackBtn");
  if (detailBackBtn)
    detailBackBtn.addEventListener("click", () =>
      document.getElementById("jobDetailModal")?.classList.add("hidden")
    );

  const detailBackBottomBtn = document.getElementById("detailBackBottomBtn");
  if (detailBackBottomBtn)
    detailBackBottomBtn.addEventListener("click", () =>
      document.getElementById("jobDetailModal")?.classList.add("hidden")
    );

  const closeApply = document.getElementById("closeApplyModal");
  if (closeApply)
    closeApply.addEventListener("click", () =>
      document.getElementById("applyModal")?.classList.add("hidden")
    );

  const applyCancelBtn = document.getElementById("applyCancelBtn");
  if (applyCancelBtn)
    applyCancelBtn.addEventListener("click", () =>
      document.getElementById("applyModal")?.classList.add("hidden")
    );

  const applyOverlay = document.getElementById("applyModal");
  if (applyOverlay)
    applyOverlay.addEventListener("click", (e) => {
      if (e.target.id === "applyModal") applyOverlay.classList.add("hidden");
    });

  const modalApplyBtn = document.getElementById("modalApplyButton");
  if (modalApplyBtn)
    modalApplyBtn.addEventListener("click", () => {
      if (selectedJob) window.openApply(selectedJob);
    });

  const applySendBtn = document.getElementById("applySendBtn");
  if (applySendBtn)
    applySendBtn.addEventListener("click", () => {
      const name = document.getElementById("applyName")?.value.trim();
      const wa = document.getElementById("applyWhatsapp")?.value.trim();
      const email = document.getElementById("applyEmail")?.value.trim();
      const address = document.getElementById("applyAddress")?.value.trim();
      if (!name || !wa || !email || !address) {
        alert("Mohon lengkapi Nama, WhatsApp, Email, dan Alamat.");
        return;
      }
      alert("Lamaran terkirim. Terima kasih!");
      document.getElementById("applyModal")?.classList.add("hidden");
    });

  const loadJobs = async () => {
    try {
      const res = await fetch("assete/data/jobs.json");
      const data = await res.json();
      jobsData = Array.isArray(data) ? data : [];
      filteredJobs = [...jobsData];
      renderDisplay();
    } catch (e) {
      filteredJobs = [];
      renderDisplay();
    }
  };
  loadJobs();
};

const initRegionalData = () => {
  const fullRegionalData = [
    {
      region: "DKI Jakarta",
      umr: "Rp 5.067.381",
      unemp: "6.5%",
      sector: "Jasa & Keuangan",
      color: "purple",
      status: "Tumbuh",
      statusColor: "green",
    },
    {
      region: "Jawa Barat",
      umr: "Rp 2.057.495",
      unemp: "7.8%",
      sector: "Manufaktur",
      color: "blue",
      status: "Stabil",
      statusColor: "yellow",
    },
    {
      region: "Jawa Tengah",
      umr: "Rp 2.043.992",
      unemp: "5.1%",
      sector: "Pertanian & Industri",
      color: "orange",
      status: "Stabil",
      statusColor: "yellow",
    },
    {
      region: "Jawa Timur",
      umr: "Rp 2.165.244",
      unemp: "4.8%",
      sector: "Perdagangan",
      color: "blue",
      status: "Tumbuh",
      statusColor: "green",
    },
    {
      region: "Banten",
      umr: "Rp 2.927.512",
      unemp: "7.5%",
      sector: "Industri Berat",
      color: "gray",
      status: "Waspada",
      statusColor: "red",
    },
    {
      region: "Bali",
      umr: "Rp 2.813.672",
      unemp: "2.6%",
      sector: "Pariwisata",
      color: "orange",
      status: "Pulih",
      statusColor: "blue",
    },
    {
      region: "DI Yogyakarta",
      umr: "Rp 2.125.897",
      unemp: "3.6%",
      sector: "Pendidikan & Wisata",
      color: "purple",
      status: "Stabil",
      statusColor: "yellow",
    },
    {
      region: "Sumatera Utara",
      umr: "Rp 2.809.915",
      unemp: "5.8%",
      sector: "Perkebunan",
      color: "green",
      status: "Tumbuh",
      statusColor: "green",
    },
    {
      region: "Kalimantan Timur",
      umr: "Rp 3.360.858",
      unemp: "5.7%",
      sector: "Pertambangan",
      color: "gray",
      status: "Booming",
      statusColor: "green",
    },
    {
      region: "Sulawesi Selatan",
      umr: "Rp 3.434.298",
      unemp: "4.5%",
      sector: "Maritim & Pangan",
      color: "blue",
      status: "Stabil",
      statusColor: "yellow",
    },
    {
      region: "Papua",
      umr: "Rp 4.024.270",
      unemp: "2.8%",
      sector: "Pertambangan",
      color: "gray",
      status: "Stabil",
      statusColor: "yellow",
    },
  ];

  window.showRegionalData = function () {
    const modal = document.getElementById("regionalDataModal");
    const tbody = document.getElementById("fullRegionalDataBody");
    tbody.innerHTML = "";

    fullRegionalData.forEach((item) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-blue-50/50 transition duration-150";
      let statusClass =
        item.statusColor === "green"
          ? "bg-green-100 text-green-700"
          : item.statusColor === "yellow"
          ? "bg-yellow-100 text-yellow-700"
          : item.statusColor === "blue"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700";
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
    modal.classList.remove("hidden");
  };

  window.closeRegionalData = function () {
    document.getElementById("regionalDataModal").classList.add("hidden");
  };

  const regionalModal = document.getElementById("regionalDataModal");
  if (regionalModal) {
    regionalModal.addEventListener("click", (e) => {
      if (e.target.id === "regionalDataModal") window.closeRegionalData();
    });
  }
};

const initSectorDashboard = () => {
  const sectorData = {
    Technology: {
      growth: "15.2%",
      growthBadge: "+2.1% YoY",
      growthDesc: "Didorong oleh AI & Digitalisasi",
      wage: "12,500,000",
      wageBadge: "High Paid",
      jobs: "14,205",
      jobsBadge: "Tinggi",
      jobsDesc: "Di seluruh portal",
      skill: "Data Analysis",
      skillDesc: "Dibutuhkan di 70% lowongan",
      chartData: [5.2, 12.5, 10.8, 8.5, 15.2],
      realData: [10500, 11800, 13100, 14200, 16350],
      chartColor: "#3b82f6",
    },
    Finance: {
      growth: "8.5%",
      growthBadge: "+1.4% YoY",
      growthDesc: "Stabil pasca pandemi",
      wage: "10,200,000",
      wageBadge: "Competitive",
      jobs: "8,450",
      jobsBadge: "Sedang",
      jobsDesc: "Fokus pada Fintech",
      skill: "Risk Mgmt",
      skillDesc: "Sertifikasi FRM diutamakan",
      chartData: [4.0, 5.5, 6.2, 7.8, 8.5],
      realData: [7200, 7600, 8100, 8700, 9450],
      chartColor: "#8b5cf6",
    },
    Healthcare: {
      growth: "10.1%",
      growthBadge: "+3.5% YoY",
      growthDesc: "Kebutuhan tenaga medis naik",
      wage: "8,800,000",
      wageBadge: "Rising",
      jobs: "12,100",
      jobsBadge: "Sangat Tinggi",
      jobsDesc: "Kekurangan suplai perawat",
      skill: "Patient Care",
      skillDesc: "STR aktif wajib",
      chartData: [12.0, 14.5, 8.5, 9.2, 10.1],
      realData: [11000, 12600, 13600, 14800, 16300],
      chartColor: "#10b981",
    },
    Manufacturing: {
      growth: "-1.8%",
      growthBadge: "Menurun",
      growthDesc: "Dampak otomatisasi",
      wage: "5,400,000",
      wageBadge: "Standard",
      jobs: "6,200",
      jobsBadge: "Rendah",
      jobsDesc: "Pabrik padat karya berkurang",
      skill: "Machine Ops",
      skillDesc: "Operasional mesin CNC",
      chartData: [-5.0, 2.0, 1.5, 0.5, -1.8],
      realData: [19500, 18500, 18800, 18900, 18550],
      chartColor: "#ef4444",
    },
    Retail: {
      growth: "3.1%",
      growthBadge: "+0.2% YoY",
      growthDesc: "Peralihan ke E-commerce",
      wage: "4,200,000",
      wageBadge: "Entry Level",
      jobs: "22,500",
      jobsBadge: "Masif",
      jobsDesc: "Turnover karyawan tinggi",
      skill: "Sales",
      skillDesc: "Komunikasi & Negosiasi",
      chartData: [-8.5, 4.0, 6.5, 3.0, 3.1],
      realData: [21000, 19200, 20500, 21100, 21800],
      chartColor: "#f59e0b",
    },
    Agriculture: {
      growth: "2.4%",
      growthBadge: "Stabil",
      growthDesc: "Musim panen raya",
      wage: "3,500,000",
      wageBadge: "Low",
      jobs: "15,000",
      jobsBadge: "Tinggi",
      jobsDesc: "Musiman",
      skill: "Farming",
      skillDesc: "Pengalaman lapangan",
      chartData: [2.1, 2.3, 2.0, 2.5, 2.4],
      realData: [38000, 38800, 39500, 40500, 41500],
      chartColor: "#84cc16",
    },
    Construction: {
      growth: "5.5%",
      growthBadge: "Naik",
      growthDesc: "Proyek IKN & Infrastruktur",
      wage: "4,800,000",
      wageBadge: "Medium",
      jobs: "9,000",
      jobsBadge: "Sedang",
      jobsDesc: "Proyek pemerintah",
      skill: "Civil Eng",
      skillDesc: "Sertifikasi K3",
      chartData: [-2.0, 1.5, 3.5, 4.8, 5.5],
      realData: [8500, 8300, 8600, 9000, 9500],
      chartColor: "#f97316",
    },
  };

  const ctx = document.getElementById("employmentTrendChart")?.getContext("2d");
  let employmentChart;

  const initMainChart = (data, color, realData) => {
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color + "80");
    gradient.addColorStop(1, color + "00");

    if (employmentChart) employmentChart.destroy();

    employmentChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
          {
            label: "Growth Rate",
            data: data,
            borderColor: color,
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#1f2937",
            titleFont: { size: 13, weight: "bold", family: "Outfit" },
            bodyColor: "#4b5563",
            bodyFont: { size: 13, family: "Outfit" },
            borderColor: "#e5e7eb",
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: function (tooltipItems) {
                return "Tahun " + tooltipItems[0].label;
              },
              label: function (context) {
                const index = context.dataIndex;
                const actualValue = realData ? realData[index] : 0;
                const percentage = context.parsed.y;
                const formattedValue = new Intl.NumberFormat("id-ID").format(
                  actualValue
                );
                return ` ${formattedValue} Pekerja (Growth: ${percentage}%)`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [5, 5],
              color: "#f1f5f9",
            },
            ticks: {
              font: { family: "Outfit", size: 11 },
              color: "#9ca3af",
              callback: function (value) {
                return value + "%";
              },
            },
          },
          x: {
            display: true,
            grid: { display: false },
            ticks: {
              font: { family: "Outfit", size: 12, weight: "500" },
              color: "#6b7280",
              padding: 10,
            },
          },
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 20,
            hoverRadius: 6,
            hoverBorderWidth: 3,
            hoverBackgroundColor: "#ffffff",
            hoverBorderColor: color,
          },
        },
      },
    });
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const leftChartData = {
    Manufacturing: [65, 64, 66, 68, 70, 69, 71, 73, 72, 74, 75, 76],
    Technology: [20, 45, 35, 60, 40, 55, 30, 65, 45, 70, 50, 85],
    Agriculture: [50, 55, 60, 80, 85, 90, 85, 60, 55, 50, 45, 40],
    Mining: [40, 38, 35, 32, 30, 35, 45, 55, 60, 58, 55, 50],
    Retail: [30, 35, 40, 42, 45, 40, 38, 45, 55, 65, 80, 95],
    Finance: [55, 58, 60, 62, 65, 70, 72, 75, 74, 78, 80, 82],
    Healthcare: [60, 62, 65, 63, 68, 70, 72, 75, 78, 76, 80, 82],
    Construction: [45, 48, 52, 55, 60, 58, 62, 65, 68, 70, 72, 75],
  };
  const rightChartData = {
    Manufacturing: [
      18.2, 18.8, 17.9, 18.5, 18.1, 19.0, 18.3, 18.7, 17.8, 18.4, 18.9, 18.2,
    ],
    Technology: [5.5, 5.2, 5.8, 5.4, 6.1, 5.6, 5.9, 5.3, 6.0, 5.7, 6.2, 5.5],
    Agriculture: [
      38.5, 36.2, 39.1, 37.5, 36.8, 38.9, 39.5, 36.5, 37.2, 38.8, 36.0, 37.8,
    ],
    Mining: [1.25, 1.45, 1.15, 1.35, 1.5, 1.2, 1.4, 1.1, 1.3, 1.48, 1.22, 1.38],
    Retail: [
      13.8, 14.5, 13.2, 14.1, 13.5, 15.0, 13.9, 14.6, 13.4, 14.8, 13.6, 15.2,
    ],
    Finance: [
      3.1, 3.25, 2.95, 3.15, 3.3, 3.05, 3.28, 2.98, 3.12, 3.26, 3.0, 3.18,
    ],
    Healthcare: [4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6],
    Construction: [8.2, 8.3, 8.5, 8.4, 8.6, 8.8, 9.0, 8.9, 9.1, 9.2, 9.3, 9.5],
  };

  const initSideCharts = () => {
    if (typeof Chart === "undefined") return;

    const years = ["2020", "2021", "2022", "2023", "2024"];

    const leftChartData = {
      Manufacturing: [-2.5, 1.2, 2.5, 1.8, -0.5],
      Technology: [12.5, 15.2, 10.8, 8.5, 14.2],
      Agriculture: [2.1, 1.8, 2.0, 1.5, 1.2],
      Mining: [-5.0, 8.5, 12.0, 5.5, 3.2],
      Retail: [-8.0, 4.5, 5.2, 3.8, 4.1],
      Finance: [3.5, 4.2, 5.0, 6.1, 5.8],
      "Digital & ICT": [12.5, 15.2, 10.8, 8.5, 14.2],
    };

    const rightChartData = {
      Manufacturing: [18.2, 17.5, 17.8, 17.6, 17.4],
      Technology: [3.5, 4.1, 4.8, 5.5, 6.2],
      Agriculture: [38.5, 38.0, 37.5, 37.2, 36.8],
      Mining: [1.2, 1.3, 1.4, 1.45, 1.5],
      Retail: [12.5, 12.8, 13.5, 14.2, 14.8],
      Finance: [2.8, 3.0, 3.2, 3.4, 3.6],
      "Digital & ICT": [3.5, 4.1, 4.8, 5.5, 6.2],
    };

    const getChartOptions = (unitSuffix) => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          titleColor: "#1f2937",
          titleFont: { family: "Outfit", weight: "bold" },
          bodyColor: "#4b5563",
          bodyFont: { family: "Outfit" },
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: { label: (c) => ` ${c.parsed.y}${unitSuffix}` },
        },
      },
      scales: {
        x: {
          display: true,
          grid: { display: false },
          ticks: { font: { family: "Outfit", size: 11 }, color: "#9ca3af" },
        },
        y: {
          display: true,
          grid: { borderDash: [4, 4], color: "#f3f4f6" },
          ticks: {
            font: { family: "Outfit", size: 10 },
            color: "#9ca3af",
            maxTicksLimit: 5,
          },
          border: { display: false },
        },
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 20,
          hoverRadius: 6,
          hoverBorderWidth: 3,
        },
        line: { tension: 0.4 },
      },
    });

    const setupSmallDropdown = (
      btnId,
      listId,
      labelId,
      itemClass,
      callback
    ) => {
      const btn = document.getElementById(btnId);
      const list = document.getElementById(listId);
      const label = document.getElementById(labelId);

      if (!btn || !list) return;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll('[id^="listSector"]').forEach((el) => {
          if (el.id !== listId) el.classList.add("hidden");
        });
        list.classList.toggle("hidden");
      });

      list.querySelectorAll(`.${itemClass}`).forEach((item) => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          const val = item.getAttribute("data-value");
          const text = item.textContent;

          if (label) label.textContent = text;
          list.classList.add("hidden");

          list.querySelectorAll(`.${itemClass}`).forEach((el) => {
            el.classList.remove("text-blue-600", "bg-blue-50", "font-medium");
            el.classList.add("text-gray-700");
          });
          item.classList.remove("text-gray-700");
          item.classList.add("text-blue-600", "bg-blue-50", "font-medium");

          if (callback) callback(val);
        });
      });
    };

    document.addEventListener("click", () => {
      document
        .querySelectorAll('[id^="listSector"]')
        .forEach((el) => el.classList.add("hidden"));
    });

    const ctxLeft = document.getElementById("sectorChart");
    if (ctxLeft) {
      const leftChart = new Chart(ctxLeft.getContext("2d"), {
        type: "line",
        data: {
          labels: years,
          datasets: [
            {
              label: "Growth",
              data: leftChartData["Digital & ICT"],
              borderColor: "#1e3a8a",
              borderWidth: 3,
              fill: true,
              backgroundColor: "rgba(30, 58, 138, 0.1)",
            },
          ],
        },
        options: getChartOptions("%"),
      });

      setupSmallDropdown(
        "btnSectorGrowth",
        "listSectorGrowth",
        "labelSectorGrowth",
        "option-item-growth",
        (val) => {
          const key = val === "Digital & ICT" ? "Technology" : val;
          const dataKey = leftChartData[val] ? val : "Digital & ICT";
          leftChart.data.datasets[0].data = leftChartData[dataKey];
          leftChart.update();
        }
      );
    }

    const ctxRight = document.getElementById("sectorTotalChart");
    if (ctxRight) {
      const gradRight = ctxRight
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 300);
      gradRight.addColorStop(0, "rgba(16, 185, 129, 0.2)");
      gradRight.addColorStop(1, "rgba(16, 185, 129, 0)");

      const rightChart = new Chart(ctxRight.getContext("2d"), {
        type: "line",
        data: {
          labels: years,
          datasets: [
            {
              label: "Workers",
              data: rightChartData["Digital & ICT"],
              borderColor: "#10b981",
              backgroundColor: gradRight,
              borderWidth: 3,
              fill: true,
            },
          ],
        },
        options: getChartOptions(" Juta"),
      });

      setupSmallDropdown(
        "btnSectorTotal",
        "listSectorTotal",
        "labelSectorTotal",
        "option-item-total",
        (val) => {
          const key = val === "Digital & ICT" ? "Technology" : val;
          const dataKey = rightChartData[val] ? val : "Digital & ICT";
          rightChart.data.datasets[0].data = rightChartData[dataKey];
          rightChart.update();
        }
      );
    }
  };

  if (sectorData["Technology"])
    initMainChart(
      sectorData["Technology"].chartData,
      sectorData["Technology"].chartColor,
      sectorData["Technology"].realData
    );
  initSideCharts();

  const replayAnimations = () => {
    const cards = document.querySelectorAll(".stat-card");
    cards.forEach((card, index) => {
      card.classList.remove("animate-slide-left");
      card.classList.add("opacity-0");
      card.style.opacity = "";
      card.style.transform = "";
      void card.offsetWidth;
      setTimeout(() => {
        card.classList.remove("opacity-0");
        card.classList.add("animate-slide-left");
      }, index * 150);
    });
  };

  window.updateDashboard = (sector) => {
    const data = sectorData[sector];
    if (!data) return;
    replayAnimations();
    const ids = [
      { id: "valGrowth", val: data.growth },
      { id: "badgeGrowth", val: data.growthBadge },
      { id: "descGrowth", val: data.growthDesc },
      { id: "valWage", val: data.wage },
      { id: "badgeWage", val: data.wageBadge },
      { id: "valJobs", val: data.jobs },
      { id: "badgeJobs", val: data.jobsBadge },
      { id: "descJobs", val: data.jobsDesc },
      { id: "valSkill", val: data.skill },
      { id: "descSkill", val: data.skillDesc },
      { id: "sectorTitle", val: sector },
    ];
    ids.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        el.textContent = item.val;
        if (item.id === "badgeGrowth")
          el.className = data.growth.includes("-")
            ? "text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded"
            : "text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded";
      }
    });
    initMainChart(data.chartData, data.chartColor, data.realData);
  };

  const btn = document.getElementById("btnSektorAnalysis");
  const list = document.getElementById("listSektorAnalysis");
  const label = document.getElementById("labelSektorAnalysis");
  if (btn && list) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      list.classList.toggle("hidden");
    });
    list.querySelectorAll(".option-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = item.getAttribute("data-value");
        label.textContent = val;
        list.classList.add("hidden");
        window.updateDashboard(val);
      });
    });
    document.addEventListener("click", () => list.classList.add("hidden"));
  }
  replayAnimations();
};

const initDemographics = () => {
  const getColorPattern = (data) => {
    const maxVal = Math.max(...data);
    return data.map((val) => (val === maxVal ? "#1e3a8a" : "#e5e7eb"));
  };

  const getData = (year, region) => {
    if (dummyData[year] && dummyData[year][region])
      return dummyData[year][region];
    else if (dummyData[year] && dummyData[year]["All"])
      return dummyData[year]["All"];
    return dummyData["2023"]["All"];
  };

  const initAgeChart = (data) => {
    const el = document.getElementById("ageChart");
    if (!el) return;

    const colors = getColorPattern(data);

    ageChart = new Chart(el.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderRadius: 6,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            display: true,
            beginAtZero: true,
            grid: {
              color: "#f3f4f6",
              borderDash: [5, 5],
            },
            ticks: {
              font: { family: "Outfit", size: 11 },
              color: "#9ca3af",
            },
            border: { display: false },
          },
          x: {
            display: true,
            grid: { display: false },
            ticks: {
              font: { family: "Outfit", size: 11 },
              color: "#6b7280",
            },
          },
        },
        animation: { duration: 1000 },
      },
    });
  };

  const initGenderChart = (data) => {
    const el = document.getElementById("genderChart");
    if (!el) return;
    genderChart = new Chart(el.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Laki-laki", "Perempuan"],
        datasets: [
          {
            data: data,
            backgroundColor: ["#1e3a8a", "#60a5fa"],
            borderWidth: 0,
            cutout: "75%",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });
  };

  const initEduChart = (data) => {
    const el = document.getElementById("educationChart");
    if (!el) return;

    const colors = getColorPattern(data);

    eduChart = new Chart(el.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["SMA", "S1", "S2", "S3"],
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderRadius: 4,
            barPercentage: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            display: true,
            grid: { color: "#f3f4f6", borderDash: [3, 3] },
            ticks: { color: "#9ca3af" },
            border: { display: false },
          },
          x: {
            display: true,
            grid: { display: false },
            ticks: { color: "#6b7280" },
          },
        },
      },
    });
  };

  window.updateDemographics = () => {
    const region = document.getElementById("regionFilter")?.value;
    const year = document.getElementById("yearFilter")?.value;
    const currentData = getData(year, region);

    if (ageChart) {
      ageChart.data.datasets[0].data = currentData.age;
      ageChart.data.datasets[0].backgroundColor = getColorPattern(
        currentData.age
      );
      ageChart.update();
    }

    if (genderChart) {
      genderChart.data.datasets[0].data = currentData.gender;
      genderChart.update();
    }

    if (eduChart) {
      eduChart.data.datasets[0].data = currentData.edu;
      eduChart.data.datasets[0].backgroundColor = getColorPattern(
        currentData.edu
      );
      eduChart.update();
    }

    if (document.getElementById("totalWorkforce"))
      document.getElementById("totalWorkforce").innerText = currentData.total;
    if (document.getElementById("malePct"))
      document.getElementById("malePct").innerText =
        currentData.gender[0] + "%";
    if (document.getElementById("femalePct"))
      document.getElementById("femalePct").innerText =
        currentData.gender[1] + "%";

    const unemp = document.getElementById("unemploymentRate");
    if (unemp) {
      unemp.innerText = currentData.unemployment;
      unemp.style.color =
        parseFloat(currentData.unemployment) > 10 ? "#dc2626" : "#1e3a8a";
    }
  };

  const initialData = dummyData["2023"]["All"];
  initAgeChart(initialData.age);
  initGenderChart(initialData.gender);
  initEduChart(initialData.edu);

  document
    .getElementById("regionFilter")
    ?.addEventListener("change", window.updateDemographics);
  document
    .getElementById("yearFilter")
    ?.addEventListener("change", window.updateDemographics);

  document
    .querySelectorAll("#listRegionFilter .option-item")
    .forEach((item) => {
      item.addEventListener("click", function () {
        const val = this.getAttribute("data-value");
        document.getElementById("regionFilter").value = val;
        document.getElementById("labelRegionFilter").innerText = this.innerText;
        document.getElementById("listRegionFilter").classList.add("hidden");
        window.updateDemographics();
      });
    });

  document.querySelectorAll("#listYearFilter .option-item").forEach((item) => {
    item.addEventListener("click", function () {
      const val = this.getAttribute("data-value");
      document.getElementById("yearFilter").value = val;
      document.getElementById("labelYearFilter").innerText = this.innerText;
      document.getElementById("listYearFilter").classList.add("hidden");
      window.updateDemographics();
    });
  });

  const toggleDropdown = (btnId, listId) => {
    const btn = document.getElementById(btnId);
    const list = document.getElementById(listId);
    if (btn && list) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        list.classList.toggle("hidden");
      });
    }
  };
  toggleDropdown("btnRegionFilter", "listRegionFilter");
  toggleDropdown("btnYearFilter", "listYearFilter");

  document.addEventListener("click", () => {
    document.getElementById("listRegionFilter")?.classList.add("hidden");
    document.getElementById("listYearFilter")?.classList.add("hidden");
  });
};

const initMacroEconomics = () => {
  if (typeof Chart === "undefined") return;

  const ctx = document.getElementById("growthChart");
  const compareToggle = document.getElementById("compareToggle");
  const yearRange = document.getElementById("yearRange");
  const currentYearDisplay = document.getElementById("currentYear");
  const correlationTextEl = document.getElementById("correlationText");
  const compareWrapper = document.getElementById("compareSelectWrapper");

  const labelMetric = document.getElementById("labelMetric");
  const labelSector = document.getElementById("labelSector");
  const labelRegion = document.getElementById("labelRegion");
  const labelCompare = document.getElementById("labelCompare");

  if (!ctx || !yearRange) return;

  const setupDropdown = (btnId, listId, labelId, type) => {
    const btn = document.getElementById(btnId);
    const list = document.getElementById(listId);
    const label = document.getElementById(labelId);

    if (!btn || !list) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll('[id^="list"]').forEach((el) => {
        if (el.id !== listId) el.classList.add("hidden");
      });
      list.classList.toggle("hidden");
    });

    list.querySelectorAll(".option-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = item.getAttribute("data-value");
        const text = item.textContent;

        if (label) label.textContent = text;

        if (type === "metric") currentMetric = val;
        if (type === "sector") currentSector = val;
        if (type === "region") currentRegion = val;
        if (type === "compare") compareSector = val;

        if (
          type === "sector" &&
          isCompareMode &&
          compareSector === currentSector
        ) {
          const sectors = [
            "Technology",
            "Manufacturing",
            "Agriculture",
            "Mining",
            "Retail",
            "Finance",
          ];
          const newCompare =
            sectors.find((s) => s !== currentSector) || "Manufacturing";
          compareSector = newCompare;
          if (labelCompare)
            labelCompare.textContent =
              "Vs: " + (sectorMap[newCompare] || newCompare);
        }

        list.classList.add("hidden");
        updateChart();
        if (type !== "compare") updateSidebar();
      });
    });
  };

  setupDropdown("btnMetric", "listMetric", "labelMetric", "metric");
  setupDropdown("btnSector", "listSector", "labelSector", "sector");
  setupDropdown("btnRegion", "listRegion", "labelRegion", "region");
  setupDropdown("btnCompare", "listCompare", "labelCompare", "compare");

  document.addEventListener("click", () => {
    document
      .querySelectorAll('[id^="list"]')
      .forEach((el) => el.classList.add("hidden"));
  });

  const updateChart = () => {
    if (!chartInstance) return;

    if (!dataStore[currentMetric] || !dataStore[currentMetric][currentSector])
      return;
    const rawDataMain = dataStore[currentMetric][currentSector][currentRegion];

    let limitIndex = rawDataMain.labels.indexOf(String(maxYear));
    if (limitIndex === -1) limitIndex = rawDataMain.labels.length - 1;

    const slicedLabels = rawDataMain.labels.slice(0, limitIndex + 1);
    const slicedDataMain = rawDataMain.data.slice(0, limitIndex + 1);

    chartInstance.data.labels = slicedLabels;
    chartInstance.data.datasets[0].data = slicedDataMain;
    chartInstance.data.datasets[0].label = `${
      currentMetric === "GDP" ? "PDB" : "Pekerja"
    } (${sectorMap[currentSector] || currentSector})`;

    if (isCompareMode) {
      const rawDataCompare =
        dataStore[currentMetric][compareSector][currentRegion];
      const slicedDataCompare = rawDataCompare.data.slice(0, limitIndex + 1);

      const compareDataset = {
        label: `${currentMetric === "GDP" ? "PDB" : "Pekerja"} (${
          sectorMap[compareSector] || compareSector
        })`,
        data: slicedDataCompare,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.05)",
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.3,
        pointRadius: 3,
        fill: false,
      };

      if (chartInstance.data.datasets.length > 1) {
        chartInstance.data.datasets[1].data = slicedDataCompare;
        chartInstance.data.datasets[1].label = compareDataset.label;
      } else {
        chartInstance.data.datasets.push(compareDataset);
      }
    } else {
      if (chartInstance.data.datasets.length > 1) {
        chartInstance.data.datasets.pop();
      }
    }
    chartInstance.update();
  };

  const updateSidebar = () => {
    const data = dataStore[currentMetric][currentSector][currentRegion];
    const bigStatEl = document.getElementById("bigStat");
    const chartTitleEl = document.getElementById("chartTitle");
    const chartSubtitleEl = document.getElementById("chartSubtitle");

    if (bigStatEl) {
      let limitIndex = data.labels.indexOf(String(maxYear));
      if (limitIndex === -1) limitIndex = data.labels.length - 1;

      const currentVal = data.data[limitIndex];
      const unit = currentMetric === "GDP" ? "T IDR" : "Ribu Orang";
      const growthClass = data.growth.includes("+")
        ? "text-green-600"
        : "text-red-600";
      bigStatEl.innerHTML = `${currentVal} ${unit} <span class="text-sm font-medium ${growthClass} ml-2">${data.growth} (Total)</span>`;
    }

    if (chartTitleEl)
      chartTitleEl.textContent = `${
        currentMetric === "GDP" ? "Pertumbuhan PDB" : "Penyerapan Tenaga Kerja"
      } - Sektor ${sectorMap[currentSector] || currentSector}`;
    if (chartSubtitleEl)
      chartSubtitleEl.textContent =
        currentMetric === "GDP"
          ? "Nilai Valuasi (Triliun IDR)"
          : "Jumlah Pekerja (Ribuan Orang)";

    const summaryContainer = document.getElementById("summaryContent");
    if (summaryContainer) {
      const sectors = [
        "Technology",
        "Manufacturing",
        "Agriculture",
        "Mining",
        "Retail",
        "Finance",
      ];
      summaryContainer.innerHTML = "";
      sectors.forEach((sector) => {
        const sData = dataStore[currentMetric][sector][currentRegion];
        const isPositive =
          sData.summary.percent.includes("↑") ||
          sData.summary.percent.includes("+");
        const colorClass = isPositive
          ? "text-green-600 bg-green-50"
          : "text-red-600 bg-red-50";
        const activeClass =
          sector === currentSector
            ? "ring-2 ring-blue-500 ring-offset-1 rounded-lg bg-blue-50"
            : "hover:bg-gray-50";

        summaryContainer.innerHTML += `
                    <div class="stat-item p-3 rounded-lg transition-all cursor-pointer flex justify-between items-center ${activeClass}" 
                         onclick="currentSector='${sector}'; document.getElementById('labelSector').textContent='${
          sectorMap[sector]
        }'; updateChart(); updateSidebar();">
                        <div class="stat-info">
                            <span class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">${
                              sectorMap[sector] || sector
                            }</span>
                            <span class="block text-sm font-bold text-gray-800">${
                              sData.summary.val
                            }</span>
                        </div>
                        <span class="text-xs font-bold px-2 py-1 rounded-full ${colorClass}">${
          sData.summary.percent
        }</span>
                    </div>`;
      });
    }

    const takeawaysList = document.getElementById("takeawaysList");
    if (takeawaysList)
      takeawaysList.innerHTML = data.takeaways
        .map((item) => `<li class="leading-relaxed text-gray-600">${item}</li>`)
        .join("");

    if (correlationTextEl)
      correlationTextEl.textContent =
        correlationData[currentSector] || "Data analisis belum tersedia.";
  };

  const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)");
  gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Loading...",
          data: [],
          borderColor: "#3b82f6",
          backgroundColor: gradient,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: true },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#1f2937",
          bodyColor: "#4b5563",
          borderColor: "#e5e7eb",
          borderWidth: 1,
        },
      },
      scales: {
        y: { display: true, grid: { borderDash: [2, 4], color: "#f3f4f6" } },
        x: { grid: { display: false } },
      },
    },
  });

  compareToggle.addEventListener("change", function () {
    isCompareMode = this.checked;
    if (isCompareMode) {
      compareWrapper.classList.remove("hidden");
      compareWrapper.classList.add("block");
    } else {
      compareWrapper.classList.add("hidden");
      compareWrapper.classList.remove("block");
    }
    updateChart();
  });

  yearRange.addEventListener("input", function () {
    maxYear = parseInt(this.value);
    if (currentYearDisplay) currentYearDisplay.textContent = maxYear;
    updateChart();
    updateSidebar();
  });

  updateChart();
  updateSidebar();
};

const initCoreUI = () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const desktopMenu = document.getElementById("desktopMenu");
  const mobileDropdown = document.getElementById("mobileDropdown");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (mobileDropdown) mobileDropdown.classList.toggle("hidden");
      else if (desktopMenu) desktopMenu.classList.toggle("hidden");
    });
  }

  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;
  const currentTheme = localStorage.getItem("theme");

  const updateIcon = (isDark) => {
    if (!themeIcon) return;
    if (isDark) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  };

  if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    updateIcon(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      updateIcon(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  window.showDetail = (key) => {
    const data = detailData[key];
    if (!data) return;
    document.getElementById("modalTitle").innerText = data.title;
    document.getElementById("modalIconContainer").innerHTML = data.icon;
    document.getElementById("modalBody").innerHTML = data.content;
    document.getElementById("detailModal")?.classList.remove("hidden");
  };
  document.getElementById("detailModal")?.addEventListener("click", (e) => {
    if (e.target.id === "detailModal")
      document.getElementById("detailModal").classList.add("hidden");
  });

  window.openModalInfo = (type) => {
    const modal = document.getElementById("infoModal");
    const content = modalContent[type];
    if (content && modal) {
      document.getElementById("modalTitle").textContent = content.title;
      document.getElementById("modalDesc").textContent = content.desc;
      document.getElementById("modalList").innerHTML = content.list
        .map((item) => `<li>${item}</li>`)
        .join("");
      modal.classList.remove("hidden");
    }
  };
  window.closeModalInfo = () =>
    document.getElementById("infoModal")?.classList.add("hidden");
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") window.closeModalInfo();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("exit-up");
        }
      });
    },
    { threshold: 0.1 }
  );
  document
    .querySelectorAll(
      ".hero-text, .section-title, .stats-title, .stat-card, .news-card, .hero-images, .animate-fade-in-up, .job-card"
    )
    .forEach((el) => observer.observe(el));

  setTimeout(() => {
    document
      .querySelectorAll("canvas")
      .forEach((c) => c.classList.add("slide-active"));
  }, 500);
};

const initNewsSlider = () => {
    const slider = document.getElementById('newsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
    });

    const updateDots = () => {
        const totalWidth = slider.scrollWidth; 
        const viewportWidth = slider.clientWidth; 
        const scrollLeft = slider.scrollLeft;
        
        const numPages = Math.ceil(totalWidth / viewportWidth);
        let currentPage = Math.round(scrollLeft / viewportWidth);

        dotsContainer.innerHTML = '';

        for (let i = 0; i < numPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentPage) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                slider.scrollTo({ left: i * viewportWidth, behavior: 'smooth' });
            });
            dotsContainer.appendChild(dot);
        }
        
        prevBtn.style.opacity = scrollLeft === 0 ? '0.3' : '1';
        nextBtn.style.opacity = scrollLeft + viewportWidth >= totalWidth ? '0.3' : '1';
    };

    slider.addEventListener('scroll', updateDots);
    updateDots(); 
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
  initNewsSlider();

  window.openModal = (type) => {
    window.openModalInfo(type);
  };

  window.closeModal = () => {
    window.closeModalInfo();
  };

  console.log("System Ready.");
});

const initNationalStats = () => {
  if (typeof Chart === "undefined") return;

  const getNationalChartOptions = (color) => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          titleColor: "#1f2937",
          titleFont: { family: "Outfit", weight: "bold" },
          bodyColor: "#4b5563",
          bodyFont: { family: "Outfit" },
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return ` ${context.parsed.y}%`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "Outfit", size: 10 },
            color: "#9ca3af",
          },
        },
        y: {
          display: true,
          grid: {
            borderDash: [4, 4],
            color: "#f3f4f6",
          },
          ticks: {
            font: { family: "Outfit", size: 10 },
            color: "#9ca3af",
            maxTicksLimit: 6,
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 20,
          hoverRadius: 6,
          hoverBorderWidth: 3,
          hoverBackgroundColor: "#ffffff",
          hoverBorderColor: color,
        },
        line: { tension: 0.4 },
      },
    };
  };

  const ctx1 = document.getElementById("unemploymentChart");
  if (ctx1) {
    new Chart(ctx1.getContext("2d"), {
      type: "line",
      data: {
        labels: ["2019", "2020", "2021", "2022", "2023", "Q1 24", "Q2 24"],
        datasets: [
          {
            label: "Unemployment Rate",
            data: [5.2, 7.0, 6.5, 5.8, 5.3, 5.1, 4.8],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            fill: true,
            borderWidth: 2,
          },
        ],
      },
      options: getNationalChartOptions("#ef4444"),
    });
  }

  const ctx2 = document.getElementById("laborChart");
  if (ctx2) {
    new Chart(ctx2.getContext("2d"), {
      type: "line",
      data: {
        labels: ["2019", "2020", "2021", "2022", "2023", "Q1 24", "Q2 24"],
        datasets: [
          {
            label: "Labor Force",
            data: [67.5, 64.0, 65.2, 66.5, 68.0, 69.1, 69.5],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            borderWidth: 2,
          },
        ],
      },
      options: getNationalChartOptions("#3b82f6"),
    });
  }
};

window.toggleReportModal = (show) => {
  const modal = document.getElementById("reportModal");
  const content = document.getElementById("reportModalContent");

  if (!modal || !content) return;

  if (show) {
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      content.classList.remove("scale-95");
      content.classList.add("scale-100");
    }, 10);
  } else {
    modal.classList.add("opacity-0");
    content.classList.remove("scale-100");
    content.classList.add("scale-95");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }
};

document.getElementById("reportModal")?.addEventListener("click", (e) => {
  if (e.target.id === "reportModal") {
    toggleReportModal(false);
  }
});

window.closeDetailModal = function () {
  const modal = document.getElementById("detailModal");
  if (modal) {
    modal.classList.add("hidden");
  }
};

const digitalTrendsData = {
  youngWorkers: {
    title: "Peluang Pekerja Muda",
    iconClass: "bg-blue-100 text-blue-600",
    icon: '<i class="fas fa-laptop-code"></i>',
    content: `
            <p>Generasi muda (Gen Z & Milenial) memiliki keunggulan kompetitif sebagai <em>digital natives</em>. Pasar kerja saat ini sangat menghargai kemampuan adaptasi teknologi dibandingkan sekadar gelar akademis.</p>
            <p class="font-bold mt-2">Peluang Spesifik:</p>
            <ul class="list-disc pl-5 space-y-1">
                <li><strong>Data & Analitik:</strong> Perusahaan butuh talenta yang bisa membaca data untuk keputusan bisnis.</li>
                <li><strong>Creative Tech:</strong> Content Creator, UI/UX Designer, dan Digital Marketer sangat dicari.</li>
                <li><strong>Coding & Dev:</strong> Fullstack Developer menjadi posisi entry-level dengan gaji di atas rata-rata.</li>
            </ul>`,
  },
  gigEconomy: {
    title: "Gig Economy (Ekonomi Serabutan)",
    iconClass: "bg-green-100 text-green-600",
    icon: '<i class="fas fa-briefcase"></i>',
    content: `
            <p>Gig Economy mengubah paradigma "Satu Pekerjaan Seumur Hidup" menjadi "Banyak Proyek Sekaligus". Ini mencakup driver ojol, freelancer desain, hingga konsultan lepas.</p>
            <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mt-2">
                <p class="text-xs text-yellow-800 font-bold">⚠️ Tantangan Utama:</p>
                <p class="text-xs text-yellow-700">Ketidakpastian pendapatan bulanan dan absennya tunjangan kesehatan (BPJS) atau THR dari pemberi kerja.</p>
            </div>`,
  },
  flexibility: {
    title: "Fleksibilitas & Mobilitas",
    iconClass: "bg-indigo-100 text-indigo-600",
    icon: '<i class="fas fa-house-laptop"></i>',
    content: `
            <p>Konsep <strong>WFA (Work From Anywhere)</strong> kini bukan lagi sekadar tren, tapi kebutuhan. Perusahaan yang menawarkan fleksibilitas memiliki retensi karyawan 30% lebih tinggi.</p>
            <p>Ini memungkinkan munculnya "Digital Nomad", di mana seseorang bisa bekerja untuk perusahaan di Jakarta sambil tinggal di Bali, atau bekerja untuk klien Amerika dari kamar tidur di Yogyakarta.</p>`,
  },
  globalCollab: {
    title: "Kolaborasi Global",
    iconClass: "bg-cyan-100 text-cyan-600",
    icon: '<i class="fas fa-earth-americas"></i>',
    content: `
            <p>Batasan negara runtuh berkat tools kolaborasi seperti Slack, Zoom, dan Trello. Tenaga kerja Indonesia kini bersaing langsung di pasar global.</p>
            <p>Ini membuka peluang pendapatan Dolar/Euro tanpa harus menjadi TKI fisik. Kuncinya adalah penguasaan <strong>Bahasa Inggris</strong> dan standar kerja internasional (disiplin & komunikasi asinkron).</p>`,
  },
  automation: {
    title: "Otomatisasi & Efisiensi",
    iconClass: "bg-orange-100 text-orange-600",
    icon: '<i class="fas fa-robot"></i>',
    content: `
            <p>Robot dan software tidak mengambil alih pekerjaan, tapi mengambil alih <strong>tugas</strong>. Pekerjaan repetitif (input data, kasir, sorting pabrik) akan hilang.</p>
            <p>Manusia difokuskan pada hal yang tidak bisa dilakukan mesin: <strong>Empati, Kreativitas, dan Pemecahan Masalah Kompleks</strong>. Pekerja yang bisa "mengelola" AI akan menggantikan mereka yang menolak AI.</p>`,
  },
  newJobs: {
    title: "Munculnya Pekerjaan Baru",
    iconClass: "bg-yellow-100 text-yellow-600",
    icon: '<i class="fas fa-lightbulb"></i>',
    content: `
            <p>10 tahun lalu, pekerjaan ini belum ada. Sekarang, mereka adalah primadona dengan gaji tinggi:</p>
            <ul class="list-disc pl-5 space-y-1 mt-2">
                <li><strong>AI Prompt Engineer:</strong> Ahli memerintah AI agar menghasilkan output terbaik.</li>
                <li><strong>Sustainability Manager:</strong> Mengurus standar hijau/ESG perusahaan.</li>
                <li><strong>Cloud Architect:</strong> Merancang infrastruktur server maya.</li>
            </ul>`,
  },
  skillDemand: {
    title: "Tuntutan Skill Baru (Reskilling)",
    iconClass: "bg-pink-100 text-pink-600",
    icon: '<i class="fas fa-brain"></i>',
    content: `
            <p>Ijazah kuliah hanya relevan untuk 3-5 tahun pertama kerja. Selebihnya adalah tentang <strong>Life-Long Learning</strong>.</p>
            <p>Kemampuan <em>Reskilling</em> (belajar skill baru dari nol) dan <em>Upskilling</em> (menajamkan skill lama) adalah mata uang baru. Skill teknis (Hard Skill) cepat usang, namun Soft Skill (Komunikasi, Leadership) abadi.</p>`,
  },
  workLife: {
    title: "Work-Life Balance",
    iconClass: "bg-teal-100 text-teal-600",
    icon: '<i class="fas fa-scale-balanced"></i>',
    content: `
            <p>Teknologi membuat kita "Always On". Notifikasi email kerja bisa masuk jam 10 malam. Ini memicu isu kesehatan mental dan <em>burnout</em>.</p>
            <p>Tantangan pekerja modern adalah menetapkan batas (boundaries). Tren baru seperti <em>"Right to Disconnect"</em> mulai diperjuangkan agar pekerja berhak mematikan notifikasi di luar jam kerja.</p>`,
  },
  digitalRisk: {
    title: "Tantangan Era Digital",
    iconClass: "bg-red-100 text-red-600",
    icon: '<i class="fas fa-shield-halved"></i>',
    content: `
            <p>Digitalisasi membawa risiko baru:</p>
            <ul class="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Keamanan Data:</strong> Risiko kebocoran data pribadi karyawan.</li>
                <li><strong>Digital Divide:</strong> Kesenjangan antara mereka yang punya akses internet cepat vs yang tidak (tertinggal).</li>
                <li><strong>Ageism:</strong> Pekerja senior yang gagap teknologi berisiko tersingkir lebih cepat.</li>
            </ul>`,
  },
};

window.showTrendDetail = (key) => {
  const data = digitalTrendsData[key];
  const modal = document.getElementById("trendModal");

  if (!data || !modal) return;

  document.getElementById("trendModalTitle").textContent = data.title;
  document.getElementById("trendModalIcon").innerHTML = data.icon;
  document.getElementById(
    "trendModalIcon"
  ).className = `w-10 h-10 rounded-lg flex items-center justify-center text-xl ${data.iconClass}`;
  document.getElementById("trendModalContentBody").innerHTML = data.content;

  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.remove("opacity-0");
    const content = document.getElementById("trendModalContent");
    if (content) content.classList.remove("scale-95");
  }, 10);
};

window.closeTrendModal = () => {
  const modal = document.getElementById("trendModal");
  if (modal) {
    modal.classList.add("opacity-0");
    const content = document.getElementById("trendModalContent");
    if (content) content.classList.add("scale-95");

    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }
};

document.getElementById("trendModal")?.addEventListener("click", (e) => {
  if (e.target.id === "trendModal") window.closeTrendModal();
});

