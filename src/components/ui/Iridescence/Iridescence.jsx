import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

import "../../../styles/ui/Iridescence/Iridenscence.css";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - 0.5) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;

  for (float i = 0.0; i < 8.0; i++) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }

  d += uTime * 0.5 * uSpeed;

  vec3 col = vec3(
    cos(uv * vec2(d, a)) * 0.6 + 0.4,
    cos(a + d) * 0.5 + 0.5
  );

  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1,
  amplitude = 0.1,
  mouseReact = true,
  className = "",
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const programRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef([0.5, 0.5]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Renderer (se crea solo una vez)
    if (!rendererRef.current) {
      rendererRef.current = new Renderer({ dpr: Math.min(2, window.devicePixelRatio) });
    }

    const renderer = rendererRef.current;
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    // --- Geometry
    const geometry = new Triangle(gl);

    // --- Program
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: { value: new Color(1, 1, 1) },
        uMouse: { value: mouseRef.current },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    });

    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    // --- Resize
    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = container;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value.set(w, h, w / h);
    };

    resize();
    window.addEventListener("resize", resize);

    // --- Mouse
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current[0] = (e.clientX - rect.left) / rect.width;
      mouseRef.current[1] = 1 - (e.clientY - rect.top) / rect.height;
    };

    if (mouseReact) {
      container.addEventListener("mousemove", onMouseMove);
    }

    // --- Animation loop
    const update = (t) => {
      rafRef.current = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };

    rafRef.current = requestAnimationFrame(update);

    // --- Mount canvas
    if (!container.contains(gl.canvas)) {
      container.appendChild(gl.canvas);
    }

    // --- Cleanup (STRICTMODE SAFE)
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);

      if (mouseReact) {
        container.removeEventListener("mousemove", onMouseMove);
      }

      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Actualizar uniforms sin recrear WebGL
  useEffect(() => {
    if (!programRef.current) return;
    programRef.current.uniforms.uColor.value.set(...color);
    programRef.current.uniforms.uAmplitude.value = amplitude;
    programRef.current.uniforms.uSpeed.value = speed;
  }, [color, amplitude, speed]);

  return (
    <div
      ref={containerRef}
      className={`iridescence-container ${className}`}
    />
  );
}