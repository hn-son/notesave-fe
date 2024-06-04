import { IonApp, setupIonicReact } from "@ionic/react";
import "./App.css";
import React from "react";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import Page from "./components/Page";
import "./App.css";
import "./theme/variables.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

setupIonicReact();
const App: React.FC = () => {
  return (
    <IonApp>
      <Router>
          <Route exact={true} path="/page/:menuId" component={Page} />
          <Redirect exact from="/" to="/page" />
          <Route path="*" render={() => <Page />} />
      </Router>
    </IonApp>
  );
};

export default App;
