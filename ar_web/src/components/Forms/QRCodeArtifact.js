import { Box } from "@material-ui/core";
import QRCode from "react-qr-code";
import artifactMgr from "apis/artifact_mgr";
import { useState } from "react";
import { Stack } from "@mui/material";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/system";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import DownloadIcon from '@mui/icons-material/Download';

function QRCodeArtifact(props) {
  const [hoveredQRCode, setHoveredQRCode] = useState(false);

  function handleQRCodeMouseEnter() {
    setHoveredQRCode(true);
  }

  function handleQRCodeMouseLeave() {
    setHoveredQRCode(false);
  }

  function downloadQRCode() {
    const svg = document.getElementById("qr-gen");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = props.artifact.name + "_" + props.artifact.id;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }
  return (
    <div>
      <Box
        sx={{
          border: "1px solid black",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        onMouseEnter={handleQRCodeMouseEnter}
        onMouseLeave={handleQRCodeMouseLeave}
      >
        <QRCode
          className="py-3 px-3 img-center"
          id="qr-gen"
          size={150}
          viewBox={`0 0 256 256`}
          value={artifactMgr.getUrlArtifact(props.museumId, props.artifact.id)}
        ></QRCode>
        {hoveredQRCode && (
          <Box
            position="absolute"
            display="flex"
            width={150}
            height={150}
            alignItems="center"
            direction="column"
            justifyContent="center"
            sx={{
              backgroundColor: alpha("#000000", 0.5),
            }}
          >
            <Button
              className="btn-round justify-content-center"
              type="button"
              onClick={downloadQRCode}
              style={{
                border: "none",
                outline: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DownloadIcon sx={
                  {
                    color: "white",
                  }
                } />
                <Typography sx={{ color: "white", textTransform: "none" }}>
                  Tải xuống
                </Typography>
              </Box>
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default QRCodeArtifact;
