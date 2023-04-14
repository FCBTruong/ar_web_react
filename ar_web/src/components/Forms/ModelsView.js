import React from "react";
import user from "apis/user";
import { Card, Row, Col, Input, Button, CardBody } from "reactstrap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import utilities from "utilities/utilities";
import { Box } from "@mui/system";

function Model3DView(props) {
  var urlAsset = props.url;

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
      scale={[1, 1, 1]}
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
                    <Box height={260}>
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
                            <Model3DView url={asset.url} scale={0.05} />
                          </Stage>
                        </PresentationControls>
                      </Canvas>
                    </Box>
                    {this.state.indexCardHovering === index ? (
                      <Box
                        width="100%"
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          backgroundColor: "red",
                        }}
                      >
                        <Button
                          onClick={(e) => {
                            this.onPickModel(e, asset);
                          }}
                        >
                          Add
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
