import re
import os

def audit_pixtool():
    tools_file = 'src/data/tools.js'
    if not os.path.exists(tools_file):
        print(f"Error: {tools_file} not found")
        return

    with open(tools_file, 'r') as f:
        content = f.read()

    # Split into tool objects correctly
    # Each tool starts with something like { id: '...'
    # We'll split by { at the start of a block
    tools_blocks = []
    current_block = []
    brace_depth = 0
    in_tool = False
    
    # Simple parser for tool objects [id: '...', ... ]
    # We find all top-level objects in arrays (IMAGE_TOOLS, PDF_TOOLS, etc)
    tool_objects = []
    
    # Find all main categories
    categories = re.findall(r'export const (\w+) = \[', content)
    
    # We'll use regex to find id: definitions at the start of objects
    # These are usually the definitions
    definitions = re.findall(r"\{\s+id:\s*'([^']+)',\s+title:\s*'([^']+)'", content)
    
    id_map = {}
    path_map = {}
    
    # Find all { id: '...', ... path: '...' } blocks
    # Using a slightly more robust regex for top-level definitions
    pattern = re.compile(r"\{\s+id:\s*'([^']+)',.*?path:\s*'([^']+)'", re.DOTALL)
    matches = pattern.findall(content)
    
    ids = [m[0] for m in matches]
    paths = [m[1] for m in matches]
    
    print(f"Total Unique Tool Definitions found: {len(ids)}")
    
    dup_ids = [x for x in ids if ids.count(x) > 1]
    dup_paths = [x for x in paths if paths.count(x) > 1]
    
    if dup_ids:
        print(f"Duplicate IDs: {set(dup_ids)}")
    else:
        print("No duplicate Tool IDs found.")

    if dup_paths:
        print(f"Duplicate Paths: {set(dup_paths)}")
    else:
        print("No duplicate Tool Paths found.")

    # Check for "ToolPix"
    toolpix_mentions = re.findall(r'ToolPix', content)
    if toolpix_mentions:
        print(f"Found {len(toolpix_mentions)} mentions of 'ToolPix' in tools.js")

    # Check for missing SEO
    # Split by { id:
    blocks = re.split(r"\{\s+id:\s*'", content)[1:]
    missing_seo_tools = []
    for block in blocks:
        tool_id = block.split("'")[0]
        # Only check the top-level block (before next tool or relatedTools)
        # We look for seo: before relatedTools:
        seo_pos = block.find('seo:')
        related_pos = block.find('relatedTools:')
        if seo_pos == -1 or (related_pos != -1 and seo_pos > related_pos):
             missing_seo_tools.append(tool_id)
             
    print(f"Tools missing SEO: {missing_seo_tools}")

if __name__ == "__main__":
    audit_pixtool()
