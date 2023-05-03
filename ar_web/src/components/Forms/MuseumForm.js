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
import { Box, Stack, InputLabel } from "@mui/material";

import user from "apis/user";
import museumsMgr from "apis/museums_mgr";
import classnames from "classnames";
import { HashLoader } from "react-spinners";
import ImageIcon from "@mui/icons-material/Image";

class MuseumForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameFocused: false,
      name: props.museum ? props.museum.name : "",
      introduction: props.museum ? props.museum.introduction : "",
      address: props.museum ? props.museum.address : "",
      imageUrl: props.museum ? props.museum.imageUrl : "",
      mode: this.props.mode ? this.props.mode : "create",
      isLoadingImage: false,
      isLoading: false,
      openingTime: props.museum ? props.museum.openingTime : "",
    };
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeIntroduction = (e) => {
    this.setState({ introduction: e.target.value });
  };

  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  onChangeOpeningTime = (e) => {
    this.setState({ openingTime: e.target.value });
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

  updateMuseum = (e) => {
    if (this.props.museum) {
      // update
      this.setState({
        isLoading: true,
      });
      var updateMuseum = { ...this.props.museum };
      updateMuseum.name = this.state.name;
      updateMuseum.address = this.state.address;
      updateMuseum.introduction = this.state.introduction;
      updateMuseum.imageUrl = this.state.imageUrl;
      updateMuseum.openingTime = this.state.openingTime;
      museumsMgr.update(this.props.museum.id, updateMuseum).then(() => {
        this.setState({
          isLoading: false,
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
    if (this.props.mode === "create") {
      if (window.Museums) {
        window.Museums.setState({
          isCreating: false,
        });
      }
    } else {
      window.location.replace("/museums-page");
    }
  };

  requestPublish = async (e) => {
    if (this.props.museum) {
      // update
      this.setState({
        isLoading: true,
      });
      await museumsMgr.requestPublish(this.props.museum)

      this.setState({
        isLoading: false,
      })
    }
  }


  render() {
    return (
      <div>
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
                          value={this.state.name}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <div>
                        {this.state.isLoadingImage ? (
                          <div>
                            <HashLoader color="#36d7b7" />
                          </div>
                        ) : (
                          <div>
                            <Input
                              id="image-input"
                              type="file"
                              accept=".png, .jpg, .jpeg,"
                              onChange={this.changeImageHandler}
                              style={{ display: "none" }}
                            />
                            <label htmlFor="image-input">
                              <Button component="span" variant="contained">
                                Chọn ảnh
                              </Button>
                            </label>
                            {this.state.imageUrl && (
                              <img
                                src={this.state.imageUrl}
                                alt="Preview"
                                style={{ width: "100%" }}
                              />
                            )}
                          </div>
                        )}
                      </div>
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
                        value={this.state.introduction}
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
                        value={this.state.address}
                      />
                    </InputGroup>
                    {this.state.mode === "update" && (
                      <div>
                        <br />
                        <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i class="fa fa-clock-o" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Thời gian mở cửa"
                          type="text"
                          onFocus={(e) => this.setState({ nameFocused: true })}
                          onBlur={(e) => this.setState({ nameFocused: false })}
                          onChange={this.onChangeOpeningTime}
                          value={this.state.openingTime}
                        />
                      </InputGroup>
                      </div>
                    )}
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
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Stack direction="row" spacing={2}>
                              <Button
                                variant="contained"
                                style={{
                                  minWidth: "100px",
                                  backgroundColor: "#1E90FF",
                                  "&:hover": {
                                    backgroundColor: "#0066CC",
                                  },
                                  color: "white",
                                  outline: "none",
                                }}
                                onClick={this.updateMuseum}
                              >
                                Lưu
                              </Button>

                              <Button
                                variant="contained"
                                style={{
                                  minWidth: "100px",
                                  backgroundColor: "#1E90FF",
                                  "&:hover": {
                                    backgroundColor: "#0066CC",
                                  },
                                  color: "white",
                                  outline: "none",
                                }}
                                onClick={this.requestPublish}
                              >
                                Yêu cầu duyệt
                              </Button>
                            </Stack>
                          </Box>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
export default MuseumForm;
