from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)
DATA_FILE = 'data.json'

@app.route('/')
def serve_index():
    return render_template('index.html')  # ✅ Renders from 'templates/index.html'

# Helper to load existing data
def load_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

# Helper to save new data
def save_data(entry):
    data = load_data()
    data.append(entry)
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    name = request.form.get('name')
    email = request.form.get('email')

    if not name or not email:
        return jsonify({"error": "Missing name or email"}), 400

    save_data({'name': name, 'email': email})
    return jsonify({"message": "Subscription successful"}), 200

if __name__ == '__main__':
    port - int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=10000, debug=True)
