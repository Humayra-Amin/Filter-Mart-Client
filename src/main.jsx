import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </StrictMode>
)
