import { ReactNode } from 'react';

interface StatePanelProps {
  loading?: boolean;
  error?: any;
  empty?: boolean;
  success?: boolean;
  children: ReactNode;
}

export default function StatePanel({ loading, error, empty, success, children }: StatePanelProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <h3 className="font-bold">Error</h3>
        <p>{error.message || 'An error occurred'}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No matches found yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try refining your skills or check back later
        </p>
      </div>
    );
  }

  if (success) {
    return <div>{children}</div>;
  }

  return null;
}