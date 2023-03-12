import { Context } from "hono";

const getSession = async (c: Context) => {
    const session_id = c.env.SESSION_ID
    let session
    try {
        session = await c.env.IGCONFIG.get(session_id, 'json')
    } 
    catch {
    }
    return session
}

const putSession = async (c: Context, session: any) => {
    const session_id = c.env.SESSION_ID
    try {
        await c.env.IGCONFIG.put(session_id, JSON.stringify(session))
        return true
    } 
    catch { 

    }
    return false
}

function getMultipleRandom(arr:any, num:number) {
    console.log({arr, num})
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
}

const randomSession = async (c: Context) => {
    const sessionId = c.env.SESSION_ID
    let sessionCount = c.env.SESSION_COUNT
    let randomSession
    try {
        const session = await c.env.IGCONFIG.get(sessionId, 'json')
        if (session.length) {
            randomSession = getMultipleRandom(session, sessionCount)
        }
    } catch {
        console.log(`ERROR : INVALID SESSION KV '${sessionId}'`)        
    }
    return randomSession
}

export const SessionModel = {
    getSession,
    putSession,
    randomSession
}

export default SessionModel 