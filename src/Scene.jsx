import { useThree } from "@react-three/fiber";
import { Cloud, Clouds, Sky } from "@react-three/drei";
import { useMemo } from "react";
import Balloon from "./Balloon";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { getPositions } from "./helper";
import { cloudConfig, skyConfig } from "./configs";
import { BALLOONS_MODELS_LENGTH } from "./constants";

export default function Experience() {
  const { viewport } = useThree();

  const positions = useMemo(
    () => getPositions({ xMax: viewport.width, zMax: 15, n: 10, nRow: 3 }),

    []
  );

  return (
    <>
      <directionalLight
        intensity={5.5}
        color="#e59b1a"
        position={[-4, 0, -2]}
        castShadow
      />
      <directionalLight intensity={0.3} color="#969595" position={[0, 1, 1]} />
      <ambientLight intensity={1.5} color="white" />

      <Sky {...skyConfig} />

      {positions.map(({ x, z }, index) => (
        <Balloon
          initialPos={{ x, z }}
          nameIndex={index % BALLOONS_MODELS_LENGTH}
        />
      ))}

      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud {...cloudConfig} />
      </Clouds>

      <EffectComposer>
        <DepthOfField
          target={[0, 0, -4]}
          focalLength={0.1}
          bokehScale={10}
          height={1000}
        />
        <ToneMapping />
      </EffectComposer>
    </>
  );
}
