# Club Members

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

In the process of migrating to Firebase
~This application will not run using `ng serve` because it uses json-server to provide api services. You must start it with the provided NPM script located in package.json, so enter `npm run start` and then go to http://localhost:4200.~

## Build

Run `npm run build` to build the project for production. The build artifacts will be stored in the `dist/` directory. A production build hasn't been deployed to a remote server and tested yet. One more thing on my list.

## Running unit tests

Sorry, no unit or e2e tests yet. That's still on my long list of things to learn.

## About the application

This application is a demo, created as a portfolio project to demonstrate to potential employers how I design and code. It's just a simple database application that uses REST services to add/remove/edit/view member records of a fictitious atletic club. The member names might look familiar. See if you know what movie they are taken from. At this time you can enter anything in the username and password fields as nothing is authenticated.

I am providing it as open source so anyone can use all or portions of the code, but I actually expect it to act more as a learning tool. For instance, I had a terrible time getting ngx-datatable to refresh when a row was added or deleted. You'll find a way to make that work in here. This application demonstrates the use of several technologies and techniques such as:
* Angular Material styling
* Bootstrap ngx-datatable with sorting and pagination
* Material dialogs managed by a service
* A reactive form using Material elements
* Flex-Layout (still learning this so it's not perfect)
* Json-server for creating REST services
* A service that provides HTTP functions against the REST services provided by json-server

## Future enhancements in progress
* Zipcode look-up that will return the city and state based on a zipcode
* Table filtering
* Real login authentication
* Better styling, I hope. It looks very bland at this point.

## Credit where credit is due
The digitOnly directive used for the zipcode field solves that ugly problem of limiting an input field to numbers only while also limiting the length. If you've tried to use type="number" along with maxlength then you've learned that they don't work together. This directive solves that problem beautifully and it can be installed via npm. It was created by Changhui Xu and you can find it at [Codeburst.io](https://codeburst.io/digit-only-directive-in-angular-3db8a94d80c3) or at the GitHub repo [here](https://github.com/changhuixu/ngx-digit-only).

## Demo available - json-server and StackBlitz are not playing well together, so the demo is not currently available
~~You can check out the program and code without cloning into VSCode by using StackBlitz. Use [this link](https://stackblitz.com/edit/github-jmtu87) to use the StackBlitz editor, or [this link](https://github-jmtu87.stackblitz.io) to just run it in a browser outside of the editor.~~

## License
[MIT](LICENSE)

#### Questions and comments to kevin.robbins.github@gmail.com


