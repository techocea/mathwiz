"use client";

const Snowfall = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <div className="snow-layer snow-layer-1" />
            <div className="snow-layer snow-layer-2" />
            <div className="snow-layer snow-layer-3" />

            <style jsx>{`
        .snow-layer {
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(12px 12px at 100px 50px, #bfdbfe, transparent),
            radial-gradient(16px 16px at 300px 250px, #60a5fa, transparent),
            radial-gradient(10px 10px at 500px 100px, #93c5fd, transparent),
            radial-gradient(14px 14px at 700px 200px, #bfdbfe, transparent),
            radial-gradient(12px 12px at 200px 450px, #60a5fa, transparent),
            radial-gradient(15px 15px at 600px 350px, #93c5fd, transparent),
            radial-gradient(10px 10px at 800px 500px, #bfdbfe, transparent);
          background-size: 1000px 1000px;
          animation: snow linear infinite;
          filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.4));
        }

       .snow-layer-1 {
          animation-duration: 12s;
          opacity: 0.7;
        }

        .snow-layer-2 {
          animation-duration: 18s;
          opacity: 0.4;
          margin-left: 80px;
          filter: blur(1px) drop-shadow(0 0 3px rgba(96, 165, 250, 0.3));
        }

        .snow-layer-3 {
          animation-duration: 25s;
          opacity: 0.2;
          margin-left: -80px;
          filter: blur(3px);
        }

        @keyframes snow {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
        </div>
    );
};

export default Snowfall;
