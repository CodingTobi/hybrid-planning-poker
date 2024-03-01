import CardDeck from "@/components/CardDeck";

export default function Test() {

  const cards = [ 
    { cardName: 'card_0', cardValue: '0' },
    { cardName: 'card_1', cardValue: '1' },
    { cardName: 'card_2', cardValue: '2' },
    { cardName: 'card_3', cardValue: '3' },
    { cardName: 'card_5', cardValue: '5' },
    { cardName: 'card_8', cardValue: '8' },
    { cardName: 'card_13', cardValue: '13' },
    { cardName: 'card_20', cardValue: '20' },
    { cardName: 'card_40', cardValue: '40' },
    { cardName: 'card_100', cardValue: '100' },
    { cardName: 'card_inf', cardValue: '♾️' },
    { cardName: 'card_pause', cardValue: '☕' },
    { cardName: 'card_unkn', cardValue: '❓' },
  ];

  return (
    <div className="bg-slate-400 h-screen">
      <h1>Hybrid Planning Poker</h1>
      <p>A hybrid planning poker app for remote teams</p>
      <CardDeck cards={cards}/>
    </div>
  );
}
 