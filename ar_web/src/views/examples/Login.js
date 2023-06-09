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
import { Link } from "react-router-dom";

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
import auth from "apis/auth";
import { HashLoader } from "react-spinners";

// core components

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      isRemember: localStorage.getItem('remember_me') ? localStorage.getItem('remember_me') : false
    };

    if(this.state.isRemember){
      
    }
  }


  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  login = (e) => {
    this.setState({
      isLoading: true,
    });
    auth.login(this.state.email, this.state.password);
  };

  toggleRemember = (e)=>{

  }

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
              <Container className="pt-lg-0">
                <Row className="justify-content-center">
                  <Col lg="5">
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                          <small>Sign in with</small>
                        </div>
                        <div className="btn-wrapper text-center">
                          <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={(e) => {e.preventDefault()
                              alert("Sắp ra mắt");
                            }}
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
                            onClick={(e) => {e.preventDefault()
                              alert("Sắp ra mắt");
                            }}
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
                          <small>Or sign in with credentials</small>
                        </div>
                        <Form role="form">
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Email"
                                type="email"
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
                                autoComplete="off"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id=" customCheckLogin"
                              type="checkbox"
                              checked={this.state.isRemember}
                              onChange={
                                (e)=>{
                                  this.setState({
                                    isRemember: !this.state.isRemember
                                  })
                                  localStorage.setItem('remember_me', this.state.isRemember)
                                  console.log('mmmm')
                                }
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor=" customCheckLogin"
                            >
                              <span>Remember me</span>
                            </label>
                          </div>
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={this.login}
                            >
                              Sign in
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                    <Row className="mt-3">
                      <Col xs="6">
                        <a
                          className="text-light"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <small>Forgot password?</small>
                        </a>
                      </Col>
                      <Col className="text-right" xs="6">
                        <Link to="/register-page">
                          <a
                            className="text-light"
                            href="#pablo"
                            onClick={(e) => {}}
                          >
                            <small>Create new account</small>
                          </a>
                        </Link>
                      </Col>
                    </Row>
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

export default Login;
