# Manual de Unity y GitHub: De Novato a Avanzado en PowerShell (Windows)

> **Plataforma:** Microsoft Windows 10 / Windows 11 / Windows Server  
> **Motor:** Unity 2022 LTS / Unity 6 (6000.x)  
> **Herramientas:** PowerShell 7+, Git for Windows 2.40+, Git LFS, GitHub CLI (`gh`), GitHub Desktop, Git Credential Manager (GCM), Unity Hub, UnityYAMLMerge  

---

## Índice de Contenidos

1. [Parte I: Fundamentos y Preparación del Entorno Unity en Windows](#parte-i-fundamentos-y-preparación-del-entorno-unity-en-windows)
   - 1.1 [Anatomía de un Proyecto de Unity: Qué se versiona y qué se ignora](#11-anatomía-de-un-proyecto-de-unity-qué-se-versiona-y-qué-se-ignora)
   - 1.2 [Instalación de Git, Git LFS, GitHub CLI y GitHub Desktop con Winget](#12-instalación-de-git-git-lfs-github-cli-y-github-desktop-con-winget)
   - 1.3 [Configuración Crítica del Editor: Visible Meta Files y Force Text](#13-configuración-crítica-del-editor-visible-meta-files-y-force-text)
   - 1.4 [La Regla de Oro de los Archivos `.meta` y los GUIDs](#14-la-regla-de-oro-de-los-archivos-meta-y-los-guids)
   - 1.5 [El Archivo `.gitignore` Oficial y Optimizado para Unity en Windows](#15-el-archivo-gitignore-oficial-y-optimizado-para-unity-en-windows)
   - 1.6 [Configuración Exhaustiva de Git LFS con `.gitattributes`](#16-configuración-exhaustiva-de-git-lfs-con-gitattributes)
2. [Parte II: Flujo de Trabajo Esencial Diario (Nivel Novato)](#parte-ii-flujo-de-trabajo-esencial-diario-nivel-novato)
   - 2.1 [Inicializar y Publicar un Proyecto en GitHub (PowerShell y GitHub Desktop)](#21-inicializar-y-publicar-un-proyecto-en-github-powershell-y-github-desktop)
   - 2.2 [Clonación Correcta de Proyectos con Git LFS en Windows](#22-clonación-correcta-de-proyectos-con-git-lfs-en-windows)
   - 2.3 [El Ciclo de Trabajo Seguro: Modificar, Inspeccionar y Confirmar Commits](#23-el-ciclo-de-trabajo-seguro-modificar-inspeccionar-y-confirmar-commits)
   - 2.4 [Conventional Commits Aplicados al Desarrollo de Videojuegos](#24-conventional-commits-aplicados-al-desarrollo-de-videojuegos)
   - 2.5 [Sincronización sin Romper la Cache (`pull --rebase` vs Fetch en Desktop)](#25-sincronización-sin-romper-la-cache-pull---rebase-vs-fetch-en-desktop)
3. [Parte III: Ramas, Fusiones y Estrategias Colaborativas (Nivel Intermedio)](#parte-iii-ramas-fusiones-y-estrategias-colaborativas-nivel-intermedio)
   - 3.1 [Estrategia de Ramas en Equipos de Videojuegos (PowerShell y Desktop)](#31-estrategia-de-ramas-en-equipos-de-videojuegos-powershell-y-desktop)
   - 3.2 [Arquitectura de Escenas Divididas (Multi-Scene Editing Aditivo)](#32-arquitectura-de-escenas-divididas-multi-scene-editing-aditivo)
   - 3.3 [Aislamiento de Trabajo Mediante Prefabs Anidados y Variantes](#33-aislamiento-de-trabajo-mediante-prefabs-anidados-y-variantes)
   - 3.4 [Configuración de UnityYAMLMerge en Windows como Mergetool](#34-configuración-de-unityyamlmerge-en-windows-como-mergetool)
   - 3.5 [Uso de Git Stash, Historial y Reversión Segura (PowerShell y Desktop)](#35-uso-de-git-stash-historial-y-reversión-segura-powershell-y-desktop)
4. [Parte IV: Soluciones por Temas a Conflictos y Edición Concurrente](#parte-iv-soluciones-por-temas-a-conflictos-y-edición-concurrente)
   - 4.1 [Tema 1: Prevención Arquitectónica de Conflictos en Unity](#41-tema-1-prevención-arquitectónica-de-conflictos-en-unity)
   - 4.2 [Tema 2: Conflictos en Archivos `.meta` (GUID Desincronizado)](#42-tema-2-conflictos-en-archivos-meta-guid-desincronizado)
   - 4.3 [Tema 3: Conflictos en Scripts C# (`.cs`)](#43-tema-3-conflictos-en-scripts-c-cs)
   - 4.4 [Tema 4: Conflictos en Escenas y Prefabs con UnityYAMLMerge (PowerShell y Desktop)](#44-tema-4-conflictos-en-escenas-y-prefabs-con-unityyamlmerge-powershell-y-desktop)
   - 4.5 [Tema 5: Forzar una Versión Completa de Asset (`--ours` vs `--theirs`)](#45-tema-5-forzar-una-versión-completa-de-asset---ours-vs---theirs)
   - 4.6 [Tema 6: Cambios Locales en el Editor al Hacer Pull](#46-tema-6-cambios-locales-en-el-editor-al-hacer-pull)
   - 4.7 [Tema 7: Push Rechazado por Desfase y Rebase Seguro con LFS](#47-tema-7-push-rechazado-por-desfase-y-rebase-seguro-con-lfs)
   - 4.8 [Tema 8: Conflictos en Binarios y Bloqueo con Git LFS Lock](#48-tema-8-conflictos-en-binarios-y-bloqueo-con-git-lfs-lock)
   - 4.9 [Tema 9: Conflicto de Eliminación de Asset con `.meta` Huérfano](#49-tema-9-conflicto-de-eliminación-de-asset-con-meta-huérfano)
5. [Parte V: Herramientas Modernas de Productividad Avanzada](#parte-v-herramientas-modernas-de-productividad-avanzada)
   - 5.1 [Git Worktrees en Windows: Trabajar en Múltiples Ramas sin Recargar `Library/`](#51-git-worktrees-en-windows-trabajar-en-múltiples-ramas-sin-recargar-library)
   - 5.2 [Depuración Binaria con Git Bisect y Blame en C#](#52-depuración-binaria-con-git-bisect-y-blame-en-c)
   - 5.3 [GitHub Codespaces desde PowerShell](#53-github-codespaces-desde-powershell)
   - 5.4 [GitHub Copilot CLI en PowerShell](#54-github-copilot-cli-en-powershell)
   - 5.5 [Git Hooks y Validación Pre-commit de Archivos `.meta` en Windows](#55-git-hooks-y-validación-pre-commit-de-archivos-meta-en-windows)
6. [Parte VI: Gestión de Paquetes UPM y Dependencias](#parte-vi-gestión-de-paquetes-upm-y-dependencias)
   - 6.1 [Instalación de Paquetes Mediante URLs de Git en UPM](#61-instalación-de-paquetes-mediante-urls-de-git-en-upm)
   - 6.2 [Creación y Publicación de Paquetes UPM en Repositorios Privados con Tokens](#62-creación-y-publicación-de-paquetes-upm-en-repositorios-privados-con-tokens)
7. [Parte VII: Automatización CI/CD con GitHub Actions y GameCI](#parte-vii-automatización-cicd-con-github-actions-y-gameci)
   - 7.1 [Arquitectura de GameCI para StandaloneWindows64](#71-arquitectura-de-gameci-para-standalonewindows64)
   - 7.2 [Activación de Licencias de Unity en GitHub Actions](#72-activación-de-licencias-de-unity-en-github-actions)
   - 7.3 [Pipeline Automatizado: Tests y Compilación StandaloneWindows64 (.exe)](#73-pipeline-automatizado-tests-y-compilación-standalonewindows64-exe)
   - 7.4 [Subida Automática de Instaladores a GitHub Releases](#74-subida-automática-de-instaladores-a-github-releases)
8. [Parte VIII: Seguridad y Políticas de Repositorio en Equipos de Videojuegos](#parte-viii-seguridad-y-políticas-de-repositorio-en-equipos-de-videojuegos)
   - 8.1 [Branch Protection Rules y Rulesets en Windows](#81-branch-protection-rules-y-rulesets-en-windows)
   - 8.2 [Gestión de Secretos para APIs de Juegos (Steam, Photon, Azure)](#82-gestión-de-secretos-para-apis-de-juegos-steam-photon-azure)
   - 8.3 [Gobernanza con `CODEOWNERS` para Artistas y Programadores](#83-gobernanza-con-codeowners-para-artistas-y-programadores)
9. [Parte IX: Distribución y Despliegue con GitHub Releases](#parte-ix-distribución-y-despliegue-con-github-releases)
   - 9.1 [Creación de Releases con Tags Semánticos desde PowerShell](#91-creación-de-releases-con-tags-semánticos-desde-powershell)
   - 9.2 [Empaquetado y Publicación de Archivos ZIP e Instaladores de Windows](#92-empaquetado-y-publicación-de-archivos-zip-e-instaladores-de-windows)
10. [Parte X: Catálogo Maestro de Incidentes Críticos de Unity en Windows](#parte-x-catálogo-maestro-de-incidentes-críticos-de-unity-en-windows)
    - 10.1 [Incidente 1: Bloqueo de Archivos por el Proceso de Unity (`unlink failed` / `Permission Denied`)](#101-incidente-1-bloqueo-de-archivos-por-el-proceso-de-unity-unlink-failed--permission-denied)
    - 10.2 [Incidente 2: Longitud de Ruta Máxima de Windows Excedida (`Filename too long`)](#102-incidente-2-longitud-de-ruta-máxima-de-windows-excedida-filename-too-long)
    - 10.3 [Incidente 3: Corrupción de Finales de Línea CRLF vs LF en Scripts C# y YAML](#103-incidente-3-corrupción-de-finales-de-línea-crlf-vs-lf-en-scripts-c-y-yaml)
    - 10.4 [Incidente 4: "Missing Script" Masivo por Desincronización de GUIDs](#104-incidente-4-missing-script-masivo-por-desincronización-de-guids)
    - 10.5 [Incidente 5: Subida Accidental de `Library/` o Archivos Temporales de Visual Studio](#105-incidente-5-subida-accidental-de-library-o-archivos-temporales-de-visual-studio)
    - 10.6 [Incidente 6: Push Rechazado por Archivo > 100 MB Atrapado en Commits Locales](#106-incidente-6-push-rechazado-por-archivo--100-mb-atrapado-en-commits-locales)
    - 10.7 [Incidente 7: Límite de Ancho de Banda de Git LFS Superado](#107-incidente-7-límite-de-ancho-de-banda-de-git-lfs-superado)
    - 10.8 [Incidente 8: Conflictos de Visual Studio con `.csproj` y `.sln` en Git](#108-incidente-8-conflictos-de-visual-studio-con-csproj-y-sln-en-git)
    - 10.9 [Incidente 9: Fuga de Claves de Steamworks o Azure en ScriptableObjects](#109-incidente-9-fuga-de-claves-de-steamworks-o-azure-en-scriptableobjects)
    - 10.10 [Incidente 10: Regeneración Segura y Limpia de la Caché Local en Windows](#1010-incidente-10-regeneración-segura-y-limpia-de-la-caché-local-en-windows)

---

# Parte I: Fundamentos y Preparación del Entorno Unity en Windows

## 1.1 Anatomía de un Proyecto de Unity: Qué se versiona y qué se ignora

En Windows, los proyectos de Unity generan decenas de miles de archivos temporales al compilar con Visual Studio o Rider:

```
D:\Dev\UnityProjects\MiJuego/
├── Assets/              --> [OBLIGATORIO EN GIT] Scripts C#, Escenas, Prefabs, Texturas, Modelos 3D y .meta.
├── Packages/            --> [OBLIGATORIO EN GIT] manifest.json y packages-lock.json (dependencias UPM).
├── ProjectSettings/     --> [OBLIGATORIO EN GIT] Configuración global del proyecto (Graphics, Input, Physics).
├── Library/             --> [¡NUNCA EN GIT!] Base de datos de assets compilada por el motor local.
├── Temp/                --> [¡NUNCA EN GIT!] Archivos volátiles de ejecución de Unity.
├── Obj/ & Build/        --> [¡NUNCA EN GIT!] Binarios compilados de C# y compilaciones ejecutables (.exe).
├── .vs/ & *.sln         --> [¡NUNCA EN GIT!] Soluciones y cachés generadas automáticamente por Visual Studio.
├── UserSettings/        --> [¡NUNCA EN GIT!] Disposición de ventanas del editor en tu monitor local.
└── Logs/                --> [¡NUNCA EN GIT!] Bitácoras de compilación de Unity y de crash reports.
```

---

## 1.2 Instalación de Git, Git LFS, GitHub CLI y GitHub Desktop con Winget

Abre **PowerShell 7** (o Windows Terminal) como Administrador y ejecuta:

```powershell
# 1. Instalar Git for Windows, Git LFS, GitHub CLI y GitHub Desktop
winget install --id Git.Git -e --source winget
winget install --id GitHub.cli -e --source winget
winget install --id GitHub.GitHubDesktop -e --source winget

# 2. Inicializar Git LFS globalmente
git lfs install

# 3. Configurar soporte para rutas largas en Windows (>260 caracteres)
git config --system core.longpaths true

# 4. Habilitar Git Credential Manager para Windows
git config --global credential.helper manager
```
> **¿Qué hace este comando?**  
> Instala el motor completo de Git, GitHub CLI, GitHub Desktop con soporte para el administrador de credenciales de Windows (GCM), activa los filtros globales de Git LFS y desbloquea el límite histórico de 260 caracteres de Windows NTFS (`core.longpaths true`), vital para proyectos complejos de Unity con carpetas profundamente anidadas.

---

## 1.3 Configuración Crítica del Editor: Visible Meta Files y Force Text

Antes de agregar el proyecto a Git, verifica estos parámetros en Unity:

1. Abre tu proyecto en Unity en Windows.
2. Navega al menú superior: **Edit -> Project Settings -> Version Control**.
   - En el campo **Mode**, selecciona: `Visible Meta Files`.
3. Navega a **Edit -> Project Settings -> Editor**.
   - En **Asset Serialization Mode**, selecciona: `Force Text`.

![Configuración Crítica de Unity: Visible Meta Files y Force Text](images/unity_project_settings.jpg)
<span class="caption-text">Figura 1.1: Configuración obligatoria en Unity Project Settings (Editor) estableciendo Visible Meta Files y Force Text para serialización YAML en Windows.</span>

> [!IMPORTANT]
> `Force Text` obliga al motor a serializar todas las escenas (`.unity`), prefabs (`.prefab`) y materiales (`.mat`) en texto plano **YAML legible** en lugar del formato binario propietario de Unity, permitiendo a Git generar diffs precisos y resolver conflictos.

---

## 1.4 La Regla de Oro de los Archivos `.meta` y los GUIDs

Cada asset en `Assets\` cuenta con un archivo gemelo `.meta` que contiene su GUID único:

```yaml
fileFormatVersion: 2
guid: 3f8a92b104c84a56a1b2c3d4e5f60718
```

> [!CAUTION]
> **LA REGLA FUNDAMENTAL:**  
> Si mueves, renombras o eliminas un asset desde el Explorador de Windows o la consola de PowerShell, **debes mover, renombrar o eliminar idénticamente su archivo `.meta`**. Nunca hagas un commit de un asset sin su respectivo `.meta`.

---

## 1.5 El Archivo `.gitignore` Oficial y Optimizado para Unity en Windows

Crea el archivo `.gitignore` en la raíz del proyecto:

```gitignore
# ==========================================
# .gitignore para Unity en Microsoft Windows
# ==========================================

[Ll]ibrary/
[Tt]emp/
[Oo]bj/
[Bb]uild/
[Bb]uilds/
[Ll]ogs/
[Uu]ser[Ss]ettings/
[Mm]emoryCaptures/

# Asset server cache
sysinfo.txt
*.stackdump

# Visual Studio / VS Code / JetBrains Rider
.vs/
.idea/
*.csproj
*.unityproj
*.sln
*.suo
*.user
*.userprefs
*.pidb
*.booproj
*.svd
*.pdb
*.opendb
*.VC.db

# Compilaciones Windows (.exe / .dll)
*.exe
*.dll
*.apk
*.unitypackage

# Archivos del Explorador de Windows
Thumbs.db
ehthumbs.db
[Dd]esktop.ini
$RECYCLE.BIN/
```

---

## 1.6 Configuración Exhaustiva de Git LFS con `.gitattributes`

Guarda este archivo `.gitattributes` en la raíz del repositorio:

```gitattributes
# ==========================================
# Configuración Git LFS para Unity en Windows
# ==========================================

# Formatos 3D y Rigs
*.fbx filter=lfs diff=lfs merge=lfs -text
*.obj filter=lfs diff=lfs merge=lfs -text
*.blend filter=lfs diff=lfs merge=lfs -text
*.dae filter=lfs diff=lfs merge=lfs -text
*.max filter=lfs diff=lfs merge=lfs -text

# Texturas e Imágenes Pesadas
*.psd filter=lfs diff=lfs merge=lfs -text
*.tga filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.exr filter=lfs diff=lfs merge=lfs -text
*.hdr filter=lfs diff=lfs merge=lfs -text
*.tif filter=lfs diff=lfs merge=lfs -text

# Audio y Vídeo
*.wav filter=lfs diff=lfs merge=lfs -text
*.mp3 filter=lfs diff=lfs merge=lfs -text
*.ogg filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.mov filter=lfs diff=lfs merge=lfs -text

# Archivos Comprimidos
*.zip filter=lfs diff=lfs merge=lfs -text
*.7z filter=lfs diff=lfs merge=lfs -text

# Bloqueo Concurrente para Binarios
*.fbx lockable
*.psd lockable
*.blend lockable
*.wav lockable

# Normalización de Saltos de Línea y Merge Driver de Unity
*.cs text diff=csharp eol=lf
*.json text eol=lf
*.shader text eol=lf
*.unity merge=unityyamlmerge eol=lf
*.prefab merge=unityyamlmerge eol=lf
*.mat merge=unityyamlmerge eol=lf
*.asset merge=unityyamlmerge eol=lf
*.meta text eol=lf
```

---

# Parte II: Flujo de Trabajo Esencial Diario (Nivel Novato)

## 2.1 Inicializar y Publicar un Proyecto en GitHub (PowerShell y GitHub Desktop)

### Modalidad A: Vía PowerShell 7
```powershell
Set-Location "D:\Dev\UnityProjects\MiJuego"
git init
git lfs install
git add .gitattributes .gitignore
git commit -m "chore: inicializar configuracion Unity con LFS y gitignore"
git branch -M main
gh repo create MiJuegoWindows --private --source=. --remote=origin --push
```
> **¿Qué hace este comando?**  
> Navega a la carpeta del proyecto, inicializa Git y Git LFS, confirma los archivos de configuración base y usa `gh` para crear el repositorio privado en tu cuenta de GitHub y subir la rama `main`.

### Modalidad B: Vía GitHub Desktop
1. Abre **GitHub Desktop**.
2. Pulsa en **File -> Add Local Repository** (o `Ctrl + O`).
3. Haz clic en **Choose...** y selecciona la carpeta de tu proyecto Unity.
4. Si la carpeta aún no tiene Git inicializado, pulsa en el enlace azul **"create a repository"**.
5. Haz clic en el botón azul **Add Repository**.
6. En la barra superior, haz clic en **Publish repository** para subirlo a tu cuenta de GitHub de forma privada o pública.

![Adición o Clonación de Proyecto Unity en GitHub Desktop](images/gh_desktop_clone_add.jpg)
<span class="caption-text">Figura 2.1: Cuadro de diálogo 'Add Existing Repository' en GitHub Desktop vinculando la carpeta del proyecto Unity en Windows.</span>

---

## 2.2 Clonación Correcta de Proyectos con Git LFS en Windows

### Modalidad A: Vía PowerShell
```powershell
git lfs install
git clone git@github.com:mi-organizacion/videojuego.git
Set-Location videojuego
git lfs pull
```

### Modalidad B: Vía GitHub Desktop
1. Ve a **File -> Clone Repository** (o `Ctrl + Shift + O`).
2. Selecciona el repositorio de la lista de tu cuenta o introduce la URL.
3. Elige la carpeta de destino local y pulsa **Clone**.
4. GitHub Desktop descargará automáticamente todos los modelos 3D y texturas de LFS en segundo plano.

---

## 2.3 El Ciclo de Trabajo Seguro: Modificar, Inspeccionar y Confirmar Commits

### Modalidad A: Vía PowerShell
```powershell
# 1. Comprobar archivos modificados
git status

# 2. Agregar scripts y prefabs junto con sus respectivos .meta
git add Assets/Scripts/PlayerController.cs Assets/Scripts/PlayerController.cs.meta
git add Assets/Prefabs/Player.prefab Assets/Prefabs/Player.prefab.meta

# 3. Confirmar commit
git commit -m "feat(player): agregar control de movimiento y fisica con Rigidbody2D"
```

### Modalidad B: Vía GitHub Desktop
1. En la pestaña **Changes** de la izquierda, revisa la lista de archivos modificados.
2. Comprueba que cada script `.cs` o prefab tenga marcada su casilla junto a su archivo gemelo `.meta`.
3. Haz clic sobre cualquier archivo para ver en el panel derecho las diferencias exactas de código (*diff*).
4. Rellena el campo **Summary** con el mensaje del commit y opcionalmente añade detalles en **Description**.
5. Pulsa en el botón azul **Commit to main** (o a la rama de trabajo activa).

![Gestión de Cambios, Archivos .meta y Commits en GitHub Desktop](images/gh_desktop_commit_changes.jpg)
<span class="caption-text">Figura 2.2: Pestaña de cambios en GitHub Desktop verificando la integridad en pareja de archivos y metadatos de Unity antes de confirmar.</span>

---

## 2.4 Conventional Commits Aplicados al Desarrollo de Videojuegos

| Prefijo | Área de Aplicación en Videojuegos | Ejemplo |
| :--- | :--- | :--- |
| `feat:` | Nuevas mecánicas o sistemas jugables | `feat(inventory): crear sistema de slots y arrastre de items` |
| `fix:` | Corrección de fallos o glitches de físicas | `fix(camera): corregir vibracion de Cinemachine al seguir al jugador` |
| `art:` | Modelos 3D, texturas, animaciones y rigs | `art(weapons): anadir modelo 3D y textura PBR de la escopeta` |
| `level:` | Modificaciones de escenas y diseño de niveles | `level(arena): distribuir spawners de oleadas y luces nocturnas` |
| `audio:` | Efectos de sonido y mezclas de AudioMixer | `audio(ambient): integrar pistas de viento y pasos sobre nieve` |
| `perf:` | Optimizaciones de draw calls y memoria | `perf(occlusion): hornear matrices de Occlusion Culling en nivel 1` |
| `chore:` | Mantenimiento de paquetes UPM o gitignore | `chore(upm): actualizar paquete Input System a version 1.7.0` |

---

## 2.5 Sincronización sin Romper la Cache (`pull --rebase` vs Fetch en Desktop)

### Modalidad A: Vía PowerShell
```powershell
git pull --rebase origin main
git push origin main
```
> El uso de `--rebase` evita los merge commits artificiales que alteran la fecha de modificación de los archivos y obligan al motor a reimportar la base de datos de assets.

### Modalidad B: Vía GitHub Desktop
1. Pulsa en **Fetch origin** en la barra superior para buscar actualizaciones remotas.
2. Si hay commits nuevos de tus compañeros, pulsa en el botón **Pull origin**.
3. Envía tus cambios pendientes haciendo clic en **Push origin**.

---

# Parte III: Ramas, Fusiones y Estrategias Colaborativas (Nivel Intermedio)

## 3.1 Estrategia de Ramas en Equipos de Videojuegos (PowerShell y Desktop)

### Modalidad A: Vía PowerShell
```powershell
# Crear y cambiar a una rama de trabajo
git switch -c feature/sistema-combate

# Publicar la rama en GitHub
git push -u origin feature/sistema-combate
```

### Modalidad B: Vía GitHub Desktop
1. En la barra superior, haz clic en el menú **Current Branch**.
2. Escribe el nombre de tu rama (ej. `feature/sistema-combate`).
3. Haz clic en el botón azul **New branch...**.
4. Haz clic en **Publish branch** para sincronizarla con GitHub.

![Gestión de Ramas y Creación de Feature Branches en GitHub Desktop](images/gh_desktop_branch.jpg)
<span class="caption-text">Figura 3.1: Menú desplegable 'Current Branch' en GitHub Desktop facilitando la creación y conmutación de ramas aisladas en Windows.</span>

---

## 3.2 Arquitectura de Escenas Divididas (Multi-Scene Editing Aditivo)

En videojuegos, editar la misma escena al mismo tiempo genera colisiones catastróficas. La solución estándar en la industria es dividir el mundo en múltiples escenas aditivas:

```
Nivel_Bosque/
├── Nivel_Core.unity        --> Cámaras, GameManagers, UI Canvas.
├── Nivel_Arte.unity        --> Terreno, vegetación, rocas y props (Artistas).
├── Nivel_Luces.unity       --> Post-processing, luces y sondas (Iluminadores).
└── Nivel_Gameplay.unity    --> Triggers, enemigos y zonas de muerte (Diseñadores).
```

### Script C# para Carga Aditiva en Tiempo de Ejecución:
Guarda en `Assets\Scripts\AdditiveLoader.cs`:
```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class AdditiveLoader : MonoBehaviour
{
    [SerializeField] private string[] subScenes = { "Nivel_Arte", "Nivel_Luces", "Nivel_Gameplay" };

    private void Start()
    {
        foreach (string scene in subScenes)
        {
            if (!SceneManager.GetSceneByName(scene).isLoaded)
            {
                SceneManager.LoadSceneAsync(scene, LoadSceneMode.Additive);
            }
        }
    }
}
```

---

## 3.3 Aislamiento de Trabajo Mediante Prefabs Anidados y Variantes

* Edita componentes siempre en el **Prefab Mode**, no directamente en la escena.
* Emplea **Prefab Variants** para variantes de enemigos o props. Las variantes solo guardan las diferencias (*overrides*), evitando conflictos de fusión en el archivo base.

---

## 3.4 Configuración de UnityYAMLMerge en Windows como Mergetool

Configura el motor oficial de fusión tridireccional de Unity en PowerShell:

```powershell
# Obtener la ruta del Unity Editor instalado más reciente en Program Files
$UnityPath = Get-ChildItem "C:\Program Files\Unity\Hub\Editor\*\Editor\Data\Tools\UnityYAMLMerge.exe" | Select-Object -Last 1 -ExpandProperty FullName

# Configurar el driver de fusión en Git
git config --global merge.unityyamlmerge.name "Unity Smart Merge"
git config --global merge.unityyamlmerge.driver "`"$UnityPath`" merge -h -p -- `"%O`" `"%B`" `"%A`" `"%A`""
git config --global merge.unityyamlmerge.trustExitCode true
git config --global merge.unityyamlmerge.recursive binary
```
> **¿Qué hace este comando?**  
> Localiza la versión instalada de Unity y conecta `UnityYAMLMerge.exe` con Git. Cuando ocurra un conflicto en un archivo `.unity` o `.prefab`, UnityYAMLMerge fusionará automáticamente los GameObjects modificados.

---

## 3.5 Uso de Git Stash, Historial y Reversión Segura (PowerShell y Desktop)

### Modalidad A: Vía PowerShell
```powershell
# Guardar cambios sin confirmar
git stash save "WIP: ajuste de inventario"

# Cambiar de rama y revisar bug
git switch main

# Restaurar cambios
git switch feature/mi-rama
git stash pop
```

### Modalidad B: Vía GitHub Desktop
1. Al cambiar de rama con cambios sucios, pulsa en **"Leave my changes on [rama-actual]"** (crea un stash).
2. Para restaurar, pulsa en **Restore** dentro de **Stashed Changes** en la barra lateral.
3. Para deshacer un commit con errores: ve a la pestaña **History**, clic derecho sobre el commit -> **Revert changes in commit**.

![Historial de Commits e Inspección de Cambios en GitHub Desktop](images/gh_desktop_history.jpg)
<span class="caption-text">Figura 3.2: Pestaña 'History' en GitHub Desktop permitiendo inspección de diffs y reversión limpia de commits problemáticos.</span>

---

# Parte IV: Soluciones por Temas a Conflictos y Edición Concurrente

## 4.1 Tema 1: Prevención Arquitectónica de Conflictos en Unity
* Organiza las carpetas por subsistemas funcionales.
* No permitas que dos personas editen la misma escena sin una división aditiva previa.
* Utiliza prefabs independientes para cada entidad interactiva.

---

## 4.2 Tema 2: Conflictos en Archivos `.meta` (GUID Desincronizado)

```powershell
# Ver archivos en conflicto
git status
```
1. Abre el archivo `.meta` en VS Code.
2. Si el archivo ya estaba referenciado en escenas por otro desarrollador, conserva el GUID del servidor remoto.
3. Elimina los marcadores de conflicto dejando una sola línea `guid:`.
4. Confirma la resolución:
```powershell
git add Assets\Textures\Heroe.png.meta
git commit -m "fix(meta): resolver colision de GUID en textura de Heroe"
```

---

## 4.3 Tema 3: Conflictos en Scripts C# (`.cs`)

Combina las líneas en Visual Studio o Rider, guarda y ejecuta:
```powershell
git add Assets\Scripts\EnemyAI.cs
git commit -m "fix(ai): fusionar logica de persecucion y ataque a distancia"
```

---

## 4.4 Tema 4: Conflictos en Escenas y Prefabs con UnityYAMLMerge (PowerShell y Desktop)

### Modalidad A: Vía PowerShell
```powershell
git mergetool -t unityyamlmerge
```
> UnityYAMLMerge resolverá de forma semántica los IDs internos de la escena sin corromper el árbol de objetos.

### Modalidad B: Vía GitHub Desktop
1. Tras un merge con colisión, aparece la ventana **Resolve conflicts before merging**.
2. En la fila del archivo de escena (`.unity`), haz clic en **Open in UnityYAMLMerge**.
3. Tras la fusión automática, haz clic en el botón azul **Resolve Conflicts** para sellar el merge.

![Resolución de Conflictos en Unity con GitHub Desktop y UnityYAMLMerge](images/gh_desktop_conflict.jpg)
<span class="caption-text">Figura 4.1: Modal de resolución de conflictos en GitHub Desktop en Windows con opciones de apertura en UnityYAMLMerge.</span>

---

## 4.5 Tema 5: Forzar una Versión Completa de Asset (`--ours` vs `--theirs`)

### Modalidad A: Vía PowerShell
```powershell
# Conservar tu versión local
git checkout --ours Assets\Scenes\Nivel01.unity
git add Assets\Scenes\Nivel01.unity
git commit -m "resolve: conservar version local de Nivel01"

# O aceptar completamente la versión remota
git checkout --theirs Assets\Scenes\Nivel01.unity
git add Assets\Scenes\Nivel01.unity
git commit -m "resolve: aceptar version del servidor de Nivel01"
```

### Modalidad B: Vía GitHub Desktop
En la ventana modal de conflictos, haz clic en la flecha derecha del archivo y selecciona **Use Modified Version** (tuya) o **Use Existing Version** (remota).

---

## 4.6 Tema 6: Cambios Locales en el Editor al Hacer Pull

```powershell
git stash save "cambios-locales"
git pull --rebase origin main
git stash pop
```

---

## 4.7 Tema 7: Push Rechazado por Desfase y Rebase Seguro con LFS

```powershell
git fetch origin
git rebase origin/main
git push origin main
```

---

## 4.8 Tema 8: Conflictos en Binarios y Bloqueo con Git LFS Lock

Para evitar que dos artistas trabajen sobre el mismo archivo `.psd` o `.blend` en Windows:

```powershell
# 1. Bloquear archivo antes de editar
git lfs lock Assets\Art\Modelos\JefeFinal.blend

# 2. Consultar bloqueos activos
git lfs locks

# 3. Editar, commitear y subir
git add Assets\Art\Modelos\JefeFinal.blend
git commit -m "art(boss): esculpir detalles de armadura en modelo Blender"
git push origin main

# 4. Desbloquear para el equipo
git lfs unlock Assets\Art\Modelos\JefeFinal.blend
```

---

## 4.9 Tema 9: Conflicto de Eliminación de Asset con `.meta` Huérfano

```powershell
git rm Assets\Scripts\OldController.cs.meta
git commit -m "chore: purgar metadatos huerfanos tras eliminacion de asset"
```

---

# Parte V: Herramientas Modernas de Productividad Avanzada

## 5.1 Git Worktrees en Windows: Trabajar en Múltiples Ramas sin Recargar `Library/`

```powershell
# Crear worktree paralelo en otra carpeta
git worktree add ..\MiJuego-Hotfix hotfix/correccion-audio

# Trabajar en la carpeta secundaria sin tocar el Unity principal
Set-Location ..\MiJuego-Hotfix
git push origin hotfix/correccion-audio

# Al terminar, eliminar el worktree
Set-Location ..\MiJuego
git worktree remove ..\MiJuego-Hotfix
```

---

## 5.2 Depuración Binaria con Git Bisect y Blame en C#

```powershell
git bisect start
git bisect bad
git bisect good v1.2.0
# Probar y marcar: git bisect good / git bisect bad
git bisect reset
```

---

## 5.3 GitHub Codespaces desde PowerShell

```powershell
gh codespace create --repo mi-organizacion/MiJuegoWindows --branch main
```

---

## 5.4 GitHub Copilot CLI en PowerShell

```powershell
gh copilot suggest "como revertir un commit de una escena de unity sin tocar scripts"
gh copilot explain "git lfs push --all origin main"
```

---

## 5.5 Git Hooks y Validación Pre-commit de Archivos `.meta` en Windows

Crea el archivo `.git\hooks\pre-commit`:

```bash
#!/bin/sh
MISSING=0
for f in $(git diff --cached --name-only --diff-filter=A | grep '^Assets/'); do
    if [ "${f##*.}" != "meta" ]; then
        if [ ! -f "${f}.meta" ] && ! git diff --cached --name-only | grep -q "^${f}.meta$"; then
            echo "❌ ERROR: Falta el archivo .meta para: $f"
            MISSING=1
        fi
    fi
done
[ $MISSING -eq 1 ] && exit 1 || exit 0
```

---

# Parte VI: Gestión de Paquetes UPM y Dependencias

## 6.1 Instalación de Paquetes Mediante URLs de Git en UPM

Añade a `Packages\manifest.json`:
```json
{
  "dependencies": {
    "com.cysharp.unitask": "https://github.com/Cysharp/UniTask.git?path=src/UniTask/Assets/Plugins/UniTask",
    "com.neuecc.unirx": "https://github.com/neuecc/UniRx.git?path=Assets/Plugins/UniRx"
  }
}
```

---

## 6.2 Creación y Publicación de Paquetes UPM en Repositorios Privados con Tokens

Configura en `C:\Users\<TuUsuario>\.upmconfig.toml`:
```toml
[npmAuth."https://npm.pkg.github.com/mi-estudio"]
token = "ghp_TU_TOKEN_PERSONAL_CON_SCOPE_READ_PACKAGES"
email = "desarrollador@mi-estudio.com"
alwaysAuth = true
```

---

# Parte VII: Automatización CI/CD con GitHub Actions y GameCI

## 7.1 Arquitectura de GameCI para StandaloneWindows64

Compila automáticamente binarios de Windows a 64 bits (`.exe`) en runners de GitHub Actions mediante contenedores Docker con Windows target.

---

## 7.2 Activación de Licencias de Unity en GitHub Actions

En **Settings -> Secrets and variables -> Actions**, define:
* `UNITY_EMAIL`
* `UNITY_PASSWORD`
* `UNITY_LICENSE`

---

## 7.3 Pipeline Automatizado: Tests y Compilación StandaloneWindows64 (.exe)

Crea `.github\workflows\build-windows.yml`:

```yaml
name: Unity Windows Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    name: 🎮 Compilar StandaloneWindows64
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          lfs: true

      - uses: actions/cache@v3
        with:
          path: Library
          key: Library-Windows-${{ hashFiles('Assets/**', 'Packages/**') }}

      - uses: game-ci/unity-builder@v4
        env:
          UNITY_EMAIL: ${{ secrets.UNITY_EMAIL }}
          UNITY_PASSWORD: ${{ secrets.UNITY_PASSWORD }}
          UNITY_LICENSE: ${{ secrets.UNITY_LICENSE }}
        with:
          targetPlatform: StandaloneWindows64
          buildName: MiJuegoWindows

      - uses: actions/upload-artifact@v4
        with:
          name: Build-Windows-x64
          path: build/StandaloneWindows64
```

---

## 7.4 Subida Automática de Instaladores a GitHub Releases

El pipeline genera un archivo comprimido descargable con el ejecutable `.exe` y los datos asociados `_Data` de Unity.

---

# Parte VIII: Seguridad y Políticas de Repositorio en Equipos de Videojuegos

## 8.1 Branch Protection Rules y Rulesets en Windows

Protege la rama `main` en GitHub:
1. Obliga a pasar los tests de GameCI antes de fusionar.
2. Bloquea pushes directos forzando el uso de Pull Requests.

---

## 8.2 Gestión de Secretos para APIs de Juegos (Steam, Photon, Azure)

Guarda las credenciales en variables de entorno o archivos `.env` ignorados por Git. Nunca commitees claves de Steamworks o Azure PlayFab en scripts C#.

---

## 8.3 Gobernanza con `CODEOWNERS` para Artistas y Programadores

Crea `.github\CODEOWNERS`:
```
Assets/Scripts/           @lead-programmer
Assets/Art/               @lead-artist
Assets/Scenes/            @level-design-lead
ProjectSettings/          @tech-director
```

---

# Parte IX: Distribución y Despliegue con GitHub Releases

## 9.1 Creación de Releases con Tags Semánticos desde PowerShell

```powershell
git tag -a v1.0.0 -m "release: version inicial 1.0.0 para Windows"
git push origin v1.0.0
```

---

## 9.2 Empaquetado y Publicación de Archivos ZIP e Instaladores de Windows

```powershell
# Crear paquete ZIP en PowerShell
Compress-Archive -Path "build\StandaloneWindows64\*" -DestinationPath "MiJuego-v1.0.0-Windows.zip"

# Publicar el release con GitHub CLI
gh release create v1.0.0 "MiJuego-v1.0.0-Windows.zip" `
  --title "Mi Videojuego v1.0.0 (Windows 64-bit)" `
  --notes "Instalador oficial para Windows 10 y Windows 11."
```

---

# Parte X: Catálogo Maestro de Incidentes Críticos de Unity en Windows

## 10.1 Incidente 1: Bloqueo de Archivos por el Proceso de Unity (`unlink failed` / `Permission Denied`)

* **Causa:** El Editor de Unity o el demonio AssetDatabase mantiene descriptores de archivo abiertos en Windows, impidiendo a Git conmutar de rama.
* **Solución:**
  ```powershell
  # Forzar cierre del proceso de Unity en Windows
  Stop-Process -Name "Unity" -Force
  git checkout -f
  ```

---

## 10.2 Incidente 2: Longitud de Ruta Máxima de Windows Excedida (`Filename too long`)

* **Causa:** Rutas que superan los 260 caracteres en `Assets\Packages\com.unity...`.
* **Solución:**
  ```powershell
  git config --system core.longpaths true
  ```

---

## 10.3 Incidente 3: Corrupción de Finales de Línea CRLF vs LF en Scripts C# y YAML

* **Causa:** Windows escribe `\r\n` mientras Unity prefiere `\n` (LF) para diffs legibles.
* **Solución:**
  ```powershell
  git config --global core.autocrlf true
  ```
  Asegúrate de que `.gitattributes` contenga las reglas `eol=lf` definidas en la Parte I.

---

## 10.4 Incidente 4: "Missing Script" Masivo por Desincronización de GUIDs

* **Solución:**
  1. Busca el GUID previo en el historial:
     ```powershell
     git log -p -S "guid:" Assets\Scripts\Enemy.cs.meta
     ```
  2. Restaura el GUID original en el archivo `.meta` y reinicia Unity.

---

## 10.5 Incidente 5: Subida Accidental de `Library/` o Archivos Temporales de Visual Studio

* **Solución:**
  ```powershell
  git rm -r --cached Library/
  git rm -r --cached .vs/
  git commit -m "fix(git): purgar Library y archivos temporales de VS"
  git push origin main
  ```

---

## 10.6 Incidente 6: Push Rechazado por Archivo > 100 MB Atrapado en Commits Locales

* **Solución con `git-filter-repo`:**
  ```powershell
  pip install git-filter-repo
  git lfs migrate import --include="*.fbx,*.psd,*.blend,*.wav" --everything
  git push origin --force --all
  ```

---

## 10.7 Incidente 7: Límite de Ancho de Banda de Git LFS Superado

* **Solución:**
  ```powershell
  git lfs prune --dry-run
  git lfs prune
  ```

---

## 10.8 Incidente 8: Conflictos de Visual Studio con `.csproj` y `.sln` en Git

* **Solución:** Los archivos `.sln` y `.csproj` se autogeneran por Unity. Elimínalos del repositorio y añádelos a `.gitignore`:
  ```powershell
  git rm --cached *.sln *.csproj
  git commit -m "chore: remover soluciones autogeneradas de Visual Studio"
  ```

---

## 10.9 Incidente 9: Fuga de Claves de Steamworks o Azure en ScriptableObjects

* **Solución:** Revoca el token en el portal del desarrollador y purga el archivo con `git filter-repo`.

---

## 10.10 Incidente 10: Regeneración Segura y Limpia de la Caché Local en Windows

* **Solución (El Reset Seguro):**
  ```powershell
  Stop-Process -Name "Unity" -Force -ErrorAction SilentlyContinue
  Remove-Item -Recurse -Force Library, Temp, Obj, Logs, UserSettings
  # Abre el proyecto nuevamente desde Unity Hub.
  ```
