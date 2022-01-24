import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const singleComicLayout = lazy(() =>
  import('../pages/singleComicLayout/SingeComicLayout')
);
const singleCharacterLayout = lazy(() =>
  import('../pages/singleCharacterLayout/SingleCharacterLayout')
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/react-marvel-project" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={singleCharacterLayout}
                    dataType="character"
                  />
                }
              />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={singleComicLayout} dataType="comic" />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
