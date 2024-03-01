import type { NextPage } from 'next';
import Image from 'next/image';
import textureImage from '@/public/plywood_diff_4k.jpg';
import Card from '@/components/Card';

// replace with active cards from socket
const items = [
  { cardName: 'card_0', cardValue: 'a' },
  { cardName: 'card_1', cardValue: 'b' },
  { cardName: 'card_2', cardValue: 'c' },
];

const SomePage: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="w-1/2 h-1/2 bg-white shadow-lg border-2 border-gray-300 rounded-2xl overflow-hidden relative">
        <Image src={textureImage} alt="Texture" width={4096} height={4096} className="opacity-50" priority />
        <div className='absolute left-7 right-7 top-7 flex justify-between'>
          {/* IDEE mit filter eigene carte ausblenden und separat anzeigen alternativ anderweillig markieren*/}
          {items.map((item, index) =>
            <Card cardName={item.cardName} cardValue={item.cardValue} isSelected={false} key={index} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SomePage;