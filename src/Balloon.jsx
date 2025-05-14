import { Clone, useFBX } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef } from "react";

export default function Balloon({ initialPos: { x, z }, nameIndex }) {
  const model = useFBX(`./models/b${nameIndex + 1}.fbx`);
  
  const { viewport, clock } = useThree();
  const borderY = viewport.height;

  const modelRef = useRef();

  const [data, setData] = useState(() => {
    return {
      position: [x, 0, z],
      factor: 0.75 + Math.random() * 0.2,
      direction: Math.random() < 0.5 ? -1 : 1,
      rotationDirection: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.2,
      directionSpeed: Math.random() / 2,
    };
  }, []);

  useFrame((_, delta) => {
    const t = clock.getElapsedTime();

    const { position, rotationDirection, factor, direction, directionSpeed } =
      data;
    let newPosition = position;

    const posY = position[1] - factor * delta * direction * directionSpeed;
    const newRotation = [
      0,
      (modelRef.current?.rotation.y || 0) + rotationDirection * delta,
      0,
    ];
    let newDirection = direction;

    if (direction === 1 ? posY < -borderY * 1.5 : posY > borderY) {
      newDirection = -direction;
    } else {
      newPosition = [position[0], posY, position[2]];
    }

    setData({
      ...data,
      position: newPosition,
      direction: newDirection,
    });

    modelRef.current?.position.set(
      newPosition[0],
      newPosition[1],
      newPosition[2]
    );
    modelRef.current?.rotation.set(0, newRotation[1], 0);
    modelRef.current?.updateMatrix();
  });

  return (
    <Clone
      ref={modelRef}
      object={model}
      scale={0.0025}
      position={data.position}
    />
  );
}
