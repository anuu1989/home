import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <h1 className="display-4 text-danger mb-4">
                  <i className="fas fa-exclamation-triangle"></i> Oops!
                </h1>
                <h2 className="h4 mb-3">Something went wrong</h2>
                <p className="lead mb-4">
                  We're sorry, but something unexpected happened. Please try refreshing the page.
                </p>
                <button
                  className="btn btn-primary btn-lg me-3"
                  onClick={() => window.location.reload()}
                >
                  <i className="fas fa-refresh"></i> Refresh Page
                </button>
                <button
                  className="btn btn-outline-secondary btn-lg"
                  onClick={() => (window.location.href = "/")}
                >
                  <i className="fas fa-home"></i> Go Home
                </button>
                {process.env.NODE_ENV === "development" && (
                  <details className="mt-4 text-start">
                    <summary className="btn btn-outline-info btn-sm">
                      Show Error Details (Development)
                    </summary>
                    <div className="mt-3 p-3 bg-light border rounded">
                      <h5>Error:</h5>
                      <pre className="text-danger small">
                        {this.state.error && this.state.error.toString()}
                      </pre>
                      <h5>Stack Trace:</h5>
                      <pre className="text-muted small">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;