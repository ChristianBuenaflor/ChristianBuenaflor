const fs = require("fs");
const path = require("path");
const { minify: minifyHtml } = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const { minify: minifyJs } = require("terser");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

function removeDist() {
  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true, force: true });
  }

  fs.mkdirSync(DIST, { recursive: true });
}

function getRelativePath(file) {
  return path.relative(ROOT, file);
}

async function processFile(source, destination) {
  const relative = getRelativePath(source);
  const ext = path.extname(source).toLowerCase();

  fs.mkdirSync(path.dirname(destination), { recursive: true });

  const content = fs.readFileSync(source, "utf8");

  // HTML
  if (ext === ".html") {
    const result = await minifyHtml(content, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    });

    fs.writeFileSync(destination, result);
    console.log(`HTML: ${relative}`);
    return;
  }

  // CSS
  if (ext === ".css") {
    const result = new CleanCSS({
      level: 2
    }).minify(content);

    if (result.errors.length) {
      console.error(`CSS error in ${relative}:`, result.errors);
      return;
    }

    fs.writeFileSync(destination, result.styles);
    console.log(`CSS: ${relative}`);
    return;
  }

  // JavaScript
  if (ext === ".js") {
    const result = await minifyJs(content, {
      compress: true,
      mangle: true
    });

    if (result.error) {
      console.error(`JS error in ${relative}:`, result.error);
      return;
    }

    fs.writeFileSync(destination, result.code);
    console.log(`JS: ${relative}`);
    return;
  }

  // Other files
  fs.copyFileSync(source, destination);
  console.log(`COPY: ${relative}`);
}

async function processDirectory(directory) {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true
  });

  for (const entry of entries) {
    const source = path.join(directory, entry.name);

    // Don't process these
    if (
      entry.name === "node_modules" ||
      entry.name === "dist" ||
      entry.name === ".git" ||
      entry.name === "build.js" ||
      entry.name === "package.json" ||
      entry.name === "package-lock.json"
    ) {
      continue;
    }

    const destination = path.join(
      DIST,
      path.relative(ROOT, source)
    );

    if (entry.isDirectory()) {
      await processDirectory(source);
    } else {
      await processFile(source, destination);
    }
  }
}

async function build() {
  console.log("Building production version...\n");

  removeDist();

  await processDirectory(ROOT);

  console.log("\nBuild completed!");
  console.log("Production files are in ./dist");
}

build().catch((error) => {
  console.error("\nBuild failed:", error);
  process.exit(1);
});