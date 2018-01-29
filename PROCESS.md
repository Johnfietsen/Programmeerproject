
# Progress Book

###### Study:       Minor Programming, University of Amsterdam
###### Course:      Programmeerproject
###### Name:        Luc Stefelmanns
###### Student nr.: 10669124



## Week 2


### Monday

#### Done:
* JSON file for network completed.

#### Not done but planned:
* First network visualization.
* JSON for map.

#### Problems encountered:
* Correctly placing the lists of possible connections in the JSON file.

#### Decisions:
* Instead of a separate JSON file for every iteration (which is not feasible in hindsight), I shall make a JSON for every algorithm. It is made of a dict with four lists (one for every algorithm, with every element in the list representing an iteration).
* First the network and map will be made, then the stacked area chart and the last thing will be the sunburst.

#### Comments:
Today was not a productive day. I also have the feeling that I'm falling behind compared to other people because of my struggle with the JSON files for the visualizations.

### Todo's tomorrow:
* Network functioning.
* Slider functioning.
* JSON for map.


### Tuesday

#### Done:
* Network working.
* Slider alpha version.
* JSON for coloured map.

#### Not done but planned:
* Slider fully functional.

#### Problems encountered:
* Working with the location of the SVGs.
* Creating an update function for the network.
* Fully integrating the functions of the slider.

#### Decisions:
* JSON structure of network is correct, and the same 'tactic' will be applied for the coming two JSON files (for the stacked area chart and sunburst diagram).
* Order of work from now: slider finished, map, stacked area chart, sunburst diagram, tabs.

#### Comments:
Today went okay. The creation of the slider was more difficult than expected, and there was some hassle with integrating online code. I feel confident now the JSON file seems to be functioning for the network, but need to give attention to the infra and data structure from now on to avoid problems later.

#### Todo's tomorrow:
* Slider fully functioning.
* Coloured map functioning.
* JSON for stacked area chart.


### Wednesday

#### Done:
* SVGs implementation.
* Script for coloured map frame.

#### Not done but planned:
* Slider fully functional.
* Coloured map functioning.
* JSON for stacked area chart.

#### Problems encountered:
* Feeling under the weather

#### Decisions:
* Will use divs to divide the screen in four area's.

#### Comments:
I was feeling under the weather and went home earlier, where I lay in bed. It was therefor not a productive day. I also notice that working with HTML is not second nature for me, so the use of divs won't be easy.

#### Todo's tomorrow:
* Slider fully functioning.
* Coloured map functioning.
* JSON for stacked area chart.


### Thursday

#### Done:
* Network improved.
* Start update function for slider.

#### Not done but planned:
* Slider fully functional.
* Coloured map functioning.
* JSON for stacked area chart.

#### Problems encountered:
* Due to the collapse of the roof, a lot of time was wasted travelling. In the afternoon I had meetings so I barely had time to code.

#### Decisions:
* I have to do some work in the weekend in order to keep on track.

#### Comments:
None.

#### Todo's tomorrow:
* Slider fully functioning.


### Friday

#### Done:
* Coloured map creation.
* Update function for map.

#### Not done but planned:
* Slider fully functional.

#### Problems encountered:
* The slider works, but the update functions are not working properly. I have to try some things with transition.

#### Decisions:
* I will ask for advice on the slider.

#### Comments:
None.

#### Todo's Monday:
* Slider (finally) fully functioning.
* Stacked area chart.



## Week 3


### Monday

#### Done:
* Update function for network fixed.
* JSON for stacked area chart.
* Basis for stacked area chart.
* GitHub pages.

#### Not done but planned:
* Stacked area chart fully functional.

#### Problems encountered:
* The transition function is difficult to understand.
* Lost track of variables in network script, so time was wasted when working on the update function.

#### Decisions:
* The focus should lie with proper update functions for all visualizations, since the slider actually does its job.

#### Comments:
Today was fine. I could restructure some of the code, and the slider is actually working fine, it's just that the update functions can be difficult sometimes.

#### Todo's tomorrow:
* Transition for coloured map.
* Stacked area chart fully functional.
* Partitions with divs.


### Tuesday

#### Done:
* JSON for sunburst.
* Sunburst functional.

#### Not done but planned:
* Transition for coloured map.
* Stacked area chart fully functional.
* Partitions with divs.

#### Problems encountered:
* The json has to be specifically shaped for the stacked area chart and I didn't manage to find a corret way yet.
* The example of the sunburst is for v3 of d3, so maybe I'll have a problem integrating it.

#### Decisions:
* First all visualizations should function with a simple update function, then the links and only then it is time to smooth the transitions.

#### Comments:
Working on the sunburst was easier than expected. Still the transitions are a puzzle for me, especially since they seem to work so nicely for other people.

#### Todo's tomorrow:
* Integrating sunburst.
* Update function sunburst.
* Coloured area chart fully functional.


### Wednesday

#### Done:
* Sunburst integrated.

#### Not done but planned:
* Update function sunburst.
* Coloured area chart fully functional.

#### Problems encountered:
* When placing the sunburst in the html page, the position changed to the top left corner of the SVG. Figuring out how to fix this took time.
* All examples for stacked area charts use tsv or csv input files.

#### Decisions:
* Stacked area chart has to be made step by step instead of relying heavily on an example.

#### Comments:
Creating the stacked area chart is more cumbersome than expected, since it requires a specific data input.

#### Todo's tomorrow:
* Update function sunburst.
* Stacked area chart.
* Dropdown network.


### Thursday

#### Done:
* Update function sunburst.
* Dropdown network (frame).
* Links between visualizations.

#### Not done but planned:
* Stacked area chart.
* Dropdown fully functioning.

#### Problems encountered:
* The update function of the dropdown doesn't accept values given for iteration and algorithm.

#### Decisions:
* Due to time management, the stacked area chart has to wait (it is not an important part of the visualization).

#### Comments:
For me it is difficult to keep track of all functions and variables in Javascript (d3).

#### Todo's tomorrow:
* Dropdown functioning.


### Friday

#### Done:
* Dropdown functioning.

#### Not done but planned:
None.

#### Problems encountered:
None.

#### Decisions:
* Next week the update functions should be made nicer.
* Second priority is making the tabs work.
* Iteration and algorithm have been made global variables.

#### Comments:
I found a function that manages data updates and I will try to integrate it next week.

#### Todo's Monday:
* Better update function.
* Functioning tabs.



## Week 4


### Monday

#### Done:
* Better data update function for map.

#### Not done but planned:
* Better update function doesn't work for sunburst and network yet.

#### Problems encountered:
* The update function doesn't select the right data for the sunburst and network, so nothing happens.

#### Decisions:
I will use tomorrow and Wednesday to finalize the code. On Thursday I will make the report.

#### Comments:
I will have to do a lot tomorrow in order to keep up.

#### Todo's tomorrow:
* Update function for network and sunburst improved.
* Working tabs.
