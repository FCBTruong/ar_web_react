import user from "apis/user";

import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Badge,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import ArtifactsNavBar from "components/Navbars/ArtifactsNavBar";
import CreateArtifactForm from "components/Forms/CreateArtifactForm";
import artifactMgr from "apis/artifact_mgr";
import QRCode from "react-qr-code";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import ModelsView from "components/Forms/ModelsView";
import ArtifactEditorBar from "components/Navbars/ArtifactEditorBar";

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Model(props) {
  const { scene } = useGLTF(require("assets/models/bmw_8_3d_model.glb"));
  return <primitive object={scene} {...props} />;
}

class ArtifactEditor extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    var _museumId = localStorage.getItem("current_museum_id");
    var _artifactId = localStorage.getItem("current_artifact_id");

    if (!user.getUserData()) {
      user.requestData().then((s) => {
        this.setState({
          artifact: artifactMgr.getArtifact(_museumId, _artifactId),
          museumId: _museumId,
        });
      });
    }

    this.state = {
      artifact: artifactMgr.getArtifact(_museumId, _artifactId),
      museumId: _museumId,
      currentTab: ArtifactEditor.TAB_NONE,
    };
  }

  downloadQRCode = () => {
    const svg = document.getElementById("qr-gen");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download =
        this.state.artifact.name + "_" + this.state.artifact.id;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  open3DTab = (e) => {
    this.setState({
      currentTab: ArtifactEditor.TAB_3D,
    });
  };

  closeTabs = (e) => {
    this.setState({
      currentTab: ArtifactEditor.TAB_NONE,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      artifact: {
        description: e.target.value,
      },
    });
  };

  onChangeName = (e) => {
    this.setState({
      artifact: {
        name: e.target.value,
      },
    });
  };

  saveAndPublish = (e) => {
    // TODO
  };

  render() {
    return (
      <main ref="main">
        <ArtifactEditorBar></ArtifactEditorBar>
        <section className="section"></section>
        <div class="container-fluid">
          <div class="row">
            <Button
              className="btn-icon-only rounded-circle mt-0"
              color="primary"
              href="#pablo"
              onClick={this.open3DTab}
            >
              3D
            </Button>
            <Button
              className="btn-icon-only rounded-circle mt-0"
              color="primary"
              href="#pablo"
            >
              TXT
            </Button>
            <Button
              className="btn-icon-only rounded-circle mt-0"
              color="primary"
              href="#pablo"
              onClick={this.open3DTab}
            >
              <i class="fa fa-picture-o" aria-hidden="true"></i>
            </Button>
          </div>
          <br />
          <div class="row">
            <div class="col">
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText></InputGroupText>
                  </InputGroupAddon>
                  <Input
                    style={{
                      fontWeight: "bold",
                      fontSize: 25,
                      textAlign: 'center'
                    }}
                    placeholder="Artifact name"
                    type="text"
                    value={this.state.artifact.name}
                    onFocus={(e) => {}}
                    onBlur={(e) => {}}
                    onChange={this.onChangeName}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-4">
                <Input
                  className="form-control-alternative"
                  cols="80"
                  name="name"
                  placeholder="Type a description"
                  rows="4"
                  value={this.state.artifact.description}
                  type="textarea"
                  spellCheck={false}
                  onChange={this.onChangeDescription}
                />
              </FormGroup>
              <QRCode
                className="pt-0 img-center"
                id="qr-gen"
                size={256}
                style={{ height: "auto", maxWidth: "50%", width: "50%" }}
                viewBox={`0 0 256 256`}
                value={artifactMgr.getUrlArtifact(
                  this.state.museumId,
                  this.state.artifact.id
                )}
              ></QRCode>
              <br />
              <Button
                block
                className="btn-round"
                color="default"
                size="lg"
                type="button"
                onClick={this.downloadQRCode}
              >
                Download QR Code
              </Button>
            </div>
            <div class="col">
              {this.state.currentTab === ArtifactEditor.TAB_NONE ? (
                <Card
                  className="shadow border-0 "
                  style={{ height: 500, width: "100%" }}
                >
                  {/* <Canvas
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
                        <Model scale={0.08} />
                      </Stage>
                    </PresentationControls>
                  </Canvas> */}
                </Card>
              ) : (
                <ModelsView />
              )}
            </div>
            <div class="col">Properties</div>
          </div>
        </div>
      </main>
    );
  }
}

ArtifactEditor.TAB_NONE = 0;
ArtifactEditor.TAB_3D = 1;
export default ArtifactEditor;
