/* eslint-disable @typescript-eslint/no-explicit-any */
import EditorJS from "@editorjs/editorjs";
import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { EDITOR_JS_TOOLS } from "../utils/tools";
import {
  createNotePageApi,
  getPagesApi,
  updateNoteApi,
  softDeletePageApi,
} from "../api/index";
import { toast } from "react-toastify";

const usePage = () => {
  const [page, setPage] = useState<any>({});
  const [pages, setPages] = useState<any>([]);
  const history = useHistory();
  const ejInstance: any = useRef();
  const { id } = useParams<{ id: string }>();
  const [menuEnabled, setMenuEnabled] = useState(true);

  const toggleMenu = () => {
    setMenuEnabled(!menuEnabled);
  };

  useEffect(() => {
    if (id) {
      const pageData = pages.find((page: any) => page._id === id);
      setPage(pageData);
    }
  }, [id, pages]);

  useEffect(() => {
    getPagesApi()
      .then((r) => {
        setPages(r);
      })
      .catch(() => {
        toast.error("Cannot load pages");
      });
  }, []);

  useEffect(() => {
    if (page && page._id) {
      const editor: any = new EditorJS({
        holder: `editorjs-container-${page._id}`,
        tools: EDITOR_JS_TOOLS,
        data: page.note as any,
        onReady: () => {
          ejInstance.current = editor;
        },
        autofocus: true,
        onChange: async () => {
          const content = await editor.saver.save();
          const updatedPage = { ...page, note: content };
          setPages(
            pages.map((p: any) => (p._id === page._id ? updatedPage : p))
          );
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
          updateNoteApi(updatedPage)
            .then(() => {
              setPages(
                pages.map((p: any) => (p._id === page._id ? updatedPage : p))
              );
              toast.success("Saving successfully");
            })
            .catch((error: any) => {
              toast.error(`Saving failed: ${error}`);
            });
        })
        .catch((error: any) => {
          toast.error(`Saving failed: ${error}`);
        });
    }
  };

  const addPage = async (parentId: any) => {
    const newPageName = prompt("Enter the new page:");
    if (newPageName) {
      const newPageObject: any = {
        noteName: newPageName,
        parentId: parentId,
        active: false,
        note: { blocks: [] },
      };
      createNotePageApi(newPageObject)
        .then((pageRes: any) => {
          toast.success("Create page successfully");
          newPageObject._id = pageRes.insertedId;
          setPages([...pages, newPageObject]);
        })
        .catch(() => {
          toast.error("Cannot create page");
        });
    }
  };

  const toggle = (page: any) => {
    const updatedPage = { ...page, active: !page.active };
    setPages(pages.map((p: any) => (p._id === page._id ? updatedPage : p)));
  };

  const deletePage = (pageId: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this page?"
    );
    if (confirmDelete) {
      return softDeletePageApi(pageId)
        .then(() => {
          setPages(pages.filter((p: any) => p._id !== pageId));
          if (page._id === pageId) {
            setPage({});
            if (ejInstance.current) {
              ejInstance.current.clear();
            }
          }
          toast.success("Page deleted");
        })
        .catch(() => {
          toast.error("Cannot delete");
        });
    }
  };

  const handlePageClick = (page: any) => {
    setPage(page);
    history.replace(`/page/${page._id}`);
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
    handlePageClick,
  };
};

export default usePage;
