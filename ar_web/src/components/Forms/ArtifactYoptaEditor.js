import { YoptaEditor } from "yopta-editor";
import { useState, useEffect } from "react";

import user from "apis/user";
import s from "./styles.module.scss";
import "yopta-editor/dist/index.css";

const onChangeMedia = async (file, type) => {
  const { url, data } = await user.uploadToCloudinary(file, type);
  return { url, options: data };
};

const media = {
  imageProps: {
    onChange: (file) => onChangeMedia(file, "image"),
    accept: "image/*",
  },
  videoProps: {
    onChange: (file) => onChangeMedia(file, "video"),
  },
};

function ArtifactYoptaEditor(props) {
  console.log("artifact...---", props.artifact);
  const [editorValue, setEditorValue] = useState([]);
 
  useEffect(() => {
    props.artifact.data = editorValue;
  });


  return (
    <div className={s.container}>
      <YoptaEditor
        value={editorValue}
        onChange={(val) => setEditorValue(val)}
        className={s.editor}
        media={media}
        shouldStoreInLocalStorage={{ name: "localStorage-name" }}
      />
    </div>
  );
}

export default ArtifactYoptaEditor;
