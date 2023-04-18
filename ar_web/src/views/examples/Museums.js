import React, { useState } from "react";

// reactstrap components
import { CardBody, Container, Row, Col, Badge } from "reactstrap";
import HomeNavbar from "components/Navbars/HomeNavBar";
import CreateMuseumForm from "components/Forms/CreateMuseumForm";
import user from "apis/user";
import { HashLoader } from "react-spinners";
import utilities from "utilities/utilities";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Popper from "@mui/material/Popper";
import Card from "@mui/material/Card";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";

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
      isLoading: false,
    });
  };

  doneDeleteMuseum = (e) => {
    this.setState({
      isLoading: false,
    });
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
                                      <MuseumCard museum={museum} key={index} />
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

function MuseumCard(props) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const anchorRef = React.useRef < HTMLButtonElement > null;
  const [isHovered, setIsHovered] = useState(false);

  var openMuseum = (e) => {
    history.push("/museums-page");
    localStorage.setItem("current_museum_id", props.museum.id);
    window.location.replace("/artifacts-page");
  };

  var openOptions = (e, museum) => {
    setOpen(true);
  };

  var deleteMuseum = (e) => {
    handleClose(e);
    user.deleteMuseum(props.museum.id);
    this.handleClose();
  };

  var editMuseum = (e) => {
    handleClose(e);
    history.push("/museums-page");
    window.location.replace("/museum-edit-page");
  };

  const handleClose = (event) => {
    event.stopPropagation();
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleMouseEnter = () => {
    console.log("hhhh");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Col lg="12 mb-5">
      <Card
        style={{
          height: "auto",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardContent>
          <IconButton
            style={{
              border: "none",
              outline: "none",
            }}
            aria-label="more"
            id="long-button"
            aria-haspopup="true"
            onClick={(e) => {
              e.stopPropagation();
              openOptions(e, props.museum);
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Popper
            open={open}
       
            placement="bottom"
   
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={deleteMuseum}>Xóa</MenuItem>
                  <MenuItem onClick={editMuseum}>Sửa</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
          <h5
            className="text-primary text-uppercase mx-auto"
            style={{
              textAlign: "center",
            }}
          >
            {props.museum.name}
          </h5>
          <p className="description mt-3">
            {props.museum.introduction
              ? utilities.subStr(props.museum.introduction, 200)
              : "empty"}
          </p>
          <img
            alt="..."
            className="img-fluid rounded shadow-lg mx-auto"
            src={
              props.museum.image
                ? props.museum.image
                : require("assets/img/museum/museum_bg_0.jpeg")
            }
            style={{ width: "100%" }}
            onClick={openMuseum}
          />
         
          {isHovered ? (
            <div>
             DKM
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Col>
  );
}

export default Museums;
