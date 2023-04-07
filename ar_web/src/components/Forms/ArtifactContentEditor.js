import { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "components/customize-editorjs/paragraph";
import Input from "reactstrap/lib/Input";


function ArtifactContentEditor(props) {
  console.log("artifact...---", props.artifact);

  new EditorJS({
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
    },
    onReady: () => {
      console.log("Editor.js is ready to work!");
    },
    onChange: (api, event) => {
      console.log("Now I know that Editor's content changed!", event);
    },
    placeholder: 'Let`s write an awesome story!'
  });

  useEffect(() => {
    //props.artifact.data = editorValue;
  });

  return <div id="editorjs" />;
}

export default ArtifactContentEditor;
