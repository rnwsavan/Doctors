import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Doctor from "./Containers/Doctors/Doctor";
import Medicine from "./Containers/Medicine/Medicine";
import { Provider } from 'react-redux';
import { configureStore } from "./Redux/Store";
import Counter from "./Containers/Counter/Counter";
import { PersistGate } from 'redux-persist/integration/react'
import PromisesExample from "./Containers/PromisesExamples/PromisesExample";
import HookExample from "./Containers/HookExample/HookExample";
import UseCallBack from "./Containers/UseCallExample/UseCallBack";
import TaskContextProvider from "./Containers/TaskOfContext/TaskContextProvider";


function App() {

  const { store, persistor } = configureStore();
  return (
    <>
      <TaskContextProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Switch>
                <Route exact path={"/Medicine"} component={Medicine} />
                <Route exact path={"/Doctor"} component={Doctor} />
                <Route exact path={"/counter"} component={Counter} />
                <Route exact path={"/Promise_Example"} component={PromisesExample} />
                <Route exact path={"/memo_Example"} component={HookExample} />
                <Route exact path={"/usecallback_Example"} component={UseCallBack} />   


              </Switch>
            </Layout>
          </PersistGate>
        </Provider>
      </TaskContextProvider>
    </>
  );
}

export default App;
