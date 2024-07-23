# Changelog

All notable changes to this project will be documented in this file.

## [3.1.0] - 2024-07-23

### Added
- Route search user by email

## [3.0.0] - 2024-07-07

### Added
- IdUser in the Address schema
- Adresses routes:
    - /addresses/user/:userId

### Changed
- Update libs:
   - joi to v17.13.3,
   - yaml to v2.4.5,
   - nodemon to v3.1.4

### Removed
- User's idAddress

## [2.0.0] - 2024-06-02

### Added
- DiveLogs routes:
    - /api/diveLogs/date
    - /api/diveLogs/location/:locationName
- Comment routes:
    - /api/commentsByUserToken
- logger;
- MongoDB Atlas.

### Changed
- Create dynamic statistics based on the period the user requests;
- Update libs:
   - @sendgrid/mail to v8.1.3,
   - bcryptjs to v2.4.3,
   - cors to v2.8.5,
   - dotenv  to v16.4.5,
   - express to v4.19.2,
   - joi to v17.13.1,
   - jsonwebtoken to v9.0.2,
   - mongoose to v7.6.12,
   - passport to v0.7.0,
   - passport-http-bearer to v1.0.1,
   - passport-local to v1.0.0,
   - swagger-ui-express to v4.6.3,
   - winston to v3.13.0,
   - yaml to v2.4.2,
   - jest to v29.7.0,
   - nodemon to v3.1.2,
   - supertest to v6.3.4.

### Removed
- diveStatistics Model;
- diveStatistics Repository;
- DiveLogs routes:
    - /api/diveLogs/rating/:rating
    - /api/diveLogs/location/:location
- users route:
    - /api/users
- docker;
- eslint.

## [1.10.0] - 2024-05-04

### Added
- lib cors;
- Allowing requests from other domains.

## [1.9.0] - 2024-04-29

### Added
- DiveLogs routes:
    - /api/diveLogs/dateRange
    - /api/diveLogs/title/{title}
    - /api/diveLogs/rating/{rating}
    - /api/diveLogs/location/{location}
- README.

## [1.8.1] - 2024-04-08

### Changed
- Statistics calculation, as WeatherCondition and WeatherBody can be null;
- Swagger, id is not in uuid format.

### Removed
- GET /api/addresses from Swagger, as this route does not exist.

## [1.8.0] - 2024-04-07

### Added
- Swagger;
- Routes to filter dive spots by rating and difficulty.

## [1.7.0] - 2024-04-07

### Added
- Route: /api/certificates/expired;
- repositories.

### Removed
- docker-compose.debug and docker-compose.environment.

### Changed
- Refactoring Controller and Service.

## [1.6.0] - 2024-04-02

### Added
- Diving spots;
- Comments on dive sites.

## [1.5.0] - 2024-03-18

### Added
- Diving statistics.

## [1.4.0] - 2024-03-12

### Added
- Dive log routes.

## [1.3.0] - 2024-03-11

### Added
- Routes certificates.

## [1.2.0] - 2024-03-08

### Added
- Route recover password.

## [1.1.0] - 2024-01-05

### Added
- User and address routes.

## [1.0.0] - 2024-01-15

### Added
- Initial project architecture.
