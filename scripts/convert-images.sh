#!/usr/bin/env bash
set -euo pipefail

# Convert all JPG/PNG images in public/static/img/ to AVIF, WebP and PNG
# Requires ImageMagick 7+ (magick command)
# Usage: ./scripts/convert-images.sh [directory]

DIR="${1:-public/static/img}"
QUALITY_AVIF=50
QUALITY_WEBP=80

if ! command -v magick &>/dev/null; then
  echo "Error: ImageMagick 7+ is required (magick command not found)"
  echo "Install with: brew install imagemagick"
  exit 1
fi

shopt -s nullglob nocaseglob
files=("$DIR"/*.jpg "$DIR"/*.jpeg "$DIR"/*.png)
shopt -u nullglob nocaseglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No JPG/PNG files found in $DIR"
  exit 0
fi

echo "Converting ${#files[@]} image(s) in $DIR..."

for src in "${files[@]}"; do
  base="${src%.*}"
  ext="${src##*.}"
  name="$(basename "$src")"

  echo "  $name"

  if [ ! -f "${base}.avif" ] || [ "$src" -nt "${base}.avif" ]; then
    magick "$src" -quality "$QUALITY_AVIF" "${base}.avif"
    echo "    -> $(basename "${base}.avif")"
  else
    echo "    -> $(basename "${base}.avif") (up to date)"
  fi

  if [ ! -f "${base}.webp" ] || [ "$src" -nt "${base}.webp" ]; then
    magick "$src" -quality "$QUALITY_WEBP" "${base}.webp"
    echo "    -> $(basename "${base}.webp")"
  else
    echo "    -> $(basename "${base}.webp") (up to date)"
  fi

  # Only generate PNG from non-PNG sources
  if [ "${ext,,}" != "png" ]; then
    if [ ! -f "${base}.png" ] || [ "$src" -nt "${base}.png" ]; then
      magick "$src" "${base}.png"
      echo "    -> $(basename "${base}.png")"
    else
      echo "    -> $(basename "${base}.png") (up to date)"
    fi
  fi
done

echo "Done."
