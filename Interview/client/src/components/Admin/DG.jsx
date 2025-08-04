import React from 'react';

const DG = () => (
  <div className="w-full flex flex-col items-center py-4">
    <img
      src="/dg_logo.jpg"
      alt="DG Liger Logo"
      className="w-20 h-20 object-contain mb-2"
    />

    <div className="text-4xl font-bold mb-1">DGLiger</div>

    <div
      className="text-4xl font-extrabold tracking-widest mb-1"
      style={{
        background: 'linear-gradient(90deg, #ff0057, #fffa00, #00ff94, #00cfff, #a100ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      ____________
    </div>

    <div className="text-lg font-medium text-gray-700 text-center">
      Your <b>Partner</b> in <b>Digital</b> Journey
    </div>
  </div>
);

export default DG;
