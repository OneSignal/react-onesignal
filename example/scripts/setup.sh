#!/bin/bash
set -euo pipefail

bold=$(tput bold 2>/dev/null || true)
normal=$(tput sgr0 2>/dev/null || true)

log() {
  echo -e "\n${bold}$1${normal}"
}

EXAMPLE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PARENT_DIR="$(cd "$EXAMPLE_DIR/.." && pwd)"
TARBALL="react-onesignal.tgz"

log "Building react-onesignal in $PARENT_DIR"
cd "$PARENT_DIR"
vp run build

log "Packing react-onesignal"
bun pm pack --filename "$EXAMPLE_DIR/$TARBALL"

log "Installing tarball into example"
cd "$EXAMPLE_DIR"
vp install --force
