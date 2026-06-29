#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"

# If another process has the target port, stop it before starting Vite.
PIDS="$(lsof -ti :"$PORT" || true)"
if [[ -n "$PIDS" ]]; then
  echo "Liberando puerto $PORT (PID(s): $PIDS)..."
  kill $PIDS || true
  sleep 1
fi

echo "Iniciando frontend en puerto $PORT..."
exec npm run start -- --host 0.0.0.0 --port "$PORT"
