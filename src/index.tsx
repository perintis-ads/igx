import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { serveStatic } from 'hono/cloudflare-workers'
import { basicAuth } from 'hono/basic-auth'
import { cache } from 'hono/cache'

import igModel from './models/igModel'
import SessionModel from './models/sessionModel'

import Profile from './pages/profile'
import Home from './pages/home'
import TagsPage from './pages/tags'
import SearchPage from './pages/search'
import MediaPage from './pages/media'
import DomainModel from './models/domainModel'

type Env = {
    IGCONFIG: KVNamespace
    USERNAME: string
    PASSWORD: string
    SESSION_ID: string
    SESSION_COUNT: number
    DOMAIN_ID: string
    DOMAIN_COUNT: number
    CACHE_CONTROL_SECONDS: number
}
const app = new Hono<{Bindings:Env}>()

app.use('*', prettyJSON())

// cdn repository folder at ./asstes/static
app.get('/static/*', cache({ cacheName: 'cdn-static', cacheControl: 'max-age=3600'}))
app.get('/static/*', serveStatic({ root: './' }))


// admin area
app.use('/admin/*', async (c, next) => {
    const auth = basicAuth({
      username: c.env.USERNAME,
      password: c.env.PASSWORD,
    })
    return auth(c, next)
})

// cookies session setter getter
app.get('/admin/session', async (c) => {
    try {
        const session = await SessionModel.getSession(c)
        return c.json({status: true, data: session})
    }
    catch {  
        console.log("ERROR GETTING SESSION")
    }
    return c.json({status: false, message: "INVALID SESSION VALUE"})
})

app.get('/admin/session/random', async (c) => {
    try {
        const session = await SessionModel.randomSession(c)
        return c.json({status: true, data: session})
    }
    catch {  
        console.log("ERROR GETTING SESSION")
    }
    return c.json({status: false, message: "INVALID SESSION VALUE"})
})

// save cookies session
app.put('/admin/session', async (c) => {
    const data:any = await c.req.json()
    try {
        if (data && data.session && data.session.length) {
            let update = await SessionModel.putSession(c, data.session)
            if (update) {
                return c.json({status: true, message: "SESSION SAVED!"})
            }
        }
    }
    catch {  
        console.log("ERROR SAVING SESSION")
    }
    return c.json({status: false, message: "INVALID SESSION REQUEST"})
})

//domain setter getter
app.get('/admin/domain', async (c) => {
    try {
        const domain = await DomainModel.getDomain(c)
        return c.json({status: true, data: domain})
    }
    catch {  
        console.log("ERROR GETTING DOMAIN")
    }
    return c.json({status: false, message: "INVALID DOMAIN VALUE"})
})

app.get('/admin/domain/random', async (c) => {
    try {
        const domain = await DomainModel.randomDomain(c)
        return c.json({status: true, data: domain})
    }
    catch {  
        console.log("ERROR GETTING DOMAIN")
    }
    return c.json({status: false, message: "INVALID DOMAIN VALUE"})
})

// save domain
app.put('/admin/domain', async (c) => {
    const data:any = await c.req.json()
    try {
        if (data && data.domain && data.domain.length) {
            await DomainModel.putDomain(c, data.domain)
            return c.json({status: true, message: "DOMAIN SAVED!"})
        }
    }
    catch {  
        console.log("ERROR SAVING DOMAIN")
    }
    return c.json({status: false, message: "INVALID DOMAIN REQUEST"})
})


// HomePage
app.get('/', async (c) => {
    const cacheKey = c.req.url
    const cache = caches.default;

    // check cache to Cloudflare
    let response  = await cache.match(cacheKey);
    if (!response ) {
        console.log('No cache, get one!')
        response = c.html(<Home title="Homepage is awesome" />)

        const cacheSecond = c.env.CACHE_CONTROL_SECONDS || 3600
        response.headers.append('Cache-Control', `max-age=${cacheSecond}`);

        // store cache to Cloudflare for later use until expiration by cache-control
        await cache.put(cacheKey, response.clone())
        response.headers.append('CF-Cache-Status', 'MISS');
    } 
    else {
        console.log(`Cache hit for: ${cacheKey}.`);
    }
    return response
})


app.get('/media/:id', async (c) => {
    const id = c.req.param('id')
    const data = await igModel.getMedia(c, id)
    const title = "this should media page"
    if (data) {
        return c.html(<MediaPage data={data} title={title}/>)
    }
    return c.notFound()
})

app.get('/profile/:id', async (c) => {
    const id = c.req.param('id')
    const data = await igModel.getProfile(c, id)
    const title = "this should profile user"
    if (data) {
        return c.html(<Profile data={data} title={title}/>)
    }
    return c.notFound()
})

app.get('/tags/:id', async (c) => {
    const id = c.req.param('id')
    const data = await igModel.getTags(c, id)
    const title = "this should tags list"
    if (data) {
        return c.html(<TagsPage data={data} title={title}/>)
    }
    return c.notFound()
})

app.get('/search/:q', async (c) => {
    const q = c.req.param('q')
    const data = await igModel.getSearch(c, q)
    const title = "this should search page"
    if (data) {
        return c.html(<SearchPage data={data} title={title}/>)
    }
    return c.notFound()
})

export default app
