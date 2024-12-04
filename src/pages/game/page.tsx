import Link from "../../components/link";
import GameScreen from "./components/game-screen";

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center">
            <div className="mt-8 flex items-center flex-col gap-6">
                <div>
                    <Link to={`/`}>Back to home</Link>
                </div>
                <div className="bg-slate-100 min-h-[500px] min-w-[500px] flex items-center justify-center">
                    <GameScreen />
                </div>
            </div>
        </div>
    );
}
