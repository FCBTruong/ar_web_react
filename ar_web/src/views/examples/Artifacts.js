import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import user from "apis/user";
import ArtifactsNavBar from "components/Navbars/ArtifactsNavBar";
import CreateArtifactForm from "components/Forms/CreateArtifactForm";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import artifactMgr from "apis/artifact_mgr";
import { ClipLoader, HashLoader } from "react-spinners";
import utilities from "utilities/utilities";
import { Box } from "@mui/system";
import ArtifactCard from "components/Forms/ArtifactCard";
import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

class Artifacts extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    var museumId = localStorage.getItem("current_museum_id");

    user.requestData().then((s) => {
      this.setState({ museum: user.getMuseumById(museumId) });
    });

    this.state = {
      isCreatingArtifact: false,
      isLoading: false,
      museum:
        museumId && user.getData()
          ? user.getMuseumById(museumId)
          : {
              artifacts: [],
            },

      search: "",
    };
  }

  createArtifact = (e) => {
    this.setState({ isCreatingArtifact: true });
  };

  setLoading = (e) => {
    this.setState({ isLoading: true });
  };

  clearLoading = (e) => {
    this.setState({ isLoading: false });
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
          <Box sx={{ height: "100vh", bgcolor: "#fcfbfa" }}>
            <ArtifactsNavBar museum={this.state.museum}></ArtifactsNavBar>
            <section className="section section-shaped">
              {this.state.isCreatingArtifact ? (
                <CreateArtifactForm museumId={this.state.museum.id} />
              ) : (
                <Container>
                  {this.state.museum.artifacts.length === 0 ? (
                    <div>
                      <h5 className="text-center">
                        Bạn không có hiện vật nào trưng bày
                      </h5>
                      <br />
                      <Button
                        onClick={this.createArtifact}
                        className="center"
                        variant="contained"
                        style={{
                          border: "none",
                          outline: "none",
                          minWidth: "100px",
                        }}
                      >
                        Tạo mới
                      </Button>
                    </div>
                  ) : (
                    <div>
                       <Toolbar>
                        <SearchIcon />
                        <TextField
                          variant="standard"
                          placeholder="Search"
                          sx={{ mr: 2 }}
                          onChange={(e) => {
                            this.setState({ search: e.target.value });
                          }}
                        />
                      </Toolbar>
                      <br />
                    <Row className="justify-content-center">
                      <Col lg="12">
                        <Row className="row-grid">
                          {
                            // Filter artifacts
                            this.state.museum.artifacts.filter((artifact) => {
                              return (
                                artifact.name
                                  .toLowerCase()
                                  .indexOf(this.state.search.toLowerCase()) !==
                                  -1
                              );
                            })                
                          .map((artifact) => {
                            return (
                              <ArtifactCard
                                artifact={artifact}
                                museumId={this.state.museum.id}
                              />
                            );
                          }
                          )}
                        </Row>
                      </Col>
                    </Row>
                    </div>
                  )}
                </Container>
              )}
            </section>
          </Box>
        )}
      </main>
    );
  }
}

export default Artifacts;
