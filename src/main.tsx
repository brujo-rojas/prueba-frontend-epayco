import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import { HomePage } from './components/organisms/HomePage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
};

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

// Check if root already exists to prevent multiple createRoot calls
type ContainerWithReactRoot = HTMLElement & { _reactRootContainer?: ReturnType<typeof createRoot> };
const containerWithRoot = container as ContainerWithReactRoot;
let root = containerWithRoot._reactRootContainer;
if (!root) {
  root = createRoot(containerWithRoot);
  containerWithRoot._reactRootContainer = root;
}


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
