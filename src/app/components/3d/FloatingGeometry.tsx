"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireShape({
    position,
    geometry,
    speed,
    scale,
}: {
    position: [number, number, number];
    geometry: "icosahedron" | "torus" | "octahedron";
    speed: number;
    scale: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.15;
        meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.1;
        meshRef.current.position.y =
            position[1] + Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
    });

    const getGeometry = () => {
        switch (geometry) {
            case "icosahedron":
                return <icosahedronGeometry args={[1, 1]} />;
            case "torus":
                return <torusGeometry args={[1, 0.3, 12, 24]} />;
            case "octahedron":
                return <octahedronGeometry args={[1, 0]} />;
        }
    };

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            {getGeometry()}
            <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.04}
                wireframe
            />
        </mesh>
    );
}

export default function FloatingGeometry() {
    return (
        <group>
            <WireShape position={[-10, 4, -18]} geometry="icosahedron" speed={0.3} scale={3} />
            <WireShape position={[10, -3, -15]} geometry="torus" speed={0.2} scale={2} />
            <WireShape position={[0, -6, -20]} geometry="octahedron" speed={0.25} scale={2.5} />
        </group>
    );
}
