# Club Members

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

This application uses Firebase for REST services but does not use the Firebase SDK, just good old fashioned HTTP verbs.
## Build

Run `npm run build` to build the project for production. The build artifacts will be stored in the `dist/` directory. A production build hasn't been deployed to a remote server and tested yet.

## Running unit tests

Sorry, no unit or e2e tests yet. That's still on my long list of things to learn.

## About the application

This application is a demo, created as a portfolio project. It's just a simple database application that uses REST services to add/remove/edit/view member records of a fictitious atletic club. The member names might look familiar. See if you know what movie they are taken from. At this time you can enter anything in the username and password fields as nothing is authenticated.

I am providing this as open source so anyone can use all or portions of the code, but I actually expect it to serve more as a learning tool. For instance, I had a terrible time getting ngx-datatable to refresh when a row was added or deleted. You'll find a way to make that work in here, although it's not pretty. I'm still looking for a better technique. This application demonstrates the use of several technologies and techniques such as:
* Angular Material styling
* Bootstrap ngx-datatable with sorting and pagination
* Material dialogs managed by a service
* A reactive form using Material elements
* Flex-Layout (still learning this so it's not perfect)
* Firebase for providing REST services
* A service that provides HTTP functions against the REST services.
* A directive that formats a phone as the user types it. That came from SO but I've lost track of the author for proper credit. Sorry whoever you are, but thank you.

## Future enhancements in progress
* Zipcode look-up that will return the city and state based on a zipcode
* Real login authentication

## Credit where credit is due
The digitOnly directive used for the zipcode field solves that ugly problem of limiting an input field to numbers only while also limiting the length. If you've tried to use type="number" along with maxlength then you've learned that they don't work together. This directive solves that problem beautifully and it can be installed via npm. It was created by Changhui Xu and you can find it at [Codeburst.io](https://codeburst.io/digit-only-directive-in-angular-3db8a94d80c3) or at the GitHub repo [here](https://github.com/changhuixu/ngx-digit-only).

## Demo available - This Gihub repo is linked to Gitpod for running the application. There is a Chrome extension available which will add a button on any Github page to launch Gitpod.

## License
[MIT](LICENSE)

