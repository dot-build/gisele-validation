const BooleanField = Gisele.Field.get(Boolean);

BooleanField.prototype.validate = function(value) {
    if (this.required && value !== true && value !== false) {
        return { required: true };
    }

    return true;
};
