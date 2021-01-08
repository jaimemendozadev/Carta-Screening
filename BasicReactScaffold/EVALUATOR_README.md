## How to build the <BasicReactScaffold /> App

In the root of the `/BasicReactScaffold` folder, use your Terminal to run `$ yarn install` to install all the app dependencies. Wait until everything finishes downloading.

When the dependencies finish downloading, you can build a production webpack bundle by running `$ yarn run prod:build` or a development bundle with `$ yarn run dev:build`. Just wait until webpack finishes building the files in the `/public` folder.

Finally, you can just go to the `/public` folder and drag/drop the `index.html` file into your favorite web editor icon to view the app.

If you take a peek inside the `/public`, you should see the compiled `.css` and `bundle.js` file. Depending on whether you run `prod:build` or `dev:build`, the app will either display the `app is running in production` or `running in development` mode message.
