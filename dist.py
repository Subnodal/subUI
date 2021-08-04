import re
import os
import os.path
import shutil
import csscompressor

MAIN_CSS_IN = "style.css"
MAIN_CSS_OUT = "subui.min.css"
DIST_DIR = "dist"

COPY_PATHS = [
    ["fonts", "fonts", True],
    ["media", "media", True],
    ["build/subui.min.js", "subui.min.js", False]
]

def replaceImport(replacer):
    minifyAndResolve(replacer.group(1))

    return replacer.group().replace(".css", ".min.css")

def minifyAndResolve(inPath):
    outPath = os.path.join(DIST_DIR, inPath.replace(".css", ".min.css"))

    if inPath == MAIN_CSS_IN:
        outPath = os.path.join(DIST_DIR, MAIN_CSS_OUT)

    os.makedirs(os.path.dirname(outPath), exist_ok = True)

    unminified = open(inPath, "r")
    unminifiedCode = unminified.read()
    minified = open(outPath, "w")

    unminifiedCode = re.sub(r"@import url\(\"(.*)\"\)", replaceImport, unminifiedCode)

    minified.write(csscompressor.compress(unminifiedCode))

    unminified.close()
    minified.close()

shutil.rmtree(DIST_DIR)
os.system("subdoc")
os.system("subpack")

for copyPath in COPY_PATHS:
    pastePath = os.path.join(DIST_DIR, *copyPath[1].split("/"))

    if copyPath[2]:
        shutil.copytree(os.path.join(*copyPath[0].split("/")), pastePath)
    else:
        shutil.copy2(os.path.join(*copyPath[0].split("/")), pastePath)

minifyAndResolve(MAIN_CSS_IN)