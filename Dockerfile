#Deployment in httpd
FROM httpd:2.4.39-alpine

COPY /public/ /usr/local/apache2/htdocs/pg/
# COPY .htaccess /usr/local/apache2/htdocs/.htaccess
