################################################################################
# Makefile for deploying user interface code to a web server
#

# Configurable parameters
OSX_WEBSERVER_ROOT=/Library/WebServer/Documents
MAZAMA_WEBSERVER_ROOT=/var/www/mazamascience.com/html

SERVICE_PATH=server-health

VERSION=0.1.1

gulp:
	cd UI_dev; gulp

configure_ui:
	sed 's%__VERSION__%$(VERSION)%' generic/__index.html | \
		sed 's%__SERVICE_PATH__%$(SERVICE_PATH)%' > generic/index.html
	sed 's%__SERVICE_PATH__%$(SERVICE_PATH)%' \
		generic/dist/__dist.js > generic/dist/___dist.js
	sed 's%__SERVICE_PATH__%$(SERVICE_PATH)%' \
		generic/dist/__dist.min.js > generic/dist/___dist.min.js


mazama_deploy: configure_ui
	-mkdir $(MAZAMA_WEBSERVER_ROOT)/$(SERVICE_PATH)/
	cp -r generic/* $(MAZAMA_WEBSERVER_ROOT)/$(SERVICE_PATH)/

osx_deploy: gulp configure_ui
	-mkdir $(OSX_WEBSERVER_ROOT)/$(SERVICE_PATH)/
	cp -r generic/* $(OSX_WEBSERVER_ROOT)/$(SERVICE_PATH)/
