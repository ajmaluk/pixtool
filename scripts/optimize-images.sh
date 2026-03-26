#!/bin/bash

# PixTool Image Optimization Script
# This script converts PNG screenshots to WebP for better performance and SEO.
# Requires 'sips' (macOS) or 'cwebp' or 'magick' (ImageMagick).

SCREENSHOTS_DIR="./public/screenshots"
BLOG_DIR="./public/blog"

convert_to_webp() {
    local dir=$1
    echo "Processing directory: $dir"
    for f in "$dir"/*.png; do
        if [ -f "$f" ]; then
            local webp_file="${f%.png}.webp"
            echo "Converting $f to $webp_file..."
            
            # Try sips (macOS)
            if command -v sips >/dev/null 2>&1; then
                sips -s format webp "$f" --out "$webp_file" >/dev/null 2>&1
                if [ $? -eq 0 ]; then continue; fi
            fi
            
            # Try cwebp
            if command -v cwebp >/dev/null 2>&1; then
                cwebp -q 80 "$f" -o "$webp_file" >/dev/null 2>&1
                if [ $? -eq 0 ]; then continue; fi
            fi

            # Try magick (ImageMagick)
            if command -v magick >/dev/null 2>&1; then
                magick "$f" "$webp_file" >/dev/null 2>&1
                if [ $? -eq 0 ]; then continue; fi
            fi

            echo "⚠️ Could not convert $f. Please install 'webp' or 'imagemagick'."
        fi
    done
}

convert_to_webp "$SCREENSHOTS_DIR"
convert_to_webp "$BLOG_DIR"

echo "✅ Image optimization check complete."
