describe('NumberField', function() {
    describe('#validate()', function() {
        it('should validate a number', function() {
            let field = Gisele.Field.create({
                type: Number,
                min: -10,
                max: 20,
                required: true
            });

            let result = field.validate();
            expect(result).not.toBe(true);

            // flag all errors if the value is not a number
            expect(result.required).toBe(true);
            expect(result.min).toBe(true);
            expect(result.max).toBe(true);

            result = field.validate(25);
            expect(result).not.toBe(true);
            expect(result.max).toBe(true);
            expect(result.required).toBe(undefined);
            expect(result.min).toBe(undefined);

            result = field.validate(-1);
            expect(result).toBe(true);
            expect(result.required).toBe(undefined);
            expect(result.min).toBe(undefined);
            expect(result.max).toBe(undefined);
        });
    });
});
