from Models.Config import db
from datetime import datetime
from sqlalchemy import DateTime

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text)
    created_at = db.Column(DateTime, default=datetime.utcnow)
    choices = db.relationship('Choice', backref='question')

    # response = db.relationship('Response', backref='questionResponse')