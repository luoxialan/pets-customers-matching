# Build a basic system for matching pets and customers

## Introduction

This project is to try to build a simple REST API with Koa for a **Pets and Customers Matching** system

## Pre-reqs

* Docker

## Features

* Koa2
* Docker-compose

## Included middleware

* koa-joi-router: router and data validataion
* koa-bodyparser: parse the request body and params

## Getting Started

* Clone the repository
* In the root of the project, run `sh start.sh`.
* The host is ```127.0.0.1:8080```
* Run the command in the terminal below. If it returns with data, it means it's ok now.

  ```bash
  curl -X get http://127.0.0.1:8080/pets/1
  ```

* To stop the service, please run `sh stop.sh` in the root of the project.

## API

### POST /pets

Add a new pet to the system

* Method: `POST`
* URL path: `/pets`
* Request body:

  ```bash
  # example for dog
  {
      "name": "lovely dog",
      "age": 1,
      "species": "dog"
      "breed": "labrador"
  }

  # example for cat
  {
      "name": "cute cat",
      "age": 3,
      "species": "cat"
  }
  ```

### GET /pets/{id}

Fetch the pet by ID

* Method: `GET`
* URL path: `/pets/{id}`

### GET /pets/{id}/matches

Get an array of "matching" customers for the given pet

* Method: `GET`
* URL path: `/pets/{id}/matches`

### POST /customers

Add a new customer to the system. Together with their preferences for pets

* Method: `POST`
* URL path: `/customers`
* Request body:

  ```bash
  # example for dog
  {
      "from": 0,
      "to": 10,
      "species": ["dog"]
      "breed": ["labrador"]
  }

  # example for cat and rebbit
    {
      "from": 0,
      "to": 2,
      "species": ["cat", "rabbit"]
  }
  ```

### GET /customers/{id}

Fetch the customer by ID

* Method: `GET`
* URL path: `/customers/{id}`

### GET /customers/{id}/matches

Get an array of "matching" Pets for the given customer

* Method: `GET`
* URL path: `/customers/{id}/matches`

### POST /customers/{id}/adopt?pet_id={pet_id}

The Customer adopts the given Pet

The Pet and Customer should no longer appear in `/matches` queries

* Method: `POST`
* Url path: `/customers/{id}/adopt?pet_id={pet_id}`

## Remark

The response handling which includes error handling is not yer finished.

