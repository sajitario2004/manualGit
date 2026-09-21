#!/usr/bin/env bash
# ==============================================================================
# Autoconfigurador de UnityYAMLMerge para Linux y macOS
# Detecta la instalación de Unity Editor en Unity Hub y configura Git.
# ==============================================================================

set -e

echo "🔍 Buscando instalación de Unity Editor..."

MERGE_TOOL=""

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS (Apple Silicon / Intel)
    HUB_PATH="/Applications/Unity/Hub/Editor"
    if [ -d "$HUB_PATH" ]; then
        LATEST_VERSION=$(ls -1 "$HUB_PATH" 2>/dev/null | sort -V | tail -n 1)
        if [ -n "$LATEST_VERSION" ]; then
            CANDIDATE="$HUB_PATH/$LATEST_VERSION/Unity.app/Contents/Tools/UnityYAMLMerge"
            if [ -f "$CANDIDATE" ]; then
                MERGE_TOOL="$CANDIDATE"
            fi
        fi
    fi
else
    # Linux (Debian / Ubuntu / derivadas)
    HUB_PATH="$HOME/Unity/Hub/Editor"
    if [ -d "$HUB_PATH" ]; then
        LATEST_VERSION=$(ls -1 "$HUB_PATH" 2>/dev/null | sort -V | tail -n 1)
        if [ -n "$LATEST_VERSION" ]; then
            CANDIDATE="$HUB_PATH/$LATEST_VERSION/Editor/Data/Tools/UnityYAMLMerge"
            if [ -f "$CANDIDATE" ]; then
                MERGE_TOOL="$CANDIDATE"
            fi
        fi
    fi
fi

if [ -z "$MERGE_TOOL" ]; then
    echo "❌ No se encontró UnityYAMLMerge automáticamente en la ruta estándar de Unity Hub."
    echo "   Por favor, verifica que tienes instalado Unity Editor a través de Unity Hub."
    exit 1
fi

echo "✓ Herramienta encontrada: $MERGE_TOOL"
echo "⚙️ Configurando Git merge driver..."

git config --global merge.unityyamlmerge.name "Unity Smart Merge"
git config --global merge.unityyamlmerge.driver "\"$MERGE_TOOL\" merge -h -p -- '%O' '%B' '%A' '%A'"
git config --global merge.unityyamlmerge.trustExitCode true
git config --global merge.unityyamlmerge.recursive binary

echo ""
echo "🎉 ¡Configuración completada con éxito!"
echo "   UnityYAMLMerge ahora resolverá automáticamente conflictos en archivos .unity y .prefab."
