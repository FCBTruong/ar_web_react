import React from "react";
import user from "apis/user";
import { Card, Row, Col, Input, Button } from "reactstrap";
import ArtifactEditor from "views/examples/ArtifactEditor";
class ModelsView extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    console.log("ggg", user.getData().assets);
  }

  changeFileHandler = (e) => {
    var file = e.target.files[0];
    user.addAsset3D(file).then((e) => {
      if (e) {
        // TODO later
      } else {
      }

      this.setState({});
    });
  };

  close = (e) => {
    window.ArtifactEditor.closeTabs()
  };

  render() {
    return (
      <main>
        <Input
          type="file"
          name="file"
          id="exampleFile"
          onChange={this.changeFileHandler}
        />
        <Button
          className="mt-4"
          color="primary"
          href="#pablo"
          onClick={this.close}
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </Button>

        <Row className="justify-content-center">
          <Col lg="12">
            <Row className="row-grid">
              {user.userData.assets.map((asset, index) => {
                return (
                  <Card
                    className="shadow border-0 mt-4 ml-2"
                    style={{ width: 250 }}
                  >
                    <p>{asset.url}</p>
                    <p>{asset.id}</p>
                  </Card>
                );
              })}
            </Row>
          </Col>
        </Row>
      </main>
    );
  }
}

export default ModelsView;
