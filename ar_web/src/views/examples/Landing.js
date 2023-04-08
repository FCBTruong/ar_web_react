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

// index page sections
import Download from "views/IndexSections/Download";
import auth from "apis/auth";
import { HashLoader } from "react-spinners";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import UncontrolledCarousel from "reactstrap/lib/UncontrolledCarousel";
import Container from "reactstrap/lib/Container";
import Button from "reactstrap/lib/Button";

const items = [
  {
    src: require("assets/img/theme/img_theme_0.jpeg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/theme/img_theme_1.jpg"),
    altText: "",
    caption: "",
    header: "dd",
  },
  {
    src: require("assets/img/theme/img_theme_2.jpeg"),
    altText: "",
    caption: "",
    header: "dd",
  },
];

class LandingPage extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  state = {
    isLoading: false,
  };
  onLogin = async (e) => {
    this.setState({
      isLoading: true,
    });
    var login = await auth.loginWithToken()
    if (!login) {
      window.location.replace("/login-page");
    }
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
            <>
              (
              <section className="section section-shaped">
                <div className="shape shape-style-1 shape-default">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <Container className="py-md">
                  <Row className="justify-content-between align-items-center">
                    <Col className="mb-5 mb-lg-0" lg="5">
                      <h1 className="text-white font-weight-light">
                        Thực tế ảo tăng cường
                      </h1>
                      <p className="lead text-white mt-4">
                        Nền tảng AR cung cấp các công cụ (zero coding) giúp tăng
                        tính tương tác, trải nghiệm khách tham quan dựa trên
                        công nghệ thực tế ảo tăng cường
                      </p>
                      <Button
                        className="btn-neutral btn-icon mt-4"
                        color="primary"
                        onClick={this.onLogin}
                      >
                        <span className="btn-inner--icon mr-1">
                          <i class="fa fa-sign-in" aria-hidden="true"></i>
                        </span>
                        <span className="btn-inner--text"> Đăng nhập</span>
                      </Button>
                    </Col>
                    <Col className="mb-lg-auto" lg="6">
                      <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                        <UncontrolledCarousel items={items} />
                      </div>
                    </Col>
                  </Row>
                </Container>
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                  >
                    <polygon
                      className="fill-white"
                      points="2560 0 2560 100 0 100"
                    />
                  </svg>
                </div>
              </section>
              )
              <Download />
            </>
          )}
        </main>
      </>
    );
  }
}

export default LandingPage;
