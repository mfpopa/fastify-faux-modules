import { fastify } from 'fastify'
import * as fastifyStatic from 'fastify-static'
import * as fastifyCookie from 'fastify-cookie'
import * as fastifySession from 'fastify-session'
import * as fastifyWebsocket from 'fastify-websocket'

const fastifyApp = fastify({
  logger:
    process.env.NODE_ENV === 'development'
      ? {
          level: 'trace',
        }
      : { level: 'error' },
})

fastifyApp.register(fastifyStatic, {
  root: __dirname,
})
fastifyApp.get('/', async (request, reply) => {
  reply.sendFile('index.html')
  return reply
})

fastifyApp.register(fastifyCookie)
fastifyApp.register(fastifySession, {
  secret: '12345678901234567890123456789012',
  cookieName: 'auth',
  cookie: {
    httpOnly: true,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  },
})

fastifyApp.register(fastifyWebsocket)
fastifyApp.get('/_api/webSocket', { websocket: true }, (connection, req) => {
  connection.socket.on('message', (message: string) => {
    fastifyApp.log.info('from client', message)
    connection.socket.send('hi from server')
  })
})

const startApp = async () => {
  try {
    await fastifyApp.listen(9000)
  } catch (error) {
    fastifyApp.log.error(error)
    process.exit(1)
  }
}
startApp()
