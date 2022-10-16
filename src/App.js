import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthorizationPage from "./components/pages/AuthorizationPage";
import HomePage from "./components/pages/HomePage";
import { paths } from "./paths";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.authorization} element={<AuthorizationPage />} />
        {/* <Route path={`${paths.client}/:id`} element={<СlientPage />} /> */}
        {/* <Route path={paths.createClient} element={<CreateClient />} /> */}
        {/* <Route path={paths.editClient} element={<EditClient />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;