import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { serveStatic } from 'hono/cloudflare-workers'
import { basicAuth } from 'hono/basic-auth'

import igModel from './models/igModel'
import Profile from './pages/profile'
import Home from './pages/home'
import TagsPage from './pages/tags'
import SearchPage from './pages/search'
import MediaPage from './pages/media'

type Env = {
    IGCONFIG: KVNamespace
    USERNAME: string
    PASSWORD: string
    SESSION_ID: string
    DOMAIN_ID: string
}
const app = new Hono<{Bindings:Env}>()

app.use('*', prettyJSON())

// cdn repository folder at ./asstes/static
app.get('/static/*', serveStatic({ root: './' }))

// admin area
app.use('/admin/*', async (c, next) => {
    const auth = basicAuth({
      username: c.env.USERNAME,
      password: c.env.PASSWORD,
    })
    return auth(c, next)
})

// session setter getter
app.get('/admin/session', async (c) => {
    try {
        const session = await c.env.IGCONFIG.get(c.env.SESSION_ID, 'json')
        return c.json({status: true, data: session})
    }
    catch {  
        console.log("ERROR GETTING SESSION")
    }
    return c.json({status: false, message: "INVALID SESSION VALUE"})
})

app.put('/admin/session', async (c) => {
    const data:any = await c.req.json()
    try {
        if (data && data.session && data.session.length) {
            await c.env.IGCONFIG.put(c.env.SESSION_ID, JSON.stringify(data.session));
            return c.json({status: true, message: "SESSION SAVED!"})
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
        const session = await c.env.IGCONFIG.get(c.env.DOMAIN_ID, 'json')
        return c.json({status: true, data: session})
    }
    catch {  
        console.log("ERROR GETTING DOMAIN")
    }
    return c.json({status: false, message: "INVALID DOMAIN VALUE"})
})

app.put('/admin/domain', async (c) => {
    const data:any = await c.req.json()
    try {
        if (data && data.domain && data.domain.length) {
            await c.env.IGCONFIG.put(c.env.DOMAIN_ID, JSON.stringify(data.domain));
            return c.json({status: true, message: "DOMAIN SAVED!"})
        }
    }
    catch {  
        console.log("ERROR SAVING DOMAIN")
    }
    return c.json({status: false, message: "INVALID DOMAIN REQUEST"})
})

app.get('/', async (c) => {
    return c.html(<Home title="Homepage is awesome" />)
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
