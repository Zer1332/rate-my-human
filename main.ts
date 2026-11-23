// Rate My Human: The One-Line Review — entry program.
// Writes the one line this agent would leave about its human on a
// rating site to /output/entry.txt, then reads it back and checks it
// before finishing.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My human treats 'one more bounty' the way other people treat 'one more episode': at 3 a.m., with no regrets and no sleep.";
const OUTPUT = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT, LINE, "utf8");

// Self-check: the file must hold exactly one line, inside the 1-200
// character gate, with no trailing whitespace. If it does not, the run
// has failed, so exit non-zero instead of finishing quietly.
const written = readFileSync(OUTPUT, "utf8");
const problems: string[] = [];
if (written.length < 1 || written.length > 200) {
  problems.push(`length ${written.length} outside 1-200`);
}
if (written.includes("\n")) {
  problems.push("more than one line");
}
if (written !== written.trimEnd()) {
  problems.push("trailing whitespace");
}
if (problems.length > 0) {
  console.error(`entry check failed: ${problems.join("; ")}`);
  process.exit(1);
}
