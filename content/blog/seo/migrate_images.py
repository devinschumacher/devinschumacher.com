#!/usr/bin/env python3
import os
import re
import shutil
from pathlib import Path

# Configuration
SEO_DIR = "/Users/devin/repos/projects/content/content/post/seo"
IMAGES_SOURCE = "/Users/devin/repos/projects/content/content/post/images"
GITHUB_RAW_URL = "https://raw.githubusercontent.com/devinschumacher/uploads/main/images"

def extract_image_references(file_path):
    """Extract all image references from a markdown file"""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Find all markdown image references: ![alt](path) and [![alt](path)](link)
    pattern = r'!\[.*?\]\((.*?)\)'
    matches = re.findall(pattern, content)
    
    # Extract just the image paths
    images = []
    for match in matches:
        # Remove any surrounding parentheses from linked images
        if match.startswith('/images/'):
            # Extract just the filename
            filename = match.replace('/images/', '')
            images.append(filename)
    
    return images, content

def update_image_urls(content, image_map):
    """Replace local image paths with GitHub URLs"""
    for local_name, github_url in image_map.items():
        # Replace both /images/ paths
        old_path = f'/images/{local_name}'
        content = content.replace(old_path, github_url)
    
    return content

def main():
    # Collect all unique images
    all_images = set()
    file_contents = {}
    
    # Process each markdown file
    for filename in os.listdir(SEO_DIR):
        if filename.endswith('.md'):
            file_path = os.path.join(SEO_DIR, filename)
            images, content = extract_image_references(file_path)
            all_images.update(images)
            file_contents[file_path] = content
    
    print(f"Found {len(all_images)} unique images referenced in SEO articles")
    
    # Check which images exist locally
    existing_images = {}
    missing_images = []
    
    for img in all_images:
        source_path = os.path.join(IMAGES_SOURCE, img)
        if os.path.exists(source_path):
            existing_images[img] = source_path
        else:
            missing_images.append(img)
    
    print(f"Found {len(existing_images)} images locally")
    if missing_images:
        print(f"Missing {len(missing_images)} images:")
        for img in missing_images[:10]:  # Show first 10
            print(f"  - {img}")
        if len(missing_images) > 10:
            print(f"  ... and {len(missing_images) - 10} more")
    
    # Create image URL mapping
    image_map = {}
    for img_name in existing_images:
        github_url = f"{GITHUB_RAW_URL}/{img_name}"
        image_map[img_name] = github_url
    
    # Also map missing images (they might be uploaded already)
    for img_name in missing_images:
        github_url = f"{GITHUB_RAW_URL}/{img_name}"
        image_map[img_name] = github_url
    
    # Update all markdown files
    updated_count = 0
    for file_path, content in file_contents.items():
        new_content = update_image_urls(content, image_map)
        if new_content != content:
            with open(file_path, 'w') as f:
                f.write(new_content)
            updated_count += 1
            print(f"Updated: {os.path.basename(file_path)}")
    
    print(f"\nUpdated {updated_count} files")
    print(f"All image URLs now point to: {GITHUB_RAW_URL}/[filename]")
    
    # Output list of images to upload
    print(f"\nImages to upload to GitHub ({len(existing_images)} files):")
    print("Copy these files to your local clone of github.com/devinschumacher/uploads")
    print("in the 'images' folder, then commit and push\n")
    
    # Create a shell script to copy images
    with open('/Users/devin/repos/projects/content/content/post/seo/copy_images.sh', 'w') as f:
        f.write("#!/bin/bash\n")
        f.write("# Script to copy images to your GitHub repo clone\n")
        f.write("# Usage: ./copy_images.sh /path/to/uploads/repo/images\n\n")
        f.write("if [ -z \"$1\" ]; then\n")
        f.write("    echo \"Usage: $0 /path/to/uploads/repo/images\"\n")
        f.write("    exit 1\n")
        f.write("fi\n\n")
        f.write("DEST_DIR=\"$1\"\n\n")
        
        for img_name, source_path in existing_images.items():
            f.write(f"cp \"{source_path}\" \"$DEST_DIR/{img_name}\"\n")
        
        f.write("\necho \"Copied {len(existing_images)} images to $DEST_DIR\"\n")
    
    os.chmod('/Users/devin/repos/projects/content/content/post/seo/copy_images.sh', 0o755)
    print("Created copy_images.sh script to help copy images")

if __name__ == "__main__":
    main()