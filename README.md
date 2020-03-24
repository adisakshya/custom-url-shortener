# Custom URL Shortner

[![](https://img.shields.io/badge/docs%20-view%20API%20Documentation-blue.svg?style=for-the-badge&logo=appveyor)](https://www.adisakshya.co/custom-url-shortner/) [![version](https://img.shields.io/badge/Version-1.0.0-blue.svg?style=for-the-badge&logo=appveyor)](https://github.com/adisakshya/custom-url-shortner) [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue.svg?style=for-the-badge&logo=appveyor)](https://github.com/adisakshya/custom-url-shortner/pulls) [![Under Development](https://img.shields.io/badge/Under%20Development-Yes-blue.svg?style=for-the-badge&logo=appveyor)](https://www.adisakshya.co/custom-url-shortner/) [![Open Source](https://img.shields.io/badge/Open%20Source-Love-red.svg?style=for-the-badge&logo=appveyor)]()

A custom URL shortner service built using ExpressJS, MongoDB & Nginx.

## Operating Instructions

### Local Development

#### Prerequisites

- Make sure you have
  - MongoDB Atlas cluster up and running with a user having database access.
  - Docker or NodeJS installed

#### Fork

- Fork this repository
	- "Forking" adds a copy of [adisakshya/custom-url-shortner](https://github.com/adisakshya/custom-url-shortner/) repository to your GitHub account as `https://github.com/YourGitHubUserName/custom-url-shortner`
- Download or clone your forked repository
	- You can clone the repository executing below command in a location of your choice of your system.
	```$ git clone https://github.com/YourGitHubUserName/custom-url-shortner.git```
- That's it your almost done, now in the repository root, run the following command
```$ cd custom-url-shortner/```, this will take you to project directory.

#### Run using Node

- Install dependencies using the node package manager (npm).
	- In application-server-directory ```./custom-url-shortner/application_server```, run the following command
		- ```npm install```
- You are all set to get started with custom-url-shortner, now run the following command to start custom-url-shortner
	- ```npm start --host 0.0.0.0``` or just simple ```npm start```
- Now you have successfully setup custom-url-shortner application shortner,
	- Please find the postman-collection for application server at ```./custom-url-shortner/application_server/postman_collection```.
  - It describe all routes that define the operation the application server.
- Activate nginx by using the conf file at ```./custom-url-shortner/nginx```.
- To start the webserver run the following command from ```./custom-url-shortner/web_server```
  - ```npm start --host 0.0.0.0``` or just simple ```npm start```
- Now to access the webserver visit ```http://<your-ip-address>:5000```
- After creating a new shortend-URL you can access it on following route
  - ```http://<your-ip-address>/<UNIQUE_URL_CODE>```
  - This will take you to the original URL.

#### Using Docker

- Make sure you have docker installed before proceeding.
	- In project-directory ```./custom-url-shortner```, run the following command
		- ```docker-compose up --build -d```
    - Running docker-compose in detached mode
- As soon as the build completes you are all set to get started with custom-url-shortner.
- Now you have successfully setup custom-url-shortner,
	- Please find the postman-collection for application server at ```./custom-url-shortner/application_server/postman_collection```.
  - It describe all routes that define the operation the application server.
- To access the webserver visit
  - ```http://<docker-machine-ip>:5000```
- To access shortened URL visit
  - ```http://<docker-machine-ip>:/<UNIQUE_URL_CODE>```

## Suggest Features

Is a feature you care about currently missing? Make sure to browse the [issue tracker](https://github.com/adisakshya/custom-url-shortner/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) and add your ":+1:" reaction to the issues you care most about, as we also use those reactions to prioritize issues.

## Contributing

There are multiple ways to contribute to this project, read about them [here](https://github.com/adisakshya/custom-url-shortner/blob/master/.github/CONTRIBUTING.md).

## JustStarIt

🌟 Star this repo if custom-url-shortner helped you.

## License

All versions of the app are open-sourced, read more about this [LICENSE](https://github.com/adisakshya/custom-url-shortner/blob/master/LICENSE).


