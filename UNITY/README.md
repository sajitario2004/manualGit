# Manuales de Unity y GitHub: De Novato a Avanzado 🎮

Colección de manuales técnicos profesionales exhaustivos sobre el control de versiones y la colaboración en videojuegos utilizando **Unity (2022 LTS / Unity 6)** y **GitHub**, diseñados específicamente para estudios de videojuegos y desarrolladores independientes en **Debian Linux**, **Windows (PowerShell)** y **macOS (Apple Silicon)**.

---

## 📚 Documentos Disponibles

| Plataforma | Shell / Entorno | Guía en Markdown | Documento PDF (Alta Resolución) |
| :--- | :--- | :---: | :---: |
| **Debian GNU/Linux** | Bash, Git LFS, `gh`, UnityYAMLMerge, GameCI | [Ver Markdown](manual-unity-github-debian-linux.md) | [Descargar PDF](manual-unity-github-debian-linux.pdf) |
| **Windows 10 / 11** | PowerShell 7+, Winget, GCM, Visual Studio / Rider | [Ver Markdown](manual-unity-github-powershell-windows.md) | [Descargar PDF](manual-unity-github-powershell-windows.pdf) |
| **macOS Apple Silicon** | Zsh, Homebrew ARM64, Metal, Xcode / Rider | [Ver Markdown](manual-unity-github-macos-apple-silicon.md) | [Descargar PDF](manual-unity-github-macos-apple-silicon.pdf) |

---

## 🔗 Navegación Interactiva Bidireccional en los PDFs

Los archivos PDF generados incluyen un **motor de navegación interna**:
- **Desde el Índice de Contenidos:** Cada uno de los 57 temas y subtemas es un enlace clickeable que te traslada instantáneamente a la página y posición exacta del documento.
- **Desde Cualquier Sección:** Al final de cada apartado se encuentra el botón:
  ```html
  ↑ Volver al Índice de Contenidos
  ```
  Al pulsarlo, regresarás de inmediato al índice principal ubicado en las primeras páginas del manual.

---

## 🗺️ Estructura Completa de los Manuales (10 Partes)

1. **Parte I: Fundamentos y Preparación del Entorno Unity**
   - Anatomía de un proyecto: qué se versiona (`Assets/`, `Packages/`, `ProjectSettings/`) y qué se ignora (`Library/`, `Temp/`, `UserSettings/`, etc.).
   - Instalación de herramientas por plataforma (Bash / PowerShell / Zsh) con soporte de rutas largas (`core.longpaths true`) y Git Credential Manager.
   - Configuración obligatoria en Unity: `Visible Meta Files` y `Force Text`.
   - La regla de oro de los archivos `.meta` y la preservación de GUIDs.
   - `.gitignore` oficial y optimizado para motores de juego.
   - Plantilla exhaustiva de `.gitattributes` con Git LFS y normalización `eol=lf`.
   - Arquitectura AAA de carpetas: aislamiento en `Assets/_Project/` frente a `Plugins/` y `ThirdParty/`.

2. **Parte II: Flujo de Trabajo Esencial Diario (Nivel Novato)**
   - Inicialización y publicación de repositorios vía CLI (`gh`) y **GitHub Desktop**.
   - Clonación correcta con Git LFS para evitar archivos binarios corruptos de 130 bytes.
   - Ciclo de trabajo seguro: inspección de parejas `asset` + `.meta` antes de confirmar.
   - Convención de Conventional Commits aplicada a videojuegos (`feat:`, `art:`, `level:`, `audio:`, `perf:`).
   - Sincronización lineal limpia con `pull --rebase` para proteger la caché de compilación de Unity.

3. **Parte III: Ramas, Fusiones y Estrategias Colaborativas (Nivel Intermedio)**
   - Estrategia de ramas por características (*feature branches*) en CLI y GitHub Desktop.
   - Arquitectura de escenas divididas: Multi-Scene Editing Aditivo para trabajo concurrente sin colisiones.
   - Aislamiento de entidades mediante Prefabs Anidados y Variantes (*Prefab Variants*).
   - Configuración de `UnityYAMLMerge` y personalización del fallback visual en `mergespecfile.txt` (Visual Studio, JetBrains Rider, Beyond Compare, FileMerge o VS Code).
   - Gestión de trabajo en curso con `git stash` y reversión de commits desde el historial.
   - Modularización de código con Assembly Definitions (`.asmdef` y `.asmref`) para compilar sub-librerías en menos de 1 segundo.
   - Integración de **Unity Accelerator** en la red local (LAN) para compartir caché de texturas y shaders entre estaciones de desarrollo.

