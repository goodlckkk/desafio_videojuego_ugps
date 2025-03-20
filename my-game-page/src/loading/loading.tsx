const LoadingSpinner = () => {
  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const loadingSpinnerStyle = {
    border: "16px solid #f3f3f3",
    borderTop: "16px solid #3498db",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite",
  };

  const keyframesStyle = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

  return (
    <div style={spinnerContainerStyle}>
      <style>{keyframesStyle}</style>
      <div style={loadingSpinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
