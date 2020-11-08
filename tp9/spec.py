def specification(cls) :
    cls.specification = True
    return cls;

class Attribute(object):
    def __init__(self, t):
        self.type = t

def gen_header_class(cls):
    cls_name = cls.__name__
    superclasses = cls.__bases__
    superclasses_names = []
    for superclass in superclasses:
        superclasses_names.append(superclass.__name__)
    return "class " + cls_name + "(" + ",".join(superclasses_names) + "):\n"

def gen_init_class(cls):
    attributes = []
    for k, v in cls.__dict__.items():
        if isinstance(v, Attribute):
            attributes.append(k)
    res = "\tdef __init__(self" 
    for attribute in attributes:
        res += ", " + attribute + "=None"
    res += "):\n"
    for attribute in attributes:
        res += "\t\tself." + attribute + " = " + attribute + "\n"

    return res  + "\n"
    
def gen_getter_attribute(cls):
    res = ""
    attributes = []
    for k, v in cls.__dict__.items():
        if isinstance(v, Attribute):
            attributes.append(k)
    for attribute in attributes:
        res += f"\t@property\n\tdef {attribute}(self):\n\t\treturn self._{attribute}\n\n" 
    return res

def gen_setter_attribute(cls):
    res = ""
    for k, v in cls.__dict__.items():
        if isinstance(v, Attribute):
            t = v.__dict__["type"].__name__
            res += f"\t@{k}.setter\n\tdef {k}(self, value):\n\t\tassert value is None or isinstance(value, {t})\n\t\tself._{k} = value\n\n"
    return res

def gen_code_class(cls):
    code =  gen_header_class(cls)
    code += gen_init_class(cls)
    code += gen_getter_attribute(cls)
    code += gen_setter_attribute(cls)
    return code