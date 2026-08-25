'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CoordinateFrameExplorer } from '@/components/educational/CoordinateFrameExplorer';
import { VectorVisualizer } from '@/components/educational/VectorVisualizer';
import { DotProductExplorer } from '@/components/educational/DotProductExplorer';
import { TransformSandbox } from '@/components/simulation/TransformSandbox';
import { SpatialRotation3D } from '@/components/simulation/SpatialRotation3D';
import { KinematicsSimulator } from '@/components/simulation/KinematicsSimulator';
import { PathPlanningSimulator } from '@/components/simulation/PathPlanningSimulator';
import { ControlSimulator } from '@/components/simulation/ControlSimulator';
import { LocalizationSimulator } from '@/components/simulation/LocalizationSimulator';
import { MappingSimulator } from '@/components/simulation/MappingSimulator';
import { SlamSimulator } from '@/components/simulation/SlamSimulator';
import { MultiAgentSimulator } from '@/components/simulation/MultiAgentSimulator';
import { ArmKinematicsSimulator } from '@/components/simulation/ArmKinematicsSimulator';
import { RrtSimulator } from '@/components/simulation/RrtSimulator';
import { SensorNoiseSimulator } from '@/components/simulation/SensorNoiseSimulator';
import { PidTuningSimulator } from '@/components/simulation/PidTuningSimulator';
import { OdometryDriftSimulator } from '@/components/simulation/OdometryDriftSimulator';
import { CspaceInflationSimulator } from '@/components/simulation/CspaceInflationSimulator';
import { BayesianFilterSimulator } from '@/components/simulation/BayesianFilterSimulator';
import { TransformChainSimulator } from '@/components/simulation/TransformChainSimulator';
import { HolonomicConstraintSimulator } from '@/components/simulation/HolonomicConstraintSimulator';
import { BayesianRoomSimulator } from '@/components/simulation/BayesianRoomSimulator';
import { TrackingErrorGeometrySimulator } from '@/components/simulation/TrackingErrorGeometrySimulator';
import { ArmForwardKinematicsSimulator } from '@/components/simulation/ArmForwardKinematicsSimulator';
import { LidarRaycastSimulator } from '@/components/simulation/LidarRaycastSimulator';
import { PurePursuitSimulator } from '@/components/simulation/PurePursuitSimulator';
import { AStarVsDijkstraSimulator } from '@/components/simulation/AStarVsDijkstraSimulator';
import { RrtExplorationSimulator } from '@/components/simulation/RrtExplorationSimulator';
import { ArmInverseKinematicsSimulator } from '@/components/simulation/ArmInverseKinematicsSimulator';
import { JacobianSingularitySimulator } from '@/components/simulation/JacobianSingularitySimulator';
import { StateSpaceSimulator } from '@/components/simulation/StateSpaceSimulator';
import { NumericalDiscretizationSimulator } from '@/components/simulation/NumericalDiscretizationSimulator';
import { GaussianGridMapSimulator } from '@/components/simulation/GaussianGridMapSimulator';
import { RayCastingGridMapSimulator } from '@/components/simulation/RayCastingGridMapSimulator';
import { LidarToGridMapSimulator } from '@/components/simulation/LidarToGridMapSimulator';
import { KMeansClusteringSimulator } from '@/components/simulation/KMeansClusteringSimulator';
import { RectangleFittingSimulator } from '@/components/simulation/RectangleFittingSimulator';
import { EkfLocalizationSimulator } from '@/components/simulation/EkfLocalizationSimulator';
import { HistogramFilterSimulator } from '@/components/simulation/HistogramFilterSimulator';
import { FastSlamSimulator } from '@/components/simulation/FastSlamSimulator';
import { LoopClosureOptimizationSimulator } from '@/components/simulation/LoopClosureOptimizationSimulator';
import { AutonomousExplorationSimulator } from '@/components/simulation/AutonomousExplorationSimulator';
import { SafeCorridorExplorationSimulator } from '@/components/simulation/SafeCorridorExplorationSimulator';
import { QuadrotorDynamicsSimulator } from '@/components/simulation/QuadrotorDynamicsSimulator';
import { MarineHydrodynamicsSimulator } from '@/components/simulation/MarineHydrodynamicsSimulator';
import { LeggedZmpSimulator } from '@/components/simulation/LeggedZmpSimulator';
import { LieGroupAlgebraSimulator } from '@/components/simulation/LieGroupAlgebraSimulator';
import { FactorGraphOptimizerSimulator } from '@/components/simulation/FactorGraphOptimizerSimulator';
import { GaussianSplattingSlamSimulator } from '@/components/simulation/GaussianSplattingSlamSimulator';
import { DiffusionPolicyVlaSimulator } from '@/components/simulation/DiffusionPolicyVlaSimulator';
import { FormationControlSimulator } from '@/components/simulation/FormationControlSimulator';
import { NumericalIntegrationSimulator } from '@/components/simulation/NumericalIntegrationSimulator';
import { SensorFusionSimulator } from '@/components/simulation/SensorFusionSimulator';
import {
  Compass,
  Cpu,
  Layers,
  MapPin,
  Navigation,
  RotateCcw,
  Users,
  Sparkles,
  Sliders,
  Play,
  ArrowRight,
  BookOpen,
  Route,
} from 'lucide-react';

interface LabItem {
  id: string;
  category: string;
  paths?: string[];
  titleEn: string;
  titleId: string;
  descEn: string;
  descId: string;
  levelBadge: string;
  icon: string;
  lessonHref: string;
  component: React.ReactNode;
}

