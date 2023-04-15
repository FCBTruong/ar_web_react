import React from "react";

// reactstrap components
import { Button, Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
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
          <Box sx={{height: '100vh', bgcolor: '#cfe8fc'}}>
            <ArtifactsNavBar museum={this.state.museum}></ArtifactsNavBar>
            <section className="section section-shaped">
              {this.state.isCreatingArtifact ? (
                <CreateArtifactForm museumId={this.state.museum.id} />
              ) : (
                <Container>
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <Row className="row-grid">
                        {this.state.museum.artifacts.map((artifact, index) => {
                          return (
                            <Col lg="4 mb-4" key={index}>
                              <ArtifactCard artifact={artifact}/>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                  </Row>
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
