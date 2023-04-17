import React, { useEffect, useRef, Suspense } from "react";
import user from "apis/user";
import { Card, Row, Col, Input, Button, CardBody } from "reactstrap";
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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { HashLoader } from "react-spinners";

function Model3DView(props) {
  var urlAsset = props.url;

  var fileExtension = utilities.getFileExtension(urlAsset);
  console.log("file extension3d ", fileExtension);

  var scene;
  const gltf = useLoader(GLTFLoader, urlAsset);
  const groupRef = useRef();

  useEffect(() => {
    groupRef.current.add(gltf.scene);
  }, [gltf]);

  return (
    <group
      ref={groupRef}
      scale={[props.scale, props.scale, props.scale]}
      rotation={[0, 0, 0]}
      position={[0, 0, 0]}
    />
  );
}

class ModelsView extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    console.log("ggg", user.getData().assets);
  }
  state = {
    indexCardHovering: -1,
  };

  changeFileHandler = (e) => {
    var file = e.target.files[0];
    user.addAsset3D(file).then((e) => {
      if (e) {
        // TODO later
      } else {
      }

      this.setState({});
    });
  };

  close = (e) => {
    window.ArtifactEditor.closeTabs();
  };

  onPickModel = (e, asset) => {
    window.ArtifactEditor.onAddAsset3D(asset);
    window.ArtifactEditor.toggleTabs(0, 1);
  };

  onRemoveModel = (e, asset) => {
    user.removeAsset3D(asset.id);

    this.setState({
      
    })
  };

  render() {
    return (
      <main>
        <Input
          type="file"
          name="file"
          id="exampleFile"
          onChange={this.changeFileHandler}
        />
        <Row className="justify-content-center p-2">
          <Col lg="12">
            <Row className="row-grid">
              {user.userData.assets.map((asset, index) => {
                return (
                  <Card
                    key={index}
                    style={{
                      width: 250,
                      height: 300,
                      backgroundColor: "#dee0e0",
                    }}
                    className="ml-2 mt-2"
                    onMouseOver={() => {
                      console.log("hmmm");
                      this.setState({
                        indexCardHovering: index,
                      });
                    }}
                    onMouseOut={() => {
                      this.setState({
                        indexCardHovering: -1,
                      });
                    }}
                  >
                    <Box height={280}>
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
                          camera={{ position: [10, 12, 12], fov: 25 }}
                        >
                          <Model3DView url={asset.url} scale={0.3} />

                          <Environment preset="city" />
                        </Canvas>
                      </Suspense>
                    </Box>

                    {this.state.indexCardHovering === index ? (
                      <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          backgroundColor: alpha("#000000", 0.5),
                        }}
                      >
                        <Button
                          onClick={(e) => {
                            this.onPickModel(e, asset);
                          }}
                        >
                          Add
                        </Button>
                        <Button
                          onClick={(e) => {
                            this.onRemoveModel(e, asset);
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    ) : (
                      <div></div>
                    )}
                    <Box
                      sx={{
                        backgroundColor: "#9c9c9c",
                      }}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      height={40}
                      className="justify-content-center m-auto text-center"
                    >
                      <p className="text-white">{asset.name}</p>
                    </Box>
                  </Card>
                );
              })}
            </Row>
          </Col>
        </Row>
      </main>
    );
  }
}

export default ModelsView;
