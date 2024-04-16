This is a small project which shows how apollo client, and apollo server can be used with Next JS 14.

This project is largely inspired by [this hackernoon article](https://hackernoon.com/setting-up-a-graphql-server-and-client-in-nextjs).

However, this is adapted for app router and Next JS 14.
Some parts needed to change, namely the CORS function, and the ApolloProvider which needed to call an experimental package (see package.json).


I have constructed this project as I needed to produce a GraphQL API for a Next JS 14 project, using the app routing.


The UI is the one from the article cited above, produced with package @nextui-org/react.

> Be careful to use a compatible version of the package @nextui-org/react (the one in package.json for example) 


If you have pnpm correctly installed globalled, it is pretty straightforward:
    
    1 - `pnpm install`
    2 - `pnpm dev` -> http://localhost:3000/ by default for nextjs 

> This is not done in TypeScript, but this may change.
