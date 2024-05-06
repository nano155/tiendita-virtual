import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleVertex = `
  attribute float scale;
  uniform float uTime;

  void main() {
    vec3 p = position;
    float s = scale;

    p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    p.x += (sin(p.y + uTime) * 0.5);
    s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const ParticleFragment = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
  }
`;

const Canvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particleMaterialRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const aspectRatio = winWidth / winHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 1000);
    camera.position.set(0, 6, 5);
    cameraRef.current = camera;

    // Scene
    const scene = new THREE.Scene();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(winWidth, winHeight);
    renderer.setClearColor(0x000000); // Establece el color de fondo en negro
    rendererRef.current = renderer;

    // Particles
    const gap = 0.3;
    const amountX = 200;
    const amountY = 200;
    const particleNum = amountX * amountY;
    const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);
    let i = 0;
    let j = 0;

    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        particlePositions[i] = ix * gap - ((amountX * gap) / 2);
        particlePositions[i + 1] = 0;
        particlePositions[i + 2] = iy * gap - ((amountX * gap) / 2);
        particleScales[j] = 1;
        i += 3;
        j++;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: ParticleVertex,
      fragmentShader: ParticleFragment,
      uniforms: {
        uTime: { type: 'f', value: 0 },
      },
    });
    particleMaterialRef.current = particleMaterial;

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      timeRef.current += 0.005;
      particleMaterialRef.current.uniforms.uTime.value = timeRef.current;
      cameraRef.current.lookAt(scene.position);
      rendererRef.current.render(scene, cameraRef.current);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

};

export default Canvas;
