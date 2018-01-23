# University:	University of Amsterdam
# Study:		Minor Programming
# Course:		Programmeerproject
# Name:			Luc Stefelmanns
# Student nr.:	10669124


import csv
import json
import numpy


MAX_LINKS = 10


def CSVtoJSON(algorithm):

	freespaces = 	open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/freespaces.csv', 'r')
	location =		open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/location.csv', 'r')
	neighbours =	open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/neighbours.csv', 'r')
	self_id =		open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/self_id.csv', 'r')
	size =			open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/size.csv', 'r')
	self_type =		open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/type.csv', 'r')
	value =			open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/value.csv', 'r')

	tmp_freespaces =	[]
	tmp_location =		[]
	tmp_neighbours =	[]
	tmp_id =			[]
	tmp_size =			[]
	tmp_type =			[]
	tmp_value =			[]

	network =			[]
	colour_map = 		[]
	stacked_chart =		[]
	sunburst =			[]


	# seperate all the csv values
	for line in freespaces:
		tmp_freespaces.append(line.split(','))
	for i in range(len(tmp_freespaces)):
		for j in range(len(tmp_freespaces[i])):
			tmp_freespaces[i][j] = tmp_freespaces[i][j].split(';')

	for line in location:
		tmp_location.append(line.split(','))
	for i in range(len(tmp_location)):
		for j in range(len(tmp_location[i])):
			tmp_location[i][j] = tmp_location[i][j].split(';')

	for line in neighbours:
		tmp_neighbours.append(line.split(','))
	for i in range(len(tmp_neighbours)):
		for j in range(len(tmp_neighbours[i])):
			tmp_neighbours[i][j] = tmp_neighbours[i][j].split(';')

	for line in self_id:
		tmp_id.append(line.split(','))

	for line in size:
		tmp_size.append(line.split(','))
	for i in range(len(tmp_size)):
		for j in range(len(tmp_size[i])):
			tmp_size[i][j] = tmp_size[i][j].split(';')

	for line in self_type:
		tmp_type.append(line.split(','))

	for line in value:
		tmp_value.append(line.split(','))


	# store nodes and types for network
	for i in range(len(tmp_id)):

		network.append({'nodes' :	[],
						'links' :	[]})

		network[i]['nodes'].append({'id' : 1001, 'type' : 'side'})
		network[i]['nodes'].append({'id' : 1002, 'type' : 'side'})
		network[i]['nodes'].append({'id' : 1003, 'type' : 'side'})
		network[i]['nodes'].append({'id' : 1004, 'type' : 'side'})

		for j in range(len(tmp_id[i])):
			if tmp_id[i][j] != '\n':
				network[i]['nodes'].append({'id' :		tmp_id[i][j],
											'type' :	tmp_type[i][j]})

	# store links for network
	for i in range(len(tmp_id)):

		for l in range(MAX_LINKS):

			network[i]['links'].append([])

			for j in range(len(tmp_id[i])):

				for k in range(l):

					if tmp_id[i][j] != '\n':
						network[i]['links'][l].append({
									'source' :	int(tmp_id[i][j]),
									'target' :	int(tmp_neighbours[i][j][k]),
									'dist' :	float(tmp_freespaces[i][j][k])})


	# store locations, sizes, id and types for map
	for i in range(len(tmp_id)):

		colour_map.append([])

		for j in range(len(tmp_id[i])):

			if tmp_id[i][j] != '\n':
				colour_map[i].append({'x' :		float(tmp_location[i][j][0]),
									  'y' :		float(tmp_location[i][j][1]),
									  'width' :	float(tmp_size[i][j][0]),
									  'height' :float(tmp_size[i][j][1]),
									  'type' :	tmp_type[i][j],
									  'id' : 	tmp_id[i][j]})


	# store values, types, id and iteration for stacked area chart
	for j in range(len(tmp_id[len(tmp_id) - 1])):

		stacked_chart.append({'id' :		tmp_id[len(tmp_id) - 1][j],
						   	  'type' :		tmp_type[len(tmp_id) - 1][j],
						   	  'values' :	[]})

	for i in range(len(tmp_id)):

		for j in range(len(tmp_id[i])):

			for house in stacked_chart:

				if tmp_id[i][j] == house['id'] and tmp_id[i][j] != '\n':

					house['values'].append(tmp_value[i][j])
    #
    #
    #
	# for i in range(len(tmp_id)):
    #
	# 	stacked_chart.append([])
    #
	# 	for j in range(len(tmp_id[i])):
    #
	# 		if tmp_id[i][j] != '\n':
	# 			stacked_chart[i].append({'value' :	float(tmp_value[i][j]),
	# 									 'type' :	tmp_type[i][j],
	# 									 'id' :		tmp_id[i][j],
	# 									 'i': 		int(i)})
    #


	# store structure for sunburst
	for i in range(len(tmp_id)):

		summy = 0

		sunburst.append({'name' : 		'map',
						 'children' :	[]})

		sunburst[i]['children'].append({'name' : 		'build',
							 'colour' :		'black',
							'children' :	[{'name' :		'one_family',
							 				  'colour' :	'yellow',
											  'children' :	[]},
											 {'name' :		'bungalow',
											  'colour' :	'orange',
											  'children' :	[]},
											 {'name' :		'mansion',
											  'colour' :	'red',
											  'children' :	[]}]})

		sunburst[i]['children'].append({'name' :		'freespace',
							 'colour' :		'blue',
						 	'children' :	[{'name' :		'one_family',
							 				  'colour' :	'yellow',
											  'children' :	[]},
											 {'name' :		'bungalow',
											  'colour' :	'orange',
											  'children' :	[]},
											 {'name' :		'mansion',
											  'colour' :	'red',
											  'children' :	[]}]})

		for j in range(len(tmp_id[i])):

			if tmp_id[i][j] != '\n':

				freespace = numpy.pi * numpy.power(float(tmp_freespaces[i][j][0]), 2)
				freespace += 2 * float(tmp_size[i][j][0]) * \
								 float(tmp_freespaces[i][j][0])
				freespace += 2 * float(tmp_size[i][j][1]) * \
								 float(tmp_freespaces[i][j][0])

				size = float(tmp_size[i][j][0]) * float(tmp_size[i][j][1])

				summy += freespace + size

				if tmp_type[i][j] == 'one_family':

					sunburst[i]['children'][0]['children'][0]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	size,
													'type' :	tmp_type[i][j]})

					sunburst[i]['children'][1]['children'][0]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	freespace,
													'type' :	tmp_type[i][j]})

				elif tmp_type[i][j] == 'bungalow':

					sunburst[i]['children'][0]['children'][1]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	size,
													'type' :	tmp_type[i][j]})

					sunburst[i]['children'][1]['children'][1]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	freespace,
													'type' :	tmp_type[i][j]})
