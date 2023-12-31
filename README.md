# Jokes Aside - Social Platform for Humor Enthusiasts

![jokes-aside](https://github.com/RicardoRocha27/jokes-aside/assets/133434333/a266965b-f1b2-4c15-96e9-2323aa34b48c)

Welcome to Jokes Aside, the social platform designed for humor enthusiasts. Here, you can engage with a community of like-minded individuals who appreciate a good laugh. Interact, react, and explore a world of humor!

Features:

- Discover a curated selection of humorous content.
- Express your appreciation for funny posts with likes.
- Engage in conversations by posting comments on content.
- Explore the profiles of fellow users to view their interactions.
- View the leaderboard showcasing users with the most accumulated likes.
- Users receive notifications about other user interaction with them.

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/RicardoRocha27/jokes-aside.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
DATABASE_URL=
```

### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
