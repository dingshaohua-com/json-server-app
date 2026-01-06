// 导入 json-server 库
import jsonServer from 'json-server'


// 创建 json-server 实例
const server = jsonServer.create()


// 使用默认中间件（日志、静态文件、CORS 和 no-cache）
server.use(jsonServer.defaults())
// 配置静态文件目录为 public
// server.use(jsonServer.defaults({ static: 'public' }))

// 配置 URL 重写规则（需要在 router 之前使用）
// '/api/*': '/$1' - 将 /api/posts 重写为 /posts
// '/blog/:resource/:id/show': '/:resource/:id' - 将 /blog/posts/1/show 重写为 /posts/1
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1'
// }))


// 使用路由中间件（路由中间件使用 db.json 作为数据源）
server.use(jsonServer.router('db.json'))

const isDev = !process.env.VERCEL
console.log('当前环境:' + (isDev ? '开发环境' : 'Vercel环境'));
// 只在本地开发时监听端口（Vercel 部署时不需要监听）
// if (isDev) {
    server.listen(3000, () => {
        console.log('JSON Server 已启动: http://localhost:3000')
    })
// }

// 导出 server 实例供 Vercel Serverless Function 使用
export default server
