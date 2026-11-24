// One line, one chill: this program only carries a single sentence from
// entry.txt to the output folder, and refuses to invent or alter a word.
// The scare lives in the sentence itself, never in code that decorates it.
// A blank or over-long line is rejected here, before any file is written.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const content = await readFile(sourcePath, "utf8");

if (!content.trim()) {
  console.error("entry.txt is empty or whitespace only");
  process.exit(1);
}

const length = Array.from(content).length;
if (length > 200) {
  console.error(`entry.txt is ${length} characters, over the 200 character limit`);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "entry.txt"), content, "utf8");
