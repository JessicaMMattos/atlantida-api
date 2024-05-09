# Changelog

All notable changes to this project will be documented in this file.

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

### Adjusted
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

### Adjusted
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
