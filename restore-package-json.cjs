/**
 * Uruchom w katalogu web, jeśli package.json jest obcięty / uszkodzony:
 *   node restore-package-json.cjs
 * Potem: npm install
 *
 * Wymagany Node >= 20 (Next 15 + Tailwind 4). Sprawdź: node -v
 * Z nvm: nvm install && nvm use
 */
const fs = require("fs");
const path = require("path");

const pkg = {
  name: "web",
  version: "0.1.0",
  private: true,
  engines: { node: ">=20.0.0" },
  scripts: {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "eslint",
  },
  dependencies: {
    react: "19.1.0",
    "react-dom": "19.1.0",
    next: "15.5.14",
  },
  devDependencies: {
    typescript: "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    tailwindcss: "^4",
    eslint: "^9",
    "eslint-config-next": "15.5.14",
    "@eslint/eslintrc": "^3",
  },
};

const target = path.join(__dirname, "package.json");
const text = JSON.stringify(pkg, null, 2) + "\n";
fs.writeFileSync(target, text, { encoding: "utf8" });
console.log("Zapisano", target, "(" + Buffer.byteLength(text, "utf8") + " bajtów)");
JSON.parse(fs.readFileSync(target, "utf8"));
console.log("JSON poprawny — możesz uruchomić: npm install");
