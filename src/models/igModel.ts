import { Context } from "hono";
import igConfig from "../configs/igConfig"

async function gatherResponse(response: any) {
    const { headers } = response;
    const contentType = headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    }
    return null;
}

const getSearch = async (c: Context, q: String) => {
    // const q: any = c.req.query('q')
    let endpoint = igConfig.searchUrl
    let url = endpoint.replace('{q}', q)
    const res = await fetch(url)
    const result = await gatherResponse(res)
    return result
}

const getMedia = async (c: Context, id: string) => {
    // const id: string = c.req.param('id')
    let endpoint = igConfig.mediaUrl
    let url = endpoint.replace('{id}', id)
    const res = await fetch(url)
    const result = await gatherResponse(res)
    return result
}


const getProfile = async (c: Context, id: string) => {
    // const id: string = c.req.param('id')
    let endpoint = igConfig.profileUrl
    let url = endpoint.replace('{id}', id)
    const res = await fetch(url)
    const result = await gatherResponse(res)
    return result
}

const getTags = async (c: Context, id: string) => {
    // const id: string = c.req.param('id')
    let endpoint = igConfig.tagsUrl
    let url = endpoint.replace('{id}', id)
    const res = await fetch(url)
    const result = await gatherResponse(res)
    return result
}


export default {
    getSearch,
    getProfile,
    getTags,
    getMedia
}
