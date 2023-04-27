// reactstrap components
import { Card, CardBody, Container, Row } from "reactstrap";
import utilities from "utilities/utilities";
import artifactMgr from "apis/artifact_mgr";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Popper from "@mui/material/Popper";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { ClickAwayListener } from "@mui/material";
import { Button } from "@mui/material";

export default function ArtifactCard(props) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const onClickArtifact = (e, artifact) => {
    console.log("on click artifact", artifact);
    history.push("/artifacts-page");
    artifactMgr.openEditor(artifact.id);
  };

  const askForRemove = (e) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      artifactMgr.removeArtifact(props.museumId, props.artifact.id);
    }
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
  return (
    <Card
      className="shadow border-0 mr-2 ml-2 mb-4"
      style={{ width: 300 }}
      onClick={(e) => {
        onClickArtifact(e, props.artifact);
      }}
    >
      <CardBody className="py-3" style={{ height: 400 }}>
        <IconButton
          ref={anchorRef}
          style={{
            border: "none",
            outline: "none",
          }}
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <MoreVertIcon />
        </IconButton>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom"
          style={{ zIndex: 9999 }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem>
                  <Button
                    variant="outlined"
                    href="#outlined-buttons"
                    sx={{
                      minWidth: "100px",
                      borderColor: "red",
                      color: "red",
                      borderRadius: "10px",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "red",
                        color: "white",
                      },
                    }}
                    onClick={askForRemove}
                  >
                    Xóa
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="outlined"
                    href="#outlined-buttons"
                    sx={{
                      minWidth: "100px",
                      borderColor: "black",
                      color: "black",
                      borderRadius: "10px",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "green",
                        color: "white",
                      },
                    }}
                  >
                    Sửa
                  </Button>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>

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
              : require("assets/img/theme/image_default_artifact.jpeg")
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
