# Cheatsheet: Unity & GitHub en 1 Página 🎮

Referencia rápida de buenas prácticas, Git LFS, merge de escenas y prevención de desastres en Unity.

---

## 🔒 Las 3 Reglas Sagradas de Unity

1. **Project Settings:**
   * **Version Control Mode:** `Visible Meta Files` (Obligatorio).
   * **Asset Serialization:** `Force Text` (YAML legible por humanos y Git).
2. **La Regla del `.meta`:**  
   Nunca agregues, muevas, renombres o borres un asset sin hacer exactamente lo mismo con su archivo `.meta`.
3. **Ignorar Cachés:**  
   `Library/`, `Temp/`, `Obj/`, `Build/` y `.vs/` NUNCA deben subirse a Git.

---

## 🐘 Git LFS (Large File Storage)

```bash
git lfs install                      # Inicializar filtros LFS en el sistema
git lfs track "*.fbx" "*.psd"        # Rastrear extensiones pesadas
git lfs status                       # Comprobar qué archivos irán a LFS
git lfs pull                         # Forzar descarga completa de binarios
git lfs prune                        # Liberar espacio en disco borrando caché vieja
```

---

## 🔐 Bloqueo Exclusivo de Binarios (`lfs lock`)

```bash
git lfs lock Assets/Art/Boss.blend   # Bloquear para editar en exclusiva
git lfs locks                        # Ver quién tiene bloqueado qué archivo
git lfs unlock Assets/Art/Boss.blend # Desbloquear tras hacer push
```

---

## 🧩 Fusión de Escenas y Prefabs con UnityYAMLMerge

```bash
# Durante un conflicto en escenas (.unity) o prefabs (.prefab):
git mergetool -t unityyamlmerge      # Ejecutar fusión semántica automática
# En GitHub Desktop:
# En la ventana 'Resolve conflicts before merging' -> 'Open in UnityYAMLMerge'
```

---

## 🎨 Conventional Commits para Videojuegos

```
feat(player): añadir doble salto con partículas
fix(physics): evitar atravesar paredes a alta velocidad
art(boss): importar textura 4K y normal map del golem
level(dungeon): colocar cofres y luces en sala principal
audio(combat): integrar sonido de impacto de espada
perf(textures): comprimir texturas UI a formato ASTC
chore(upm): actualizar paquete Cinemachine a 2.9.7
```

---

## 🚨 Rescate Rápido de Incidentes

```bash
# 1. Error "Missing Script" por GUID perdido:
git log -p -S "guid:" Assets/Scripts/Heroe.cs.meta # Encontrar GUID original
# Restaura el guid: en el .meta y haz Reimport All en Unity.

# 2. Subida accidental de Library/:
git rm -r --cached Library/
git commit -m "fix: remover Library del índice de Git"

# 3. Push rechazado por archivo > 100 MB:
git lfs migrate import --include="*.fbx,*.psd,*.blend" --everything
git push origin --force --all

# 4. El Reset Seguro de la Caché Local:
# Cierra Unity y ejecuta:
rm -rf Library/ Temp/ Obj/ Logs/ UserSettings/
```
