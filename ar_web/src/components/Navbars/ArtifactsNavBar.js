import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";

function ArtifactsNavBar(props) {
  const history = useHistory()
  var onBack = (e) => {
    window.location.replace("/museums-page");
  };

  return (
    <>
      {/* Navbar primary */}
      <Navbar
        className="navbar-horizontal navbar-dark bg-primary mt-0"
        expand="lg"
      >
        <Container>
          <IconButton
            edge="start"
            style={{ color: "white" }}
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
            {props.museum.name ? props.museum.name : ""}
          </NavbarBrand>
          <button
            aria-controls="navbar-primary"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-primary"
            data-toggle="collapse"
            id="navbar-primary"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-primary">
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img alt="..." src={require("assets/img/brand/blue.png")} />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-primary"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-primary"
                    data-toggle="collapse"
                    id="navbar-primary"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-lg-auto" navbar>
              <NavItem>
                <NavLink
                  onClick={(e) => {
                    window.Artifacts.createArtifact();
                  }}
                >
                  Create <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ArtifactsNavBar;
