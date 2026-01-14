'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud, Clouds } from '@react-three/drei';
import { MeshLambertMaterial } from 'three';
import { useRef, useMemo, memo, useEffect } from 'react';
import * as THREE from 'three';

const AnimatedCloud = memo(function AnimatedCloud({ 
  seed, 
  position, 
  opacity,
  speed 
}: { 
  seed: number; 
  position: [number, number, number]; 
  opacity: number;
  speed: number;
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

  return (
    <group ref={cloudRef} position={initialPosition.current}>
      <Cloud
        seed={seed}
        segments={100}
        bounds={[200, 8, 15]}
        volume={60}
        color="white"
        opacity={opacity}
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

const AnimatedCloudGroup = memo(function AnimatedCloudGroup() {
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
        />
        {/* Second layer for extra density */}
        <AnimatedCloud
          seed={99}
          position={[0, -18, 3]}
          opacity={0.9}
          speed={0.15}
        />
      </Clouds>
    </group>
  );
});

export default function CloudScene({ onReady }: { onReady?: () => void }) {
  const canvasConfig = useMemo(() => ({
    camera: { position: [0, 12, 25] as [number, number, number], fov: 90 },
    gl: { alpha: true, antialias: true, preserveDrawingBuffer: true },
  }), []);

  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas
        camera={canvasConfig.camera}
        gl={canvasConfig.gl}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedCloudGroup />
        <ReadyNotifier onReady={onReady} />
      </Canvas>
    </div>
  );
}
