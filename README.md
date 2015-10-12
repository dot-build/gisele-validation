# Validation extension to Gisele model library

Adds validation capabilities to any Gisele.Model instances

## Usage

```js
var User = Gisele.Model.create({
    name: { type: String, required: true, minlength: 15 },
    age: { type: Number, min: 18 }
});

var bob = new User({
	name: 'Bob',
	age: 15
});

// runs the validation rules of each field
bob.$$.validate();

console.log(bob.$$invalid);
// true

console.log(bob.$$errors);
//  {
//     name: { minlength: true },
//     age: { min: true }
//  }

```

## Validation of custom fields

New field types must implement a `validate()` method that either returns `true` (is valid) or an object with the validation errors.

In the builtin fields they are key/value pairs with the key being an error and the value being true, as same as `bob.$$errors` above.

Example:

```js

class Foo() { }

class FooField extends Gisele.Field {
	parse(value) { return new Foo(value); }

	validate(value) {
		// any validation rule can be applied
		if (this.required && value instanceof Foo) {
			return { required: true };
		}

		return true;
	}
}

Gisele.Field.add(Foo, FooField);
```