# AHOPE 2018


## SETUP

```bash
# install dependencies
npm install

# install firebase cli
# more information: https://firebase.google.com/docs/cli/
npm install -g firebase-tools

# login to firebase 
# requires that permissions are granted to this project for your user
firebase login


```

- After first logging in with your Gmail (running locally or in production), ensure that your user has permissions granted in the Firebase database (`/users/<<Google UID>>/permissions/basic`)


## DEVELOPMENT

[http://localhost:8080/](http://localhost:8080/)

*development server* `npm run start`


## PRODUCTION

[http://localhost:3000/](http://localhost:3000/)

*build and serve* `npm run prod`

*build*  `npm run build` -- Don't forget to first copy the static images from src/static/images into public/images

*serve*  `npm run serve`


## DEPLOY

`firebase deploy` - This will deploy the hosted UI and the cloud functions


## DEPENDENCIES

- Reference for [Material UI 0.18 API](https://v0.material-ui.com/#/components)