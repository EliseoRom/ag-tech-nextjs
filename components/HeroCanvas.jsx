"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas({ accent, variant }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isLite =
      reducedMotion ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;
    const starCount = isLite ? 420 : 1800;
    const flareCount = isLite ? 6 : 14;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isLite,
      alpha: true,
      powerPreference: isLite ? "low-power" : "default",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLite ? 1 : 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const color = new THREE.Color(accent || "#38BDF8");
    const colorWhite = new THREE.Color("#ffffff");

    const group = new THREE.Group();
    scene.add(group);

    const applyMobileScale = () => {
      const mobile = window.innerWidth < 768;
      const s = mobile ? 0.58 : 1;
      group.scale.set(s, s, s);
      camera.position.z = mobile ? 7.2 : 6;
    };
    applyMobileScale();

    // Far star field
    let starField;
    {
      const count = starCount;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 28;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
        positions[i * 3 + 2] = -6 - Math.random() * 14;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const m = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.018,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });
      starField = new THREE.Points(g, m);
      scene.add(starField);
    }

    // Glowing flares (slow drift)
    let flares;
    {
      const activeFlareCount = flareCount;
      const positions = new Float32Array(activeFlareCount * 3);
      const speeds = [];
      const phases = [];
      const radii = [];
      for (let i = 0; i < activeFlareCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = -3 - Math.random() * 8;
        speeds.push(0.015 + Math.random() * 0.04);
        phases.push(Math.random() * Math.PI * 2);
        radii.push(0.4 + Math.random() * 1.2);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 128;
      const cctx = canvas.getContext("2d");
      const grad = cctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.2, "rgba(255,255,255,0.65)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.18)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      cctx.fillStyle = grad;
      cctx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(canvas);

      const m = new THREE.PointsMaterial({
        map: tex,
        color: 0xffffff,
        size: 0.55,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      flares = new THREE.Points(g, m);
      flares.userData = { speeds, phases, radii, base: positions.slice() };
      scene.add(flares);
    }

    let particleSystem, mainMesh, ring, innerMesh;

    if (variant === "particles") {
      const count = isLite ? 700 : 2400;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 1.6 + Math.random() * 1.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const m = new THREE.PointsMaterial({
        color,
        size: 0.018,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      particleSystem = new THREE.Points(g, m);
      group.add(particleSystem);
    } else {
      const geo = new THREE.IcosahedronGeometry(
        1.6,
        variant === "detailed" ? 4 : 2
      );
      const wf = new THREE.WireframeGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.65,
      });
      mainMesh = new THREE.LineSegments(wf, lineMat);
      group.add(mainMesh);

      const innerGeo = new THREE.IcosahedronGeometry(1.1, 1);
      const innerMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.04,
      });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const ringGeo = new THREE.TorusGeometry(2.4, 0.005, 8, 200);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorWhite,
        transparent: true,
        opacity: 0.18,
      });
      ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.6;
      group.add(ring);

      const dustCount = 600;
      const dpos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        const r = 2.6 + Math.random() * 2;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        dpos[i * 3] = r * Math.sin(p) * Math.cos(t);
        dpos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        dpos[i * 3 + 2] = r * Math.cos(p);
      }
      const dg = new THREE.BufferGeometry();
      dg.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
      const dm = new THREE.PointsMaterial({
        color: colorWhite,
        size: 0.01,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      particleSystem = new THREE.Points(dg, dm);
      group.add(particleSystem);
    }

    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!isLite) window.addEventListener("mousemove", onMove);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      applyMobileScale();
    };
    window.addEventListener("resize", onResize);

    let raf;
    let running = false;
    let inView = true;
    let lastFrame = 0;
    const minFrameMs = isLite ? 33 : 0;
    const clock = new THREE.Clock();
    const draw = (t) => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;

      group.rotation.y = t * 0.07 + cx * 0.6;
      group.rotation.x = -cy * 0.4 + Math.sin(t * 0.2) * 0.05;
      group.position.y = scrollY * -0.0015;

      if (starField) {
        starField.rotation.y = t * 0.008 + cx * 0.05;
        starField.rotation.x = -cy * 0.04;
      }
      if (flares) {
        const pos = flares.geometry.attributes.position;
        const { speeds, phases, radii, base } = flares.userData;
        for (let i = 0; i < pos.count; i++) {
          const p = phases[i];
          const s = speeds[i];
          const r = radii[i];
          pos.array[i * 3] = base[i * 3] + Math.sin(t * s + p) * r;
          pos.array[i * 3 + 1] =
            base[i * 3 + 1] + Math.cos(t * s * 0.7 + p) * r * 0.6;
          pos.array[i * 3 + 2] =
            base[i * 3 + 2] + Math.sin(t * s * 0.4 + p) * 0.3;
        }
        pos.needsUpdate = true;
        flares.material.opacity = 0.7 + Math.sin(t * 0.4) * 0.15;
      }

      if (mainMesh) {
        mainMesh.rotation.x += 0.0015;
        mainMesh.rotation.y += 0.002;
      }
      if (innerMesh) {
        innerMesh.rotation.x -= 0.001;
        innerMesh.rotation.y -= 0.0015;
        const s = 1 + Math.sin(t * 0.8) * 0.04;
        innerMesh.scale.set(s, s, s);
      }
      if (ring) {
        ring.rotation.z += 0.001;
      }
      if (particleSystem) {
        particleSystem.rotation.y += 0.0008;
      }

      renderer.render(scene, camera);
    };
    const animate = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(animate);
      if (minFrameMs && now - lastFrame < minFrameMs) return;
      lastFrame = now;
      draw(clock.getElapsedTime());
    };
    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (inView && !document.hidden && !reducedMotion) start();
      else stop();
    };

    let io;
    if (reducedMotion) {
      draw(0);
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          sync();
        },
        { threshold: 0.08 }
      );
      io.observe(mount);
      document.addEventListener("visibilitychange", sync);
      sync();
    }

    return () => {
      stop();
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (!isLite) window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material))
            o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
    };
  }, [accent, variant]);

  return <div ref={mountRef} className="hero-canvas"></div>;
}
