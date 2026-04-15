"use client";

import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import FloatingGeometry from "./FloatingGeometry";

export default function Scene() {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 55 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <ParticleField count={250} />
            </Canvas>
        </div>
    );
}
