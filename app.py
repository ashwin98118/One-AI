from flask import Flask, render_template, request, jsonify
import os
from openai import OpenAI

app = Flask(__name__)

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({
            "error": "Please enter a message."
        }), 400

    try:

        response = client.responses.create(
            model="gpt-5-mini",
            input=user_message
        )

        return jsonify({
            "reply": response.output_text
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
