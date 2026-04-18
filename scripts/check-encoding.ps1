param(
  [string]$Root = "."
)

$ErrorActionPreference = "Stop"

$utf8Strict = New-Object System.Text.UTF8Encoding($false, $true)
$suspiciousPattern = "Ã|Â|ï¿½|�"
$extensions = @(".html", ".js", ".css", ".md", ".xml", ".txt")
$issues = New-Object System.Collections.Generic.List[string]

$files = Get-ChildItem -Path $Root -Recurse -File | Where-Object {
  $_.FullName -notmatch "[\\/]\.git[\\/]" -and $extensions -contains $_.Extension.ToLowerInvariant()
}

foreach ($file in $files) {
  try {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $content = $utf8Strict.GetString($bytes)
  } catch {
    $issues.Add("UTF-8 invalido: $($file.FullName)")
    continue
  }

  $matches = Select-String -InputObject $content -Pattern $suspiciousPattern -AllMatches
  foreach ($match in $matches) {
    $line = $content.Substring(0, $match.Matches[0].Index).Split("`n").Count
    $issues.Add("Mojibake suspeito: $($file.FullName):$line")
  }
}

if ($issues.Count -gt 0) {
  $issues | Sort-Object -Unique | ForEach-Object { Write-Host $_ }
  exit 1
}

Write-Host "OK: arquivos de texto validos em UTF-8 e sem padroes suspeitos."
