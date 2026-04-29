---
name: worktree
description: Use when working on Kairos in a Git worktree, preparing a PR worktree, starting local Docker Compose services, or validating code in an isolated parallel development environment.
allowed-tools: functions.exec_command functions.write_stdin multi_tool_use.parallel
---

# Kairos Worktree Development

Use this skill before coding or validating Kairos changes in a local Git worktree. Each active worktree must use isolated Docker Compose resources.

## Start The Worktree

Derive a stable project name from the current branch or directory:

```bash
git branch --show-current
basename "$PWD"
```

Choose unused host ports for this worktree. Common assignments are:

```text
main worktree: HTTP_HOST_PORT=3000 MONGODB_HOST_PORT=27017
second worktree: HTTP_HOST_PORT=3001 MONGODB_HOST_PORT=27018
third worktree: HTTP_HOST_PORT=3002 MONGODB_HOST_PORT=27019
```

Export the worktree settings before running Compose commands:

```bash
export COMPOSE_PROJECT_NAME=<unique-name>
export HTTP_HOST_PORT=<unique-http-port>
export MONGODB_HOST_PORT=<unique-mongodb-port>
```

These exports are local to the current shell and child processes. Re-export the same values in any new terminal before running Compose commands for this worktree.

Start the PR worktree with explicit Compose scoping:

```bash
docker compose up -d mongodb app
```

Reuse the same exported `COMPOSE_PROJECT_NAME`, `HTTP_HOST_PORT`, and `MONGODB_HOST_PORT` for every Compose command in the same worktree.

## Verify Isolation

Render the Compose configuration before relying on it:

```bash
docker compose config
```

Confirm the rendered network and MongoDB volume names include the chosen Compose project name, and that the published ports match this worktree.

## Work Inside The Container

Run project validation through `app`, not the host runtime. `app_dev` is reserved for human IDE workflows.

```bash
docker compose exec -T app npm run lint
docker compose exec -T app npm run format:check
docker compose exec -T app npm test
docker compose exec -T app npm run build
```

If `docker compose exec` fails because services are not running, start `mongodb app` for this worktree and retry.

## Finish The PR Worktree

When work on the PR is finished, stop this worktree's containers:

```bash
docker compose down
```

Run cleanup only after reusing or re-exporting the same `COMPOSE_PROJECT_NAME` for this worktree.

## Guardrails

- Do not use hardcoded container names such as `kairos-app`, `kairos-app-dev`, or `kairos-mongodb`.
- Use `docker compose ps` with the same `COMPOSE_PROJECT_NAME` to inspect this worktree's services.
- Use `docker compose down` only with the same `COMPOSE_PROJECT_NAME`.
- Do not use `docker compose down -v` unless the user explicitly asks to delete this worktree's MongoDB data.
- Do not commit changes unless the user explicitly asks.
