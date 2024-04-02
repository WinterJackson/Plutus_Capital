from Models.Config import db

class Choice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)
    body = db.Column(db.Text)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))