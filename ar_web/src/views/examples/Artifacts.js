import React from "react";

// reactstrap components
import { Button, Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import user from "apis/user";
import ArtifactsNavBar from "components/Navbars/ArtifactsNavBar"
import CreateArtifactForm from "components/Forms/CreateArtifactForm"
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

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
      museum:
        museumId && user.getUserData()
          ? user.getMuseumById(museumId)
          : {
              artifacts: [],
            },
    };
  }

  onClickArtifact = (e, artifact)=>{
    console.log("on click artifact", artifact)
    localStorage.setItem('current_artifact_id', artifact.id)
    window.location.replace("/artifact-editor-page");
  }

  createArtifact = (e)=>{
    this.setState({isCreatingArtifact: true})
  }

  render() {
    return (
      <main ref="main">
        <ArtifactsNavBar></ArtifactsNavBar>
        <section className="section section-shaped section-lg">
          {
            this.state.isCreatingArtifact ? <CreateArtifactForm museumId = {this.state.museum.id}/> :
          (<Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  {this.state.museum.artifacts.map((artifact, index) => {
                    return (
                      <Col lg="4 mb-4">
                        <Card
                          className="card-lift--hover shadow border-0 "
                          style={{ width: 300 }}
                          onClick={(e)=>{this.onClickArtifact(e, artifact)}}
                        >
                          <CardBody className="py-5" style={{ height: 300 }}>
                            <h6 className="text-primary text-uppercase">
                              {artifact.name}
                            </h6>
                            <Canvas
                    dpr={[1, 2]}
                    shadows
                    camera={{ fav: 45 }}
                    style={{ position: "absolute" }}
                  >
                    <PresentationControls
                      speed={1.5}
                      global
                      zoom={1}
                      polar={[-0.1, Math.PI / 4]}
                    >
                      <Stage environment={null}>
                      <Model scale={0.08} />
                      </Stage>
                    </PresentationControls>
                  </Canvas>
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
          </Container>)
  }
        </section>
      </main>
    );
  }
}

export default Artifacts;
