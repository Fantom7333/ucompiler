from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__, template_folder="templates")
app.secret_key = "FIYGRFERBKCYBKEUYVCYECERUYBCRU"
CORS(app)
@app.route("/code/<pr_language>", methods=["POST"])
def start_code(pr_language):
    code = request.json["code"]
    print(pr_language)
    if pr_language != "py":
        code = code.replace(";", "DOTCOMMAFORFUNC")
    code = code.replace("\n", ";").replace(" ", "SPACESPACE11")
    print(code)
    try:
        output = subprocess.check_output(["docker", "run", "--rm", "-e", f'codefile={code}', "--env", f"prln={pr_language}",
                                          f"{pr_language}script"], stderr=subprocess.STDOUT).decode("utf-8-sig").strip("bnn'n'\n'").replace("\\n'", "").rstrip("\\")
        print(output)
        return jsonify({"output": output})
    except Exception as e:
        print(e.output.decode("utf-8-sig"))
        return jsonify({"output": e.output.decode("utf-8-sig")})
app.run(debug=True)