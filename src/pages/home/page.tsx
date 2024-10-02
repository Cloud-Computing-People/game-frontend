import Link from "../../components/link";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-xl font-bold">The Microservice Game</h1>
                </div>
                <div className="text-sm">
                    Created by <span className="text-red-500">the CCP</span>{" "}
                    <span className="text-sm text-muted-foreground">
                        (cloud computing people)
                    </span>
                </div>
                <div className="flex justify-between py-3 px-6 bg-slate-100">
                    <Link to={`game`}>Play</Link>
                    <Link to={`shop`}>Shop</Link>
                    <Link to={`profile`}>Customize</Link>
                </div>
            </div>
        </div>
    );
}
