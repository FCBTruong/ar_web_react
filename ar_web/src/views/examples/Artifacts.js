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

function Model(props) {
  const { scene } = useGLTF(require("assets/models/bmw_8_3d_model.glb"));
  return <primitive object={scene} {...props} />;
}

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

  onClickArtifact = (e, artifact) => {
    console.log("on click artifact", artifact);
    artifactMgr.openEditor(artifact.id);
  };

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
        {this.state.isLoading ? 
         <div
         style={{
             position: 'absolute', left: '50%', top: '50%',
             transform: 'translate(-50%, -50%)'
         }}
         >
         <HashLoader color="#36d7b7" />
       </div>
         
         : (
          <div>
            <ArtifactsNavBar></ArtifactsNavBar>
            <section className="section section-shaped section-lg">
              {this.state.isCreatingArtifact ? (
                <CreateArtifactForm museumId={this.state.museum.id} />
              ) : (
                <Container>
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <Row className="row-grid">
                        {this.state.museum.artifacts.map((artifact, index) => {
                          return (
                            <Col lg="4 mb-4">
                              <Card
                                className="card-lift--hover shadow border-0 "
                                style={{ width: 300 }}
                                onClick={(e) => {
                                  this.onClickArtifact(e, artifact);
                                }}
                              >
                                <CardBody
                                  className="py-5"
                                  style={{ height: "auto" }}
                                >
                                  <h6 className="text-primary text-uppercase">
                                    {artifact.name}
                                  </h6>
                                  <img
                                    alt="..."
                                    className="img-fluid rounded shadow-lg"
                                    src={
                                      artifact.image
                                        ? artifact.image
                                        : require("assets/img/theme/team-3-800x800.jpg")
                                    }
                                    style={{ width: "150px" }}
                                  />
                                  <p className="description mt-3">
                                    {artifact.description}
                                  </p>
                                </CardBody>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                  </Row>
                </Container>
              )}
            </section>
          </div>
        )}
      </main>
    );
  }
}

export default Artifacts;
