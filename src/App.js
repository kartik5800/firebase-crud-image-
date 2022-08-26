
import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Doctor from "./Container/Doctor";
import Layout from "./Component/Layout/Layout";
import { Provider } from "react-redux"
import { configureStore } from "./redux/Store";


function App() {
  const store = configureStore()
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path={'/Doctor'} exact component={Doctor} />
          </Switch>
        </Layout>
      </Provider>
    </>


  );
}

export default App;


