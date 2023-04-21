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
} from "reactstrap";
import MuseumIcon from "@mui/icons-material/Museum";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Button } from "@material-ui/core";
import { Box } from "@mui/material";

import user from "apis/user";
import museumsMgr from "apis/museums_mgr";
import classnames from "classnames";
import { HashLoader } from "react-spinners";

class MuseumForm extends React.Component {
  state = {
    nameFocused: false,
    name: "",
    introduction: "",
    address: "",
    imageUrl: "",
    mode: "create",
    isLoadingImage: false,
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeIntroduction = (e) => {
    this.setState({ introduction: e.target.value });
  };

  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  changeImageHandler = (e) => {
    if (e.target.files) {
      this.setState({
        isLoadingImage: true,
      });
      user.uploadFile(e.target.files[0]).then((url) => {
        this.setState({
          imageUrl: url,
          isLoadingImage: false,
        });
      });
    }
  };

  create = (e) => {
    if (this.state.name === "" || this.state.introduction === "") {
      alert("Bạn chưa nhập thông tin");
      console.log("name or intruction is empty");
    } else {
      museumsMgr.createMuseum({
        name: this.state.name,
        introduction: this.state.introduction,
        address: this.state.address,
        imageUrl: this.state.imageUrl,
      });

      window.Museums.setState({
        isLoading: true,
      });
    }
  };
  onClose = (e) => {
    window.Museums.setState({
      isCreating: false,
    });
  };

  render() {
    return (
      <Container>
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={this.onClose}
          style={{ outline: "none" }}
        >
          <CloseIcon />
        </IconButton>
        <br />
        <br />
        <Row className="justify-content-center mt--0">
          <Col lg="8">
            <Card className="bg-gradient-secondary shadow">
              <CardBody className="p-lg-5">
                <h5
                  style={{
                    textAlign: "center",
                  }}
                >
                  Nhập thông tin bảo tàng
                </h5>
                <FormGroup
                  className={classnames("mt-5", {
                    focused: this.state.nameFocused,
                  })}
                >
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <MuseumIcon />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Tên bảo tàng"
                      type="text"
                      onFocus={(e) => this.setState({ nameFocused: true })}
                      onBlur={(e) => this.setState({ nameFocused: false })}
                      onChange={this.onChangeName}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <div>
                    {" "}
                    {this.state.isLoadingImage ? (
                      <div>
                        <HashLoader color="#36d7b7" />
                      </div>
                    ) : null}
                  </div>
                  <Input
                    type="file"
                    name="file"
                    id="exampleFile"
                    accept=".jpg,.png,.jpeg"
                    onChange={this.changeImageHandler}
                  ></Input>
                </FormGroup>{" "}
                <FormGroup className="mb-4">
                  <Input
                    className="form-control-alternative"
                    cols="80"
                    name="name"
                    placeholder="Giới thiệu ngắn về bảo tàng"
                    rows="4"
                    type="textarea"
                    onChange={this.onChangeIntroduction}
                  />
                </FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Địa chỉ"
                    type="text"
                    onFocus={(e) => this.setState({ nameFocused: true })}
                    onBlur={(e) => this.setState({ nameFocused: false })}
                    onChange={this.onChangeAddress}
                  />
                </InputGroup>
                <div>
                  <br />
                  {this.state.mode === "create" ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        onClick={this.create}
                        style={{
                          minWidth: "100px",
                          backgroundColor: "#1E90FF",
                          "&:hover": {
                            backgroundColor: "#0066CC",
                          },
                          color: "white",
                          outline: "none",
                        }}
                      >
                        Tạo
                      </Button>
                    </Box>
                  ) : (
                    <div>
                      <Button variant="contained" style={{ outline: "none" }}>
                        Lưu
                      </Button>
                      <Button variant="contained" style={{ outline: "none" }}>
                        Live
                      </Button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default MuseumForm;
