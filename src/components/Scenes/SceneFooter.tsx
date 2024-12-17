"use client";
import { Canvas } from "@react-three/fiber";
import SquaredH from "../../../public/Models/SquaredH";
import { Environment } from "@react-three/drei";

export default function SceneFooter() {
  return (
    <Canvas>
      <directionalLight intensity={0.06} position={[0, 0, 0]} />
      <Environment preset="forest" />
      <SquaredH />
    </Canvas>
  );
}
