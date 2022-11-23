import { Application, send } from 'oak'

import logger from 'middlewares/logger.ts'
import notFound from 'middlewares/notFound.ts'
import staticFiles from 'middlewares/staticFiles.ts'
import errorHandler from './middlewares/errorHandler.ts'

const app = new Application()

// middlewares
app.use(logger)
app.use(errorHandler)
app.use(staticFiles(`${Deno.cwd()}/public`))

// routes
// ---- /
app.use(async ctx => {
    await send(ctx, 'index.html', {
        root: `${Deno.cwd()}/src/views`
    })
})

// 404
app.use(notFound)

export default app
