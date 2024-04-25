## This App is a kind of trello clone.

[live](https://collab-neon.vercel.app)

### Technology used

- Nextjs
- TailwindCSS
- ClearkJs ( For Authentication & Organization )
- Prisma Client

## To setup app locally

1. Clone the repo locally `gh repo clone yagyaraj234/Collab `
2. Pnpm install ( Intall dependency )
3. Checkout `.env.example` file and all the urls
   1. Get Unsplash key [link](https://unsplash.com/developers)
   2. Get Cleark keys [link](https://dashboard.clerk.com/)
   3. Database url use any sql provider like neon, planet scale etc.
   4. Genrate STRIPE KEYS
4. `npx prisma db push`
5. `npx prisma generate`
6. `npm run dev`

This will start your server locally on localhost 3000
