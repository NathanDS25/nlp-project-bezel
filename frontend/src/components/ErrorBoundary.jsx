import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="eth-card" style={{
          padding: '2.5rem',
          textAlign: 'center',
          maxWidth: '680px',
          margin: '3rem auto',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          background: 'rgba(239, 68, 68, 0.03)'
        }}>
          <AlertCircle size={36} color="#ef4444" style={{ margin: '0 auto 1rem auto' }} />
          <h2 className="heading-hero" style={{ fontSize: '1.4rem', color: '#f87171', marginBottom: '0.5rem' }}>
            {this.props.tabName || 'Component'} Render Notice
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
            {this.state.error?.message || 'An unexpected rendering error occurred in this section.'}
          </p>
          <button
            onClick={this.handleReset}
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
          >
            <RotateCcw size={14} /> Retry View
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
