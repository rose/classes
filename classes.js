function make_class(attrs) {
  var new_class = {};
  new_class['attrs'] = attrs;
  return new_class;
}

function instantiate_class(cls) {
  var new_obj = {};
  new_obj['class'] = cls;
  new_obj['attrs'] = {};
  return new_obj;
}

function get_attr(obj, attr_name) {
  var attrs = obj['attrs'];
  if (attr_name in attrs) {
    return attrs[attr_name];
  }
  return obj['class']['attrs'][attr_name]; // will be undefined if it's, you know, undefined.
}

function set_attr(obj, attr_name, value) {
  obj['attrs'][attr_name] = value;
}


var Foo = make_class({boop: 3});

var f = instantiate_class(Foo);
var f2 = instantiate_class(Foo);

set_attr(f, 'boop', 7);

console.log(get_attr(f, 'boop')); // 7
console.log(get_attr(f2, 'boop')); // 3
