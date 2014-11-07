function make_class(attrs) {
  var new_class = {};
  new_class['attrs'] = attrs;
  return new_class;
}

function instantiate_class(cls, args) {
  var new_obj = {};
  new_obj['class'] = cls;
  new_obj['attrs'] = {};
  var init = get_attr(new_obj, 'init');
  if (typeof(init) == 'function') {
    init(args);
  }
  return new_obj;
}

function get_attr(obj, attr_name) {
  var ret;
  var attrs = obj['attrs'];

  if (attr_name in attrs) {
    ret = attrs[attr_name];
  }
  else {
    ret = obj['class']['attrs'][attr_name];
  }

  if (typeof(ret) === 'function') {
    ret = bind_method(ret, obj);
  }
  return ret;
}

function set_attr(obj, attr_name, value) {
  obj['attrs'][attr_name] = value;
}

function bind_method(method, obj) {
  return function(args) {
    args.unshift(obj);
    return method(args);
  }
} 

var Foo = make_class({boop: 3});

var f = instantiate_class(Foo);
var f2 = instantiate_class(Foo);

set_attr(f, 'boop', 7);

console.log("This should be 7: ", get_attr(f, 'boop'));
console.log("This should be 3: ", get_attr(f2, 'boop'));

var Bar = make_class ({
  "bam": 8,
  "add2bam": function(args) {
    self = args[0];
    num2add = args[1];
    return get_attr(self, 'bam') + num2add;
  }
});

var b = instantiate_class(Bar);
bound_method = get_attr(b, "add2bam");

console.log("This should be 13: ", bound_method([5]));
set_attr(b, 'bam', 9);
console.log("This should be 14: ", bound_method([5]));

var Baz = make_class ({
  "init": function(args) {
    self = args[0];
    num = args[1];
    set_attr(self, 'yay', num);
  }
});

var baz = instantiate_class(Baz, [42]);

console.log("This should be 42: ", get_attr(baz, 'yay'))


