docker-build:
	docker build -t focus-frontend ./frontend

docker-debug:
	docker build -t focus-frontend ./frontend --progress=plain --no-cache

docker-run: docker-build
	docker run --env-file="./env.local" --name focus-frontend -p 8080:8080 focus-frontend:latest

docker-stop:
	docker stop focus-frontend || true

docker-rm:
	docker rm focus-frontend || true

docker-cycle: docker-stop docker-rm docker-run

sam-build:
	sam build

sam-start: sam-build
	sam local start-api

deploy-dev: build
	sam deploy \
		--config-env=dev-frontend \
		--config-file="samconfig.toml" \
		--no-fail-on-empty-changeset
