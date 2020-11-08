import spec
import cars
import inspect 

code = ""
for k, v in cars.__dict__.items():
        if hasattr(v,"specification"):
            code += spec.gen_code_class(v)
print(code)