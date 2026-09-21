# Cheatsheet: Git & GitHub en 1 Página ⚡

Referencia rápida de comandos y procedimientos de emergencia para tener siempre a mano.

---

## 🚀 Flujo Diario Esencial

```bash
git status                           # Ver estado del working tree e index
git add <archivo>                    # Preparar archivo para commit (staging)
git add -p                           # Staging interactivo por fragmentos (hunks)
git commit -m "tipo(scope): desc"    # Confirmar commit con formato conventional
git commit --amend --no-edit         # Añadir cambios olvidados al último commit
git push origin <rama>               # Subir commits a GitHub
git pull --rebase origin <rama>      # Descargar cambios manteniendo historia lineal
```

---

## 🌿 Gestión de Ramas y Fusión

```bash
git switch -c feature/nueva-idea     # Crear y cambiar a una nueva rama
git switch <nombre-rama>             # Cambiar a una rama existente
git branch -d <nombre-rama>          # Eliminar rama local ya fusionada
git push origin --delete <rama>      # Eliminar rama en el servidor remoto de GitHub
git merge --squash feature/rama      # Compactar todos los commits en uno solo
git cherry-pick <hash-commit>        # Traer un commit específico a tu rama actual
```

---

## 📦 Resguardo Temporal (Stash)

```bash
git stash save "mensaje-descriptivo" # Guardar cambios locales sucios
git stash list                       # Listar respaldos guardados
git stash pop                        # Restaurar el último stash y eliminarlo
git stash apply stash@{1}            # Aplicar un stash específico sin borrarlo
git stash drop stash@{0}             # Eliminar un stash específico
```

---

## ⚔️ Resolución de Conflictos

```bash
# Durante un rebase o merge con conflicto:
git diff                             # Ver líneas exactas en disputa (<<<<<<< ======= >>>>>>>)
# 1. Edita el archivo en tu editor de código y guarda la versión definitiva.
git add <archivo-resuelto>           # Marcar como resuelto
git rebase --continue                # Continuar el rebase
# O si prefieres elegir una versión completa:
git checkout --ours <archivo>        # Quedarte con tu versión local
git checkout --theirs <archivo>      # Quedarte con la versión remota
```

---

## 🛟 El Salvavidas: Recuperación y Emergencias

```bash
git reflog                           # Historial absoluto de todos los movimientos de HEAD
git reset --hard HEAD@{3}            # Regresar en el tiempo al estado exacto de HEAD@{3}
git restore <archivo>                # Descartar modificaciones locales sin commitear
git revert -m 1 <hash-del-merge>     # Revertir un merge erróneo en producción limpiamente
git clean -fd                        # Borrar archivos y carpetas locales no rastreados
```

---

## 🌐 GitHub CLI (`gh`)

```bash
gh auth login                        # Iniciar sesión interactiva con GitHub
gh repo clone dueño/repo             # Clonar cualquier repositorio
gh pr create --web                   # Abrir formulario de Pull Request en el navegador
gh pr checkout <numero-pr>           # Descargar y probar un PR localmente
gh issue list                        # Ver incidencias abiertas desde la terminal
```
