import Image from 'next/image';
import Logo from '@/public/HPP-Logo.png';
import QrCode from '@/components/QrCode';

export default function Home() {

  return (
    <div className="bg-slate-400 h-screen flex flex-col items-center">
      <div className="mt-32">
        <h1 className="text-2xl w-[7rem] px-1 text-center border border-red-300">Hybrid</h1>
        <h1 className="text-2xl ml-[7rem] w-[7rem] px-1 text-center border border-red-300">Planning</h1>
        <h1 className="text-2xl ml-[14rem] w-[7rem] px-1 text-center border border-red-300">Poker</h1>
        <Image className="absolute bottom-0 left-0 w-[7rem]" src={Logo} alt="Logo" width={1000} height={1000} />
      </div>
      <p>A hybrid planning poker app for remote teams</p>
      <QrCode className='bg-gradient-radial from-yellow-400 to-black border border-white text-black text-xl p-12' buttonText="Open da qr code" qrDialogTitle="dis some title" link="google.de"/>
    </div>
  );
}
