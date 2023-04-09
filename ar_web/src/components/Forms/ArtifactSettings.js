import React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { HashLoader } from "react-spinners";
import artifactMgr from "apis/artifact_mgr";
import { Box } from "@material-ui/core";

export default function ArtifactSettings(props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const askForRemove = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRemove = () => {
    setLoading(true);
    artifactMgr.removeArtifact(props.museumId, props.artifact.id);
    handleClose();
  };

  return (
    <div>
      {isLoading ? (
        <Box height="100">
          <div>
            <HashLoader color="#36d7b7" />
          </div>
        </Box>
      ) : (
        <div>
          <Button variant="outlined" color="secondary" onClick={askForRemove}>
            Xóa
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Xóa hiện vật?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có chắc muốn xóa không?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button onClick={onRemove}>Đồng ý</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}
