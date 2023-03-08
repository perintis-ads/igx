import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { serveStatic } from 'hono/cloudflare-workers'

import igModel from './models/igModel'
import Profile from './pages/profile'
import Home from './pages/home'
import TagsPage from './pages/tags'
import SearchPage from './pages/search'
import MediaPage from './pages/media'

const app = new Hono()

app.use('*', prettyJSON())
app.get('/static/*', serveStatic({ root: './' }))

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
