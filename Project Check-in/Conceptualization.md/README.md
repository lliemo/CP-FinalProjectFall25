# My Final Project, 2025

## by Hallie Morton

### Project Title and Description

**Synthetic**

- a browser based adventure game that progresses in response to midi input
- has background mx to guide (starts basic, complexity increases with time)
  Plot: character defeats enemies but slowly becomes aware it's a game character being controlled by the user

Starting Point:
In game (Bx):

- Simple string harmonies
- Will eventually also have a melody

User Input:
*general controls are controlled with left hand:*
- forward: suspended perfect fifth from root (ex. C4)
- backward: suspended root (ex. F3)
- jump: high velocity major third from root (ex A3)
- crouch: suspended minor third from root (ex. Ab3)
- float: suspended fourth from root (ex. Bb3)
  *up/down an octave is faster => (ex. C5 is running forward)
_you can jump/crouch/float while going forward/backward_


*extra actions are controlled with the right hand:*
- charge attack: arpeggio of triad (must be done at least 3 times to successfully attack)
- attack #1: (any) triad in right hand
- attack #2: cluster of 3 or more notes (more powerful, but can't be used consecutively)
*code should accept any type of triad/cluster within range*
**difference between RH and LH = LH is C4 and below; RH is C#4 and above**

**Objective/Scope:**

- to creates an entertaining game that uses and grows user musical skill

### Anicipated user required resources

-access to a browser
-a midi keyboard

### What do I need to do

- code response to user MIDI input
- make code respond specifically depending on user MIDI input
- make MIDI input synth sound nice (tone, ADSR)
- create and integrate background music (loop a .wav)
- find a template for graphics
- create start menu that gives options to start, review controls, review objective
- connect input to template so user input connects to graphics
- create enemies in template
- create life system (3 hearts?, checkpoints?)

### Constraints & Big Decisions ###
- I don't want to set a key or necessary punish user for making shitty music/not EXACTLY following guidlines => I'll settle for a simple version/easy level of this idea
- I want to incentivise action rather than just playing the same 4 notes => I can do this by making the environment require it (Ex. different sections require different octaves/roots)
- Graphics are hard so I'm to the mercy of whatever template I find
- Time limit? => Game loops until character dies or reaches the end of template (there's a graphic end but not a musical end-- my .wav will have to loop)

  
### Timeline:

Oct 20th:
-research procudures/requirements for code
Oct 27th:
-loosely code the foundation
Nov 3rd:
-code more details/nittygritty
Nov 10th:
-troubleshoot and debug
Nov 17th:
-deploy!
