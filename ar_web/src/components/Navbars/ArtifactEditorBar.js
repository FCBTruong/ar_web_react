import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import EditContentMenu from "components/Menu/EditContentMenu";
import Row from "reactstrap/lib/Row";

class ArtifactEditorBar extends React.Component {
  onBack = (e) => {
    window.location.replace("/artifacts-page");
  };

  onSaveAndPublish = (e) => {
    window.ArtifactEditor.saveAndPublish();
  };
  render() {
    return (
      <AppBar
        position="fixed"
        sx={{
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <Box height={5}></Box>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="dark"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={this.onBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <Row>
              <Box
                width={130}
                style={{
                  top: "50%",
                  left: "80%",
                  position: "relative",
                }}
              >
                <EditContentMenu />
              </Box>
              <Button
                sx={{
                  top: "50%",
                  left: "80%",
                }}
                onClick={this.onSaveAndPublish}
              >
                Save & publish
              </Button>{" "}
            </Row>
          </Box>
        </Toolbar>
        <Box height={5}></Box>
      </AppBar>
    );
  }
}

export default ArtifactEditorBar;
