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
} from "reactstrap";

import user from "apis/user";

import classnames from "classnames";

class CreateMuseumForm extends React.Component {
  state = {
    nameFocused: false,
    museumForm_name: "",
    museumForm_introduction: "",
  };

  onChangeName = (e) => {
    this.setState({ museumForm_name: e.target.value });
  };

  onChangeIntroduction = (e) => {
    this.setState({ museumForm_introduction: e.target.value });
  };

  changeImageHandler = (e)=>{
    
  }

  create = (e) => {
    if (
      this.state.museumForm_name === "" ||
      this.state.museumForm_introduction === ""
    ) {
      console.log("name or intruction is empty");
    } else {
      user.createMuseum(
        this.state.museumForm_name,
        this.state.museumForm_introduction
      );
    }
  };

  render() {
    return (
      <section className="section section-lg pt-lg-0 section-contact-us">
        <Container>
          <Row className="justify-content-center mt--0">
            <Col lg="8">
              <Card className="bg-gradient-secondary shadow">
                <CardBody className="p-lg-5">
                  <h4 className="mb-1">Create your museum here</h4>
                  <p className="mt-0">AR Technology</p>
                  <FormGroup
                    className={classnames("mt-5", {
                      focused: this.state.nameFocused,
                    })}
                  >
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-user-run" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Museum name"
                        type="text"
                        onFocus={(e) => this.setState({ nameFocused: true })}
                        onBlur={(e) => this.setState({ nameFocused: false })}
                        onChange={this.onChangeName}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                  <Input
                    type="file"
                    name="file"
                    id="exampleFile"
                    onChange={this.changeImageHandler}
                  />
                </FormGroup>{" "}
                  <FormGroup className="mb-4">
                    <Input
                      className="form-control-alternative"
                      cols="80"
                      name="name"
                      placeholder="Type an introduction..."
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
                      CREATE
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
export default CreateMuseumForm;
