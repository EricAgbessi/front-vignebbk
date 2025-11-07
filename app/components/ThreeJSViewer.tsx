import { useEffect, useRef } from "react";
import { FaArrowsAlt } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import { FBXLoader, GLTFLoader, OBJLoader, OrbitControls } from "three-stdlib";
import * as THREE from "three";

// Composant Three.js Viewer
interface ThreeJSViewerProps {
  modelUrl: string;
  modelType?: "gltf" | "glb" | "obj" | "fbx";
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const ThreeJSViewer: React.FC<ThreeJSViewerProps> = ({
  modelUrl,
  modelType = "gltf",
  onLoad,
  onError,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const initThreeJS = async () => {
      try {
        // Import de Three.js et des composants standards
        const THREE = await import("three");

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
          75,
          mountRef.current!.clientWidth / mountRef.current!.clientHeight,
          0.1,
          1000
        );
        camera.position.set(3, 3, 3);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setSize(
          mountRef.current!.clientWidth,
          mountRef.current!.clientHeight
        );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        mountRef.current!.innerHTML = "";
        mountRef.current!.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.target.set(0, 0, 0);

        // Lighting améliorée
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 3);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        scene.add(directionalLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 3, -2);
        scene.add(fillLight);

        // Load Model
        const loadModel = () => {
          let loader: GLTFLoader | OBJLoader | FBXLoader;

          switch (modelType) {
            case "gltf":
            case "glb":
              loader = new GLTFLoader();
              break;
            case "obj":
              loader = new OBJLoader();
              break;
            case "fbx":
              loader = new FBXLoader();
              break;
            default:
              loader = new GLTFLoader();
          }

          loader.load(
            modelUrl,
            (object: any) => {
              // Déterminer l'objet principal à partir du format
              let model: THREE.Object3D;
              if (modelType === "gltf" || modelType === "glb") {
                model = object.scene;
              } else {
                model = object;
              }

              // --- Logique de Centrage et Mise à l'Échelle Améliorée ---

              // 1. Calculer la Bounding Box du modèle non transformé
              const box = new THREE.Box3().setFromObject(model);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());

              // 2. Créer un conteneur qui sera ajouté à la scène
              const container = new THREE.Group();

              // 3. Centrer le modèle lui-même en le déplaçant par rapport à son propre centre
              // Cela positionne le centre de la Bounding Box du modèle à l'origine (0, 0, 0)
              model.position.sub(center);

              // 4. Ajouter le modèle centré au conteneur
              container.add(model);

              // 5. Mise à l'Échelle (Scaling)
              const TARGET_SIZE = 2.5; // Définir la taille cible dans l'espace Three.js
              const maxDim = Math.max(size.x, size.y, size.z);
              const scaleFactor = maxDim > 0 ? TARGET_SIZE / maxDim : 1;

              // Appliquer la mise à l'échelle au conteneur
              container.scale.setScalar(scaleFactor);

              // 6. Ajouter le conteneur à la scène
              scene.add(container);
              controls.target.set(0, 0, 0);

              const distance = TARGET_SIZE * 1.5;
              camera.position.set(distance, distance, distance);

              controls.update();

              onLoad?.();
            },
            (progress: ProgressEvent) => {
              // Progression du chargement
              if (progress.lengthComputable) {
                const percentComplete =
                  (progress.loaded / progress.total) * 100;
                console.log(`Loading: ${percentComplete.toFixed(2)}%`);
              }
            },
            (error: ErrorEvent) => {
              console.error("Error loading 3D model:", error);
              onError?.(new Error(error.message));
            }
          );
        };

        loadModel();

        // Animation Loop
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
          if (!camera || !renderer || !mountRef.current) return;

          camera.aspect =
            mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(
            mountRef.current.clientWidth,
            mountRef.current.clientHeight
          );
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
          window.removeEventListener("resize", handleResize);
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
          if (renderer) {
            renderer.dispose();
          }
          if (controls) {
            controls.dispose();
          }
          // Clean scene
          while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
          }
        };
      } catch (error) {
        console.error("Error initializing Three.js:", error);
        onError?.(error as Error);
      }
    };

    initThreeJS();
  }, [modelUrl, modelType, onLoad, onError]);

  return <div ref={mountRef} className="w-full h-full" />;
};

// Fallback component
export const SimpleModelViewer: React.FC<{ modelUrl: string }> = ({
  modelUrl,
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg">
      <div className="text-center text-white p-6">
        <div className="text-6xl mb-4">🍷</div>
        <p className="text-xl font-semibold mb-2">Vue 3D Interactive</p>
        <p className="text-sm text-zinc-300 mb-4 max-w-md">
          Explorez ce vin en réalité virtuelle. Tournez, zoomez et découvrez
          chaque détail.
        </p>
        <div className="flex justify-center space-x-4 text-xs text-zinc-400 mb-4">
          <div className="flex items-center">
            <FaRotate className="mr-1" />
            <span>Clic + Glisser</span>
          </div>
          <div className="flex items-center">
            <FaArrowsAlt className="mr-1" />
            <span>Molette Zoom</span>
          </div>
        </div>
        <a
          href={modelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-[#810b15] text-white rounded-lg hover:bg-[#6a0912] transition-colors font-semibold"
        >
          Voir le modèle 3D
        </a>
      </div>
    </div>
  );
};
