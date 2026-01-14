'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud, Clouds } from '@react-three/drei';
import { MeshLambertMaterial } from 'three';
import { useRef, useMemo, memo, useEffect, useState } from 'react';
import * as THREE from 'three';

const AnimatedCloud = memo(function AnimatedCloud({ 
  seed, 
  position, 
  opacity,
  speed,
  isLightMode
}: { 
  seed: number; 
  position: [number, number, number]; 
  opacity: number;
  speed: number;
  isLightMode: boolean;
}) {
  const cloudRef = useRef<THREE.Group>(null);
  const initialPosition = useRef(position);

  useFrame((state) => {
    if (cloudRef.current) {
      const time = state.clock.elapsedTime;
      // Slow horizontal drift
      cloudRef.current.position.x = initialPosition.current[0] + Math.sin(time * 0.05 + seed) * 10;
      // Subtle vertical floating
      cloudRef.current.position.y = initialPosition.current[1] + Math.sin(time * 0.08 + seed * 0.5) * 2;
      // Gentle rotation
      cloudRef.current.rotation.z = Math.sin(time * 0.03 + seed) * 0.1;
    }
  });

  // Increase opacity for light mode to make clouds more visible
  const adjustedOpacity = isLightMode ? Math.min(opacity * 1.3, 1) : opacity;

  return (
    <group ref={cloudRef} position={initialPosition.current}>
      <Cloud
        seed={seed}
        segments={100}
        bounds={[200, 8, 15]}
        volume={60}
        color="white"
        opacity={adjustedOpacity}
        speed={speed}
        fade={200}
      />
    </group>
  );
});

function ReadyNotifier({ onReady }: { onReady?: () => void }) {
  const { gl } = useThree();
  const called = useRef(false);

  useEffect(() => {
    if (!called.current && onReady) {
      // Wait for first render cycle to complete
      requestAnimationFrame(() => {
        called.current = true;
        onReady();
      });
    }
  }, [gl, onReady]);

  return null;
}

const AnimatedCloudGroup = memo(function AnimatedCloudGroup({ isLightMode }: { isLightMode: boolean }) {
  const cloudsRef = useRef<THREE.Group>(null);

  // Subtle overall rotation animation
  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={cloudsRef}>
      <Clouds
        material={MeshLambertMaterial}
        limit={400}
        range={400}
        frustumCulled={false}
      >
        {/* One massive cloud spanning full width */}
        <AnimatedCloud
          seed={42}
          position={[0, -18, 0]}
          opacity={0.95}
          speed={0.2}
          isLightMode={isLightMode}
        />
        {/* Second layer for extra density */}
        <AnimatedCloud
          seed={99}
          position={[0, -18, 3]}
          opacity={0.9}
          speed={0.15}
          isLightMode={isLightMode}
        />
      </Clouds>
    </group>
  );
});

export default function CloudScene({ onReady }: { onReady?: () => void }) {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check initial color scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    setIsLightMode(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsLightMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const canvasConfig = useMemo(() => ({
    camera: { position: [0, 12, 25] as [number, number, number], fov: 90 },
    gl: { alpha: true, antialias: true, preserveDrawingBuffer: true },
  }), []);

  // Increase lighting intensity for light mode to make clouds brighter
  const ambientIntensity = isLightMode ? 1.2 : 0.7;
  const directionalIntensity = isLightMode ? 1.5 : 1;

  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas
        camera={canvasConfig.camera}
        gl={canvasConfig.gl}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={directionalIntensity} />
        <AnimatedCloudGroup isLightMode={isLightMode} />
        <ReadyNotifier onReady={onReady} />
      </Canvas>
    </div>
  );
}
