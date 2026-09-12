#!/usr/bin/env bash
#
# Deploy the built site to DreamHost (or any host reachable over SSH).
#
#   ./deploy.sh                       # uses $DEPLOY_TARGET
#   ./deploy.sh user@server:~/site/   # or pass the target explicitly
#   ./deploy.sh --prune               # also delete remote files no longer built
#
# The site is rebuilt and validated first; a failing check aborts the deploy
# rather than publishing a broken page.

set -euo pipefail

PRUNE=""
TARGET="${DEPLOY_TARGET:-}"

for arg in "$@"; do
  case "$arg" in
    --prune) PRUNE="--delete" ;;
    -*)      echo "Unknown option: $arg" >&2; exit 2 ;;
    *)       TARGET="$arg" ;;
  esac
done

if [ -z "$TARGET" ]; then
  cat >&2 <<'USAGE'
No deploy target set.

Pass one, or export it once in your shell profile:

  export DEPLOY_TARGET='username@server.dreamhost.com:~/crossroadstechnology.co/'

Find the exact server hostname and the site directory in the DreamHost panel
under Websites, and the SSH username under Servers > Manage Users.
USAGE
  exit 2
fi

# --delete removes anything at the target that this build did not produce.
# Guard it: a mistyped path should never be able to empty a home directory.
if [ -n "$PRUNE" ]; then
  case "$TARGET" in
    *:~|*:~/|*:/|*:/home|*:/home/) echo "Refusing to --prune the target '$TARGET'." >&2; exit 2 ;;
  esac
  printf 'About to DELETE remote files not in this build, under:\n  %s\nContinue? [y/N] ' "$TARGET"
  read -r reply
  [ "$reply" = "y" ] || [ "$reply" = "Y" ] || { echo "Aborted."; exit 1; }
fi

echo "==> Building"
node build.js

echo "==> Validating"
node validate.js

echo "==> Uploading to $TARGET"
# Trailing slash on dist/ copies the contents, not the folder itself.
# Dotfiles (.htaccess) are included by default.
rsync -avz --checksum --human-readable $PRUNE \
  --exclude '.DS_Store' \
  dist/ "$TARGET"

echo "==> Done"
