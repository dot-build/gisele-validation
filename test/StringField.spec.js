describe('StringField', function() {
    describe('#validate()', function() {
        it('should validate a string', function() {
            let field = Gisele.Field.create({
                type: String,
                minlength: 5,
                maxlength: 10,
                required: true,
                pattern: /^[a-z]+$/
            });

            let result = field.validate();
            expect(result).not.toBe(true);

            expect(result.minlength).toBe(true);
            expect(result.required).toBe(true);
            expect(result.pattern).toBe(true);

            result = field.validate('bigger than 10 characters');
            expect(result).not.toBe(true);
            expect(result.maxlength).toBe(true);
            expect(result.pattern).toBe(true);
            expect(result.minlength).toBe(undefined);
            expect(result.required).toBe(undefined);

            result = field.validate('characters');
            expect(result).toBe(true);
            expect(result.maxlength).toBe(undefined);
            expect(result.pattern).toBe(undefined);
            expect(result.minlength).toBe(undefined);
            expect(result.required).toBe(undefined);
        });
    });
});
