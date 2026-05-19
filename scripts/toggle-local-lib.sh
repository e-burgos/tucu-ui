#!/bin/bash
# Test @e-burgos/tucu-ui from local build without publishing to npm.
#
# Usage:
#   ./scripts/toggle-local-lib.sh pack    → Build, pack as .tgz, install in demo
#   ./scripts/toggle-local-lib.sh npm     → Restore npm registry version
#   ./scripts/toggle-local-lib.sh status  → Show current mode

set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEMO_PKG="$ROOT_DIR/apps/demo/package.json"
DIST_DIR="$ROOT_DIR/dist/ui/tucu-ui"

get_latest_version() {
  local version
  version=$(npm view @e-burgos/tucu-ui version 2>/dev/null)
  if [ -z "$version" ]; then
    echo "❌ Could not fetch latest version from npm."
    exit 1
  fi
  echo "^$version"
}

case "$1" in
  pack)
    echo "📦 Building and packing tucu-ui for local testing..."

    # 1. Build the lib
    cd "$ROOT_DIR"
    pnpm nx run tucu-ui:build
    
    if [ ! -d "$DIST_DIR" ]; then
      echo "❌ Build failed: dist/ui/tucu-ui not found."
      exit 1
    fi

    # 2. Clean old tarballs
    rm -f "$DIST_DIR"/*.tgz

    # 3. Pack the dist folder into a tarball
    cd "$DIST_DIR"
    TARBALL=$(npm pack 2>/dev/null | tail -1)
    TARBALL_PATH="$DIST_DIR/$TARBALL"
    
    if [ ! -f "$TARBALL_PATH" ]; then
      echo "❌ Pack failed: tarball not created."
      exit 1
    fi

    echo "📦 Created: $TARBALL"

    # 4. Update demo's package.json to use the tarball
    cd "$ROOT_DIR"
    sed -i '' "s|\"@e-burgos/tucu-ui\": \".*\"|\"@e-burgos/tucu-ui\": \"file:$TARBALL_PATH\"|" "$DEMO_PKG"
    
    # 5. Install — this unpacks the tarball like a real npm install
    echo "📦 Installing tarball in demo..."
    pnpm install --no-frozen-lockfile
    
    echo ""
    echo "✅ Done! Demo now uses the local build."
    echo "   Run 'pnpm demo' to test."
    echo ""
    echo "   To go back to npm: ./scripts/toggle-local-lib.sh npm"
    ;;

  npm)
    NPM_VERSION=$(get_latest_version)
    echo "🔄 Restoring to latest npm version: $NPM_VERSION"
    
    cd "$ROOT_DIR"
    sed -i '' "s|\"@e-burgos/tucu-ui\": \".*\"|\"@e-burgos/tucu-ui\": \"$NPM_VERSION\"|" "$DEMO_PKG"
    
    # Clean tarballs
    rm -f "$DIST_DIR"/*.tgz 2>/dev/null || true
    
    echo "📦 Running pnpm install..."
    pnpm install --no-frozen-lockfile
    
    echo "✅ Demo restored to npm version $NPM_VERSION."
    ;;

  status)
    CURRENT=$(grep '"@e-burgos/tucu-ui"' "$DEMO_PKG" | sed 's/.*: "//;s/".*//')
    if echo "$CURRENT" | grep -q "file:"; then
      echo "📍 Mode: LOCAL PACK"
      echo "   $CURRENT"
    else
      echo "📍 Mode: NPM ($CURRENT)"
    fi
    ;;

  *)
    echo "Usage: $0 {pack|npm|status}"
    echo ""
    echo "  pack    → Build lib, create .tgz, install in demo (simulates real npm)"
    echo "  npm     → Restore latest npm registry version"
    echo "  status  → Show current dependency mode"
    exit 1
    ;;
esac
