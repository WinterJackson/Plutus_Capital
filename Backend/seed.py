from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from Models.Choices import Choice
from Models.Questions import Question

engine = create_engine('sqlite:///instance/survey.db')
Session = sessionmaker(bind=engine)
session = Session()

try:

    question1 = Question(question='What is your primary goal?')
    question2 = Question(question='Investment value can change over time. How comfortable are you with such changes?')
    question3 = Question(question='Considering inflation...')
    question4 = Question(question='The loss I can accept within a year before changing my investment approach is?')
    question5 = Question(question='Given the two investments you would divide your investments as:')
    question6 = Question(question='Which investment portfolio would you prefer?')
    question7 = Question(question='The earliest you anticipate needing all your investment assets is:')
    question8 = Question(question='My total investment assets are over Kes 10 million.')
    question9 = Question(question='I am open to investing outside my country.')
    question10 = Question(question='I use mobile money loans.')
    question11 = Question(question='My income bracket is:')
    question12 = Question(question='My current income sources are:')
    question13 = Question(question='With stocks, bonds, exchange traded funds(EFTs) and mutual funds, I consider myself to be:')
    question14 = Question(question='I consider myself to be...')

    # Create sample data for the Choice model
    choice1 = Choice(score=1, question=question1, body='Preserve the value of my investments.')
    choice2 = Choice(score=3, question=question1, body='Generate income with little risk.')
    choice3 = Choice(score=5, question=question1, body='Generate income and grow the investments gradually over time.')
    choice4 = Choice(score=7, question=question1, body='Grow the investment over time.')
    choice5 = Choice(score=9, question=question1, body='Grow the investment substantially over time.')

    choice6 = Choice(score=1, question=question2, body='Not comfortable. I prefer stability.')
    choice7 = Choice(score=3, question=question2, body='A little, as long as the investment grows over time.')
    choice8 = Choice(score=7, question=question2, body='That\'s Ok. As long as there is more potential for high returns.')
    choice9 = Choice(score=9, question=question2, body='I\'m comfortable with this risk.')

    choice10 = Choice(score=1, question=question3, body='The safety of my investment is more important.')
    choice11 = Choice(score=3, question=question3, body='My investments growth should at least match inflation growth.')
    choice12 = Choice(score=7, question=question3, body='My investments should grow faster than inflation.')
    choice13 = Choice(score=9, question=question3, body='My investments should grow much faster than inflation and I can take on more risk to achieve this.')

    choice14 = Choice(score=1, question=question4, body='Less than 5%')
    choice15 = Choice(score=3, question=question4, body='5% to 10%')
    choice16 = Choice(score=5, question=question4, body='10% to 15%')
    choice17 = Choice(score=7, question=question4, body='15% to 25%')
    choice18 = Choice(score=9, question=question4, body='25% or more')

    choice19= Choice(score=1, question=question5, body='100% in A')
    choice20= Choice(score=3, question=question5, body='80% in A, 20% in B')
    choice21= Choice(score=5, question=question5, body='50% in each')
    choice22= Choice(score=7, question=question5, body='80% in B, 20% in A')
    choice23= Choice(score=9, question=question5, body='100% in B')

    choice24= Choice(score=1, question=question6, body='A')
    choice25= Choice(score=3, question=question6, body='B')
    choice26= Choice(score=5, question=question6, body='C')
    choice27= Choice(score=7, question=question6, body='D')
    choice28= Choice(score=9, question=question6, body='E')

    choice29= Choice(score=0, question=question7, body='Short term (0-2 years)')
    choice30= Choice(score=0, question=question7, body='Medium term (2-5) years')
    choice31= Choice(score=0, question=question7, body='Long term (5 years or more)')

    choice32= Choice(score=0, question=question8, body='Yes.')
    choice33= Choice(score=0, question=question8, body='No, but I am investing less than 10% of my total investment assets.')
    choice34= Choice(score=0, question=question8, body='No, but I am investing more than 10% of my total investment assests.')

    choice35= Choice(score=0, question=question9, body='Absolutely not.')
    choice36= Choice(score=0, question=question9, body='Not really.')
    choice37= Choice(score=0, question=question9, body='I would give it a try.')
    choice38= Choice(score=0, question=question9, body='I sure am. Tell me more.')

    choice39= Choice(score=0, question=question10, body='I would never do that.')
    choice40= Choice(score=0, question=question10, body='I would rather borrow elsewhere.')
    choice41= Choice(score=0, question=question10, body='I have tried them.')
    choice42= Choice(score=0, question=question10, body='Sometimes.')

    choice43= Choice(score=0, question=question11, body='10%')
    choice44= Choice(score=0, question=question11, body='15%')
    choice45= Choice(score=0, question=question11, body='20%')
    choice46= Choice(score=0, question=question11, body='25%')
    choice47= Choice(score=0, question=question11, body='30%')
    choice48= Choice(score=0, question=question11, body='I don\'t know')

    choice49= Choice(score=0, question=question12, body='Very unstable')
    choice50= Choice(score=0, question=question12, body='Unstable')
    choice51= Choice(score=0, question=question12, body='Somewhat stable')
    choice52= Choice(score=0, question=question12, body='Stable')
    choice53= Choice(score=0, question=question12, body='Very stable')

    choice54= Choice(score=0, question=question13, body='Very experienced')
    choice55= Choice(score=0, question=question13, body='Somewhat inexperienced')
    choice56= Choice(score=0, question=question13, body='Somewhat experienced')
    choice57= Choice(score=0, question=question13, body='Experienced')
    choice58= Choice(score=0, question=question13, body='very experienced')

    choice59= Choice(score=0, question=question14, body='1')
    choice60= Choice(score=0, question=question14, body='2')
    choice61= Choice(score=0, question=question14, body='3')
    choice62= Choice(score=0, question=question14, body='4')
    choice63= Choice(score=0, question=question14, body='5')



    # Adding the data to the session and commit it to the database
    session.add_all([question1, question2, question3, question4, question5, question6,
                     question7, question8, question9, question10, question11, question12, question13, question14,
                      choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9, choice10, 
                      choice11, choice12, choice13, choice14, choice15, choice16, choice17, choice18, choice19, choice20,
                      choice21, choice22, choice23, choice24, choice25, choice26, choice27, choice28, choice29, choice30,
                      choice31, choice32, choice33, choice34, choice35, choice36, choice37, choice38, choice39, choice40,
                      choice41, choice42, choice43, choice44, choice45, choice46, choice47, choice48, choice49, choice50,
                      choice51, choice52, choice53, choice54, choice55, choice56, choice57, choice58, choice59, choice60,
                      choice61, choice62, choice63,])
    session.commit()

except Exception as e:
    print("An error occurred:", e)
    session.rollback()

finally:
    # Close the session
    session.close()