import { Context } from "hono";

const getDomain = async (c: Context) => {
    const domain_id = c.env.DOMAIN_ID
    let session
    try {
        session = await c.env.IGCONFIG.get(domain_id, 'json')
    } 
    catch {
    }
    return session
}

const putDomain = async (c: Context, domain: any) => {
    const domain_id = c.env.DOMAIN_ID
    try {
        await c.env.IGCONFIG.put(domain_id, JSON.stringify(domain))
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

const randomDomain = async (c: Context) => {
    const domain_id = c.env.DOMAIN_ID
    let domainCount = c.env.DOMAIN_COUNT
    let randomDomain
    try {
        const domain = await c.env.IGCONFIG.get(domain_id, 'json')
        if (domain.length) {
            randomDomain = getMultipleRandom(domain, domainCount)
        }
    } catch {
        console.log(`ERROR : INVALID DOMAIN KV '${domain_id}'`)        
    }
    return randomDomain
}

export const DomainModel = {
    getDomain,
    putDomain,
    randomDomain
}

export default DomainModel 