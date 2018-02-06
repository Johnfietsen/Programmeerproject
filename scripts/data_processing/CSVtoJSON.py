# University:	University of Amsterdam
# Study:		Minor Programming
# Course:		Programmeerproject
# Name:			Luc Stefelmanns
# Student nr.:	10669124


import csv
import json
import numpy


MAX_LINKS = 10
WIDTH_MAP = 180
HEIGHT_MAP = 160
STEP_SIZE = 10


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
	water_loc =		open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/water_loc.csv', 'r')
	water_size = 	open('C:/Users/lucst/Desktop/Minor programmeren/GitHub/' + \
						 'Programmeerproject/data/csv/' + algorithm + \
						 '/water_size.csv', 'r')

	tmp_freespaces =	[]
	tmp_location =		[]
	tmp_neighbours =	[]
	tmp_id =			[]
	tmp_size =			[]
	tmp_type =			[]
	tmp_value =			[]
	tmp_water_loc =		[]
	tmp_water_size =	[]

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

	for line in water_loc:
		tmp_water_loc.append(line.split(','))
	for i in range(len(tmp_water_loc)):
		for j in range(len(tmp_water_loc[i])):
			tmp_water_loc[i][j] = tmp_water_loc[i][j].split(';')

	for line in water_size:
		tmp_water_size.append(line.split(','))
	for i in range(len(tmp_water_size)):
		for j in range(len(tmp_water_size[i])):
			tmp_water_size[i][j] = tmp_water_size[i][j].split(';')


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

		colour_map[i].append({'x' :			WIDTH_MAP / 2,
							  'y' :			HEIGHT_MAP / 2,
							  'width' : 	WIDTH_MAP,
							  'height' : 	HEIGHT_MAP,
							  'type' : 		'map'})

		for j in range(len(tmp_id[i])):

			if tmp_id[i][j] != '\n':
				colour_map[i].append({'x' :		float(tmp_location[i][j][0]),
									  'y' :		float(tmp_location[i][j][1]),
									  'width' :	float(tmp_size[i][j][0]),
									  'height' :float(tmp_size[i][j][1]),
									  'type' :	tmp_type[i][j],
									  'id' : 	tmp_id[i][j]})

		for k in range(len(tmp_water_loc[i])):

			if tmp_water_loc[i][k][0] != ' \n':
				colour_map[i].append({'x' :		float(tmp_water_loc[i][k][0]),
									  'y' :		float(tmp_water_loc[i][k][1]),
									  'width' :	float(tmp_water_size[i][k][0]),
									  'height' :float(tmp_water_size[i][k][1]),
									  'type' :	'water'})


	# store structure for sunburst
	for i in range(len(tmp_id)):

		total_tested = (WIDTH_MAP / STEP_SIZE) * (HEIGHT_MAP / STEP_SIZE)

		used = 0
		tot_free = 0

		for j in range(len(tmp_id[i])):

			if tmp_id[i][j] != '\n':

				tot_free += numpy.pi * numpy.power(float( \
													tmp_freespaces[i][j][0]), 2)
				tot_free += 2 * float(tmp_size[i][j][0]) * \
								float(tmp_freespaces[i][j][0])
				tot_free += 2 * float(tmp_size[i][j][1]) * \
								float(tmp_freespaces[i][j][0])

		# calculate area used as freespace on entire map
		for k in range(0, WIDTH_MAP, STEP_SIZE):

			for l in range(0, HEIGHT_MAP, STEP_SIZE):

				for m in range(len(tmp_id[0])):

					if tmp_id[i][m] != '\n':

						distance = numpy.sqrt(numpy.power((k - \
									float(tmp_location[i][m][0])), 2) + \
								   			  numpy.power((l - \
									float(tmp_location[i][m][1])), 2))

						difference = distance - float(tmp_freespaces[i][m][0]) - \
									 float(tmp_size[i][m][0])

						if difference <= 0:

							used += 1

							break

		used /= total_tested

		summy = 0

		sunburst.append({'name' : 		'map',
						 'children' :	[]})


		sunburst[i]['children'].append({'name' :		'freespace',
						 	'children' :	[{'name' :		'one_family',
							 				  'colour' :	'yellow',
											  'children' :	[]},
											 {'name' :		'bungalow',
											  'colour' :	'orange',
											  'children' :	[]},
											 {'name' :		'mansion',
											  'colour' :	'red',
											  'children' :	[]}]})


		size_one_family = 0
		size_bungalow = 0
		size_mansion = 0

		for j in range(len(tmp_id[i])):

			if tmp_id[i][j] != '\n':

				freespace = numpy.pi * numpy.power(float( \
													tmp_freespaces[i][j][0]), 2)
				freespace += 2 * float(tmp_size[i][j][0]) * \
								 float(tmp_freespaces[i][j][0])
				freespace += 2 * float(tmp_size[i][j][1]) * \
								 float(tmp_freespaces[i][j][0])

				size = float(tmp_size[i][j][0]) * float(tmp_size[i][j][1])

				freespace_part = (freespace / tot_free) * used * \
								 (WIDTH_MAP * HEIGHT_MAP)

				summy += freespace_part + size

				if tmp_type[i][j] == 'one_family':

					size_one_family += size

					sunburst[i]['children'][0]['children'][0]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	freespace_part,
													'type' :	tmp_type[i][j]})

				elif tmp_type[i][j] == 'bungalow':

					size_bungalow += size


					sunburst[i]['children'][0]['children'][1]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	freespace_part,
													'type' :	tmp_type[i][j]})

				elif tmp_type[i][j] == 'mansion':

					size_mansion += size


					sunburst[i]['children'][0]['children'][2]['children'].append({
													'name' :	tmp_id[i][j],
													'size' :	freespace_part,
													'type' :	tmp_type[i][j]})

		sunburst[i]['children'].append({'name' : 	'unused',
										'size' :	(WIDTH_MAP * HEIGHT_MAP) \
													- summy})


		sunburst[i]['children'].append({'name' : 		'build',
								'children' :	[{'name' :		'one_family',
							 				  'colour' :	'yellow',
											  'size' :		size_one_family},
											 {'name' :		'bungalow',
											  'colour' :	'orange',
											  'size' :		size_bungalow},
											 {'name' :		'mansion',
											  'colour' :	'red',
											  'size':		size_mansion}]})

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

	CSVtoJSON('tactical_hillclimber')
