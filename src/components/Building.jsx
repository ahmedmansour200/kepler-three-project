import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Building = ({ position }) => {
  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Building (Two-Floor Structure)
    const floorHeight = 5;
    const buildingGeometry = new THREE.BoxGeometry(6, floorHeight * 2, 6); 
    const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc99 });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = floorHeight;
    scene.add(building);

    // Roof
    const roofGeometry = new THREE.PlaneGeometry(6, 6);
    const roofMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.x = -Math.PI / 2;
    roof.position.set(0, floorHeight * 2.5, 0);
    scene.add(roof);

    // Door (First floor entrance)
    const exteriorDoorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const exteriorDoorMaterial = new THREE.MeshBasicMaterial({ color: 0x654321 });
    const exteriorDoor = new THREE.Mesh(exteriorDoorGeometry, exteriorDoorMaterial);
    exteriorDoor.position.set(0, floorHeight - 4, 3.1);

    // Add Door Handle
    const handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
    const handleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const doorHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    doorHandle.rotation.z = Math.PI / 2;
    doorHandle.position.set(0.4, 0.10, 0.05);

    // Add handle as child of the door
    exteriorDoor.add(doorHandle);
    scene.add(exteriorDoor);

    // Interior Wall separating first and second floor
    const interiorWallGeometry = new THREE.BoxGeometry(6, 0.1, 6);
    const interiorWallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const interiorWall = new THREE.Mesh(interiorWallGeometry, interiorWallMaterial);
    interiorWall.position.set(0, floorHeight, 0);
    scene.add(interiorWall);

    // Camera Controls (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(10, 5, 20);
    controls.update();

    // Function to check proximity to doors
    const checkProximityToDoors = () => {
      const distanceToExteriorDoor = camera.position.distanceTo(exteriorDoor.position);

      // Exterior Door (Entrance)
      if (distanceToExteriorDoor < 8) {
        exteriorDoor.rotation.y = Math.PI / 2;
      } else {
        exteriorDoor.rotation.y = 0;
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      checkProximityToDoors();
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, [position]);

  return (
    <div
      id="building-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};

export default Building;
