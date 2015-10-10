let Model = Gisele.Model;

Model.fn.validate = function() {
    let errorStack = this.Model.__fields__.map(validateField, this);

    this.errors = errorStack.reduce(reduceErrors, {});
    this.invalid = Object.keys(this.errors).length > 0;

    return this.errors;
};

function validateField(field) {
    let name = field.name;
    let value = this.get(name);
    let errors = field.validate(value);

    return {
        name, errors
    };
}

function reduceErrors(map, result) {
    // valid fields return "true" instead of an object
    if (result.errors !== true) {
        map[result.name] = result.errors;
    }

    return map;
}

Model.initializers.push(function addValidationProperties(model) {
    function noop() {}

    Object.defineProperty(model, '$$invalid', {
        enumerable: false,
        set: noop,
        get: function() {
            return this.$$.invalid;
        }
    });

    Object.defineProperty(model, '$$errors', {
        enumerable: false,
        set: noop,
        get: function() {
            return this.$$.errors;
        }
    });

    model.$$.errors = {};
    model.$$.invalid = false;
});
