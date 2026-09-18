import { createRoot } from 'react-dom/client';

import NewApp from './NewApp';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

createRoot(document.getElementById('root')!, {
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <NewApp />
  </ErrorBoundary>,
);
