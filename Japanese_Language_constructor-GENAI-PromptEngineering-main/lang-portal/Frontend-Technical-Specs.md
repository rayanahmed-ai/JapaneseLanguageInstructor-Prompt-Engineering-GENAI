## FrontEnd Technical Spec

### Dashboard
THe purpose of this page is to provide a summary of learning and act as the default page when a user visit the web-app
#### Dashboard
  - WPM Average
  - Accuracy
  - words Learned
  - Day Streak

-  Recent Progress

Well need following API endpoints to power this page
- GET / dashboard/last_study_session
- GET / dashboard/ study_progress
- GET /dashboard/quick-stats

### Study Activities
#### Purpose

THe purpose of this page is to show a collection of study activities witha thumbnail and its name , to either launch or view the study activity

#### Components
- Study Activity  Card
  - show a thumbnail of the study activity
  - the name of the study activity 
  - a launch Button to take us to the launch page
  - the view page to view more information about past study sessions for this study activity

##### Needed API Endpoints
- GET / study_activities
### Words

#### Purpose

The purpose of this page is to look at the words and their meanings in order for the user to train themselves
#### Components
- Words Card
- shows a list of words and their meanings based on their meanings 
#### Needed API endpoints
- GET / Words
### Word Groups
 - Basic Greetings
 - Food & Diniing
 - Family Members
 - Numbers
 - Days & Time
 - Colors
 - Travel Phrases
 - Business Terms
### Sessions
  - Hiragana Basics
  - Common Phrases
  - Katakana Practice
  - Speed Challenge
  - Hiragana Basics
### Settings
 
 ##### Display
    - show Romaji
    - Show English Translations
    - # Theme
      - Light
      - Auto 
      - Dark
 #### Practice
   - Sound Effects
   - Auto-Advance
   ###### Difficulty Level
     - Beginner
     - Intermediate
     -Difficult

    ##### Notifications
        - Daily Reminders
        - Achievement Alerts
