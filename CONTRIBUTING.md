# Guía de Contribución 🤝

¡Gracias por tu interés en contribuir a este repositorio de manuales técnicos de **Git, GitHub y Unity**!

Este proyecto tiene como objetivo ser la fuente de referencia en español más completa, rigurosa y actualizada para desarrolladores de software y creadores de videojuegos en **Debian GNU/Linux**, **Windows PowerShell** y **macOS Apple Silicon**.

---

## 🧭 ¿Cómo puedo contribuir?

1. **Reportar Erratas o Comandos Obsoletos:** Abre un issue utilizando nuestra plantilla de reporte de bugs.
2. **Proponer Nuevos Temas o Motores:** Sugiere guías para motores como Unreal Engine, Godot, o herramientas satélite como Blender y FMOD.
3. **Mejorar la Redacción o Añadir Ejemplos:** Envía un Pull Request para enriquecer explicaciones o diagramas.

---

## 📝 Reglas de Oro de Estilo

Para mantener la uniformidad y el rigor pedagógico de todos los manuales:

1. **Comandos Copiables y Autoexplicativos:**  
   Todo bloque de comandos debe ser funcional y estar acompañado obligatoriamente por una llamada explicativa:
   ```markdown
   ```bash
   git status
   ```
   > **¿Qué hace este comando?**  
   > Breve explicación clara del propósito y los efectos del comando.
   ```

2. **Doble Enfoque (CLI + GUI):**  
   En las guías donde intervenga GitHub Desktop, proporciona siempre la vía por Terminal y la vía por interfaz gráfica con paso a paso detallado.

3. **Uso de Alertas de GitHub:**  
   Utiliza las alertas oficiales para destacar información clave:
   - `> [!NOTE]` para contexto técnico o aclaraciones.
   - `> [!TIP]` para atajos de productividad.
   - `> [!IMPORTANT]` para requisitos indispensables.
   - `> [!WARNING]` para advertencias de incompatibilidad.
   - `> [!CAUTION]` para acciones con riesgo de pérdida de datos.

4. **Conventional Commits:**  
   Todos los commits deben seguir el estándar:
   - `feat:` Nueva característica o guía.
   - `fix:` Corrección de comando o errata.
   - `docs:` Modificación exclusivamente documental.
   - `chore:` Tareas de mantenimiento o configuración de scripts.

---

## 🛠️ Flujo de Desarrollo Local

```bash
# 1. Clonar tu fork del repositorio
git clone https://github.com/TU_USUARIO/manualGit.git
cd manualGit

# 2. Instalar dependencias del compilador de PDFs
npm install

# 3. Crear una rama descriptiva
git switch -c docs/mejora-guia-unity

# 4. Probar la compilación de los documentos a PDF
npm run build

# 5. Confirmar y enviar Pull Request
git commit -m "docs(unity): aclarar integracion de PlasticSCM y LFS"
git push origin docs/mejora-guia-unity
```
