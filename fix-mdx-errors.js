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

console.log(`Found ${files.length} markdown files to process...`);

let totalFixes = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix unescaped HTML tags in bold/strong markdown
  // Matches **<tag>** or **<tag attr="value">**
  content = content.replace(/\*\*<([^`>]+)>\*\*/g, '**`<$1>`**');
  
  // Fix HTML tags that should be in backticks
  // Common HTML tags that appear in markdown content
  const htmlPatterns = [
    // Opening tags with optional attributes
    /<(h[1-6]|strong|b|i|em|meta|link|title|br|img|a)(\s[^>]*)?>/g,
    // Closing tags
    /<\/(h[1-6]|strong|b|i|em|meta|link|title|a)>/g,
  ];
  
  htmlPatterns.forEach(pattern => {
    content = content.replace(pattern, (match, p1, p2, offset) => {
      // Check if already in backticks (look before and after)
      const before = content.substring(Math.max(0, offset - 1), offset);
      const after = content.substring(offset + match.length, offset + match.length + 1);
      
      // Skip if already in backticks or in code block
      if (before === '`' || after === '`') {
        return match;
      }
      
      // Skip if in code block (line starts with 4 spaces or tab)
      const lineStart = content.lastIndexOf('\n', offset) + 1;
      const linePrefix = content.substring(lineStart, offset);
      if (linePrefix.match(/^(\s{4,}|\t)/)) {
        return match;
      }
      
      return '`' + match + '`';
    });
  });
  
  // Fix specific patterns
  // Fix <== which gets parsed as HTML
  content = content.replace(/<==/g, '(use arrow or note)');
  
  // Fix malformed bold markdown like **text<**
  content = content.replace(/\*\*([^*]+)<\*\*/g, '**$1**');
  
  // Remove CSS styles (they have curly braces that break MDX)
  // Matches patterns like .class-name { css properties }
  content = content.replace(/^\s*\.[a-zA-Z0-9_-]+\s*\{[^}]*\}\s*$/gm, '');
  
  // Fix unclosed bold markdown
  content = content.replace(/\*\*([^*\n]+)\*\*(\s*)\*\*/g, '**$1**$2');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relativePath = path.relative(contentDir, filePath);
    console.log(`✓ Fixed ${relativePath}`);
    totalFixes++;
  }
});

console.log(`\nFixed ${totalFixes} files with MDX issues.`);
console.log('Now run: npm run build');