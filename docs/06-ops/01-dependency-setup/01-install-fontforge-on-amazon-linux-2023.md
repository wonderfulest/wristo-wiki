# 执行脚本

```
/tools/ops/fontforge/install_fontforge_amazon2023.sh  
```

```
#!/usr/bin/env bash
set -e

echo "============================================"
echo "  FontForge Installer for Amazon Linux 2023"
echo "  (No GUI, Python Enabled, Auto PO Fix)"
echo "============================================"

# ----------------------------
# 1. Install build dependencies
# ----------------------------
echo "[1/6] Installing dependencies..."
dnf install -y \
    git gcc gcc-c++ make cmake \
    freetype-devel libpng-devel libjpeg-devel giflib-devel \
    libtiff-devel cairo-devel pango-devel glib2-devel \
    libxml2-devel libuninameslist-devel \
    readline-devel woff2-devel brotli-devel \
    python3 python3-devel gettext

# ----------------------------
# 2. Download latest FontForge
# ----------------------------
echo "[2/6] Cloning FontForge..."
cd /usr/local/src
rm -rf fontforge || true
git clone https://github.com/fontforge/fontforge.git
cd fontforge

# ----------------------------
# 3. Configure (No GUI + Python only)
# ----------------------------
echo "[3/6] Configuring with CMake..."
rm -rf build
mkdir build
cd build

cmake .. \
  -DENABLE_GUI=OFF \
  -DENABLE_X11=OFF \
  -DENABLE_PYTHON_SCRIPTING=ON \
  -DENABLE_NATIVE_SCRIPTING=ON \
  -DENABLE_DOCS=OFF \
  -DENABLE_LIBSPIRO=OFF \
  -DCMAKE_INSTALL_PREFIX=/usr/local


# ----------------------------
# 4. Auto-create ALL po/<lang>/LC_MESSAGES folders
# ----------------------------
echo "[4/6] Auto-creating LC_MESSAGES directories..."

PO_SRC_DIR="../po"
PO_BUILD_DIR="po"

mkdir -p "$PO_BUILD_DIR"

for pofile in $PO_SRC_DIR/*.po; do
    lang=$(basename "$pofile" .po)
    mkdir -p "$PO_BUILD_DIR/$lang/LC_MESSAGES"
    echo "  → Created: $PO_BUILD_DIR/$lang/LC_MESSAGES"
done

echo "[OK] All required po directories created."


# ----------------------------
# 5. Build + Install
# ----------------------------
echo "[5/6] Building FontForge..."
make -j$(nproc)

echo "[OK] Build completed. Installing..."
make install
ldconfig


# ----------------------------
# 6. Verify Installation
# ----------------------------
echo "[6/6] Verifying installation..."

echo -n "Checking fontforge binary: "
if command -v fontforge >/dev/null 2>&1; then
    echo "FOUND"
else
    echo "NOT FOUND"
    exit 1
fi

echo -n "Checking Python module: "
python3 - << 'EOF'
try:
    import fontforge
    print("Python OK")
except Exception as e:
    print("Python module error:", e)
    exit(1)
EOF

echo "============================================"
echo " FontForge installation completed successfully!"
echo "============================================"


```

