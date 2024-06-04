/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import EditorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import Attaches from "@editorjs/attaches";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import Table from "@editorjs/table";
import Video from "@mrhoho/editor-js-video";
// import Twitter from "twitter-embed-editorjs-plugin";

export const EDITOR_JS_TOOLS = {
  table: Table,
  marker: Marker,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  header: {
    class: Header,
    inlineToolbar: ['link']
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
        twitter: true
      }
    },
  },
  attaches: {
    class: Attaches,
    config: {
      uploader: {
        async uploadByFile(file: any) {
          let storageRef = firebase.storage().ref();
          let imagesRef = storageRef.child('EditorJS').child('images/' + file.name);
          let metadata = {
            contentType: 'image/jpeg'
          };
          let uploadTask = await imagesRef.put(file, metadata);
          const downloadURL = await uploadTask.ref.getDownloadURL();
          return {
            success: 1,
            file: {
              url: downloadURL
            }
          }
        }
      }
    }
  },
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file: any) {
          debugger
        //   let compressedFile: any = await compressImage(file);
        //   let storageRef = firebase.storage().ref();
        //   let imagesRef = storageRef.child('EditorJS').child('images/' + file.name);
        //   let metadata = {
        //     contentType: 'image/webp'
        //   };
        //   let uploadTask = await imagesRef.put(compressedFile, metadata);
        //   const downloadURL = await uploadTask.ref.getDownloadURL();
        //   return {
        //     success: 1,
        //     file: {
        //       url: downloadURL
        //     }
        //   }
        }
      }
    }
  },
  video: {
    class: Video,
    config: {
      uploader: {
        async uploadByFile(file: any) {
        //   let storageRef = firebase.storage().ref();
        //   let videosRef = storageRef.child('EditorJS').child('videos/' + file.name);
        //   let metadata = {
        //     contentType: 'video/mp4'
        //   };
        //   let uploadTask = await videosRef.put(file, metadata);
        //   const downloadURL = await uploadTask.ref.getDownloadURL();
        //   return {
        //     success: 1,
        //     file: {
        //       url: downloadURL
        //     }
        //   }
        }
      },
      // endpoints: {
      //   byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
      //   byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      // }
    }
  }
}

async function compressImage(file: any) {
  debugger
  let img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise(resolve => {
    img.onload = resolve;
  });

  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d') as any;

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

  let compressedFile: any = await new Promise(resolve => {
    canvas.toBlob(resolve, 'image/webp', 0.5);
  });

  compressedFile = new File([compressedFile], file.name, {
    type: 'image/webp',
  });

  return compressedFile;
}
