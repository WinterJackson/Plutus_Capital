from Models.Config import db

class Response(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('user.user_id', name='fk_response_user_id'))
    choice_id = db.Column(db.Integer, db.ForeignKey('choice.id'))
    question_id = db.Column(db.Integer, db.ForeignKey('question.id', name='fk_response_question_id'))
    attempt_id = db.Column(db.Integer, db.ForeignKey('attempts.id', name='fk_response_attempt_id'))