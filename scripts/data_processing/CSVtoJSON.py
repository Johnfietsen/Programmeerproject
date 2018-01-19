# University:	University of Amsterdam
# Study:		Minor Programming
# Course:		Programmeerproject
# Name:			Luc Stefelmanns
# Student nr.:	10669124


import csv
import json


MAX_LINKS = 10


def CSVtoJSON(algorithm):

	freespaces = 	open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/' + algorithm + \
						 '/freespaces.csv', 'r')
	location =		open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/' + algorithm + \
						 '/location.csv', 'r')
	neighbours =	open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/' + algorithm + \
						 '/neighbours.csv', 'r')
	self_id =		open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/' + algorithm + \
						 '/self_id.csv', 'r')
	size =			open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/' + algorithm + \
						 '/size.csv', 'r')
	self_type =		open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/' + algorithm + \
						 '/type.csv', 'r')
	value =			open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/' + algorithm + \
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


	# store nodes for network
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
									'dist' :	float(tmp_freespaces[i][j][k])
									})


	# store locations for map
	for i in range(len(tmp_id)):

		colour_map.append([])

		for j in range(len(tmp_id[i])):

			if tmp_id[i][j] != '\n':
				colour_map[i].append({'x' :		float(tmp_location[i][j][0]),
									  'y' :		float(tmp_location[i][j][1]),
									  'width' :	float(tmp_size[i][j][0]),
									  'height' :float(tmp_size[i][j][1]),
									  'type' :	tmp_type[i][j]})

	JSON_algorithm = {'network' : 	network,
					  'map' : 		colour_map}

	JSON_data = json.loads(json.dumps(JSON_algorithm))

	with open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
			  'Programmeerproject/scripts/' + algorithm + '.json', 'w') \
		as outfile:
	    json.dump(JSON_data, outfile)


if __name__ == '__main__':

	CSVtoJSON('hillclimber')
