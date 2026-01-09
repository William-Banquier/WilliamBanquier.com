import os
import shutil
import json
from jinja2 import Environment, FileSystemLoader

"""
main.py for my build program for my website.

Goal is to go from a bunch of markdown files to a static website
"""

OUTPUT_DIR = 'public'
TEMPLATE_DIR = 'code/templates'
STATIC_DIR = 'code/templates/static'
DATA_DIR = 'code/data'
PROJECT_FILE = f'{DATA_DIR}/projects.json'
LINK_FILE = f'{DATA_DIR}/links.json'
SUMMARY_FILE = 'code/content/main_page/personal-summary.txt'

INDEX_FILE = f"{OUTPUT_DIR}/index.html"

RESUME_DIR = "dnu-resume/resume.pdf"

"""
gets the most recent date for a given file using git log
"""
def get_last_updated_date(FILE):
    ret = os.system(f"git log --date=short {FILE} > .workbin/tmp")
    assert(ret == 0)
    loc = []

    with open(".workbin/tmp", "r") as tmp:
        loc=tmp.readlines()

    dte = loc[2].split("  ")[1].strip().replace("\n","")
    return dte 
    

def build():
    if os.path.exists(OUTPUT_DIR):
        last_updated_date = get_last_updated_date(INDEX_FILE)
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR)

    ret = os.system(f"cp {RESUME_DIR} code/templates/static/william-banquier-resume.pdf")
    if (ret):
        print("Error copying the file - this should be run on a linux system with cp command available")
        exit(1)


    # copy static items 
    shutil.copytree(STATIC_DIR, os.path.join(OUTPUT_DIR, 'static'), dirs_exist_ok=True)

    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

    
    # load links 
    with open(LINK_FILE, 'r') as f:
        links = json.load(f)
    
    links_to_show = [l for l in links if l.get('show')]
    
    # load projects 
    with open(PROJECT_FILE, 'r') as f:
        projects = json.load(f)

    personal_summary = ""
    # load personal summary 
    with open (SUMMARY_FILE, 'r') as f:
        personal_summary = ''.join(f.readlines(-1))

    featured_projects = [p for p in projects if p.get('featured')]
    other_projects = [p for p in projects if not p.get('featured')]


    
    template = env.get_template('home.html')
    output_html = template.render(
        links=links_to_show,
        featured=featured_projects,
        others=other_projects,
        personal_summary = personal_summary.replace("\n","<br>"),
        title="William Banquier Personal Website",
        page_last_updated = last_updated_date
    )
    
    with open(os.path.join(OUTPUT_DIR, 'index.html'), 'w') as f:
        f.write(output_html)

    print(f"Build complete! Output is in /{OUTPUT_DIR}")


if __name__ == "__main__":
    build()