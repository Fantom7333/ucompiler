# -*- coding: utf-8 -*-
import numpy as np
import subprocess
import argparse
import re
a1 = ["Q", 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
def create_script(text_script, pr_ln):
    if text_script:
        text_script = text_script.replace("SPACESPACE11", " ")
        code = text_script.split(";")
        filename = "".join(np.random.choice(a1, 50).tolist()) + '.' + pr_ln
        if pr_ln=="java":
            filename = re.search(r"public class [a-zA-Z]{1,100}", text_script)
            filename = filename.group()[12:].strip(" ") + ".java"
        with open(filename, "w") as file:
            for line in code:
                if pr_ln != "py":
                    line = line.replace("DOTCOMMAFORFUNC", ";")
                file.write(line+"\n")
        run_script(filename)

def run_script(filename):
    suffix = filename.split(".")[-1]
    if suffix == "java":
        subprocess.call(["javac", filename])
        output=subprocess.check_output(["java", filename[:-5]])
    elif suffix=="cpp":
        subprocess.call(["g++", filename])
        output=subprocess.check_output(["./a.out"])
        if output[-1]=="'":
            output=output.replace("'", "")
    elif suffix=="cs":
        subprocess.call(["mcs", "-out:CSScript.exe", filename])
        output = subprocess.check_output(["mono", "CSScript.exe"])
    else:
        output=subprocess.check_output(['python', filename])
    print(output.decode("utf-8-sig"))
#CLI
parser = argparse.ArgumentParser(description='DOCKER PYTHON')
parser.add_argument("--code", default=False)
parser.add_argument("--prln", default="py")
args = parser.parse_args()
code = args.code
pr_ln = args.prln
create_script(code, pr_ln)