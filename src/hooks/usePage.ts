/* eslint-disable @typescript-eslint/no-explicit-any */
import EditorJS from "@editorjs/editorjs";
import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { EDITOR_JS_TOOLS } from "../utils/tools";

const usePage = () => {
  const [page, setPage] = useState<any>({});
  const [pages, setPages] = useState<any>([]);
  const history = useHistory();
  const ejInstance: any = useRef();
  const { id } = useParams<{ id: string }>();
  const [menuEnabled, setMenuEnabled] = useState(true);

  const toggleMenu = () => {
    setMenuEnabled(!menuEnabled)
  }

  useEffect(() => {
    if (id) {
      const pageData = pages.find((page: any) => page.id === id);
      setPage(pageData);
    }
  }, [id, pages]);

  useEffect(() => {
    if (page && page.id) {
      const editor: any = new EditorJS({
        holder: `editorjs-container-${page.id}`,
        tools: EDITOR_JS_TOOLS,
        data: page.note as any,
        onReady: () => {
          const content = editor.saver.save();
          const updatedPage = { ...page, note: content };
          setPages(pages.map((p: any) => (p.id === page.id ? updatedPage : p)));
        },
      });
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [page]);

  const saveData = () => {
    if (ejInstance.current) {
      (ejInstance.current as any)
        .save()
        .then((outputData: any) => {
          const updatedPage = { ...page, note: outputData };
          console.log({ updatedPage });
          setPages(pages.map((p: any) => (p.id === page.id ? updatedPage : p)));
        })
        .catch((error: any) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  const addPage = async (parentId: any) => {
    const newPageName = prompt("Enter the new page:");
    if (newPageName) {
      const newPageObject: any = {
        name: newPageName,
        parentId: parentId,
        active: false,
        note: { blocks: [] },
      };
      setPages([...pages, newPageObject]);
    }
  };

  const toggle = (page: any) => {
    const updatedPage = { ...page, active: !page.active };
    setPages(pages.map((p: any) => p.id === page.id ? updatedPage : p));
  }

  const deletePage = (pageId: any) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this page?");
    if (confirmDelete) {
      setPages(pages.filter((p: any) => p.id !== pageId));
        if (page.id === pageId) {
          setPage({});
          if (ejInstance.current) {
            ejInstance.current.clear();
          }
        }
    }
  };

  const handlePageClick = (page: any) => {
    setPage(page);
    history.replace(`/page/${page.id}`);
  };

  return {
    page,
    pages,
    menuEnabled,
    toggleMenu,
    toggle,
    addPage,
    saveData,
    deletePage,
    handlePageClick
  }
};

export default usePage
