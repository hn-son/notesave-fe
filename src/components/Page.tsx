/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  addOutline,
  chevronForwardOutline,
  trashOutline,
} from "ionicons/icons";
import usePage from "../hooks/usePage";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import "../styles/page.css";

const Page: React.FC = () => {
  const {
    handlePageClick,
    toggle,
    toggleMenu,
    addPage,
    deletePage,
    saveData,
    menuEnabled,
    pages,
    page,
  } = usePage();

  const renderPage = (item: any, index: any, items: any) => {
    return (
      <li key={index}>
        <div
          className={
            location.pathname.includes(item.id)
              ? "hightlight selectable"
              : "selectable"
          }
          onClick={() => handlePageClick(item)}
        >
          <span className="dropdown-icon">
            {items.some((i: any) => i.parentId === item.id) && (
              <span
                className={`caret ${item.active ? "caret-active" : ""}`}
                onClick={() => {
                  toggle(item);
                }}
              >
                <IonIcon icon={chevronForwardOutline}></IonIcon>
              </span>
            )}
            <span>{item.noteName}</span>
          </span>
          <div className="options">
            <span
              className="plus-icon"
              onClick={() => {
                addPage(item.id);
              }}
            >
              <IonIcon icon={addOutline}></IonIcon>
            </span>
            <span
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the click event on the parent element
                deletePage(item.id);
              }}
            >
              <IonIcon icon={trashOutline}></IonIcon>{" "}
              {/* You might need to import this icon */}
            </span>
          </div>
        </div>
        <ul className={`nested ${item.active ? "active" : ""}`}>
          {items
            .filter((i: any) => i.parentId === item.id)
            .map((child: any, i: any) =>
              renderPage(child, `${index}-${i}`, items)
            )}
        </ul>
      </li>
    );
  };

  return (
    <IonSplitPane when={menuEnabled ? "xs" : ""} contentId="main">
      <IonMenu contentId="main" type="overlay" disabled={!menuEnabled}>
        <IonContent id="ion-content-menu">
          <IonList id="inbox-list" className="menu-container">
            <IonListHeader>My Pages</IonListHeader>
            <ul id="myUL">
              {pages
                .filter((i: any) => i.parentId === null)
                .map((item: any, index: any) => renderPage(item, index, pages))}
            </ul>
            <div className="add-new" onClick={() => addPage(null)}>
              <IonIcon className="caret" icon={addOutline}></IonIcon>Add new
              page
            </div>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false} onClick={toggleMenu} />
            </IonButtons>
            <IonTitle>{page?.noteName}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={saveData}>Save</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {page.id ? (
            <>
              <br />
              <div id={`editorjs-container-${page.id}`} />
            </>
          ) : (
            <div className="placeholder">Choose pages to display note</div>
          )}
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Page;
