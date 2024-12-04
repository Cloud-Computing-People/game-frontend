import { Game } from "../types/game";
import { getUserFromSession } from "../util/get-user";

export async function saveGame(gameData: Game) {
    console.log("MAKING API REQUEST TO: gameservice");
    const gamesApi = import.meta.env.VITE_GAMES_API;
    const user = await getUser();

    const body = { ...gameData, user_id: user.id };
    const res = await fetch(`${gamesApi}/games`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
        throw { error: await res.json() };
    }
    return await res.json();
}

export async function buyItem(itemId: number) {
    const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;
    const user = await getUser();

    const body = {
        user_id: user.id,
        item_id: itemId,
    };

    const res = await fetch(`${marketplaceApi}/marketplace/buy_item`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },

        signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
        throw { error: await res.json() };
    }
    return await res.json();
}

export async function getUser() {
    const userApi = import.meta.env.VITE_USER_API;
    // @ts-expect-error: Email should exist on the token
    const { email } = getUserFromSession();

    const res = await fetch(`${userApi}/users?email=${email}`, {
        signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw { error: await res.json() };

    const user = await res.json();
    // return user;
    return { id: 2 };
}

export async function getUserItems() {
    const user = await getUser();
    const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;

    const res = await fetch(`${marketplaceApi}/marketplace/${user.id}/items`, {
        signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw { error: await res.json() };

    const items = await res.json();

    // @ts-expect-error We don't have a DTO type for what comes back from DB yet
    const mappedItems = items.data.data.map((item) => ({
        ...item,
        transferable: item.transferable === 1,
    }));
    return mappedItems;
}

export async function getShopItems() {
    const user = await getUser();
    const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;
    const res = await fetch(
        `${marketplaceApi}/marketplace/items?user_id=${user.id}`,
        {
            signal: AbortSignal.timeout(5000),
        }
    );
    console.log(res);
    if (!res.ok) throw { error: await res.json() };

    const items = await res.json();

    // @ts-expect-error We don't have a DTO type for what comes back from DB yet
    const mappedItems = items.data.map((item) => ({
        ...item,
        transferable: item.transferable === 1,
    }));
    return mappedItems;
}
