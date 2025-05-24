#!/bin/bash

COMMIT_MSG="$*"

alias pm pnpm

if [ -z "$COMMIT_MSG" ]; then
  echo "❌ Укажите сообщение коммита. Пример: pnpm commit 'Refactor auth'"
  exit 1
fi

pnpm typecheck && \
pnpm lint && \
pnpm build-all && \
git add . && \
git commit -m "$COMMIT_MSG" && \
git push