const WaveDivider = () => {
  return (
    <div className="relative -mt-40 z-10 pointer-events-none">
      <svg
        viewBox="0 0 1440 150"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C180,120 360,140 540,110 C720,80 900,20 1080,40 C1200,52 1320,90 1440,96 L1440,150 L0,150 Z"
          className="fill-latte-100"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
