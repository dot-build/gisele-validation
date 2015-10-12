const DateField = Gisele.Field.get(Date);

DateField.prototype.validate = function(value) {
    if (this.required && value instanceof Date === false) {
        return { required: true };
    }

    return true;
};
