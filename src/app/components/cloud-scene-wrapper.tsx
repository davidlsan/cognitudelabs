'use client';

import dynamic from 'next/dynamic';

const CloudScene = dynamic(() => import('./cloud-scene'), {
  ssr: false,
});

export default function CloudSceneWrapper({ onReady }: { onReady?: () => void }) {
  return (
    <div className="w-full h-full">
      <CloudScene onReady={onReady} />
    </div>
  );
}
