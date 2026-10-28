import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'

function Shape() {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const targetX = state.pointer.y * 0.6 + window.scrollY * 0.002
    const targetY = state.pointer.x * 0.8
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 3)
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 3) + delta * 0.15
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#5b7cff" wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#ffb020" />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ antialias: true }}>
      <Shape />
    </Canvas>
  )
}
