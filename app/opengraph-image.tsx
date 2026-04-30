import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CadeauAura - Meaningful Gifts for Every Emotion';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#160606',
          color: '#fff7ef',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18% 20%, rgba(243,201,130,0.28), transparent 28%), radial-gradient(circle at 82% 18%, rgba(143,20,49,0.55), transparent 34%), linear-gradient(135deg, #160606 0%, #4b0d18 52%, #160606 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 360,
            height: 360,
            right: -80,
            bottom: -90,
            borderRadius: 999,
            border: '18px solid rgba(215,162,93,0.38)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 220,
            height: 220,
            left: -48,
            top: -58,
            borderRadius: 999,
            border: '14px solid rgba(255,247,239,0.12)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '76px 90px',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              color: '#f3c982',
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ fontSize: 42 }}>✦</span>
            CadeauAura
          </div>

          <div
            style={{
              marginTop: 34,
              maxWidth: 850,
              fontSize: 78,
              lineHeight: 0.98,
              letterSpacing: '-0.055em',
              fontWeight: 700,
            }}
          >
            Meaningful Gifts for Every Emotion
          </div>

          <div
            style={{
              marginTop: 28,
              maxWidth: 790,
              fontSize: 30,
              lineHeight: 1.35,
              color: '#f6dfd0',
              fontFamily: 'sans-serif',
            }}
          >
            Premium gifting ideas inspired by emotion, culture and connection.
          </div>

          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 42,
              fontFamily: 'sans-serif',
              fontSize: 22,
              color: '#4b0d18',
              fontWeight: 700,
            }}
          >
            <div
              style={{
                background: '#f3c982',
                borderRadius: 999,
                padding: '14px 24px',
              }}
            >
              Gift Finder
            </div>

            <div
              style={{
                background: '#fff7ef',
                borderRadius: 999,
                padding: '14px 24px',
              }}
            >
              Premium Collections
            </div>

            <div
              style={{
                background: '#fff7ef',
                borderRadius: 999,
                padding: '14px 24px',
              }}
            >
              WhatsApp Enquiry
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
