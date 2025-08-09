#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Recursively find all .md files
function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const contentDir = path.join(__dirname, 'content');
const files = findMarkdownFiles(contentDir);

console.log(`Fixing Twitter embeds and code blocks in ${files.length} files...`);

let totalFixes = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix over-escaped Twitter embeds
  // Remove backticks from inside blockquote tags
  content = content.replace(/<blockquote class="twitter-tweet">`(.*?)`<\/blockquote>/gs, (match, p1) => {
    // Remove all backticks from inside the blockquote
    const cleaned = p1.replace(/`/g, '');
    return `<blockquote class="twitter-tweet">${cleaned}</blockquote>`;
  });
  
  // Fix code blocks with escaped HTML inside
  // Look for triple backticks with escaped HTML inside
  content = content.replace(/```\n`<([^`]+)>`([^`]*)`<\/([^`]+)>`\n```/g, '```\n<$1>$2</$3>\n```');
  
  // Fix single line code blocks
  content = content.replace(/```\n`<([^`\n]+)>`\n```/g, '```\n<$1>\n```');
  
  // Fix script tags that shouldn't be there
  content = content.replace(/`<script[^>]*>`.*?<\/script>/gs, '');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relativePath = path.relative(contentDir, filePath);
    console.log(`✓ Fixed ${relativePath}`);
    totalFixes++;
  }
});

console.log(`\nFixed ${totalFixes} files.`);