4. **Parte IV: Soluciones por Temas a Conflictos y Edición Concurrente**
   - Tema 1: Prevención arquitectónica de conflictos en Unity.
   - Tema 2: Conflictos en archivos `.meta` (desincronización y colisión de GUIDs).
   - Tema 3: Conflictos en código C# (`.cs`) con marcadores de fusión (`<<<<<<< HEAD`, `=======`, `>>>>>>>`).
   - Tema 4: Conflictos en escenas y prefabs con `UnityYAMLMerge` (CLI y GitHub Desktop).
   - Tema 5: Forzar versiones completas de assets (`--ours` vs `--theirs`).
   - Tema 6: Resolución de cambios locales provocados por el autoguardado del Editor al pulsar Play.
   - Tema 7: Push rechazado por desfase y rebase seguro con LFS.
   - Tema 8: Conflictos en archivos binarios y bloqueo concurrente con `git lfs lock`.
   - Tema 9: Eliminación de assets con archivos `.meta` huérfanos.

5. **Parte V: Herramientas Modernas de Productividad Avanzada**
   - Git Worktrees: trabajar en múltiples ramas a la vez en carpetas paralelas sin invalidar la carpeta `Library/`.
   - Búsqueda binaria de bugs en lógica C# con `git bisect` y `git blame`.
   - GitHub Codespaces para revisión remota y edición de shaders/scripts en la nube.
   - GitHub Copilot CLI para programadores de videojuegos.
   - Git Hooks locales (`pre-commit`) para impedir subidas de assets sin su archivo `.meta`.
   - Descargas parciales y ahorro de cuota con `lfs.fetchexclude` y `git sparse-checkout` en repositorios masivos (+100 GB).

6. **Parte VI: Gestión de Paquetes UPM y Dependencias**
   - Instalación de dependencias externas vía URLs de repositorios Git en `Packages/manifest.json`.
   - Creación y consumo de paquetes UPM en registros privados de GitHub Packages mediante tokens (`.upmconfig.toml`).
   - Addressables Asset System (`com.unity.addressables`) frente al anti-patrón `Resources/`: versionado de esquemas YAML e ignorado de `ServerData/`.

7. **Parte VII: Automatización CI/CD con GitHub Actions y GameCI**
   - Arquitectura de GameCI para compilación desatendida de ejecutables de videojuegos.
   - Activación y custodia segura de licencias de Unity (`UNITY_LICENSE`).
   - Pipelines automatizados de pruebas PlayMode/EditMode y compilación multiplataforma (StandaloneLinux64, StandaloneWindows64, StandaloneOSX).
   - Generación y publicación de artefactos compilados (.exe, .app, .x86_64).
   - Pruebas automatizadas con **Code Coverage** (`com.unity.test-framework.code-coverage`) y generación de reportes HTML.

8. **Parte VIII: Seguridad y Políticas de Repositorio en Equipos de Videojuegos**
   - Reglas de protección de ramas (*Branch Protection Rules* y *Rulesets*).
   - Custodia de secretos de producción (APIs de Steamworks, Photon Engine, PlayFab, Apple Game Center).
   - Gobernanza y asignación automática de revisores mediante directivas `CODEOWNERS` por departamento.

9. **Parte IX: Distribución y Despliegue con GitHub Releases**
   - Publicación formal de versiones estables mediante etiquetas semánticas (`v1.0.0`).
   - Empaquetado y subida automatizada de instaladores y binarios comprimidos (`.zip`, `.tar.gz`, `.dmg`).

10. **Parte X: Catálogo Maestro de Incidentes Críticos de Unity**
    - Incidente 1: "Missing Script" masivo por desincronización de GUIDs.
    - Incidente 2: Escenas corruptas por edición manual o marcadores de conflicto residuales.
    - Incidente 3: Subida accidental de la carpeta `Library/` (repositorio gigante).
    - Incidente 4: Repositorio bloqueado por archivos superiores a 100 MB y migración con `git-filter-repo`.
    - Incidente 5: Shaders rosas/magentas tras clonar en Linux o macOS.
    - Incidente 6: Límite de ancho de banda o cuota de almacenamiento de Git LFS superado.
    - Incidente 7: Desfase de versiones menores del Editor de Unity entre integrantes.
    - Incidente 8: Archivos bloqueados por procesos en segundo plano de Unity (`unlink failed` / `Permission denied`).
    - Incidente 9: Fuga de credenciales en ScriptableObjects o archivos de configuración.
    - Incidente 10: Procedimiento seguro de reconstrucción limpia ("Reset Nuclear") de la caché local del proyecto.

---

## 🛠️ Compilación Local de los Manuales a PDF

Para recompilar los documentos PDF desde los archivos Markdown fuente:

```bash
# Instalar dependencias necesarias (requiere Node.js)
npm install

# Compilar los 3 manuales de Unity a PDF
npm run build:unity

# O compilar la suite completa (General + Unity)
npm run build
```
