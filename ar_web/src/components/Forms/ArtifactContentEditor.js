import { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "components/customize-editorjs/paragraph";
import Input from "reactstrap/lib/Input";
import user from "apis/user";
import ImageTool from "@editorjs/image";
import AudioTool from "components/customize-editorjs/audio";
import VideoTool from "@weekwood/editorjs-video";
import Embed from "@editorjs/embed";

function ArtifactContentEditor(props) {
  console.log("artifact...---", props.artifact);
  const editorInstance = useRef();

  try {
    var parsedDt = JSON.parse(props.artifact.information);
    console.log("parsed ", parsedDt);
  } catch (e) {
    console.log("exception with content data", e);
    props.artifact.information = "{}";
  }

  const initEditor = () => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: "editorjs",

      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            spellcheck: false,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            captionPlaceholder: '',
            uploader: {
              /**
               * Upload file to the server and return an uploaded image data
               * @param {File} file - file selected from the device or pasted by drag-n-drop
               * @return {Promise.<{success, file: {url}}>}
               */
              uploadByFile(file) {
                // your own uploading logic here
                return user.uploadFile(file).then((link) => {
                  return {
                    success: 1,
                    file: {
                      url: link,
                      // any other image data you want to store, such as width, height, color, extension, etc
                    },
                  };
                });
              },

              /**
               * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
               * @param {string} url - pasted image URL
               * @return {Promise.<{success, file: {url}}>}
               */
              uploadByUrl(url) {
                // TODO later
              },
            },
          },
          inlineToolbar: true,
        },
        audio: {
          class: AudioTool,
          config: {
            endpointUrl: "",
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },

        video: {
          class: VideoTool,
          config: {
            uploader: {
              /**
               * Upload file to the server and return an uploaded video data
               * @param {File} file - file selected from the device or pasted by drag-n-drop
               * @return {Promise.<{success, file: {url}}>}
               */
              uploadByFile(file) {
                // your own uploading logic here
                return user.uploadFile(file).then((link) => {
                  return {
                    success: 1,
                    file: {
                      url: link,
                      // any other image data you want to store, such as width, height, color, extension, etc
                    },
                  };
                });
              },

              /**
               * Send URL-string to the server. Backend should load video by this URL and return an uploaded video data
               * @param {string} url - pasted video URL
               * @return {Promise.<{success, file: {url}}>}
               */
              uploadByUrl(url) {},
            },

            player: {
              controls: true,
              autoplay: false,
            },
          },
        },
      },
      onReady: () => {
        console.log("Editor.js is ready to work!");
        editorInstance.current = editor;
      },
      onChange: (api, event) => {
        editor
          .save()
          .then((outputData) => {
            props.artifact.information = JSON.stringify(outputData);
            console.log("on save ...", props.artifact.information);
          })
          .catch((error) => {
            console.log("Saving failed: ", error);
          });
      },
      placeholder: "Hãy bắt đầu viết thông tin về hiện vật",
      data: JSON.parse(props.artifact.information),
      readOnly: user.getData().editMode === "viewing",
    });
  };

  useEffect(() => {
    if (!editorInstance.current) {
      initEditor();
    }
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  });

  return <div id="editorjs" />;
}

export default ArtifactContentEditor;
