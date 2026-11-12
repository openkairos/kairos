DEFAULT_VERSION := $(shell sed -n 's|[[:space:]]*<revision>\(.*\)</revision>|\1|p' pom.xml)
VERSION ?= $(DEFAULT_VERSION)
IMAGE ?= kairos
IMAGE_TAG ?= local
REVISION ?= unknown

ARTIFACT := target/kairos-$(VERSION).jar
IMAGE_CONTEXT := build/image
STAGED_ARTIFACT := $(IMAGE_CONTEXT)/app.jar
SOURCE_FILES := $(shell find src -type f)
WRAPPER_FILES := $(shell find .mvn -type f)

.PHONY: jar image-context image

jar: $(ARTIFACT)

$(ARTIFACT): pom.xml mvnw $(WRAPPER_FILES) $(SOURCE_FILES)
	./mvnw -Drevision=$(VERSION) package -DskipTests

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
