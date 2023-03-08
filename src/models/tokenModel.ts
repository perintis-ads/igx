import { Context } from "hono"

const get = async (c: Context) => {
    const data = { token: Array(), default: c.env.TOKEN_DEFAULT }
    const tokenId = c.env.TOKEN_KEY
    try {
        data.token = await c.env.CONFIG.get(tokenId, 'json')
    } catch {
        console.log(`ERROR : INVALID TOKEN JSON KV '${tokenId}'`)        
    }
    return data
}

const put = async (c: Context, newToken: any) => {
    const tokenId = c.env.TOKEN_KEY
    await c.env.CONFIG.put(tokenId, JSON.stringify(newToken))
    return true
}

const randomize = async (c: Context) => {
    const tokenId = c.env.TOKEN_KEY
    const defaultToken = c.env.TOKEN_DEFAULT

    let token = Array()
    try {
        token = await c.env.CONFIG.get(tokenId, 'json')
    } catch {
        console.log(`ERROR : INVALID TOKEN JSON KV '${tokenId}'`)        
    }
    token.push(defaultToken)
    return token
}

export default {
    get,
    put,
    randomize
}