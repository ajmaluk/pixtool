import re
import os

def audit_pixtool():
    tools_file = 'src/data/tools.js'
    if not os.path.exists(tools_file):
        print(f"Error: {tools_file} not found")
        return

    with open(tools_file, 'r') as f:
        content = f.read()

    # Find all tool definitions
    # Regex to find id and path in objects
    # This is a bit rough but works for this structure
    ids = re.findall(r"id:\s*'([^']+)'", content)
    paths = re.findall(r"path:\s*'([^']+)'", content)

    print(f"Total IDs found: {len(ids)}")
    print(f"Total Paths found: {len(paths)}")

    # Check for duplicates
    dup_ids = set([x for x in ids if ids.count(x) > 1])
    dup_paths = set([x for x in paths if paths.count(x) > 1])

    if dup_ids:
        print(f"Duplicate IDs: {dup_ids}")
    else:
        print("No duplicate IDs found.")

    if dup_paths:
        # Filter for actual tool paths (starting with /)
        actual_tool_paths = [p for p in paths if p.startswith('/')]
        dup_actual_paths = set([x for x in actual_tool_paths if actual_tool_paths.count(x) > 1])
        if dup_actual_paths:
            print(f"Duplicate Paths: {dup_actual_paths}")
        else:
            print("No duplicate Tool Paths found.")

    # Check for "ToolPix" vs "PixTool"
    toolpix_count = content.count('ToolPix')
    pixtool_count = content.count('PixTool')
    print(f"'ToolPix' count: {toolpix_count}")
    print(f"'PixTool' count: {pixtool_count}")

    # Check for missing SEO in tool objects
    # We find all objects starting with id and check if they have seo
    tool_blocks = re.split(r'id:\s*\'', content)[1:]
    missing_seo = 0
    for block in tool_blocks:
        if 'seo:' not in block[:500]: # Check first 500 chars of block
            missing_seo += 1
    
    print(f"Tools missing SEO block: {missing_seo}")

if __name__ == "__main__":
    audit_pixtool()
