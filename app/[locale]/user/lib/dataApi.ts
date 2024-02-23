'use server';
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

export async function listUsers(qry: string) {
    const session = await getServerSession(options)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await fetch(qry, {
        cache: 'no-store', method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + session.user.token,
            'content-type': 'application/json',
        }
    }).then((res) => res.json())
        .then((data) => {
            return data.data;
        })
    return res;
}

export async function storeUser(dataRequest: any) {
    const session = await getServerSession(options)
    try {
        const res = await fetch("https://koperasi-admin.younacosmetic.com/" + process.env.API_USER_STORE, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + session.user.token,
            },
            body: JSON.stringify(dataRequest)
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
        return res;
    } catch (error) {
        let errResponse: any = {
            success: false,
            message: "ini error ", error
        }
        return errResponse
    }
}

export async function updateUser(dataRequest: any) {
    const session = await getServerSession(options)
    try {
        const res = await fetch("https://koperasi-admin.younacosmetic.com/" + process.env.API_USER_UPDATE, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + session.user.token,
            },
            body: JSON.stringify(dataRequest)
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
        return res;
    } catch (error) {
        let errResponse: any = {
            success: false,
            message: "ini error ", error
        }
        return errResponse
    }
}

export async function listContacts(qry: string) {
    const session = await getServerSession(options)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await fetch(qry, {
        cache: 'no-store', method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + session.user.token,
            'content-type': 'application/json',
        }
    }).then((res) => res.json())
        .then((data) => {
            return data.data;
        })
    return res;
}