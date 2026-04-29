from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# ---------------- SUPABASE CONFIG ----------------
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

# ---------------- HOME ----------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "CivicFix backend running"})


# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    print("LOGIN TRY:", email, password)

    try:
        url = f"{SUPABASE_URL}/rest/v1/users?email=eq.{email}&password=eq.{password}"
        res = requests.get(url, headers=HEADERS)
        users = res.json()

        if users and len(users) > 0:
            user = users[0]

            return jsonify({
                "status": "success",
                "user": {
                    "id": user.get("id"),
                    "email": user.get("email"),
                    "role": user.get("role"),
                    "full_name": user.get("full_name")
                }
            })

        return jsonify({"status": "error", "message": "Invalid credentials"})

    except Exception as e:
        print("LOGIN ERROR:", str(e))
        return jsonify({"status": "error", "message": str(e)})


# ---------------- GET COMPLAINTS ----------------
@app.route("/get-complaints", methods=["GET"])
def get_complaints():
    role = request.args.get("role")
    user_id = request.args.get("user_id")

    try:
        url = f"{SUPABASE_URL}/rest/v1/complaints?select=*"
        
        # filter for citizen
        if role == "citizen":
            url += f"&user_id=eq.{user_id}"

        res = requests.get(url, headers=HEADERS)
        complaints = res.json()

        return jsonify({
            "status": "success",
            "complaints": complaints
        })

    except Exception as e:
        print("COMPLAINT ERROR:", str(e))
        return jsonify({"status": "error", "message": str(e)})


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)