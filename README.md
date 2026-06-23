'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere({ position, color, speed = 1, distort = 0.4, scale = 1 }: {
  position: [number, number, number]
  color: string
  speed?: number
  distort?: number
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.1}
          roughness={0.1}
          distort={distort}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 400
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7c3aed"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function CameraRig() {
  const { camera, mouse } = useThree()
  const target = useRef(new THREE.Vector3())

  useFrame(() => {
    target.current.x = mouse.x * 0.3
    target.current.y = mouse.y * 0.2
    camera.position.x += (target.current.x - camera.position.x) * 0.05
    camera.position.y += (target.current.y - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return null
}

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[2.5, -0.5, -2]} scale={0.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.8}
          roughness={0.1}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
          wireframe={false}
        />
      </mesh>
    </Float>
  )
}

function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15
  })

  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={[-3, 1, -1]} scale={0.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#d946ef"
          metalness={0.6}
          roughness={0.2}
          emissive="#d946ef"
          emissiveIntensity={0.15}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#7c3aed" />
        <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#d946ef" />

        <CameraRig />
        <ParticleField />

        <FloatingSphere position={[-1.5, 0.5, 0]} color="#7c3aed" speed={1} distort={0.5} scale={1.4} />
        <FloatingSphere position={[1.8, -0.8, -1]} color="#06b6d4" speed={0.8} distort={0.3} scale={0.8} />
        <FloatingSphere position={[0.2, 1.8, -2]} color="#d946ef" speed={1.3} distort={0.6} scale={0.6} />

        <TorusKnot />
        <IcosahedronMesh />

        <Sparkles
          count={80}
          scale={[12, 12, 8]}
          size={1.5}
          speed={0.3}
          color="#7c3aed"
          opacity={0.6}
        />
        <Sparkles
          count={40}
          scale={[10, 10, 6]}
          size={1}
          speed={0.2}
          color="#06b6d4"
          opacity={0.4}
        />

        <fog attach="fog" args={['#030305', 10, 25]} />
      </Canvas>
    </div>
  )
}
