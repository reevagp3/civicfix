from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# ---------------- DB ----------------
def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("SUPABASE_DB_HOST"),
        database=os.getenv("SUPABASE_DB_NAME"),
        user=os.getenv("SUPABASE_DB_USER"),
        password=os.getenv("SUPABASE_DB_PASSWORD"),
        port=os.getenv("SUPABASE_DB_PORT")
    )

# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, email, full_name, role
        FROM users
        WHERE email=%s AND password=%s
    """, (data["email"], data["password"]))

    user = cur.fetchone()

    cur.close()
    conn.close()

    if not user:
        return jsonify({"status": "error", "message": "Invalid login"})

    return jsonify({
        "status": "success",
        "user": {
            "id": user[0],
            "email": user[1],
            "full_name": user[2],
            "role": user[3]
        }
    })

# ---------------- GET COMPLAINTS ----------------
@app.route("/get-complaints")
def get_complaints():
    role = request.args.get("role")
    user_id = request.args.get("user_id")

    conn = get_db_connection()
    cur = conn.cursor()

    if role == "admin":
        cur.execute("SELECT * FROM complaints")
    elif role == "officer":
        cur.execute("SELECT * FROM complaints WHERE assigned_to=%s", (user_id,))
    else:
        cur.execute("SELECT * FROM complaints WHERE user_id=%s", (user_id,))

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify({
        "status": "success",
        "complaints": [
            {
                "id": r[0],
                "user_id": r[1],
                "title": r[2],
                "category": r[3],
                "description": r[4],
                "location": r[5],
                "status": r[6],
                "priority": r[7],
                "assigned_to": r[8],
                "latitude": r[9],
                "longitude": r[10]
            }
            for r in rows
        ]
    })

# ---------------- UPDATE STATUS ----------------
@app.route("/update-status", methods=["POST"])
def update_status():
    data = request.get_json()

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE complaints
        SET status=%s
        WHERE id=%s
    """, (data["status"], data["complaint_id"]))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"status": "success"})

# ---------------- ASSIGN ----------------
@app.route("/assign", methods=["POST"])
def assign():
    data = request.get_json()

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE complaints
        SET assigned_to=%s
        WHERE id=%s
    """, (data["officer_id"], data["complaint_id"]))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)