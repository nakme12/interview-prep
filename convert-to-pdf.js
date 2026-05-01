const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const marked = require('marked');

// Install marked if needed: npm install marked

const files = [
  'PRATIK_PATIDAR_FINAL_RESUME.md',
  'PRATIK_PATIDAR_NEXTJS_DEVELOPER.md',
  'PRATIK_PATIDAR_REACT_DEVELOPER.md',
  'PRATIK_PATIDAR_MERN_DEVELOPER.md'
];

const basePath = __dirname;

files.forEach(file => {
  const mdPath = path.join(basePath, file);
  const pdfPath = mdPath.replace('.md', '.pdf');

  if (fs.existsSync(mdPath)) {
    const markdown = fs.readFileSync(mdPath, 'utf8');

    // Try to use marked if available, otherwise use basic conversion
    let html;
    try {
      html = marked.parse(markdown);
    } catch (e) {
      // Fallback: basic markdown to HTML
      html = markdown
        .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
      html = `<p>${html}</p>`;
    }

    const htmlWithStyles = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 { font-size: 24px; margin-bottom: 5px; color: #1a1a1a; }
          h2 { font-size: 16px; margin-top: 15px; margin-bottom: 10px; color: #2c3e50; border-bottom: 2px solid #e0e0e0; padding-bottom: 5px; }
          h3 { font-size: 13px; margin-top: 10px; margin-bottom: 8px; }
          p { margin: 5px 0; }
          ul, ol { margin: 8px 0; padding-left: 20px; }
          li { margin: 3px 0; }
          strong { font-weight: 600; }
          em { font-style: italic; }
          hr { border: none; border-top: 1px solid #ddd; margin: 10px 0; }
          code { background-color: #f5f5f5; padding: 2px 5px; font-family: monospace; }
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

    const options = {
      format: 'A4',
      margin: '0.5in',
      border: '0',
      header: {
        height: '0'
      },
      footer: {
        height: '0'
      }
    };

    pdf.create(htmlWithStyles, options).toFile(pdfPath, (err, result) => {
      if (err) {
        console.error(`Error converting ${file}:`, err);
      } else {
        console.log(`✓ Generated: ${path.basename(pdfPath)}`);
      }
    });
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});
