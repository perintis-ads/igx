import { Context } from "hono";

const getSession = async (c: Context) => {
    const session_id = c.env.SESSION_ID
    const session = await c.env.IGCONFIG.get(session_id, 'json')
    return session
}

const putSession = async (c: Context, data: any) => {
    const session_id = c.env.SESSION_ID
    const session = await c.env.IGCONFIG.get(session_id, 'json')

    

}

const randomSession = async (c: Context) => {

}

export const SessionModel = {
    getSession,
    putSession,
    randomSession
}

export default SessionModel 