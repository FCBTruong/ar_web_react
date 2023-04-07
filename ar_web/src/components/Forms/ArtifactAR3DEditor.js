import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import ModelsView from "components/Forms/ModelsView";
import utilities from "utilities/utilities";
import Card from "reactstrap/lib/Card";

function Model(props) {
  console.log("props...", props);

  var urlAsset =
    props.artifact.modelAr.modelAsset && props.artifact.modelAr.modelAsset.url
      ? props.artifact.modelAr.modelAsset.url
      : require("assets/models/cardboard_cartoon.glb");

  var fileExtension = utilities.getFileExtension(urlAsset);
  console.log("file extension3d ", fileExtension);

  var scene;
  switch (fileExtension) {
    case "fbx":
      // eslint-disable-next-line react-hooks/rules-of-hooks
      scene = useFBX(urlAsset);
      break;
    default:
      // eslint-disable-next-line react-hooks/rules-of-hooks
      scene = useGLTF(urlAsset).scene;
      break;
  }

  return (
    <primitive
      object={scene}
      scale={[
        props.artifact.modelAr.scale.x,
        props.artifact.modelAr.scale.y,
        props.artifact.modelAr.scale.z,
      ]}
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
  );
}

function EmptyBox() {
  return (
    <mesh scale={[0.01, 0.01, 0.01]} rotation={[10, 0, 0]}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function ArtifactAR3DEditor(props) {
  return (
    <div>
      <Card className="shadow border-0 " style={{ height: 500, width: "100%" }}>
        {
          <Canvas
            dpr={[1, 2]}
            shadows
            camera={{ fav: 45 }}
            style={{ position: "absolute" }}
          >
            <PresentationControls
              speed={1.5}
              global
              zoom={1}
              polar={[-0.1, Math.PI / 4]}
            >
              <Stage environment={null}>
                {props.artifact.modelAr && props.artifact.modelAr.modelAsset ? (
                  <Model artifact={props.artifact} scale={0.05} />
                ) : (
                  <EmptyBox />
                )}
              </Stage>
            </PresentationControls>
          </Canvas>
        }
      </Card>
    </div>
  );
}

export default ArtifactAR3DEditor;
