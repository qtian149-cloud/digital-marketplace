FROM php:8.3-fpm-alpine

RUN apk add --no-cache bash git $PHPIZE_DEPS icu-dev libzip-dev oniguruma-dev zip unzip \
    && docker-php-ext-install intl mbstring pdo_mysql zip opcache \
    && pecl install redis \
    && docker-php-ext-enable redis

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY deploy/php/php.ini /usr/local/etc/php/conf.d/marketplace.ini
COPY deploy/php/www.conf /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www/backend
