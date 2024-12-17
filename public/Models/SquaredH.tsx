import { useGSAP } from "@gsap/react";
import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import gsap from "gsap";

export default function SquaredH() {
  const squareHRef = useRef<Mesh>(null);
  const { nodes } = useGLTF("/Models/SquaredH.glb");

  useFrame((state, delta) => {
    if (squareHRef.current) {
      squareHRef.current.rotation.x += Math.PI * 0.1 * delta; // Velocidad ajustada con delta
      squareHRef.current.rotation.y += Math.PI * 0.25 * delta; // Velocidad ajustada con delta
    }
  });

  return (
    <group scale={0.1} position={[8, -5, -1]} rotation={[0, 0, 0]}>
      <mesh ref={squareHRef} {...nodes.Boolean}>
        <MeshTransmissionMaterial
          thickness={0.001}
          roughness={0.54}
          transmission={1.5}
          ior={5}
          chromaticAberration={1}
          backside={{ value: true }}
        />
      </mesh>
    </group>
  );
}
