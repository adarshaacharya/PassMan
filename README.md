<p align="center">
<a href="https://passmanager.vercel.app/">
  <img src="https://raw.githubusercontent.com/adarshaacharya/PassMan/main/docs/passman.png" alt="Passman">
</p>
</a>

<br />

<div align="center"><strong>Cloud based password manager.</strong></div>
<div align="center">Login using your auth povider, create vault for personal and business purpose and enjoy seamless experience.</div>

<br />

<div align="center">
  <img alt="License" src="https://img.shields.io/github/license/adarshaacharya/PassMan?style=flat-square">
<img src="https://therealsujitk-vercel-badge.vercel.app/?app=passman" />

  <a href="https://twitter.com/intent/follow?screen_name=adarsha_ach">
    <img src="https://img.shields.io/twitter/follow/adarsha_ach?style=flat-square&color=5e17eb" alt="Follow @adarsha_ach" />
  </a>

</div>

 <p align="center">
    <a href="https://passmanager.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/adarshaacharya/PassMan/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/adarshaacharya/PassMan/issues/new">Request Feature</a>
  </p>

<br />

## Tech Stack

- ⚡️ Next.js 12
- ⚛️ React 18
- ⛑ TypeScript
- 📙 Database : PostgreSQL
- 🚓 ORM : Prisma
- 💄 Component Library : Chakra UI
- 🔑 Hashing : AES256, Scrypt
- 📦 Containerization : Docker

### Requirements

- Node.js >= 12.22.0
- Yarn 1 (Classic)

### Local Development

To start the project locally, run:

```bash
yarn dev
```

Open `http://localhost:3000` with your browser to see the result.

### Env variables setup

- create new file .env in root folder
- open [.env.example](./.env.example)
- copy the contents and paste it to the .env

Fillup `.env` variables with valid keys for database.

### Authentication

You might have seen env variables for authentication in `.env` file.
[NextAuth.js](https://next-auth.js.org/) has been used for authentication, and Github has been used as provider. [Please read this docs](https://next-auth.js.org/providers/github) setting up keys is fairly simple.

### Database setup

This project uses POSTGRESQL db so you need to have POSTGRES installed in you machine or you can use docker. Create database named `passman`.

To configure your database to use the new schema (i.e. create tables and columns) use the prisma migrate command:

```bash
npx prisma migrate dev
```

### Docker Setup

The database has support for Docker. So if you want to run the database in a container, you need to [install docker and docker compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

Open terminal in root directory of this project and run docker-compose:

```bash
docker-compose up -d
```

Now, you have postgres port running successfully on PORT `5433`. Check using `docker ps -a`.

Check [docker-compose.yml](./docker-compose.yml) for full configuation.

### Scripts

- `yarn dev` — Starts the application in development mode at `http://localhost:3000`.
- `yarn build` — Creates an optimized production build of your application.
- `yarn start` — Starts the application in production mode.
- `yarn type-check` — Validate code using TypeScript compiler.
- `yarn lint` — Runs ESLint for all files in the `src` directory.
- `yarn format` — Runs Prettier for all files in the `src` directory.
- `yarn commit` — Run commitizen. Alternative to `git commit`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.

<div align="center">
  <sub>Created by <a href="https://twitter.com/adarsha_ach">Aadarsha Acharya</a> Deployed on <a href="https://www.vercel.com">Vercel</a>.</sub>
</div>
