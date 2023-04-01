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

        window.ArtifactEditor.onChangeImage(s)
      }
    });
  };

  change3DModel = (e) => {
    var file = e.target.files[0];
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
                <Input
                  placeholder=""
                  type="file"
                  onChange={this.change3DModel}
                />
                <br />
                {
                this.props.modelAr && this.props.modelAr.modelAsset ? (
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
                              value={this.props.modelAr.scale.x}
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
                              value={this.props.modelAr.scale.x}
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
        </TreeView>
      </div>
    );
  }
}

export default ArtifactProperties;
