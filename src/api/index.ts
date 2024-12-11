import { Game } from "../types/game";
import { getUserFromSession } from "../util/get-user";

export async function saveGame(gameData: Game) {
    const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;
    const user = await getUser();

    const body = { ...gameData, userId: user.id };
    const token = localStorage.getItem("session");
    const res = await fetch(`${marketplaceApi}/marketplace/play_game`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
        throw { error: await res.json() };
    }
    return await res.json();
}

export async function getUserBalance() {
    const userApi = import.meta.env.VITE_USER_API;
    const user = await getUser();
    const token = localStorage.getItem("session");

    const res = await fetch(`${userApi}/users/${user.id}/balance`, {
        signal: AbortSignal.timeout(5000),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw { error: await res.json() };

    return await res.json();
}

export async function buyItem(itemId: number) {
    const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;
    const user = await getUser();

    const body = {
        user_id: user.id,
        item_id: itemId,
    };

    const token = localStorage.getItem("session");

    const res = await fetch(`${marketplaceApi}/marketplace/buy_item`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem("session");

    const res = await fetch(`${userApi}/users?email=${email}`, {
        signal: AbortSignal.timeout(5000),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw { error: await res.json() };

    const users = await res.json();
    const user = users.data.find((u) => u.email === email);
    if (!user) {
        throw {
            error: "Your profile has not been created. Please reach out to CCP.",
        };
    }
    return user;
}

// export async function createUser() {
//     const userApi = import.meta.env.VITE_USER_API;
//     // @ts-expect-error: Email should exist on the token
//     const { email } = getUserFromSession();

//     const body = {
//         username: "totally-not-darth-vader",
//         email: email,
//         isAdmin: false,
//     };
//     const res = await fetch(`${userApi}/users`, {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//         },
//         signal: AbortSignal.timeout(5000),
//     });

//     if (!res.ok) throw { error: await res.json() };
// }

export async function getUserItems() {
    const user = await getUser();
    const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;
    const token = localStorage.getItem("session");

    const res = await fetch(`${marketplaceApi}/marketplace/${user.id}/items`, {
        signal: AbortSignal.timeout(5000),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
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
    const token = localStorage.getItem("session");
    const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;
    const res = await fetch(
        `${marketplaceApi}/marketplace/items?user_id=${user.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            signal: AbortSignal.timeout(5000),
        }
    );
    if (!res.ok) throw { error: await res.json() };

    const items = await res.json();

    // @ts-expect-error We don't have a DTO type for what comes back from DB yet
    const mappedItems = items.data.map((item) => ({
        ...item,
        transferable: item.transferable === 1,
    }));
    return mappedItems;
}
