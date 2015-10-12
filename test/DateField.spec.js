describe('DateField', function() {
    describe('#validate()', function() {
        it('should validate a number', function() {
            let field = Gisele.Field.create({
                type: Date,
                required: true
            });

            let result = field.validate();
            expect(result).not.toBe(true);
            expect(result.required).toBe(true);

            result = field.validate(null);
            expect(result).not.toBe(true);
            expect(result.required).toBe(true);

            result = field.validate(new Date());
            expect(result).toBe(true);
            expect(result.required).toBe(undefined);
        });
    });
});
