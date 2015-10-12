(function(addExtension) {
    if (typeof define === 'function' && define.amd) {
        define('gisele', function(Gisele) {
            addExtension(Gisele);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        addExtension(require('gisele'))
    } else {
        addExtension(window.Gisele);
    }
})(function extension(Gisele) {
    'use strict';

    'use strict';

var BooleanField = Gisele.Field.get(Boolean);

BooleanField.prototype.validate = function (value) {
    if (this.required && value !== true && value !== false) {
        return { required: true };
    }

    return true;
};

var DateField = Gisele.Field.get(Date);

DateField.prototype.validate = function (value) {
    if (this.required && value instanceof Date === false) {
        return { required: true };
    }

    return true;
};

Gisele.Field.prototype.validate = function (value) {
    return true;
};

var Model = Gisele.Model;

Model.fn.validate = function () {
    var errorStack = this.Model.__fields__.map(validateField, this);

    this.errors = errorStack.reduce(reduceErrors, {});
    this.invalid = Object.keys(this.errors).length > 0;

    return this.errors;
};

function validateField(field) {
    var name = field.name;
    var value = this.get(name);
    var errors = field.validate(value);

    return {
        name: name, errors: errors
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
        get: function get() {
            return this.$$.invalid;
        }
    });

    Object.defineProperty(model, '$$errors', {
        enumerable: false,
        set: noop,
        get: function get() {
            return this.$$.errors;
        }
    });

    model.$$.errors = {};
    model.$$.invalid = false;
});

var NumberField = Gisele.Field.get(Number);

NumberField.prototype.validate = function (value) {
    var errors = [];
    var number = value !== undefined ? Number(value) : NaN;

    if (this.required && isNaN(number)) {
        errors.push('required');
    }

    if (this.min !== undefined && (isNaN(number) || number < this.min)) {
        errors.push('min');
    }

    if (this.max !== undefined && (isNaN(number) || number > this.max)) {
        errors.push('max');
    }

    if (errors.length) {
        var reduce = function reduce(map, key) {
            map[key] = true;
            return map;
        };
        return errors.reduce(reduce, {});
    }

    return true;
};

var StringField = Gisele.Field.get(String);

StringField.prototype.validate = function (value) {
    var errors = [];
    var string = String(value !== undefined ? value : '').trim();
    var length = string.length;

    if (this.required && !length) {
        errors.push('required');
    }

    if (this.minlength && length < this.minlength) {
        errors.push('minlength');
    }

    if (this.maxlength && length > this.maxlength) {
        errors.push('maxlength');
    }

    if (this.pattern && this.pattern instanceof RegExp && !this.pattern.test(string)) {
        errors.push('pattern');
    }

    if (errors.length) {
        var reduce = function reduce(map, key) {
            map[key] = true;
            return map;
        };
        return errors.reduce(reduce, {});
    }

    return true;
};

})(this);