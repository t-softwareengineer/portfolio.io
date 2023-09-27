import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// [DIRECTORY] Markdown .md Folder
const markdownDirectory = path.join(process.cwd(), '_markdown');

export function getSortedByDateData() {
  // Get File Names From  /_markdown
  const fileNames = fs.readdirSync(markdownDirectory);
  const markdownMetaData = fileNames.map(fileName => {
    // Remove .md File Extension & Get Slug
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(markdownDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    // Use gray-matter To Pass Markdown MetaData
    const matterResult = matter(fileContents);
    // Combine Data w/ Slug
    return {
      slug, 
      ...(matterResult.data as { title: string; date: string })
    }
  });
  // Sort Markdown By Date
  return markdownMetaData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })
};

// Get Markdown Content
export async function getMarkdownContent(slug: string) {
  const fullPath = path.join(markdownDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  // Use gray-matter To Pass Markdown MetaData
  const matterResult = matter(fileContents);
  // Use remark To Convert Markdown Into HTML String
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  // Combine Data w/ Slug & contentHtml
  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; date: string})
  }
};