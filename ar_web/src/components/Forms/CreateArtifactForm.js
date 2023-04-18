import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormText,
  Label,
} from "reactstrap";

import user from "apis/user";

import classnames from "classnames";
import artifactMgr from "apis/artifact_mgr";

class CreateArtifactForm extends React.Component {
  state = {
    nameFocused: false,
    artifactForm_name: "",
    artifactForm_introduction: "",
    isLoadingAsset: false,
  };

  artifactForm = {
    museumId: this.props.museumId,
    artifact: {
      name: "",
      description: "",
      image: "",
      modelAr: {},
      audio: "",
    },
  };

  onChangeName = (e) => {
    this.setState({ artifactForm_name: e.target.value });
  };

  onChangeIntroduction = (e) => {
    this.setState({ artifactForm_introduction: e.target.value });
  };

  create = (e) => {
    if (
      this.state.artifactForm_name === "" ||
      this.state.artifactForm_introduction === ""
    ) {
      console.log("name or intruction, image is empty");
    } else {
      this.artifactForm.artifact.name = this.state.artifactForm_name;
      this.artifactForm.artifact.description =
        this.state.artifactForm_introduction;

      artifactMgr.create(this.artifactForm);

      window.Artifacts.setState({
        isLoading: true
      });
    }
  };

  changeFileHandler = (e) => {
    var file = e.target.files[0];
    user.uploadFile(file).then((e) => {
      if (e) {
        this.artifactForm.artifact.image = e;
      } else {
      }

      this.setState({
        isLoadingAsset: false,
      });
    });
  };

  render() {
    return (
      <section className="section section-lg pt-lg-0 section-contact-us">
        <Container>
          <Row className="justify-content-center mt--0">
            <Col lg="8">
              <Card className="bg-gradient-secondary shadow">
                <CardBody className="p-lg-5">
                  <h4 className="mb-1">Thêm hiện vật trưng bày</h4>
                  <p className="mt-0">AR Technology</p>
                  <FormGroup
                    className={classnames("mt-5", {
                      focused: this.state.nameFocused,
                    })}
                  >
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Tên hiện vật"
                        type="text"
                        onFocus={(e) => this.setState({ nameFocused: true })}
                        onBlur={(e) => this.setState({ nameFocused: false })}
                        onChange={this.onChangeName}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Input
                      className="form-control-alternative"
                      cols="80"
                      name="name"
                      placeholder="Mô tả hiện vật..."
                      rows="4"
                      type="textarea"
                      onChange={this.onChangeIntroduction}
                    />
                  </FormGroup>
                  <div>
                    <Button
                      block
                      className="btn-round"
                      color="default"
                      size="lg"
                      type="button"
                      onClick={this.create}
                    >
                      Tạo mới
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
export default CreateArtifactForm;