export default function LabsPage() {
  const { locale } = useLanguage();
  const isId = locale === 'id';

  const [activeLabId, setActiveLabId] = useState<string>('transforms-2d');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const labs: LabItem[] = [
    {
      id: 'transforms-2d',
      category: 'math',
      paths: ['slam'],
      titleEn: '2D Homogeneous Transforms SE(2)',
      titleId: 'Transformasi Homogen 2D SE(2)',
      descEn: 'Translate and rotate coordinate frames with real-time matrix updates and LiDAR beam projection.',
      descId: 'Translasi dan rotasi kerangka koordinat dengan pembaruan matriks real-time dan proyeksi sinar LiDAR.',
      levelBadge: 'Level 2',
      icon: '📐',
      lessonHref: '/learn/geometry/coordinate-frames-and-transforms',
      component: <TransformSandbox />,
    },
    {
      id: 'rotation-3d',
      category: 'math',
      titleEn: '3D Spatial Rotation & Euler Angles SO(3)',
      titleId: 'Rotasi Spasial 3D & Sudut Euler SO(3)',
      descEn: 'Inspect Roll, Pitch, and Yaw rotations, Tait-Bryan ZYX composition, and observe Gimbal Lock.',
      descId: 'Amati rotasi Roll, Pitch, Yaw, komposisi Tait-Bryan ZYX, dan fenomena Gimbal Lock.',
      levelBadge: 'Level 2',
      icon: '🌐',
      lessonHref: '/learn/geometry/3d-geometry',
      component: <SpatialRotation3D />,
    },
    {
      id: 'vector-explorer',
      category: 'math',
      paths: ['slam', 'manipulation', 'control'],
      titleEn: '2D Vector Geometry & Pythagoras',
      titleId: 'Geometri Vektor 2D & Pythagoras',
      descEn: 'Interactive vector decomposition, Euclidean magnitude, and unit direction vectors.',
      descId: 'Dekomposisi vektor interaktif, magnitudo Euclidean, dan vektor arah satuan.',
      levelBadge: 'Level 1',
      icon: '🧭',
      lessonHref: '/learn/mathematics/vectors-and-coordinate-geometry',
      component: <VectorVisualizer />,
    },
    {
      id: 'dot-product',
      category: 'math',
      paths: ['slam'],
      titleEn: 'Vector Dot Product & Alignment',
      titleId: 'Dot Product Vektor & Penyelarasan Arah',
      descEn: 'Understand projection, cosine similarity, and directional alignment between vectors.',
      descId: 'Pahami proyeksi, kesamaan kosinus, dan penyelarasan arah antar dua vektor.',
      levelBadge: 'Level 1',
      icon: '🔢',
      lessonHref: '/learn/mathematics/dot-product-and-projection',
      component: <DotProductExplorer />,
    },
    {
      id: 'kinematics-2d',
      category: 'kinematics',
      paths: ['slam'],
      titleEn: 'Differential-Drive Unicycle Kinematics',
      titleId: 'Kinematika Unicycle Roda Diferensial',
      descEn: 'Adjust left and right wheel velocities to compute Instantaneous Center of Curvature (ICC).',
      descId: 'Atur kecepatan roda kiri dan kanan untuk menghitung Pusat Kurvatur Seketika (ICC).',
      levelBadge: 'Level 3',
      icon: '🚗',
      lessonHref: '/learn/kinematics/differential-drive-kinematics',
      component: <KinematicsSimulator />,
    },
    {
      id: 'a-star-planning',
      category: 'planning',
      paths: ['slam'],
      titleEn: 'A* & Dijkstra Grid Path Search',
      titleId: 'Pencarian Jalur Grid A* & Dijkstra',
      descEn: 'Draw custom obstacle walls, choose heuristic metrics, and step through the Open Set search frontier.',
      descId: 'Gambar dinding rintangan kustom, pilih metrik heuristik, dan amati ekspansi Open Set.',
      levelBadge: 'Level 6',
      icon: '🗺️',
      lessonHref: '/learn/planning/a-star',
      component: <PathPlanningSimulator />,
    },
    {
      id: 'control-tracking',
      category: 'control',
      paths: ['slam', 'control'],
      titleEn: 'Pure Pursuit & Stanley Steering Control',
      titleId: 'Kendali Kemudi Pure Pursuit & Stanley',
      descEn: 'Compare geometric lookahead steering with Stanley front-axle non-linear error feedback.',
      descId: 'Bandingkan kemudi geometris lookahead dengan umpan balik galat lateral Stanley.',
      levelBadge: 'Level 7',
      icon: '🎯',
      lessonHref: '/learn/control/pure-pursuit-and-stanley',
      component: <ControlSimulator />,
    },
    {
      id: 'mcl-localization',
      category: 'estimation',
      paths: ['slam'],
      titleEn: 'Monte Carlo Localization (MCL) Particle Filter',
      titleId: 'Filter Partikel Monte Carlo Localization (MCL)',
      descEn: 'Drive the robot and watch probabilistic particle clouds converge using beacon measurements.',
      descId: 'Kendalikan robot dan saksikan awan partikel probabilitas konvergen menggunakan pengukuran suar.',
      levelBadge: 'Level 8',
      icon: '📍',
      lessonHref: '/learn/estimation/mcl-particle-filter',
      component: <LocalizationSimulator />,
    },
    {
      id: 'occupancy-mapping',
      category: 'mapping',
      paths: ['slam'],
      titleEn: '360° LiDAR Log-Odds Occupancy Mapping',
      titleId: 'Pemetaan Okupansi Log-Odds LiDAR 360°',
      descEn: 'Raycast simulated laser beams and update grid cells with recursive Bayesian log-odds.',
      descId: 'Pancarkan sinar laser dan perbarui sel grid dengan probabilitas log-odds Bayesian rekursif.',
      levelBadge: 'Level 9',
      icon: '📡',
      lessonHref: '/learn/perception/occupancy-grid-mapping',
      component: <MappingSimulator />,
    },
    {
      id: 'sensor-noise',
      category: 'sensors',
      paths: ['slam'],
      titleEn: 'Gaussian Sensor Noise & Measurement Model',
      titleId: 'Model Pengukuran & Derau Gaussian Sensor',
      descEn: 'Observe Gaussian probability density function p(z|x) and noisy sample histograms.',
      descId: 'Amati fungsi kerapatan probabilitas Gaussian p(z|x) dan histogram sampel pembacaan.',
      levelBadge: 'Level 5',
      icon: '📊',
      lessonHref: '/learn/sensors/sensor-noise-and-uncertainty',
      component: <SensorNoiseSimulator />,
    },
    {
      id: 'rrt-planning',
      category: 'planning',
      titleEn: 'RRT & RRT* Sampling-Based Motion Planning',
      titleId: 'Perencanaan Gerak Berbasis Sampel RRT & RRT*',
      descEn: 'Interactive continuous space random tree growth with obstacle avoidance and rewiring.',
      descId: 'Penumbuhan pohon acak ruang kontinu interaktif dengan penghindaran rintangan dan rewiring.',
      levelBadge: 'Level 6',
      icon: '🌲',
      lessonHref: '/learn/planning/rrt-and-rrt-star',
      component: <RrtSimulator />,
    },
    {
      id: 'pid-tuning',
      category: 'control',
      paths: ['control'],
      titleEn: 'PID Feedback Control & Transient Step Response',
      titleId: 'Kendali Umpan Balik PID & Respon Transien',
      descEn: 'Tune proportional, integral, and derivative gains with real-time step response graphs.',
      descId: 'Tuning penguatan proporsional, integral, dan derivatif dengan grafik respon step real-time.',
      levelBadge: 'Level 7',
      icon: '🎛️',
      lessonHref: '/learn/control/pid-and-lqr-control',
      component: <PidTuningSimulator />,
    },
    {
      id: 'arm-ik',
      category: 'manipulation',
      paths: ['manipulation'],
      titleEn: '2-DOF Robotic Arm Analytical Inverse Kinematics',
      titleId: 'Kinematika Invers Analitik Lengan Robot 2-DOF',
      descEn: 'Drag the end-effector target in workspace to solve analytical joint angles (θ₁, θ₂).',
      descId: 'Geser target ujung lengan di ruang kerja untuk menyelesaikan sudut sendi analitik (θ₁, θ₂).',
      levelBadge: 'Level 14',
      icon: '🦾',
      lessonHref: '/learn/manipulation/2dof-inverse-kinematics',
      component: <ArmKinematicsSimulator />,
    },
    {
      id: 'icp-slam',
      category: 'slam',
      paths: ['slam'],
      titleEn: 'Iterative Closest Point (ICP) Point Cloud SLAM',
      titleId: 'SLAM Pencocokan Pindaian ICP',
      descEn: 'Align 2D laser scans iteratively using SVD closed-form rotation and translation estimation.',
      descId: 'Selaraskan pindaian laser 2D secara iteratif menggunakan estimasi rotasi SVD analitik.',
      levelBadge: 'Level 10',
      icon: '🧩',
      lessonHref: '/learn/advanced/icp-scan-matching',
      component: <SlamSimulator />,
    },
    {
      id: 'cspace-inflation',
      category: 'math',
      paths: ['slam'],
      titleEn: 'Configuration Space & Minkowski Obstacle Inflation',
      titleId: 'Ruang Konfigurasi & Inflasi Rintangan Minkowski',
      descEn: 'Observe obstacle expansion by robot radius r for point-robot planning simplification.',
      descId: 'Amati perluasan rintangan sebesar radius robot r untuk simplifikasi perencanaan titik.',
      levelBadge: 'Level 2',
      icon: '🛡️',
      lessonHref: '/learn/geometry/configuration-space-and-minkowski',
      component: <CspaceInflationSimulator />,
    },
    {
      id: 'wheel-odometry',
      category: 'sensors',
      paths: ['slam'],
      titleEn: 'Wheel Odometry Drift & Dead Reckoning',
      titleId: 'Akumulasi Galat Drift Odometri Roda',
      descEn: 'Simulate systematic wheel radius errors and observe lateral and heading drift divergence.',
      descId: 'Simulasikan galat radius roda sistematik dan amati divergensi drift posisi dan orientasi.',
      levelBadge: 'Level 5',
      icon: '🔄',
      lessonHref: '/learn/sensors/wheel-odometry-and-drift',
      component: <OdometryDriftSimulator />,
    },
    {
      id: 'bayesian-filter',
      category: 'estimation',
      paths: ['slam'],
      titleEn: '1D Recursive Bayesian & Kalman Predict-Correct',
      titleId: 'Prediksi-Koreksi Filter Bayesian & Kalman 1D',
      descEn: 'Execute motion prediction and sensor update steps with live Gaussian belief curves.',
      descId: 'Jalankan langkah prediksi gerak dan pembaruan sensor dengan kurva keyakinan Gaussian.',
      levelBadge: 'Level 8',
      icon: '📈',
      lessonHref: '/learn/estimation/bayes-filter-and-kalman',
      component: <BayesianFilterSimulator />,
    },
    {
      id: 'transform-composition',
      category: 'math',
      paths: ['manipulation'],
      titleEn: 'Transform Composition & Matrix Non-Commutativity',
      titleId: 'Komposisi Transformasi & Sifat Non-Komutatif',
      descEn: 'Compare final poses between T1*T2 vs T2*T1 to understand spatial frame chaining.',
      descId: 'Bandingkan pose akhir antara T1*T2 vs T2*T1 untuk memahami rantai kerangka spasial.',
      levelBadge: 'Level 2',
      icon: '📐',
      lessonHref: '/learn/geometry/transform-composition-and-chains',
      component: <TransformChainSimulator />,
    },
    {
      id: 'holonomic-constraints',
      category: 'kinematics',
      paths: ['slam'],
      titleEn: 'Holonomic vs Non-Holonomic Motion Constraints',
      titleId: 'Kendala Gerak Holonomik vs Non-Holonomik',
      descEn: 'Experience why differential unicycles cannot slide sideways due to Pfaffian constraints.',
      descId: 'Rasakan mengapa robot diferensial tidak dapat meluncur ke samping karena kendala Pfaffian.',
      levelBadge: 'Level 3',
      icon: '🚫',
      lessonHref: '/learn/kinematics/non-holonomic-constraints',
      component: <HolonomicConstraintSimulator />,
    },
    {
      id: 'multi-agent-swarm',
      category: 'advanced',
      paths: ['control'],
      titleEn: 'Multi-Agent Graph Laplacian Swarm Consensus',
      titleId: 'Konsensus Graf Laplacian Kawanan Multi-Agent',
      descEn: 'Explore decentralized flocking, leader-follower formations, and algebraic connectivity.',
      descId: 'Eksplorasi kawanan terdesentralisasi, formasi leader-follower, dan konektivitas aljabar.',
      levelBadge: 'Level 18',
      icon: '👥',
      lessonHref: '/learn/advanced/laplacian-consensus',
      component: <MultiAgentSimulator />,
    },
    {
      id: 'bayesian-room',
      category: 'math',
      paths: ['slam'],
      titleEn: 'Bayesian Room Localization & Prior-Posterior Lab (M10)',
      titleId: 'Lokalisasi Ruangan Bayesian & Pembaharuan Keyakinan (M10)',
      descEn: 'Observe how noisy sensor measurements update posterior probability beliefs via Bayes Rule.',
      descId: 'Amati bagaimana pengukuran sensor berderau memperbarui keyakinan probabilitas posterior dengan Aturan Bayes.',
      levelBadge: 'Level 1',
      icon: '🚪',
      lessonHref: '/learn/mathematics/probability-for-robotics',
      component: <BayesianRoomSimulator />,
    },
    {
      id: 'tracking-error-geometry',
      category: 'control',
      paths: ['slam', 'control'],
      titleEn: 'Path Tracking Error Geometry (e_lat & e_θ) (M14)',
      titleId: 'Geometri Galat Pelacakan Jalur (e_lat & e_θ) (M14)',
      descEn: 'Calculate signed cross-track lateral error and heading alignment error with Frenet-Serret framing.',
      descId: 'Hitung galat samping lateral cross-track bertanda dan galat sudut hadap dengan kerangka Frenet-Serret.',
      levelBadge: 'Level 7',
      icon: '🎯',
      lessonHref: '/learn/control/path-tracking-error-geometry',
      component: <TrackingErrorGeometrySimulator />,
    },
    {
      id: 'arm-2dof-fk',
      category: 'manipulation',
      paths: ['manipulation'],
      titleEn: '2-DOF Planar Arm Forward Kinematics & Workspace (M18)',
      titleId: 'Kinematika Maju Lengan 2-DOF & Batas Ruang Kerja (M18)',
      descEn: 'Calculate end-effector Cartesian coordinates and sweep reachable workspace annulus limits.',
      descId: 'Hitung koordinat ujung lengan Kartesius dan amati batas annulus ruang kerja jangkauan fisik.',
      levelBadge: 'Level 14',
      icon: '🦾',
      lessonHref: '/learn/manipulation/2dof-forward-kinematics',
      component: <ArmForwardKinematicsSimulator />,
    },
    {
      id: 'lidar-raycast',
      category: 'sensors',
      paths: ['slam'],
      titleEn: '2D LiDAR Raycasting & Point Cloud Extraction (M21)',
      titleId: 'Raycasting LiDAR 2D & Ekstraksi Point Cloud (M21)',
      descEn: 'Emit 360° laser rays intersecting obstacles and extract 2D Cartesian reflection point clouds.',
      descId: 'Pancarkan sinar laser 360° yang memotong rintangan dan ekstrak awan titik pantulan (Point Cloud).',
      levelBadge: 'Level 5',
      icon: '📡',
      lessonHref: '/learn/sensors/lidar-raycasting',
      component: <LidarRaycastSimulator />,
    },
    {
      id: 'pure-pursuit',
      category: 'control',
      paths: ['slam', 'control'],
      titleEn: 'Pure Pursuit Geometric Path Tracking Lab (M13)',
      titleId: 'Laboratorium Pelacakan Jalur Pure Pursuit (M13)',
      descEn: 'Tune lookahead distance L_d to balance aggressive heading tracking vs smooth cornering.',
      descId: 'Atur jarak lookahead L_d untuk menyeimbangkan ketajaman pelacakan heading vs kehalusan manuver belok.',
      levelBadge: 'Level 7',
      icon: '🏎️',
      lessonHref: '/learn/control/pure-pursuit-path-tracking',
      component: <PurePursuitSimulator />,
    },
    {
      id: 'astar-dijkstra',
      category: 'planning',
      paths: ['slam'],
      titleEn: 'A* vs Dijkstra Search & Heuristics Lab (M15)',
      titleId: 'Laboratorium Komparasi A* vs Dijkstra (M15)',
      descEn: 'Compare Dijkstra uniform wavefronts against Euclidean and Manhattan goal-biased search cones.',
      descId: 'Bandingkan gelombang buta seragam Dijkstra vs kerucut pencarian terarah A* Euclidean/Manhattan.',
      levelBadge: 'Level 6',
      icon: '⚡',
      lessonHref: '/learn/planning/astar-vs-dijkstra-search',
      component: <AStarVsDijkstraSimulator />,
    },
    {
      id: 'rrt-sampling',
      category: 'planning',
      titleEn: 'RRT & RRT* Sampling Planner Lab (M17)',
      titleId: 'Laboratorium Perencana Sampel RRT & RRT* (M17)',
      descEn: 'Grow randomized space-filling trees and observe asymptotic rewiring optimality in C-space.',
      descId: 'Tumbuhkan pohon acak di ruang konfigurasi dan amati rewiring optimalitas asimtotik RRT*.',
      levelBadge: 'Level 6',
      icon: '🌲',
      lessonHref: '/learn/planning/rrt-sampling-planner',
      component: <RrtExplorationSimulator />,
    },
    {
      id: 'arm-2dof-ik',
      category: 'manipulation',
      paths: ['manipulation'],
      titleEn: '2-DOF Planar Arm Inverse Kinematics Lab (M19)',
      titleId: 'Laboratorium Kinematika Invers (IK) Lengan 2-DOF (M19)',
      descEn: 'Drag target reticle to solve joint motor angles via Law of Cosines (Elbow-Up vs Elbow-Down).',
      descId: 'Geser target crosshair untuk menghitung sudut motor dengan Hukum Kosinus (Siku-Atas vs Siku-Bawah).',
      levelBadge: 'Level 14',
      icon: '🎯',
      lessonHref: '/learn/manipulation/2dof-inverse-kinematics',
      component: <ArmInverseKinematicsSimulator />,
    },
    {
      id: 'jacobian-singularity',
      category: 'manipulation',
      paths: ['manipulation'],
      titleEn: 'Jacobian Matrix & Velocity Ellipse Lab (M20)',
      titleId: 'Laboratorium Matriks Jacobian & Elips Kecepatan (M20)',
      descEn: 'Observe velocity manipulability ellipse collapse as det(J) vanishes into a kinematic singularity.',
      descId: 'Amati kolapsnya elips manipulabilitas kecepatan saat det(J) bernilai nol (singularitas).',
      levelBadge: 'Level 14',
      icon: '📐',
      lessonHref: '/learn/manipulation/jacobian-and-singularity',
      component: <JacobianSingularitySimulator />,
    },
    {
      id: 'state-space',
      category: 'control',
      paths: ['control'],
      titleEn: 'State-Space Dynamics & Phase Plane Lab (M27)',
      titleId: 'Laboratorium Ruang Status & Diagram Fase (M27)',
      descEn: 'Simulate mass-spring-damper phase portrait trajectory converging under full state feedback.',
      descId: 'Simulasikan diagram fase sistem massa-pegas-redaman dengan umpan balik status penuh.',
      levelBadge: 'Level 7',
      icon: '🎛️',
      lessonHref: '/learn/control/state-space-and-feedback',
      component: <StateSpaceSimulator />,
    },
    {
      id: 'discrete-simulation',
      category: 'control',
      paths: ['control'],
      titleEn: 'Discrete Simulation: Euler vs RK4 Lab (M28)',
      titleId: 'Laboratorium Simulasi Diskret: Euler vs RK4 (M28)',
      descEn: 'Compare numerical drift and energy divergence across Euler, Midpoint, and RK4 solvers.',
      descId: 'Bandingkan galat numerik dan divergensi energi antara solver Euler, Midpoint, dan RK4.',
      levelBadge: 'Level 7',
      icon: '⏱️',
      lessonHref: '/learn/control/discrete-time-simulation',
      component: <NumericalDiscretizationSimulator />,
    },
    {
      id: 'gaussian-grid-map',
      category: 'mapping',
      paths: ['slam'],
      titleEn: 'Gaussian Grid Map & Kernel Density Estimation Lab',
      titleId: 'Laboratorium Pemetaan Grid Gaussian & Estimasi Kernel',
      descEn: 'Accumulate 2D Gaussian probability density kernels into grid cells to capture laser beam uncertainty.',
      descId: 'Akumulasikan kernel densitas probabilitas Gaussian 2D ke sel grid untuk memodelkan ketidakpastian laser.',
      levelBadge: 'Level 9',
      icon: '🌐',
      lessonHref: '/learn/perception/gaussian-grid-map',
      component: <GaussianGridMapSimulator />,
    },
    {
      id: 'raycasting-grid-map',
      category: 'mapping',
      paths: ['slam'],
      titleEn: 'Ray Casting Grid Map & Bresenham Line Traversal Lab',
      titleId: 'Laboratorium Pemetaan Raycasting & Garis Bresenham',
      descEn: 'Trace laser rays across discrete pixels using Bresenham algorithm with live log-odds updates.',
      descId: 'Lakukan raycasting melintasi piksel diskrit dengan algoritma Bresenham dan pembaruan log-odds.',
      levelBadge: 'Level 9',
      icon: '🎯',
      lessonHref: '/learn/perception/raycasting-grid-map',
      component: <RayCastingGridMapSimulator />,
    },
    {
      id: 'lidar-to-grid-map',
      category: 'sensors',
      paths: ['slam'],
      titleEn: 'LiDAR to Grid Map Polar-to-Cartesian Lab',
      titleId: 'Laboratorium Konversi LiDAR Polar ke Grid Peta',
      descEn: 'Convert raw (range, bearing) polar scans to global Cartesian coordinates and bin into discrete grid cells.',
      descId: 'Ubah pemindaian polar (jarak, sudut) menjadi koordinat Kartesius dunia dan akumulasikan ke sel grid.',
      levelBadge: 'Level 5',
      icon: '📡',
      lessonHref: '/learn/perception/lidar-to-grid-map',
      component: <LidarToGridMapSimulator />,
    },
    {
      id: 'kmeans-clustering',
      category: 'mapping',
      paths: ['slam'],
      titleEn: 'k-Means Point Cloud Object Clustering Lab',
      titleId: 'Laboratorium Klasterisasi Objek Point Cloud k-Means',
      descEn: 'Partition 2D LiDAR point clouds into K distinct obstacle clusters with iterative Voronoi updates.',
      descId: 'Partisi awan titik LiDAR 2D menjadi K klaster objek rintangan dengan pembaruan iteratif Voronoi.',
      levelBadge: 'Level 9',
      icon: '✨',
      lessonHref: '/learn/perception/kmeans-object-clustering',
      component: <KMeansClusteringSimulator />,
    },
    {
      id: 'rectangle-fitting',
      category: 'mapping',
      paths: ['slam'],
      titleEn: 'Oriented Rectangle (OBB) & L-Shape Bounding Box Lab',
      titleId: 'Laboratorium Oriented Bounding Box & Fitting Bentuk-L',
      descEn: 'Sweep orientation angles to tightly enclose vehicle LiDAR point clusters with minimum area bounding rectangles.',
      descId: 'Pindai sudut orientasi untuk mengekstrak dimensi panjang, lebar, dan sudut kotak pembatas minimal rintangan.',
      levelBadge: 'Level 9',
      icon: '📦',
      lessonHref: '/learn/perception/rectangle-fitting',
      component: <RectangleFittingSimulator />,
    },
    {
      id: 'ekf-localization',
      category: 'estimation',
      paths: ['slam'],
      titleEn: 'Extended Kalman Filter (EKF) 2D Localization Lab',
      titleId: 'Laboratorium Lokalisasi EKF 2D & Elips Kovariansi',
      descEn: 'Fuse non-linear motion prediction with landmark range-bearing measurements with live 3-sigma error ellipses.',
      descId: 'Padukan prediksi gerak non-linear dengan observasi landmark untuk menekan drift dalam elips 3-sigma.',
      levelBadge: 'Level 8',
      icon: '🎯',
      lessonHref: '/learn/estimation/ekf-localization',
      component: <EkfLocalizationSimulator />,
    },
    {
      id: 'histogram-filter',
      category: 'estimation',
      paths: ['slam'],
      titleEn: 'Histogram Filter & Discrete Grid Localization Lab',
      titleId: 'Laboratorium Filter Histogram & Lokalisasi Diskret',
      descEn: 'Step through discrete motion diffusion convolutions and landmark sensor likelihood multiplications.',
      descId: 'Jalankan konvolusi difusi gerak diskret dan perkalian likelihood sensor untuk melokalisasi robot di lorong.',
      levelBadge: 'Level 8',
      icon: '📊',
      lessonHref: '/learn/estimation/histogram-filter-localization',
      component: <HistogramFilterSimulator />,
    },
    {
      id: 'fastslam-1',
      category: 'advanced',
      paths: ['slam'],
      titleEn: 'FastSLAM 1.0 Rao-Blackwellized Particle Filtering Lab',
      titleId: 'Laboratorium FastSLAM 1.0 & Elips Landmark Partikel',
      descEn: 'Track multi-hypothesis robot paths with individual 2x2 EKF landmark Gaussian estimators per particle.',
      descId: 'Lacak lintasan multi-hipotesis dengan estimator Gaussian EKF landmark 2x2 terpisah pada setiap partikel.',
      levelBadge: 'Level 10',
      icon: '✨',
      lessonHref: '/learn/advanced/fastslam-1',
      component: <FastSlamSimulator />,
    },
    {
      id: 'loop-closure-graph',
      category: 'advanced',
      paths: ['slam'],
      titleEn: 'Pose Graph SLAM & Loop Closure Optimization Lab',
      titleId: 'Laboratorium Graf Pose SLAM & Optimasi Loop Closure',
      descEn: 'Observe open-loop odometry trajectory drift snap into consistency when loop closure edges are optimized.',
      descId: 'Amati drift odometri tereliminasi seketika saat kendala loop closure dioptimasi menggunakan graf faktor.',
      levelBadge: 'Level 10',
      icon: '🔗',
      lessonHref: '/learn/advanced/2d-lidar-slam',
      component: <LoopClosureOptimizationSimulator />,
    },
    {
      id: 'autonomous-exploration-lags',
      category: 'planning',
      paths: ['slam'],
      titleEn: 'Information-Theoretic Exploration & LAGS Lab',
      titleId: 'Laboratorium Eksplorasi Otonom & Strategi LAGS (MDPI 2023)',
      descEn: 'Observe live Shannon map entropy reduction and compare Nearest Frontier vs LAGS in clearing dead-ends.',
      descId: 'Amati penurunan entropi Shannon peta okupansi dan bandingkan Nearest Frontier vs LAGS dalam membersihkan kantong wilayah.',
      levelBadge: 'Level 6',
      icon: '🧭',
      lessonHref: '/learn/planning/autonomous-exploration-lags',
      component: <AutonomousExplorationSimulator />,
    },
    {
      id: 'safe-corridor-exploration',
      category: 'planning',
      paths: ['slam'],
      titleEn: '3D MAV Exploration & Safe Flight Corridor Lab',
      titleId: 'Laboratorium Eksplorasi MAV 3D & Safe Flight Corridor (MDPI 2020)',
      descEn: 'Fly a quadrotor through 3D voxel obstacles inside inflated convex Safe Flight Corridors (SFC).',
      descId: 'Terbangkan drone quadrotor melintasi voxel rintangan 3D di dalam koridor penerbangan aman cembung (SFC).',
      levelBadge: 'Level 6',
      icon: '🛡️',
      lessonHref: '/learn/planning/3d-frontier-exploration-mav',
      component: <SafeCorridorExplorationSimulator />,
    },
    {
      id: 'quadrotor-dynamics',
      category: 'control',
      paths: ['control'],
      titleEn: '6-DOF Multirotor Flight Dynamics Lab',
      titleId: 'Laboratorium Dinamika Penerbangan Multirotor 6-DOF',
      descEn: 'Control rotor thrust differentials to balance collective lift, roll, and pitch in real-time flight.',
      descId: 'Kendalikan diferensial dorongan rotor untuk menyeimbangkan gaya angkat, gulingan, dan anggukan drone.',
      levelBadge: 'Level 0',
      icon: '🚁',
      lessonHref: '/learn/fundamentals/aerial-drone-principles',
      component: <QuadrotorDynamicsSimulator />,
    },
    {
      id: 'marine-hydrodynamics',
      category: 'control',
      paths: ['control'],
      titleEn: '6-DOF Marine Hydrodynamics & Buoyancy Lab',
      titleId: 'Laboratorium Hidrodinamika Laut & Gaya Apung AUV',
      descEn: 'Trim ballast buoyancy and forward propulsion under hydrostatic equilibrium and ocean currents.',
      descId: 'Atur keseimbangan gaya apung ballast dan daya dorong maju AUV dalam fluida laut dinamis.',
      levelBadge: 'Level 0',
      icon: '🌊',
      lessonHref: '/learn/fundamentals/marine-robotics-fundamentals',
      component: <MarineHydrodynamicsSimulator />,
    },
    {
      id: 'legged-zmp',
      category: 'control',
      paths: ['control'],
      titleEn: 'Zero Moment Point (ZMP) Legged Locomotion Lab',
      titleId: 'Laboratorium Zero Moment Point (ZMP) Robot Berkaki',
      descEn: 'Maintain bipedal/quadruped inverted pendulum dynamic stability within the foot support polygon.',
      descId: 'Pertahankan stabilitas dinamis pendulum terbalik robot berkaki di dalam poligon tumpuan kaki.',
      levelBadge: 'Level 0',
      icon: '🦿',
      lessonHref: '/learn/fundamentals/legged-robotics-fundamentals',
      component: <LeggedZmpSimulator />,
    },
    {
      id: 'lie-group-algebra',
      category: 'math',
      paths: ['slam', 'manipulation'],
      titleEn: 'Lie Groups SO(3) & Lie Algebra so(3) Lab',
      titleId: 'Laboratorium Grup Lie SO(3) & Aljabar Lie so(3)',
      descEn: 'Map tangent vectors in so(3) to 3D rotation matrices on the SO(3) manifold via Rodrigues exponential map.',
      descId: 'Petakan vektor ruang singgung so(3) ke matriks rotasi manifold SO(3) menggunakan peta eksponensial Rodrigues.',
      levelBadge: 'Level 2',
      icon: '📦',
      lessonHref: '/learn/geometry/lie-groups-and-lie-algebras',
      component: <LieGroupAlgebraSimulator />,
    },
    {
      id: 'factor-graph-optimizer',
      category: 'estimation',
      paths: ['slam'],
      titleEn: 'Factor Graph SLAM & Non-Linear Least Squares Lab',
      titleId: 'Laboratorium Graf Faktor & Non-Linear Least Squares SLAM',
      descEn: 'Iterate Gauss-Newton steps to minimize non-linear residual errors across odometry, landmark, and loop factors.',
      descId: 'Lakukan iterasi langkah Gauss-Newton untuk meminimalkan galat residual non-linear pada faktor odometri dan landmark.',
      levelBadge: 'Level 10',
      icon: '🔀',
      lessonHref: '/learn/advanced/factor-graph-optimization',
      component: <FactorGraphOptimizerSimulator />,
    },
    {
      id: '3dgs-slam-radiance',
      category: 'estimation',
      paths: ['slam'],
      titleEn: '3D Gaussian Splatting SLAM (3DGS-SLAM) Lab',
      titleId: 'Laboratorium 3D Gaussian Splatting SLAM (3DGS-SLAM)',
      descEn: 'Orbit a virtual camera to observe real-time differentiable 3D anisotropic Gaussian rasterization and densification.',
      descId: 'Orbitkan kamera virtual untuk mengamati rasterisasi dan densifikasi 3D Gaussian anisotropik secara real-time.',
      levelBadge: 'Level 10',
      icon: '✨',
      lessonHref: '/learn/advanced/3d-gaussian-splatting-slam',
      component: <GaussianSplattingSlamSimulator />,
    },
    {
      id: 'vla-diffusion-policy',
      category: 'manipulation',
      paths: ['manipulation'],
      titleEn: 'VLA Diffusion Policy Trajectory Synthesis Lab',
      titleId: 'Laboratorium Sintesis Trajektori Diffusion Policy VLA',
      descEn: 'Denoise Gaussian action noise into smooth, continuous manipulation trajectories conditioned on language prompts.',
      descId: 'Lakukan proses denoising dari derau Gaussian menjadi trajektori manipulasi robot yang mulus terkondisi teks.',
      levelBadge: 'Level 10',
      icon: '🦾',
      lessonHref: '/learn/advanced/vla-and-diffusion-policies',
      component: <DiffusionPolicyVlaSimulator />,
    },
    {
      id: 'formation-control',
      category: 'control',
      paths: ['control'],
      titleEn: 'Multi-Agent Formation Control & Flocking Lab',
      titleId: 'Laboratorium Kendali Formasi & Kawanan Robot',
      descEn: 'Guide a leader-follower multi-robot swarm along triangle, V-wedge, and line formations via graph consensus.',
      descId: 'Pandu kawanan robot multi-agen mengikuti formasi segitiga, V, dan garis menggunakan konsensus graf Laplacian.',
      levelBadge: 'Level 18',
      icon: '👥',
      lessonHref: '/learn/advanced/formation-control-and-swarms',
      component: <FormationControlSimulator />,
    },
    {
      id: 'numerical-stability',
      category: 'math',
      paths: ['control'],
      titleEn: 'Numerical Stability: Euler vs Symplectic vs RK4 Lab',
      titleId: 'Laboratorium Stabilitas Numerik: Euler vs Simplektik vs RK4',
      descEn: 'Compare energy drift and numerical stiffness across Explicit Euler, Symplectic Euler, and 4th-Order Runge-Kutta.',
      descId: 'Bandingkan akumulasi galat energi dan kestabilan numerik antara Euler Eksplisit, Euler Simplektik, dan Runge-Kutta 4.',
      levelBadge: 'Level 1',
      icon: '📈',
      lessonHref: '/learn/mathematics/numerical-stability-euler-vs-rk4',
      component: <NumericalIntegrationSimulator />,
    },
    {
      id: 'sensor-fusion',
      category: 'estimation',
      paths: ['slam'],
      titleEn: 'Multi-Sensor Fusion (Odometry + IMU + GPS) Lab',
      titleId: 'Laboratorium Fusi Multi-Sensor (Odometri + IMU + GPS)',
      descEn: 'Fuse drifting high-rate wheel odometry and IMU with noisy global GPS position fixes using Kalman filtering.',
      descId: 'Gabungkan pembacaan odometri berkecepatan tinggi yang mengalami drift dengan koreksi GPS absolut menggunakan filter Kalman.',
      levelBadge: 'Level 8',
      icon: '🛰️',
      lessonHref: '/learn/estimation/sensor-fusion-imu-gps-odometry',
      component: <SensorFusionSimulator />,
    },
  ];

  const categories = [
    { id: 'all', labelEn: `All Labs (${labs.length})`, labelId: `Semua Lab (${labs.length})` },
    { id: 'path-slam', labelEn: '🧭 SLAM Path', labelId: '🧭 Jalur SLAM' },
    { id: 'path-manipulation', labelEn: '🦾 Arm Path', labelId: '🦾 Jalur Manipulator' },
    { id: 'path-control', labelEn: '🎛️ Control Path', labelId: '🎛️ Jalur Kendali' },
    { id: 'math', labelEn: 'Math & Geometry', labelId: 'Matematika & Geometri' },
    { id: 'kinematics', labelEn: 'Kinematics', labelId: 'Kinematika' },
    { id: 'planning', labelEn: 'Planning', labelId: 'Perencanaan' },
    { id: 'control', labelEn: 'Control', labelId: 'Kendali' },
    { id: 'estimation', labelEn: 'Estimation & SLAM', labelId: 'Estimasi & SLAM' },
    { id: 'manipulation', labelEn: 'Manipulation', labelId: 'Manipulasi' },
    { id: 'advanced', labelEn: 'Swarm & Advanced', labelId: 'Kawanan & Lanjutan' },
  ];

  const filteredLabs = labs.filter((l) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'path-slam') return l.paths?.includes('slam');
    if (activeCategory === 'path-manipulation') return l.paths?.includes('manipulation');
    if (activeCategory === 'path-control') return l.paths?.includes('control');
    if (activeCategory === 'estimation') return l.category === 'estimation' || l.category === 'mapping' || l.category === 'slam';
    return l.category === activeCategory;
  });

  const selectedLab = labs.find((l) => l.id === activeLabId) || labs[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>{isId ? 'Laboratorium Interaktif 60 FPS' : '60 FPS In-Browser Interactive Laboratories'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
          {isId ? 'Laboratorium Simulasi & Sandbox Robotika' : 'Robotics Simulation & Interactive Labs'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans">
          {isId
            ? 'Seluruh simulator berjalan 100% di peramban Anda menggunakan mesin komputasi TypeScript deterministik. Uji coba parameter fisik, ubah kondisi batas, dan pantau telemetri secara real-time.'
            : 'All simulators run 100% client-side using deterministic TypeScript physics engines. Experiment with parameters, alter boundary conditions, and inspect real-time state telemetry.'}
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {isId ? cat.labelId : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workstation Layout: Left Selector + Right Live Simulator Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Lab Selector List */}
        <div className="lg:col-span-4 space-y-3 max-h-[800px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredLabs.map((lab) => {
            const isSelected = lab.id === activeLabId;
            return (
              <button
                key={lab.id}
                onClick={() => setActiveLabId(lab.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/15 to-blue-600/10 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'glass-panel hover:bg-slate-100/80 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{lab.icon}</span>
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                      {isId ? lab.titleId : lab.titleEn}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {lab.levelBadge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 font-sans">
                  {isId ? lab.descId : lab.descEn}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Simulator Sandbox Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedLab.icon}</span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {isId ? selectedLab.titleId : selectedLab.titleEn}
                </h2>
                <span className="text-xs text-slate-500 font-mono">{selectedLab.levelBadge} Simulator</span>
              </div>
            </div>

            <Link
              href={selectedLab.lessonHref}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isId ? 'Buka Teori Lengkap' : 'Read Full Lesson'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Render Component */}
          <div className="w-full">
            {selectedLab.component}
          </div>
        </div>
      </div>
    </div>
  );
}
