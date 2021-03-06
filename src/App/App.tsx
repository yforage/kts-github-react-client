import React from "react";

import { Layout } from "antd";
import routes from "config/routes";
import { Redirect, Route, Switch } from "react-router-dom";
import { useQueryStoreInit } from "store/RootStore/hooks/useQueryStoreInit";

import styles from "./App.module.scss";
import ReposSearchPage from "./pages/ReposSearchPage";

const { Content } = Layout;

const App = () => {
  useQueryStoreInit();
  return (
    <Layout>
      <Content>
        <div className={styles.fullViewportHeight}>
          <Switch>
            <Route path={routes.repos.mask} component={ReposSearchPage} />
            <Redirect to={routes.repos.mask} />
          </Switch>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
