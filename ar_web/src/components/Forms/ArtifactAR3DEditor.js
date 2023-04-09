import { useState, useEffect, useRef } from "react";
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

function Model(props) {
  console.log("props...", props);

  var urlAsset =
    props.artifact.modelAr.modelAsset && props.artifact.modelAr.modelAsset.url
      ? props.artifact.modelAr.modelAsset.url
      : require("assets/models/cardboard_cartoon.glb");

  var fileExtension = utilities.getFileExtension(urlAsset);
  console.log("file extension3d ", fileExtension);

  const group = useRef();
  const { scene, nodes, animations, materials } = useGLTF(urlAsset);
  const { actions, names } = useAnimations(animations, group);
  console.log("anim ...", animations);

  useEffect(() => {
    console.log("here", actions);
    if (names.length > 0) {
      console.log('jolo', names[0])
      console.log(actions[names[0]]);
      if (actions[names[0]] !== undefined) actions[names[0]].play();
    }
  });

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
  console.log("props-----------");
  return (
    <div>
      <Row>
        <Col xs="8">
          <Card
            className="shadow border-0 "
            style={{ height: 600, width: "100%" }}
          >
            {
              <Canvas shadows camera={{ position: [10, 12, 12], fov: 25 }}>
                <PresentationControls speed={1.5} global zoom={1}>
                  <Stage environment={null}>
                    {props.artifact.modelAr &&
                    props.artifact.modelAr.modelAsset ? (
                      <Model artifact={props.artifact} scale={0.05} />
                    ) : (
                      <EmptyBox />
                    )}
                  </Stage>
                </PresentationControls>
                <Grid position={[0, -25, 0]} args={[100, 100]} />
                <Environment preset="city" />
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                  <GizmoViewport
                    axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
                    labelColor="white"
                  />
                </GizmoHelper>
              </Canvas>
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
