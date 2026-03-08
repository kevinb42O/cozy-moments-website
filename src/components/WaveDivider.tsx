const WaveDivider = () => {
  return (
    <div className="relative -mt-1 overflow-hidden bg-latte-100">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0L48 8C96 16 192 32 288 42.7C384 53 480 59 576 53.3C672 48 768 32 864 26.7C960 21 1056 27 1152 37.3C1248 48 1344 64 1392 72L1440 80V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
          className="fill-coffee-900/80"
        />
        <path
          d="M0 40L48 44C96 48 192 56 288 58.7C384 61 480 59 576 50.7C672 43 768 27 864 24C960 21 1056 32 1152 42.7C1248 53 1344 64 1392 69.3L1440 75V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V40Z"
          className="fill-latte-100"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
