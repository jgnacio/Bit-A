import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import dynamic from "next/dynamic";

const SceneHero01 = dynamic(() => import("./SceneHero01"), { ssr: false });

export default function Experience() {
  const podium = useRef<Group>(null);
  const shaderRef = useRef<any>(null);

  // Actualiza `time` en cada frame para animar el shader
  useFrame((_state, delta) => {
    if (podium.current) {
      podium.current.rotation.y += delta / 2;
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value += delta;
    }
  });

  return (
    <>
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        enableZoom={false}
      />
      <SceneHero01 />
    </>
  );
}
