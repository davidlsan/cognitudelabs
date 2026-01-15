"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import { MeshLambertMaterial } from "three";
import { useRef, useMemo, memo, useEffect, useState } from "react";
import * as THREE from "three";

const AnimatedCloud = memo(function AnimatedCloud({
  seed,
  position,
  opacity,
  speed,
  isLightMode,
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
      cloudRef.current.position.x =
        initialPosition.current[0] + Math.sin(time * 0.05 + seed) * 10;
      // Subtle vertical floating
      cloudRef.current.position.y =
        initialPosition.current[1] + Math.sin(time * 0.08 + seed * 0.5) * 2;
      // Gentle rotation
      cloudRef.current.rotation.z = Math.sin(time * 0.03 + seed) * 0.1;
    }
  });

  // Increase opacity significantly for light mode to make clouds whiter and more visible
  const adjustedOpacity = isLightMode ? Math.min(opacity * 1.6, 1) : opacity;
  // Use a brighter white color in light mode for better contrast against baby blue sky
  const cloudColor = isLightMode ? "#ffffff" : "white";

  return (
    <group ref={cloudRef} position={initialPosition.current}>
      <Cloud
        seed={seed}
        segments={100}
        bounds={[200, 8, 15]}
        volume={65}
        color={cloudColor}
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

const AnimatedCloudGroup = memo(function AnimatedCloudGroup({
  isLightMode,
  isMobile,
}: {
  isLightMode: boolean;
  isMobile: boolean;
}) {
  const cloudsRef = useRef<THREE.Group>(null);

  // Subtle overall rotation animation
  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Adjust cloud Y position for mobile to show more clouds in viewport
  const cloudYPosition = isMobile ? -12 : -18;

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
          position={[0, cloudYPosition, 0]}
          opacity={isLightMode ? 1.0 : 0.95}
          speed={0.2}
          isLightMode={isLightMode}
        />
        {/* Second layer for extra density */}
        <AnimatedCloud
          seed={99}
          position={[0, cloudYPosition, 3]}
          opacity={isLightMode ? 0.98 : 0.9}
          speed={0.15}
          isLightMode={isLightMode}
        />
      </Clouds>
    </group>
  );
});

export default function CloudScene({ onReady }: { onReady?: () => void }) {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial color scheme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    setIsLightMode(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsLightMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Check if mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const canvasConfig = useMemo(
    () => ({
      camera: { 
        position: [0, isMobile ? 8 : 12, 25] as [number, number, number], 
        fov: 90 
      },
      gl: { alpha: true, antialias: true, preserveDrawingBuffer: true },
    }),
    [isMobile]
  );

  // Increase lighting intensity significantly for light mode to make clouds whiter
  const ambientIntensity = isLightMode ? 1.5 : 0.7;
  const directionalIntensity = isLightMode ? 2.0 : 1;

  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas
        camera={canvasConfig.camera}
        gl={canvasConfig.gl}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={directionalIntensity}
        />
        <AnimatedCloudGroup isLightMode={isLightMode} isMobile={isMobile} />
        <ReadyNotifier onReady={onReady} />
      </Canvas>
    </div>
  );
}
