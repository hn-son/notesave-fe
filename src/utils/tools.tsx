/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import EditorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import Attaches from "@editorjs/attaches";
import Checklist from "@editorjs/checklist";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import Table from "@editorjs/table";
import Video from "@mrhoho/editor-js-video";
import NestedList from '@editorjs/nested-list';
// import Twitter from "twitter-embed-editorjs-plugin";
import { uploadFile } from "../api/index";
import { toast } from "react-toastify";
import { getDownloadURL, ref, storage } from "./firebase";

export const EDITOR_JS_TOOLS = {
  table: Table,
  marker: Marker,
  code: CodeTool,
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: 'http://localhost:3001/api/v1/fetchUrl', // Your backend endpoint for url data fetching,
    }
  },
  raw: Raw,
  quote: Quote,
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: {
    class: InlineCode,
    shortcut: "CTRL+SHIFT+M",
  },
  header: {
    class: Header,
    inlineToolbar: ["link"],
  },
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered'
    },
  },
  // twitter: {
  //   class: Twitter
  // },
  nestedchecklist: EditorjsNestedChecklist,
  embed: {
    class: Embed,
    inlineToolbar: false,
    config: {
      services: {
        youtube: true,
        twitter: true,
      },
    },
  },

  attaches: {
    class: Attaches,
    config: {
      uploader: {
        async uploadByFile(file: any) {
          const formData = new FormData();
          formData.append("file", file);
          return uploadFile(formData)
            .then(async (res) => {
              const fileRef = ref(storage, res.data.url);
              const fileUrl = await getDownloadURL(fileRef);
              return {
                success: 1,
                file: {
                  url: fileUrl,
                  title: res.data.title,
                  size: res.data.size,
                  extension: res.data.extension,
                },
              };
            })
            .catch((e) => toast.error(`Upload failed: ${e}`));
        },
      },
    },
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file: any) {
          const formData = new FormData();
          formData.append("file", file);
          return uploadFile(formData)
            .then(async (res) => {
              const imageRef = ref(storage, res.data.url);
              const url = await getDownloadURL(imageRef);
              return {
                success: 1,
                file: {
                  url: url,
                },
              };
            })
            .catch((e) => toast.error(`Upload failed: ${e}`));
        },
      },
    },
  },
  video: {
    class: Video,
    config: {
      uploader: {
        async uploadByFile(file: any) {
          const formData = new FormData();
          formData.append("file", file);
          return uploadFile(formData)
            .then(async (res) => {
              const videoRef = ref(storage, res.data.url);
              const url = await getDownloadURL(videoRef);
              return {
                success: 1,
                file: {
                  url: url,
                },
              };
            })
            .catch((e) => toast.error(`Upload failed: ${e}`));
        },
      },
    },
  },
};

async function compressImage(file: any) {
  debugger;
  let img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d") as any;

  if (img.naturalWidth > 1920 || img.naturalHeight > 1920) {
    if (img.naturalWidth > img.naturalHeight) {
      canvas.width = 1920;
      canvas.height = (1920 / img.naturalWidth) * img.naturalHeight;
    } else {
      canvas.height = 1920;
      canvas.width = (1920 / img.naturalHeight) * img.naturalWidth;
    }
  } else {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
  }

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  let compressedFile: any = await new Promise((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.5);
  });

  compressedFile = new File([compressedFile], file.name, {
    type: "image/webp",
  });

  return compressedFile;
}
