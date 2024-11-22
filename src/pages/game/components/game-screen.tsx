// We can implement a super basic game with DOM
// But ideally replace this with a canvas element

// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCountdown } from "../../../hooks";
import { useNavigate } from "react-router";
import { Game } from "../../../types/game";

async function saveGame(gameData: Game) {
    console.log("MAKING API REQUEST TO: gameservice");
    const gamesApi = import.meta.env.VITE_GAMES_API;
    const res = await fetch(`${gamesApi}/games`, {
        method: "POST",
        body: JSON.stringify(gameData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await res.json();
}

export default function GameScreen() {
    // const queryClient = useQueryClient();
    // const mutation = useMutation({
    //     mutationFn: saveGame,
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries({
    //             queryKey: ["profile", "leaderboard"],
    //         });
    //     },
    // });
    const navigate = useNavigate();
    const { countdown, endCountdown, completed } = useCountdown(5, {
        onFinish: () => {
            saveGame({
                userId: 2,
                score: 100,
                acquiredCurrency: 5.0,
                timeStamp: "2024-09-27T00:00:00",
            });
            // console.log("THIS KEEPS RUNNING");
            // mutation.mutate({
            //     userId: 1,
            //     score: 100,
            //     acquiredCurrency: 200,
            //     timeStamp: "2024-10-02 10:18:28",
            // });
        },
    });

    // if (mutation.isError) {
    //     return "LOADING";
    // }

    return (
        <div className="bg-slate-100 min-h-[500px] min-w-[500px] flex items-center justify-center">
            {completed ? (
                <div className="flex p-8 flex-col items-center gap-6">
                    <h3 className="text-lg font-semibold">
                        Thank you for playing!
                    </h3>
                    <p>Your score was: 100</p>
                    <p>You earned: $5</p>
                    <button
                        onClick={() => navigate(0)}
                        className="border-2 bg-green-500 px-2 py-1 text-white"
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                <div className="flex p-8 flex-col items-center gap-6">
                    <h3 className="text-lg font-semibold">
                        Welcome to the Game
                    </h3>
                    <p>Your game will end in {countdown} seconds</p>
                    <button
                        onClick={endCountdown}
                        className="border-2 bg-red-500 px-2 py-1 text-white"
                    >
                        End Game
                    </button>
                </div>
            )}
        </div>
    );
}
