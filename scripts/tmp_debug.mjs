import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Debug script to find frontmatter parsing errors
const contentDir = path.join(process.cwd(), 'content');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(contentDir);

let hasError = false;
for (const file of files) {
  try {
    const rawContent = fs.readFileSync(file, 'utf8');
    matter(rawContent);
  } catch (err) {
    hasError = true;
    console.error(`Error parsing ${file}:`, err.message);
  }
}

if (!hasError) {
  console.log('All MDX files parsed successfully.');
} else {
  process.exit(1);
}
