from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# ---------------- SUPABASE CONFIG ----------------
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print("SUPABASE_URL:", SUPABASE_URL)
print("SUPABASE_KEY:", SUPABASE_KEY)

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}


# ---------------- HOME ----------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "CivicFix backend running"
    })


# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        url = f"{SUPABASE_URL}/rest/v1/users?email=eq.{email}&password=eq.{password}&select=*"

        response = requests.get(url, headers=HEADERS)
        users = response.json()

        if len(users) > 0:
            user = users[0]

            return jsonify({
                "status": "success",
                "user": {
                    "id": user.get("id"),
                    "full_name": user.get("full_name"),
                    "email": user.get("email"),
                    "role": user.get("role")
                }
            })

        return jsonify({
            "status": "error",
            "message": "Invalid login credentials"
        })

    except Exception as e:
        print("LOGIN ERROR:", str(e))
        return jsonify({
            "status": "error",
            "message": str(e)
        })


# ---------------- GET COMPLAINTS ----------------
@app.route("/get-complaints", methods=["GET"])
def get_complaints():
    try:
        role = request.args.get("role")
        user_id = request.args.get("user_id")

        url = f"{SUPABASE_URL}/rest/v1/complaints?select=*"

        # citizen sees only own complaints
        if role == "citizen":
            url += f"&user_id=eq.{user_id}"

        # officer sees only assigned complaints
        elif role == "officer":
            url += f"&assigned_to=eq.{user_id}"

        response = requests.get(url, headers=HEADERS)
        complaints = response.json()

        return jsonify({
            "status": "success",
            "complaints": complaints
        })

    except Exception as e:
        print("GET ERROR:", str(e))
        return jsonify({
            "status": "error",
            "message": str(e)
        })


# ---------------- ADD COMPLAINT ----------------
@app.route("/add-complaint", methods=["POST"])
def add_complaint():
    try:
        data = request.json

        payload = {
            "user_id": data.get("user_id"),
            "title": data.get("title"),
            "description": data.get("description"),
            "location": data.get("location"),
            "priority": data.get("priority"),
            "status": "Pending",
            "latitude": data.get("latitude"),
            "longitude": data.get("longitude"),
            "assigned_to": None
        }

        url = f"{SUPABASE_URL}/rest/v1/complaints"

        response = requests.post(
            url,
            headers=HEADERS,
            json=payload
        )

        if response.status_code in [200, 201]:
            return jsonify({
                "status": "success",
                "message": "Complaint added successfully"
            })

        return jsonify({
            "status": "error",
            "message": response.text
        })

    except Exception as e:
        print("ADD ERROR:", str(e))
        return jsonify({
            "status": "error",
            "message": str(e)
        })


# ---------------- UPDATE STATUS ----------------
@app.route("/update-status", methods=["POST"])
def update_status():
    try:
        data = request.json

        complaint_id = data.get("complaint_id")
        new_status = data.get("status")

        url = f"{SUPABASE_URL}/rest/v1/complaints?id=eq.{complaint_id}"

        payload = {
            "status": new_status
        }

        response = requests.patch(
            url,
            headers=HEADERS,
            json=payload
        )

        if response.status_code in [200, 204]:
            return jsonify({
                "status": "success",
                "message": "Complaint status updated"
            })

        return jsonify({
            "status": "error",
            "message": response.text
        })

    except Exception as e:
        print("UPDATE ERROR:", str(e))
        return jsonify({
            "status": "error",
            "message": str(e)
        })


# ---------------- ASSIGN OFFICER ----------------
@app.route("/assign-officer", methods=["POST"])
def assign_officer():
    try:
        data = request.json

        complaint_id = data.get("complaint_id")
        officer_id = data.get("officer_id")

        url = f"{SUPABASE_URL}/rest/v1/complaints?id=eq.{complaint_id}"

        payload = {
            "assigned_to": officer_id
        }

        response = requests.patch(
            url,
            headers=HEADERS,
            json=payload
        )

        if response.status_code in [200, 204]:
            return jsonify({
                "status": "success",
                "message": "Officer assigned successfully"
            })

        return jsonify({
            "status": "error",
            "message": response.text
        })

    except Exception as e:
        print("ASSIGN ERROR:", str(e))
        return jsonify({
            "status": "error",
            "message": str(e)
        })


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)