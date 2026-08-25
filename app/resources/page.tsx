'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  BookOpen,
  FileText,
  Database,
  ExternalLink,
  Sparkles,
  Download,
  Bookmark,
  Search,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export default function ResourcesPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'books' | 'formulas' | 'datasets' | 'glossary'>('books');

  const textbooks = [
    {
      title: 'Elements of Robotics',
      authors: 'Mordechai Ben-Ari & Francesco Mondada (2018)',
      publisher: 'Springer Open',
      category: 'Foundations & Kinematics',
      descriptionEn:
        'A comprehensive open-access textbook introducing mobile robotics, sensors, differential kinematics, and feedback control architectures.',
      descriptionId:
        'Buku teks akses terbuka yang membahas robotika bergerak, sensor, kinematika roda diferensial, dan arsitektur kendali umpan balik.',
      doi: 'https://doi.org/10.1007/978-3-319-62533-1',
      tag: 'Open Access PDF',
    },
    {
      title: 'Foundations of Robotics: A Multidisciplinary Approach',
      authors: 'Damith Herath & David St-Onge (2022)',
      publisher: 'Springer',
      category: 'Mathematics & Spatial Geometry',
      descriptionEn:
        'Pedagogical textbook covering 2D/3D coordinate transformations, Euler angles, robot modeling, and real-time control implementations.',
      descriptionId:
        'Buku teks pedagogis yang membahas transformasi koordinat 2D/3D, sudut Euler, pemodelan robot, dan implementasi kendali waktu nyata.',
      doi: 'https://doi.org/10.1007/978-981-19-1983-1',
      tag: 'Academic Textbook',
    },
    {
      title: 'Planning Algorithms',
      authors: 'Steven M. LaValle (2006)',
      publisher: 'Cambridge University Press',
      category: 'Motion Planning & Graph Search',
      descriptionEn:
        'The definitive reference on discrete graph search, A* heuristics, configuration spaces (C-space), RRT, and trajectory optimization.',
      descriptionId:
        'Referensi otoritatif untuk pencarian graf diskrit, heuristik A*, ruang konfigurasi (C-space), RRT, dan optimasi trajektori.',
      doi: 'https://lavalle.pl/planning/',
      tag: 'Free Online Edition',
    },
    {
      title: 'Probabilistic Robotics',
      authors: 'Sebastian Thrun, Wolfram Burgard, & Dieter Fox (2005)',
      publisher: 'MIT Press',
      category: 'State Estimation & SLAM',
      descriptionEn:
        'The foundational classic on recursive Bayesian estimation, Extended Kalman Filters (EKF), Monte Carlo Localization (MCL), and SLAM.',
      descriptionId:
        'Karya klasik tentang estimasi rekursif Bayesian, Extended Kalman Filter (EKF), Filter Partikel MCL, dan pemetaan SLAM.',
      doi: 'https://www.probabilistic-robotics.org/',
      tag: 'Foundational Reference',
    },
    {
      title: 'Modern Robotics: Mechanics, Planning, and Control',
      authors: 'Kevin M. Lynch & Frank C. Park (2017)',
      publisher: 'Cambridge University Press',
      category: 'Lie Groups & Manipulation',
      descriptionEn:
        'Advanced mathematical treatment of rigid-body mechanics, twists in se(3), wrenches, and product of exponentials for serial manipulators.',
      descriptionId:
        'Pendekatan matematika lanjutan untuk mekanika benda kaku, twist pada se(3), wrench, dan Product of Exponentials pada lengan manipulator.',
      doi: 'http://modernrobotics.org/',
      tag: 'Free Textbook + Videos',
    },
    {
      title: 'Handbook of Marine Craft Hydrodynamics and Motion Control',
      authors: 'Thor I. Fossen (2011)',
      publisher: 'John Wiley & Sons',
      category: 'Marine Robotics & Hydrodynamics',
      descriptionEn:
        'The definitive global standard on 6-DOF marine vessel modeling, added mass, hydrodynamic damping, and thruster control allocation.',
      descriptionId:
        'Standar global otoritatif tentang pemodelan wahana laut 6-DOF, added mass, redaman hidrodinamika, dan alokasi kontrol pendorong.',
      doi: 'https://doi.org/10.1002/9781119994138',
      tag: 'Marine Reference',
    },
    {
      title: 'Introduction to Humanoid Robotics',
      authors: 'Shuuji Kajita, Hirohisa Hirukawa, Kensuke Harada, Kazuhito Yokoi (2014)',
      publisher: 'Springer',
      category: 'Legged & Humanoid Locomotion',
      descriptionEn:
        'Authoritative reference on Zero Moment Point (ZMP) stability, Linear Inverted Pendulum Model (LIPM), and 3D bipedal walking pattern generation.',
      descriptionId:
        'Referensi otoritatif tentang stabilitas Zero Moment Point (ZMP), Linear Inverted Pendulum Model (LIPM), dan pembangkitan pola jalan bipedal.',
      doi: 'https://doi.org/10.1007/978-3-642-54536-8',
      tag: 'Humanoid Classic',
    },
    {
      title: 'Small Unmanned Aircraft: Theory and Practice',
      authors: 'Randal W. Beard & Timothy W. McLain (2012)',
      publisher: 'Princeton University Press',
      category: 'Aerial Robotics & UAVs',
      descriptionEn:
        'Rigorous treatment of 6-DOF flight dynamics, rotor thrust allocation, cascaded autopilot architectures, and waypoint tracking.',
      descriptionId:
        'Kajian mendalam tentang dinamika penerbangan 6-DOF, alokasi dorongan rotor, arsitektur autopilot kaskade, dan pelacakan waypoint.',
      doi: 'https://press.princeton.edu/books/hardcover/9780691149219/small-unmanned-aircraft',
      tag: 'UAV Reference',
    },
    {
      title: 'State Estimation for Robotics',
      authors: 'Timothy D. Barfoot (2017)',
      publisher: 'Cambridge University Press',
      category: 'Lie Groups & Factor Graph SLAM',
      descriptionEn:
        'Comprehensive exploration of state estimation on matrix Lie groups SO(3)/SE(3), batch continuous-time estimation, and sparse factor graphs.',
      descriptionId:
        'Eksplorasi komprehensif estimasi status pada grup Lie matriks SO(3)/SE(3), estimasi waktu kontinu, dan graf faktor jarang.',
      doi: 'http://asrl.utias.utoronto.ca/~tdb/bib/barfoot_ser17.pdf',
      tag: 'Free PDF Edition',
    },
    {
      title: 'A Micro Lie Theory for State Estimation in Robotics',
      authors: 'Joan Solà, Jeremie Deray, Dinesh Atchuthan (2018)',
      publisher: 'Institut de Robòtica i Informàtica Industrial / arXiv',
      category: 'Lie Theory & Manifold Optimization',
      descriptionEn:
        'Pragmatic, visual, and mathematically rigorous tutorial on Lie groups, Lie algebras, and error-state Kalman filtering for robotics engineers.',
      descriptionId:
        'Tutorial praktis, visual, dan matematis tentang grup Lie, aljabar Lie, dan error-state Kalman filter untuk rekayasawan robotika.',
      doi: 'https://arxiv.org/abs/1812.01537',
      tag: 'Open Access Paper',
    },
  ];

  const cheatSheets = [
    {
      domain: 'SE(2) Homogeneous Transform',
      formula: 'T_R^W = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & t_x \\\\ \\sin\\theta & \\cos\\theta & t_y \\\\ 0 & 0 & 1 \\end{bmatrix}',
      meaningEn: 'Transforms 2D coordinates from robot local frame {R} into global world frame {W}.',
      meaningId: 'Mengonversi koordinat 2D dari kerangka lokal robot {R} ke kerangka dunia global {W}.',
    },
    {
      domain: 'Differential-Drive Kinematics',
      formula: 'v = \\frac{v_R + v_L}{2}, \\quad \\omega = \\frac{v_R - v_L}{L}, \\quad R_{ICC} = \\frac{L}{2}\\left(\\frac{v_R + v_L}{v_R - v_L}\\right)',
      meaningEn: 'Forward kinematic mapping from wheel speeds to body linear velocity and rotational yaw rate.',
      meaningId: 'Pemetaan kinematika maju dari kecepatan roda ke kecepatan linier bodi dan laju yaw rotasi.',
    },
    {
      domain: 'Zero Moment Point (ZMP)',
      formula: 'x_{\\text{ZMP}} = x_{\\text{CoM}} - \\frac{z_c}{g} \\ddot{x}_{\\text{CoM}}, \\quad \\omega_0 = \\sqrt{\\frac{g}{z_c}}',
      meaningEn: 'Dynamic balance criterion: tipping moments vanish if ZMP stays inside the foot support polygon.',
      meaningId: 'Kriteria keseimbangan dinamis: momen gulingan nol jika ZMP berada di dalam poligon tumpuan kaki.',
    },
    {
      domain: 'Fossen 6-DOF Marine Equation',
      formula: '(\\mathbf{M}_{RB} + \\mathbf{M}_A) \\boldsymbol{\\dot{\\nu}} + \\mathbf{C}(\\boldsymbol{\\nu})\\boldsymbol{\\nu} + \\mathbf{D}(\\boldsymbol{\\nu})\\boldsymbol{\\nu} + \\mathbf{g}(\\boldsymbol{\\eta}) = \\boldsymbol{\\tau}',
      meaningEn: 'Nonlinear subsea AUV equations incorporating hydrodynamic added mass M_A and quadratic water drag.',
      meaningId: 'Persamaan non-linear AUV bawah air yang menggabungkan massa tambahan fluida M_A dan hambatan seret kuadratik.',
    },
    {
      domain: 'Rodrigues SO(3) Exponential Map',
      formula: '\\mathbf{R} = \\exp([\\boldsymbol{\\omega}]_\\times) = \\mathbf{I} + \\frac{\\sin\\theta}{\\theta}[\\boldsymbol{\\omega}]_\\times + \\frac{1-\\cos\\theta}{\\theta^2}[\\boldsymbol{\\omega}]_\\times^2',
      meaningEn: 'Wraps tangent Lie algebra rotation vector omega into a 3D orthogonal rotation matrix in SO(3).',
      meaningId: 'Memetakan vektor putaran aljabar Lie omega menjadi matriks rotasi ortogonal 3D pada manifold SO(3).',
    },
    {
      domain: 'A* Heuristic Evaluation',
      formula: 'f(n) = g(n) + h(n), \\quad h_{\\text{octile}}(n) = (\\Delta x + \\Delta y) + (\\sqrt{2} - 2)\\min(\\Delta x, \\Delta y)',
      meaningEn: 'Cost function combining exact cost g(n) with admissible remaining distance estimate h(n).',
      meaningId: 'Fungsi biaya yang menggabungkan biaya nyata g(n) dengan estimasi jarak tersisa h(n).',
    },
    {
      domain: 'Pure Pursuit Steering',
      formula: '\\delta = \\arctan\\left( \\frac{2 L \\sin\\alpha}{L_f} \\right)',
      meaningEn: 'Geometric arc steering angle chasing a lookahead target point at distance L_f.',
      meaningId: 'Sudut kemudi busur geometris untuk mengejar titik target pada jarak lookahead L_f.',
    },
    {
      domain: 'Log-Odds Occupancy Update',
      formula: 'l_t(m_i) = l_{t-1}(m_i) + \\text{inv\\_sensor}(m_i, x_t, z_t) - l_0',
      meaningEn: 'Recursive Bayesian probability update converted to fast additive log-odds scale.',
      meaningId: 'Pembaruan probabilitas rekursif Bayesian yang diubah ke skala penjumlahan log-odds cepat.',
    },
    {
      domain: 'Graph Laplacian Swarms',
      formula: '\\mathbf{L} = \\mathbf{D} - \\mathbf{A}, \\quad \\mathbf{\\dot{x}} = -\\mathbf{L} \\mathbf{x}',
      meaningEn: 'Decentralized consensus protocol driving multi-agent swarm state to average centroid.',
      meaningId: 'Protokol konsensus terdesentralisasi yang memandu kawanan multi-agent ke konsensus geometris.',
    },
  ];

  const datasets = [
    {
      name: 'MIT Stata Center 2D LiDAR Dataset',
      sensors: 'Hokuyo 2D Laser Scanners, Wheel Odometry',
      useCase: '2D Occupancy Grid Mapping & Graph SLAM evaluation',
      format: 'LCM Logs, ROS 1 / 2 Bag files',
      link: 'https://projects.csail.mit.edu/stata/',
    },
    {
      name: 'Intel Research Lab Seattle 2D Dataset',
      sensors: 'Sick LMS 200 Laser, Odometry',
      useCase: 'Canonical benchmark for 2D scan matching and particle filter MCL',
      format: 'Carmen log, Raw ASCII',
      link: 'https://www.openslam.org/',
    },
    {
      name: 'KITTI Vision & Odometry Benchmark',
      sensors: 'Velodyne HDL-64E 3D LiDAR, Stereo Cameras, RTK GPS/IMU',
      useCase: 'Autonomous driving visual odometry, 3D object detection, and 3D SLAM',
      format: 'PNG, BIN point clouds, Calibration matrices',
      link: 'http://www.cvlibs.net/datasets/kitti/',
    },
    {
      name: 'EuRoC MAV Micro Aerial Vehicle Dataset',
      sensors: 'Stereo Cameras (WVGA 20Hz), ADIS16448 IMU (200Hz), Vicon GT',
      useCase: 'Visual-Inertial Odometry (VIO) & 3D Flight Control Benchmark',
      format: 'ROS Bag, ASL Format, Ground-Truth Trajectories',
      link: 'https://projects.asl.ethz.ch/datasets/doku.php?id=kmavvisualinertialdatasets',
    },
    {
      name: 'TUM RGB-D SLAM Benchmark',
      sensors: 'Microsoft Kinect (30Hz), Motion Capture Ground Truth',
      useCase: 'Dense 3D Volumetric Mapping, DVO, and 3DGS-SLAM testing',
      format: 'RGB & Depth PNG pairs, Camera intrinsics',
      link: 'https://cvg.cit.tum.de/data/datasets/rgbd-dataset',
    },
    {
      name: 'PythonRobotics Open Algorithm Collection',
      sensors: 'Pure Python/TypeScript Multi-Platform Robotics Algorithms',
      useCase: 'Open algorithm collection covering mapping, localization, SLAM, and planning',
      format: 'Open Source GitHub Repository',
      link: 'https://github.com/AtsushiSakai/PythonRobotics',
    },
    {
      name: 'NOAA Multibeam Bathymetry Subsea Dataset',
      sensors: 'Multibeam Sonar, USBL Acoustic Positioning, DVL Doppler Velocity Log',
      useCase: 'Subsea AUV Underwater Mapping, Bathymetric SLAM & Terrain Navigation',
      format: 'GeoTIFF, XYZ Point Clouds, BAG Files',
      link: 'https://www.ncei.noaa.gov/products/multibeam-bathymetry',
    },
  ];

  const glossary = [
    {
      term: 'SE(2) / SE(3)',
      defEn: 'Special Euclidean Group representing rigid transformations (rotations + translations) in 2D or 3D without deformation.',
      defId: 'Special Euclidean Group yang merepresentasikan transformasi benda kaku (rotasi + translasi) pada ruang 2D atau 3D.',
    },
    {
      term: 'Non-Holonomic Constraint',
      defEn: 'A kinematic constraint involving velocities (e.g. no lateral wheel sliding) that cannot be integrated into geometric position constraints.',
      defId: 'Kendala kinematika yang melibatkan kecepatan (seperti larangan slip lateral) yang tidak dapat diintegrasikan menjadi kendala posisi geometris murni.',
    },
    {
      term: 'Instantaneous Center of Curvature (ICC)',
      defEn: 'The common point in space around which all wheels of a differential or Ackermann vehicle rotate at a given instant in time.',
      defId: 'Titik pusat rotasi sesaat di mana seluruh roda robot berputar mengelilinginya pada selang waktu seketika.',
    },
    {
      term: 'Admissible Heuristic',
      defEn: 'A heuristic function h(n) in graph search that never overestimates the true minimal cost from node n to the goal.',
      defId: 'Fungsi heuristik h(n) dalam pencarian graf yang nilainya tidak pernah melebihi estimasi biaya minimal sebenarnya menuju target.',
    },
    {
      term: 'Gimbal Lock',
      defEn: 'The loss of one rotational degree of freedom in three-dimensional Euler angle representations when two rotation axes become parallel.',
      defId: 'Kondisi hilangnya satu derajat kebebasan rotasi pada representasi sudut Euler 3D saat dua sumbu rotasi menjadi sejajar.',
    },
    {
      term: 'Log-Odds',
      defEn: 'The natural logarithm of the ratio of probability p to (1-p), turning Bayesian probability products into fast additions.',
      defId: 'Logaritma natural dari rasio probabilitas p terhadap (1-p), mengubah perkalian probabilitas menjadi operasi penjumlahan cepat.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isId ? 'Pusat Sumber Daya & Literatur Akademik' : 'Academic Literature & Reference Library'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
          {isId ? 'Sumber Daya, Buku Teks & Rumus Referensi' : 'Resources, Textbooks & Formula Library'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Kumpulan literatur buku teks resmi, lembar contekan formula matematika, dataset benchmark standar, dan glosarium istilah robotika internasional.'
            : 'Curated collection of canonical textbooks, mathematical cheat sheets, robotics benchmark datasets, and standard terminology glossary.'}
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
          <button
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'books'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isId ? 'Buku Teks Akademik' : 'Textbooks & Literature'}</span>
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'formulas'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isId ? 'Lembar Rumus Matematika' : 'Math Cheat Sheets'}</span>
          </button>

          <button
            onClick={() => setActiveTab('datasets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'datasets'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isId ? 'Dataset Benchmark' : 'Benchmark Datasets'}</span>
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'glossary'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isId ? 'Glosarium Istilah' : 'Glossary & Terms'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Textbooks */}
      {activeTab === 'books' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {textbooks.map((book) => (
            <div
              key={book.title}
              className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-md hover:border-cyan-500/40 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                    {book.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{book.tag}</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {book.title}
                </h2>
                <p className="text-xs text-cyan-700 dark:text-cyan-300 font-mono font-medium">
                  {book.authors} — {book.publisher}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-1">
                  {isId ? book.descriptionId : book.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
                <a
                  href={book.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                >
                  <span>{isId ? 'Buka Tautan Sumber Resmi' : 'Access Publication / Website'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Formulas */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cheatSheets.map((cs) => (
              <div
                key={cs.domain}
                className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {cs.domain}
                  </h2>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">Formula</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto scrollbar-thin flex justify-center py-4">
                  <code>{cs.formula}</code>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  {isId ? cs.meaningId : cs.meaningEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Datasets */}
      {activeTab === 'datasets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {datasets.map((ds) => (
            <div
              key={ds.name}
              className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-500" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {ds.name}
                  </h2>
                </div>
                <div className="space-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <p><span className="text-cyan-600 dark:text-cyan-400">Sensors:</span> {ds.sensors}</p>
                  <p><span className="text-cyan-600 dark:text-cyan-400">Use Case:</span> {ds.useCase}</p>
                  <p><span className="text-cyan-600 dark:text-cyan-400">Format:</span> {ds.format}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
                <a
                  href={ds.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                >
                  <span>{isId ? 'Unduh / Kunjungi Dataset' : 'Visit Dataset Repository'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Glossary */}
      {activeTab === 'glossary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {glossary.map((item) => (
            <div
              key={item.term}
              className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm"
            >
              <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                {item.term}
              </h2>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                {isId ? item.defId : item.defEn}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
