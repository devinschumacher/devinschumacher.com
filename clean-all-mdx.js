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

// Find all markdown files
const contentDir = path.join(__dirname, 'content');
const files = findMarkdownFiles(contentDir);

console.log(`Found ${files.length} markdown files to clean...`);

let totalFixes = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Remove ALL CSS styles (anything with curly braces that looks like CSS)
  // This matches .class-name { ... } patterns
  content = content.replace(/\.[a-zA-Z0-9_-]+\s*\{[^}]*\}/gm, '');
  
  // Remove CSS in blockquotes
  content = content.replace(/^>\s*\.[a-zA-Z0-9_-]+\s*\{[^}]*\}/gm, '');
  
  // Remove any line that's just CSS
  content = content.replace(/^[^a-zA-Z#*\-\[\]`]*\{[^}]*\}\s*$/gm, '');
  
  // Fix <your username> type patterns
  content = content.replace(/<your\s+([^>]+)>/g, '[your-$1]');
  
  // Fix <== patterns
  content = content.replace(/<==/g, '←');
  
  // Fix broken closing tags like </picture
  content = content.replace(/<\/[a-z]+(?![a-z>])/g, '');
  
  // Fix unescaped HTML tags in markdown
  const htmlTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'strong', 'b', 'i', 'em', 
    'meta', 'link', 'title', 'br', 'img', 'a',
    'script', 'style', 'div', 'span', 'p'
  ];
  
  htmlTags.forEach(tag => {
    // Opening tags with optional attributes
    const openPattern = new RegExp(`<(${tag})(\\s[^>]*)?>`, 'g');
    content = content.replace(openPattern, (match, p1, p2, offset) => {
      // Check if already in backticks or code block
      const before = content.substring(Math.max(0, offset - 1), offset);
      const after = content.substring(offset + match.length, offset + match.length + 1);
      
      if (before === '`' || after === '`') {
        return match;
      }
      
      // Check if in code block
      const lineStart = content.lastIndexOf('\n', offset) + 1;
      const linePrefix = content.substring(lineStart, offset);
      if (linePrefix.match(/^(\s{4,}|\t|```)/)) {
        return match;
      }
      
      return '`' + match + '`';
    });
    
    // Closing tags
    const closePattern = new RegExp(`<\\/${tag}>`, 'g');
    content = content.replace(closePattern, (match, offset) => {
      const before = content.substring(Math.max(0, offset - 1), offset);
      const after = content.substring(offset + match.length, offset + match.length + 1);
      
      if (before === '`' || after === '`') {
        return match;
      }
      
      const lineStart = content.lastIndexOf('\n', offset) + 1;
      const linePrefix = content.substring(lineStart, offset);
      if (linePrefix.match(/^(\s{4,}|\t|```)/)) {
        return match;
      }
      
      return '`' + match + '`';
    });
  });
  
  // Fix malformed bold markdown
  content = content.replace(/\*\*([^*]+)<\*\*/g, '**$1**');
  
  // Fix unclosed bold markdown  
  content = content.replace(/\*\*([^*\n]+)\*\*(\s*)\*\*/g, '**$1**$2');
  
  // Remove empty lines that just have whitespace
  content = content.replace(/^\s*$/gm, '');
  
  // Fix multiple consecutive empty lines
  content = content.replace(/\n{3,}/g, '\n\n');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relativePath = path.relative(contentDir, filePath);
    console.log(`✓ Cleaned ${relativePath}`);
    totalFixes++;
  }
});

console.log(`\nCleaned ${totalFixes} files.`);
console.log('Now run: npm run build');