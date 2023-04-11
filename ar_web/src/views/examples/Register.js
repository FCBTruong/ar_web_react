/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import auth from "apis/auth";
import { HashLoader } from "react-spinners";

var TYPE_PASSWORD = 2;
var TYPE_EMAIL = 1;
var TYPE_DEFAULT = 0;

class Register extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  state = {
    email: "",
    password: "",
    name: "",
    agree: false,
    isLoading: false,
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleAgreeChange = (e) => {
    this.setState({ agree: e.target.checked });
  };

  signup = (e) => {
    if (!this.state.agree) {
      alert("Bạn cần đồng ý với chính sách");
      console.log("you should agree with our policy");
      return;
    }
    if (!this.validateInput(this.state.email, TYPE_EMAIL)) {
      alert("Email không hợp lệ (từ 6-35 ký tự, không chứa ký tự đặc biệt)");
      return false;
    }
    if (!this.validateInput(this.state.password, TYPE_PASSWORD)) {
      alert("Mật khẩu cần có từ 6-15 ký tự (chỉ gồm các ký tự a-z, 0-9");
      return false;
    }
    if (!this.validateInput(this.state.name)) {
      return false;
    }

    this.setState({
      isLoading: true,
    });
    auth.signup(this.state.email, this.state.password, this.state.name);
  };

  validateInput = (input, type) => {
    if (!input) return false;

    var length = input.length;
    if(type === TYPE_PASSWORD){
      return length >= 6 && length <= 35;
    }

    if(type === TYPE_EMAIL){
      return length >= 6 && length <= 35;
    }

    return length > 0;
  };

  render() {
    return (
      <>
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
            <section className="section section-shaped section-lg">
              <Container className="pt-lg-1">
                <Row className="justify-content-center">
                  <Col lg="5">
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                          <small>Sign up with</small>
                        </div>
                        <div className="text-center">
                          <Button
                            className="btn-neutral btn-icon mr-4"
                            color="default"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <span className="btn-inner--icon mr-1">
                              <img
                                alt="..."
                                src={
                                  require("assets/img/icons/common/github.svg")
                                    .default
                                }
                              />
                            </span>
                            <span className="btn-inner--text">Github</span>
                          </Button>
                          <Button
                            className="btn-neutral btn-icon ml-1"
                            color="default"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <span className="btn-inner--icon mr-1">
                              <img
                                alt="..."
                                src={
                                  require("assets/img/icons/common/google.svg")
                                    .default
                                }
                              />
                            </span>
                            <span className="btn-inner--text">Google</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                          <small>Or sign up with credentials</small>
                        </div>
                        <Form role="form">
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-hat-3" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Name"
                                type="text"
                                checkSpell={false}
                                value={this.state.name}
                                onChange={this.handleNameChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Email"
                                type="email"
                                autocomplete="off"
                                checkSpell={false}
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Password"
                                type="password"
                                autoComplete="new-password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          <div className="text-muted font-italic">
                            <small>
                              password strength:{" "}
                              {this.state.password.length > 5 ? (
                                <span className="text-success font-weight-700">
                                  strong
                                </span>
                              ) : (
                                <span className="text-warning font-weight-700">
                                  week
                                </span>
                              )}
                            </small>
                          </div>
                          <Row className="my-4">
                            <Col xs="12">
                              <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                  className="custom-control-input"
                                  id="customCheckRegister"
                                  type="checkbox"
                                  checked={this.state.agree}
                                  onChange={this.handleAgreeChange}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheckRegister"
                                >
                                  <span>
                                    I agree with the{" "}
                                    <a href="#pablo">Privacy Policy</a>
                                  </span>
                                </label>
                              </div>
                            </Col>
                          </Row>
                          <div className="text-center">
                            <Button
                              className="mt-4"
                              color="primary"
                              type="button"
                              onClick={this.signup}
                            >
                              Create account
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          )}
        </main>
      </>
    );
  }
}

export default Register;
