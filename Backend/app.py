from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from marshmallow import fields
from Models.Config import db
from Models.Choices import Choice
from Models.Profile import Profile
from Models.Questions import Question
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from
from flask_mail import Mail, Message
import base64


app=Flask(__name__)
CORS(app, supports_credentials=True)
app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///survey.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.json.compact=False
app.config["SWAGGER"] = {"title": "Ecidoc-UI", "uiversion":3}
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USERNAME'] = 'oaddonay@gmail.com'
app.config['MAIL_PASSWORD'] = 'kpje gxva zhbn gyoj'

ma = Marshmallow(app)
migrate=Migrate(app, db)
db.init_app(app)
mail = Mail(app)

swagger_config = {
    "headers":[],
    "specs": [
        {
            "endpoint": "apispec_1",
            "route":"/apispec_1.json",
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flassger_static",
    "swagger_ui": True,
    "specs_route": "/swagger/",
}

swagger = Swagger(app, config=swagger_config)
class QuestionSchema(ma.SQLAlchemyAutoSchema):
    choices = fields.Method('get_choices')
    class Meta:
        model = Question

    def get_choices(self, obj):
        questionChoices = obj.choices
        choices = [choice for choice in questionChoices]
        return choicesSchema.dump(choices)

questionSchema = QuestionSchema()
questionsSchema = QuestionSchema(many = True)

class ChoiceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Choice

choiceSchema = ChoiceSchema()
choicesSchema = ChoiceSchema(many = True)

class ProfileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Profile

profileSchema = ProfileSchema()
profilesSchema = ProfileSchema(many = True)

@app.route('/questions', methods=['GET'])
@swag_from("SwaggerFiles/swagger_config.yml")
def questions():
    questions = db.session.query(Question).all()
    questions_results = questionsSchema.dump(questions)
    if not questions_results:
        return jsonify({'message': 'no questions found'}), 404
    return jsonify(questions_results), 200

@app.route('/question/<int:question_id>/choices', methods=['GET'])
@swag_from("SwaggerFiles/questionsChoices.yml")
def question_choices(question_id):
    question = db.session.query(Question).filter_by(id=question_id).one()
    if not question:
        return jsonify({'message': 'Question not found'}), 404

    choices = question.choices
    result = choicesSchema.dump(choices)
    return jsonify(result), 200

@app.route('/submit_ans', methods=['POST'])
@swag_from("SwaggerFiles/submitAns.yml")
def submitAnswers():
    try:
        data =  request.json.get('answers')
        choices_ids = list(data.keys())
        total_score = db.session.query(db.func.sum(Choice.score)).filter(Choice.id.in_(choices_ids[:6])).scalar()
        strategy = formulate_investment_strategy(total_score)
        if strategy == 'failed':
            return jsonify({'message':'Failed'}), 500
        generatedProfile = Profile(type=strategy.get('strategy'), Band=strategy.get('band'),
                                riskTolerance=strategy.get('riskTolarance'), stocksPercentage=strategy.get('stocks'),
                                bondsPercentage=strategy.get('bonds'), cashPercentage=strategy.get('cash'), body='undefined')
        db.session.add_all([generatedProfile])
        db.session.commit()
        profile = profileSchema.dump(generatedProfile)
        return jsonify(profile), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': e})

@app.route('/question/<int:question_id>', methods=['DELETE'])
@swag_from("SwaggerFiles/questionDelete.yml")
def delete_question(question_id):
    question = db.session.query(Question).filter_by(id=question_id).one()
    if not question:
        return jsonify({'error': 'Question not found'}), 404
    choices = Choice.query.filter_by(question_id=question.id).all()
    for choice in choices:
        db.session.delete(choice)
    db.session.delete(question)
    db.session.commit()
    return jsonify({'message': 'Question deleted succesfully'}), 204

@app.route('/question/<int:question_id>', methods=['PUT'])
@swag_from("SwaggerFiles/questionUpdate.yml")
def update_question(question_id):
    question = db.session.query(Question).filter_by(id=question_id).one()
    if not question:
        return jsonify({'error': 'Question not found'}), 404
    data = request.get_json()
    if 'question' in data:
        question.question = data['question']
    db.session.commit()

    return jsonify({'message': 'Question has been updated'}), 200

def formulate_investment_strategy(score):
    if 6 <= score <= 15:
        return {'strategy':"conservative", 'band': 1,
                'riskTolarance': 1, 'stocks': 20, 'bonds': 55, 'cash': 25}
    elif 16 <= score <= 25:
        return {'strategy':"moderately conservative", 'band': 2,
                'riskTolarance': 2, 'stocks': 40, 'bonds': 50, 'cash': 10}
    elif 26 <= score <= 34:
        return {'strategy':"moderate", 'band': 3,
                'riskTolarance': 3, 'stocks': 60, 'bonds': 35, 'cash': 5}
    elif 35 <= score <= 44:
        return {'strategy':"moderately aggressive", 'band': 4,
                'riskTolarance': 4, 'stocks': 70, 'bonds': 25, 'cash': 5}
    elif 45 <= score <= 54:
        return {'strategy':"aggressive", 'band': 4,
                'riskTolarance': 4, 'stocks': 80, 'bonds': 15, 'cash': 5}
    else:
        return "failed"

def create_app(testing=False, database_uri=None):
    if testing:
        app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False

    return app


@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        email = data.get('email')
        image_attachment = data.get('imageAttachment')
        profiletype = data.get('profiletype')

        if not email:
            return jsonify({'error': 'Email is required'}), 400

        # Creating the Message object
        msg = Message('Your Investment Profile', sender='oaddonay@gmail.com', recipients=[email])

        body = f'Profile type: {profiletype} \n Find profile graphs attached'
        msg.body = body

        # Attach the image to the email
        if image_attachment:
            image_data = base64.b64decode(image_attachment.split(',')[1])
            msg.attach("profile_image.png", "image/png", image_data)

        # Sending the email using the 'mail' object
        mail.send(msg)

        return jsonify({'message': 'Email sent successfully'}), 200

    except Exception as _:
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ =='__main__':
    app.run(port=5555, debug=True)


