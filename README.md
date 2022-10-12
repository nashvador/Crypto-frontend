# CoinNow Frontend App

Welcome to the frontend of CoinNow, a crypto app that allows users to view CryptoCurrencies and potentially buy them.

The development was solely done by me - Nash Vador. And the project's purpose was meant to showcase my knowledge with full stack applications.

I completed this app from June 9, 2022 - October 15, 2022 and I developed this project after work while I was employed as a tester.

# Live link to frontend

Here is the [link](https://coinnow-frontend.netlify.app/) to the frontend of the application. It is automatically connected with the backend so you can play around with the app.

# Live link to backend

Here is the [link](https://backend-coinnow.herokuapp.com/) to the live backend of the application. Note that most of the endpoints are set up to respond to post requests instead of get requests.

# Link to backend repository

Here is the [link](https://github.com/nashvador/Crypto-backend) to the backend repository. The backend is built in Node.js, Express, Typescript and MongoDB.

# How everything works

- CI/CD - The CI/CD pipeline for the frontend is a lot more straightforward than the frontend, Netlify has their own CI/CD that uses github. So, I used that to set up the pipeline.

- API - To prevent CORS errors, I call the third party API (CoinGecko's API) through my backend. Most of my login and signup functionality are implemented on the backend.

- Testing - The front end unit tests were done by react testing library. The end to end tests were done by Cypress. To prevent a lot of repeated calls to the backend API(they limit calls to 50/minute), I mocked a lot of the information, taking it from CoinGecko.

# Why I chose these technologies

- MaterialUI - Since many companies have their own component libraries, I wanted to get some experience building an app from a library.
