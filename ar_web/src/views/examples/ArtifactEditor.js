import user from "apis/user";

import React from "react";
import ArtifactProperties from "components/Forms/ArtifactProperties";
import ArtifactContentEditor from "components/Forms/ArtifactContentEditor";
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import classnames from "classnames";
import Nav from "reactstrap/lib/Nav";
import TabPane from "reactstrap/lib/TabPane";
import TabContent from "reactstrap/lib/TabContent";

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

import ArtifactEditorBar from "components/Navbars/ArtifactEditorBar";
import { HashLoader } from "react-spinners";
import utilities from "utilities/utilities";
import { Box } from "@material-ui/core";
import ArtifactAR3DEditor from "components/Forms/ArtifactAR3DEditor";

class ArtifactEditor extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    var _museumId = localStorage.getItem("current_museum_id");
    var _artifactId = localStorage.getItem("current_artifact_id");

    if (!user.getData()) {
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
      isLoading: false,
      iconTabs: 1,
      plainTabs: 1,
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
    var desArtifact = { ...this.state.artifact };
    desArtifact.description = e.target.value;
    this.setState({
      artifact: desArtifact,
    });
  };

  onChangeName = (e) => {
    var desArtifact = { ...this.state.artifact };
    desArtifact.name = e.target.value;
    this.setState({
      artifact: desArtifact,
    });
  };

  saveAndPublish = (e) => {
    this.setState({
      isLoading: true,
    });
    artifactMgr.update(this.state.museumId, this.state.artifact).then((s) => {
      this.setState({
        isLoading: false,
      });
    });
  };

  onChangeImage = (s) => {
    console.log("new image path " + s);
    var desArtifact = { ...this.state.artifact };
    desArtifact.image = s;
    this.setState({
      artifact: desArtifact,
    });
  };

  onAddAsset3D = (asset) => {
    console.log("asset" + asset);
    var desArtifact = { ...this.state.artifact };
    desArtifact.modelAr.modelAsset = asset;
    this.setState({
      artifact: desArtifact,
    });
  };

  changeModelPosition = (x, y, z) => {
    var desArtifact = { ...this.state.artifact };
    desArtifact.modelAr.position = {
      x: Number(x),
      y: Number(y),
      z: Number(z),
    };
    this.setState({
      artifact: desArtifact,
    });
  };

  changeModelRotation = (x, y, z) => {
    var desArtifact = { ...this.state.artifact };
    desArtifact.modelAr.rotation = {
      x: Number(x),
      y: Number(y),
      z: Number(z),
    };
    this.setState({
      artifact: desArtifact,
    });
  };

  changeModelScale = (x, y, z) => {
    var desArtifact = { ...this.state.artifact };
    desArtifact.modelAr.scale = {
      x: Number(x),
      y: Number(y),
      z: Number(z),
    };
    this.setState({
      artifact: desArtifact,
    });
  };

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index,
    });
  };

  render() {
    return (
      <main ref="main">
        {this.state.isLoading ? (
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
        ) : (
          <div>
            <ArtifactEditorBar />
            <div class="container-xl mt-5">
              <div class="row">
                {/*
                <div class="col">
                  {/*
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText></InputGroupText>
                      </InputGroupAddon>
                      <Input
                        style={{
                          fontWeight: "bold",
                          fontSize: 25,
                          textAlign: "center",
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
                      maxLength={1000}
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
                */}
                <Col lg="3">
                  <div class="position-fixed">
                    <Box
                      position="fixed"
                      border={1}
                      borderTop={0}
                      borderBottom={0}
                      borderLeft={0}
                      borderColor="grey.300"
                      sx={{
                        width: 300,
                        height: "100%",
                      }}
                    >
                      <br />
                      <div>
                        <Button
                          block
                          className="btn-round justify-content-center"
                          variant="light"
                          color="secondary"
                          size="md"
                          type="button"
                          style={{
                            width: "100%",
                          }}
                        >
                          3D
                        </Button>
                        <Button
                          block
                          className="btn-round justify-content-center"
                          variant="light"
                          color="secondary"
                          size="md"
                          type="button"
                          style={{
                            width: "100%",
                          }}
                        >
                          Artifacts
                        </Button>
                      </div>
                      <br />
                      <div>
                        {
                          // todo
                        }
                        <QRCode
                          className="pt-0 img-center"
                          id="qr-gen"
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "50%",
                            width: "50%",
                            justifyContent: "flex-end",
                          }}
                          viewBox={`0 0 256 256`}
                          value={artifactMgr.getUrlArtifact(
                            this.state.museumId,
                            this.state.artifact.id
                          )}
                        ></QRCode>
                        <Row className="justify-content-center mt-1">
                          <Button
                            block
                            className="btn-round justify-content-center"
                            color="default"
                            size="md"
                            type="button"
                            style={{
                              width: "70%",
                            }}
                            onClick={this.downloadQRCode}
                          >
                            Download QR Code
                          </Button>
                        </Row>
                      </div>
                    </Box>
                  </div>
                </Col>
                <Col lg="7">
                  <div className="nav-wrapper mt-2">
                    <div class="w-50 align-center position-relative">
                      <Nav
                        className="nav-fill flex-column flex-md-row"
                        class="w-50 p-3"
                        id="tabs-icons-text"
                        pills
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.plainTabs === 1}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.plainTabs === 1,
                            })}
                            onClick={(e) => this.toggleNavs(e, "plainTabs", 1)}
                            href="#pablo"
                            role="tab"
                          >
                            Thông tin
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.plainTabs === 2}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.plainTabs === 2,
                            })}
                            onClick={(e) => this.toggleNavs(e, "plainTabs", 2)}
                            href="#pablo"
                            role="tab"
                          >
                            AR
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                    <Box
                      sx={{ borderColor: "primary.main", border: 0 }}
                      className="mt-1"
                    >
                      <TabContent
                        activeTab={"plainTabs" + this.state.plainTabs}
                        className="mt-1"
                      >
                        <TabPane tabId="plainTabs1">
                          <div>
                            <ArtifactContentEditor
                              artifact={this.state.artifact}
                            />
                          </div>
                        </TabPane>
                        <TabPane tabId="plainTabs2">
                          <ArtifactAR3DEditor artifact={this.state.artifact} />
                        </TabPane>
                      </TabContent>
                    </Box>
                  </div>
                </Col>
                {/*<div class="col">
                  <ArtifactProperties {...this.state.artifact} />
                  </div>*/}
              </div>
            </div>{" "}
          </div>
        )}
      </main>
    );
  }
}

ArtifactEditor.TAB_NONE = 0;
ArtifactEditor.TAB_3D = 1;
export default ArtifactEditor;
