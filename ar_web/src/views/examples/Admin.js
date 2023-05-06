import React, { useEffect, useState } from "react";
import admin from "apis/admin";
import { Tab, Tabs } from "@mui/material";
import TabPane from "reactstrap/lib/TabPane";
import TabContent from "reactstrap/lib/TabContent";
import { HashLoader } from "react-spinners";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

function Admin() {
  const [plainTabs, setPlainTabs] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(admin.data);

  var toggleTabs = (e, index) => {
    e.preventDefault();
    setPlainTabs(index);
  };

  useEffect(() => {
    setLoading(true);
    admin.getAdminData().then((res) => {
      console.log(res);
      setData(admin.data);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      <div className="container-xl mt-2 mr-5 ml-5">
        <h3>Admin</h3>
        <div>
          <Tabs
            value={plainTabs}
            onChange={toggleTabs}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            orientation="horiontal"
          >
            <Tab
              label="Pending"
              style={{
                border: "none",
                outline: "none",
              }}
            />
            <Tab
              label="Published"
              style={{
                border: "none",
                outline: "none",
              }}
            />
          </Tabs>
        </div>
        <div>
          {isLoading ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "45%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <HashLoader color="#36d7b7" />
            </div>
          ) : (
            <div>
              <TabContent activeTab={"plainTabs" + plainTabs} className="mt-1">
                <TabPane tabId="plainTabs0">
                  <br />
                  <div>
                    {data != null
                      ? data.pendingMuseums.map((pendingMuseum, index) => {
                          return (
                            <div>
                              <MuseumAdminCard
                                museumPost={pendingMuseum}
                                isPending={true}
                                setData={setData}
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                </TabPane>
                <TabPane tabId="plainTabs1">
                  <br />
                  <div>
                    {data != null
                      ? data.publicizedMuseums.map((publishedMuseum, index) => {
                          return (
                            <div>
                              <MuseumAdminCard
                                museumPost={publishedMuseum}
                                isPending={false}
                                setData={setData}
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                </TabPane>
              </TabContent>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const MuseumAdminCard = (props) => {
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();
  var museum = props.museumPost.museum;

  var onAccept = () => {
    setLoading(true);
    admin.acceptPendingMuseum(props.museumPost.userId).then((res) => {
      props.setData(admin.data);
      setLoading(false);
    });
  };

  var onReject = () => {
    setLoading(true);
    admin.rejectPendingMuseum(props.museumPost.userId).then((res) => {
      console.log(res);
      props.setData(admin.data);
      setLoading(false);
    });
  };

  var onDelete = () => {
    setLoading(true);
    admin.deletePublishedMuseum(props.museumPost.userId).then((res) => {
      console.log(res);
      props.setData(admin.data);
      setLoading(false);
    });
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <Card sx={{ border: "1px solid black" }}>
          <CardContent>
            <CardMedia
              component="img"
              style={{ maxHeight: 200, width: "auto" }}
              image={
                museum.imageUrl ??
                "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
              }
              alt="My Image"
            />
            <Typography gutterBottom variant="h5" component="div">
              {museum.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {museum.openingTime ?? "no opening time"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {museum.address ?? "no address"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {museum.introduction ?? "no introduction"}
            </Typography>
          </CardContent>
          {props.isPending ? (
            <CardActions className={classes.cardActions}>
              <Button onClick={onAccept} color="success" variant="contained">
                Accept
              </Button>
              <Button onClick={onReject} color="error" variant="contained">
                Reject
              </Button>
            </CardActions>
          ) : (
            <CardActions className={classes.cardActions}>
              <Button onClick={onDelete} color="error" variant="contained">
                Delete
              </Button> 
            </CardActions>
          )}
        </Card>
      )}
    </div>
  );
};
export default Admin;
