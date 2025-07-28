import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw, Zap } from "lucide-react";
import * as THREE from "three";

// Animated 3D Shape Component
function AnimatedShape({ position, color, type = "sphere", speed = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  const scale = hovered ? 1.5 : 1;

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {type === "sphere" && <sphereGeometry args={[0.5, 16, 16]} />}
        {type === "box" && <boxGeometry args={[1, 1, 1]} />}
        {type === "cone" && <coneGeometry args={[0.5, 1, 8]} />}
        <meshStandardMaterial
          color={hovered ? "#ffffff" : color}
          transparent
          opacity={0.8}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
    </Float>
  );
}

// Particle Cloud Component
function ParticleCloud() {
  const pointsRef = useRef();
  const particleCount = 1000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      colors[i * 3] = 0.2 + Math.random() * 0.8;
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 2] = 1.0;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Floating Tech Icons
function FloatingTechIcon({ position, text, color }) {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <Suspense fallback={null}>
        <Text
          position={position}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Suspense>
    </Float>
  );
}

// Main 3D Scene Component
function Scene({ isPaused, autoRotate }) {
  const shapes = [
    { position: [-3, 0, 0], color: "#3b82f6", type: "sphere" },
    { position: [3, 0, 0], color: "#8b5cf6", type: "box" },
    { position: [0, 3, 0], color: "#06b6d4", type: "cone" },
    { position: [-2, -2, 2], color: "#10b981", type: "sphere" },
    { position: [2, -2, -2], color: "#f59e0b", type: "box" },
  ];

  const techIcons = [
    { position: [-4, 2, 1], text: "React", color: "#61dafb" },
    { position: [4, 2, -1], text: "JS", color: "#f7df1e" },
    { position: [0, -3, 2], text: "CSS", color: "#1572b6" },
    { position: [-2, 1, -3], text: "Node", color: "#68a063" },
    { position: [3, -1, 3], text: "TS", color: "#3178c6" },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />

      {/* Animated Shapes */}
      {!isPaused &&
        shapes.map((shape, index) => (
          <AnimatedShape
            key={index}
            position={shape.position}
            color={shape.color}
            type={shape.type}
            speed={Math.random() * 2 + 0.5}
          />
        ))}

      {/* Floating Tech Icons */}
      {techIcons.map((icon, index) => (
        <FloatingTechIcon
          key={index}
          position={icon.position}
          text={icon.text}
          color={icon.color}
        />
      ))}

      {/* Particle Cloud */}
      <ParticleCloud />

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        minDistance={5}
        maxDistance={20}
      />
    </>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D Scene Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-96 w-full rounded-xl overflow-hidden bg-slate-900/50 flex items-center justify-center">
          <div className="text-center text-white">
            <Zap className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-lg font-semibold mb-2">3D Scene Unavailable</h3>
            <p className="text-gray-400">
              The 3D scene is temporarily unavailable
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Interactive3DScene = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const controls = [
    {
      icon: isPaused ? Play : Pause,
      label: isPaused ? "Resume" : "Pause",
      action: () => setIsPaused(!isPaused),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: RotateCcw,
      label: autoRotate ? "Stop Rotation" : "Auto Rotate",
      action: () => setAutoRotate(!autoRotate),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      label: isVisible ? "Hide Scene" : "Show Scene",
      action: () => setIsVisible(!isVisible),
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              Interactive 3D Scene
            </h3>
            <p className="text-gray-400 text-sm">
              Drag to rotate • Scroll to zoom • Click shapes
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {controls.map((control, index) => (
            <motion.button
              key={index}
              onClick={control.action}
              className={`p-2 rounded-lg bg-gradient-to-r ${control.color} text-white hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={control.label}
            >
              <control.icon className="w-4 h-4" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      {isVisible && (
        <motion.div
          className="h-96 w-full rounded-xl overflow-hidden bg-slate-900/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorBoundary>
            <Canvas
              camera={{ position: [0, 0, 10], fov: 60 }}
              style={{ height: "100%", width: "100%" }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <Scene isPaused={isPaused} autoRotate={autoRotate} />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </motion.div>
      )}

      {/* Scene Info */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
          <div className="text-blue-400 font-semibold text-sm">Shapes</div>
          <div className="text-white text-xs">Interactive 3D</div>
        </div>
        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
          <div className="text-purple-400 font-semibold text-sm">Particles</div>
          <div className="text-white text-xs">1000+ Points</div>
        </div>
        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
          <div className="text-cyan-400 font-semibold text-sm">Tech Stack</div>
          <div className="text-white text-xs">Three.js</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Interactive3DScene;
