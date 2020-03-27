# Custom URL Shortener

[![](https://img.shields.io/badge/docs%20-view%20API%20Documentation-blue.svg?style=for-the-badge&logo=appveyor)](https://www.adisakshya.co/custom-url-shortener/) [![version](https://img.shields.io/badge/Version-1.0.0-blue.svg?style=for-the-badge&logo=appveyor)](https://github.com/adisakshya/custom-url-shortener) [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue.svg?style=for-the-badge&logo=appveyor)](https://github.com/adisakshya/custom-url-shortener/pulls) [![Under Development](https://img.shields.io/badge/Under%20Development-Yes-blue.svg?style=for-the-badge&logo=appveyor)](https://www.adisakshya.co/custom-url-shortener/) [![Open Source](https://img.shields.io/badge/Open%20Source-Love-red.svg?style=for-the-badge&logo=appveyor)]()

A custom URL shortner service built using ExpressJS, MongoDB & Nginx.

## Operating Instructions

### Local Development

#### Prerequisites

- Make sure you have
  - Docker installed

#### Fork

- Fork this repository
	- "Forking" adds a copy of [adisakshya/custom-url-shortener](https://github.com/adisakshya/custom-url-shortener/) repository to your GitHub account as `https://github.com/YourGitHubUserName/custom-url-shortener`
- Download or clone your forked repository
	- You can clone the repository executing below command in a location of your choice of your system.
	```$ git clone https://github.com/YourGitHubUserName/custom-url-shortener.git```
- That's it your almost done, now in the repository root, run the following command
```$ cd custom-url-shortener/```, this will take you to project directory.

#### Using Docker

- Make sure you have docker installed before proceeding.
	- In project-directory ```./custom-url-shortener```, run the following command
		- ```docker-compose up --build -d```
    - Running docker-compose in detached mode
- As soon as the build completes you are all set to get started with custom-url-shortener.
- Now you have successfully setup custom-url-shortener,
	- Please find the api-documentation for application server [here](https://www.adisakshya.co/custom-url-shortener/).
  - It describe all routes that define the operation the application server.
- To access shortened URL visit
  - ```http://<docker-machine-ip>:/<UNIQUE_URL_CODE>```

## Suggest Features

Is a feature you care about currently missing? Make sure to browse the [issue tracker](https://github.com/adisakshya/custom-url-shortener/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) and add your ":+1:" reaction to the issues you care most about, as we also use those reactions to prioritize issues.

## Contributing

There are multiple ways to contribute to this project, read about them [here](https://github.com/adisakshya/custom-url-shortener/blob/master/.github/CONTRIBUTING.md).

## JustStarIt

🌟 Star this repo if custom-url-shortener helped you.

## License

All versions of the app are open-sourced, read more about this [LICENSE](https://github.com/adisakshya/custom-url-shortener/blob/master/LICENSE).


