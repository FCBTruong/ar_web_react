// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Badge,
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import utilities from "utilities/utilities";
import artifactMgr from "apis/artifact_mgr";

export default function ArtifactCard(props) {
  const onClickArtifact = (e, artifact) => {
    console.log("on click artifact", artifact);
    artifactMgr.openEditor(artifact.id);
  };
  return (
    <Card
      className="card-lift--hover shadow border-0 "
      style={{ width: 300 }}
      onClick={(e) => {
        onClickArtifact(e, props.artifact);
      }}
    >
      <CardBody className="py-3" style={{ height: 400 }}>
        <Row>
          <h6 className="text-primary text-uppercase mx-auto">
            {props.artifact.name}
          </h6>
        </Row>
        <img
          alt="..."
          className="img-fluid rounded shadow-lg img-center"
          src={
            props.artifact.image
              ? props.artifact.image
              : require("assets/img/theme/team-3-800x800.jpg")
          }
          style={{ width: "100%" }}
        />
        <p className="description mt-3">
          {utilities.subStr(props.artifact.description, 150)}
        </p>
      </CardBody>
    </Card>
  );
}
