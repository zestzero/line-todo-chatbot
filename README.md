# Todoist App
This project is a part of LINE assignment.

## Getting Started

![LINE Chat bot QR code](https://user-images.githubusercontent.com/3611918/44468662-ecc8a600-a64f-11e8-93eb-199ca3d9d427.png)

### DEMO

![aug-22-2561 21-14-57](https://user-images.githubusercontent.com/3611918/44468908-82fccc00-a650-11e8-982f-8830c58c536d.gif)

### Prerequisite

* [LINE LIFF](https://developers.line.me/en/docs/liff/overview/)
* [LINE Messaging API](https://developers.line.me/en/docs/messaging-api/overview/)
* [LINE Webhook API](https://developers.line.me/en/reference/messaging-api/#webhook-event-objects)
* [Nodejs](https://nodejs.org/en/)
* [Express and Express Router](https://expressjs.com/)
* [Reactjs](https://github.com/facebook/react) [Reactjs Blog](https://reactjs.org/)
* [React beautiful dnd](https://github.com/atlassian/react-beautiful-dnd)
* [React Semantic UI](https://react.semantic-ui.com/)
* [Get Start with Docker](https://docs.docker.com/get-started/)

### Development

* Clone repository
```bash
$ git clone https://github.com/zestzero/line-todo-chatbot.git
```

* Start MongoDB Server
```bash
$ docker-compose up
```

Using [yarn](https://yarnpkg.com/):

* Install dependencies
``` bash
$ yarn
```
* Start Server
``` bash
$ yarn start
```
* Start Client
``` bash
$ cd client && yarn && yarn start
```

### Testing

* Server
``` bash
$ yarn test
```
* Client
``` bash
$ cd client && yarn test
```

### Deployment

Using [heroku container](https://devcenter.heroku.com/articles/container-registry-and-runtime) to deploy the container using Dockerfile.

``` bash
$ heroku container:login
$ heroku create
$ heroku container:push web
$ heroku container:release web
$ heroku open
```

### Documentation

* [Sample line bot with heroku](https://developers.line.me/en/docs/messaging-api/building-sample-bot-with-heroku/)
* [Nodejs Hackathon Starter](https://github.com/sahat/hackathon-starter/blob/master/app.js)
* [Deploy docker to heroku by using container registry](https://devcenter.heroku.com/articles/container-registry-and-runtime)
* [Get to know Line Frontend framework](https://developers.line.me/en/docs/liff/getting-started/)
* [A channel access token](https://developers.line.me/en/docs/liff/getting-started/#preparing-channel-access-token)
* A [Heroku account](https://www.heroku.com)
* [How to run create-react-app inside Nodejs](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)


### Future works

* Deployment using CI tools (with automation test).
* Add JWT to verify incoming request using `access_token`.
* Improve UI to be more user friendly.

## Requirements

* **Node.js** 8 or higher

## Contributing

Please check [CONTRIBUTING](CONTRIBUTING.md) before making a contribution.

## License

[Apache License Version 2.0](LICENSE)
