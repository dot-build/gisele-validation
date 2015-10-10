const StringField = Gisele.Field.get(String);

StringField.prototype.validate = function(value) {
    let errors = [];
    let string = String(value !== undefined ? value : '').trim();
    let length = string.length;

    if (this.required && !length) {
        errors.push('required');
    }

    if (this.minlength && length < this.minlength) {
        errors.push('minlength');
    }

    if (this.maxlength && length > this.maxlength) {
        errors.push('maxlength');
    }

    if (this.pattern && this.pattern instanceof RegExp &&
        !this.pattern.test(string)) {
        errors.push('pattern');
    }

    if (errors.length) {
        let reduce = (map, key) => {
            map[key] = true;
            return map;
        };
        return errors.reduce(reduce, {});
    }

    return true;
};
