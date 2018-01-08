###### Study:  Minor Programming, University of Amsterdam
###### Course: Programmeerproject
###### Name:   Luc Stefelmanns
###### Student nr.:     10669124

INLEIDING DOCUMENT


# Amstelhaege algorithms


## Problem statement

When testing algorithms to solve the case of Amstelhaege, it can be difficult to interpret the results based on maps alone. The addition of a line graph with the score and an animation of the movement of houses can give some insight in the process of the algorithms, but do not properly show the underlying principles that ultimately determine the score achieved. What is missing are visualisations that show the relation between the houses and the distribution of freespace over the houses. This does not only enchance the understanding of the Amstelhaege case, but makes it easier to reinterpret the results for other cases that evolve around the positioning of objects in the Euclidian space.


## Solution

**This visualisation solves the lack of information by visualising the houses on the map as a network and the distribution of freespace as a piechart.**

In the tabs the different algorithms are represented, with one page for every algorithm. Every page has a (standard) coloured map with the houses in their Euclidian position. Next to the map the relation between the houses is interpreted as a network, with nodes representing houses and links representing closest neighbours (with a drop-down menu the number of neighbours can be chosen). The third element is a piechart that shows the percentage of the total freespace that is given to each house. The last element are line graphs representing the value of each house.
A slider makes it possible to walk trough time, to follow the movement of houses and the impact this has on the network and piechart. If the user clicks on a line in the linegraph, piece of the piechart, node in the network or rectangle on the map, the corresponding elements will be hightlighted in the other visualisations.

MVP: The most important elements are the network, piechart and tabs that make it possible to change between algorithms.



## Prerequisites

* data sources
* external components
* similar visuals
* hardest parts


