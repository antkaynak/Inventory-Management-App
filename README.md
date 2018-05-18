# Inventory Management Application

A simple demo application to showcase Spring Data and Spring Boot OAuth2 implementations. This project is made for
learning purposes but feel free to pull request!

![alt](https://github.com/Exercon/Inventory-Management-App/blob/master/screenshots/1.png?v=4&s=200)
![alt](https://github.com/Exercon/Inventory-Management-App/blob/master/screenshots/2.png?v=4&s=200)
![alt](https://github.com/Exercon/Inventory-Management-App/blob/master/screenshots/3.png?v=4&s=200)
![alt](https://github.com/Exercon/Inventory-Management-App/blob/master/screenshots/4.png?v=4&s=200)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### About This Project

* Static HTML on the front-end and JQuery Ajax for the backend end points.
* Dynamic HTML template system open for further improvements.
* OAuth2 Authorization storing with cookie.js and local storage.
* Responsive data table with sorting mechanism.
* Search bar for searching specific entries.
* Editing datas with live feedback.
* Pagination with spring data and dynamic scroll data loading.

### Prerequisites

What things you need to install

```
Locally installed MySQL or a MySQL server.
You don't need a web server as spring boot provides embedded tomcat.
Compatible IDE, Intellij IDEA recommended for this project.

```


### Installing

For MySQL Database

```
Just copy the sql code below and run it in your database server.

USE !yourdatabasename!

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `stock` int DEFAULT 0,
  `description` TEXT,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

For Tomcat Application Server

```

In this project we are using spring boot's own embedded tomcat implementation.
But If you want to use anything else make sure to pack the application correctly.

```

## Deployment

This application staticaly hosts index.html but ofcourse you can use a framework and
use the spring boot backend as a microservice.

## Built With

* [Spring Boot](https://projects.spring.io/spring-boot/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [Hibernate](http://hibernate.org) - Hibernate and Hibernate Validator
* [Connector/J](https://dev.mysql.com/downloads/connector/j/5.1.html) - Connecting to MySQL Database Server
* [Jquery](https://jquery.com/) - AJAX Requests 

## Known Bugs
* When the page reloads and you have the authorization cookie but it is expired the table page flashes for a second.
* There are no role management , so every user is admin.
* Mobile support is bugged.
* Throws exceptions in some extreme use cases.
* The icons are not working.

## Contributing

If you want to contribute to this project you can e-mail me - antkaynak1@gmail.com
or you can pull request.

## Versioning

This project does not have versioning and made with learning purposes.


## Authors 

* **Ant Kaynak** - *Initial work* - [Github](https://github.com/antkaynak)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Exercon/AntiSocial-Platform/blob/master/LICENSE) file for details.


## Acknowledgments
* HTML Table Sorting [W3 Schools](https://www.w3schools.com)

# Questions
If you have any questions mail me -  antkaynak1@gmail.com


