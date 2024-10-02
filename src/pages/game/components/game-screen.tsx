// We can implement a super basic game with DOM
// But ideally replace this with a canvas element

// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCountdown } from "../../../hooks";
import { useNavigate } from "react-router";

export default function GameScreen() {
    // const queryClient = useQueryClient();
    // const mutation = useMutation({
    //     mutationFn: postTodo,
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
            // mutation.mutate();
        },
    });

    return (
        <div className="bg-slate-100 min-h-[500px] min-w-[500px] flex items-center justify-center">
            {completed ? (
                <div className="flex p-8 flex-col items-center gap-6">
                    <h3 className="text-lg font-semibold">
                        Thank you for playing!
                    </h3>
                    <p>Your score was: 999</p>
                    <p>You earned: 300$</p>
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
