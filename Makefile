DEFAULT_VERSION := $(shell sed -n 's|[[:space:]]*<revision>\(.*\)</revision>|\1|p' pom.xml)
VERSION ?= $(DEFAULT_VERSION)
IMAGE ?= kairos
IMAGE_TAG ?= local
REVISION ?= unknown
BUILD_DIRECTORY ?= target

ARTIFACT := $(BUILD_DIRECTORY)/kairos-$(VERSION).jar
IMAGE_CONTEXT ?= $(BUILD_DIRECTORY)/image
STAGED_ARTIFACT := $(IMAGE_CONTEXT)/app.jar
SOURCE_FILES := $(shell find src -type f)
WRAPPER_FILES := $(shell find .mvn -type f)

.PHONY: jar image-context image

jar: $(ARTIFACT)

$(ARTIFACT): pom.xml mvnw $(WRAPPER_FILES) $(SOURCE_FILES)
	./mvnw -Dproject.build.directory=$(BUILD_DIRECTORY) -Drevision=$(VERSION) package -DskipTests

image-context: $(STAGED_ARTIFACT)

$(STAGED_ARTIFACT): $(ARTIFACT)
	mkdir -p $(IMAGE_CONTEXT)
	cp $(ARTIFACT) $(STAGED_ARTIFACT)

image: image-context
	docker build --tag $(IMAGE):$(IMAGE_TAG) \
		--build-arg APPLICATION_VERSION=$(VERSION) \
		--build-arg VCS_REF=$(REVISION) \
		--file Dockerfile \
		$(IMAGE_CONTEXT)
