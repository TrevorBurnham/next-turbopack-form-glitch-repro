import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

interface Props {
  serverTime: string;
}

export default function Home({ serverTime }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    console.log('Hydration complete!');
    setHydrated(true);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Hydration Glitch Reproduction</h1>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0' }}>
        <h2>Form Field Test</h2>
        <p>Try typing in the field below immediately after page load:</p>
        
        {/* This input will be replaced during hydration due to the mismatch */}
        <div>
          <label htmlFor="test-input">
            Test Input:
          </label>
          <input
            autoFocus
            id="test-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Start typing..."
            style={{
              marginLeft: '1rem',
              padding: '0.5rem',
              fontSize: '1rem',
              width: '300px'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      serverTime: new Date().toISOString(),
    },
  };
};
