import React from "react";

// reactstrap components
import { Button, Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import HomeNavbar from "components/Navbars/HomeNavBar";
import CreateMuseumForm from "components/Forms/CreateMuseumForm";
import user from "apis/user";
import { HashLoader } from "react-spinners";
import utilities from "utilities/utilities";
import {useHistory} from 'react-router-dom';



class Museums extends React.Component {
  constructor(props) {
    super(props);
    user.requestData().then((s) => {
      this.setState({ userData: user.getData() });
    });
    this.state = {
      isCreating: false,
      userData: user.getData(),
      isLoading: false,
    };
  }


  createMuseum = (e) => {
    this.setState({
      isCreating: true,
    });
  };

  cancelCreateMuseum = (e) => {
    this.setState({
      isCreating: false,
    });
  };

  doneCreateMuseum = (e) => {
    this.setState({
      isCreating: false,
      isLoading: false
    });
  };

  openMuseum = (e, museum) => {
    console.log("open museum ", museum);
    localStorage.setItem("current_museum_id", museum.id);
    window.location.replace("/#artifacts-page");
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
            {!this.state.isCreating ? <HomeNavbar></HomeNavbar> : null}
            <section className="section section-shaped section-lg">
             
              {this.state.isCreating ? (
                <CreateMuseumForm></CreateMuseumForm>
              ) : (
                <div>
                  <br />
                  <br />
                  <br />
                  <Container className="pt-lg-7">
                    <section className="section section-lg pt-lg-0 mt--200">
                      <Container>
                        <Row className="justify-content-center">
                          <Col lg="8">
                            <Row className="row-grid">
                              {user.userData
                                ? user.userData.museums.map((museum, index) => {
                                    return (
                                      <Col lg="12 mb-5">
                                        <Card
                                          className="card-lift--hover shadow border-0"
                                          onClick={(e) =>
                                            this.openMuseum(e, museum)
                                          }
                                          style={{
                                            height: 'auto',
                                          }}
                                        >
                                          <CardBody className="py-4">
                                            <h5 className="text-primary text-uppercase mx-auto"
                                            style={{
                                              textAlign: 'center'
                                            }}>
                                              {museum.name}
                                            </h5>
                                            <p className="description mt-3">
                                              {museum.introduction
                                                ? utilities.subStr(
                                                    museum.introduction,
                                                    200
                                                  )
                                                : "empty"}
                                            </p>
                                            <img
                                              alt="..."
                                              className="img-fluid rounded shadow-lg mx-auto"
                                              src={
                                                this.props.image
                                                  ? this.props.image
                                                  : require("assets/img/museum/museum_bg_0.jpeg")
                                              }
                                              style={{ width: "100%" }}
                                            />
                                          </CardBody>
                                        </Card>
                                      </Col>
                                    );
                                  })
                                : null}
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </section>
                  </Container>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    );
  }
}

export default Museums;
