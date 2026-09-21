#!/usr/bin/env python3
"""
Unity Meta & Asset Integrity Checker
Audita proyectos de Unity para detectar:
1. Assets sin archivo .meta asociado.
2. Archivos .meta huérfanos cuyo asset fue eliminado.
3. GUIDs duplicados entre diferentes archivos .meta.
4. Archivos mayores a 100 MB no versionados con Git LFS.

Uso:
  python3 unity-meta-checker.py [--path ./Assets]
"""

import os
import sys
import re
import argparse

# Códigos ANSI para colores en terminal
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
BLUE = "\033[94m"
RESET = "\033[0m"
BOLD = "\033[1m"

def audit_unity_project(target_dir):
    if not os.path.exists(target_dir):
        print(f"{RED}Error: La ruta '{target_dir}' no existe.{RESET}")
        return 1

    print(f"{BLUE}{BOLD}=== Iniciando Auditoría de Integridad de Unity en: {target_dir} ==={RESET}\n")

    assets_without_meta = []
    orphan_metas = []
    guid_map = {}
    duplicate_guids = []
    large_files = []

    # Exclusiones estándar
    ignored_extensions = {".meta", ".DS_Store"}
    ignored_names = {".DS_Store", "Thumbs.db"}

    guid_regex = re.compile(r"^guid:\s*([a-f0-9]{32})", re.IGNORECASE | re.MULTILINE)

    for root, dirs, files in os.walk(target_dir):
        # 1. Comprobar que cada subcarpeta tenga su archivo .meta asociado
        for d in dirs:
            dir_path = os.path.join(root, d)
            meta_path = dir_path + ".meta"
            if not os.path.exists(meta_path):
                assets_without_meta.append(dir_path)

        for f in files:
            file_path = os.path.join(root, f)

            if f in ignored_names:
                continue

            if f.endswith(".meta"):
                # Comprobar si el asset original existe
                original_asset = file_path[:-5]
                if not os.path.exists(original_asset):
                    orphan_metas.append(file_path)
                else:
                    # Extraer GUID para auditar duplicados
                    try:
                        with open(file_path, "r", encoding="utf-8", errors="ignore") as mf:
                            content = mf.read(1024)
                            match = guid_regex.search(content)
                            if match:
                                guid = match.group(1)
                                if guid in guid_map:
                                    duplicate_guids.append((guid, guid_map[guid], file_path))
                                else:
                                    guid_map[guid] = file_path
                    except Exception as e:
                        print(f"{YELLOW}Aviso: No se pudo leer {file_path}: {e}{RESET}")
            else:
                # Comprobar si el archivo asset tiene su archivo .meta correspondiente
                meta_path = file_path + ".meta"
                if not os.path.exists(meta_path):
                    assets_without_meta.append(file_path)

                # Comprobar tamaño > 100 MB
                try:
                    size_bytes = os.path.getsize(file_path)
                    if size_bytes > 100 * 1024 * 1024:
                        size_mb = size_bytes / (1024 * 1024)
                        large_files.append((file_path, size_mb))
                except OSError:
                    pass

    # Reporte de resultados
    has_errors = False

    if assets_without_meta:
        has_errors = True
        print(f"{RED}{BOLD}❌ Assets o Carpetas SIN archivo .meta ({len(assets_without_meta)} encontrados):{RESET}")
        for item in assets_without_meta[:15]:
            print(f"   {RED}• {item}{RESET}")
        if len(assets_without_meta) > 15:
            print(f"   ... y {len(assets_without_meta) - 15} más.")
        print()

    if orphan_metas:
        has_errors = True
        print(f"{YELLOW}{BOLD}⚠️ Archivos .meta HUÉRFANOS (el asset fue borrado) ({len(orphan_metas)} encontrados):{RESET}")
        for item in orphan_metas[:15]:
            print(f"   {YELLOW}• {item}{RESET}")
        if len(orphan_metas) > 15:
            print(f"   ... y {len(orphan_metas) - 15} más.")
        print()

    if duplicate_guids:
        has_errors = True
        print(f"{RED}{BOLD}🚨 GUIDs DUPLICADOS detectados ({len(duplicate_guids)} colisiones):{RESET}")
        for guid, f1, f2 in duplicate_guids:
            print(f"   {RED}• GUID {guid}:{RESET}\n     - {f1}\n     - {f2}")
        print()

    if large_files:
        print(f"{YELLOW}{BOLD}⚠️ Archivos mayores a 100 MB ({len(large_files)} detectados - asegurar Git LFS):{RESET}")
        for f, size in large_files:
            print(f"   {YELLOW}• {f} ({size:.1f} MB){RESET}")
        print()

    if not has_errors and not large_files:
        print(f"{GREEN}{BOLD}✅ ¡PROYECTO IMPECABLE! Todos los assets tienen .meta válidos, no hay GUIDs duplicados ni huérfanos.{RESET}\n")
        return 0
    elif not has_errors:
        print(f"{GREEN}{BOLD}✅ Integridad de .meta correcta.{RESET} (Revisa los archivos pesados listados arriba).\n")
        return 0
    else:
        print(f"{RED}{BOLD}🚨 Se detectaron problemas de integridad que podrían romper referencias en Unity.{RESET}\n")
        return 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Auditor de integridad de .meta y assets de Unity.")
    parser.add_argument("--path", default="./Assets", help="Ruta a la carpeta Assets del proyecto Unity (default: ./Assets)")
    args = parser.parse_args()

    sys.exit(audit_unity_project(args.path))
