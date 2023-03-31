import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Badge,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

class ArtifactProperties extends React.Component {
  render() {
    return (
      <div>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 'auto', flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          <TreeItem nodeId="1" label="General">
            <div>
              <p>Position</p>
              <div class="row">
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>X</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Y</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Z</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
              </div>
            </div>
            <div>
              <p>Rotation</p>
              <div class="row">
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>X</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Y</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Z</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
              </div>
            </div>
            <div>
              <p>Scale</p>
              <div class="row">
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>X</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Y</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
                <div class="col">
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Z</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="" type="number" />
                  </InputGroup>
                </div>
              </div>
            </div>
          </TreeItem>
        </TreeView>
      </div>
    );
  }
}

export default ArtifactProperties;