#
				elif tmp_type[i][j] == 'mansion':

					sunburst[i]['children'][0]['children'][2]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	size,
													'type' :	tmp_type[i][j]})

					sunburst[i]['children'][1]['children'][2]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	freespace,
													'type' :	tmp_type[i][j]})

		sunburst[i]['children'].append({'name' : 	'unused',
										'size' :	(180 * 160) - summy})


	# {
	#  "name": "flare",
	#  "children": [
	#   {
	#    "name": "analytics",
	#    "children": [
	#     {
	#      "name": "cluster",
	#      "children": [
	#       {"name": "AgglomerativeCluster", "size": 3938},
	#       {"name": "CommunityStructure", "size": 3812},
	#       {"name": "HierarchicalCluster", "size": 6714},
	#       {"name": "MergeEdge", "size": 743}
	#      ]

	JSON_algorithm = {'network' : 	network,
					  'map' : 		colour_map,
					  'stacked' : 	stacked_chart,
					  'sunburst' :	sunburst}

	JSON_data = json.loads(json.dumps(JSON_algorithm))

	with open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
			  'Programmeerproject/data/json/' + algorithm + '.json', 'w') \
		as outfile:
	    json.dump(JSON_data, outfile)


if __name__ == '__main__':

	CSVtoJSON('hillclimber')
