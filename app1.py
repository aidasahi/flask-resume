# Import Flask and necessary functions
from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
import csv
from datetime import datetime
import os

# Create Flask app instance
app = Flask(__name__)

# Secret key for session management and flash messages
# In production, use environment variable: os.environ.get('SECRET_KEY')
app.secret_key = 'aida-math-code-curiosity-2025-secret'

# Route for the main page
@app.route('/')
def home():
    """
    This function handles requests to the homepage (/)
    It renders the index.html template
    """
    return render_template('index.html')

# Route for handling contact form submission
@app.route('/contact', methods=['POST'])
def contact():
    """
    This function handles form submissions from the contact form
    It receives POST data, saves it to CSV, and returns a JSON response
    """
    # Get form data from the request
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # Validate form data
    if not name or not email or not message:
        return jsonify({
            'status': 'error',
            'message': 'Please fill in all fields.'
        }), 400
    
    # Print to console (for testing)
    print(f"\n=== New Message Received ===")
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Message: {message}")
    print("===========================\n")
    
    # Save message to CSV file
    try:
        save_message_to_csv(name, email, message)
    except Exception as e:
        print(f"Error saving message: {e}")
        # Continue even if saving fails - don't break user experience
    
    # Set flash message for success
    flash('Thank you for your message! I will get back to you soon.', 'success')
    
    # Return success response as JSON
    return jsonify({
        'status': 'success',
        'message': 'Thank you for your message! I will get back to you soon.'
    })

def save_message_to_csv(name, email, message):
    """
    Save contact form message to a CSV file
    Creates the file if it doesn't exist
    """
    # Create 'data' folder if it doesn't exist
    if not os.path.exists('data'):
        os.makedirs('data')
    
    csv_file = 'data/messages.csv'
    file_exists = os.path.isfile(csv_file)
    
    # Open CSV file in append mode
    with open(csv_file, 'a', newline='', encoding='utf-8') as file:
        fieldnames = ['timestamp', 'name', 'email', 'message']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        
        # Write header if file is new
        if not file_exists:
            writer.writeheader()
        
        # Write the message data
        writer.writerow({
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'name': name,
            'email': email,
            'message': message
        })

# Custom 404 Error Handler
@app.errorhandler(404)
def page_not_found(e):
    """
    Custom handler for 404 errors (page not found)
    Returns a friendly error page instead of default Flask error
    """
    return render_template('404.html'), 404

# Custom 500 Error Handler (Server Error)
@app.errorhandler(500)
def internal_error(e):
    """
    Custom handler for 500 errors (server errors)
    """
    return render_template('500.html'), 500

# Run the application
if __name__ == '__main__':
    # debug=True enables auto-reload when you change code
    # Use debug=False in production!
    app.run(debug=True)