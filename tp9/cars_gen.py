class Engine(object):
	pass

class Vehicule(object):
	def __init__(self, number_of_wheels=None, engine=None):
		self.number_of_wheels = number_of_wheels
		self.engine = engine

	@property
	def number_of_wheels(self):
		return self._number_of_wheels

	@property
	def engine(self):
		return self._engine

	@number_of_wheels.setter
	def number_of_wheels(self, value):
		assert value is None or isinstance(value, int)
		self._number_of_wheels = value

	@engine.setter
	def engine(self, value):
		assert value is None or isinstance(value, Engine)
		self._engine = value

class Car(Vehicule):
	pass

