export interface LessonPedagogyData {
  learningObjectivesEn: string[];
  learningObjectivesId: string[];
  whyItMattersEn: string;
  whyItMattersId: string;
  progressionStepsEn: string[];
  progressionStepsId: string[];
}

export const LESSON_PEDAGOGY_MAP: Record<string, LessonPedagogyData> = {
  'intro-to-robotics': {
    learningObjectivesEn: [
      'Understand the Sense-Plan-Act recursive loop in autonomous cyber-physical systems.',
      'Differentiate between physical morphologies: Mobile AGVs, Articulated Arms, Drones, Submersibles, and Humanoids.',
      'Analyze embedded sensor-actuator hardware anatomy and real-time computing constraints.',
      'Identify key autonomy levels from direct teleoperation to fully autonomous swarm coordination.',
    ],
    learningObjectivesId: [
      'Memahami siklus rekursif Sense-Plan-Act pada sistem siber-fisik otonom.',
      'Membedakan morfologi fisik robot: AGV Roda, Lengan Artikulasi, Drone UAV, Kapal Selam ROV, dan Humanoid.',
      'Menganalisis anatomi perangkat keras sensor-aktuator dan kendala komputasi waktu-nyata.',
      'Mengidentifikasi tingkatan otonomi dari teleoperasi manual hingga koordinasi kawanan otonom penuh.',
    ],
    whyItMattersEn: 'Establishes the systems-engineering foundation needed to architect real-time autonomy software across diverse robot hardware.',
    whyItMattersId: 'Membangun fondasi rekayasa sistem yang dibutuhkan untuk merancang perangkat lunak otonom pada beragam perangkat keras robot.',
    progressionStepsEn: ['Cyber-Physical Loop', 'Morphology Taxonomy', 'Interactive Hierarchy', 'Real-World Systems'],
    progressionStepsId: ['Siklus Siber-Fisik', 'Taksonomi Morfologi', 'Hierarki Interaktif', 'Aplikasi Nyata'],
  },
  'vectors-and-coordinate-geometry': {
    learningObjectivesEn: [
      'Differentiate between scalar physical quantities and spatial vectors in Euclidean space.',
      'Derive the Euclidean L2 norm and calculate unit direction normalization vectors.',
      'Convert between Cartesian coordinates (vx, vy) and polar coordinates (r, θ) using atan2(y, x).',
      'Apply vector displacements to model robot position, linear velocity, and LiDAR laser rays.',
    ],
    learningObjectivesId: [
      'Membedakan besaran skalar fisik dan vektor spasial pada ruang Euclidean.',
      'Menurunkan norma Euclidean L2 dan menghitung normalisasi vektor arah satuan.',
      'Mengonversi koordinat Kartesius (vx, vy) ke polar (r, θ) dengan fungsi presisi atan2(y, x).',
      'Menerapkan pergeseran vektor untuk memodelkan posisi robot, kecepatan linier, dan pancaran laser LiDAR.',
    ],
    whyItMattersEn: 'Vectors are the universal language of spatial geometry; every velocity command, force vector, and waypoint is expressed as a vector.',
    whyItMattersId: 'Vektor adalah bahasa universal geometri spasial; setiap perintah kecepatan motor, vektor gaya, dan waypoint dinyatakan dalam bentuk vektor.',
    progressionStepsEn: ['Cartesian Components', 'Norm & Normalization', 'Interactive Vector Lab', 'Robot Motion Vectors'],
    progressionStepsId: ['Komponen Kartesius', 'Norma & Normalisasi', 'Lab Vektor Interaktif', 'Vektor Gerak Robot'],
  },
  'dot-product-and-projection': {
    learningObjectivesEn: [
      'Derive algebraic component sum and geometric cosine formulations of the dot product.',
      'Determine vector orthogonality and evaluate collinear alignment angles.',
      'Calculate scalar and vector projections of displacement vectors onto arbitrary lines.',
      'Formulate cross-track error (e_lat) for autonomous vehicle path tracking controllers.',
    ],
    learningObjectivesId: [
      'Menurunkan formulasi penjumlahan komponen aljabar dan rumus kosinus geometris dot product.',
      'Menentukan ortogonalitas vektor dan mengevaluasi sudut keselarasan arah gerak.',
      'Menghitung proyeksi skalar dan vektor dari perpindahan posisi ke garis lintasan sembarang.',
      'Merumuskan galat samping (cross-track error) untuk kontroler pelacakan jalur kendaraan otonom.',
    ],
    whyItMattersEn: 'Essential for computing lateral steering error in path tracking (Stanley/Pure Pursuit) and estimating LiDAR surface normals.',
    whyItMattersId: 'Krusial untuk menghitung galat kemudi samping pada kontroler pelacakan jalur (Stanley/Pure Pursuit) dan estimasi normal permukaan LiDAR.',
    progressionStepsEn: ['Dot Product Axioms', 'Projection Derivation', 'Interactive Shadow Lab', 'Cross-Track Steering'],
    progressionStepsId: ['Aksioma Dot Product', 'Penurunan Proyeksi', 'Lab Bayangan Interaktif', 'Kemudi Cross-Track'],
  },
  'probability-for-robotics': {
    learningObjectivesEn: [
      'Model uncertain physical robot states using random variables and probability distributions.',
      'Formulate discrete and continuous expectation (mean) and variance statistics.',
      'Derive Conditional Probability and Bayes Theorem P(A|B) = P(B|A)P(A) / P(B).',
      'Fuse prior domain knowledge with noisy sensor likelihoods to compute posterior state beliefs.',
    ],
    learningObjectivesId: [
      'Memodelkan status fisik robot di dunia nyata menggunakan variabel acak dan distribusi probabilitas.',
      'Merumuskan nilai harapan ekspektasi (mean) dan variansi secara diskrit dan kontinu.',
      'Menurunkan rumus Probabilitas Bersyarat dan Teorema Bayes P(A|B) = P(B|A)P(A) / P(B).',
      'Memadukan keyakinan awal (prior) dengan bukti sensor berderau (likelihood) untuk menghasilkan posterior.',
    ],
    whyItMattersEn: 'Robots never observe physical reality with 100% certainty; Bayesian reasoning is the mathematical engine behind all probabilistic state estimation.',
    whyItMattersId: 'Robot fisik tidak pernah melihat dunia nyata dengan kepastian 100%; penalaran Bayesian adalah mesin matematis di balik seluruh estimasi status probabilistik.',
    progressionStepsEn: ['Random Variables', 'Bayes Formulation', 'Interactive Room Lab', 'Posterior Update'],
    progressionStepsId: ['Variabel Acak', 'Formulasi Bayes', 'Lab Ruangan Interaktif', 'Pembaruan Posterior'],
  },
  '2d-rotation-matrices': {
    learningObjectivesEn: [
      'Derive the 2D rotation matrix R(θ) using trigonometric angle-sum identities.',
      'Verify Special Orthogonal Group SO(2) properties: R^T = R^-1, det(R) = +1, and norm preservation.',
      'Compute coordinates of rotated vectors without geometric distortion.',
      'Differentiate between active vector rotations and passive coordinate frame transformations.',
    ],
    learningObjectivesId: [
      'Menurunkan matriks rotasi 2D R(θ) menggunakan identitas trigonometri penjumlahan sudut.',
      'Membuktikan sifat grup ortogonal khusus SO(2): R^T = R^-1, det(R) = +1, dan preservasi panjang.',
      'Menghitung koordinat titik terotasi tanpa distorsi atau perubahan skala fisik.',
      'Membedakan rotasi vektor aktif dan transformasi kerangka acuan pasif.',
    ],
    whyItMattersEn: 'All robot orientations, steering heading updates, and joint rotations depend on valid SO(n) matrix calculations.',
    whyItMattersId: 'Seluruh orientasi arah hadap robot, pembaharuan heading kemudi, dan rotasi sendi bergantung pada kalkulasi matriks SO(n).',
    progressionStepsEn: ['Angle-Sum Derivation', 'SO(2) Matrix Properties', 'Interactive Rotation Lab', 'Orientation Tracking'],
    progressionStepsId: ['Penurunan Trigonometri', 'Sifat Matriks SO(2)', 'Lab Rotasi Interaktif', 'Pelacakan Orientasi'],
  },
  'coordinate-frames-and-transforms': {
    learningObjectivesEn: [
      'Formulate homogeneous coordinates in P^2 and SE(2) 3x3 transformation matrices.',
      'Chain transformations across multi-level reference trees: World -> Robot -> Sensor.',
      'Compute the closed-form analytical matrix inverse T^-1 = [R^T, -R^T t; 0, 1].',
      'Map local sensor observations into global factory and map coordinate systems.',
    ],
    learningObjectivesId: [
      'Merumuskan koordinat homogen pada P^2 dan matriks transformasi SE(2) 3x3.',
      'Menghubungkan rantai transformasi bertingkat: Kerangka Dunia -> Bodi Robot -> Sensor.',
      'Menghitung invers analitik tertutup T^-1 = [R^T, -R^T t; 0, 1] secara instan.',
      'Memetakan hasil pengukuran sensor lokal langsung ke sistem koordinat peta global.',
    ],
    whyItMattersEn: 'Robots have dozens of coordinate frames (wheels, sensors, arms, map); SE(n) transforms unify all measurements into one frame.',
    whyItMattersId: 'Robot memiliki puluhan kerangka acuan (roda, sensor, lengan, peta); transformasi SE(n) menyatukan seluruh data ke satu kerangka acuan.',
    progressionStepsEn: ['Homogeneous Coordinates', 'SE(2) Matrix Structure', 'Interactive Frame Tree', 'Sensor Ray Mapping'],
    progressionStepsId: ['Koordinat Homogen', 'Struktur Matriks SE(2)', 'Lab Pohon Kerangka', 'Pemetaan Sinar Sensor'],
  },
  'transform-composition-and-chains': {
    learningObjectivesEn: [
      'Demonstrate why matrix multiplication order matters in spatial transformations (T1*T2 != T2*T1).',
      'Differentiate between post-multiplication (local relative frame) and pre-multiplication (world frame).',
      'Construct forward kinematic transformation trees for serial link manipulators and mobile sensors.',
      'Diagnose spatial calibration offsets and camera mounting transformation errors.',
    ],
    learningObjectivesId: [
      'Membuktikan secara matematis mengapa urutan perkalian transformasi sangat krusial (T1*T2 != T2*T1).',
      'Membedakan post-multiplication (kerangka lokal berurutan) dan pre-multiplication (kerangka dunia tetap).',
      'Menyusun pohon transformasi kinematika maju untuk lengan bersambungan dan sensor kendaraan.',
      'Mendiagnosis galat kalibrasi spasial dan offset pergeseran pemasangan kamera/sensor.',
    ],
    whyItMattersEn: 'Misunderstanding transform multiplication order is one of the most common causes of bugs in ROS TF2 and robot arm positioning.',
    whyItMattersId: 'Kesalahan memahami urutan perkalian transformasi adalah salah satu penyebab bug paling umum pada sistem ROS TF2 dan posisi lengan robot.',
    progressionStepsEn: ['Order Commutativity', 'Local vs World Framing', 'Interactive Chain Lab', 'ROS TF Trees'],
    progressionStepsId: ['Komutativitas Urutan', 'Lokal vs Dunia', 'Lab Rantai Interaktif', 'Pohon ROS TF'],
  },
  'differential-drive-kinematics': {
    learningObjectivesEn: [
      'Derive linear and angular chassis velocities from left and right wheel encoder speeds.',
      'Calculate the Instantaneous Center of Curvature (ICC) radius R = (L/2)*((vR+vL)/(vR-vL)).',
      'Analyze canonical operating regimes: straight motion, in-place point turns, and pivot turns.',
      'Implement discrete-time kinematic integration for mobile robot dead-reckoning simulators.',
    ],
    learningObjectivesId: [
      'Menurunkan kecepatan linier dan sudut bodi robot dari kecepatan putar roda kiri dan kanan.',
      'Menghitung radius Pusat Kurvatur Seketika (ICC) R = (L/2)*((vR+vL)/(vR-vL)).',
      'Menganalisis rezim gerak kanonikal: garis lurus murni, putar di tempat (point turn), dan belok poros (pivot turn).',
      'Mengimplementasikan integrasi kinematika waktu-diskrit untuk simulator dead-reckoning robot bergerak.',
    ],
    whyItMattersEn: 'Forms the core motion engine of warehouse AGVs, autonomous vacuum cleaners, and planetary rovers.',
    whyItMattersId: 'Merupakan mesin penggerak inti dari AGV logistik gudang, robot pembersih vakum, hingga rover eksplorasi planet.',
    progressionStepsEn: ['Wheel Speed Geometry', 'ICC Radius Derivation', 'Interactive Unicycle Lab', 'Dead Reckoning'],
    progressionStepsId: ['Geometri Kecepatan Roda', 'Penurunan Radius ICC', 'Lab Unicycle Interaktif', 'Dead Reckoning'],
  },
  'non-holonomic-constraints': {
    learningObjectivesEn: [
      'Distinguish between holonomic systems (omni/mecanum) and non-holonomic systems (unicycles/cars).',
      'Derive the lateral no-slip Pfaffian velocity constraint: -x_dot*sin(θ) + y_dot*cos(θ) = 0.',
      'Evaluate the Lie bracket [g1, g2] to explain why parallel parking maneuvers generate sideways motion.',
      'Apply the Chow-Rashevsky theorem to verify complete controllability in 3D configuration space.',
    ],
    learningObjectivesId: [
      'Membedakan sistem holonomik (roda omni/mecanum) dan non-holonomik (unicycle roda diferensial/mobil).',
      'Menurunkan kendala kecepatan Pfaffian tanpa-selip lateral: -x_dot*sin(θ) + y_dot*cos(θ) = 0.',
      'Mengevaluasi operator Lie bracket [g1, g2] untuk menjelaskan mengapa manuver parkir menghasilkan pergeseran samping.',
      'Menerapkan teorema Chow-Rashevsky untuk membuktikan keterkendalian penuh pada ruang konfigurasi 3D.',
    ],
    whyItMattersEn: 'Dictates trajectory planning strategies for wheeled vehicles that cannot instantaneously translate sideways.',
    whyItMattersId: 'Menentukan strategi perencanaan trajektori untuk kendaraan beroda yang tidak dapat bergeser ke samping secara instan.',
    progressionStepsEn: ['Holonomic Taxonomy', 'Pfaffian Constraint Form', 'Interactive Constraint Lab', 'Lie Bracket Maneuvers'],
    progressionStepsId: ['Taksonomi Holonomik', 'Bentuk Kendala Pfaffian', 'Lab Kendala Interaktif', 'Manuver Lie Bracket'],
  },
  'sensor-noise-and-uncertainty': {
    learningObjectivesEn: [
      'Model real-world physical sensor corruption with additive bias and zero-mean Gaussian noise.',
      'Formulate Gaussian Probability Density Functions (PDF) and empirical confidence intervals (1σ, 2σ, 3σ).',
      'Compute sample mean and sample variance to estimate sensor reliability statistics.',
      'Differentiate between reducible random variance and systematic calibration offsets.',
    ],
    learningObjectivesId: [
      'Memodelkan gangguan sensor fisik nyata dengan bias sistematik aditif dan derau Gaussian rata-rata nol.',
      'Merumuskan Fungsi Kerapatan Probabilitas Gaussian (PDF) dan interval keyakinan empiris (1σ, 2σ, 3σ).',
      'Menghitung rata-rata sampel dan variansi sampel untuk mengestimasi keandalan sensor secara statistik.',
      'Membedakan fluktuasi derau acak yang dapat direduksi vs offset kalibrasi sistematik yang konstan.',
    ],
    whyItMattersEn: 'No real robot sensor is perfect; probabilistic noise modeling is the prerequisite for Kalman filtering and SLAM.',
    whyItMattersId: 'Tidak ada sensor robot yang sempurna; pemodelan derau probabilistik adalah prasyarat mutlak untuk Filter Kalman dan SLAM.',
    progressionStepsEn: ['Additive Noise Model', 'Gaussian PDF Formula', 'Interactive Noise Lab', 'Confidence Intervals'],
    progressionStepsId: ['Model Derau Aditif', 'Rumus Gaussian PDF', 'Lab Derau Interaktif', 'Interval Keyakinan'],
  },
  'wheel-odometry-and-drift': {
    learningObjectivesEn: [
      'Calculate incremental dead reckoning pose updates from optical wheel encoder pulses.',
      'Analyze quadratic error accumulation O(t^2) caused by subtle 1-2% wheel radius mismatches.',
      'Simulate systematic chassis asymmetric drift and stochastic surface slip perturbations.',
      'Design multi-sensor fusion strategies (IMU, LiDAR, Wheel Encoders) to bound unbounded drift.',
    ],
    learningObjectivesId: [
      'Menghitung pembaruan pose dead reckoning inkremental dari pulsa enkoder optik roda.',
      'Menganalisis akumulasi galat kuadratik O(t^2) akibat ketidaksempurnaan mekanis radius roda 1-2%.',
      'Mensimulasikan drift asimetris sistematik sasis dan gangguan selip acak permukaan lantai.',
      'Merancang strategi fusi multi-sensor (IMU, LiDAR, Enkoder) untuk membatasi divergensi drift.',
    ],
    whyItMattersEn: 'Pure wheel odometry always drifts over time; understanding its failure modes is crucial for building robust SLAM systems.',
    whyItMattersId: 'Odometri roda murni selalu mengalami drift seiring waktu; memahami kegagalan ini krusial untuk membangun sistem SLAM yang tangguh.',
    progressionStepsEn: ['Encoder Dead Reckoning', 'Quadratic Drift Math', 'Interactive Drift Lab', 'Multi-Sensor Fusion'],
    progressionStepsId: ['Dead Reckoning Enkoder', 'Matematika Galat Kuadratik', 'Lab Drift Interaktif', 'Fusi Multi-Sensor'],
  },
  'configuration-space-and-minkowski': {
    learningObjectivesEn: [
      'Define Workspace W vs. Configuration Space C-Space for multi-DOF mobile robots and arms.',
      'Apply the Minkowski Sum operation C_obs = W_obs ⊕ (-A) to expand obstacles by robot geometry.',
      'Simplify complex robotic geometric motion planning into single-point trajectory navigation in C_free.',
      'Differentiate between 2D translation C-Space (R^2) and rigid body pose C-Space (SE(2)).',
    ],
    learningObjectivesId: [
      'Mendefinisikan Ruang Kerja W vs Ruang Konfigurasi C-Space untuk robot bergerak dan lengan artikulasi.',
      'Menerapkan operasi Minkowski Sum C_obs = W_obs ⊕ (-A) untuk memperluas rintangan sebesar geometri robot.',
      'Menyederhanakan perencanaan gerak robotik kompleks menjadi navigasi titik koordinat tunggal pada C_free.',
      'Membedakan C-Space translasi 2D (R^2) dan C-Space pose benda kaku berotasi (SE(2)).',
    ],
    whyItMattersEn: 'Every modern motion planner (A*, RRT*, Dijkstra) operates entirely inside Configuration Space.',
    whyItMattersId: 'Setiap algoritma perencana gerak modern (A*, RRT*, Dijkstra) beroperasi sepenuhnya di dalam Ruang Konfigurasi.',
    progressionStepsEn: ['C-Space Definition', 'Minkowski Sum Formula', 'Interactive Inflation Lab', 'Point-Robot Planning'],
    progressionStepsId: ['Definisi C-Space', 'Rumus Minkowski Sum', 'Lab Inflasi Interaktif', 'Perencanaan Robot Titik'],
  },
  'bayes-filter-and-kalman': {
    learningObjectivesEn: [
      'Execute the 2-step Recursive Bayesian state estimation cycle: Motion Predict -> Sensor Correct.',
      'Derive the continuous Chapman-Kolmogorov prediction integral and Bayes update theorem.',
      'Calculate the optimal 1D Kalman Gain K = σ_bar^2 / (σ_bar^2 + R) for minimum variance estimation.',
      'Fuse noisy odometry commands with uncertain sensor measurements in real-time.',
    ],
    learningObjectivesId: [
      'Mengeksekusi siklus estimasi status Bayesian Rekursif 2-langkah: Prediksi Gerak -> Koreksi Sensor.',
      'Menurunkan integral prediksi kontinu Chapman-Kolmogorov dan teorema pembaruan probabilitas Bayes.',
      'Menghitung Penguatan Kalman 1D optimal K = σ_bar^2 / (σ_bar^2 + R) untuk variansi galat minimum.',
      'Memadukan sinyal perintah odometri berderau dengan pembacaan sensor fisik secara waktu-nyata.',
    ],
    whyItMattersEn: 'The Kalman filter is the cornerstone of aerospace navigation, self-driving vehicle localization, and robotic state estimation.',
    whyItMattersId: 'Filter Kalman adalah pilar utama navigasi kedirgantaraan, lokalisasi mobil otonom, dan estimasi status robotik.',
    progressionStepsEn: ['Recursive Bayes Loop', 'Kalman Gain Derivation', 'Interactive Kalman Lab', 'Real-Time Fusion'],
    progressionStepsId: ['Siklus Rekursif Bayes', 'Penurunan Penguatan Kalman', 'Lab Kalman Interaktif', 'Fusi Waktu-Nyata'],
  },
  'a-star': {
    learningObjectivesEn: [
      'Formulate optimal graph search using cost evaluation f(n) = g(n) + h(n).',
      'Prove admissible and consistent Euclidean and Manhattan distance heuristics (h(n) <= h*(n)).',
      'Implement Priority Queue frontier expansions for 8-connected grid navigation maps.',
      'Extract smooth, collision-free waypoints from discrete optimal parent node backtracking.',
    ],
    learningObjectivesId: [
      'Merumuskan pencarian graf optimal menggunakan evaluasi biaya f(n) = g(n) + h(n).',
      'Membuktikan syarat heuristik admisibel dan konsisten jarak Euclidean/Manhattan (h(n) <= h*(n)).',
      'Mengimplementasikan ekspansi antrean prioritas (Priority Queue) pada grid navigasi 8-arah.',
      'Mengekstrak waypoint lintasan bebas tabrakan dari penelusuran balik (backtracking) simpul induk.',
    ],
    whyItMattersEn: 'A* is the benchmark global path planning algorithm deployed in mobile robotics, video games, and warehouse fleets.',
    whyItMattersId: 'A* adalah standar baku emas algoritma perencana jalur global pada robotika bergerak, video game, dan armada logistik.',
    progressionStepsEn: ['Cost Function f=g+h', 'Heuristic Admissibility', 'Interactive A* Lab', 'Waypoint Extraction'],
    progressionStepsId: ['Fungsi Biaya f=g+h', 'Admisibilitas Heuristik', 'Lab A* Interaktif', 'Ekstraksi Waypoint'],
  },
  'rrt-and-rrt-star': {
    learningObjectivesEn: [
      'Understand sampling-based exploration in high-dimensional continuous configuration spaces.',
      'Formulate random uniform sampling, Nearest-Neighbor queries, and Steer step functions.',
      'Derive the asymptotic optimality rewiring mechanism of RRT* (Karaman & Frazzoli).',
      'Apply goal biasing to accelerate tree convergence towards goal regions.',
    ],
    learningObjectivesId: [
      'Memahami eksplorasi berbasis sampel acak pada ruang konfigurasi kontinu berdimensi tinggi.',
      'Merumuskan sampling seragam, pencarian Nearest-Neighbor, dan fungsi inkremental Steer.',
      'Menurunkan mekanisme rewiring optimalitas asimtotik algoritma RRT* (Karaman & Frazzoli).',
      'Menerapkan bias target (Goal Biasing) untuk mempercepat konvergensi pohon cabang menuju tujuan.',
    ],
    whyItMattersEn: 'Essential for high-DOF articulated arms, drones in 3D space, and non-holonomic vehicles where grid search is intractable.',
    whyItMattersId: 'Krusial untuk lengan robotik banyak-sendi, drone pada ruang 3D, dan kendaraan non-holonomik di mana grid search tidak efisien.',
    progressionStepsEn: ['Continuous Sampling', 'Steer & Collision Check', 'Interactive RRT* Lab', 'Asymptotic Rewiring'],
    progressionStepsId: ['Sampling Kontinu', 'Steer & Cek Tabrakan', 'Lab RRT* Interaktif', 'Rewiring Asimtotik'],
  },
  'lidar-raycasting': {
    learningObjectivesEn: [
      'Model spinning 2D LiDAR Time-of-Flight laser range principles.',
      'Formulate 2D raycasting line-segment obstacle intersection linear equations.',
      'Inject zero-mean Gaussian electronic noise to simulate physical sensor uncertainty.',
      'Reconstruct 2D Cartesian point cloud obstacle coordinate maps from polar range-angle measurements.',
    ],
    learningObjectivesId: [
      'Memodelkan prinsip jangkauan waktu tempuh Time-of-Flight pulsa sinar laser LiDAR 2D.',
      'Merumuskan persamaan linier perpotongan berkas sinar raycasting terhadap segmen dinding rintangan.',
      'Menginjeksikan derau Gaussian acak untuk mensimulasikan ketidakpastian fisik sensor nyata.',
      'Merekonstruksi peta titik rintangan Point Cloud Kartesius 2D dari pembacaan polar jarak-sudut.',
    ],
    whyItMattersEn: 'LiDAR raycasting is the computational backbone of real-time 2D/3D mapping, obstacle avoidance, and ICP scan matching.',
    whyItMattersId: 'Raycasting LiDAR adalah fondasi komputasi dari pemetaan 2D/3D waktu-nyata, penghindaran rintangan, dan pencocokan pindaian ICP.',
    progressionStepsEn: ['Optical Time-of-Flight', 'Ray-Line Intersection', 'Interactive LiDAR Lab', 'Point Cloud Extraction'],
    progressionStepsId: ['Optik Time-of-Flight', 'Perpotongan Garis Sinar', 'Lab LiDAR Interaktif', 'Ekstraksi Point Cloud'],
  },
  'path-tracking-error-geometry': {
    learningObjectivesEn: [
      'Represent continuous reference trajectories and parameterize local Frenet-Serret frames.',
      'Calculate closest reference point projections and orthogonal path tangent vectors.',
      'Derive signed Cross-Track Error (e_lat) for lateral steering deviation.',
      'Derive Heading Alignment Error (e_theta) for vehicle orientation convergence.',
    ],
    learningObjectivesId: [
      'Merepresentasikan lintasan referensi kontinu dan memparameterisasi kerangka lokal Frenet-Serret.',
      'Menghitung proyeksi titik referensi terdekat dan vektor garis singgung ortogonal.',
      'Menurunkan galat samping lateral bertanda (e_lat) untuk deviasi kemudi.',
      'Menurunkan galat orientasi sudut (e_theta) untuk konvergensi arah hadap kendaraan.',
    ],
    whyItMattersEn: 'Every feedback steering law (Stanley, Pure Pursuit, MPC) requires precise calculation of cross-track and heading errors.',
    whyItMattersId: 'Setiap hukum kendali kemudi umpan balik (Stanley, Pure Pursuit, MPC) memerlukan kalkulasi presisi atas galat lateral dan galat heading.',
    progressionStepsEn: ['Frenet-Serret Frame', 'Cross-Track Derivation', 'Interactive Error Lab', 'Steering Convergence'],
    progressionStepsId: ['Kerangka Frenet-Serret', 'Penurunan Cross-Track', 'Lab Galat Interaktif', 'Konvergensi Kemudi'],
  },
  '2dof-forward-kinematics': {
    learningObjectivesEn: [
      'Derive analytical forward kinematic equations for 2-DOF planar articulated arms.',
      'Compute end-effector Cartesian coordinates (x_E, y_E) from motor joint angles (q1, q2).',
      'Analyze the reachable workspace annulus and calculate maximum reach (L1+L2) and minimum hole (|L1-L2|).',
      'Demonstrate why equal link lengths (L1=L2) maximize the workspace area.',
    ],
    learningObjectivesId: [
      'Menurunkan persamaan kinematika maju analitik untuk lengan robot artikulasi 2-DOF planar.',
      'Menghitung titik koordinat Kartesius ujung lengan (x_E, y_E) dari sudut rotasi motor (q1, q2).',
      'Menganalisis batas annulus ruang kerja jangkauan: jangkauan maksimum (L1+L2) dan lubang minimum (|L1-L2|).',
      'Membuktikan mengapa panjang link yang sama (L1=L2) menghasilkan luas ruang kerja maksimum.',
    ],
    whyItMattersEn: 'Forward kinematics is the foundational building block for robot manipulation, inverse kinematics, and obstacle avoidance.',
    whyItMattersId: 'Kinematika maju adalah fondasi utama bagi manipulasi robot, kinematika invers, dan algoritma penghindaran tabrakan lengan.',
    progressionStepsEn: ['Serial Link Geometry', 'FK Trigonometric Math', 'Interactive Arm Lab', 'Workspace Annulus'],
    progressionStepsId: ['Geometri Link Serial', 'Trigonometri Kinematika Maju', 'Lab Lengan Interaktif', 'Annulus Ruang Kerja'],
  },
  '2dof-inverse-kinematics': {
    learningObjectivesEn: [
      'Solve analytical Inverse Kinematics (IK) for 2-DOF planar arms using the Law of Cosines.',
      'Differentiate between valid Elbow-Up (+q2) and Elbow-Down (-q2) geometric branch configurations.',
      'Formulate shoulder base orientation q1 = beta - psi using quadrant-safe atan2 functions.',
      'Detect Cartesian reachability limits (|L1-L2| <= r <= L1+L2) and boundary singularities.',
    ],
    learningObjectivesId: [
      'Menyelesaikan Kinematika Invers (IK) analitik untuk lengan 2-DOF planar menggunakan Hukum Kosinus.',
      'Membedakan konfigurasi cabang geometris yang valid: Siku-Atas (+q2) vs Siku-Bawah (-q2).',
      'Merumuskan orientasi pangkal bahu q1 = beta - psi menggunakan fungsi kuadran aman atan2.',
      'Mendeteksi batas jangkauan Kartesius (|L1-L2| <= r <= L1+L2) dan singularitas batas.',
    ],
    whyItMattersEn: 'Inverse kinematics is essential for commanding robot arms to reach, manipulate, and weld precise Cartesian coordinates.',
    whyItMattersId: 'Kinematika invers mutlak diperlukan untuk memerintahkan lengan robot menjangkau, mengambil, dan merakit komponen di titik koordinat yang presisi.',
    progressionStepsEn: ['Law of Cosines IK', 'Branch Configurations', 'Interactive IK Reticle', 'Workspace Singularity'],
    progressionStepsId: ['Hukum Kosinus IK', 'Konfigurasi Cabang', 'Lab Retikel IK', 'Singularitas Ruang Kerja'],
  },
  'astar-vs-dijkstra-search': {
    learningObjectivesEn: [
      'Evaluate mathematical cost f(n) = g(n) + h(n) and prove equivalence to Dijkstra when h(n) = 0.',
      'Compare search wavefront expansions across Dijkstra, Manhattan, Euclidean, and Octile heuristics.',
      'Analyze admissible heuristic conditions (h(n) <= h*(n)) to guarantee optimal shortest paths.',
      'Measure performance trade-offs between expanded node count and execution time.',
    ],
    learningObjectivesId: [
      'Mengevaluasi fungsi biaya f(n) = g(n) + h(n) dan membuktikan kesetaraannya dengan Dijkstra saat h(n) = 0.',
      'Membandingkan ekspansi gelombang pencarian antara heuristik Dijkstra, Manhattan, Euclidean, dan Octile.',
      'Menganalisis syarat heuristik admisibel (h(n) <= h*(n)) untuk menjamin rute terpendek yang optimal.',
      'Mengukur trade-off performa antara jumlah simpul yang diekspansi dan kecepatan eksekusi.',
    ],
    whyItMattersEn: 'Choosing the right heuristic trims thousands of unnecessary search nodes in real-time robotic navigation systems.',
    whyItMattersId: 'Memilih heuristik yang tepat memangkas ribuan simpul pencarian yang tidak perlu pada sistem navigasi robotika waktu-nyata.',
    progressionStepsEn: ['f=g+h Formulation', 'Wavefront Comparison', 'Interactive Grid Lab', 'Heuristic Admissibility'],
    progressionStepsId: ['Formulasi f=g+h', 'Komparasi Gelombang', 'Lab Grid Interaktif', 'Admisibilitas Heuristik'],
  },
  'rrt-sampling-planner': {
    learningObjectivesEn: [
      'Understand randomized sampling-based exploration for continuous high-dimensional C-spaces.',
      'Execute the 4-step RRT cycle: Sample Uniformly -> Nearest Neighbor -> Steer Step -> Collision Check.',
      'Implement RRT* asymptotic optimality through neighborhood radius rewiring.',
      'Tune goal biasing probabilities (p_bias) to balance rapid target convergence with obstacle avoidance.',
    ],
    learningObjectivesId: [
      'Memahami eksplorasi berbasis sampel acak untuk ruang konfigurasi kontinu berdimensi tinggi.',
      'Mengeksekusi siklus 4-langkah RRT: Sample Seragam -> Tetangga Terdekat -> Steer Step -> Cek Tabrakan.',
      'Mengimplementasikan optimalitas asimtotik RRT* melalui penyambungan ulang (rewiring) radius tetangga.',
      'Melakukan tuning probabilitas bias target (p_bias) untuk menyeimbangkan konvergensi cepat vs rintangan.',
    ],
    whyItMattersEn: 'RRT and RRT* are the gold standard for high-DOF articulated robot arms and 3D drone trajectory planning.',
    whyItMattersId: 'RRT dan RRT* adalah standar emas untuk perencanaan gerak lengan robot multi-sendi dan trajektori drone 3D.',
    progressionStepsEn: ['4-Step RRT Loop', 'Voronoi Bias Theory', 'Interactive Tree Lab', 'RRT* Rewiring'],
    progressionStepsId: ['Siklus 4-Langkah RRT', 'Teori Voronoi Bias', 'Lab Pohon Interaktif', 'Rewiring RRT*'],
  },
  'pure-pursuit-path-tracking': {
    learningObjectivesEn: [
      'Derive the Pure Pursuit circular arc curvature formula kappa = 2*sin(alpha) / Ld.',
      'Formulate the lookahead circle intersection with continuous waypoint paths.',
      'Compute Ackermann front-wheel steering angle delta = atan(kappa * L).',
      'Analyze stability vs corner-cutting trade-offs when tuning lookahead distance Ld.',
    ],
    learningObjectivesId: [
      'Menurunkan rumus kurvatur busur lingkaran Pure Pursuit kappa = 2*sin(alpha) / Ld.',
      'Merumuskan perpotongan lingkaran lookahead terhadap jalur titik acuan waypoint kontinu.',
      'Menghitung sudut kemudi roda depan Ackermann delta = atan(kappa * L).',
      'Menganalisis trade-off stabilitas vs pemotongan sudut tikungan saat mengatur jarak lookahead Ld.',
    ],
    whyItMattersEn: 'Pure Pursuit powers geometric trajectory tracking in warehouse AGVs, self-driving shuttles, and agricultural robots.',
    whyItMattersId: 'Pure Pursuit menjadi penggerak kendali kemudi geometris pada AGV gudang, shuttle otonom, dan robot pertanian.',
    progressionStepsEn: ['Lookahead Geometry', 'Curvature Derivation', 'Interactive Tracking Lab', 'Ld Tuning Trade-offs'],
    progressionStepsId: ['Geometri Lookahead', 'Penurunan Kurvatur', 'Lab Pelacakan Interaktif', 'Trade-off Tuning Ld'],
  },
  'pure-pursuit-and-stanley': {
    learningObjectivesEn: [
      'Formulate Pure Pursuit geometric lookahead curvature steering: δ = atan2(2L sin α, Ld).',
      'Derive Stanley non-linear feedback control: δ = ψ + atan2(k*e_lat, v) for cross-track convergence.',
      'Analyze lookahead distance trade-offs: path stability versus corner cutting.',
      'Tune steering controller gains under high-speed dynamic tracking scenarios.',
    ],
    learningObjectivesId: [
      'Merumuskan kendali kemudi kurvatur Pure Pursuit dengan jarak lookahead: δ = atan2(2L sin α, Ld).',
      'Menurunkan kendali umpan balik non-linier Stanley: δ = ψ + atan2(k*e_lat, v) untuk konvergensi galat samping.',
      'Menganalisis trade-off jarak lookahead: stabilitas lintasan vs pemotongan sudut tikungan.',
      'Melakukan tuning penguatan kemudi pada skenario pelacakan trajektori berkecepatan tinggi.',
    ],
    whyItMattersEn: 'Powers lateral trajectory steering in self-driving cars, autonomous tractors, and mobile logistics robots.',
    whyItMattersId: 'Menjadi inti kendali kemudi lateral pada mobil otonom, traktor pertanian pintar, dan robot logistik bergerak.',
    progressionStepsEn: ['Geometric Lookahead', 'Stanley Lateral Feedback', 'Interactive Tracking Lab', 'Gain Stability Tuning'],
    progressionStepsId: ['Geometri Lookahead', 'Umpan Balik Stanley', 'Lab Pelacakan Interaktif', 'Tuning Stabilitas'],
  },
  'pid-and-lqr-control': {
    learningObjectivesEn: [
      'Formulate continuous and discrete PID controller terms: Proportional, Integral, and Derivative.',
      'Analyze transient step responses: rise time, overshoot, settling time, and steady-state error.',
      'Formulate State-Space dynamics x_dot = Ax + Bu and Quadratic Cost J = ∫ (x^T Q x + u^T R u) dt.',
      'Solve the Continuous-time Algebraic Riccati Equation (CARE) for optimal feedback gain K_lqr.',
    ],
    learningObjectivesId: [
      'Merumuskan kontroler PID waktu kontinu dan diskrit: Proporsional, Integral, dan Derivatif.',
      'Menganalisis respon transien step: rise time, overshoot, settling time, dan galat kondisi tunak.',
      'Merumuskan dinamika Ruang-Status x_dot = Ax + Bu dan Fungsi Biaya Kuadratik J = ∫ (x^T Q x + u^T R u) dt.',
      'Menyelesaikan Persamaan Aljabar Riccati (CARE) untuk menghasilkan penguatan umpan balik optimal K_lqr.',
    ],
    whyItMattersEn: 'PID and LQR regulate joint positions, drone attitude stability, motor velocities, and inverted pendulums across all robotics.',
    whyItMattersId: 'PID dan LQR meregulasi posisi sendi motor, kestabilan sikap terbang drone, dan pendulum terbalik pada seluruh domain robotika.',
    progressionStepsEn: ['PID Error Calculus', 'Step Response Dynamics', 'Interactive Gain Tuning', 'LQR State-Space CARE'],
    progressionStepsId: ['Kalkulus Galat PID', 'Dinamika Respon Step', 'Lab Tuning Interaktif', 'Ruang Status LQR CARE'],
  },
  'mcl-particle-filter': {
    learningObjectivesEn: [
      'Formulate non-parametric Monte Carlo Localization (MCL) using discrete particle belief clouds.',
      'Implement the 3-step particle filter cycle: Motion Prediction -> LiDAR Likelihood Weighting -> Low-Variance Resampling.',
      'Derive beam-based and likelihood-field raycast measurement models for 2D floor plans.',
      'Solve the Global Kidnapped Robot Problem through probabilistic particle dispersal.',
    ],
    learningObjectivesId: [
      'Merumuskan lokalisasi Monte Carlo (MCL) non-parametrik menggunakan awan partikel probabilitas diskrit.',
      'Mengimplementasikan siklus 3-tahap filter partikel: Prediksi Gerak -> Pembobotan Likelihood LiDAR -> Resampling Variansi Rendah.',
      'Menurunkan model pengukuran raycast LiDAR berbasis berkas sinar dan medan likelihood pada peta 2D.',
      'Menyelesaikan masalah Kidnapped Robot global melalui penyebaran partikel probabilistik adaptif.',
    ],
    whyItMattersEn: 'MCL is the industry-standard localization algorithm in ROS (AMCL) used by thousands of autonomous commercial robots worldwide.',
    whyItMattersId: 'MCL adalah algoritma lokalisasi standar industri pada ROS (AMCL) yang digunakan oleh ribuan robot komersial di seluruh dunia.',
    progressionStepsEn: ['Particle Belief Clouds', 'LiDAR Ray Weighting', 'Interactive MCL Lab', 'Kidnapped Robot Recovery'],
    progressionStepsId: ['Awan Partikel Keyakinan', 'Pembobotan Sinar LiDAR', 'Lab MCL Interaktif', 'Pemulihan Robot Hilang'],
  },
  'occupancy-grid-mapping': {
    learningObjectivesEn: [
      'Formulate the Log-Odds recursive update l_t = l_{t-1} + log(p(m|z)/(1-p(m|z))) - l_0 to avoid numerical underflow.',
      'Implement Bresenham raycasting to trace free and occupied cells along laser scan lines.',
      'Convert log-odds occupancy values back into visual probability maps p = 1 - 1/(1 + exp(l)).',
      'Handle sensor false alarms and dynamic obstacles through inverse sensor probability models.',
    ],
    learningObjectivesId: [
      'Merumuskan pembaruan rekursif Log-Odds l_t = l_{t-1} + log(p(m|z)/(1-p(m|z))) - l_0 untuk mencegah numerical underflow.',
      'Mengimplementasikan raycasting garis Bresenham untuk menandai sel bebas dan sel rintangan sepanjang pindaian laser.',
      'Mengonversi nilai log-odds kembali menjadi peta probabilitas visual p = 1 - 1/(1 + exp(l)).',
      'Menangani noise sensor dan rintangan dinamis melalui model probabilitas sensor invers.',
    ],
    whyItMattersEn: 'Occupancy grids transform raw range readings into persistent spatial maps required for global autonomous path planning.',
    whyItMattersId: 'Occupancy grid mengubah jutaan data sensor mentah menjadi peta spasial permanen yang dibutuhkan untuk perencanaan jalur global.',
    progressionStepsEn: ['Log-Odds Formulation', 'Bresenham Raycasting', 'Interactive Mapping Lab', 'Probability Rendering'],
    progressionStepsId: ['Formulasi Log-Odds', 'Raycasting Bresenham', 'Lab Pemetaan Interaktif', 'Visualisasi Probabilitas'],
  },
  'forward-inverse-kinematics': {
    learningObjectivesEn: [
      'Formulate Forward Kinematics (FK) for serial 2-DOF and n-DOF planar robot arms.',
      'Derive analytical Inverse Kinematics (IK) using the geometric Law of Cosines.',
      'Distinguish between multiple valid IK branch configurations: Elbow-Up vs. Elbow-Down.',
      'Identify workspace reachable boundaries and internal kinematic singularities.',
    ],
    learningObjectivesId: [
      'Merumuskan Kinematika Maju (FK) untuk lengan robot artikulasi 2-DOF dan n-DOF planar.',
      'Menurunkan Kinematika Invers (IK) analitik menggunakan Aturan Kosinus geometris.',
      'Membedakan konfigurasi multi-cabang IK yang valid: Siku-Atas (Elbow-Up) vs Siku-Bawah (Elbow-Down).',
      'Mengidentifikasi batas jangkauan ruang kerja fisik dan singularitas kinematik internal.',
    ],
    whyItMattersEn: 'Enables robotic manipulators to calculate the exact joint angles required to reach, grasp, and assemble physical objects.',
    whyItMattersId: 'Memungkinkan lengan robot menghitung sudut sendi yang tepat untuk meraih, menggenggam, dan merakit komponen fisik.',
    progressionStepsEn: ['Forward Kinematics', 'Law of Cosines IK', 'Interactive Arm Lab', 'Workspace Singularities'],
    progressionStepsId: ['Kinematika Maju FK', 'Kinematika Invers IK', 'Lab Lengan Interaktif', 'Singularitas Ruang Kerja'],
  },
  'icp-scan-matching': {
    learningObjectivesEn: [
      'Formulate point set registration: minimize sum ||R*p_i + t - q_j||^2 over spatial correspondences.',
      'Derive closed-form SVD (Singular Value Decomposition) optimal rotation and translation estimation (Arun et al.).',
      'Implement iterative closest point association, centroid centering, and cross-covariance computation.',
      'Analyze scan-matching convergence basins, local minima traps, and covariance uncertainty estimation.',
    ],
    learningObjectivesId: [
      'Merumuskan registrasi himpunan titik: meminimalkan galat kuadrat sum ||R*p_i + t - q_j||^2 pada korespondensi spasial.',
      'Menurunkan estimasi rotasi dan translasi optimal analitik menggunakan SVD (Arun et al.).',
      'Mengimplementasikan asosiasi titik terdekat iteratif, pergeseran pusat massa centroid, dan matriks kovarians silang.',
      'Menganalisis konvergensi pencocokan pindaian, jebakan minima lokal, dan estimasi kovarians ketidakpastian.',
    ],
    whyItMattersEn: 'ICP is the geometric engine behind 2D/3D LiDAR SLAM, surface reconstruction, and autonomous point cloud alignment.',
    whyItMattersId: 'ICP adalah mesin geometris inti di balik LiDAR SLAM 2D/3D, rekonstruksi permukaan, dan penyelarasan point cloud otonom.',
    progressionStepsEn: ['Point Correspondence', 'SVD Optimal Pose', 'Interactive ICP Lab', 'Iterative Scan Matching'],
    progressionStepsId: ['Korespondensi Titik', 'Pose Optimal SVD', 'Lab ICP Interaktif', 'Pencocokan Pindaian'],
  },
  'laplacian-consensus': {
    learningObjectivesEn: [
      'Model multi-robot communication topologies using Algebraic Graph Theory: Adjacency A, Degree D, and Laplacian L = D - A.',
      'Analyze spectral properties: zero eigenvalue λ1 = 0 (consensus subspace) and Fiedler value λ2 > 0 (algebraic connectivity).',
      'Implement distributed consensus protocol x_dot_i = -∑ a_ij (x_i - x_j) without central coordinator.',
      'Synthesize leader-follower flocking formations and collision-free decentralized swarm coordination.',
    ],
    learningObjectivesId: [
      'Memodelkan topologi komunikasi multi-robot dengan Teori Graf Aljabar: Adjacency A, Degree D, dan Laplacian L = D - A.',
      'Menganalisis sifat spektral: nilai eigen nol λ1 = 0 (subruang konsensus) dan nilai Fiedler λ2 > 0 (konektivitas aljabar).',
      'Mengimplementasikan protokol konsensus terdistribusi x_dot_i = -∑ a_ij (x_i - x_j) tanpa server pusat.',
      'Merancang formasi kawanan leader-follower dan koordinasi swarm terdesentralisasi bebas tabrakan.',
    ],
    whyItMattersEn: 'Enables thousands of autonomous drones or warehouse robots to self-organize without a single point of communication failure.',
    whyItMattersId: 'Memungkinkan ribuan drone atau robot gudang otonom berorganisasi mandiri tanpa risiko kegagalan server terpusat.',
    progressionStepsEn: ['Graph Laplacian L=D-A', 'Fiedler Spectral Value', 'Interactive Swarm Lab', 'Leader-Follower Flocking'],
    progressionStepsId: ['Graf Laplacian L=D-A', 'Nilai Spektral Fiedler', 'Lab Swarm Interaktif', 'Formasi Leader-Follower'],
  },
};

