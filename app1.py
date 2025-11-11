from flask import Flask, render_template, jsonify
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/data")
def get_data():
    data = {
        "name":"aida",
        "course":"flask web development",
        "level":"beginner"
    }
    return jsonify(data)

@app.route("/api/resume")
def get_resume():
    resume_data = { 
        "name":"aida asgharzade",
        "email":"aida.sahi@gmail.com",
        "education":[
            {
                "degree":"master of computer science",
                "university":"sharif university of technology"
            },
            {
                "degree":"bachelor of mathematics",
                "university":"shahid beheshti university"
            }
        ],
        "skills":["python","ml","flask"]
    }
    return jsonify(resume_data)

if __name__ == "__main__":
    app.run(debug=True)