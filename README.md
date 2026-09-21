# Manuales Oficiales de GitHub: De Novato a Avanzado 🚀

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform - Debian](https://img.shields.io/badge/Platform-Debian%20GNU%2FLinux-d70a53.svg?logo=debian)](manual-github-debian-linux.md)
[![Platform - Windows](https://img.shields.io/badge/Platform-Windows%20PowerShell-0078d4.svg?logo=powershell)](manual-github-powershell-windows.md)
[![Platform - macOS](https://img.shields.io/badge/Platform-macOS%20Apple%20Silicon-2997ff.svg?logo=apple)](manual-github-macos-apple-silicon.md)
[![PDFs](https://img.shields.io/badge/PDFs-Alta%20Resolución%20Incluidos-success.svg)](.)

Colección completa y exhaustiva de manuales técnicos profesionales para dominar el control de versiones con **Git** y todo el ecosistema colaborativo de **GitHub**, desde los fundamentos más elementales hasta flujos avanzados de CI/CD, seguridad y automatización con la API.

Cada manual está **100% adaptado a las herramientas, rutas, gestores de credenciales y particularidades de su sistema operativo**, e incluye:
- Comandos listos para copiar y pegar en la terminal.
- Explicaciones paso a paso de qué hace cada comando y sus opciones.
- Una guía integral con soluciones por temas cuando **dos personas editan el mismo archivo concurrentemente**.
- Versiones en **Markdown (`.md`)** y en **PDF imprimible de alta resolución (`.pdf`)** con portadas dedicadas, estilo visual oscuro para terminales y tablas comparativas.

---

## 📚 Índice de Manuales por Plataforma

| Sistema Operativo | Shell / Herramientas Clave | Manual Markdown | Documento PDF |
| :--- | :--- | :---: | :---: |
| **Debian GNU/Linux** | Bash, APT, `gh`, OpenSSH, GnuPG, Libsecret | [Ver Markdown](manual-github-debian-linux.md) | [Descargar PDF](manual-github-debian-linux.pdf) |
| **Windows 10 / 11** | PowerShell 7+, Winget, GCM, OpenSSH, Posh-Git | [Ver Markdown](manual-github-powershell-windows.md) | [Descargar PDF](manual-github-powershell-windows.pdf) |
| **macOS Apple Silicon** | Zsh, `/opt/homebrew`, Apple Keychain, Touch ID | [Ver Markdown](manual-github-macos-apple-silicon.md) | [Descargar PDF](manual-github-macos-apple-silicon.pdf) |

---

## 🗺️ Mapa de Contenidos Cubierto en Cada Manual

Cada uno de los tres manuales aborda la totalidad de funcionalidades del ecosistema GitHub divididas en 9 partes:

```
[ Parte I: Fundamentos y Entorno ]
  ├── Git vs GitHub (Distribuido vs Nube)
  ├── Instalación (APT / Winget / Homebrew ARM64)
  ├── Identidad y Finales de Línea (LF / CRLF / .gitattributes)
  ├── Autenticación Segura (SSH Ed25519 / Touch ID / PATs)
  └── Firma Criptográfica de Commits (SSH / GPG)

[ Parte II: Flujo Esencial (Novato) ]
  ├── Inicialización y Creación de Repositorios con GitHub CLI (gh)
  ├── El Ciclo de 3 Estados (Working Tree, Index/Staging, Commit)
  ├── Staging Selectivo y Conventional Commits (feat, fix, docs...)
  ├── Sincronización Remota (push, pull --rebase, fetch)
  └── Control de Archivos Ignorados (.gitignore)

[ Parte III: Ramificación y Fusión (Intermedio) ]
  ├── Ciclo de Vida de Ramas (git switch, git branch)
  ├── 3 Métodos de Merge en GitHub (Merge Commit, Squash, Rebase)
  ├── Modelos de Flujo (GitHub Flow, Git Flow, Forking Workflow)
  ├── Herramientas de Respaldo (git stash, git cherry-pick, git rebase -i)
  └── El Salvavidas: Recuperación con git reflog

[ Parte IV: Edición Concurrente del Mismo Archivo (Por Temas) ]
  ├── Tema 1: Prevención y Buenas Prácticas de Equipo
  ├── Tema 2: Fusión Automática en Líneas Distintas
  ├── Tema 3: Conflicto Directo en Mismas Líneas (Resolución Paso a Paso)
  ├── Tema 4: Elección Total de Versión (--ours vs --theirs)
  ├── Tema 5: Cambios Locales sin Confirmar (git stash)
  ├── Tema 6: Push Rechazado por Desfase (non-fast-forward) y Rebase Seguro
  ├── Tema 7: Resolución en Pull Requests (Web y CLI)
  ├── Tema 8: Conflicto de Modificación vs Eliminación
  └── Tema 9: Archivos Binarios y Bloqueo con Git LFS (git lfs lock)

[ Parte V: Gestión de Proyectos y Colaboración ]
  ├── GitHub Issues, Hitos y Etiquetas desde Terminal
  ├── Pull Requests, Revisiones de Código y Aprobaciones desde CLI
  ├── GitHub Projects (v2): Vistas Kanban y Automatizaciones
  └── GitHub Discussions y Wikis Clonables

[ Parte VI: Automatización CI/CD con GitHub Actions ]
  ├── Sintaxis de Workflows YAML
  ├── Pipelines para Debian, Windows (pwsh) y macOS (Apple Silicon ARM64)
  ├── Matrices Multiplataforma, Secretos y Caching
  └── Self-Hosted Runners como Servicios (Systemd, Windows Service, Launchd)

[ Parte VII: Distribución y Despliegue ]
  ├── GitHub Releases: Tags Semánticos y Binarios (.deb, .msi/.exe, .dmg)
  ├── GitHub Packages: Contenedores en GHCR y Registros de Paquetes
  └── GitHub Pages: Alojamiento Estático Automatizado con Actions

[ Parte VIII: Seguridad y Gobernanza ]
  ├── Branch Protection Rules y Rulesets
  ├── Dependabot, Secret Scanning y Push Protection
  ├── Análisis Estático con CodeQL (SAST)
  └── Asignación de Responsables con CODEOWNERS

[ Parte IX: Scripting con la API y Diagnóstico ]
  ├── Consultas REST y GraphQL con gh api + jq / ConvertFrom-Json
  ├── Automatización de Tareas con Scripts Shell (.sh, .ps1, .zsh)
  └── Guía de Resolución de Errores Típicos de Cada Plataforma
```

---

## ⚡ Guía Rápida: Solución a Conflictos del Mismo Archivo

Cuando dos personas modifican el mismo archivo en una misma carpeta:

```bash
# 1. Si tu compañero ya subió a GitHub y tú tienes cambios sin confirmar:
git stash save "mis-cambios-locales"
git pull --rebase origin main
git stash pop

# 2. Si las modificaciones fueron en distintas líneas:
# Git realiza la fusión de forma 100% automática.

# 3. Si las modificaciones fueron en las mismas líneas (conflicto directo):
# Abre el archivo en tu editor, elimina los marcadores (<<<<<<<, =======, >>>>>>>),
# deja el código final y ejecuta:
git add <archivo>
git rebase --continue
git push origin main

# 4. Si deseas descartar la versión ajena y conservar la tuya completa:
git checkout --ours <archivo>
git add <archivo>
git commit -m "resolve: conservar versión local"
git push origin main

# 5. Si deseas descartar tu versión y aceptar la del compañero completa:
git checkout --theirs <archivo>
git add <archivo>
git commit -m "resolve: aceptar versión remota del compañero"
git push origin main
```

*(Consulta la **Parte IV** de cualquiera de los manuales para el procedimiento exhaustivo con capturas y explicaciones detalladas).*

---

## 🛠️ Cómo Regenerar o Compilar los PDFs Localmente

Este repositorio incluye el pipeline automatizado de compilación basado en Node.js, Marked, Highlight.js y el motor de impresión headless de Google Chrome:

### Requisitos previos
- **Node.js** v18+ y npm instalados.
- **Google Chrome** instalado en el sistema.

### Pasos de compilación
```bash
# 1. Instalar dependencias del compilador
npm install

# 2. Compilar los 3 manuales Markdown a PDF de alta resolución
node compile-all.js
```

El script transformará automáticamente los bloques de código con resaltado sintáctico, convertirá los avisos de GitHub (`[!NOTE]`, `[!TIP]`, `[!WARNING]`) en cuadros estilizados con iconos y generará los archivos `.pdf` correspondientes.

---

## 📁 Estructura del Repositorio

```
manualGit/
├── .gitignore                               # Exclusiones de Git y dependencias
├── README.md                                # Documentación principal del repositorio
├── build-manuals.js                         # Motor de conversión Markdown -> HTML con estilos CSS
├── compile-all.js                           # Script ejecutor para compilar los 3 PDFs
├── package.json                             # Metadatos del proyecto y dependencias (marked, highlight.js)
├── manual-github-debian-linux.md            # Manual completo para Debian GNU/Linux
├── manual-github-debian-linux.pdf           # Versión PDF maquetada para Debian GNU/Linux
├── manual-github-powershell-windows.md      # Manual completo para Windows PowerShell
├── manual-github-powershell-windows.pdf     # Versión PDF maquetada para Windows PowerShell
├── manual-github-macos-apple-silicon.md     # Manual completo para macOS Apple Silicon
└── manual-github-macos-apple-silicon.pdf    # Versión PDF maquetada para macOS Apple Silicon
```

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Eres libre de usar, modificar, compartir y distribuir este contenido para fines personales, educativos o comerciales.
