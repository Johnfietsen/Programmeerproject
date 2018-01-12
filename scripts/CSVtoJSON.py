# University:	University of Amsterdam
# Study:		Minor Programming
# Course:		Programmeerproject
# Name:			Luc Stefelmanns
# Student nr.:	10669124


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

	network = {'nodes' : [], 'links' : []}

	for line in freespaces:
		tmp_freespaces.append(line.split(','))
	for i in range(len(tmp_freespaces)):
		print(tmp_freespaces[i])
		tmp_freespaces[i] = tmp_freespaces[i].split(';')

	for line in location:
		tmp_location.append(line.split(','))

	for line in neighbours:
		tmp_neighbours.append(line.split(','))
	for i in range(len(tmp_neighbours)):
		tmp_neighbours[i] = tmp_neighbours[i].split(';')

	for line in self_id:
		tmp_id.append(line.split(','))

	for line in size:
		tmp_size.append(line.split(','))
	for i in range(len(tmp_size)):
		tmp_size[i] = tmp_size[i].split(';')

	for line in self_type:
		tmp_type.append(line.split(','))

	for line in value:
		tmp_value.append(line.split(','))


if __name__ == '__main__':

	CSVtoJSON('hillclimber')
