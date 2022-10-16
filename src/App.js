import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthorizationPage from "./components/pages/AuthorizationPage";
import CreateClient from "./components/pages/CreateClient/CreateClient";
import HomePage from "./components/pages/HomePage";
import Header from "./components/Header/Header";
import { СlientPage } from "./components/pages/СlientPage/СlientPage";
import { paths } from "./paths";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.authorization} element={<AuthorizationPage />} />
          <Route path={`${paths.client}/:id`} element={<СlientPage />} />
          <Route path={paths.createClient} element={<CreateClient />} />
          {/* <Route path={paths.editClient} element={<EditClient />} /> */}
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;