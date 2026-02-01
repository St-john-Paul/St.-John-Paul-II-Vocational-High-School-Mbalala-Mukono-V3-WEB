import os
import re

admin_dir = r"c:\Users\HP G3\Desktop\V2 PAUL-WEB\admin"
config_import = "import { API_URL, getImageUrl } from '/src/config.js';\n"

for filename in os.listdir(admin_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(admin_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace hardcoded URLs
        new_content = re.sub(r'http://localhost:5000/api', r'${API_URL}', content)
        
        # Add import if API_URL is used but not imported
        if '${API_URL}' in new_content and "import { API_URL" not in new_content:
            # Find the first script type="module" or auth.js import
            if "import { getCurrentUser } from '/src/utils/auth.js';" in new_content:
                new_content = new_content.replace(
                    "import { getCurrentUser } from '/src/utils/auth.js';",
                    config_import + "        import { getCurrentUser } from '/src/utils/auth.js';"
                )
            elif '<script type="module">' in new_content:
                new_content = new_content.replace(
                    '<script type="module">',
                    '<script type="module">\n        ' + config_import
                )
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
