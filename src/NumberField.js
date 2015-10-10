const NumberField = Gisele.Field.get(Number);

NumberField.prototype.validate = function(value) {
    let errors = [];
    let number = value !== undefined ? Number(value) : NaN;

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
        let reduce = (map, key) => {
            map[key] = true;
            return map;
        };
        return errors.reduce(reduce, {});
    }

    return true;
};
