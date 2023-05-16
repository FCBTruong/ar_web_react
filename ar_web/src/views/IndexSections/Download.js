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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

import {
  GooglePlayButton,
  AppStoreButton,
  ButtonsContainer,
} from "react-mobile-app-button";

class Download extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3">
                  <span className="text-success"></span>
                </h2>
                <p className="lead">
                  Tải ứng dụng trên Google Play hoặc Apple Store, để bắt đầu
                  trải nghiệm thực tế ảo AR.
                </p>
                <div
                  className="btn-wrapper"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <ButtonsContainer class="center">
                    <GooglePlayButton
                      url={"https://drive.google.com/file/d/1ue50O5HGvfG7J_LrijG8ztzDElm_-7Xd/view?usp=share_link"}
                      theme={"light"}
                      className={"custom-style"}
                    />
                    <AppStoreButton
                      url={"https://drive.google.com/file/d/1ue50O5HGvfG7J_LrijG8ztzDElm_-7Xd/view?usp=share_link"}
                      theme={"light"}
                      className={"custom-style"}
                    />
                  </ButtonsContainer>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Download;
