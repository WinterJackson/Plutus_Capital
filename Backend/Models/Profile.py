from Models.Config import db
from datetime import datetime
from sqlalchemy import DateTime

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    type = db.Column(db.String(255))
    Band = db.Column(db.Integer)
    riskTolerance = db.Column(db.Integer)
    stocksPercentage = db.Column(db.Float)
    bondsPercentage = db.Column(db.Float)
    cashPercentage = db.Column(db.Float)
    body = db.Column(db.Text)
    created_at = db.Column(DateTime, default=datetime.utcnow)
