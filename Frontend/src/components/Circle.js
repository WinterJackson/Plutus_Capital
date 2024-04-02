const CircleProgressBar = ({ done, total }) => {
  const percentage = (done / total) * 100;
  const strokeDasharray = `${percentage}, 100`;

  return (
    <div className="circle-progress-bar">
      <svg width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="transparent"
          stroke="#f0f0f0"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="transparent"
          stroke="#007bff"
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
        />
      </svg>
      <div className="text">
        {done}/{total}
      </div>
    </div>
  );
};

export default CircleProgressBar;
