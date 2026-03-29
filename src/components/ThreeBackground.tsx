/* eslint-disable prefer-const */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const scrollObjects = useRef<{
    columns: THREE.Group[];
    floors: THREE.Group[];
    building2Group: THREE.Group;
    towerCraneGroup: THREE.Group;
    trolley?: THREE.Group;
    hookGroup?: THREE.Group;
    roof?: THREE.Group;
  }>({
    columns: [],
    floors: [],
    building2Group: new THREE.Group(),
    towerCraneGroup: new THREE.Group(),
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      500 // increased far plane for bigger scene
    );
    camera.position.set(45, 28, 70); // moved camera farther back

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    // Lights – kept strong for visibility
    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 3.8);
    dirLight.position.set(40, 60, 50);
    scene.add(dirLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 2.6);
    backLight.position.set(-40, 40, -50);
    scene.add(backLight);

    // ── Helpers ──
    function createSketchBox(
      w: number,
      h: number,
      d: number,
      color: number,
      pos: [number, number, number],
      rot: [number, number, number] = [0, 0, 0]
    ) {
      const group = new THREE.Group();
      const fillMat = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        emissive: 0x000000,
        shininess: 20,
      });
      const fillGeo = new THREE.BoxGeometry(w, h, d);
      const fillMesh = new THREE.Mesh(fillGeo, fillMat);
      group.add(fillMesh);

      const edges = new THREE.EdgesGeometry(fillGeo);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
      group.add(line);

      group.position.set(...pos);
      group.rotation.set(...rot);
      return group;
    }

    function createSketchCylinder(
      radiusTop: number,
      radiusBottom: number,
      height: number,
      color: number,
      pos: [number, number, number],
      rot: [number, number, number] = [0, 0, 0]
    ) {
      const group = new THREE.Group();
      const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 12);
      const fillMat = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });
      const fillMesh = new THREE.Mesh(geo, fillMat);
      group.add(fillMesh);

      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
      group.add(line);

      group.position.set(...pos);
      group.rotation.set(...rot);
      return group;
    }

    // ── MAIN BUILDING ── (significantly bigger)
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Bigger foundation pit
    const pitMark = new THREE.RingGeometry(14, 15, 64);
    const pitMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
    const pitRing = new THREE.Mesh(pitMark, pitMat);
    pitRing.rotation.x = -Math.PI / 2;
    pitRing.position.y = 0.02;
    buildingGroup.add(pitRing);

    // Thicker foundation
    buildingGroup.add(createSketchBox(28, 2, 24, 0x6366f1, [0, 1, 0]));

    // More & bigger columns
    const columns: THREE.Group[] = [];
    const colPositions = [
      [-10, 0, -9], [10, 0, -9], [-10, 0, 9], [10, 0, 9],
      [-10, 0, 0], [10, 0, 0], [0, 0, -9], [0, 0, 9],
      [-5, 0, -9], [5, 0, -9], [-5, 0, 9], [5, 0, 9],
      [-7, 0, -5], [7, 0, -5], [-7, 0, 5], [7, 0, 5],
    ];
    colPositions.forEach((pos) => {
      const col = createSketchBox(1.6, 1.6, 1.6, 0x8b5cf6, [pos[0], 1, pos[2]]);
      col.userData.targetScaleY = 48; // much taller
      col.scale.y = 0.001;
      buildingGroup.add(col);
      columns.push(col);
    });
    scrollObjects.current.columns = columns;

    // More floors, taller building
    const floors: THREE.Group[] = [];
    const floorCount = 14; // increased from 9
    const floorHeight = 4.2; // taller floors
    for (let i = 1; i <= floorCount; i++) {
      const yPos = i * floorHeight;
      const slab = createSketchBox(25, 0.4, 22, 0x3b82f6, [0, yPos, 0]);
      slab.userData.targetY = yPos;
      slab.userData.startY = -8;
      slab.position.y = slab.userData.startY;
      buildingGroup.add(slab);
      floors.push(slab);
    }
    scrollObjects.current.floors = floors;

    // Bigger roof
    buildingGroup.add(createSketchBox(26, 1.2, 23, 0x6366f1, [0, floorCount * floorHeight + 0.6, 0]));

    // Core (bigger)
    for (let i = 1; i < floorCount; i++) {
      const yPos = i * floorHeight + 2;
      const coreBox = createSketchBox(4.5, 4, 4.5, 0x8b5cf6, [0, yPos, 0]);
      buildingGroup.add(coreBox);
    }

    // Glass facades – scaled up
    const glassFillMat = new THREE.MeshPhongMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
    const glassEdgeMat = new THREE.LineBasicMaterial({ color: 0x6366f1 });
    for (let i = 1; i <= floorCount; i++) {
      const yMid = i * floorHeight - 2;
      const frontGeo = new THREE.BoxGeometry(24, 3.8, 0.4);
      const frontFill = new THREE.Mesh(frontGeo, glassFillMat);
      frontFill.position.set(0, yMid, 12);
      buildingGroup.add(frontFill);
      const frontEdges = new THREE.LineSegments(new THREE.EdgesGeometry(frontGeo), glassEdgeMat);
      frontEdges.position.copy(frontFill.position);
      buildingGroup.add(frontEdges);

      const backFill = new THREE.Mesh(frontGeo, glassFillMat);
      backFill.position.set(0, yMid, -12);
      buildingGroup.add(backFill);
      const backEdges = new THREE.LineSegments(new THREE.EdgesGeometry(frontGeo), glassEdgeMat);
      backEdges.position.copy(backFill.position);
      buildingGroup.add(backEdges);
    }

    // ── Secondary Building ── (also bigger)
    const building2Group = new THREE.Group();
    scene.add(building2Group);
    scrollObjects.current.building2Group = building2Group;

    building2Group.add(createSketchBox(18, 1.8, 15, 0x6366f1, [28, 0.9, 22]));

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const col = createSketchBox(1.4, 1.4, 1.4, 0x8b5cf6, [23 + i * 8, 0.9, 18 + j * 8]);
        col.userData.targetScaleY = 24;
        col.scale.y = 0.001;
        building2Group.add(col);
      }
    }

    for (let f = 1; f <= 8; f++) {
      const y = f * 4.0;
      const slab = createSketchBox(17, 0.4, 14, 0x3b82f6, [28, y, 22]);
      slab.userData.targetY = y;
      slab.userData.startY = -6;
      slab.position.y = slab.userData.startY;
      building2Group.add(slab);
    }

    building2Group.add(createSketchBox(18.8, 1, 15.8, 0x6366f1, [28, 33, 22]));

    // ── Tower Crane ── (much bigger)
    const towerCraneGroup = new THREE.Group();
    scene.add(towerCraneGroup);
    scrollObjects.current.towerCraneGroup = towerCraneGroup;

    towerCraneGroup.add(createSketchBox(5, 2, 5, 0x8b5cf6, [-28, 1, -12]));
    for (let i = 0; i < 20; i++) {
      towerCraneGroup.add(createSketchBox(3.2, 3.2, 3.2, 0x6366f1, [-28, 2.5 + i * 3.5, -12]));
    }
    towerCraneGroup.add(createSketchBox(4, 2, 4, 0x3b82f6, [-28, 55, -12]));
    towerCraneGroup.add(createSketchBox(45, 0.8, 3, 0x6366f1, [-8, 58, -12]));
    towerCraneGroup.add(createSketchBox(12, 0.8, 3, 0x3b82f6, [-36, 58, -12]));
    towerCraneGroup.add(createSketchBox(5, 3, 4, 0x8b5cf6, [-32, 58, -12]));

    const trolley = createSketchBox(2.5, 2, 3, 0x3b82f6, [-16, 58, -12]);
    towerCraneGroup.add(trolley);
    scrollObjects.current.trolley = trolley;

    const hookGroup = new THREE.Group();
    hookGroup.position.set(-16, 50, -12);
    const hookBlock = createSketchBox(2, 1.5, 2, 0x3b82f6, [0, 0, 0]);
    hookGroup.add(hookBlock);
    const cable = createSketchCylinder(0.25, 0.25, 10, 0x6366f1, [0, -5, 0]);
    hookGroup.add(cable);
    towerCraneGroup.add(hookGroup);
    scrollObjects.current.hookGroup = hookGroup;

    // ── Scroll logic ── (adjusted phases for bigger building)
    const easeOutQuad = (t: number) => t * (2 - t);
    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      let p = Math.min(scrollY / maxScroll, 1);

      const { columns, floors, building2Group, trolley, hookGroup } = scrollObjects.current;

      // Columns – slower start for drama
      const colPhase = Math.min(p / 0.30, 1);
      const colScale = easeOutQuad(colPhase) * 48;
      columns.forEach((col) => {
        col.scale.y = Math.max(colScale, 0.001);
        col.position.y = 1 + (colScale * 1) / 2;
      });

      // Floors – adjusted timing for more floors
      floors.forEach((slab) => {
        const start = 0.25;
        const dur = 0.40;
        const t = Math.max(0, Math.min(1, (p - start) / dur));
        const eased = easeInOut(t);
        slab.position.y = slab.userData.startY + (slab.userData.targetY - slab.userData.startY) * eased;
      });

      // Building 2
      const b2Phase = Math.max(0, Math.min(1, (p - 0.45) / 0.35));
      building2Group.children.forEach((child) => {
        if (child.userData.targetScaleY) {
          child.scale.y = Math.max(easeOutQuad(b2Phase) * 24, 0.001);
          child.position.y = 0.9 + (child.scale.y * 1) / 2;
        } else if (child.userData.targetY) {
          child.position.y =
            child.userData.startY +
            (child.userData.targetY - child.userData.startY) * easeInOut(b2Phase);
        }
      });

      // Crane – longer travel distance
      const cranePhase = Math.max(0, Math.min(1, (p - 0.60) / 0.35));
      if (trolley) trolley.position.x = -28 + (-16 + cranePhase * 32);
      if (hookGroup) {
        hookGroup.position.x = -28 + (-16 + cranePhase * 32);
        hookGroup.position.y = 50 + Math.sin(Date.now() * 0.005) * 0.8;
      }

      // Camera – wider orbit for bigger scene
      const angle = p * Math.PI * 1.5;
      const radius = 80 - p * 30;
      const height = 25 + p * 15;
      camera.position.x = Math.sin(angle) * radius + 10;
      camera.position.z = Math.cos(angle) * radius + 25;
      camera.position.y = height;
      camera.lookAt(10, 20, 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      if (scrollObjects.current.hookGroup) {
        scrollObjects.current.hookGroup.position.x += Math.sin(time * 3) * 0.03;
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-2] opacity-[0.45] md:opacity-[0.58]"
      style={{
        filter: "brightness(0.95) saturate(1.25) contrast(1.15) hue-rotate(355deg)",
        mixBlendMode: "screen",
      }}
    />
  );
}