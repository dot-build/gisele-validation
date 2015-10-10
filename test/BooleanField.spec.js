describe('BooleanField', function() {
    describe('#validate()', function() {
        it('should validate a number', function() {
            let field = Gisele.Field.create({
                type: Boolean,
                required: true
            });

            let result = field.validate();
            expect(result).not.toBe(true);
            expect(result.required).toBe(true);

            result = field.validate(null);
            expect(result).not.toBe(true);
            expect(result.required).toBe(true);

            result = field.validate(undefined);
            expect(result).not.toBe(true);
            expect(result.required).toBe(true);

            result = field.validate(1);
            expect(result).not.toBe(true);
            expect(result.required).toBe(true);

            result = field.validate(false);
            expect(result).toBe(true);
            expect(result.required).toBe(undefined);
        });
    });
});
