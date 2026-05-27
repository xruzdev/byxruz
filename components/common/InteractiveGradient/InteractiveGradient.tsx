"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fluidShader, displayShader } from "./shaders.js";

type InteractiveGradientProps = {
  brushSize?: number;
  brushStrength?: number;
  distortionAmount?: number;
  fluidDecay?: number;
  trailLength?: number;
  stopDecay?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  colorIntensity?: number;
  softness?: number;
};

const InteractiveGradient = ({
  brushSize = 25.0,
  brushStrength = 0.5,
  distortionAmount = 2.5,
  fluidDecay = 0.98,
  trailLength = 0.8,
  stopDecay = 0.85,
  color1 = "#ff5f1a",
  color2 = "#080808",
  color3 = "#080808",
  color4 = "#161616",
  colorIntensity = 1.0,
  softness = 1.0,
}: InteractiveGradientProps) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const MAX_DPR = 1.5;
    const FLUID_SCALE = 0.6;

    while (canvas.firstChild) {
      canvas.removeChild(canvas.firstChild);
    }

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
      alpha: true,
    });
    rendererRef.current = renderer;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));

    let canvasWidth = 1;
    let canvasHeight = 1;
    let fluidWidth = 1;
    let fluidHeight = 1;

    const getCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      return {
        width: Math.max(1, Math.round(rect.width || window.innerWidth)),
        height: Math.max(1, Math.round(rect.height || window.innerHeight)),
      };
    };

    const syncSizes = () => {
      const { width, height } = getCanvasSize();
      canvasWidth = width;
      canvasHeight = height;
      fluidWidth = Math.max(1, Math.round(width * FLUID_SCALE));
      fluidHeight = Math.max(1, Math.round(height * FLUID_SCALE));

      renderer.setSize(canvasWidth, canvasHeight, false);
      fluidMaterial.uniforms.iResolution.value.set(fluidWidth, fluidHeight);
      displayMaterial.uniforms.iResolution.value.set(canvasWidth, canvasHeight);

      fluidTarget1.setSize(fluidWidth, fluidHeight);
      fluidTarget2.setSize(fluidWidth, fluidHeight);
      frameCount = 0;
    };

    canvas.appendChild(renderer.domElement);

    const targetType = renderer.capabilities.isWebGL2
      ? THREE.HalfFloatType
      : THREE.FloatType;

    const fluidTarget1 = new THREE.WebGLRenderTarget(
      1,
      1,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: targetType,
        depthBuffer: false,
        stencilBuffer: false,
      }
    );

    const fluidTarget2 = new THREE.WebGLRenderTarget(
      1,
      1,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: targetType,
        depthBuffer: false,
        stencilBuffer: false,
      }
    );

    let currentFluidTarget = fluidTarget1;
    let previousFluidTarget = fluidTarget2;
    let frameCount = 0;

    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(1, 1) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: brushSize },
        uBrushStrength: { value: brushStrength },
        uFluidDecay: { value: fluidDecay },
        uTrailLength: { value: trailLength },
        uStopDecay: { value: stopDecay },
      },
      vertexShader: vertexShader,
      fragmentShader: fluidShader,
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(1, 1) },
        iFluid: { value: null },
        uDistortionAmount: { value: distortionAmount },
        uColor1: { value: new THREE.Vector3(...hexToRgb(color1)) },
        uColor2: { value: new THREE.Vector3(...hexToRgb(color2)) },
        uColor3: { value: new THREE.Vector3(...hexToRgb(color3)) },
        uColor4: { value: new THREE.Vector3(...hexToRgb(color4)) },
        uColorIntensity: { value: colorIntensity },
        uSoftness: { value: softness },
      },
      vertexShader: vertexShader,
      fragmentShader: displayShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
    const displayPlane = new THREE.Mesh(geometry, displayMaterial);

    let mouseX = 0,
      mouseY = 0;
    let prevMouseX = 0,
      prevMouseY = 0;
    let lastMoveTime = 0;
    let rect = canvas.getBoundingClientRect();

    const handlePointerMove = (e: PointerEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      const relativeX = e.clientX - rect.left;
      const relativeY = rect.height - (e.clientY - rect.top);

      mouseX = relativeX * FLUID_SCALE;
      mouseY = relativeY * FLUID_SCALE;
      lastMoveTime = performance.now();
      fluidMaterial.uniforms.iMouse.value.set(
        mouseX,
        mouseY,
        prevMouseX,
        prevMouseY
      );
    };

    const handlePointerLeave = () => {
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    };

    const handleResize = () => {
      rect = canvas.getBoundingClientRect();
      syncSizes();
    };

    syncSizes();

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      const now = performance.now();
      const time = now * 0.001;
      fluidMaterial.uniforms.iTime.value = time;
      displayMaterial.uniforms.iTime.value = time;
      fluidMaterial.uniforms.iFrame.value = frameCount;

      if (now - lastMoveTime > 100) {
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
      }

      fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
      renderer.setRenderTarget(currentFluidTarget);
      renderer.render(fluidPlane, camera);

      displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayPlane, camera);

      const temp = currentFluidTarget;
      currentFluidTarget = previousFluidTarget;
      previousFluidTarget = temp;

      frameCount++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);

      if (renderer.domElement && canvas.contains(renderer.domElement)) {
        canvas.removeChild(renderer.domElement);
      }

      fluidTarget1.dispose();
      fluidTarget2.dispose();
      fluidMaterial.dispose();
      displayMaterial.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, [
    brushSize,
    brushStrength,
    distortionAmount,
    fluidDecay,
    trailLength,
    stopDecay,
    color1,
    color2,
    color3,
    color4,
    colorIntensity,
    softness,
  ]);

  return <div ref={canvasRef} className="gradient-canvas brightness-75 absolute top-0 left-0 w-full h-full z-0 overflow-x-hidden touch-none" />;
};

export default InteractiveGradient;
