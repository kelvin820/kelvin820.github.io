param([switch]$Build)
$ErrorActionPreference = 'Stop'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodeExecutable = if ($nodeCommand) { $nodeCommand.Source } else {
    Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
}
if (-not (Test-Path -LiteralPath $nodeExecutable)) { throw 'Node.js is required. Install Node.js 24 LTS or open this project in Codex.' }
$astroEntry = Join-Path $PSScriptRoot 'node_modules/astro/astro.js'
if (-not (Test-Path -LiteralPath $astroEntry)) { throw 'Dependencies are missing. Run pnpm install --frozen-lockfile first.' }
Push-Location $PSScriptRoot
try {
    if ($Build) { & $nodeExecutable $astroEntry build }
    else { & $nodeExecutable $astroEntry dev --host 127.0.0.1 --port 4321 }
    if ($LASTEXITCODE -ne 0) { throw "Astro exited with code $LASTEXITCODE" }
}
finally { Pop-Location }
