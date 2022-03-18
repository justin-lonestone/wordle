# Wordle - API

## About

This project is build on the top of [NestJS](https://nestjs.com/) powered by [Apollo Graphql](https://www.apollographql.com/) & [MikroORM](https://mikro-orm.io/)

## Database

### Synchronise database

Run the following command `yarn db:sync`.

Read about mikro-orm cli for know how use it properly or set `ORM_SYNC=true` in dev environnement to synchronize your database schema at each hotreload Z

## GraphQL

We use `code-first` technique for generate your Graphql Schema using `type-graphql`. [Read the doc](https://typegraphql.com/)

## Getting started

Copy `.env.example` into `.env` with the following command : `cp .env.example .env`

Run `yarn start:dev` for hot reload.

## Running at

This app runs at `localhost:5000`
