import React, { useEffect, useRef, Suspense } from "react";
import user from "apis/user";
import { Card, Row, Col, CardBody } from "reactstrap";
import { Canvas } from "@react-three/fiber";
import { alpha } from "@mui/material/styles";
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
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { HashLoader } from "react-spinners";
import Input from "@mui/material/Input";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as THREE from "three";
import { useState } from "react";
import { useMemo } from "react";
import { AnimationMixer } from "three";
import { useFrame } from "@react-three/fiber";

function Model3DView(props) {
  var urlAsset = props.url;
  console.log("urlasset:" + urlAsset);

  var fileExtension = utilities.getFileExtension(urlAsset);
  console.log("file extension3d ", fileExtension);

  const gltf = useLoader(GLTFLoader, urlAsset);
  const groupRef = useRef();

  var model = gltf.scene;

  var box = new THREE.Box3().setFromObject(model);
  var size = new THREE.Vector3();
  box.getSize(size);

  var maxDimension = Math.max(size.x, size.y, size.z);
  const [scale, setScale] = useState(6.0 / maxDimension);

  
  const clonedObject = model.clone(true);


  return (
    <>
      <primitive
        object={model}
        ref={groupRef}
        dispose={null}
        scale={[scale, scale, scale]}
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
      />
    </>
  );
}

class ModelsView extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    console.log("ggg", user.getData().assets);
  }
  state = {
    isUploading: false,
  };

  changeFileHandler = (e) => {
    if (e.target.files.length === 0) return;
    var file = e.target.files[0];
    var extension = file.name.split(".").pop();
    if (extension !== "glb" && extension !== "gltf") {
      alert("Please choose a glb or gltf file");
      return;
    }

    this.setState({
      isUploading: true,
    });
    user.addAsset3D(file).then((e) => {
      if (e) {
        alert("Thêm model thành công");
      } else {
      }

      this.setState({
        isUploading: false,
      });
    });
  };

  close = (e) => {
    window.ArtifactEditor.closeTabs();
  };

  render() {
    return (
      <main>
        {this.state.isUploading && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <HashLoader color="#36d7b7" />
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload model
          <input
            type="file"
            accept=".glb,.gltf"
            hidden
            onChange={this.changeFileHandler}
          />
        </Button>
        <Row className="justify-content-center p-2">
          <Col lg="12">
            <Row className="row-grid">
              {user.userData.assets.map((asset, index) => {
                return <Model3DViewCard asset={asset} index={index} />;
              })}
            </Row>
          </Col>
        </Row>
      </main>
    );
  }
}

function Model3DViewCard(props) {
  const [indexCardHovering, setIndexCardHovering] = useState(-1);

  var onPickModel = (e, asset) => {
    window.ArtifactEditor.onAddAsset3D(asset);
    window.ArtifactEditor.toggleTabs(0, 1);
  };

  var onRemoveModel = (e, asset) => {
    user.removeAsset3D(asset.id);

    this.setState({});
  };

  return (
    <Card
      key={props.index}
      style={{
        width: 250,
        height: 300,
        backgroundColor: "#dee0e0",
      }}
      className="ml-2 mt-2"
      onMouseOver={() => {
        console.log("hmmm");
        setIndexCardHovering(props.index);
      }}
      onMouseOut={() => {
        setIndexCardHovering(-1);
      }}
    >
      <Box sx={{ height: 260 }}>
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
          <Canvas shadows camera={{ position: [10, 12, 12], fov: 25 }}>
            <Model3DView url={props.asset.url} scale={1} />

            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </Box>

      {indexCardHovering === props.index ? (
        <Box
          position="absolute"
          display="flex"
          width="100%"
          height="100%"
          alignItems="center"
          direction="column"
          justifyContent="center"
          sx={{
            backgroundColor: alpha("#000000", 0.5),
          }}
        >
          <div>
            <div>
              <Button
                variant="outlined"
                href="#outlined-buttons"
                sx={{
                  minWidth: "100px",
                  borderColor: "white",
                  color: "white",
                  borderRadius: "20px",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={(e) => {
                  onPickModel(e, props.asset);
                }}
              >
                Add
              </Button>
            </div>
            <br />
            <div></div>
            <Button
              variant="outlined"
              href="#outlined-buttons"
              sx={{
                minWidth: "100px",
                borderColor: "white",
                color: "white",
                borderRadius: "20px",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "red",
                  color: "white",
                },
              }}
              onClick={(e) => {
                onRemoveModel(e, props.asset);
              }}
            >
              Xóa
            </Button>
          </div>
        </Box>
      ) : null}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          backgroundColor: "grey",
        }}
      >
        <p style={{ textAlign: "center", color: "white" }}>
          {utilities.subStr(props.asset.name, 10)}
        </p>
      </Box>
    </Card>
  );
}

export default ModelsView;
