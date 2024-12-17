import stripesFagment from "@/app/shaders/stripes.fragment.glsl";
import { mapValue } from "@/lib/mapValue";
import { useGSAP } from "@gsap/react";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { COSINE_GRADIENTS, type CosineGradientPreset } from "@thi.ng/color";
import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";
import stripesVertext from "../../app/shaders/stripes.vertex.glsl";

gsap.registerPlugin(ScrollTrigger);

const variants: CosineGradientPreset[] = [
  "purple-orange-cyan",
  "yellow-magenta-cyan",
  "yellow-purple-magenta",
];
// Choose random variant
const randomVariant = variants[Math.floor(Math.random() * variants.length)];

const DEFAULT_COLOR_PALETTE: THREE.Vector3[] = COSINE_GRADIENTS[
  randomVariant
].map((color) => new THREE.Vector3(...color));

const TestShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uAspectRatio: 1,
    uScrollOffset: 0,
    uColourPalette: DEFAULT_COLOR_PALETTE,
    uScale: 1,
    uUvDistortionIterations: 0,
    uUvDistortionItensity: 0,
    uGrainSize: 0,
    uGrainAmount: 0,
  },
  stripesVertext,
  stripesFagment
);

// declaratively
extend({ TestShaderMaterial });

// declare module "@react-three/fiber" {
//   interface ThreeElements {
//     testShaderMaterial: Object3DNode<
//       typeof TestShaderMaterial,
//       typeof TestShaderMaterial
//     > & { color?: THREE.Color } & { transparent?: boolean } & {
//       uAlpha?: number;
//     } & { uTime?: number } & { uMouse?: THREE.Vector2 } & {
//       uTexture?: THREE.Texture | null;
//     } & { uAspectRatio?: number } & { uScrollOffset?: number } & {
//       uColourPalette?: THREE.Vector3[];
//     } & { uScale?: number } & { uUvDistortionIterations?: number } & {
//       uUvDistortionItensity?: number;
//     } & { uGrainSize?: number } & { uGrainAmount?: number };
//   }
// }
declare module "@react-three/fiber" {
  interface ThreeElements {
    testShaderMaterial: any;
  }
}

export default function SceneHero01() {
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();
  const scrollOffset = useRef(0);

  let timeMultiplier = 0.07;
  let scale = 0.9;
  let UvDistortionIterations = 5;
  let UvDistortionItensity = 0.32;
  let grainSize = 3;
  let grainAmount = 0.8;
  // const colourPalette = COSINE_GRADIENTS["purple-orange-cyan"].map(
  //   (color) => new THREE.Vector3(...color)
  // );

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: ({ progress }) => {
        scrollOffset.current = progress;
      },
    });
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime * timeMultiplier;
      const normalizedMouse = {
        x: mapValue(state.pointer.x, -1, 1, 0, 1),
        y: mapValue(state.pointer.y, -1, 1, 0, 1),
      };
      materialRef.current.uMouse = normalizedMouse;
      materialRef.current.uScrollOffset = scrollOffset.current;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <testShaderMaterial
        ref={materialRef}
        transparent
        uAspectRatio={viewport.aspect}
        uScrollOffset={0}
        uColourPalette={DEFAULT_COLOR_PALETTE}
        uScale={scale}
        uUvDistortionIterations={UvDistortionIterations}
        uUvDistortionItensity={UvDistortionItensity}
        uGrainSize={grainSize}
        uGrainAmount={grainAmount}
      />
    </mesh>
  );
}

function useConfig() {
  const {
    paletteKey,
    timeMultiplier,
    scale,
    UvDistortionIterations,
    UvDistortionItensity,
    grainSize,
    grainAmount,
  } = useControls({
    paletteKey: {
      label: "Palette",
      value: "purple-orange-cyan" as CosineGradientPreset,
      options: Object.keys(COSINE_GRADIENTS),
    },
    timeMultiplier: {
      label: "Time Multiplier",
      value: 0.07,
      min: 0,
      max: 1,
      step: 0.05,
    },
    scale: {
      label: "Scale",
      value: 0.9,
      min: 0,
      max: 10,
    },
    UvDistortionIterations: {
      label: "Uv Distortion Iterations",
      value: 5,
      min: 0,
      max: 14,
      step: 1,
    },
    UvDistortionItensity: {
      label: "Uv Distortion Itensity",
      value: 0.32,
      min: 0,
      max: 1,
      step: 0.02,
      render: (get) => get("UvDistortionIterations") > 0,
    },
    grainAmount: {
      label: "Grain Amount",
      value: 0.8,
      min: 0,
      max: 1.5,
    },
    grainSize: {
      label: "Grain Size",
      value: 3,
      min: 0.5,
      max: 5,
    },
  });

  const colourPalette = COSINE_GRADIENTS[
    paletteKey as CosineGradientPreset
  ].map((color) => new THREE.Vector3(...color));

  return {
    colourPalette,
    timeMultiplier,
    scale,
    UvDistortionIterations,
    UvDistortionItensity,
    grainSize,
    grainAmount,
  };
}
