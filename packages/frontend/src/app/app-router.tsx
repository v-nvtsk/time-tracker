import {
  BrowserRouter, Route, Routes
} from "react-router";
import {Layout} from "./layout";
import {
  ActivityPage, AuthPage, CategoryPage, MainPage
} from "./pages";
import {Promo} from "./pages/main-page/promo";
import {ReportPage} from "./pages/report-page";
import {ResourcePage} from "./pages/resource-page";

export const AppRouter = ({
  isLoading, isAuthenticated
}:{
  isLoading: boolean,
  isAuthenticated: boolean,
}) => {

  return (
    <BrowserRouter basename='/'>
      {!isAuthenticated && !isLoading && <Routes>
        <Route path="/" element={<Promo />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      }
      {isAuthenticated && !isLoading &&
    <Layout>
      <Routes>
        <Route path="/" element={<ReportPage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/activity' element={<ActivityPage />} />
        <Route path='/resource' element={<ResourcePage />} />
        <Route path='/report' element={<ReportPage />} />
      </Routes>
    </Layout>}
    </BrowserRouter>
  );
};