export function getLessonPedagogy(slug: string, isId: boolean) {
  const data = LESSON_PEDAGOGY_MAP[slug];
  if (data) {
    return {
      learningObjectives: isId ? data.learningObjectivesId : data.learningObjectivesEn,
      whyItMatters: isId ? data.whyItMattersId : data.whyItMattersEn,
      progressionSteps: isId
        ? data.progressionStepsId.map((name, i) => ({ step: i + 1, name }))
        : data.progressionStepsEn.map((name, i) => ({ step: i + 1, name })),
    };
  }

  // Fallback defaults
  return {
    learningObjectives: isId
      ? [
          'Memahami intuisi fisik dan representasi geometris konsep robotika.',
          'Menurunkan formulasi matematis KaTeX dan satuan dimensi langkah demi langkah.',
          'Melakukan eksperimen langsung pada simulator interaktif 60 FPS di browser.',
          'Menghubungkan model matematika ke implementasi nyata pada robot fisik.',
        ]
      : [
          'Understand physical intuition and coordinate representations in robotics.',
          'Derive KaTeX mathematical formulations and dimensional units step-by-step.',
          'Run live step-by-step simulations in the 60 FPS in-browser laboratory.',
          'Connect theoretical models to real-world multi-platform physical robots.',
        ],
    whyItMatters: isId
      ? 'Menjembatani persamaan teoritis di buku teks dengan komputasi motor numerik pada robot nyata.'
      : 'Bridges theoretical textbook equations with real-time numeric motor commands in physical autonomous robots.',
    progressionSteps: isId
      ? [
          { step: 1, name: 'Konsep & Intuisi' },
          { step: 2, name: 'Model Matematika' },
          { step: 3, name: 'Simulasi Lab' },
          { step: 4, name: 'Aplikasi Robot' },
        ]
      : [
          { step: 1, name: 'Concept & Intuition' },
          { step: 2, name: 'Math Formulation' },
          { step: 3, name: 'Lab Simulation' },
          { step: 4, name: 'Robot Applications' },
        ],
  };
}
