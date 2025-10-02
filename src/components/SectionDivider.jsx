import React from 'react';

const SectionDivider = ({ 
  type = 'wave', 
  fromGradient = 'linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%)', 
  toGradient = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  height = '120px',
  className = ''
}) => {
  const dividerStyles = {
    wave: (
      <div className="gradient-divider wave-divider">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ width: '100%', height: height }}
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(224, 195, 252, 0.8)" />
              <stop offset="50%" stopColor="rgba(155, 181, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 236, 210, 0.8)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(224, 195, 252, 0.6)" />
              <stop offset="100%" stopColor="rgba(252, 182, 159, 0.6)" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(155, 181, 255, 1)" />
              <stop offset="100%" stopColor="rgba(252, 182, 159, 1)" />
            </linearGradient>
          </defs>
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="url(#waveGradient1)"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            fill="url(#waveGradient2)"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="url(#waveGradient3)"
          />
        </svg>
      </div>
    ),
    
    diagonal: (
      <div className="gradient-divider diagonal-divider">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ width: '100%', height: height }}
        >
          <defs>
            <linearGradient id="diagonalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(79, 172, 254, 1)" />
              <stop offset="100%" stopColor="rgba(0, 242, 254, 1)" />
            </linearGradient>
          </defs>
          <polygon 
            fill="url(#diagonalGradient)" 
            points="1200,0 0,0 0,120"
          />
        </svg>
      </div>
    ),
    
    curve: (
      <div className="gradient-divider curve-divider">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ width: '100%', height: height }}
        >
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(67, 233, 123, 1)" />
              <stop offset="50%" stopColor="rgba(56, 249, 215, 0.8)" />
              <stop offset="100%" stopColor="rgba(67, 233, 123, 1)" />
            </linearGradient>
          </defs>
          <path 
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" 
            fill="url(#curveGradient)"
          />
        </svg>
      </div>
    ),
    
    zigzag: (
      <div className="gradient-divider zigzag-divider">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ width: '100%', height: height }}
        >
          <defs>
            <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(250, 112, 154, 1)" />
              <stop offset="50%" stopColor="rgba(254, 225, 64, 0.8)" />
              <stop offset="100%" stopColor="rgba(250, 112, 154, 1)" />
            </linearGradient>
          </defs>
          <polygon 
            fill="url(#zigzagGradient)" 
            points="0,0 0,120 60,120 120,0 180,120 240,0 300,120 360,0 420,120 480,0 540,120 600,0 660,120 720,0 780,120 840,0 900,120 960,0 1020,120 1080,0 1140,120 1200,0 1200,120 0,120"
          />
        </svg>
      </div>
    ),
    
    dots: (
      <div className="gradient-divider dots-divider">
        <div 
          style={{ 
            width: '100%', 
            height: height, 
            background: `linear-gradient(135deg, rgba(168, 237, 234, 1) 0%, rgba(254, 214, 227, 1) 100%)`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ display: 'flex', gap: '15px' }}>
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="floating-dot"
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  animation: `floatDot 3s ease-in-out infinite ${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),

    gradient: (
      <div className="gradient-divider pure-gradient">
        <div 
          style={{ 
            width: '100%', 
            height: height, 
            background: `linear-gradient(135deg, ${fromGradient.split('(')[1].split(')')[0]} 0%, ${toGradient.split('(')[1].split(')')[0]} 100%)`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="gradient-overlay"></div>
        </div>
      </div>
    ),

    morphing: (
      <div className="gradient-divider morphing-divider">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ width: '100%', height: height }}
        >
          <defs>
            <linearGradient id="morphingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(240, 147, 251, 1)" />
              <stop offset="25%" stopColor="rgba(245, 87, 108, 0.8)" />
              <stop offset="50%" stopColor="rgba(79, 172, 254, 0.9)" />
              <stop offset="75%" stopColor="rgba(0, 242, 254, 0.8)" />
              <stop offset="100%" stopColor="rgba(67, 233, 123, 1)" />
            </linearGradient>
          </defs>
          <path 
            className="morphing-path"
            d="M0,0V60c100,40 200,-40 300,20c100,60 200,-20 300,40c100,60 200,-40 300,20c100,60 200,-20 300,40V0Z" 
            fill="url(#morphingGradient)"
          />
        </svg>
      </div>
    )
  };

  return (
    <div 
      className={`section-divider ${className}`}
      style={{ 
        background: fromGradient,
        margin: 0,
        padding: 0,
        lineHeight: 0,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {dividerStyles[type]}
    </div>
  );
};

export default SectionDivider;