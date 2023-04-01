import React from "react";

// reactstrap components
import { Button, Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import HomeNavbar from "components/Navbars/HomeNavBar";
import CreateMuseumForm from "components/Forms/CreateMuseumForm";
import user from "apis/user";

class Museums extends React.Component {
  constructor(props) {
    super(props);
    user.requestData().then((s) => {
      this.setState({ userData: user.getData() });
    });
    this.state = {
      isCreating: false,
      userData: user.getData(),
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
    });
  };

  openMuseum = (e, museum) => {
    console.log("open museum ", museum);
    localStorage.setItem("current_museum_id", museum.id);
    window.location.replace("/museum-artifacts-page");
  };

  render() {
    return (
      <main ref="main">
        {!this.state.isCreating ? <HomeNavbar></HomeNavbar> : null}
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {this.state.isCreating ? (
            <CreateMuseumForm></CreateMuseumForm>
          ) : (
            <div>
              <Container className="pt-lg-7"></Container>
              <Container className="pt-lg-7"></Container>
              <Container className="pt-lg-7">
                <section className="section section-lg pt-lg-0 mt--200">
                  <Container>
                    <Row className="justify-content-center">
                      <Col lg="12">
                        <Row className="row-grid">
                          {user.userData
                            ? user.userData.museums.map((museum, index) => {
                                return (
                                  <Col lg="4 mb-4">
                                    <Card className="card-lift--hover shadow border-0">
                                      <CardBody className="py-5">
                                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                                          <i className="ni ni-check-bold" />
                                        </div>
                                        <h6 className="text-primary text-uppercase">
                                          {museum.name}
                                        </h6>
                                        <p className="description mt-3">
                                          {museum.introduction
                                            ? museum.introduction
                                            : "empty"}
                                        </p>
                                        <div>
                                          <Badge
                                            color="primary"
                                            pill
                                            className="mr-1"
                                          >
                                            AR
                                          </Badge>
                                        </div>
                                        <Button
                                          className="mt-4"
                                          color="primary"
                                          href="#pablo"
                                          onClick={(e) =>
                                            this.openMuseum(e, museum)
                                          }
                                        >
                                          OPEN
                                        </Button>
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
      </main>
    );
  }
}

export default Museums;
