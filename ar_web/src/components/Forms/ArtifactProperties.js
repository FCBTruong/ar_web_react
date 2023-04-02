import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import user from "apis/user";
import { HashLoader } from "react-spinners";
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
  Label,
  FormText,
} from "reactstrap";

class ArtifactProperties extends React.Component {
  constructor(props) {
    super(props);
    console.log("t: ", JSON.stringify(props));

    this.state = {
      isLoadingImage: false,
      isUploadingModel: false,
    };
  }

  changeImageHandler = (e) => {
    this.setState({
      isLoadingImage: true,
    });

    var file = e.target.files[0];
    user.uploadFile(file).then((s) => {
      if (s) {
        this.setState({
          isLoadingImage: false,
        });

        window.ArtifactEditor.onChangeImage(s);
      }
    });
  };

  change3DModel = (e) => {
    var file = e.target.files[0];

    user.addAsset3D(file).then((asset) => {
      window.ArtifactEditor.onAddAsset3D(asset);
      this.setState({
        isUploadingModel: false,
      });
    });
    this.setState({
      isUploadingModel: true,
    });
  };

  render() {
    return (
      <div>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: "auto", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {
            <TreeItem nodeId="1" label="3D Model">
              <div>
                <br />
                {this.state.isUploadingModel ? (
                  <HashLoader color="#36d7b7" />
                ) : (
                  <Input
                    placeholder=""
                    type="file"
                    onChange={this.change3DModel}
                  />
                )}
                <br />
                {this.props.modelAr && this.props.modelAr.modelAsset ? (
                  <div>
                    <div>
                      <p>Position</p>
                      <div class="row">
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>X</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.position.x}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelPosition(
                                  e.target.value,
                                  this.props.modelAr.position.y,
                                  this.props.modelAr.position.z
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Y</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.position.y}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelPosition(
                                  this.props.modelAr.position.x,
                                  e.target.value,
                                  this.props.modelAr.position.z
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Z</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.position.z}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelPosition(
                                  this.props.modelAr.position.x,
                                  this.props.modelAr.position.y,
                                  e.target.value
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p>Rotation</p>
                      <div class="row">
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>X</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.rotation.x}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelRotation(
                                  e.target.value,
                                  this.props.modelAr.rotation.y,
                                  this.props.modelAr.rotation.z
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Y</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.rotation.y}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelRotation(
                                  this.props.modelAr.rotation.x,
                                  e.target.value,
                                  this.props.modelAr.rotation.z
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Z</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.rotation.z}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelRotation(
                                  this.props.modelAr.rotation.x,
                                  this.props.modelAr.rotation.y,
                                  e.target.value
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>Scale</p>
                      <div class="row">
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>X</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.scale.x}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelScale(
                                  e.target.value,
                                  this.props.modelAr.scale.y,
                                  this.props.modelAr.scale.z
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Y</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.scale.y}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelScale(
                                  this.props.modelAr.scale.x,
                                  e.target.value,
                                  this.props.modelAr.scale.z
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                        <div class="col">
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Z</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder=""
                              type="number"
                              value={this.props.modelAr.scale.z}
                              onChange={(e) => {
                                window.ArtifactEditor.changeModelScale(
                                  this.props.modelAr.scale.x,
                                  this.props.modelAr.scale.y,
                                  e.target.value
                                );
                              }}
                            />
                          </InputGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </TreeItem>
          }
          <TreeItem nodeId="2" label="Image">
            <p>Load your artifact image</p>
            {this.state.isLoadingImage ? (
              <HashLoader color="#36d7b7" />
            ) : (
              <div>
                <img
                  alt="..."
                  className="img-fluid rounded shadow-lg"
                  src={
                    this.props.image
                      ? this.props.image
                      : require("assets/img/theme/team-3-800x800.jpg")
                  }
                  style={{ width: "150px" }}
                />
                <FormGroup>
                  <Input
                    type="file"
                    name="file"
                    id="exampleFile"
                    onChange={this.changeImageHandler}
                  />
                </FormGroup>{" "}
              </div>
            )}
          </TreeItem>
          <TreeItem nodeId="3" label="Information">
            <p>Load your artifact image</p>
          </TreeItem>
          <TreeItem nodeId="4" label="Audio">
            <div></div>
          </TreeItem>
        </TreeView>
      </div>
    );
  }
}

export default ArtifactProperties;
