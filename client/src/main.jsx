import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './features/store.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
     <App />
  </ChakraProvider>
     </QueryClientProvider>
  </Provider>
  
  </BrowserRouter>
  
  </StrictMode>,
)
