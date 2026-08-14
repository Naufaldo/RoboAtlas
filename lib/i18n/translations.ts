export type Locale = 'en' | 'id';

export const translations = {
  en: {
    // Navigation
    nav: {
      curriculum: 'Curriculum',
      robots: 'Robot Platforms',
      algorithms: 'Algorithm Lab',
      pathPlanning: 'Path Planning',
      kinematics: 'Kinematics',
      reference: 'Ref: PythonRobotics',
      github: 'GitHub Repository',
      domains: '7 Domains',
      activeFoundation: 'Foundation Active',
    },
    // Hero
    hero: {
      tag: 'Next-Gen Robotics Textbook + Interactive Simulator',
      title1: 'Learn Robotics by',
      titleHighlight: 'Seeing It Work.',
      description:
        'Visual explanations, rigorous mathematics, step-by-step algorithms, and deterministic browser simulations for autonomous mobile robotics.',
      ctaCurriculum: 'Explore Curriculum',
      ctaAlgorithms: 'Algorithm Laboratory',
      clientSide: '100% Client-Side',
      zeroBackend: 'Zero Backend',
      katexMath: 'KaTeX Mathematics',
    },
    // Methodology
    methodology: {
      tag: 'The Educational Methodology',
      title: 'From Mathematical Theory to Running Code',
      subtitle: 'Every topic adheres to a disciplined 6-stage engineering learning cycle.',
      steps: [
        {
          step: '01',
          title: 'Concept',
          desc: 'Physical intuition & geometric understanding before touching code.',
        },
        {
          step: '02',
          title: 'Mathematics',
          desc: 'Rigorous KaTeX formulations with progressive variable tables.',
        },
        {
          step: '03',
          title: 'Algorithm',
          desc: 'Language-agnostic pseudocode breaking down each execution step.',
        },
        {
          step: '04',
          title: 'Simulation',
          desc: 'Deterministic 60 FPS Canvas simulators with real-time HUD telemetry.',
        },
        {
          step: '05',
          title: 'TypeScript Code',
          desc: 'Pure, framework-independent algorithm implementations.',
        },
        {
          step: '06',
          title: 'Experiment',
          desc: 'Manipulate noise, obstacles, and control parameters dynamically.',
        },
      ],
    },
    // Domains section
    domainsSection: {
      tag: 'Curriculum Structure',
      title: '7 Core Robotics Domains',
      subtitle: 'Comprehensive curriculum coverage from kinematics to multi-agent swarm consensus.',
      viewAll: 'View full curriculum',
      exploreDomain: 'Explore domain',
      openDomain: 'Open Domain',
      keyTopics: 'Key Topics:',
    },
    // Algorithm Matrix
    algorithmMatrix: {
      tag: 'Algorithm Matrix',
      title: 'Classical & Modern Planners',
      viewAll: 'View all algorithms',
      searchPlaceholder:
        'Search algorithms by name, concept, or tag (e.g. A*, RRT, EKF, Particle, Consensus)...',
      category: 'Category',
      difficulty: 'Difficulty',
      details: 'Details',
      studyAlgorithm: 'Study Algorithm',
      deterministicSim: 'Deterministic Sim',
      noResults: 'No algorithms match your query. Try adjusting your search filters.',
      coreMath: 'Core Mathematical Formulation',
      classicalPaper: 'Classical Paper:',
    },
    // Attribution
    attribution: {
      tag: 'Academic Inspiration & Attribution',
      title: 'Inspired by PythonRobotics by Atsushi Sakai',
      description:
        'RoboAtlas is developed as an original, interactive TypeScript educational web platform inspired by the curriculum breadth of Atsushi Sakai’s renowned PythonRobotics repository and classical robotics papers. All educational explanations and browser simulations are engineered from first principles.',
      githubLink: 'GitHub / PythonRobotics ↗',
      textbookLink: 'PythonRobotics Textbook ↗',
    },
    // Simulators Common
    sim: {
      pause: 'Pause',
      resume: 'Resume',
      simulate: 'Simulate',
      reset: 'Reset',
      speed: 'Speed',
      map: 'Map',
      rays: 'LiDAR Rays',
      clickPrompt: 'Click anywhere on canvas to direct robot',
      fpsEngine: '60 FPS Client-Side Engine',
      clear: 'Clear',
    },
    // Footer
    footer: {
      about:
        'An interactive, visual-first robotics learning platform and algorithm laboratory. Simulate kinematic models, path planners, state estimators, and swarm consensus algorithms directly in your browser with zero backend requirements.',
      architecture: 'Client-Side Static Architecture',
      pagesCompatible: 'GitHub Pages Compatible',
      learningDomains: 'Learning Domains',
      references: 'References & Credits',
      openSource: 'Open Source Repository',
      license: 'Released under MIT License',
      copyright: 'RoboAtlas. Original Educational Content & TypeScript Engine.',
    },
    // Theme & Lang
    theme: {
      dark: 'Dark Mode',
      light: 'Light Mode',
    },
  },
  id: {
    // Navigation
    nav: {
      curriculum: 'Kurikulum',
      robots: 'Platform Robot',
      algorithms: 'Lab Algoritma',
      pathPlanning: 'Perencanaan Jalur',
      kinematics: 'Kinematika',
      reference: 'Ref: PythonRobotics',
      github: 'Repositori GitHub',
      domains: '7 Domain',
      activeFoundation: 'Fondasi Aktif',
    },
    // Hero
    hero: {
      tag: 'Buku Teks Robotika Modern + Simulator Interaktif',
      title1: 'Belajar Robotika dengan',
      titleHighlight: 'Melihatnya Bekerja.',
      description:
        'Penjelasan visual, matematika rigor, algoritma bertahap, dan simulasi browser deterministik untuk robotika bergerak otonom.',
      ctaCurriculum: 'Jelajahi Kurikulum',
      ctaAlgorithms: 'Laboratorium Algoritma',
      clientSide: '100% Client-Side',
      zeroBackend: 'Tanpa Server Backend',
      katexMath: 'Matematika KaTeX',
    },
    // Methodology
    methodology: {
      tag: 'Metodologi Pembelajaran',
      title: 'Dari Teori Matematika ke Kode Berjalan',
      subtitle: 'Setiap materi mengikuti siklus 6 tahapan pembelajaran rekayasa yang disiplin.',
      steps: [
        {
          step: '01',
          title: 'Konsep',
          desc: 'Intuisi fisik & pemahaman geometris sebelum menyentuh kode.',
        },
        {
          step: '02',
          title: 'Matematika',
          desc: 'Formulasi KaTeX presisi dengan tabel variabel progresif.',
        },
        {
          step: '03',
          title: 'Algoritma',
          desc: 'Pseudocode independen bahasa yang merinci setiap langkah eksekusi.',
        },
        {
          step: '04',
          title: 'Simulasi',
          desc: 'Simulator Canvas 60 FPS deterministik dengan telemetri HUD real-time.',
        },
        {
          step: '05',
          title: 'Kode TypeScript',
          desc: 'Implementasi algoritma murni tanpa dependensi framework luar.',
        },
        {
          step: '06',
          title: 'Eksperimen',
          desc: 'Ubah noise sensor, rintangan, dan parameter kendali secara dinamis.',
        },
      ],
    },
    // Domains section
    domainsSection: {
      tag: 'Struktur Kurikulum',
      title: '7 Domain Utama Robotika',
      subtitle: 'Cakupan kurikulum lengkap mulai dari kinematika hingga konsensus kawanan multi-agent.',
      viewAll: 'Lihat seluruh kurikulum',
      exploreDomain: 'Pelajari domain',
      openDomain: 'Buka Domain',
      keyTopics: 'Topik Utama:',
    },
    // Algorithm Matrix
    algorithmMatrix: {
      tag: 'Matriks Algoritma',
      title: 'Perencana Jalur Klasik & Modern',
      viewAll: 'Lihat semua algoritma',
      searchPlaceholder:
        'Cari algoritma berdasarkan nama, konsep, atau tag (mis. A*, RRT, EKF, Partikel, Konsensus)...',
      category: 'Kategori',
      difficulty: 'Tingkat Kesulitan',
      details: 'Detail',
      studyAlgorithm: 'Pelajari Algoritma',
      deterministicSim: 'Simulasi Deterministik',
      noResults: 'Tidak ada algoritma yang cocok dengan pencarian Anda. Coba sesuaikan filter.',
      coreMath: 'Formulasi Matematika Inti',
      classicalPaper: 'Paper Klasik Acuan:',
    },
    // Attribution
    attribution: {
      tag: 'Inspirasi Akademik & Atribusi',
      title: 'Terinspirasi oleh PythonRobotics karya Atsushi Sakai',
      description:
        'RoboAtlas dikembangkan sebagai platform pembelajaran web TypeScript interaktif orisinal yang terinspirasi oleh keluasan kurikulum repositori terkenal PythonRobotics milik Atsushi Sakai dan paper-paper klasik robotika. Seluruh penjelasan edukasi dan simulasi browser dibangun dari prinsip dasar.',
      githubLink: 'GitHub / PythonRobotics ↗',
      textbookLink: 'Buku Teks PythonRobotics ↗',
    },
    // Simulators Common
    sim: {
      pause: 'Jeda',
      resume: 'Lanjutkan',
      simulate: 'Simulasikan',
      reset: 'Reset',
      speed: 'Kecepatan',
      map: 'Peta',
      rays: 'Sinar LiDAR',
      clickPrompt: 'Klik di canvas mana pun untuk mengarahkan robot',
      fpsEngine: 'Engine 60 FPS Client-Side',
      clear: 'Bersihkan',
    },
    // Footer
    footer: {
      about:
        'Platform pembelajaran robotika berbasis visual dan laboratorium algoritma interaktif. Simulasikan model kinematika, perencana jalur, estimator status, dan algoritma konsensus kawanan langsung di browser Anda tanpa kebutuhan server backend.',
      architecture: 'Arsitektur Statis Sisi Klien',
      pagesCompatible: 'Kompatibel GitHub Pages',
      learningDomains: 'Domain Pembelajaran',
      references: 'Referensi & Penghargaan',
      openSource: 'Repositori Open Source',
      license: 'Dirilis di bawah Lisensi MIT',
      copyright: 'RoboAtlas. Konten Edukasi Orisinal & TypeScript Engine.',
    },
    // Theme & Lang
    theme: {
      dark: 'Mode Gelap',
      light: 'Mode Terang',
    },
  },
};
