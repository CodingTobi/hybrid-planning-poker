import CardDeck from "@/components/CardDeck";
import { cards_default } from "@/utils/cardDecks";

export default function Test() {

  return (
    <div className="bg-slate-400 h-screen">
      <h1>Hybrid Planning Poker</h1>
      <p>A hybrid planning poker app for remote teams</p>
      <CardDeck cards={cards_default}/>
    </div>
  );
}
 