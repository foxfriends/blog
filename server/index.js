require('dotenv').config();
const Path = require('path');
const Fs = require('fs').promises;
const Koa = require('koa');
const KoaJson = require('koa-json');
const KoaStatic = require('koa-static');
const KoaSend = require('koa-send');
const KoaRouter = require('@koa/router');
const Toml = require('toml');

const router = new KoaRouter();

router.get('/article/:id.md', async (ctx, next) => {
    await KoaSend(ctx, `${ctx.params.id}/article.md`, { root: process.env.blog_articles });
});

router.get('/article/:id', async (ctx, next) => {
    await KoaSend(ctx, 'article.html', { root: process.env.blog_public_html });
});

router.get('/articles.json', async (ctx, next) => {
    const dir = await Fs.readdir(Path.resolve(process.env.blog_articles));
    const articles = [];
    for (const file of dir) {
        const article = Toml.parse(await Fs.readFile(Path.resolve(process.env.blog_articles, file, 'article.toml')));
        articles.push({
            id: file,
            ...article,
        });
    }
    articles.sort((a, b) => new Date(a.date) < new Date(b.date));
    ctx.body = articles;
});

new Koa()
    .use(KoaJson({ pretty: false, param: 'pretty' }))
    .use(async (ctx, next) => {
        await next();
        if (ctx.status === 404) {
            await KoaSend(ctx, '404.html', { root: process.env.blog_public_html });
        }
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .use(KoaStatic(Path.resolve(process.env.blog_public_html)))
    .listen(process.env.blog_port);
