import Link from "../../components/link";
import GameScreen from "./components/game-screen";

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center">
            <div className="mt-8 flex items-center flex-col gap-6">
                <div>
                    <Link to={`/`}>Back to home</Link>
                </div>
                <GameScreen />
            </div>
        </div>
    );
}
