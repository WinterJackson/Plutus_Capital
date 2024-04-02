import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./Questions.css";
import NavBar from "./NavBar"

function Help() {

  return (
    <>
      <NavBar/>
      <div className="q-wrapp">
        <div className="instructions">
          <Box className="custom-box" sx={{ maxWidth: 1280, margin: "0 auto", flexGrow: 1 }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 50,
                pl: 2,
                bgcolor: 'background.default',
              }}
            >
              <Typography style={{ fontSize: '20px' }}>Welcome to Our Survey!</Typography>
            </Paper>
            <Box sx={{ maxWidth: 1280, width: '100%', p: 2 }}>
              <div className="survey-description">
                <p>
                  Your feedback is incredibly important to us as we continually strive to enhance our services. By participating in this survey, you're helping us gain valuable insights to better meet your needs and preferences.
                  <br /><br />
                  Rest assured, your responses are completely confidential and anonymous. Your privacy is our priority. The survey will take approximately 10 minutes at most, and upon completion, you'll have the opportunity to view your generated profile and your results.
                </p>
              </div>
            </Box>
          </Box>
        </div>

        <div className="instructions">
          <Box className="custom-box" sx={{ maxWidth: 1280, margin: "0 auto", flexGrow: 1 }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 50,
                pl: 2,
                bgcolor: 'background.default',
              }}
            >
              <Typography style={{ fontSize: '20px' }}>Survey Instructions</Typography>
            </Paper>
            <Box sx={{ maxWidth: 1280, width: '100%', p: 2 }}>
              <div className="survey-description">
                <p>
                  <strong>Start Survey:</strong> To initiate the survey, click the "Start Survey" button located below. This will commence your survey.
                  <br /><br />
                  <strong>Progress:</strong> The survey is structured into various questions, each designed to gather specific insights. You can seamlessly move between these questions using the "Next" and "Back" buttons. This enables you to navigate forward or backward through the survey to review or modify your responses.
                  <br /><br />
                  <strong>Next Button:</strong> To advance to the subsequent question, press the "Next" button. This button is your key to progress through the survey, allowing you to provide answers to each question in sequence.
                  <br /><br />
                  <strong>Back Button:</strong> Utilize the "Back" button when you need to revisit the preceding question. It grants you the flexibility to review and adjust your responses as necessary.
                  <br /><br />
                  <strong>Question Format:</strong> Each question presents you with a range of answer choices. Consider these options carefully and select the one that most accurately reflects your opinion or preference. Your responses are vital to us.
                  <br /><br />
                  <strong>View Results:</strong> Upon successfully completing the survey, you will gain access to an exclusive feature. You can view your personalized profile and review the survey results, providing you with valuable insights.
                  <br /><br />
                  <strong>Restart Survey:</strong> If at any point you wish to start the survey again from the beginning, you can easily do so by clicking the "Restart Survey" option. This allows you to retake the survey from the very first question.
                  <br /><br />
                  <strong>Technical Issues:</strong> In the event of encountering technical difficulties or if you decide to exit the survey prematurely, there's no need to worry. Your progress is automatically saved. Simply close your browser, and you can pick up right where you left off when you return.
                </p>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Help;
