import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import NotFound from './routes/NotFound';
import { QueryClient, QueryClientProvider } from 'react-query';

// 라우터
const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />, // 자식 컴포넌트들이 "/" 경로에서 <Outlet /> 자리에 렌더링 됨
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <App />
      }
    ]
  }
]);

// QueryClient 인스턴스 생성
const queryClient = new QueryClient(); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* 자식 컴포넌트들이 React Query 기능을 사용할 수 있음 */}
      <RouterProvider router={router} /> {/* 라우팅 설정 */}
    </QueryClientProvider>
  </React.StrictMode>
);


