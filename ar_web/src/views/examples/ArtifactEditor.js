import user from "apis/user";

import React from "react";
import ArtifactContentEditor from "components/Forms/ArtifactContentEditor";
import TabPane from "reactstrap/lib/TabPane";
import TabContent from "reactstrap/lib/TabContent";
import "assets/css/my-style.css";
import ArtifactSettings from "components/Forms/ArtifactSettings";
import Prompt from "react-router-dom/Prompt";

// reactstrap components
import { Button, Row, Col } from "reactstrap";
import artifactMgr from "apis/artifact_mgr";

import ArtifactEditorBar from "components/Navbars/ArtifactEditorBar";
import { HashLoader } from "react-spinners";
import utilities from "utilities/utilities";
import { Box } from "@material-ui/core";
import ArtifactAR3DEditor from "components/Forms/ArtifactAR3DEditor";
import ModelsView from "components/Forms/ModelsView";
import { Tab, Tabs } from "@mui/material";
import QRCodeArtifact from "components/Forms/QRCodeArtifact";

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
      isLoading: false,
      plainTabs: 0,
      isFormDirty: false,
    };
  }



  onChangeDescription = (e) => {
    var desArtifact = { ...this.state.artifact };
    desArtifact.description = e.target.value;
    this.setState({
      artifact: desArtifact,
      isFormDirty: true,
    });
  };

  onChangeName = (e) => {
    var desArtifact = { ...this.state.artifact };
    desArtifact.name = e.target.value;
    this.setState({
      artifact: desArtifact,
      isFormDirty: true,
    });
  };

  saveAndPublish = (e) => {
    this.setState({
      isLoading: true,
    });
    artifactMgr.update(this.state.museumId, this.state.artifact).then((s) => {
      this.setState({
        isLoading: false,
        isFormDirty: false,
      });
    });
  };

  onChangeImage = (s) => {
    console.log("new image path " + s);
    var desArtifact = { ...this.state.artifact };
    desArtifact.image = s;
    this.setState({
      artifact: desArtifact,
      isFormDirty: true,
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
  };

  toggleTabs = (e, newValue) => {
    console.log("new va " + newValue + "c");
    this.setState({
      plainTabs: newValue,
    });
  };

  componentDidMount() {
    const handler = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    if (this.state.isFormDirty) {
      window.addEventListener("beforeunload", handler);
    } else {
      window.removeEventListener("beforeunload", handler);
    }
  }

  updateEditMode = () => {
    this.setState({});
  };

  render() {
    return (
      <React.Fragment>
        <Prompt
          when={this.state.isFormDirty}
          message="Your changes have not been saved. Are you sure you want to leave?"
        />
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
              <ArtifactEditorBar></ArtifactEditorBar>
              <div className="container-xl mt-5">
                <div className="row">
                  <Col lg="3">
                    <div className="position-fixed">
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
                          <Tabs
                            value={this.state.plainTabs}
                            onChange={this.toggleTabs}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            orientation="vertical"
                          >
                            <Tab
                              label="Mô tả"
                              style={{
                                border: "none",
                                outline: "none",
                              }}
                            />
                            <Tab
                              label="Ứng dụng AR"
                              style={{
                                border: "none",
                                outline: "none",
                              }}
                            />
                            <Tab
                              label="Thư viện"
                              style={{
                                border: "none",
                                outline: "none",
                              }}
                            />

                            <Tab
                              label="Cài đặt"
                              style={{
                                border: "none",
                                outline: "none",
                              }}
                            />
                          </Tabs>
                        </div>
                        <br />
                        <Row className="justify-content-center text-center mt-1">
                          <div id="footer">
                            <h6>Experience AR</h6>
                            <QRCodeArtifact museumId={this.state.museumId} 
                            artifact={this.state.artifact}/>
                            <Box height={5} />
                          </div>
                        </Row>
                      </Box>
                    </div>
                  </Col>
                  <Col lg="9">
                    <div className="nav-wrapper mt-2">
                      <Box
                        sx={{ borderColor: "primary.main", border: 0 }}
                        className="mt-1"
                      >
                        <TabContent
                          activeTab={"plainTabs" + this.state.plainTabs}
                          className="mt-1"
                        >
                          <TabPane tabId="plainTabs0">
                            <div>
                              <ArtifactContentEditor
                                artifact={this.state.artifact}
                              />
                            </div>
                          </TabPane>
                          <TabPane tabId="plainTabs1">
                            <ArtifactAR3DEditor
                              artifact={this.state.artifact}
                            />
                          </TabPane>
                          <TabPane tabId="plainTabs2">
                            <ModelsView />
                          </TabPane>
                          <TabPane tabId="plainTabs3">
                            <ArtifactSettings
                              museumId={this.state.museumId}
                              artifact={this.state.artifact}
                            />
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
      </React.Fragment>
    );
  }
}

ArtifactEditor.TAB_NONE = 0;
ArtifactEditor.TAB_3D = 1;
export default ArtifactEditor;
