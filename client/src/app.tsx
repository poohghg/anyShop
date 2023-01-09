import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getClient } from "./queryClient";
import { ThemeProvider } from "styled-components";
import { Theme } from "./style/them";
import GlobalStyle from "./style/globalStyle";
import { Provider } from "react-redux";
import store, { persistor, RootState } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

import "./style/fonts.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const element = useRoutes(routes);
  const queryClient = getClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <QueryClientProvider client={queryClient}>
            {element}
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer
              className="toast"
              position="bottom-center"
              autoClose={1000}
              hideProgressBar={true}
              pauseOnHover={false}
              newestOnTop={true}
              closeOnClick={true}
              closeButton={true}
            />
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
