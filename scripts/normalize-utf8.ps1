param(
  [Parameter(Mandatory = $true, ValueFromRemainingArguments = $true)]
  [string[]]$Paths
)

$ErrorActionPreference = "Stop"
$utf8 = New-Object System.Text.UTF8Encoding($false)

foreach ($path in $Paths) {
  $resolved = Resolve-Path -LiteralPath $path
  $content = [System.IO.File]::ReadAllText($resolved, [System.Text.Encoding]::UTF8)
  [System.IO.File]::WriteAllText($resolved, $content, $utf8)
  Write-Host "Normalizado em UTF-8:" $resolved
}
