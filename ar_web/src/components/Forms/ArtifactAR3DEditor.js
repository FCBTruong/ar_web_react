import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useAnimations, useFBX } from "@react-three/drei";
import {
  Grid,
  useGLTF,
  Stage,
  PresentationControls,
  Environment,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import utilities from "utilities/utilities";
import Card from "reactstrap/lib/Card";
import ArtifactProperties from "./ArtifactProperties";
import { Row, Col } from "reactstrap/lib/";
import { useFrame } from "@react-three/fiber";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { HashLoader } from "react-spinners";
import * as THREE from "three";

import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Box from "@mui/material/Box";
import { useThree } from "react-three-fiber";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

var scaleInit = 0;
var lastModelUrl = "";
function Model(props) {
  console.log("props...", props);

  var urlAsset =
    props.artifact.modelAr.modelAsset && props.artifact.modelAr.modelAsset.url
      ? props.artifact.modelAr.modelAsset.url
      : require("assets/models/cardboard_cartoon.glb");

  var fileExtension = utilities.getFileExtension(urlAsset);
  console.log("file extension3d ", fileExtension);

  const gltf = useLoader(GLTFLoader, urlAsset);
  gltf.scene = gltf.scene.clone(true);
  const mixer = useRef();

  var box = new THREE.Box3().setFromObject(gltf.scene);
  var size = new THREE.Vector3();
  box.getSize(size);

  var maxDimension = Math.max(size.x, size.y, size.z);
  var scale = 6.0 / maxDimension;
  if (scaleInit === 0 || lastModelUrl !== urlAsset) {
    scaleInit = scale;
  }

  lastModelUrl = urlAsset;

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  useEffect(() => {
    mixer.current = null;
    if (gltf.animations.length === 0) return;
    console.log("gltf.animations", gltf.animations);
    mixer.current = new AnimationMixer(gltf.scene);
    const action = mixer.current.clipAction(gltf.animations[0]);
    action.play();
  }, [gltf.animations, gltf.scene, mixer]);

  return (
    <>
      <primitive
        object={gltf.scene}
        dispose={null}
        scale={[scaleInit, scaleInit, scaleInit]}
        rotation={[
          props.artifact.modelAr.rotation.x,
          props.artifact.modelAr.rotation.y,
          props.artifact.modelAr.rotation.z,
        ]}
        position={[
          props.artifact.modelAr.position.x,
          props.artifact.modelAr.position.y,
          props.artifact.modelAr.position.z,
        ]}
      />
    </>
  );
}

function EmptyBox() {
  const ref = useRef();
  return (
    <mesh scale={[1, 1, 1]} rotation={[10, 0, 0]} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function ArtifactAR3DEditor(props) {
  console.log("props-----------");
  const [zoomValue, setZoomValue] = useState(50.0);
  const [camera, setCamera] = useState();
  const handleZoom = (event, newValue) => {
    setZoomValue(newValue);
  };

  useEffect(() => {
    if (camera) {
      camera.fov = 25 + ((- zoomValue + 50) / 50) * 20;
      camera.lookAt(new THREE.Vector3());
      camera.updateProjectionMatrix();
    }
  }, [camera, zoomValue]);

  function onReset() {
    setZoomValue(50);
    scaleInit = 0;
    lastModelUrl = "";
  }

  return (
    <div>
      <Row>
        <Col xs="8">
          <Card
            className="shadow border-0 "
            style={{ height: 600, width: "100%" }}
          >
            {
              <Suspense
                fallback={
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "45%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <HashLoader color="#36d7b7" />
                  </div>
                }
              >
                <Canvas
                  shadows
                  camera={{
                    position: [10, 12, 12],
                    fov: 25,
                  }}
                  onCreated={({ camera }) => setCamera(camera)}
                >
                  <PresentationControls speed={1.0} global zoom={1}>
                    {props.artifact.modelAr &&
                    props.artifact.modelAr.modelAsset ? (
                      <Model artifact={props.artifact} />
                    ) : (
                      <EmptyBox />
                    )}
                  </PresentationControls>
                  <Grid position={[0, -10, 0]} args={[100, 100]} />
                  <Environment preset="city" />
                  <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport
                      axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
                      labelColor="white"
                    />
                  </GizmoHelper>
                </Canvas>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 250,
                    }}
                  >
                    <Stack
                      spacing={0}
                      direction="row"
                      sx={{ mb: 0 }}
                      alignItems="center"
                    >
                      <Tooltip title="Reset" arrow>
                        <IconButton
                          onClick={onReset}
                          size="small"
                          style={{
                            border: "none",
                            outline: "none",
                          }}
                        >
                          <RestartAltIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Zoom out" arrow>
                        <RemoveCircleOutlineIcon />
                      </Tooltip>
                      <Slider
                        aria-label="Volume"
                        value={zoomValue}
                        onChange={handleZoom}
                        sx={{ margin: '0px 16px' }}
                      />
                      <Tooltip title="Zoom in" arrow>
                        <ControlPointIcon />
                      </Tooltip>
                    </Stack>
                  </Box>
                </Box>
              </Suspense>
            }
          </Card>
        </Col>
        <Col xs="4">
          <div className="p-2">
            <ArtifactProperties artifact={props.artifact} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ArtifactAR3DEditor;
