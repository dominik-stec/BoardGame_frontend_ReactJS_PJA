<!--
*** Thanks for checking out c. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![NO LICENSE][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://gdansk.pja.edu.pl/pl/">
    <img src="images/logo.jpg" alt="Logo" width="540" height="80">
  </a>

  <h2 align="center">ChangeYourMindGameBackend</h2>

  <p align="center">
    <h3> This project is a backend for board game. I made digital game based on reality game board. It was work work for my study practice. This project is dedicated for local government 'Self-Help Center' Institution where i realised my study practice.  </h3>
    <br />
    <a href="https://github.com/dccstcc/ChangeYourMindGameBackend"><strong>» go to CODE »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a> -->
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgements">Acknowledgements</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p> In this project I used Nodemon build tool with Node.js framework and Node Package Manager for build and deploy backend for web application. I used Express framework for implement functionality. It is possible to build project by use yarn build tools</p>

### Built With

This project use technology below.
* [![node][node-shield]][node-url]
* [![express][express-shield]][express-url]
* [![mysql][mysql-shield]][mysql-url]


<!-- GETTING STARTED -->
## Getting Started

This is instructions on setting up this project locally.


### Prerequisites

Node.js JavaScript framework for build project is need. <br />
Node.js Package Manager 'npm' for maintain external dependencies is need. <br />
Express.js JavaScript framework for build backend solutions is need. <br />
<br />
MySQL database server is need.

### Installation

1. Clone the repo with game backend
   ```sh
   git clone https://github.com/dccstcc/ChangeYourMindGameBackend.git
   ```
   
2. Install nodemon by use npm:
   ```sh
   npm install -g nodemon
   ```
   or using yarn:   
   ```sh
   yarn global add nodemon
   ```

3. Install socket.io library dependency
   ```sh
   npm install socket-io-server
   ```
   
4. Install software which provide MySQL server database: <br />
example: LAMP - Windows/Linux/Mac
```sh
https://bitnami.com/stack/lamp/installer
```

<!-- USAGE EXAMPLES -->
## Usage

Run MySQL database server and create new connection with properties:
example:
```sh
host: localhost
port: 8889
user: root
password: root
```

Create database with exactly name:
```sh
database: 'change_your_mind'
```

Create table with exactly columns:
```sql
CREATE TABLE my_db (
    name varchar(255),
    room varchar(255),
    room_id varchar(255),
    socket varchar(255)
);
```

Create second table with exactly columns:
```sql
CREATE TABLE my_db_exit (
    name varchar(255),
    room_name varchar(255),
    socket varchar(255)
);
```

Go to source file at:
```sh
https://github.com/dccstcc/ChangeYourMindGameBackend/blob/master/src/api/controllers/gameController.ts
``` 
edit gameController.ts in section:
```javascript
const connection = mysql.createConnection({
  host: 'ls-eea22ac767ce1f4dd5f49f5390e1bad16a74196c.cwlpvgtum6qs.eu-west-2.rds.amazonaws.com',
  port: '3306',
  user: 'root',
  password: 'ChangeYourMind1!',
  database: 'change_your_mind'
})
``` 
and replace variables on to:
- host: 'localhost'
- port: '8889'
- user: 'root'
- password: 'root'

<br />

according to values existed in running MySQL database.

<br />

Do not change variable:
- database: 'change_your_mind'

<br />

<img src="images/backend/database.png" width="250"/>


Start backend
   ```sh
   cd ChangeYourMindGameBackend
   npm start
   ```  

In terminal we can observe backend events with coordination of frontend part of this game. Backend listen on localhost:9000. Nodemon serve continously work of backend.
   
 <img src="images/npm_start.png" width="250"/>
   
<!-- [![browser][browser]][browser]
 -->

<img src="images/localhost.png" width="250"/>

<!-- [![summary][summary]][summary] -->


<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

In coordination with frontend application we can see bottom logs in command line:

Logs after register players:

<img src="images/backend/login_cmd.png"  width="250" />

Backend logs in working game:

<img src="images/backend/game_cmd.png"  width="250" />

Database in working game:

<img src="images/backend/database_work.png"  width="250" />


<!-- ROADMAP 
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).

-->

<!-- CONTRIBUTING 
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

-->

<!-- LICENSE -->
## License

This project has not a license. All rights are reserved and it is not Open Source or free. You cannot modify or redistribute this code without explicit permission from the copyright holder, because projects I realised are my materials from PJATK studies. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Dominik Stec - dccstcc@gmail.com

[![LinkedIn][linkedin-shield]][linkedin-url]

Project URL: 
<br />
`https://github.com/dccstcc/ChangeYourMindGameBackend.git`



<!-- ACKNOWLEDGEMENTS 
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)

-->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/dccstcc/TAU_PJATK_practice.svg?style=for-the-badge
[contributors-url]: https://github.com/dccstcc/ChangeYourMindGameBackend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dccstcc/TAU_PJATK_practice.svg?style=for-the-badge
[forks-url]: https://github.com/dccstcc/ChangeYourMindGameBackend/network/members
[stars-shield]: https://img.shields.io/github/stars/dccstcc/TAU_PJATK_practice.svg?style=for-the-badge
[stars-url]: https://github.com/dccstcc/ChangeYourMindGameBackend/stargazers
[issues-shield]: https://img.shields.io/github/issues/dccstcc/TAU_PJATK_practice.svg?style=for-the-badge
[issues-url]: https://github.com/dccstcc/ChangeYourMindGameBackend/issues
[license-shield]: https://img.shields.io/badge/License-NONE-orange
[license-url]: https://github.com/dccstcc/ChangeYourMindGameBackend/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/dominik-stec
[product-screenshot]: images/screenshot.png

[junit-shield]: https://img.shields.io/badge/-JUnit-green
[junit-url]: https://junit.org/junit5/
[mockito-shield]: https://img.shields.io/badge/-Mockito-red
[mockito-url]: https://site.mockito.org/
[docker-shield]: https://img.shields.io/badge/-Docker-blue
[docker-url]: https://www.docker.com/
[maven-shield]: https://img.shields.io/badge/-Maven-white
[maven-url]: https://maven.apache.org/
[cucumber-shield]: https://img.shields.io/badge/-Cucumber-green
[cucumber-url]: https://cucumber.io/
[jetty-shield]: https://img.shields.io/badge/-Jetty-red
[jetty-url]: https://www.eclipse.org/jetty/
[jmeter-shield]: https://img.shields.io/badge/-Jmeter-green
[jmeter-url]: https://jmeter.apache.org/
[selenium-shield]: https://img.shields.io/badge/-Selenium-yellow
[selenium-url]: https://www.selenium.dev/
[robotframework-shield]: https://img.shields.io/badge/-Robot-black
[robotframework-url]: https://robotframework.org/
[python-shield]: https://img.shields.io/badge/-Python-yellow
[python-url]: https://www.python.org/

[node-shield]: https://img.shields.io/badge/-Node-green
[node-url]: https://nodejs.org/en/
[express-shield]: https://img.shields.io/badge/-Express-white
[express-url]: https://expressjs.com/
[mysql-shield]: https://img.shields.io/badge/-MySQL-blue
[mysql-url]: https://www.mysql.com/

[server_run]: images/server_run.png 
[client_run]: images/client_run.png
[client]: images/client.png
[jetty_run]: images/jetty_run.png
[browser]: images/browser.png
[summary]: images/summary.png



