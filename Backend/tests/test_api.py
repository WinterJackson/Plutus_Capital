import json
import os
import sys
import pytest

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import create_app
from Models.Config import db

@pytest.fixture
def app():
    app = create_app(testing=True, database_uri="sqlite:///:memory:")
    return app

def test_questions_route(client, app):
    with app.app_context():
        response = client.get('/questions')
        assert response.status_code == 200
        data = json.loads(response.data.decode('utf-8'))

        assert isinstance(data, list)

        for item in data:
            assert 'question' in item
            assert 'choices' in item

            assert isinstance(item['choices'], list)

            for choice in item['choices']:
                assert 'id' in choice
                assert 'body' in choice
                assert 'score' in choice

        assert len(data) == 14

def test_submit_answers_route(client, app):
    with app.app_context():
        data = {'answers': {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7}}
        headers = {'Content-Type': 'application/json'}
        response = client.post('/submit_ans', data=json.dumps(data), headers=headers)
        assert response.status_code == 201



def test_question_choices_route(client, app):
    # Assuming you have a question with ID 1 in your test database
    question_id = 1

    with app.app_context():
        response = client.get(f'/question/{question_id}/choices')
        assert response.status_code == 200
        data = json.loads(response.data.decode('utf-8'))

        assert isinstance(data, list)

        for item in data:
            assert 'id' in item
            assert 'body' in item
            assert 'score' in item

def test_delete_question_route(client, app):
    # Assuming you have a question with ID 1 in your test database
    question_id = 1

    with app.app_context():
        response = client.delete(f'/question/{question_id}')
        assert response.status_code == 204


def test_update_question_route(client, app):
    # Assuming you have a question with ID 1 in your test database
    question_id = 2
    data = {'question': 'Updated Question Text'}
    headers = {'Content-Type': 'application/json'}

    with app.app_context():
        response = client.put(f'/question/{question_id}', data=json.dumps(data), headers=headers)
        assert response.status_code == 200
        result = json.loads(response.data.decode('utf-8'))
        assert 'message' in result
        assert result['message'] == 'Question has been updated'

