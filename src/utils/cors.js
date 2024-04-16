const allowCors = (fn) => async (req) => {
    let res = await fn(req);
    res.headers.set('Access-Control-Allow-Credentials', true)
    res.headers.set('Access-Control-Allow-Credentials', true)
    res.headers.set('origin', 'https://nextjs-graphql-server-client.vercel.app')
    res.headers.set('Access-Control-Allow-Origin', req.headers.origin || '*')
    // another common pattern
    res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return res;
}

export default allowCors

