# LeetWithFriend

LeetWithFriend at https://leetwithfriend.com/ [Note: Due to rising costs, it is no longer running on Google Cloud Platform]

- An interview preparation platform and peer matching system, where students can find peers to practice whiteboard-style interview questions together.

![image](https://user-images.githubusercontent.com/50147457/203652014-86f10774-f472-42f9-bc0c-ea91dbc83a4f.png)


![image](https://user-images.githubusercontent.com/50147457/203652120-1d73e89d-b129-4132-aa24-e8dce2ab587e.png)


![image](https://user-images.githubusercontent.com/50147457/203651935-8a8225a3-68f4-458b-8326-de786042fa00.png)

## Architecture Overview
![image](https://user-images.githubusercontent.com/50147457/203652611-432dc3b0-b4c3-4c06-a04a-c71627883480.png)

## Development Guide

### Spin up all the services for local manual testing

```bash
docker-compose -f docker-compose.local.yml up --build -d
```

Visit the frontend at http://localhost:80

To stop the services


```bash
docker-compose -f docker-compose.local.yml stop
```

Available seeded users for testing:

| Username | Password |
|----------|----------|
| qwe      | qwe      |
| asd      | asd      |
| zxc      | zxc      |

---

### To make adjustments to only the frontend application:

Start other services at root

```bash
docker-compose -f docker-compose.frontend.yml up --build -d
```

Run `npm run start` in the `frontend` directory.

Visit the frontend at http://localhost:3000

To stop the services

```bash
docker-compose -f docker-compose.frontend.yml stop
```

## User Service
1. Rename `.env.sample` file to `.env`.
1. Create a Cloud DB URL using Mongo Atlas.
1. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
1. Setup dependencies via `npm ci`
1. Install npm packages using `npm i`.
1. Run User Service using `npm run dev`.

## Frontend
1. Setup dependencies via `npm ci`
1. Install new npm packages using `npm i`.
1. Run Frontend using `npm start`.
