import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function collectTypeScriptFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectTypeScriptFiles(path);
    }

    return entry.isFile() && entry.name.endsWith('.ts') ? [path] : [];
  });
}

const files = [
  ...collectTypeScriptFiles('src'),
  ...collectTypeScriptFiles('test'),
];
const executable = process.platform === 'win32'
  ? join(process.cwd(), 'node_modules', '.bin', 'oxlint.cmd')
  : join(process.cwd(), 'node_modules', '.bin', 'oxlint');
const result = spawnSync(executable, ['--type-aware', ...files], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);
