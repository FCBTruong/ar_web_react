import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { HashLoader } from "react-spinners";
import artifactMgr from "apis/artifact_mgr";
import { Box } from "@material-ui/core";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import { Input as InputMUI } from "@mui/material";
// reactstrap components
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  disabledButton: {
    pointerEvents: "none",
    opacity: 1,
    // any other styles you want to apply to the disabled button can go here
    "&.Mui-disabled": {

    },
  },
});

export default function ArtifactSettings(props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [description, setDescription] = useState(props.artifact.description);
  const [name, setName] = useState(props.artifact.name);
  const [image, setImage] = useState(props.artifact.image);

  const classes = useStyles();

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

  const changeImageHandler = async (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    setLoading(true)
    var url = await artifactMgr.uploadImage(props.museumId, props.artifact.id, file);
    props.artifact.image = url;
    setImage(url);
    setLoading(false)
  };

  const onChangeDescription = (e) => {
    props.artifact.description = e.target.value;
    setDescription(e.target.value);
  };

  const onChangeName = (e) => {
    props.artifact.name = e.target.value;
    setName(e.target.value);
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
          <h6>Thông tin sẽ hiển thị công khai</h6>
          <br />
          <div>
            <InputMUI
              id="image-input"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={changeImageHandler}
              style={{ display: "none" }}
            />
            <label htmlFor="image-input">
              <Button
                variant="contained"
                sx={{ outline: "none" }}
                className={classes.disabledButton}
              >
                Chọn ảnh
              </Button>
            </label>
          </div>
          <div>
            {image && (
              <img
                src={image}
                alt="Preview"
                style={{ maxWidth: "600px" }}
              />
            )}
          </div>
          <br />
          <div style={{ maxWidth: "600px" }}>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Tên hiện vật"
                type="text"
                onChange={onChangeName}
                value={name}
              />
            </InputGroup>
            <br />
            <FormGroup className="mb-4">
              <Input
                className="form-control-alternative"
                cols="80"
                name="name"
                placeholder="Giới thiệu ngắn về bảo tàng"
                rows="4"
                type="textarea"
                onChange={onChangeDescription}
                value={description}
              />
            </FormGroup>
          </div>
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
