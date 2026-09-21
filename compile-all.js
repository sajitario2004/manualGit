const path = require('path');
const { compileManual } = require('./build-manuals.js');

const rootDir = __dirname;

const manuals = [
  {
    mdPath: path.join(rootDir, 'manual-github-debian-linux.md'),
    pdfPath: path.join(rootDir, 'manual-github-debian-linux.pdf'),
    osBadge: 'Debian GNU/Linux',
    accentColor: '#d70a53',
    accentLight: '#ff6584',
    bgCoverGrad: 'linear-gradient(135deg, #0f141c 0%, #1e1018 50%, #2e0816 100%)',
    title: 'MANUAL DE GITHUB<br><span>DE NOVATO A AVANZADO</span>',
    subtitle: 'Guía exhaustiva para desarrolladores y administradores en Debian GNU/Linux con Bash, GitHub CLI y GitHub Actions'
  },
  {
    mdPath: path.join(rootDir, 'manual-github-powershell-windows.md'),
    pdfPath: path.join(rootDir, 'manual-github-powershell-windows.pdf'),
    osBadge: 'Windows PowerShell',
    accentColor: '#0078d4',
    accentLight: '#50e6ff',
    bgCoverGrad: 'linear-gradient(135deg, #091322 0%, #0c203b 50%, #003a70 100%)',
    title: 'MANUAL DE GITHUB<br><span>DE NOVATO A AVANZADO</span>',
    subtitle: 'Guía exhaustiva para desarrolladores en Microsoft Windows con PowerShell 7+, Git Credential Manager y GitHub CLI'
  },
  {
    mdPath: path.join(rootDir, 'manual-github-macos-apple-silicon.md'),
    pdfPath: path.join(rootDir, 'manual-github-macos-apple-silicon.pdf'),
    osBadge: 'macOS Apple Silicon',
    accentColor: '#2997ff',
    accentLight: '#70baff',
    bgCoverGrad: 'linear-gradient(135deg, #161618 0%, #1d1d1f 50%, #0b1a2d 100%)',
    title: 'MANUAL DE GITHUB<br><span>DE NOVATO A AVANZADO</span>',
    subtitle: 'Guía exhaustiva para desarrolladores en macOS con chips Apple Silicon (M1/M2/M3/M4), Zsh, Keychain y GitHub Actions'
  }
];

console.log('Iniciando compilación de los 3 manuales a PDF...');
for (const m of manuals) {
  compileManual(m);
}
console.log('\n¡Todos los manuales PDF han sido generados exitosamente!');
